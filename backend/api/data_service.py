import yfinance as yf
import pandas as pd
import numpy as np
from fastapi import APIRouter, HTTPException
import time

router = APIRouter()
TICKER = "USDTWD=X"

cache = {
    "live": {"data": None, "timestamp": 0},
    "historical": {"data": None, "timestamp": 0}
}

def compute_indicators(df):
    df = df.copy()
    df['SMA_200'] = df['Close'].rolling(window=200).mean()
    
    delta = df['Close'].diff()
    up = delta.clip(lower=0)
    down = -1 * delta.clip(upper=0)
    ema_up = up.ewm(com=13, adjust=False).mean()
    ema_down = down.ewm(com=13, adjust=False).mean()
    rs = ema_up / ema_down
    df['RSI'] = 100 - (100 / (1 + rs))
    
    high = df['High'].values
    low = df['Low'].values
    close = df['Close'].values
    prev_close = np.roll(close, 1)
    prev_close[0] = close[0]
    tr = np.maximum(high - low, np.maximum(np.abs(high - prev_close), np.abs(low - prev_close)))
    df['ATR'] = pd.Series(tr, index=df.index).rolling(14).mean()
    
    plus_dm = high - np.roll(high, 1)
    minus_dm = np.roll(low, 1) - low
    plus_dm[plus_dm < 0] = 0
    minus_dm[minus_dm < 0] = 0
    
    mask = plus_dm > minus_dm
    plus_di = np.where(mask, plus_dm, 0)
    minus_di = np.where(~mask, minus_dm, 0)
    
    tr_smooth = pd.Series(tr, index=df.index).rolling(14).sum()
    plus_di_smooth = pd.Series(plus_di, index=df.index).rolling(14).sum()
    minus_di_smooth = pd.Series(minus_di, index=df.index).rolling(14).sum()
    
    di_plus = 100 * (plus_di_smooth / tr_smooth)
    di_minus = 100 * (minus_di_smooth / tr_smooth)
    dx = 100 * np.abs(di_plus - di_minus) / (di_plus + di_minus)
    df['ADX'] = dx.rolling(14).mean()
    
    # Fill NaN values to safely convert to JSON
    df = df.fillna(0)
    return df

def get_live_data():
    now = time.time()
    if cache["live"]["data"] is not None and (now - cache["live"]["timestamp"] < 60):
        return cache["live"]["data"]
    try:
        t = yf.Ticker(TICKER)
        df = t.history(period="5d", interval="5m")
        if df.empty: raise ValueError("Empty dataframe")
        cache["live"]["data"] = df
        cache["live"]["timestamp"] = now
        return df
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def get_historical_data():
    now = time.time()
    if cache["historical"]["data"] is not None and (now - cache["historical"]["timestamp"] < 3600):
        return cache["historical"]["data"]
    try:
        t = yf.Ticker(TICKER)
        df = t.history(period="5y", interval="1d")
        if df.empty: raise ValueError("Empty dataframe")
        df_enriched = compute_indicators(df)
        cache["historical"]["data"] = df_enriched
        cache["historical"]["timestamp"] = now
        return df_enriched
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/live-data")
def live_data():
    df = get_live_data()
    df_reset = df.reset_index()
    if 'Datetime' in df_reset.columns:
        df_reset['Datetime'] = df_reset['Datetime'].dt.strftime("%Y-%m-%d %H:%M:%S")
    return df_reset.to_dict(orient="records")

@router.get("/historical-data")
def historical_data():
    df = get_historical_data()
    df_reset = df.reset_index()
    if 'Date' in df_reset.columns:
        df_reset['Date'] = df_reset['Date'].dt.strftime("%Y-%m-%d")
    return df_reset.to_dict(orient="records")
