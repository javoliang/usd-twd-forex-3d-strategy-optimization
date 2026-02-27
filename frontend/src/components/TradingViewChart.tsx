'use client';

import { useEffect, useRef, memo } from 'react';
import { useDashboardStore } from '@/store/useDashboardStore';

function TradingViewChartComponent() {
    const container = useRef<HTMLDivElement>(null);
    const { language } = useDashboardStore();

    // Map internal language state to TradingView locale codes
    const tvLocale = language === 'zh-TW' ? 'zh_TW' : language;

    useEffect(() => {
        const currentContainer = container.current;
        if (!currentContainer) return;

        // Clear previous content to avoid duplicate widgets
        currentContainer.innerHTML = '';

        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = JSON.stringify({
            "autosize": true,
            "symbol": "FX_IDC:USDTWD",
            "interval": "D",
            "timezone": "Etc/UTC",
            "theme": "dark",
            "style": "1",
            "locale": tvLocale,
            "enable_publishing": false,
            "backgroundColor": "#161b22",
            "gridColor": "#30363d",
            "hide_top_toolbar": false,
            "allow_symbol_change": false,
            "hide_legend": false,
            "save_image": false,
            "calendar": false,
            "support_host": "https://www.tradingview.com",
            "studies": [
                "Volume@tv-basicstudies"
            ]
        });

        currentContainer.appendChild(script);

        return () => {
            // Cleanup: clear the container when component unmounts or locale changes
            if (currentContainer) {
                currentContainer.innerHTML = '';
            }
        };
    }, [tvLocale]);

    return (
        <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}>
            <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
        </div>
    );
}

// Memoize to prevent unnecessary re-renders that could cause iframe detachment
const TradingViewWidget = memo(TradingViewChartComponent);

export default function TradingViewChart() {
    return (
        <div className="bg-dash-panel border border-dash-border rounded-xl p-2 shadow-xl h-[600px] w-full overflow-hidden">
            <TradingWidget />
        </div>
    );
}

// Simple internal rename to avoid confusion with the export name
const TradingWidget = () => <TradingViewWidget />;
