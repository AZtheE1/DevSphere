'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useGlobalStore } from '@/store/useGlobalStore';
import { Volume2, VolumeX, Moon, Sun, Flame, Sparkles, Home, Grid } from 'lucide-react';

export const NavigationShell: React.FC = () => {
  const pathname = usePathname();
  const { darkMode, soundEnabled, userXP, streakDays, toggleDarkMode, toggleSound, playSound } = useGlobalStore();

  return (
    <header className="sticky top-0 z-50 w-full px-4 sm:px-8 py-3 bg-cream/90 backdrop-blur-md border-b-[3.5px] border-ink shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Brand / Logo */}
        <Link 
          href="/" 
          onClick={() => playSound('pop')}
          className="flex items-center gap-3 group"
        >
          <div className="w-12 h-12 min-w-[48px] rounded-2xl bg-sunny border-[3px] border-ink shadow-neo-sm flex items-center justify-center group-hover:rotate-6 transition-transform">
            <span className="text-2xl">🎪</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-xl text-ink tracking-tight">Doodle Land</span>
              <span className="px-2 py-0.5 rounded-full bg-bubblegum text-white text-[11px] font-bold border-[2px] border-ink uppercase tracking-wider">
                M1 Suite
              </span>
            </div>
            <p className="text-xs font-semibold text-ink/70 hidden sm:block">40-App Master Command Center</p>
          </div>
        </Link>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border-[3px] border-ink shadow-neo-sm">
          <Link
            href="/"
            onClick={() => playSound('click')}
            className={`flex items-center gap-1.5 px-4 py-2 min-h-[48px] rounded-full text-sm font-bold transition-all ${
              pathname === '/' 
                ? 'bg-sunny text-ink border-[2px] border-ink' 
                : 'text-ink/80 hover:bg-cream'
            }`}
          >
            <Home className="w-5 h-5" />
            Town Hub
          </Link>
          <Link
            href="/#apps-grid"
            onClick={() => playSound('click')}
            className="flex items-center gap-1.5 px-4 py-2 min-h-[48px] rounded-full text-sm font-bold text-ink/80 hover:bg-cream transition-all"
          >
            <Grid className="w-5 h-5" />
            Apps (10 Active)
          </Link>
        </nav>

        {/* Right: Gamified Stats & Audio Controls */}
        <div className="flex items-center gap-2.5">
          {/* Streak Badge */}
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 min-h-[48px] rounded-full bg-tangerine/20 border-[2.5px] border-ink text-sm font-bold text-ink">
            <Flame className="w-5 h-5 text-tangerine fill-tangerine" />
            <span>{streakDays} Day Streak</span>
          </div>

          {/* XP Pill */}
          <div className="flex items-center gap-2 px-4 py-2 min-h-[48px] rounded-full bg-mint border-[2.5px] border-ink text-sm font-bold text-ink shadow-neo-sm">
            <Sparkles className="w-5 h-5 fill-ink" />
            <span>{userXP} XP</span>
          </div>

          {/* Sound FX Toggle */}
          <button
            onClick={() => {
              toggleSound();
              playSound('click');
            }}
            title={soundEnabled ? 'Disable sound FX' : 'Enable sound FX'}
            className="w-12 h-12 min-w-[48px] rounded-full bg-white border-[2.5px] border-ink flex items-center justify-center text-ink shadow-neo-sm hover:translate-y-[-1px] active:translate-y-[2px] transition-transform"
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-gray-400" />}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => {
              toggleDarkMode();
              playSound('click');
            }}
            title="Toggle theme"
            className="w-12 h-12 min-w-[48px] rounded-full bg-white border-[2.5px] border-ink flex items-center justify-center text-ink shadow-neo-sm hover:translate-y-[-1px] active:translate-y-[2px] transition-transform"
          >
            {darkMode ? <Moon className="w-5 h-5 text-grape" /> : <Sun className="w-5 h-5 text-tangerine" />}
          </button>
        </div>
      </div>
    </header>
  );
};
