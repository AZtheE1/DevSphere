import type { Metadata } from 'next';
import './globals.css';
import { NavigationShell } from '@/components/NavigationShell';
import { DockBar } from '@/components/DockBar';

export const metadata: Metadata = {
  title: 'Doodle Land | 40-App Unified Master Dashboard',
  description: 'A playful Neo-Brutalist 40-micro-app master command center built with Next.js 15, Turborepo, Three.js, GSAP, and Anime.js.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-cream text-ink antialiased selection:bg-bubblegum selection:text-white">
        <NavigationShell />
        <main className="flex-1 pb-24">{children}</main>
        <DockBar />
      </body>
    </html>
  );
}
