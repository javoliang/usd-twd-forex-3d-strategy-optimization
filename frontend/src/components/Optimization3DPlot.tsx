'use client';

import dynamic from 'next/dynamic';
import { useDashboardStore } from '@/store/useDashboardStore';
import { Download, AlertCircle } from 'lucide-react';
import { translations } from '@/i18n/translations';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false, loading: () => <div className="h-96 w-full flex items-center justify-center bg-dash-border/20 rounded-xl animate-pulse">Loading 3D Engine...</div> });

export default function Optimization3DPlot() {
    const { optimizationData, isOptimizing, language } = useDashboardStore();
    const t = translations[language];

    if (isOptimizing || !optimizationData) {
        return (
            <div className="flex flex-col items-center justify-center p-24 bg-dash-panel border border-dash-border rounded-xl shadow-xl">
                <div className="h-12 w-12 border-4 border-dash-bull border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-6 text-lg text-dash-text-muted">{t.runningPermutations}</p>
            </div>
        );
    }

    const { fast_smas, slow_smas, z_matrix, optimal, top_5 } = optimizationData;

    const exportCSV = () => {
        const header = "Fast_SMA,Slow_SMA,Net_Return_%,Max_Drawdown_%,Sharpe_Ratio\n";
        const body = top_5.map((row: any) => `${row.Fast_SMA},${row.Slow_SMA},${row['Net_Return_%']},${row['Max_Drawdown_%']},${row.Sharpe_Ratio}`).join("\n");
        const blob = new Blob([header + body], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'robust_strategies.csv';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-6">
            <div className="bg-dash-bull/10 border-l-4 border-dash-bull p-4 rounded-r-md text-dash-bull font-medium flex gap-3 items-center">
                <AlertCircle size={20} className="shrink-0" />
                <p>{t.optimizationComplete}={optimal.fast}, {t.slowSma.split(' ')[0]}={optimal.slow} ({t.netReturn}: {optimal.return.toFixed(2)}%)</p>
            </div>

            <div className="bg-dash-panel border border-dash-border rounded-xl p-4 shadow-xl h-[600px] w-full">
                <Plot
                    data={[
                        {
                            type: 'surface',
                            z: z_matrix,
                            x: fast_smas,
                            y: slow_smas,
                            colorscale: 'Viridis',
                            hovertemplate: 'Fast: %{x}<br>Slow: %{y}<br>Return: %{z:.2f}%<extra></extra>'
                        },
                        {
                            type: 'scatter3d',
                            mode: 'markers+text',
                            x: [optimal.fast],
                            y: [optimal.slow],
                            z: [optimal.return + 5],
                            marker: { size: 6, color: 'red', symbol: 'diamond', line: { color: 'white', width: 2 } },
                            text: ["🎯 ROBUST ZONE"],
                            textposition: "top center",
                            textfont: { color: "white", size: 14, family: "Inter" }
                        }
                    ] as any}
                    layout={{
                        title: { text: t.strategyLandscape, font: { color: 'white' } } as any,
                        scene: {
                            xaxis: { title: t.fastSma, color: '#8b949e' },
                            yaxis: { title: t.slowSma, color: '#8b949e' },
                            zaxis: { title: `${t.netReturn} (%)`, color: '#8b949e' },
                            camera: { eye: { x: -1.5, y: -1.5, z: 1.2 } }
                        },
                        autosize: true,
                        margin: { l: 0, r: 0, t: 50, b: 0 },
                        paper_bgcolor: 'rgba(0,0,0,0)',
                        plot_bgcolor: 'rgba(0,0,0,0)',
                        font: { family: 'Inter' }
                    } as any}
                    useResizeHandler={true}
                    style={{ width: '100%', height: '100%' }}
                />
            </div>

            <div className="bg-dash-panel border border-dash-border rounded-xl overflow-hidden shadow-xl">
                <div className="p-4 border-b border-dash-border flex justify-between items-center">
                    <h3 className="font-bold text-lg text-white">{t.top5}</h3>
                    <button onClick={exportCSV} className="flex items-center gap-2 bg-dash-sidebar hover:bg-dash-border border border-dash-border px-3 py-1.5 rounded-md text-sm transition-colors text-white">
                        <Download size={16} /> {t.exportCsv}
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-dash-sidebar text-dash-text-muted">
                            <tr>
                                <th className="px-6 py-3 font-medium">{t.fastSma}</th>
                                <th className="px-6 py-3 font-medium">{t.slowSma}</th>
                                <th className="px-6 py-3 font-medium">{t.netReturn}</th>
                                <th className="px-6 py-3 font-medium">{t.maxDrawdown}</th>
                                <th className="px-6 py-3 font-medium">{t.sharpeRatio}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-dash-border">
                            {top_5.map((row: any, idx: number) => (
                                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                                    <td className="px-6 py-4 font-mono">{row.Fast_SMA}</td>
                                    <td className="px-6 py-4 font-mono">{row.Slow_SMA}</td>
                                    <td className="px-6 py-4 font-mono text-dash-bull">{(row['Net_Return_%'] || 0).toFixed(2)}%</td>
                                    <td className="px-6 py-4 font-mono text-dash-bear">{(row['Max_Drawdown_%'] || 0).toFixed(2)}%</td>
                                    <td className="px-6 py-4 font-mono text-white">{(row.Sharpe_Ratio || 0).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
