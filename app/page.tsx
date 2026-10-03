'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import * as THREE from 'three';
import gsap from 'gsap';
import { APPS_CATALOG, useGlobalStore } from '@/store/useGlobalStore';
import { Sparkles, Trophy, Flame, Play, ArrowRight, Grid, Filter, CheckCircle2, Star, Zap } from 'lucide-react';
import { LoginHero } from '@/components/LoginHero';
import Image from 'next/image';

export default function HomeDashboard() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { playSound, addXP, userXP, streakDays, launchApp, isAuthenticated, setIsAuthenticated } = useGlobalStore();

  const mascotCanvasRef = useRef<HTMLCanvasElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);

  // Three.js 3D Mascot Scene
  useEffect(() => {
    const canvas = mascotCanvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Toy Torus Mascot
    const geometry = new THREE.TorusGeometry(1.2, 0.45, 24, 64);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffd93d,
      roughness: 0.15,
      metalness: 0.2,
    });
    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);

    // Inner Gem
    const gemGeo = new THREE.OctahedronGeometry(0.7);
    const gemMat = new THREE.MeshStandardMaterial({
      color: 0xff6b9d,
      roughness: 0.1,
    });
    const gem = new THREE.Mesh(gemGeo, gemMat);
    scene.add(gem);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x4cc9f0, 3);
    dirLight.position.set(4, 5, 4);
    scene.add(dirLight);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      torus.rotation.x += 0.009;
      torus.rotation.y += 0.012;
      gem.rotation.y -= 0.015;
      gem.rotation.z += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!canvas) return;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  // GSAP entrance staggers for bento grid cards
  useEffect(() => {
    if (cardsGridRef.current) {
      gsap.fromTo(
        cardsGridRef.current.children,
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.06, ease: 'back.out(1.5)' }
      );
    }
  }, [selectedCategory]);

  const categories = ['All', 'Utilities', 'Games', 'Productivity', 'Commerce', 'Lifestyle'];

  const filteredApps =
    selectedCategory === 'All'
      ? APPS_CATALOG
      : APPS_CATALOG.filter((app) => app.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
      {/* Global Navigation Bar */}
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full border-[3px] border-ink shadow-neo-sm overflow-hidden bg-white">
            <Image src="/logo.svg" alt="Google Stitch Mascot" width={48} height={48} />
          </div>
          <span className="font-heading font-black text-xl text-ink hidden sm:inline">DevSphere : Doodle Land Micro-Apps Suite</span>
          <span className="font-heading font-black text-xl text-ink sm:hidden">DevSphere</span>
        </div>
        <button 
          onClick={() => setIsAuthenticated(false)} 
          className="px-4 py-2 min-h-[48px] rounded-xl bg-bubblegum border-[2.5px] border-ink shadow-neo-sm font-heading font-bold text-ink hover:translate-y-[-2px] transition-transform"
        >
          Logout
        </button>
      </header>

      {/* Hero Bento Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
        {/* Main Welcome Station */}
        <div className="lg:col-span-8 bg-sunny p-8 sm:p-10 rounded-[36px] border-[4.5px] border-ink shadow-neo-xl relative overflow-hidden flex flex-col justify-between">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border-[2.5px] border-ink font-heading font-black text-xs text-ink mb-4 shadow-neo-sm">
              <Sparkles className="w-3.5 h-3.5 text-bubblegum" />
              Milestone 1 Complete • 10 Active Apps Live
            </div>
            <h1 className="text-3xl sm:text-5xl font-heading font-black text-ink leading-tight mb-3">
              Welcome to Doodle Land Town Hub!
            </h1>
            <p className="text-sm sm:text-base font-semibold text-ink/80 max-w-xl mb-6">
              The unified master command center for all 40 micro-apps. Enjoy snappy Next.js 15 routing, Three.js 3D physics, GSAP timeline choreography, and tactile Neo-Brutalist toy land design.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 relative z-10">
            <Link
              href="/apps/calculator"
              onClick={() => launchApp('calculator')}
              className="px-6 py-3.5 min-h-[48px] rounded-2xl bg-ink text-white border-[3px] border-ink font-heading font-black text-sm shadow-neo hover:translate-y-[-2px] active:translate-y-[2px] transition-all flex items-center gap-2"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>Launch App 01 (Robo-Calc)</span>
            </Link>

            <Link
              href="/apps/quiz"
              onClick={() => launchApp('quiz')}
              className="px-6 py-3.5 min-h-[48px] rounded-2xl bg-white text-ink border-[3px] border-ink font-heading font-black text-sm shadow-neo hover:translate-y-[-2px] active:translate-y-[2px] transition-all"
            >
              🎡 Play 3D Quiz Wheel
            </Link>
          </div>

          {/* Background Decorative Sticker Accents */}
          <div className="absolute right-4 -bottom-6 text-9xl opacity-15 pointer-events-none select-none">
            🎪
          </div>
        </div>

        {/* 3D Live Mascot Interactive Cell */}
        <div className="lg:col-span-4 bg-cream p-6 rounded-[36px] border-[4.5px] border-ink shadow-neo-xl flex flex-col items-center justify-between text-center relative overflow-hidden">
          <div className="w-full flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider font-mono-code">
              PORTAL 3D MASCOT
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-mint text-ink font-bold text-[10px] border border-ink">
              ONLINE
            </span>
          </div>

          <div className="w-full h-44 my-2 flex items-center justify-center">
            <canvas ref={mascotCanvasRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
          </div>

          <div className="w-full">
            <h3 className="font-heading font-black text-lg text-ink">Sparky the Core</h3>
            <p className="text-xs font-semibold text-gray-600 mt-0.5">
              React Three.js WebGL Toy Gyroscope
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter Chips Bar */}
      <div id="apps-grid" className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
          <span className="text-xs font-bold text-gray-500 flex items-center gap-1.5 mr-1">
            <Filter className="w-3.5 h-3.5" /> Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                playSound('click');
              }}
              className={`px-4 py-2 min-h-[48px] min-w-[48px] rounded-full border-[2.5px] border-ink font-heading font-bold text-xs transition-all shadow-neo-sm flex-shrink-0 ${
                selectedCategory === cat
                  ? 'bg-sunny text-ink scale-105'
                  : 'bg-white text-gray-700 hover:bg-cream'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="text-xs font-bold text-gray-500 font-mono-code">
          Showing {filteredApps.length} of 10 Launch Ready Apps
        </div>
      </div>

      {/* Master 10-App Bento Grid */}
      <div ref={cardsGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {filteredApps.map((app) => (
          <Link
            key={app.id}
            href={`/apps/${app.slug}`}
            onClick={() => launchApp(app.slug)}
            className="p-6 sm:p-7 rounded-[32px] border-[4px] border-ink shadow-neo bg-white hover:translate-y-[-4px] hover:rotate-0.5 transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Card Top Pill & Number */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className="px-3 py-1 rounded-full border-[2px] border-ink text-[11px] font-heading font-bold text-ink"
                  style={{ backgroundColor: app.bgColor }}
                >
                  {app.tag}
                </span>
                <span className="text-xs font-mono-code font-bold text-gray-400">
                  {app.category}
                </span>
              </div>

              {/* Icon Banner */}
              <div
                className="w-full h-28 rounded-2xl border-[3px] border-ink flex items-center justify-center text-4xl mb-5 shadow-neo-sm group-hover:scale-105 transition-transform"
                style={{ backgroundColor: app.bgColor }}
              >
                {app.slug === 'calculator' && '🧮'}
                {app.slug === 'quiz' && '🎡'}
                {app.slug === 'rock-paper-scissors' && '⚔️'}
                {app.slug === 'notes' && '📝'}
                {app.slug === 'stopwatch' && '⏱️'}
                {app.slug === 'qr-reader' && '📷'}
                {app.slug === 'weather' && '⛅'}
                {app.slug === 'ecommerce' && '🛍️'}
                {app.slug === 'landing-page' && '🚀'}
                {app.slug === 'password-generator' && '🧪'}
              </div>

              <h2 className="font-heading font-black text-2xl text-ink mb-1.5 group-hover:text-bubblegum transition-colors">
                {app.title}
              </h2>
              <p className="text-xs font-semibold text-gray-600 mb-6 leading-relaxed">
                {app.description}
              </p>
            </div>

            {/* Bottom Tech Badge & Action Trigger */}
            <div className="pt-4 border-t-[2.5px] border-ink/15 flex items-center justify-between">
              <span className="text-[11px] font-mono-code font-bold text-gray-500">
                {app.techBadge}
              </span>
              <div className="w-12 h-12 rounded-xl bg-cream border-[2px] border-ink flex items-center justify-center text-ink group-hover:bg-sunny transition-colors">
                <ArrowRight className="w-6 h-6" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Milestone 1 Achievement Badge */}
      <div className="p-8 rounded-[36px] bg-mint border-[4.5px] border-ink shadow-neo-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 rounded-3xl bg-white border-[3.5px] border-ink shadow-neo-sm flex items-center justify-center flex-shrink-0">
            <Trophy className="w-8 h-8 text-ink" />
          </div>
          <div>
            <h3 className="text-2xl font-heading font-black text-ink">
              Milestone 1 (Apps 1–10) Complete!
            </h3>
            <p className="text-sm font-semibold text-ink/80 mt-0.5">
              All 10 initial apps are built, integrated into the Unified Master Dashboard, and ready for production testing.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            playSound('win');
            addXP(100);
          }}
          className="px-6 py-3.5 min-h-[48px] rounded-2xl bg-sunny border-[3px] border-ink font-heading font-black text-sm text-ink shadow-neo hover:translate-y-[-2px] active:translate-y-[2px] transition-all whitespace-nowrap"
        >
          Claim +100 Milestone XP ⭐
        </button>
      </div>
    </div>
  );
}
