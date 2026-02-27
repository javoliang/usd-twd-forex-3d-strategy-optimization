import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'USD/TWD Smart Converter Pro',
  description: 'Production-grade quant dashboard for USD/TWD trading strategy',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="flex h-screen overflow-hidden bg-dash-bg text-dash-text-muted">
        <Sidebar />
        <main className="flex-1 h-full overflow-y-auto w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
