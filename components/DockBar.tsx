'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { APPS_CATALOG, useGlobalStore } from '@/store/useGlobalStore';
import { Home } from 'lucide-react';

export const DockBar: React.FC = () => {
  const pathname = usePathname();
  const { playSound, launchApp } = useGlobalStore();

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40">
      <div className="flex items-center gap-1.5 p-2 bg-white/90 backdrop-blur-md rounded-full border-[3.5px] border-[#1E1B4B] shadow-neo-lg">
        {/* Home Button */}
        <Link
          href="/"
          onClick={() => {
            playSound('pop');
          }}
          className={`relative p-2.5 rounded-full border-[2.5px] border-[#1E1B4B] transition-all duration-200 group ${
            pathname === '/' ? 'bg-[#FFD93D] scale-110 shadow-neo-sm' : 'bg-[#FFF8E7] hover:bg-[#FFD93D]/50 hover:scale-105'
          }`}
          title="Town Hub Home"
        >
          <Home className="w-4 h-4 text-[#1E1B4B]" />
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1E1B4B] text-white text-[10px] font-bold px-2 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            Town Hub
          </span>
        </Link>

        <div className="w-[2px] h-6 bg-[#1E1B4B]/20 mx-1" />

        {/* 10 Apps Icons */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-[85vw] sm:max-w-none px-1">
          {APPS_CATALOG.map((app, index) => {
            const isActive = pathname === `/apps/${app.slug}`;
            return (
              <Link
                key={app.id}
                href={`/apps/${app.slug}`}
                onClick={() => {
                  launchApp(app.slug);
                }}
                className={`relative p-2 rounded-2xl border-[2.5px] border-[#1E1B4B] transition-all duration-200 group flex-shrink-0 ${
                  isActive ? 'scale-115 shadow-neo-sm ring-2 ring-[#1E1B4B]' : 'hover:scale-110 hover:-translate-y-1'
                }`}
                style={{ backgroundColor: app.bgColor }}
                title={app.title}
              >
                <span className="text-sm font-bold block select-none">
                  {index === 0 && '🧮'}
                  {index === 1 && '🎡'}
                  {index === 2 && '✂️'}
                  {index === 3 && '📝'}
                  {index === 4 && '⏱️'}
                  {index === 5 && '📷'}
                  {index === 6 && '⛅'}
                  {index === 7 && '🛍️'}
                  {index === 8 && '🚀'}
                  {index === 9 && '🧪'}
                </span>
                <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-[#1E1B4B] text-white text-[11px] font-bold px-2 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-sm">
                  {app.title}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
