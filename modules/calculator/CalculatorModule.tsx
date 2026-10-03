'use client';

import React, { useState, useRef, useEffect } from 'react';
import anime from 'animejs';
import { useGlobalStore } from '@/store/useGlobalStore';
import { Sparkles, History, Download, Trash2, RotateCcw, Copy, Check } from 'lucide-react';

export const CalculatorModule: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [history, setHistory] = useState<string[]>(['12 + 8 = 20', '150 * 0.15 = 22.5']);
  const [showHistory, setShowHistory] = useState(false);
  const [copied, setCopied] = useState(false);
  const [theme, setTheme] = useState<'toy' | 'sci-fi'>('toy');

  const { playSound, addXP } = useGlobalStore();
  const displayRef = useRef<HTMLDivElement>(null);
  const buttonsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (buttonsGridRef.current) {
      anime({
        targets: buttonsGridRef.current.children,
        scale: [0.8, 1],
        opacity: [0, 1],
        delay: anime.stagger(25),
        easing: 'easeOutElastic(1, .8)',
      });
    }
  }, []);

  const handleButtonClick = (btn: string, e: React.MouseEvent<HTMLButtonElement>) => {
    // Anime.js ripple & scale feedback
    anime({
      targets: e.currentTarget,
      scale: [0.92, 1],
      duration: 200,
      easing: 'easeOutQuad',
    });

    playSound('click');

    if (btn === 'C') {
      setDisplay('0');
      setEquation('');
    } else if (btn === 'DEL') {
      setDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'));
    } else if (btn === '=') {
      try {
        const sanitized = equation + display;
        // eslint-disable-next-line no-eval
        const result = Function(`'use strict'; return (${sanitized.replace(/×/g, '*').replace(/÷/g, '/')})`)();
        const formatted = String(Number(result.toFixed(8)));
        setHistory((prev) => [`${sanitized} = ${formatted}`, ...prev]);
        setDisplay(formatted);
        setEquation('');
        playSound('success');
        addXP(10);

        if (displayRef.current) {
          anime({
            targets: displayRef.current,
            scale: [1.05, 1],
            duration: 300,
            easing: 'easeOutElastic(1, .6)',
          });
        }
      } catch {
        setDisplay('Error');
        playSound('zap');
      }
    } else if (['+', '-', '×', '÷', '%'].includes(btn)) {
      setEquation(`${display} ${btn} `);
      setDisplay('0');
    } else if (btn === '±') {
      setDisplay((prev) => (prev.startsWith('-') ? prev.slice(1) : '-' + prev));
    } else if (btn === '.') {
      if (!display.includes('.')) {
        setDisplay((prev) => prev + '.');
      }
    } else {
      setDisplay((prev) => (prev === '0' ? btn : prev + btn));
    }
  };

  const copyResult = () => {
    navigator.clipboard.writeText(display);
    setCopied(true);
    playSound('pop');
    setTimeout(() => setCopied(false), 2000);
  };

  const exportHistory = () => {
    const blob = new Blob([history.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `robo-calc-history-${Date.now()}.txt`;
    a.click();
    playSound('pop');
  };

  const buttons = [
    { label: 'C', type: 'danger' },
    { label: 'DEL', type: 'warn' },
    { label: '%', type: 'op' },
    { label: '÷', type: 'op' },
    { label: '7', type: 'num' },
    { label: '8', type: 'num' },
    { label: '9', type: 'num' },
    { label: '×', type: 'op' },
    { label: '4', type: 'num' },
    { label: '5', type: 'num' },
    { label: '6', type: 'num' },
    { label: '-', type: 'op' },
    { label: '1', type: 'num' },
    { label: '2', type: 'num' },
    { label: '3', type: 'num' },
    { label: '+', type: 'op' },
    { label: '±', type: 'num' },
    { label: '0', type: 'num' },
    { label: '.', type: 'num' },
    { label: '=', type: 'primary' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-sunny p-6 rounded-3xl border-[4px] border-ink shadow-neo-lg">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-ink font-bold text-xs border-[2px] border-ink mb-2 shadow-neo-sm">
            <Sparkles className="w-3.5 h-3.5 text-bubblegum" />
            App 01 • Stitch UI Model
          </div>
          <h1 className="text-3xl font-heading font-black text-ink">Robo-Calc Toy Gadget</h1>
          <p className="text-sm font-semibold text-ink/80 mt-1">
            Tactile Neo-Brutalist scientific toy calculator with tape history & audio engine.
          </p>
        </div>

        {/* Theme & History Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setTheme(theme === 'toy' ? 'sci-fi' : 'toy')}
            className="px-3.5 py-2 rounded-2xl bg-white border-[3px] border-ink font-heading font-bold text-xs shadow-neo-sm hover:bg-cream active:translate-y-1 transition-all"
          >
            Skin: {theme === 'toy' ? '🎨 Toy Land' : '⚡ Neon Sci-Fi'}
          </button>
          <button
            onClick={() => {
              setShowHistory(!showHistory);
              playSound('click');
            }}
            className="p-2.5 rounded-2xl bg-sky border-[3px] border-ink text-ink shadow-neo-sm hover:bg-[#a3e5ff] active:translate-y-1 transition-all"
            title="Toggle Tape History"
          >
            <History className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Calculator Body */}
        <div className={`lg:col-span-8 p-6 sm:p-8 rounded-[32px] border-[4.5px] border-ink shadow-neo-xl transition-all ${
          theme === 'toy' ? 'bg-cream' : 'bg-darkbg text-white'
        }`}>
          {/* Top Robot Screws & Antenna */}
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-bubblegum border-[2px] border-ink" />
              <div className="w-3.5 h-3.5 rounded-full bg-sky border-[2px] border-ink" />
              <div className="w-3.5 h-3.5 rounded-full bg-mint border-[2px] border-ink" />
            </div>
            <span className="text-[11px] font-mono-code font-bold tracking-widest px-3 py-1 rounded-full bg-black/10 border-[1.5px] border-ink/30">
              ROBO-SYS 4.0
            </span>
          </div>

          {/* LCD Screen */}
          <div
            ref={displayRef}
            className="relative bg-white rounded-2xl p-5 border-[3.5px] border-ink shadow-inner mb-6 text-right select-none overflow-hidden"
          >
            <div className="text-xs font-mono font-bold text-gray-500 min-h-[1.25rem]">
              {equation || '\u00A0'}
            </div>
            <div className="text-3xl sm:text-4xl font-mono-code font-black text-ink truncate mt-1">
              {display}
            </div>

            {/* Quick Copy Button */}
            <button
              onClick={copyResult}
              className="absolute left-3 bottom-3 p-1.5 rounded-lg bg-cream border-[2px] border-ink hover:bg-sunny transition-colors"
              title="Copy to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5 text-ink" />}
            </button>
          </div>

          {/* Buttons Keypad */}
          <div ref={buttonsGridRef} className="grid grid-cols-4 gap-3">
            {buttons.map((btn, index) => {
              let bg = 'bg-white text-ink';
              if (btn.type === 'primary') bg = 'bg-sunny text-ink';
              if (btn.type === 'op') bg = 'bg-sky text-ink';
              if (btn.type === 'danger') bg = 'bg-bubblegum text-white';
              if (btn.type === 'warn') bg = 'bg-tangerine text-white';

              return (
                <button
                  key={index}
                  onClick={(e) => handleButtonClick(btn.label, e)}
                  className={`${bg} h-14 sm:h-16 rounded-2xl border-[3.5px] border-ink font-heading font-black text-lg sm:text-xl shadow-neo hover:translate-y-[-2px] active:translate-y-[3px] active:shadow-none transition-all flex items-center justify-center`}
                >
                  {btn.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* History Tape Drawer / Side Panel */}
        <div className={`lg:col-span-4 bg-white p-6 rounded-[28px] border-[4px] border-ink shadow-neo-lg transition-all ${
          showHistory ? 'block' : 'hidden lg:block'
        }`}>
          <div className="flex items-center justify-between pb-3 border-b-[3px] border-ink mb-4">
            <h2 className="font-heading font-bold text-lg text-ink flex items-center gap-2">
              <History className="w-4 h-4 text-grape" />
              Calculation Tape
            </h2>
            <div className="flex items-center gap-1.5">
              <button
                onClick={exportHistory}
                className="p-1.5 rounded-lg bg-mint border-[2px] border-ink hover:bg-[#86efac] transition-all"
                title="Download calculation tape"
              >
                <Download className="w-3.5 h-3.5 text-ink" />
              </button>
              <button
                onClick={() => setHistory([])}
                className="p-1.5 rounded-lg bg-bubblegum border-[2px] border-ink hover:bg-[#f472b6] transition-all"
                title="Clear tape history"
              >
                <Trash2 className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          </div>

          <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
            {history.length === 0 ? (
              <div className="py-12 text-center text-gray-400 font-semibold text-xs">
                No calculations on tape yet.
              </div>
            ) : (
              history.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-cream border-[2px] border-ink font-mono-code text-xs text-ink flex items-center justify-between hover:bg-sunny/30 transition-colors"
                >
                  <span className="font-semibold">{item}</span>
                  <button
                    onClick={() => {
                      const res = item.split('=')[1]?.trim();
                      if (res) setDisplay(res);
                      playSound('pop');
                    }}
                    className="text-[10px] font-bold px-2 py-0.5 rounded bg-white border border-ink hover:bg-sunny"
                    title="Load result to screen"
                  >
                    Recall
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
