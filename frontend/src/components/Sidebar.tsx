'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity, Box, Zap, PieChart, RefreshCcw, Info, Globe } from 'lucide-react';
import { useDashboardStore } from '@/store/useDashboardStore';
import { translations, Language } from '@/i18n/translations';

export default function Sidebar() {
    const pathname = usePathname();
    const { fetchData, fetchOptimization, language, setLanguage } = useDashboardStore();
    const t = translations[language];

    const NAV_ITEMS = [
        { name: t.livePriceFeed, href: '/', icon: Activity },
        { name: t.robustOptimization, href: '/optimization', icon: Box },
        { name: t.rebalanceCalculator, href: '/rebalance', icon: PieChart },
        { name: t.howItWorks, href: '/about', icon: Info },
    ];

    const handleRefresh = async () => {
        await Promise.all([fetchData(), fetchOptimization()]);
    };

    return (
        <aside className="w-64 bg-dash-sidebar border-r border-dash-border h-full flex flex-col">
            <div className="p-6">
                <h1 className="text-xl font-bold flex items-center gap-2 text-white">
                    <Zap className="text-dash-bull" fill="currentColor" /> {t.dashboard}
                </h1>
            </div>

            <div className="px-4 pb-4">
                <hr className="border-dash-border" />
            </div>

            <nav className="flex-1 px-3 space-y-1">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${isActive
                                ? 'bg-dash-panel text-white'
                                : 'text-dash-text-muted hover:bg-dash-panel hover:text-white'
                                }`}
                        >
                            <Icon size={18} className={isActive ? 'text-dash-bull' : ''} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-dash-border space-y-3">
                <div className="flex items-center gap-2 px-2 pb-2 text-dash-text-muted text-sm">
                    <Globe size={16} />
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value as Language)}
                        className="bg-dash-sidebar border border-dash-border rounded-md px-2 py-1 flex-1 text-white outline-none focus:border-dash-bull transition-colors"
                    >
                        <option value="en">English</option>
                        <option value="es">Español</option>
                        <option value="zh-TW">繁體中文</option>
                    </select>
                </div>

                <button
                    onClick={handleRefresh}
                    className="w-full flex justify-center items-center gap-2 bg-dash-panel hover:bg-dash-border border border-dash-border text-white text-sm font-medium py-2 rounded-md transition-all"
                >
                    <RefreshCcw size={16} /> {t.refreshData}
                </button>
            </div>
        </aside>
    );
}
