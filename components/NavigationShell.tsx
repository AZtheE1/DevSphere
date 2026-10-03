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
    <header className="sticky top-0 z-50 w-full px-4 sm:px-8 py-3 bg-[#FFF8E7]/90 backdrop-blur-md border-b-[3.5px] border-[#1E1B4B] shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Brand / Logo */}
        <Link 
          href="/" 
          onClick={() => playSound('pop')}
          className="flex items-center gap-3 group"
        >
          <div className="w-11 h-11 rounded-2xl bg-[#FFD93D] border-[3px] border-[#1E1B4B] shadow-neo-sm flex items-center justify-center group-hover:rotate-6 transition-transform">
            <span className="text-2xl">🎪</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-xl text-[#1E1B4B] tracking-tight">Doodle Land</span>
              <span className="px-2 py-0.5 rounded-full bg-[#FF6B9D] text-white text-[11px] font-bold border-[2px] border-[#1E1B4B] uppercase tracking-wider">
                M1 Suite
              </span>
            </div>
            <p className="text-xs font-semibold text-[#1E1B4B]/70 hidden sm:block">40-App Master Command Center</p>
          </div>
        </Link>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border-[3px] border-[#1E1B4B] shadow-neo-sm">
          <Link
            href="/"
            onClick={() => playSound('click')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
              pathname === '/' 
                ? 'bg-[#FFD93D] text-[#1E1B4B] border-[2px] border-[#1E1B4B]' 
                : 'text-[#1E1B4B]/80 hover:bg-[#FFF8E7]'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            Town Hub
          </Link>
          <Link
            href="/#apps-grid"
            onClick={() => playSound('click')}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-[#1E1B4B]/80 hover:bg-[#FFF8E7] transition-all"
          >
            <Grid className="w-3.5 h-3.5" />
            Apps (10 Active)
          </Link>
        </nav>

        {/* Right: Gamified Stats & Audio Controls */}
        <div className="flex items-center gap-2.5">
          {/* Streak Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF9F1C]/20 border-[2.5px] border-[#1E1B4B] text-xs font-bold text-[#1E1B4B]">
            <Flame className="w-4 h-4 text-[#FF9F1C] fill-[#FF9F1C]" />
            <span>{streakDays} Day Streak</span>
          </div>

          {/* XP Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6BE585] border-[2.5px] border-[#1E1B4B] text-xs font-bold text-[#1E1B4B] shadow-neo-sm">
            <Sparkles className="w-4 h-4 fill-[#1E1B4B]" />
            <span>{userXP} XP</span>
          </div>

          {/* Sound FX Toggle */}
          <button
            onClick={() => {
              toggleSound();
              playSound('click');
            }}
            title={soundEnabled ? 'Disable sound FX' : 'Enable sound FX'}
            className="w-9 h-9 rounded-full bg-white border-[2.5px] border-[#1E1B4B] flex items-center justify-center text-[#1E1B4B] shadow-neo-sm hover:translate-y-[-1px] active:translate-y-[2px] transition-transform"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-gray-400" />}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => {
              toggleDarkMode();
              playSound('click');
            }}
            title="Toggle theme"
            className="w-9 h-9 rounded-full bg-white border-[2.5px] border-[#1E1B4B] flex items-center justify-center text-[#1E1B4B] shadow-neo-sm hover:translate-y-[-1px] active:translate-y-[2px] transition-transform"
          >
            {darkMode ? <Moon className="w-4 h-4 text-[#9B5DE5]" /> : <Sun className="w-4 h-4 text-[#FF9F1C]" />}
          </button>
        </div>
      </div>
    </header>
  );
};
