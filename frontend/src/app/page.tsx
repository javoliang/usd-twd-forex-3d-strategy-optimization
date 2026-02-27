'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useDashboardStore } from '@/store/useDashboardStore';
import LivePriceWidget from '@/components/LivePriceWidget';
import SentimentGauge from '@/components/SentimentGauge';
import { translations } from '@/i18n/translations';

const TradingViewChart = dynamic(() => import('@/components/TradingViewChart'), { ssr: false, loading: () => <div className="h-[600px] w-full bg-dash-border/20 animate-pulse rounded-xl"></div> });

export default function Home() {
  const { liveData, historicalData, isLoading, fetchData, fetchOptimization, language } = useDashboardStore();
  const t = translations[language];

  useEffect(() => {
    fetchData();
    fetchOptimization();
  }, [fetchData, fetchOptimization]);

  if (isLoading) {
    return (
      <div className="p-8 flex justify-center items-center h-full">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 border-4 border-dash-bull border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-dash-text-muted">Loading Live Interbank Data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">USD/TWD {t.livePriceFeed}</h2>
        <p className="text-dash-text-muted mt-1 flex items-center gap-2 text-sm md:text-base">
          <span className="w-2 h-2 rounded-full bg-dash-bull animate-pulse"></span>
          Real-time Interbank FX Data • Auto-updating
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Price and Sparkline spans 2 columns */}
        <div className="lg:col-span-2">
          <LivePriceWidget data={liveData} historical={historicalData} />
        </div>

        {/* Sentiment Gauge spans 1 column */}
        <div className="lg:col-span-1 border border-dash-border bg-dash-panel rounded-xl p-6 shadow-xl h-[300px] md:h-auto">
          <SentimentGauge latest={historicalData[historicalData.length - 1]} />
        </div>
      </div>

      {/* Full Width TradingView Candlestick Chart */}
      <div className="w-full">
        <TradingViewChart />
      </div>
    </div>
  );
}
