import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Language } from '@/i18n/translations';

interface DataState {
    liveData: any[];
    historicalData: any[];
    optimizationData: any | null;
    isLoading: boolean;
    isOptimizing: boolean;
    error: string | null;
    language: Language;
    setLanguage: (lang: Language) => void;
    fetchData: () => Promise<void>;
    fetchOptimization: () => Promise<void>;
}

export const useDashboardStore = create<DataState>()(
    persist(
        (set) => ({
            liveData: [],
            historicalData: [],
            optimizationData: null,
            isLoading: true,
            isOptimizing: false,
            error: null,
            language: 'en',
            setLanguage: (lang: Language) => set({ language: lang }),
            fetchData: async () => {
                set({ isLoading: true, error: null });
                try {
                    const [liveRes, histRes] = await Promise.all([
                        fetch('http://localhost:8000/api/live-data'),
                        fetch('http://localhost:8000/api/historical-data')
                    ]);

                    if (!liveRes.ok || !histRes.ok) throw new Error("Failed to fetch data");

                    const liveData = await liveRes.json();
                    const historicalData = await histRes.json();

                    set({ liveData, historicalData, isLoading: false });
                } catch (err: any) {
                    set({ error: err.message, isLoading: false });
                }
            },
            fetchOptimization: async () => {
                set({ isOptimizing: true, error: null });
                try {
                    const res = await fetch('http://localhost:8000/api/run-3d-optimization');
                    if (!res.ok) throw new Error("Failed to fetch optimization data");
                    const optimizationData = await res.json();
                    set({ optimizationData, isOptimizing: false });
                } catch (err: any) {
                    set({ error: err.message, isOptimizing: false });
                }
            }
        }),
        {
            name: 'dashboard-storage',
            partialize: (state) => ({ language: state.language }), // only persist language for dashboard store
        }
    )
);

interface RebalanceState {
    currentUsd: number | '';
    currentTwd: number | '';
    targetUsdPct: number;
    setBalances: (usd: number | '', twd: number | '', pct: number) => void;
    clearBalances: () => void;
}

export const useRebalanceStore = create<RebalanceState>()(
    persist(
        (set) => ({
            currentUsd: 10000,
            currentTwd: 300000,
            targetUsdPct: 50,
            setBalances: (usd, twd, pct) => set({ currentUsd: usd, currentTwd: twd, targetUsdPct: pct }),
            clearBalances: () => set({ currentUsd: '', currentTwd: '', targetUsdPct: 50 }),
        }),
        {
            name: 'rebalance-storage',
        }
    )
);
