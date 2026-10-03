'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGlobalStore } from '@/store/useGlobalStore';
import { Sparkles, Play, Pause, RotateCcw, Flag, BarChart2, Zap } from 'lucide-react';

export const StopwatchModule: React.FC = () => {
  const [mode, setMode] = useState<'stopwatch' | 'timer'>('stopwatch');
  const [timeMs, setTimeMs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const [timerTarget, setTimerTarget] = useState(60); // 60 seconds default

  const { playSound, addXP } = useGlobalStore();
  const ringRef = useRef<SVGCircleElement>(null);
  const graphRef = useRef<HTMLDivElement>(null);

  // Interval timer engine
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeMs((prev) => prev + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // GSAP ring animation
  useEffect(() => {
    if (ringRef.current) {
      const radius = 90;
      const circumference = 2 * Math.PI * radius;
      const progress = (timeMs % 60000) / 60000;
      const offset = circumference - progress * circumference;

      gsap.to(ringRef.current, {
        strokeDashoffset: offset,
        duration: 0.1,
        ease: 'none',
      });
    }
  }, [timeMs]);

  const handleStartPause = () => {
    setIsRunning(!isRunning);
    playSound('click');
    if (!isRunning && timeMs === 0) {
      addXP(10);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeMs(0);
    setLaps([]);
    playSound('zap');
  };

  const handleLap = () => {
    if (!isRunning) return;
    setLaps([timeMs, ...laps]);
    playSound('pop');
    addXP(5);

    if (graphRef.current) {
      gsap.fromTo(
        graphRef.current.children,
        { scaleY: 0 },
        { scaleY: 1, duration: 0.3, stagger: 0.05, ease: 'back.out(2)' }
      );
    }
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centis = Math.floor((ms % 1000) / 10);
    return {
      min: String(minutes).padStart(2, '0'),
      sec: String(seconds).padStart(2, '0'),
      ms: String(centis).padStart(2, '0'),
    };
  };

  const t = formatTime(timeMs);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-tangerine text-ink p-6 rounded-3xl border-[4px] border-ink shadow-neo-lg">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white font-bold text-xs border-[2px] border-ink mb-2 shadow-neo-sm">
            <Sparkles className="w-3.5 h-3.5 text-bubblegum" />
            App 05 • Stitch UI Model
          </div>
          <h1 className="text-3xl font-heading font-black">Speedway Stopwatch Track</h1>
          <p className="text-sm font-semibold text-ink/80 mt-1">
            GSAP-driven Cyberpunk neon dial, lap performance graph & melting timer.
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-2 bg-white/30 p-1.5 rounded-2xl border-[3px] border-ink">
          <button
            onClick={() => {
              setMode('stopwatch');
              handleReset();
            }}
            className={`px-3 py-1.5 rounded-xl font-heading font-bold text-xs transition-all ${
              mode === 'stopwatch' ? 'bg-sunny text-ink border-[2px] border-ink shadow-neo-sm' : 'text-ink'
            }`}
          >
            ⏱️ Stopwatch
          </button>
          <button
            onClick={() => {
              setMode('timer');
              handleReset();
            }}
            className={`px-3 py-1.5 rounded-xl font-heading font-bold text-xs transition-all ${
              mode === 'timer' ? 'bg-sunny text-ink border-[2px] border-ink shadow-neo-sm' : 'text-ink'
            }`}
          >
            ⏳ Melting Timer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Dial & Controls */}
        <div className="lg:col-span-7 bg-white p-8 rounded-[32px] border-[4.5px] border-ink shadow-neo-xl flex flex-col items-center">
          {/* Neon Ring Circular Tracker */}
          <div className="relative w-64 h-64 mb-8 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="128"
                cy="128"
                r="90"
                stroke="#FFF8E7"
                strokeWidth="16"
                fill="transparent"
              />
              <circle
                ref={ringRef}
                cx="128"
                cy="128"
                r="90"
                stroke="#FFD93D"
                strokeWidth="16"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 90}`}
                strokeDashoffset="0"
                strokeLinecap="round"
              />
            </svg>

            {/* Centered Digital Display */}
            <div className="absolute flex flex-col items-center">
              <div className="font-mono-code font-black text-4xl text-ink tracking-tight">
                {t.min}:{t.sec}
              </div>
              <div className="font-mono-code font-bold text-xl text-bubblegum mt-0.5">
                .{t.ms}
              </div>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">
                {isRunning ? 'TRACKING LIVE' : 'STOPPED'}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 w-full justify-center">
            <button
              onClick={handleStartPause}
              className={`px-8 py-4 rounded-2xl border-[3.5px] border-ink font-heading font-black text-lg shadow-neo hover:translate-y-[-2px] active:translate-y-[2px] transition-all flex items-center gap-2 ${
                isRunning ? 'bg-bubblegum text-white' : 'bg-mint text-ink'
              }`}
            >
              {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              <span>{isRunning ? 'Pause' : 'Start Track'}</span>
            </button>

            <button
              onClick={handleLap}
              disabled={!isRunning}
              className="p-4 rounded-2xl bg-sky text-ink border-[3.5px] border-ink shadow-neo hover:translate-y-[-2px] active:translate-y-[2px] transition-all disabled:opacity-40"
              title="Record Lap"
            >
              <Flag className="w-5 h-5" />
            </button>

            <button
              onClick={handleReset}
              className="p-4 rounded-2xl bg-cream text-ink border-[3.5px] border-ink shadow-neo hover:translate-y-[-2px] active:translate-y-[2px] transition-all"
              title="Reset Timer"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Lap Analytics & Graph Drawer */}
        <div className="lg:col-span-5 bg-white p-6 rounded-[32px] border-[4px] border-ink shadow-neo-lg">
          <div className="flex items-center justify-between pb-3 border-b-[3px] border-ink mb-4">
            <h2 className="font-heading font-bold text-lg text-ink flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-tangerine" />
              Lap Telemetry
            </h2>
            <span className="text-xs font-bold text-gray-500">{laps.length} Laps</span>
          </div>

          {/* Mini Lap Bar Graph */}
          {laps.length > 0 && (
            <div ref={graphRef} className="h-28 bg-cream p-3 rounded-2xl border-[2.5px] border-ink flex items-end gap-1.5 mb-4 overflow-hidden">
              {laps.slice(0, 10).map((lap, idx) => {
                const max = Math.max(...laps);
                const heightPct = Math.max((lap / max) * 100, 15);
                return (
                  <div
                    key={idx}
                    className="flex-1 rounded-t-lg border-t-2 border-x-2 border-ink bg-sunny"
                    style={{ height: `${heightPct}%` }}
                    title={`Lap ${laps.length - idx}: ${(lap / 1000).toFixed(2)}s`}
                  />
                );
              })}
            </div>
          )}

          {/* Laps List */}
          <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
            {laps.length === 0 ? (
              <div className="py-12 text-center text-gray-400 font-semibold text-xs">
                Tap the flag icon while running to capture lap times.
              </div>
            ) : (
              laps.map((lap, idx) => {
                const formatted = formatTime(lap);
                return (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-cream border-[2px] border-ink flex items-center justify-between font-mono-code text-xs"
                  >
                    <span className="font-bold text-ink">Lap {laps.length - idx}</span>
                    <span className="font-black text-bubblegum">
                      {formatted.min}:{formatted.sec}.{formatted.ms}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
