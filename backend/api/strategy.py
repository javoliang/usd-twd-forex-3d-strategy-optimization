import pandas as pd
import numpy as np
from fastapi import APIRouter
from api.data_service import get_historical_data

router = APIRouter()

def run_3d_optimization_grid(df):
    fast_smas = np.arange(10, 105, 5)
    slow_smas = np.arange(50, 310, 10)
    
    results = []
    close_prices = df['Close'].values
    returns_pct = df['Close'].pct_change().fillna(0).values
    
    risk_free_rate = 0.02
    z_matrix = np.zeros((len(slow_smas), len(fast_smas)))
    
    for i, slow in enumerate(slow_smas):
        slow_series = pd.Series(close_prices).rolling(window=slow).mean().values
        for j, fast in enumerate(fast_smas):
            if fast >= slow:
                z_matrix[i, j] = np.nan
                continue
                
            fast_series = pd.Series(close_prices).rolling(window=fast).mean().values
            signal = np.where(fast_series > slow_series, 1, 0)
            
            signal_shifted = np.roll(signal, 1)
            signal_shifted[0] = 0
            
            strat_returns = returns_pct * signal_shifted
            cum_returns = np.cumprod(1 + strat_returns)
            net_return = (cum_returns[-1] - 1) * 100 if len(cum_returns) > 0 else 0
            
            roll_max = np.maximum.accumulate(cum_returns) if len(cum_returns) > 0 else [1]
            drawdowns = (cum_returns - roll_max) / roll_max if len(cum_returns) > 0 else [0]
            max_dd = drawdowns.min() * 100 if len(drawdowns) > 0 else 0
            
            mean_ret = np.mean(strat_returns) * 252
            std_ret = np.std(strat_returns) * np.sqrt(252)
            sharpe = (mean_ret - risk_free_rate) / std_ret if (std_ret and std_ret > 0) else 0
            
            z_matrix[i, j] = net_return
            
            results.append({
                'Fast_SMA': int(fast),
                'Slow_SMA': int(slow),
                'Net_Return_%': float(net_return),
                'Max_Drawdown_%': float(max_dd),
                'Sharpe_Ratio': float(sharpe)
            })
            
    res_df = pd.DataFrame(results).dropna()
    return res_df, z_matrix, fast_smas, slow_smas

def find_robust_plateau(z_matrix, fast_smas, slow_smas):
    best_score = -np.inf
    best_coord = (0, 0)
    
    rows, cols = z_matrix.shape
    # Expand to 5x5 neighborhood to ensure a wide, flat plateau
    for i in range(2, rows-2):
        for j in range(2, cols-2):
            if np.isnan(z_matrix[i, j]): continue
            
            neighborhood = z_matrix[i-2:i+3, j-2:j+3]
            if np.isnan(neighborhood).any(): continue
            
            mean_val = np.mean(neighborhood)
            std_val = np.std(neighborhood)
            
            # Skip unprofitable neighborhoods
            if mean_val <= 0: continue
            
            # Score heavily penalizes high standard deviation to find "flatness"
            # Similar to a Sharpe ratio for parameter stability
            score = mean_val / (std_val + 1.0)
            
            if score > best_score:
                best_score = score
                best_coord = (i, j)
                
    # Fallback to absolute max if no robust plateaus found
    if best_score == -np.inf:
        for i in range(rows):
            for j in range(cols):
                if not np.isnan(z_matrix[i, j]) and z_matrix[i, j] > best_score:
                    best_score = z_matrix[i, j]
                    best_coord = (i, j)

    opt_slow = int(slow_smas[best_coord[0]])
    opt_fast = int(fast_smas[best_coord[1]])
    opt_return = float(z_matrix[best_coord[0], best_coord[1]])
    
    return opt_fast, opt_slow, opt_return, float(best_score)

@router.get("/run-3d-optimization")
def optimization_endpoint():
    df = get_historical_data()
    res_df, z_matrix, fast_smas, slow_smas = run_3d_optimization_grid(df)
    opt_fast, opt_slow, opt_return, robust_score = find_robust_plateau(z_matrix, fast_smas, slow_smas)
    
    # Format z_matrix: replacing nan with None for JSON serialization
    z_matrix_clean = np.where(np.isnan(z_matrix), None, z_matrix).tolist()
    
    top_5 = res_df.sort_values(by=['Sharpe_Ratio', 'Net_Return_%'], ascending=[False, False]).head(5)
    
    return {
        "fast_smas": fast_smas.tolist(),
        "slow_smas": slow_smas.tolist(),
        "z_matrix": z_matrix_clean,
        "optimal": {
            "fast": opt_fast,
            "slow": opt_slow,
            "return": opt_return,
            "score": robust_score
        },
        "top_5": top_5.to_dict(orient="records")
    }
