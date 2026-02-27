'use client';

import RebalanceCalculator from '@/components/RebalanceCalculator';
import { useDashboardStore } from '@/store/useDashboardStore';
import { translations } from '@/i18n/translations';

export default function RebalancePage() {
    const { language } = useDashboardStore();
    const t = translations[language];

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
            <header>
                <h2 className="text-3xl font-bold tracking-tight text-white mb-2">{t.rebalanceTitle}</h2>
                <p className="text-dash-text-muted">
                    {t.rebalanceSubtitle}
                </p>
            </header>

            <RebalanceCalculator />
        </div>
    );
}
