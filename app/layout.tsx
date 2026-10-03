import type { Metadata } from 'next';
import './globals.css';
import { AuthGuard } from '@/components/AuthGuard';

export const metadata: Metadata = {
  title: 'DevSphere : Doodle Land Micro-Apps Suite',
  description: 'A playful Neo-Brutalist 40-micro-app master command center built with Next.js 15, Turborepo, Three.js, GSAP, and Anime.js.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-cream text-ink dark:bg-darkbg dark:text-surface antialiased selection:bg-bubblegum selection:text-white transition-colors duration-300 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]">
        <AuthGuard>{children}</AuthGuard>
      </body>
    </html>
  );
}
