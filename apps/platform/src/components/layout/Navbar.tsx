'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/navigation';
import { Button } from '@devsphere/ui';
import { Search, Github, Globe } from 'lucide-react';

export function Navbar() {
  const t = useTranslations('Platform');
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 glass-effect">
      <div className="flex items-center gap-8">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-white">
          DEV<span className="text-indigo-500">SPHERE</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-4">
          {['tools', 'games', 'social', 'productivity', 'fullapps'].map((cat) => (
            <button
              key={cat}
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
            >
              {t(cat)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder={t('search')}
            className="bg-zinc-900/50 border border-zinc-800 rounded-full py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
          />
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            locale={pathname.startsWith('/bn') ? 'en' : 'bn'}
            className="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 transition-colors"
          >
            <Globe className="w-3 h-3" />
            {pathname.startsWith('/bn') ? 'EN' : 'বাং'}
          </Link>
          
          <a href="https://github.com" target="_blank" rel="noreferrer">
            <Button variant="ghost" size="sm" className="p-2">
              <Github className="w-5 h-5" />
            </Button>
          </a>
        </div>
      </div>
    </nav>
  );
}
