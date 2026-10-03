'use client';

import React, { useState, useRef } from 'react';
import anime from 'animejs';
import confetti from 'canvas-confetti';
import { useGlobalStore } from '@/store/useGlobalStore';
import { Sparkles, Users, User, Swords, RotateCcw } from 'lucide-react';

type Choice = 'rock' | 'paper' | 'scissors';

const CHOICES: { id: Choice; label: string; icon: string; beats: Choice; color: string }[] = [
  { id: 'rock', label: 'Paw Strike', icon: '🐾', beats: 'scissors', color: '#FFD93D' },
  { id: 'paper', label: 'Magic Scroll', icon: '📜', beats: 'rock', color: '#4CC9F0' },
  { id: 'scissors', label: 'Golden Shears', icon: '✂️', beats: 'paper', color: '#FF6B9D' },
];

export const RpsModule: React.FC = () => {
  const [mode, setMode] = useState<'1p' | '2p'>('1p');
  const [p1Score, setP1Score] = useState(0);
  const [p2Score, setP2Score] = useState(0);
  const [streak, setStreak] = useState(0);
  const [p1Choice, setP1Choice] = useState<Choice | null>(null);
  const [p2Choice, setP2Choice] = useState<Choice | null>(null);
  const [roundResult, setRoundResult] = useState<string | null>(null);
  const [isClashing, setIsClashing] = useState(false);

  const { playSound, addXP } = useGlobalStore();
  const arenaRef = useRef<HTMLDivElement>(null);

  const handle1PChoice = (choice: Choice) => {
    if (isClashing) return;
    setIsClashing(true);
    setP1Choice(choice);
    playSound('laser');

    // Anime.js clash motion
    if (arenaRef.current) {
      anime({
        targets: arenaRef.current,
        scale: [0.95, 1],
        duration: 400,
        easing: 'easeOutElastic(1, .5)',
      });
    }

    setTimeout(() => {
      const cpuChoice = CHOICES[Math.floor(Math.random() * CHOICES.length)].id;
      setP2Choice(cpuChoice);

      if (choice === cpuChoice) {
        setRoundResult('A Draw! Both paws clash equally!');
        playSound('pop');
      } else if (
        (choice === 'rock' && cpuChoice === 'scissors') ||
        (choice === 'paper' && cpuChoice === 'rock') ||
        (choice === 'scissors' && cpuChoice === 'paper')
      ) {
        setRoundResult('Player 1 Wins the Clash! 💥');
        setP1Score((prev) => prev + 1);
        setStreak((prev) => prev + 1);
        playSound('win');
        addXP(25);
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
      } else {
        setRoundResult('Robo-Boss Wins the Clash! ⚡');
        setP2Score((prev) => prev + 1);
        setStreak(0);
        playSound('zap');
      }
      setIsClashing(false);
    }, 600);
  };

  const handle2PSelect = (player: 'p1' | 'p2', choice: Choice) => {
    if (player === 'p1') {
      setP1Choice(choice);
      playSound('click');
    } else {
      setP2Choice(choice);
      playSound('click');
    }
  };

  const resolve2PBattle = () => {
    if (!p1Choice || !p2Choice) return;
    setIsClashing(true);
    playSound('laser');

    setTimeout(() => {
      if (p1Choice === p2Choice) {
        setRoundResult('Same Screen Tie! Both champions hold!');
        playSound('pop');
      } else if (
        (p1Choice === 'rock' && p2Choice === 'scissors') ||
        (p1Choice === 'paper' && p2Choice === 'rock') ||
        (p1Choice === 'scissors' && p2Choice === 'paper')
      ) {
        setRoundResult('Player 1 Triumphs! 🏆');
        setP1Score((prev) => prev + 1);
        playSound('win');
        addXP(30);
        confetti({ particleCount: 80, spread: 70 });
      } else {
        setRoundResult('Player 2 Triumphs! 🏆');
        setP2Score((prev) => prev + 1);
        playSound('win');
        addXP(30);
        confetti({ particleCount: 80, spread: 70 });
      }
      setIsClashing(false);
    }, 500);
  };

  const resetGame = () => {
    setP1Score(0);
    setP2Score(0);
    setStreak(0);
    setP1Choice(null);
    setP2Choice(null);
    setRoundResult(null);
    playSound('pop');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-bubblegum text-white p-6 rounded-3xl border-[4px] border-ink shadow-neo-lg">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-ink font-bold text-xs border-[2px] border-ink mb-2 shadow-neo-sm">
            <Sparkles className="w-3.5 h-3.5 text-sunny" />
            App 03 • Stitch UI Model
          </div>
          <h1 className="text-3xl font-heading font-black text-white">Paw Brawl - Battle Arena</h1>
          <p className="text-sm font-semibold text-white/90 mt-1">
            Tactile 1P vs CPU & Same-Screen 2-Player Paw Clash with Anime.js animations.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-2 bg-white/20 p-1.5 rounded-2xl border-[3px] border-ink">
          <button
            onClick={() => {
              setMode('1p');
              resetGame();
            }}
            className={`px-3 py-1.5 rounded-xl font-heading font-bold text-xs flex items-center gap-1.5 transition-all ${
              mode === '1p' ? 'bg-sunny text-ink border-[2px] border-ink shadow-neo-sm' : 'text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" /> 1P Solo
          </button>
          <button
            onClick={() => {
              setMode('2p');
              resetGame();
            }}
            className={`px-3 py-1.5 rounded-xl font-heading font-bold text-xs flex items-center gap-1.5 transition-all ${
              mode === '2p' ? 'bg-sunny text-ink border-[2px] border-ink shadow-neo-sm' : 'text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" /> 2P Split
          </button>
        </div>
      </div>

      {/* Main Clash Arena */}
      <div ref={arenaRef} className="bg-white p-6 sm:p-8 rounded-[32px] border-[4.5px] border-ink shadow-neo-xl mb-8">
        {/* Score Board */}
        <div className="grid grid-cols-3 items-center gap-4 pb-6 border-b-[3.5px] border-ink mb-8 text-center">
          <div className="p-4 rounded-2xl bg-cream border-[3px] border-ink shadow-neo-sm">
            <span className="text-xs font-bold text-gray-500 block">Player 1</span>
            <span className="text-3xl font-heading font-black text-ink">{p1Score}</span>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-sunny border-[3px] border-ink shadow-neo-sm flex items-center justify-center font-heading font-black text-sm">
              VS
            </div>
            {mode === '1p' && (
              <span className="text-[11px] font-bold text-tangerine mt-2">🔥 Streak: {streak}</span>
            )}
          </div>

          <div className="p-4 rounded-2xl bg-cream border-[3px] border-ink shadow-neo-sm">
            <span className="text-xs font-bold text-gray-500 block">{mode === '1p' ? 'Robo-Boss' : 'Player 2'}</span>
            <span className="text-3xl font-heading font-black text-ink">{p2Score}</span>
          </div>
        </div>

        {/* Duel Stage Display */}
        <div className="flex items-center justify-around py-8 bg-cream rounded-3xl border-[3.5px] border-ink mb-8">
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold text-gray-600 mb-2">Player 1</span>
            <div className="w-24 h-24 rounded-3xl bg-white border-[3.5px] border-ink shadow-neo flex items-center justify-center text-4xl">
              {p1Choice ? CHOICES.find((c) => c.id === p1Choice)?.icon : '❔'}
            </div>
          </div>

          <div className="text-2xl font-black text-ink">⚔️</div>

          <div className="flex flex-col items-center">
            <span className="text-xs font-bold text-gray-600 mb-2">{mode === '1p' ? 'Robo-Boss' : 'Player 2'}</span>
            <div className="w-24 h-24 rounded-3xl bg-white border-[3.5px] border-ink shadow-neo flex items-center justify-center text-4xl">
              {p2Choice ? CHOICES.find((c) => c.id === p2Choice)?.icon : '❔'}
            </div>
          </div>
        </div>

        {/* Round Result Toast */}
        {roundResult && (
          <div className="p-4 rounded-2xl bg-mint border-[3px] border-ink font-heading font-black text-center text-base text-ink shadow-neo-sm mb-8 animate-bounce">
            {roundResult}
          </div>
        )}

        {/* Controls: 1P Mode */}
        {mode === '1p' && (
          <div>
            <h3 className="text-center font-heading font-bold text-sm text-ink mb-4">Choose Your Strike:</h3>
            <div className="grid grid-cols-3 gap-4">
              {CHOICES.map((choice) => (
                <button
                  key={choice.id}
                  onClick={() => handle1PChoice(choice.id)}
                  disabled={isClashing}
                  className="p-5 rounded-2xl border-[3.5px] border-ink font-heading font-bold shadow-neo hover:translate-y-[-2px] active:translate-y-[2px] transition-all flex flex-col items-center gap-2"
                  style={{ backgroundColor: choice.color }}
                >
                  <span className="text-3xl">{choice.icon}</span>
                  <span className="text-sm font-black text-ink">{choice.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Controls: 2P Mode */}
        {mode === '2p' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* P1 Picker */}
              <div className="p-4 rounded-2xl bg-cream border-[3px] border-ink">
                <h4 className="font-heading font-bold text-xs text-ink mb-3">Player 1 Selection:</h4>
                <div className="grid grid-cols-3 gap-2">
                  {CHOICES.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => handle2PSelect('p1', c.id)}
                      className={`p-3 rounded-xl border-[2.5px] border-ink text-center transition-all ${
                        p1Choice === c.id ? 'bg-sunny shadow-neo-sm scale-105' : 'bg-white'
                      }`}
                    >
                      <span className="text-2xl block">{c.icon}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* P2 Picker */}
              <div className="p-4 rounded-2xl bg-cream border-[3px] border-ink">
                <h4 className="font-heading font-bold text-xs text-ink mb-3">Player 2 Selection:</h4>
                <div className="grid grid-cols-3 gap-2">
                  {CHOICES.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => handle2PSelect('p2', c.id)}
                      className={`p-3 rounded-xl border-[2.5px] border-ink text-center transition-all ${
                        p2Choice === c.id ? 'bg-sky shadow-neo-sm scale-105' : 'bg-white'
                      }`}
                    >
                      <span className="text-2xl block">{c.icon}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={resolve2PBattle}
                disabled={!p1Choice || !p2Choice || isClashing}
                className="px-8 py-3.5 rounded-2xl bg-bubblegum text-white border-[3.5px] border-ink font-heading font-black text-base shadow-neo hover:translate-y-[-2px] active:translate-y-[2px] transition-all disabled:opacity-50"
              >
                Clash Paws Now! ⚔️
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Reset Bar */}
      <div className="flex justify-end">
        <button
          onClick={resetGame}
          className="px-4 py-2 rounded-xl bg-white border-[2.5px] border-ink font-heading font-bold text-xs text-ink shadow-neo-sm flex items-center gap-1.5 hover:bg-cream"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset Scores
        </button>
      </div>
    </div>
  );
};
