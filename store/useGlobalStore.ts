import { create } from 'zustand';

export interface AppMetadata {
  id: string;
  slug: string;
  title: string;
  category: 'Utilities' | 'Games' | 'Productivity' | 'Commerce' | 'Lifestyle';
  description: string;
  icon: string;
  bgColor: string;
  accentColor: string;
  tag: string;
  techBadge: string;
}

export const APPS_CATALOG: AppMetadata[] = [
  {
    id: 'app-1',
    slug: 'calculator',
    title: 'Robo-Calc Toy',
    category: 'Utilities',
    description: 'Neon sci-fi toy calculator with tape history, Anime.js ripples & audio synthesis.',
    icon: 'Calculator',
    bgColor: '#FFD93D',
    accentColor: '#1E1B4B',
    tag: 'App 01',
    techBadge: 'Anime.js + Sound FX',
  },
  {
    id: 'app-2',
    slug: 'quiz',
    title: 'Wheel of Wonder',
    category: 'Games',
    description: '3D Category spin wheel with Three.js, live countdown, confetti & high scores.',
    icon: 'HelpCircle',
    bgColor: '#4CC9F0',
    accentColor: '#1E1B4B',
    tag: 'App 02',
    techBadge: 'Three.js 3D + Confetti',
  },
  {
    id: 'app-3',
    slug: 'rock-paper-scissors',
    title: 'Paw Brawl 2P',
    category: 'Games',
    description: 'Neo-Brutalist 1P vs CPU & 2P Same-Screen arena with clash battle FX.',
    icon: 'Swords',
    bgColor: '#FF6B9D',
    accentColor: '#1E1B4B',
    tag: 'App 03',
    techBadge: 'Anime.js Battle FX',
  },
  {
    id: 'app-4',
    slug: 'notes',
    title: 'Corkboard & Notes',
    category: 'Productivity',
    description: 'Sticky notes & Markdown dual-pane editor with AI auto-tagger & Framer transitions.',
    icon: 'FileText',
    bgColor: '#6BE585',
    accentColor: '#1E1B4B',
    tag: 'App 04',
    techBadge: 'Framer Motion + Markdown',
  },
  {
    id: 'app-5',
    slug: 'stopwatch',
    title: 'Speedway Chrono',
    category: 'Utilities',
    description: 'Cyberpunk neon ring timer & lap analytics chart with GSAP timeline physics.',
    icon: 'Timer',
    bgColor: '#FF9F1C',
    accentColor: '#1E1B4B',
    tag: 'App 05',
    techBadge: 'GSAP Timelines + Canvas',
  },
  {
    id: 'app-6',
    slug: 'qr-reader',
    title: 'Detective QR Studio',
    category: 'Utilities',
    description: 'Camera scanner simulation + custom logo sticker QR generator with peeling preview.',
    icon: 'QrCode',
    bgColor: '#9B5DE5',
    accentColor: '#ffffff',
    tag: 'App 06',
    techBadge: 'Anime.js Loops + QRCode',
  },
  {
    id: 'app-7',
    slug: 'weather',
    title: 'Doodle Weather',
    category: 'Lifestyle',
    description: 'Sunny, Stormy & Sleepy Night live particle weather simulation with interactive charts.',
    icon: 'CloudSun',
    bgColor: '#4CC9F0',
    accentColor: '#1E1B4B',
    tag: 'App 07',
    techBadge: 'Canvas Particles + GSAP',
  },
  {
    id: 'app-8',
    slug: 'ecommerce',
    title: 'Toy Emporium',
    category: 'Commerce',
    description: 'Bento shop grid, 3D product view, flying cart drawer & 4-step checkout journey.',
    icon: 'ShoppingBag',
    bgColor: '#FFD93D',
    accentColor: '#1E1B4B',
    tag: 'App 08',
    techBadge: 'GSAP Flying Cart + 3D',
  },
  {
    id: 'app-9',
    slug: 'landing-page',
    title: 'Boopl Platform',
    category: 'Productivity',
    description: 'Playful illustrated work platform with 3D hero mascot, pricing slider & ScrollTrigger.',
    icon: 'Sparkles',
    bgColor: '#FF6B9D',
    accentColor: '#ffffff',
    tag: 'App 09',
    techBadge: 'GSAP ScrollTrigger + 3D',
  },
  {
    id: 'app-10',
    slug: 'password-generator',
    title: 'Potion Lab Vault',
    category: 'Utilities',
    description: 'Wizard password concocter with slot machine scramble & crack time calculation.',
    icon: 'KeyRound',
    bgColor: '#6BE585',
    accentColor: '#1E1B4B',
    tag: 'App 10',
    techBadge: 'Anime.js Scramble + Meter',
  },
];

interface GlobalState {
  darkMode: boolean;
  soundEnabled: boolean;
  userXP: number;
  streakDays: number;
  recentApps: string[];
  activeModal: string | null;
  toggleDarkMode: () => void;
  toggleSound: () => void;
  addXP: (amount: number) => void;
  launchApp: (slug: string) => void;
  openModal: (id: string) => void;
  closeModal: () => void;
  playSound: (type?: 'click' | 'pop' | 'success' | 'win' | 'laser' | 'zap') => void;
}

export const useGlobalStore = create<GlobalState>((set, get) => ({
  darkMode: false,
  soundEnabled: true,
  userXP: 1420,
  streakDays: 7,
  recentApps: ['calculator', 'quiz', 'weather'],
  activeModal: null,

  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
  addXP: (amount: number) => set((state) => ({ userXP: state.userXP + amount })),
  
  launchApp: (slug: string) => {
    set((state) => ({
      recentApps: [slug, ...state.recentApps.filter((s) => s !== slug)].slice(0, 5),
    }));
    get().playSound('pop');
  },

  openModal: (id: string) => set({ activeModal: id }),
  closeModal: () => set({ activeModal: null }),

  playSound: (type = 'click') => {
    if (!get().soundEnabled || typeof window === 'undefined') return;

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'pop') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.08);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'success' || type === 'win') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
        osc.frequency.setValueAtTime(1046.50, now + 0.24); // C6
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
      } else if (type === 'laser') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.15);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'zap') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(110, now + 0.12);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      }
    } catch {
      // Audio context might be restricted before user gesture
    }
  },
}));
