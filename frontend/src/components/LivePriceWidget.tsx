'use client';

import { useDashboardStore } from '@/store/useDashboardStore';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';
import { translations } from '@/i18n/translations';

export default function LivePriceWidget({ data, historical }: { data: any[], historical: any[] }) {
    const { language } = useDashboardStore();
    const t = translations[language];

    if (!data || data.length === 0) return null;

    const current = data[data.length - 1];
    const currentPrice = current.Close;
    const openPrice = data[0].Open;

    const pctChange = ((currentPrice - openPrice) / openPrice) * 100;
    const isUp = pctChange >= 0;
    const color = isUp ? '#2ea043' : '#da3633';

    const sparkData = data.slice(-12);

    return (
        <div className="bg-dash-panel border border-dash-border rounded-xl p-6 md:p-8 shadow-xl relative overflow-hidden h-full flex flex-col justify-center group min-h-[300px]">
            <div className={`absolute top-0 right-0 w-64 h-64 opacity-5 blur-3xl rounded-full translate-x-1/3 -translate-y-1/3 transition-all duration-700 ease-in-out group-hover:scale-150 ${isUp ? 'bg-dash-bull' : 'bg-dash-bear'}`}></div>

            <p className="text-dash-text-muted font-medium mb-2 text-base md:text-lg">{t.usdEquals}</p>

            {/* Optimized for space: using flex with wrap and dynamic clamping */}
            <div className="flex items-baseline flex-wrap gap-x-3 gap-y-0 mb-3">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tighter leading-none" style={{ fontSize: 'clamp(2.5rem, 10vw, 4.5rem)' }}>
                    {currentPrice.toFixed(4)}
                </h1>
                <span className="text-2xl md:text-3xl font-bold text-dash-text-muted">TWD</span>
            </div>

            <div className={`flex items-center gap-1 font-bold text-xl lg:text-2xl ${isUp ? 'text-dash-bull' : 'text-dash-bear'}`}>
                {isUp ? <ArrowUpRight size={28} /> : <ArrowDownRight size={28} />}
                {Math.abs(pctChange).toFixed(2)}% {t.today}
            </div>

            <div className="flex-1 min-h-[100px] mt-6 w-full -mx-4 group-hover:opacity-80 transition-opacity">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sparkData}>
                        <YAxis domain={['dataMin', 'dataMax']} hide />
                        <Line
                            type="natural"
                            dataKey="Close"
                            stroke={color}
                            strokeWidth={4}
                            dot={false}
                            isAnimationActive={true}
                            animationDuration={1500}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
