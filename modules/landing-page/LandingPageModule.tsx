'use client';

import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useGlobalStore } from '@/store/useGlobalStore';
import { Sparkles, Check, ArrowRight, Zap, Shield, Smile, Star } from 'lucide-react';

export const LandingPageModule: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('yearly');
  const [teamSeats, setTeamSeats] = useState(5);

  const { playSound, addXP } = useGlobalStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Three.js 3D Hero Shape
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.z = 4.5;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const geometry = new THREE.IcosahedronGeometry(1.4, 0);
    const material = new THREE.MeshStandardMaterial({
      color: 0xff6b9d,
      roughness: 0.2,
      metalness: 0.1,
      wireframe: false,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffd93d, 2.5);
    dirLight.position.set(3, 4, 3);
    scene.add(dirLight);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      mesh.rotation.x += 0.008;
      mesh.rotation.y += 0.012;
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

  const calculatePrice = () => {
    const base = billingPeriod === 'yearly' ? 12 : 15;
    return teamSeats * base;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Top Badge */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sunny border-[2.5px] border-ink font-heading font-black text-xs shadow-neo-sm">
          <Sparkles className="w-3.5 h-3.5 text-bubblegum" />
          App 09 • Stitch UI Model: Boopl Platform
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-white p-8 sm:p-12 rounded-[40px] border-[4.5px] border-ink shadow-neo-xl mb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7">
          <h1 className="text-4xl sm:text-5xl font-heading font-black text-ink leading-tight mb-4">
            The Playful Illustrated Work Platform for High-Velocity Teams.
          </h1>
          <p className="text-base sm:text-lg font-semibold text-gray-700 mb-8 leading-relaxed">
            Replace boring spreadsheets and clunky project boards with tactile sticker canvases, gamified quests, and joyful real-time collaboration.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                playSound('win');
                addXP(25);
              }}
              className="px-8 py-4 rounded-2xl bg-sunny border-[3.5px] border-ink font-heading font-black text-base text-ink shadow-neo hover:translate-y-[-2px] active:translate-y-[2px] transition-all flex items-center gap-2"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => playSound('pop')}
              className="px-6 py-4 rounded-2xl bg-cream border-[3px] border-ink font-heading font-bold text-sm text-ink shadow-neo-sm hover:bg-sunny/30"
            >
              Watch 2-Min Demo 🍿
            </button>
          </div>
        </div>

        {/* 3D Interactive Hero Canvas */}
        <div className="lg:col-span-5 relative w-full h-80 bg-cream rounded-3xl border-[4px] border-ink shadow-neo flex items-center justify-center overflow-hidden">
          <canvas ref={canvasRef} className="w-full h-full" />
          <div className="absolute bottom-3 px-3 py-1 rounded-full bg-white/90 border-[2px] border-ink text-[11px] font-bold">
            Interactive Three.js Core 💫
          </div>
        </div>
      </div>

      {/* Dynamic Pricing Calculator Section */}
      <div className="bg-cream p-8 sm:p-10 rounded-[36px] border-[4px] border-ink shadow-neo-lg mb-12 text-center">
        <h2 className="text-3xl font-heading font-black text-ink mb-2">
          Transparent, Toy-Simple Pricing
        </h2>
        <p className="text-sm font-semibold text-gray-600 mb-8">
          Scale effortlessly as your creative squad expands.
        </p>

        {/* Billing Switcher */}
        <div className="inline-flex items-center gap-2 bg-white p-1.5 rounded-2xl border-[3px] border-ink shadow-neo-sm mb-8">
          <button
            onClick={() => {
              setBillingPeriod('monthly');
              playSound('click');
            }}
            className={`px-4 py-2 rounded-xl font-heading font-bold text-xs transition-all ${
              billingPeriod === 'monthly' ? 'bg-sunny text-ink' : 'text-gray-500'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => {
              setBillingPeriod('yearly');
              playSound('click');
            }}
            className={`px-4 py-2 rounded-xl font-heading font-bold text-xs transition-all flex items-center gap-1.5 ${
              billingPeriod === 'yearly' ? 'bg-bubblegum text-white' : 'text-gray-500'
            }`}
          >
            <span>Annual (20% Off)</span>
            <span className="text-[10px] bg-white text-bubblegum px-1.5 py-0.5 rounded-md font-black">SAVE</span>
          </button>
        </div>

        {/* Interactive Seats Slider */}
        <div className="max-w-md mx-auto mb-8">
          <div className="flex justify-between items-center text-xs font-bold text-gray-600 mb-2">
            <span>Team Members:</span>
            <span className="font-heading text-base font-black text-ink">{teamSeats} Seats</span>
          </div>
          <input
            type="range"
            min="1"
            max="50"
            value={teamSeats}
            onChange={(e) => setTeamSeats(Number(e.target.value))}
            className="w-full h-3 bg-white rounded-lg appearance-none cursor-pointer border-[2px] border-ink accent-bubblegum"
          />
        </div>

        {/* Dynamic Price Display */}
        <div className="inline-block p-6 rounded-3xl bg-white border-[3.5px] border-ink shadow-neo-md mb-8">
          <span className="text-xs font-bold text-gray-500 block uppercase tracking-wider">Estimated Investment</span>
          <div className="flex items-baseline justify-center gap-1 mt-1">
            <span className="text-4xl font-heading font-black text-ink">${calculatePrice()}</span>
            <span className="text-xs font-bold text-gray-500">/ month</span>
          </div>
        </div>

        <div>
          <button
            onClick={() => {
              playSound('win');
              addXP(20);
            }}
            className="px-8 py-3.5 rounded-2xl bg-mint border-[3.5px] border-ink font-heading font-black text-sm text-ink shadow-neo hover:translate-y-[-2px] active:translate-y-[2px] transition-all"
          >
            Claim {teamSeats}-Seat Workspace Trial
          </button>
        </div>
      </div>
    </div>
  );
};
