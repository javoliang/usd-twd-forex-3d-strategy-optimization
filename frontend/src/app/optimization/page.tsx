'use client';

import Optimization3DPlot from '@/components/Optimization3DPlot';
import { useDashboardStore } from '@/store/useDashboardStore';
import { translations } from '@/i18n/translations';

export default function OptimizationPage() {
    const { language } = useDashboardStore();
    const t = translations[language];

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
            <header>
                <h2 className="text-3xl font-bold tracking-tight text-white mb-2">{t.optTitle}</h2>
                <p className="text-dash-text-muted">
                    {t.optSubtitle}
                </p>
            </header>

            <Optimization3DPlot />
        </div>
    );
}
