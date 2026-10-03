'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGlobalStore } from '@/store/useGlobalStore';
import { Sparkles, Sun, CloudRain, Moon, Wind, Droplets, Compass, Thermometer } from 'lucide-react';

type WeatherType = 'sunny' | 'rainy' | 'night';

export const WeatherModule: React.FC = () => {
  const [weather, setWeather] = useState<WeatherType>('sunny');
  const [location, setLocation] = useState('Doodle Valley');
  const [tempUnit, setTempUnit] = useState<'C' | 'F'>('C');

  const { playSound, addXP } = useGlobalStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Weather physics particle simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let particles: { x: number; y: number; speed: number; size: number; alpha: number }[] = [];

    const initParticles = () => {
      canvas.width = canvas.parentElement?.clientWidth || 600;
      canvas.height = 240;
      particles = [];

      const count = weather === 'rainy' ? 70 : weather === 'night' ? 40 : 25;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          speed: weather === 'rainy' ? 4 + Math.random() * 6 : 0.5 + Math.random() * 1.5,
          size: weather === 'rainy' ? 1.5 : 2 + Math.random() * 3,
          alpha: Math.random(),
        });
      }
    };
    initParticles();

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        if (weather === 'rainy') {
          ctx.strokeStyle = `rgba(76, 201, 240, ${p.alpha * 0.8})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - 2, p.y + 12);
          ctx.stroke();

          p.y += p.speed;
          if (p.y > canvas.height) {
            p.y = -10;
            p.x = Math.random() * canvas.width;
          }
        } else if (weather === 'night') {
          ctx.fillStyle = `rgba(255, 217, 61, ${Math.sin(Date.now() * 0.003 + p.x) * 0.5 + 0.5})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Sunny sparkles
          ctx.fillStyle = `rgba(255, 217, 61, ${p.alpha * 0.6})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();

          p.y -= p.speed * 0.3;
          if (p.y < 0) p.y = canvas.height;
        }
      });

      animId = requestAnimationFrame(render);
    };
    render();

    return () => cancelAnimationFrame(animId);
  }, [weather]);

  const switchWeather = (type: WeatherType) => {
    setWeather(type);
    playSound(type === 'rainy' ? 'laser' : 'pop');
    addXP(10);

    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { scale: 0.97, opacity: 0.8 },
        { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' }
      );
    }
  };

  const getThemeDetails = () => {
    if (weather === 'sunny') {
      return {
        bg: '#FFD93D',
        temp: 24,
        condition: 'Bright & Cheerful Sunny Day',
        icon: <Sun className="w-16 h-16 text-ink animate-spin" style={{ animationDuration: '20s' }} />,
        cardBg: 'bg-cream',
      };
    }
    if (weather === 'rainy') {
      return {
        bg: '#4CC9F0',
        temp: 16,
        condition: 'Playful Puddle Rainy Storm',
        icon: <CloudRain className="w-16 h-16 text-ink animate-bounce" />,
        cardBg: 'bg-[#E3DFFF]',
      };
    }
    return {
      bg: '#1A1838',
      temp: 12,
      condition: 'Sleepy Moonlit Night',
      icon: <Moon className="w-16 h-16 text-sunny" />,
      cardBg: 'bg-[#2D2A5B]',
    };
  };

  const currentTheme = getThemeDetails();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header Banner */}
      <div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 p-6 rounded-3xl border-[4px] border-ink shadow-neo-lg transition-colors"
        style={{ backgroundColor: currentTheme.bg, color: weather === 'night' ? 'white' : '#1E1B4B' }}
      >
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-ink font-bold text-xs border-[2px] border-ink mb-2 shadow-neo-sm">
            <Sparkles className="w-3.5 h-3.5 text-bubblegum" />
            App 07 • Stitch UI Model
          </div>
          <h1 className="text-3xl font-heading font-black">Doodle Weather Horizon</h1>
          <p className="text-sm font-semibold opacity-90 mt-1">
            Canvas particle physics simulation for Sunny, Rainy Storm, and Sleepy Night scenes.
          </p>
        </div>

        {/* Condition Picker */}
        <div className="flex items-center gap-2 bg-white/20 p-1.5 rounded-2xl border-[3px] border-ink">
          <button
            onClick={() => switchWeather('sunny')}
            className={`p-2 rounded-xl font-heading font-bold text-xs transition-all ${
              weather === 'sunny' ? 'bg-sunny text-ink border-[2px] border-ink shadow-neo-sm' : 'text-current'
            }`}
            title="Sunny Day"
          >
            ☀️ Sun
          </button>
          <button
            onClick={() => switchWeather('rainy')}
            className={`p-2 rounded-xl font-heading font-bold text-xs transition-all ${
              weather === 'rainy' ? 'bg-sky text-ink border-[2px] border-ink shadow-neo-sm' : 'text-current'
            }`}
            title="Rainy Storm"
          >
            🌧️ Rain
          </button>
          <button
            onClick={() => switchWeather('night')}
            className={`p-2 rounded-xl font-heading font-bold text-xs transition-all ${
              weather === 'night' ? 'bg-grape text-white border-[2px] border-ink shadow-neo-sm' : 'text-current'
            }`}
            title="Sleepy Night"
          >
            🌙 Night
          </button>
        </div>
      </div>

      {/* Main Weather Hero Card */}
      <div
        ref={cardRef}
        className={`p-8 rounded-[36px] border-[4.5px] border-ink shadow-neo-xl mb-8 transition-colors ${currentTheme.cardBg} ${
          weather === 'night' ? 'text-white' : 'text-ink'
        }`}
      >
        {/* Canvas Particle Overlay */}
        <div className="relative rounded-3xl overflow-hidden mb-6 border-[3px] border-ink bg-white/40 backdrop-blur-sm">
          <canvas ref={canvasRef} className="w-full h-44 block" />
          <div className="absolute inset-0 flex items-center justify-between px-8 pointer-events-none">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest block opacity-70">
                {location}
              </span>
              <h2 className="text-4xl sm:text-5xl font-heading font-black tracking-tight">
                {tempUnit === 'C' ? `${currentTheme.temp}°C` : `${Math.round((currentTheme.temp * 9) / 5 + 32)}°F`}
              </h2>
              <p className="text-sm font-bold opacity-90 mt-1">{currentTheme.condition}</p>
            </div>
            <div>{currentTheme.icon}</div>
          </div>
        </div>

        {/* Environmental Telemetry Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white border-[3px] border-ink text-ink shadow-neo-sm">
            <span className="text-xs font-bold text-gray-500 flex items-center gap-1">
              <Wind className="w-3.5 h-3.5 text-sky" /> Wind Speed
            </span>
            <span className="text-xl font-heading font-black mt-1 block">14 km/h</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border-[3px] border-ink text-ink shadow-neo-sm">
            <span className="text-xs font-bold text-gray-500 flex items-center gap-1">
              <Droplets className="w-3.5 h-3.5 text-sky" /> Humidity
            </span>
            <span className="text-xl font-heading font-black mt-1 block">
              {weather === 'rainy' ? '88%' : '45%'}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white border-[3px] border-ink text-ink shadow-neo-sm">
            <span className="text-xs font-bold text-gray-500 flex items-center gap-1">
              <Sun className="w-3.5 h-3.5 text-tangerine" /> UV Index
            </span>
            <span className="text-xl font-heading font-black mt-1 block">
              {weather === 'sunny' ? '6 (Mod)' : '1 (Low)'}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white border-[3px] border-ink text-ink shadow-neo-sm">
            <span className="text-xs font-bold text-gray-500 flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-grape" /> Pressure
            </span>
            <span className="text-xl font-heading font-black mt-1 block">1013 hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};
