'use client';

import dynamic from 'next/dynamic';
import { useDashboardStore } from '@/store/useDashboardStore';
import { translations } from '@/i18n/translations';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false, loading: () => <div className="h-full w-full animate-pulse bg-dash-border/20 rounded-lg"></div> });

export default function SentimentGauge({ latest }: { latest: any }) {
    const { language } = useDashboardStore();
    const t = translations[language];

    if (!latest) return null;

    const rsi = latest.RSI || 50;
    const adx = latest.ADX || 20;
    const sma200 = latest.SMA_200 || latest.Close;
    const price = latest.Close;

    let score = 50;
    if (rsi > 55) score += 15;
    else if (rsi < 45) score -= 15;

    if (price > sma200) score += 20;
    else score -= 20;

    if (adx > 25) {
        if (score > 50) score += 15;
        else score -= 15;
    }

    score = Math.max(0, Math.min(100, score));

    return (
        <div className="h-full flex flex-col items-center justify-center pt-2">
            <h3 className="text-xl font-bold text-white mb-2">{t.technicalSentiment}</h3>
            <div className="w-full h-56 relative">
                <Plot
                    data={[{
                        type: "indicator",
                        mode: "gauge+number",
                        value: score,
                        gauge: {
                            axis: { range: [null, 100], tickwidth: 1, tickcolor: "white" },
                            bar: { color: "#ffffff" },
                            bgcolor: "rgba(0,0,0,0)",
                            borderwidth: 2,
                            bordercolor: "#30363d",
                            steps: [
                                { range: [0, 40], color: '#da3633' },
                                { range: [40, 60], color: '#8b949e' },
                                { range: [60, 100], color: '#2ea043' }
                            ],
                        }
                    }] as any}
                    layout={{
                        margin: { t: 0, b: 0, l: 30, r: 30 },
                        paper_bgcolor: 'rgba(0,0,0,0)',
                        font: { color: 'white', family: 'Inter' }
                    } as any}
                    useResizeHandler={true}
                    style={{ width: '100%', height: '100%' }}
                    config={{ displayModeBar: false }}
                />
            </div>
            <div className="text-center mt-2 text-sm text-dash-text-muted space-y-2 pb-2 w-full">
                <p className="flex justify-between px-6"><span>{t.rsi}</span> <span className="text-white font-mono font-bold">{rsi.toFixed(1)}</span></p>
                <p className="flex justify-between px-6"><span>{t.adx}</span> <span className="text-white font-mono font-bold">{adx.toFixed(1)}</span></p>
                <p className="flex justify-between px-6"><span>{t.vs200sma}</span> <span className={`font-mono font-bold ${price > sma200 ? 'text-dash-bull' : 'text-dash-bear'}`}>{price > sma200 ? t.above : t.below}</span></p>
            </div>
        </div>
    );
}
