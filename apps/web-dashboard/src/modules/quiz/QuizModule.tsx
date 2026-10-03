'use client';

import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import confetti from 'canvas-confetti';
import { useGlobalStore } from '@/store/useGlobalStore';
import { Sparkles, Trophy, RotateCw, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

interface Question {
  question: string;
  category: string;
  options: string[];
  correct: number;
}

const QUESTIONS: Question[] = [
  {
    category: 'Science',
    question: 'What is the closest planet to the Sun in our Solar System?',
    options: ['Venus', 'Mercury', 'Mars', 'Jupiter'],
    correct: 1,
  },
  {
    category: 'Gaming',
    question: 'In Minecraft, which tool is required to mine diamond ore without destroying it?',
    options: ['Iron Pickaxe', 'Stone Pickaxe', 'Golden Pickaxe', 'Wooden Shovel'],
    correct: 0,
  },
  {
    category: 'Tech',
    question: 'Which company originally created the JavaScript programming language?',
    options: ['Microsoft', 'Netscape', 'Google', 'Sun Microsystems'],
    correct: 1,
  },
  {
    category: 'Pop Culture',
    question: 'What color is the iconic mascot Kirby in Nintendo games?',
    options: ['Sunny Yellow', 'Bubblegum Pink', 'Sky Blue', 'Mint Green'],
    correct: 1,
  },
  {
    category: 'General',
    question: 'How many sides does a regular octagon have?',
    options: ['6', '7', '8', '10'],
    correct: 2,
  },
];

export const QuizModule: React.FC = () => {
  const [gameState, setGameState] = useState<'spin' | 'question' | 'result'>('spin');
  const [selectedCategory, setSelectedCategory] = useState('Science');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isSpinning, setIsSpinning] = useState(false);

  const { playSound, addXP } = useGlobalStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wheelMeshRef = useRef<THREE.Mesh | null>(null);

  // Initialize Three.js 3D Category Wheel
  useEffect(() => {
    if (!canvasRef.current || gameState !== 'spin') return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Wheel Geometry
    const geometry = new THREE.CylinderGeometry(2.2, 2.2, 0.4, 32);
    const materials = [
      new THREE.MeshStandardMaterial({ color: 0xffd93d, roughness: 0.3, metalness: 0.1 }), // Sides
      new THREE.MeshStandardMaterial({ color: 0x4cc9f0, roughness: 0.2 }), // Top
      new THREE.MeshStandardMaterial({ color: 0xff6b9d, roughness: 0.2 }), // Bottom
    ];
    const wheel = new THREE.Mesh(geometry, materials);
    wheel.rotation.x = Math.PI / 3;
    scene.add(wheel);
    wheelMeshRef.current = wheel;

    // Center Hub
    const hubGeo = new THREE.SphereGeometry(0.5, 32, 32);
    const hubMat = new THREE.MeshStandardMaterial({ color: 0x1e1b4b, roughness: 0.2 });
    const hub = new THREE.Mesh(hubGeo, hubMat);
    hub.position.z = 0.3;
    wheel.add(hub);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (wheelMeshRef.current && !isSpinning) {
        wheelMeshRef.current.rotation.y += 0.005;
      }
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
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [gameState, isSpinning]);

  // Countdown timer for question stage
  useEffect(() => {
    if (gameState !== 'question' || isAnswered) return;

    if (timeLeft <= 0) {
      setIsAnswered(true);
      playSound('zap');
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, gameState, isAnswered, playSound]);

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    playSound('laser');

    const categories = ['Science', 'Gaming', 'Tech', 'Pop Culture', 'General'];
    const chosen = categories[Math.floor(Math.random() * categories.length)];
    setSelectedCategory(chosen);

    let speed = 0.3;
    const interval = setInterval(() => {
      if (wheelMeshRef.current) {
        wheelMeshRef.current.rotation.y += speed;
      }
      speed *= 0.96;
      if (speed < 0.01) {
        clearInterval(interval);
        setIsSpinning(false);
        playSound('success');
        setTimeout(() => {
          setGameState('question');
          setTimeLeft(15);
          setIsAnswered(false);
          setSelectedAnswer(null);
        }, 800);
      }
    }, 30);
  };

  const handleSelectAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setIsAnswered(true);

    const isCorrect = index === QUESTIONS[currentIndex].correct;
    if (isCorrect) {
      playSound('win');
      setScore((prev) => prev + 100 + timeLeft * 10);
      addXP(50);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD93D', '#FF6B9D', '#4CC9F0', '#6BE585'],
      });
    } else {
      playSound('zap');
    }
  };

  const handleNextQuestion = () => {
    playSound('pop');
    if (currentIndex + 1 < QUESTIONS.length) {
      setCurrentIndex((prev) => prev + 1);
      setGameState('spin');
    } else {
      setGameState('result');
      playSound('win');
      addXP(100);
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
    }
  };

  const restartQuiz = () => {
    setScore(0);
    setCurrentIndex(0);
    setGameState('spin');
    playSound('pop');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-[#4CC9F0] p-6 rounded-3xl border-[4px] border-[#1E1B4B] shadow-neo-lg">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#1E1B4B] font-bold text-xs border-[2px] border-[#1E1B4B] mb-2 shadow-neo-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#FFD93D]" />
            App 02 • Stitch UI Model
          </div>
          <h1 className="text-3xl font-heading font-black text-[#1E1B4B]">Wheel of Wonder Quiz Arena</h1>
          <p className="text-sm font-semibold text-[#1E1B4B]/80 mt-1">
            3D spinning category wheel, particle celebration bursts & trivia challenge.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-white border-[3px] border-[#1E1B4B] shadow-neo-sm">
            <span className="text-xs font-bold text-gray-500 block">Current Score</span>
            <span className="text-xl font-heading font-black text-[#1E1B4B]">{score} pts</span>
          </div>
        </div>
      </div>

      {/* Stage 1: Spin The 3D Wheel */}
      {gameState === 'spin' && (
        <div className="bg-white p-8 rounded-[32px] border-[4px] border-[#1E1B4B] shadow-neo-xl text-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#FFD93D] border-[2.5px] border-[#1E1B4B] font-heading font-black text-sm text-[#1E1B4B] mb-4">
            Question {currentIndex + 1} of {QUESTIONS.length}
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-black text-[#1E1B4B] mb-2">
            Spin the 3D Wheel of Wonder!
          </h2>
          <p className="text-sm font-semibold text-gray-600 mb-6">
            Land on a lucky category to unlock your next trivia prompt.
          </p>

          <div className="relative w-full max-w-sm h-64 mx-auto mb-8 bg-[#FFF8E7] rounded-3xl border-[3.5px] border-[#1E1B4B] overflow-hidden flex items-center justify-center">
            <canvas ref={canvasRef} className="w-full h-full" />
            <div className="absolute top-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#FF6B9D] text-white text-xs font-bold border-[2px] border-[#1E1B4B]">
              Selected: {selectedCategory}
            </div>
          </div>

          <button
            onClick={spinWheel}
            disabled={isSpinning}
            className="px-8 py-4 rounded-2xl bg-[#FFD93D] border-[3.5px] border-[#1E1B4B] font-heading font-black text-xl text-[#1E1B4B] shadow-neo hover:translate-y-[-2px] active:translate-y-[3px] active:shadow-none transition-all inline-flex items-center gap-3 disabled:opacity-60"
          >
            <RotateCw className={`w-6 h-6 ${isSpinning ? 'animate-spin' : ''}`} />
            {isSpinning ? 'Spinning Wheel...' : 'Spin Category Wheel!'}
          </button>
        </div>
      )}

      {/* Stage 2: Question Stage */}
      {gameState === 'question' && (
        <div className="bg-white p-8 rounded-[32px] border-[4px] border-[#1E1B4B] shadow-neo-xl">
          <div className="flex items-center justify-between mb-6">
            <span className="px-3.5 py-1.5 rounded-full bg-[#4CC9F0] border-[2px] border-[#1E1B4B] font-heading font-bold text-xs text-[#1E1B4B]">
              Category: {QUESTIONS[currentIndex].category}
            </span>
            <div className={`px-4 py-1.5 rounded-full border-[2px] border-[#1E1B4B] font-mono-code font-black text-sm ${
              timeLeft <= 5 ? 'bg-[#FF6B9D] text-white animate-pulse' : 'bg-[#FFF8E7] text-[#1E1B4B]'
            }`}>
              ⏱️ {timeLeft}s remaining
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#1E1B4B] mb-8 leading-snug">
            {QUESTIONS[currentIndex].question}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {QUESTIONS[currentIndex].options.map((option, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrectAnswer = idx === QUESTIONS[currentIndex].correct;
              let btnClass = 'bg-[#FFF8E7] text-[#1E1B4B] hover:bg-[#FFD93D]/30';

              if (isAnswered) {
                if (isCorrectAnswer) {
                  btnClass = 'bg-[#6BE585] text-[#1E1B4B] ring-2 ring-emerald-500';
                } else if (isSelected) {
                  btnClass = 'bg-[#FF6B9D] text-white';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectAnswer(idx)}
                  disabled={isAnswered}
                  className={`p-5 rounded-2xl border-[3px] border-[#1E1B4B] font-heading font-bold text-base text-left shadow-neo-sm transition-all flex items-center justify-between ${btnClass}`}
                >
                  <span>{option}</span>
                  {isAnswered && isCorrectAnswer && <CheckCircle2 className="w-5 h-5 text-[#1E1B4B]" />}
                  {isAnswered && isSelected && !isCorrectAnswer && <XCircle className="w-5 h-5 text-white" />}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className="flex justify-end">
              <button
                onClick={handleNextQuestion}
                className="px-6 py-3 rounded-2xl bg-[#6BE585] border-[3px] border-[#1E1B4B] font-heading font-black text-sm text-[#1E1B4B] shadow-neo hover:translate-y-[-2px] active:translate-y-[2px] transition-all flex items-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Stage 3: Grand Carnival Finale */}
      {gameState === 'result' && (
        <div className="bg-[#FFF8E7] p-8 rounded-[32px] border-[4px] border-[#1E1B4B] shadow-neo-xl text-center">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-[#FFD93D] border-[3.5px] border-[#1E1B4B] shadow-neo flex items-center justify-center mb-6">
            <Trophy className="w-10 h-10 text-[#1E1B4B]" />
          </div>
          <h2 className="text-3xl font-heading font-black text-[#1E1B4B] mb-2">Grand Carnival Finale!</h2>
          <p className="text-base font-semibold text-gray-700 mb-6">
            You completed all questions in the Wonder Arena!
          </p>

          <div className="inline-block p-6 rounded-3xl bg-white border-[3.5px] border-[#1E1B4B] shadow-neo-md mb-8">
            <span className="text-xs font-bold text-gray-500 block uppercase tracking-wider">Final Score</span>
            <span className="text-5xl font-heading font-black text-[#FF6B9D]">{score}</span>
            <span className="text-sm font-bold text-gray-600 block mt-1">+150 XP Earned</span>
          </div>

          <div>
            <button
              onClick={restartQuiz}
              className="px-8 py-3.5 rounded-2xl bg-[#FFD93D] border-[3.5px] border-[#1E1B4B] font-heading font-black text-base text-[#1E1B4B] shadow-neo hover:translate-y-[-2px] active:translate-y-[2px] transition-all"
            >
              Play Again!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
