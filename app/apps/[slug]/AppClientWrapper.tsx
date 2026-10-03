'use client';

import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { APPS_CATALOG, useGlobalStore } from '@/store/useGlobalStore';
import { ArrowLeft } from 'lucide-react';

// Modules
import { CalculatorModule } from '@/modules/calculator/CalculatorModule';
import { QuizModule } from '@/modules/quiz/QuizModule';
import { RpsModule } from '@/modules/rock-paper-scissors/RpsModule';
import { NotesModule } from '@/modules/notes/NotesModule';
import { StopwatchModule } from '@/modules/stopwatch/StopwatchModule';
import { QrReaderModule } from '@/modules/qr-reader/QrReaderModule';
import { WeatherModule } from '@/modules/weather/WeatherModule';
import { EcommerceModule } from '@/modules/ecommerce/EcommerceModule';
import { LandingPageModule } from '@/modules/landing-page/LandingPageModule';
import { PasswordModule } from '@/modules/password-generator/PasswordModule';

interface Props {
  slug: string;
}

export const AppClientWrapper: React.FC<Props> = ({ slug }) => {
  const { playSound } = useGlobalStore();

  const appMeta = APPS_CATALOG.find((a) => a.slug === slug);

  if (!appMeta) {
    return notFound();
  }

  const renderModule = () => {
    switch (slug) {
      case 'calculator':
        return <CalculatorModule />;
      case 'quiz':
        return <QuizModule />;
      case 'rock-paper-scissors':
        return <RpsModule />;
      case 'notes':
        return <NotesModule />;
      case 'stopwatch':
        return <StopwatchModule />;
      case 'qr-reader':
        return <QrReaderModule />;
      case 'weather':
        return <WeatherModule />;
      case 'ecommerce':
        return <EcommerceModule />;
      case 'landing-page':
        return <LandingPageModule />;
      case 'password-generator':
        return <PasswordModule />;
      default:
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold">App module under development...</h2>
          </div>
        );
    }
  };

  return (
    <div className="w-full min-h-full">
      {/* Sub-header breadcrumb bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
        <Link
          href="/"
          onClick={() => playSound('pop')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border-[2.5px] border-ink font-heading font-black text-xs text-ink shadow-neo-sm hover:translate-y-[-1px] active:translate-y-[1px] transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Town Hub</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-500 hidden sm:inline">Engine:</span>
          <span className="px-3 py-1 rounded-full bg-cream border-[2px] border-ink font-mono-code font-bold text-[11px] text-ink">
            {appMeta.techBadge}
          </span>
        </div>
      </div>

      {/* Embedded Module Container */}
      <div className="w-full">{renderModule()}</div>
    </div>
  );
};
