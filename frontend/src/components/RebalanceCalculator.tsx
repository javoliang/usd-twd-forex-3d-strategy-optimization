'use client';

import { useEffect, useState } from 'react';
import { useDashboardStore, useRebalanceStore } from '@/store/useDashboardStore';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { CheckCircle2, ArrowRight, Trash2 } from 'lucide-react';
import { translations } from '@/i18n/translations';

const COLORS = ['#238636', '#1f6feb'];

export default function RebalanceCalculator() {
    const { liveData, historicalData, optimizationData, language } = useDashboardStore();
    const { currentUsd, currentTwd, targetUsdPct, setBalances, clearBalances } = useRebalanceStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!liveData || liveData.length === 0) return null;
    const currentPrice = liveData[liveData.length - 1].Close;

    const t = translations[language];

    // Safely fallback to 0 if input is empty when performing calculations
    const usdVal = currentUsd === '' ? 0 : currentUsd;
    const twdVal = currentTwd === '' ? 0 : currentTwd;

    const totalWealthInTwd = (usdVal * currentPrice) + twdVal;
    const targetUsdInTwd = totalWealthInTwd * (targetUsdPct / 100.0);
    const targetTwd = totalWealthInTwd - targetUsdInTwd;
    const usdToBuyInTwd = targetUsdInTwd - (usdVal * currentPrice);

    // AI suggestion logic based on optimal robust strategy
    let suggestion = 'neutral';
    if (historicalData && historicalData.length > 0 && optimizationData) {
        const closes = historicalData.map(d => d.Close);
        const fast = optimizationData.optimal.fast;
        const slow = optimizationData.optimal.slow;

        if (closes.length >= slow) {
            const fastSlice = closes.slice(-fast);
            const slowSlice = closes.slice(-slow);
            const fastSma = fastSlice.reduce((a, b) => a + b, 0) / fast;
            const slowSma = slowSlice.reduce((a, b) => a + b, 0) / slow;
            if (fastSma > slowSma) suggestion = 'buy_usd';
            else suggestion = 'buy_twd';
        }
    }

    const currentData = [
        { name: 'USD Value', value: usdVal * currentPrice },
        { name: 'TWD Value', value: twdVal }
    ];
    const targetData = [
        { name: 'USD Value', value: targetUsdInTwd },
        { name: 'TWD Value', value: targetTwd }
    ];

    if (!mounted) {
        return <div className="animate-pulse bg-dash-panel h-96 rounded-xl w-full"></div>;
    }

    return (
        <div className="space-y-8 animate-in mt-4">
            <div className="flex justify-end">
                <button
                    onClick={clearBalances}
                    className="flex items-center gap-2 text-dash-text-muted hover:text-dash-bear transition-colors text-sm font-medium"
                >
                    <Trash2 size={16} /> {t.clearBal}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-dash-panel border border-dash-border p-6 rounded-xl shadow-lg">
                    <label className="block text-sm font-medium text-dash-text-muted mb-2">{t.myUsdAmount}</label>
                    <input
                        type="number"
                        value={currentUsd}
                        onChange={e => setBalances(e.target.value === '' ? '' : Number(e.target.value), currentTwd, targetUsdPct)}
                        className="w-full bg-dash-sidebar border border-dash-border rounded-md px-4 py-3 text-white focus:outline-none focus:border-dash-bull transition-colors text-lg"
                    />
                </div>
                <div className="bg-dash-panel border border-dash-border p-6 rounded-xl shadow-lg">
                    <label className="block text-sm font-medium text-dash-text-muted mb-2">{t.myTwdAmount}</label>
                    <input
                        type="number"
                        value={currentTwd}
                        onChange={e => setBalances(currentUsd, e.target.value === '' ? '' : Number(e.target.value), targetUsdPct)}
                        className="w-full bg-dash-sidebar border border-dash-border rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#1f6feb] transition-colors text-lg"
                    />
                </div>
            </div>

            <div className="bg-dash-panel border border-dash-border p-6 rounded-xl shadow-lg">
                <div className="flex justify-between mb-4">
                    <label className="text-sm font-medium text-dash-text-muted">{t.targetUsdAllocation}</label>
                    <span className="text-white font-bold text-lg">{targetUsdPct}%</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={targetUsdPct}
                    onChange={e => setBalances(currentUsd, currentTwd, Number(e.target.value))}
                    className="w-full h-2 bg-dash-border rounded-lg appearance-none cursor-pointer accent-dash-bull"
                />
                <div className="flex justify-between text-xs text-dash-text-muted mt-2">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                </div>
            </div>

            {Math.abs(usdToBuyInTwd) < 100 ? (
                <div className="bg-dash-bull/10 border-l-4 border-dash-bull p-6 rounded-r-md text-dash-bull flex items-center gap-3">
                    <CheckCircle2 size={24} />
                    <p className="font-bold text-lg">{t.perfectlyBalanced}</p>
                </div>
            ) : (
                <div className="bg-dash-panel border border-dash-border p-6 rounded-xl shadow-lg flex flex-col items-center gap-4">
                    <h3 className="text-dash-text-muted text-lg flex items-center gap-2">
                        <span className="animate-pulse">🟢</span> {t.actionRequired}
                    </h3>
                    <div className="flex items-center justify-center gap-4 flex-wrap bg-dash-sidebar px-8 py-6 rounded-xl border border-dash-border mt-2">
                        {usdToBuyInTwd > 0 ? (
                            <div className="flex flex-col items-center gap-3 text-center">
                                <span className="text-dash-text-muted font-medium">{t.swapTwdToUsd}</span>
                                <div className="flex items-center gap-4">
                                    <div className="text-3xl font-bold text-[#1f6feb]">{usdToBuyInTwd.toLocaleString(undefined, { maximumFractionDigits: 0 })} TWD</div>
                                    <ArrowRight className="text-white" size={28} />
                                    <div className="text-3xl font-bold text-dash-bull">${(usdToBuyInTwd / currentPrice).toLocaleString(undefined, { maximumFractionDigits: 2 })} USD</div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-3 text-center">
                                <span className="text-dash-text-muted font-medium">{t.swapUsdToTwd}</span>
                                <div className="flex items-center gap-4">
                                    <div className="text-3xl font-bold text-dash-bull">${(Math.abs(usdToBuyInTwd) / currentPrice).toLocaleString(undefined, { maximumFractionDigits: 2 })} USD</div>
                                    <ArrowRight className="text-white" size={28} />
                                    <div className="text-3xl font-bold text-[#1f6feb]">{Math.abs(usdToBuyInTwd).toLocaleString(undefined, { maximumFractionDigits: 0 })} TWD</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {suggestion !== 'neutral' && (
                <div className="bg-dash-panel border border-dash-border p-6 rounded-xl shadow-lg flex flex-col items-center gap-4">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        {t.suggestionTitle}
                    </h3>

                    {suggestion === 'buy_usd' ? (
                        twdVal > 0 ? (
                            <>
                                <p className="text-center font-medium text-dash-bull">{t.suggestionBuyUsd}</p>
                                <div className="flex items-center justify-center gap-4 flex-wrap bg-dash-sidebar px-8 py-6 rounded-xl border border-dash-border mt-2 w-full max-w-2xl">
                                    <div className="flex flex-col items-center gap-3 text-center">
                                        <span className="text-dash-text-muted font-medium">{t.swapTwdToUsd}</span>
                                        <div className="flex items-center gap-4">
                                            <div className="text-3xl font-bold text-[#1f6feb]">{twdVal.toLocaleString(undefined, { maximumFractionDigits: 0 })} TWD</div>
                                            <ArrowRight className="text-white" size={28} />
                                            <div className="text-3xl font-bold text-dash-bull">${(twdVal / currentPrice).toLocaleString(undefined, { maximumFractionDigits: 2 })} USD</div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <p className="text-center font-medium text-dash-bull">{t.suggestionPositioned}</p>
                        )
                    ) : (
                        usdVal > 0 ? (
                            <>
                                <p className="text-center font-medium text-[#1f6feb]">{t.suggestionBuyTwd}</p>
                                <div className="flex items-center justify-center gap-4 flex-wrap bg-dash-sidebar px-8 py-6 rounded-xl border border-dash-border mt-2 w-full max-w-2xl">
                                    <div className="flex flex-col items-center gap-3 text-center">
                                        <span className="text-dash-text-muted font-medium">{t.swapUsdToTwd}</span>
                                        <div className="flex items-center gap-4">
                                            <div className="text-3xl font-bold text-dash-bull">${usdVal.toLocaleString(undefined, { maximumFractionDigits: 2 })} USD</div>
                                            <ArrowRight className="text-white" size={28} />
                                            <div className="text-3xl font-bold text-[#1f6feb]">{(usdVal * currentPrice).toLocaleString(undefined, { maximumFractionDigits: 0 })} TWD</div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <p className="text-center font-medium text-[#1f6feb]">{t.suggestionPositioned}</p>
                        )
                    )}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[400px]">
                <div className="bg-dash-panel border border-dash-border rounded-xl p-4 shadow-lg flex flex-col items-center justify-center">
                    <h4 className="text-center font-bold text-white mb-2">{t.currentAllocation}</h4>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={currentData}
                                cx="50%" cy="50%"
                                innerRadius={40} outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                                stroke="none"
                                label={({ name, value }) => `${(name || '').split(' ')[0]}: ${Number(value).toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
                                labelLine={true}
                            >
                                {currentData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                            </Pie>
                            <Tooltip formatter={(value: any) => `NT$ ${Number(value).toLocaleString(undefined, { maximumFractionDigits: 0 })}`} contentStyle={{ backgroundColor: '#161b22', borderColor: '#30363d', color: '#fff' }} />
                            <Legend verticalAlign="bottom" height={20} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-dash-panel border border-dash-border rounded-xl p-4 shadow-lg flex flex-col items-center justify-center">
                    <h4 className="text-center font-bold text-white mb-2">{t.targetAllocation}</h4>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={targetData}
                                cx="50%" cy="50%"
                                innerRadius={40} outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                                stroke="none"
                                label={({ name, value }) => `${(name || '').split(' ')[0]}: ${Number(value).toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
                                labelLine={true}
                            >
                                {targetData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                            </Pie>
                            <Tooltip formatter={(value: any) => `NT$ ${Number(value).toLocaleString(undefined, { maximumFractionDigits: 0 })}`} contentStyle={{ backgroundColor: '#161b22', borderColor: '#30363d', color: '#fff' }} />
                            <Legend verticalAlign="bottom" height={20} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
