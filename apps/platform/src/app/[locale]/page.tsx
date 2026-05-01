import { useTranslations } from 'next-intl';
import { Scene } from '@/components/3d/Scene';
import { Navbar } from '@/components/layout/Navbar';

export default function Home() {
  const t = useTranslations('Platform');

  return (
    <main className="relative h-screen w-full overflow-hidden">
      <Navbar />
      
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 pointer-events-none">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500">
          {t('title')}
        </h1>
        <p className="text-xl md:text-2xl text-zinc-400 mt-4 font-medium uppercase tracking-widest">
          {t('tagline')}
        </p>
      </div>

      <Scene />

      <div className="absolute bottom-8 left-8 z-10 flex gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#00d4ff]" />
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-tighter">Tools</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#39ff14]" />
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-tighter">Games</span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff2d78]" />
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-tighter">Social</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ffb700]" />
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-tighter">Productivity</span>
          </div>
        </div>
      </div>
    </main>
  );
}
