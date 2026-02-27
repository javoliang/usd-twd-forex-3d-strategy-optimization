'use client';

import { useDashboardStore } from '@/store/useDashboardStore';
import { translations } from '@/i18n/translations';

export default function AboutPage() {
    const { language } = useDashboardStore();
    const t = translations[language];

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 text-dash-text-muted">
            <header>
                <h2 className="text-3xl font-bold tracking-tight text-white mb-4">{t.aboutTitle}</h2>
            </header>

            <div className="space-y-6">
                <section className="bg-dash-panel border border-dash-border p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-white mb-3">{t.aboutQ1}</h3>
                    <p className="leading-relaxed">
                        {t.aboutA1}
                    </p>
                </section>

                <section className="bg-dash-panel border border-dash-border p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-white mb-3">{t.aboutQ2}</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>{t.aboutA2_1}</li>
                        <li>{t.aboutA2_2}</li>
                    </ul>
                </section>

                <section className="bg-dash-panel border border-dash-border p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-white mb-3">{t.aboutQ3}</h3>
                    <p className="mb-2">{t.aboutA3}</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>{t.aboutA3_1}</li>
                        <li>{t.aboutA3_2}</li>
                        <li>{t.aboutA3_3}</li>
                    </ul>
                </section>
            </div>

            <footer className="pt-8 mt-8 border-t border-dash-border text-center text-sm opacity-70">
                <p><strong className="text-white">{t.disclaimer.split(':')[0]}:</strong> {t.disclaimer.substring(t.disclaimer.indexOf(':') + 1)}</p>
                <p>{t.dataProvided}</p>
            </footer>
        </div>
    );
}
