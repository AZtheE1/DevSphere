'use client';

import React, { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
import { useGlobalStore } from '@/store/useGlobalStore';
import { Sparkles, KeyRound, Copy, Check, RefreshCw, ShieldCheck, Zap, Lock } from 'lucide-react';

export const PasswordModule: React.FC = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const { playSound, addXP } = useGlobalStore();
  const passDisplayRef = useRef<HTMLDivElement>(null);

  const generatePassword = () => {
    let chars = '';
    if (useUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useLower) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (useNumbers) chars += '0123456789';
    if (useSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!chars) chars = 'abcdefghijklmnopqrstuvwxyz';

    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setPassword(result);
    playSound('pop');
    addXP(5);

    // Anime.js Slot Machine Scramble Animation
    if (passDisplayRef.current) {
      anime({
        targets: passDisplayRef.current,
        scale: [0.95, 1],
        duration: 300,
        easing: 'easeOutElastic(1, .6)',
      });
    }
  };

  useEffect(() => {
    generatePassword();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, useUpper, useLower, useNumbers, useSymbols]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    playSound('win');
    addXP(10);
    setTimeout(() => setCopied(false), 2000);
  };

  // Strength score computation
  const getStrength = () => {
    let score = 0;
    if (length >= 12) score += 1;
    if (length >= 16) score += 1;
    if (useUpper && useLower) score += 1;
    if (useNumbers) score += 1;
    if (useSymbols) score += 1;

    if (score <= 2) return { label: 'Weak Potion 🧪', color: '#FF6B9D', crackTime: '3 Minutes' };
    if (score <= 4) return { label: 'Sturdy Elixir 🛡️', color: '#FFD93D', crackTime: '450 Years' };
    return { label: 'Unbreakable Spell ⚡', color: '#6BE585', crackTime: '100 Trillion Years' };
  };

  const strength = getStrength();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-[#6BE585] text-[#1E1B4B] p-6 rounded-3xl border-[4px] border-[#1E1B4B] shadow-neo-lg">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white font-bold text-xs border-[2px] border-[#1E1B4B] mb-2 shadow-neo-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6B9D]" />
            App 10 • Stitch UI Model
          </div>
          <h1 className="text-3xl font-heading font-black">Potion Lab Password Vault</h1>
          <p className="text-sm font-semibold opacity-90 mt-1">
            Alchemical password concocter with slot machine scramble & crack time computation.
          </p>
        </div>

        <div className="p-3 bg-white rounded-2xl border-[3px] border-[#1E1B4B] shadow-neo-sm flex items-center gap-2">
          <KeyRound className="w-5 h-5 text-[#9B5DE5]" />
          <span className="font-heading font-bold text-xs">High Security</span>
        </div>
      </div>

      {/* Main Password Laboratory Container */}
      <div className="bg-white p-6 sm:p-10 rounded-[36px] border-[4.5px] border-[#1E1B4B] shadow-neo-xl">
        {/* Output Flask Display */}
        <div
          ref={passDisplayRef}
          className="relative bg-[#FFF8E7] p-6 rounded-3xl border-[3.5px] border-[#1E1B4B] shadow-inner mb-8 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="font-mono-code font-black text-xl sm:text-2xl text-[#1E1B4B] tracking-wider break-all text-center sm:text-left select-all">
            {password}
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={generatePassword}
              className="p-3 rounded-2xl bg-white border-[2.5px] border-[#1E1B4B] shadow-neo-sm hover:bg-[#FFD93D] transition-all"
              title="Concoct new password"
            >
              <RefreshCw className="w-5 h-5 text-[#1E1B4B]" />
            </button>
            <button
              onClick={copyToClipboard}
              className="px-5 py-3 rounded-2xl bg-[#FFD93D] border-[2.5px] border-[#1E1B4B] font-heading font-black text-sm text-[#1E1B4B] shadow-neo-sm hover:bg-[#ffe173] active:translate-y-[2px] transition-all flex items-center gap-2"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy Vault'}</span>
            </button>
          </div>
        </div>

        {/* Strength & Crack Estimation Meters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-[#FFF8E7] border-[3px] border-[#1E1B4B] shadow-neo-sm">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
              Potion Potency:
            </span>
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full border-[2px] border-[#1E1B4B]"
                style={{ backgroundColor: strength.color }}
              />
              <span className="font-heading font-black text-base text-[#1E1B4B]">
                {strength.label}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFF8E7] border-[3px] border-[#1E1B4B] shadow-neo-sm">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
              Estimated Brute-Force Time:
            </span>
            <span className="font-heading font-black text-base text-[#1E1B4B]">
              ⏱️ {strength.crackTime}
            </span>
          </div>
        </div>

        {/* Ingredients & Length Sliders */}
        <div className="space-y-6">
          {/* Length Slider */}
          <div>
            <div className="flex justify-between items-center text-xs font-bold text-gray-600 mb-2">
              <span>Password Length:</span>
              <span className="font-mono-code text-base font-black text-[#1E1B4B]">{length} Characters</span>
            </div>
            <input
              type="range"
              min="8"
              max="48"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full h-3 bg-[#FFF8E7] rounded-lg appearance-none cursor-pointer border-[2px] border-[#1E1B4B] accent-[#9B5DE5]"
            />
          </div>

          {/* Ingredient Toggles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'A-Z Runes', state: useUpper, set: setUseUpper, icon: '🔠' },
              { label: 'a-z Glyphs', state: useLower, set: setUseLower, icon: '🔡' },
              { label: '0-9 Catalysts', state: useNumbers, set: setUseNumbers, icon: '🔢' },
              { label: '#$% Symbols', state: useSymbols, set: setUseSymbols, icon: '✨' },
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  item.set(!item.state);
                  playSound('click');
                }}
                className={`p-3.5 rounded-2xl border-[3px] border-[#1E1B4B] font-heading font-bold text-xs flex items-center justify-between transition-all ${
                  item.state ? 'bg-[#FFD93D] shadow-neo-sm scale-105' : 'bg-[#FFF8E7] opacity-60'
                }`}
              >
                <span>{item.icon} {item.label}</span>
                {item.state && <Check className="w-3.5 h-3.5 text-[#1E1B4B]" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
