'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useGlobalStore } from '@/store/useGlobalStore';
import { auth } from '@/lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider 
} from 'firebase/auth';

export const LoginHero: React.FC = () => {
  const { setIsAuthenticated } = useGlobalStore();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return setError('Email and password required!');
    
    setLoading(true);
    setError('');
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      // AuthGuard handles redirect via global state
    } catch (err: any) {
      setError(err.message || 'Failed to authenticate');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      setError(err.message || 'Failed to authenticate with Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* SVG Icons and Logo from Stitch UI */}
      {/* You can extract and refine these if you wish */}
      <header className="w-full bg-cream/90 backdrop-blur-md border-b-4 border-ink sticky top-0 z-50 px-4 md:px-8 py-3 transition-colors duration-500">
    <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
      
      
      <div className="flex items-center gap-3 cursor-pointer group">
        <div className="w-12 h-12 rounded-full border-cartoon shadow-sticker-sm flex items-center justify-center relative overflow-hidden group-hover:rotate-6 transition-transform bg-white">
          <Image src="/logo.svg" alt="DevSphere Mascot" width={48} height={48} />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1 font-fredoka font-black text-2xl tracking-wide">
            <span className="text-sky drop-shadow-sm">Dev</span>
            <span className="text-bubblegum">S</span>
            <span className="text-sunny">p</span>
            <span className="text-mint">h</span>
            <span className="text-grape">e</span>
            <span className="text-bubblegum">r</span>
            <span className="text-mint">e</span>
          </div>
          <span className="text-[11px] font-bold tracking-wider text-ink/70 -mt-1 uppercase">10 Tiny Apps • One Happy Universe</span>
        </div>
      </div>

      
      <div className="flex flex-wrap items-center gap-1.5 bg-white p-1.5 rounded-full border-cartoon shadow-sticker-sm overflow-x-auto max-w-full">
        <span className="text-xs font-black font-fredoka px-2.5 py-1 text-grape flex items-center gap-1">
          <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="9" strokeDasharray="16" strokeDashoffset="4"/></svg>
          STATES:
        </span>
        <button  id="btn-state-idle" className="state-btn text-xs font-fredoka font-bold px-3 py-1 rounded-full bg-sunny border-2 border-ink text-ink shadow-sticker-pressed">1. Idle</button>
        <button  id="btn-state-email-focused" className="state-btn text-xs font-fredoka font-bold px-3 py-1 rounded-full hover:bg-cream border-2 border-transparent text-ink">2. Email Focus</button>
        <button  id="btn-state-password-focused" className="state-btn text-xs font-fredoka font-bold px-3 py-1 rounded-full hover:bg-cream border-2 border-transparent text-ink">3. Password Peek</button>
        <button  id="btn-state-error" className="state-btn text-xs font-fredoka font-bold px-3 py-1 rounded-full hover:bg-red-100 border-2 border-transparent text-red-600">4. Error Typo</button>
        <button  id="btn-state-loading" className="state-btn text-xs font-fredoka font-bold px-3 py-1 rounded-full hover:bg-cream border-2 border-transparent text-ink">5. Loading</button>
        <button  id="btn-state-success" className="state-btn text-xs font-fredoka font-bold px-3 py-1 rounded-full hover:bg-cream border-2 border-transparent text-ink">6. Success</button>
        <button  id="btn-state-signup" className="state-btn text-xs font-fredoka font-bold px-3 py-1 rounded-full hover:bg-cream border-2 border-transparent text-ink">7. Sign Up</button>
        <button  id="btn-state-forgot" className="state-btn text-xs font-fredoka font-bold px-3 py-1 rounded-full hover:bg-cream border-2 border-transparent text-ink">8. Flip Forgot</button>
        <button  id="btn-state-night" className="text-xs font-fredoka font-bold px-3 py-1 rounded-full bg-dev-night border-2 border-ink text-sunny flex items-center gap-1 shadow-sticker-sm hover:scale-105 transition-transform">
          <span id="night-icon">🌙</span> Night Mode
        </button>
      </div>

    </div>
  </header>

  
  <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-6 lg:py-12 relative min-h-[calc(100vh-76px)] flex flex-col justify-center">

    
    <div id="decorations" className="pointer-events-none absolute inset-0 overflow-hidden z-0">
      
      <div className="absolute top-12 left-10 anim-float hidden md:block">
        <div className="relative bg-cream border-cartoon rounded-full px-7 py-4 shadow-sticker-sm flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-bubblegum opacity-60"></span>
          <span className="text-xs font-mono font-bold text-ink">&lt;code&gt;</span>
          <span className="w-3 h-3 rounded-full bg-bubblegum opacity-60"></span>
        </div>
      </div>
      
      <div className="absolute top-28 left-[45%] text-grape text-5xl font-mono font-black anim-gentle opacity-40 select-none">{"{"}</div>
      <div className="absolute bottom-20 left-[38%] text-mint text-6xl font-mono font-black anim-float opacity-50 select-none">{"}"}</div>
      <div className="absolute top-16 right-[38%] text-sunny text-4xl font-mono font-black anim-gentle opacity-70 select-none">;</div>
      <div className="absolute bottom-32 right-12 text-bubblegum text-4xl font-mono font-black anim-float opacity-60 select-none">&lt;/&gt;</div>
      
      <div className="absolute top-1/4 left-6 text-sunny text-3xl anim-orbit-1">⭐</div>
      <div className="absolute top-1/3 left-1/3 text-sky text-2xl anim-orbit-2">✨</div>
      <div className="absolute bottom-16 left-16 text-mint text-3xl anim-orbit-3">🌟</div>
      <div className="absolute top-20 right-16 text-bubblegum text-2xl anim-orbit-2">✨</div>
    </div>

    
    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

      
      <section className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
        
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cream border-cartoon rounded-full shadow-sticker-sm mb-4 hover:rotate-1 transition-transform cursor-pointer">
          <span className="px-2 py-0.5 rounded-full bg-mint text-[11px] font-mono font-black text-ink border border-ink">v2.4 Live</span>
          <span className="text-xs md:text-sm font-fredoka font-bold text-ink">🚀 Welcome to the happiest dev sandbox on Earth!</span>
        </div>

        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-fredoka font-black tracking-tight leading-[1.15] text-ink mb-4">
          Welcome to <br className="hidden sm:inline" />
          <span className="relative inline-block">
            <span className="text-sky drop-shadow-sm">Dev</span><span className="text-bubblegum">Sphere</span><span className="text-sunny">!</span>
            
            <svg className="absolute -bottom-3 left-0 w-full h-4 text-sunny" viewBox="0 0 340 18" fill="none">
              <path d="M 5 12 Q 40 4 75 12 T 145 12 T 215 12 T 285 12 T 335 12" stroke="#1B1B3A" strokeWidth="7" strokeLinecap="round"/>
              <path d="M 5 10 Q 40 2 75 10 T 145 10 T 215 10 T 285 10 T 335 10" stroke="#FFD93D" strokeWidth="4.5" strokeLinecap="round"/>
            </svg>
          </span>
        </h1>

        
        <p className="text-lg md:text-xl font-nunito font-extrabold text-ink/80 max-w-xl mt-3 mb-8">
          10 tiny apps. One happy universe. Build, calculate, battle, quiz, and doodle together with fellow developers!
        </p>

        
        <div className="relative w-full max-w-[500px] h-[360px] sm:h-[400px] flex items-center justify-center mx-auto lg:mx-0 my-2 select-none">
          
          
          <div id="mascot-speech-bubble" className="absolute -top-4 right-8 md:right-16 z-30 bg-white border-cartoon px-4 py-2 rounded-2xl shadow-sticker-sm text-sm font-fredoka font-bold flex items-center gap-2 transform -rotate-3 transition-all duration-300">
            <span id="bubble-emoji">👋</span>
            <span id="bubble-text">"Hi! I'm Sphe. Ready to code & play?"</span>
            
            <div className="absolute -bottom-2.5 left-6 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-ink"></div>
            <div className="absolute -bottom-1.5 left-[26px] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white"></div>
          </div>

          
          <div id="central-planet" className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-gradient-to-br from-[#68d8d6] to-[#07b1ca] border-cartoon-thick shadow-sticker-lg flex items-center justify-center transition-all duration-500">
            
            
            <div className="absolute top-8 left-6 w-16 h-12 bg-mint rounded-full border-2 border-ink opacity-90 transform -rotate-12"></div>
            <div className="absolute bottom-10 right-8 w-24 h-16 bg-mint rounded-full border-2 border-ink opacity-90 transform rotate-6"></div>
            <div className="absolute top-1/2 left-2 w-10 h-8 bg-sunny rounded-full border border-ink opacity-80"></div>
            
            <div className="absolute top-4 left-10 w-20 h-10 bg-white/40 rounded-full transform -rotate-35"></div>

            
            <div className="absolute inset-0 -m-8 pointer-events-none flex items-center justify-center">
              
              <svg className="w-[360px] sm:w-[420px] h-[180px] sm:h-[200px] anim-gentle" viewBox="0 0 420 200" fill="none">
                
                <ellipse cx="213" cy="103" rx="195" ry="58" stroke="#1B1B3A" strokeWidth="14" transform="rotate(-15, 210, 100)"/>
                
                <ellipse cx="210" cy="100" rx="195" ry="58" stroke="#FFF8E7" strokeWidth="10" transform="rotate(-15, 210, 100)"/>
                <ellipse cx="210" cy="100" rx="195" ry="58" stroke="#FFD93D" strokeWidth="4.5" transform="rotate(-15, 210, 100)"/>
              </svg>
            </div>

            
            <div id="mascot-sphe" className="relative -top-20 z-20 flex flex-col items-center cursor-pointer transition-transform duration-300 hover:scale-105">
              
              
              <div id="sphe-antenna" className="flex flex-col items-center -mb-1">
                <span className="text-2xl filter drop-shadow-[2px_3px_0px_#1B1B3A] anim-orbit-1">⭐</span>
                <div className="w-1.5 h-4 bg-sunny border border-ink -mt-1"></div>
              </div>

              
              <div id="sphe-body" className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-sky border-cartoon-thick shadow-sticker flex flex-col items-center justify-center transition-all duration-300">
                
                
                <div id="sphe-nightcap" className="hidden absolute -top-8 -right-2 text-4xl filter drop-shadow-[2px_3px_0px_#1B1B3A] transform rotate-12">
                  🌙
                </div>

                
                <div className="absolute top-2.5 left-5 w-8 h-4 bg-white/60 rounded-full transform -rotate-45"></div>
                <div className="absolute top-6 left-3 w-3 h-2 bg-white/80 rounded-full"></div>

                
                <div id="sphe-badge" className="absolute top-2 bg-cream border-2 border-ink px-2 py-0.5 rounded-full shadow-[1px_2px_0px_#1B1B3A]">
                  <span className="text-[10px] font-mono font-black text-grape">&lt;/&gt;</span>
                </div>

                
                
                <div className="absolute -top-1 w-28 sm:w-32 h-10 border-t-8 border-bubblegum rounded-t-full pointer-events-none"></div>
                
                <div className="absolute -left-3 top-9 w-5 h-12 bg-grape border-2 border-ink rounded-xl shadow-[2px_2px_0px_#1B1B3A] flex items-center justify-center">
                  <div className="w-2.5 h-8 bg-bubblegum rounded-md"></div>
                </div>
                
                <div className="absolute -right-3 top-9 w-5 h-12 bg-grape border-2 border-ink rounded-xl shadow-[2px_2px_0px_#1B1B3A] flex items-center justify-center">
                  <div className="w-2.5 h-8 bg-bubblegum rounded-md"></div>
                </div>

                
                <div className="mt-4 flex flex-col items-center">
                  
                  
                  <div id="sphe-eyes-container" className="flex items-center gap-5 sm:gap-6 relative">
                    
                    
                    <div id="sphe-eye-left" className="w-5 h-6 bg-ink rounded-full relative overflow-hidden anim-blink">
                      
                      <div className="pupil-dot absolute top-1 left-1 w-2 h-2 bg-white rounded-full transition-transform duration-100"></div>
                      <div className="absolute bottom-1 right-1 w-1 h-1 bg-white rounded-full"></div>
                    </div>

                    
                    <div id="sphe-eye-right" className="w-5 h-6 bg-ink rounded-full relative overflow-hidden anim-blink">
                      
                      <div className="pupil-dot absolute top-1 left-1 w-2 h-2 bg-white rounded-full transition-transform duration-100"></div>
                      <div className="absolute bottom-1 right-1 w-1 h-1 bg-white rounded-full"></div>
                    </div>

                    
                    <div id="sphe-hands-cover" className="hidden absolute -inset-2 flex items-center justify-between z-30 pointer-events-none">
                      
                      <div className="w-8 h-8 bg-sky border-2 border-ink rounded-full shadow-[2px_2px_0px_#1B1B3A] flex items-center justify-center">
                        <span className="text-xs font-mono font-black text-ink">🙈</span>
                      </div>
                      
                      <div className="w-8 h-8 bg-sky border-2 border-ink rounded-full shadow-[2px_2px_0px_#1B1B3A] flex items-center justify-center">
                        <span className="text-xs font-mono font-black text-ink">🙈</span>
                      </div>
                    </div>

                    
                    <div id="sphe-eyes-dizzy" className="hidden absolute inset-0 flex items-center justify-between text-xl font-black text-ink">
                      <span>💫</span>
                      <span>💫</span>
                    </div>

                  </div>

                  
                  <div className="flex items-center justify-between w-20 -mt-2">
                    <span className="text-xs font-mono font-black text-bubblegum bg-pink-100 px-1 rounded-full border border-ink">&lt;</span>
                    <span className="text-xs font-mono font-black text-bubblegum bg-pink-100 px-1 rounded-full border border-ink">&gt;</span>
                  </div>

                  
                  <div id="sphe-mouth" className="w-7 h-3.5 bg-ink rounded-b-full border-t border-ink flex items-end justify-center overflow-hidden -mt-1">
                    <div className="w-4 h-2 bg-bubblegum rounded-t-full"></div>
                  </div>

                </div>

                
                <div id="sphe-arm-left" className="absolute -left-5 top-14 w-6 h-4 bg-sky border-2 border-ink rounded-full shadow-[2px_2px_0px_#1B1B3A] anim-wave"></div>
                
                <div id="sphe-arm-right" className="absolute -right-4 top-16 w-5 h-4 bg-sky border-2 border-ink rounded-full shadow-[2px_2px_0px_#1B1B3A]"></div>

              </div>

              
              <div className="flex items-center gap-4 -mt-2">
                <div className="w-7 h-4 bg-sky border-2 border-ink rounded-full shadow-[1px_2px_0px_#1B1B3A]"></div>
                <div className="w-7 h-4 bg-sky border-2 border-ink rounded-full shadow-[1px_2px_0px_#1B1B3A]"></div>
              </div>

            </div>

            
            
            <div className="absolute -top-6 -left-6 z-20 group anim-orbit-1" title="Robo-Calc House">
              <div className="w-12 h-12 rounded-2xl bg-sunny border-cartoon shadow-sticker-sm flex items-center justify-center text-xl cursor-pointer group-hover:scale-125 transition-transform">
                🤖
              </div>
              <span className="opacity-0 group-hover:opacity-100 absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-fredoka font-bold bg-ink text-white px-2 py-0.5 rounded-full whitespace-nowrap transition-opacity pointer-events-none">Robo-Calc</span>
            </div>

            
            <div className="absolute -top-10 right-10 z-20 group anim-orbit-2" title="Brain Carnival">
              <div className="w-12 h-12 rounded-2xl bg-grape border-cartoon shadow-sticker-sm flex items-center justify-center text-xl cursor-pointer group-hover:scale-125 transition-transform text-white">
                🎪
              </div>
              <span className="opacity-0 group-hover:opacity-100 absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-fredoka font-bold bg-ink text-white px-2 py-0.5 rounded-full whitespace-nowrap transition-opacity pointer-events-none">Quiz Arena</span>
            </div>

            
            <div className="absolute top-12 -right-12 z-20 group anim-orbit-3" title="Paw Brawl">
              <div className="w-12 h-12 rounded-2xl bg-bubblegum border-cartoon shadow-sticker-sm flex items-center justify-center text-xl cursor-pointer group-hover:scale-125 transition-transform text-white">
                🥊
              </div>
              <span className="opacity-0 group-hover:opacity-100 absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-fredoka font-bold bg-ink text-white px-2 py-0.5 rounded-full whitespace-nowrap transition-opacity pointer-events-none">Paw Brawl</span>
            </div>

            
            <div className="absolute bottom-16 -right-10 z-20 group anim-orbit-1" title="Doodle Notes">
              <div className="w-12 h-12 rounded-2xl bg-cream border-cartoon shadow-sticker-sm flex items-center justify-center text-xl cursor-pointer group-hover:scale-125 transition-transform">
                📌
              </div>
              <span className="opacity-0 group-hover:opacity-100 absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-fredoka font-bold bg-ink text-white px-2 py-0.5 rounded-full whitespace-nowrap transition-opacity pointer-events-none">Notes Corkboard</span>
            </div>

            
            <div className="absolute -bottom-8 right-16 z-20 group anim-orbit-2" title="Turbo Lap">
              <div className="w-12 h-12 rounded-2xl bg-orange-400 border-cartoon shadow-sticker-sm flex items-center justify-center text-xl cursor-pointer group-hover:scale-125 transition-transform text-white">
                🏎️
              </div>
              <span className="opacity-0 group-hover:opacity-100 absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-fredoka font-bold bg-ink text-white px-2 py-0.5 rounded-full whitespace-nowrap transition-opacity pointer-events-none">Turbo Lap</span>
            </div>

            
            <div className="absolute -bottom-8 left-12 z-20 group anim-orbit-3" title="Detective QR">
              <div className="w-12 h-12 rounded-2xl bg-mint border-cartoon shadow-sticker-sm flex items-center justify-center text-xl cursor-pointer group-hover:scale-125 transition-transform">
                🔍
              </div>
              <span className="opacity-0 group-hover:opacity-100 absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-fredoka font-bold bg-ink text-white px-2 py-0.5 rounded-full whitespace-nowrap transition-opacity pointer-events-none">Detective QR</span>
            </div>

            
            <div className="absolute bottom-12 -left-12 z-20 group anim-orbit-1" title="Sky Weather">
              <div className="w-12 h-12 rounded-2xl bg-sky-200 border-cartoon shadow-sticker-sm flex items-center justify-center text-xl cursor-pointer group-hover:scale-125 transition-transform">
                ☀️
              </div>
              <span className="opacity-0 group-hover:opacity-100 absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-fredoka font-bold bg-ink text-white px-2 py-0.5 rounded-full whitespace-nowrap transition-opacity pointer-events-none">Sky Weather</span>
            </div>

            
            <div className="absolute top-16 -left-10 z-20 group anim-orbit-2" title="Toy Shop">
              <div className="w-12 h-12 rounded-2xl bg-pink-300 border-cartoon shadow-sticker-sm flex items-center justify-center text-xl cursor-pointer group-hover:scale-125 transition-transform">
                🧸
              </div>
              <span className="opacity-0 group-hover:opacity-100 absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-fredoka font-bold bg-ink text-white px-2 py-0.5 rounded-full whitespace-nowrap transition-opacity pointer-events-none">Toy Store</span>
            </div>

            
            <div className="absolute -top-12 left-16 z-20 group anim-orbit-3" title="Boopl Platform">
              <div className="w-12 h-12 rounded-2xl bg-red-400 border-cartoon shadow-sticker-sm flex items-center justify-center text-xl cursor-pointer group-hover:scale-125 transition-transform text-white">
                🚀
              </div>
              <span className="opacity-0 group-hover:opacity-100 absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-fredoka font-bold bg-ink text-white px-2 py-0.5 rounded-full whitespace-nowrap transition-opacity pointer-events-none">Boopl Rocket</span>
            </div>

            
            <div className="absolute -bottom-4 right-1/2 translate-x-1/2 z-20 group anim-orbit-1" title="Potion Vault">
              <div className="w-12 h-12 rounded-2xl bg-purple-300 border-cartoon shadow-sticker-sm flex items-center justify-center text-xl cursor-pointer group-hover:scale-125 transition-transform">
                🧪
              </div>
              <span className="opacity-0 group-hover:opacity-100 absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-fredoka font-bold bg-ink text-white px-2 py-0.5 rounded-full whitespace-nowrap transition-opacity pointer-events-none">Potion Vault</span>
            </div>

          </div>
        </div>

        
        <div className="w-full mt-4 flex flex-col items-center lg:items-start">
          <span className="text-xs font-mono font-bold tracking-wider text-ink/70 uppercase mb-2">⚡ Hop into 10 instant playgrounds:</span>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
            <button  className="w-10 h-10 rounded-xl bg-sunny border-2 border-ink shadow-sticker-sm flex items-center justify-center text-lg hover:-translate-y-1 hover:rotate-6 transition-transform">🤖</button>
            <button  className="w-10 h-10 rounded-xl bg-grape border-2 border-ink shadow-sticker-sm flex items-center justify-center text-lg text-white hover:-translate-y-1 hover:-rotate-6 transition-transform">🎪</button>
            <button  className="w-10 h-10 rounded-xl bg-bubblegum border-2 border-ink shadow-sticker-sm flex items-center justify-center text-lg text-white hover:-translate-y-1 hover:rotate-6 transition-transform">🥊</button>
            <button  className="w-10 h-10 rounded-xl bg-cream border-2 border-ink shadow-sticker-sm flex items-center justify-center text-lg hover:-translate-y-1 hover:-rotate-6 transition-transform">📌</button>
            <button  className="w-10 h-10 rounded-xl bg-orange-400 border-2 border-ink shadow-sticker-sm flex items-center justify-center text-lg text-white hover:-translate-y-1 hover:rotate-6 transition-transform">🏎️</button>
            <button  className="w-10 h-10 rounded-xl bg-mint border-2 border-ink shadow-sticker-sm flex items-center justify-center text-lg hover:-translate-y-1 hover:-rotate-6 transition-transform">🔍</button>
            <button  className="w-10 h-10 rounded-xl bg-sky-300 border-2 border-ink shadow-sticker-sm flex items-center justify-center text-lg hover:-translate-y-1 hover:-rotate-6 transition-transform">☀️</button>
            <button  className="w-10 h-10 rounded-xl bg-pink-300 border-2 border-ink shadow-sticker-sm flex items-center justify-center text-lg hover:-translate-y-1 hover:rotate-6 transition-transform">🧸</button>
            <button  className="w-10 h-10 rounded-xl bg-red-400 border-2 border-ink shadow-sticker-sm flex items-center justify-center text-lg text-white hover:-translate-y-1 hover:-rotate-6 transition-transform">🚀</button>
            <button  className="w-10 h-10 rounded-xl bg-purple-400 border-2 border-ink shadow-sticker-sm flex items-center justify-center text-lg text-white hover:-translate-y-1 hover:rotate-6 transition-transform">🧪</button>
          </div>
        </div>

      </section>


      
      <section className="lg:col-span-5 flex justify-center w-full">
        
        
        <div className="card-perspective w-full max-w-md">
          <div id="card-flipper" className="card-flipper relative w-full">
            
            
            <div id="auth-main-card" className="card-face-front w-full bg-white border-cartoon-thick rounded-[32px] p-6 sm:p-8 shadow-sticker-lg transform -rotate-1 hover:rotate-0 transition-all duration-300">
              
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 bg-sunny rounded-2xl border-cartoon shadow-sticker-sm flex items-center justify-center text-xl">
                    🪐
                  </div>
                  <div>
                    <h2 id="card-heading" className="text-2xl font-fredoka font-black text-ink">Hey, dev friend!</h2>
                    <p id="card-subheading" className="text-xs font-nunito font-extrabold text-ink/70">Pick a tab to orbit right into your workspace</p>
                  </div>
                </div>
                
                <span className="text-xs font-mono font-bold bg-mint/30 text-ink px-2.5 py-1 rounded-full border border-ink">
                  SSL 256
                </span>
              </div>

              
              <div className="relative bg-cream p-1.5 rounded-full border-cartoon shadow-sticker-sm mb-6 flex">
                <div id="tab-pill" className={`absolute top-1.5 left-1.5 w-[calc(50%-6px)] h-[calc(100%-12px)] bg-sunny border-2 border-ink rounded-full transition-all duration-300 shadow-sticker-sm ${isSignUp ? 'translate-x-full' : ''}`}></div>
                <button type="button" onClick={() => setIsSignUp(false)} className={`relative z-10 w-1/2 py-2 min-h-[48px] text-sm font-fredoka font-black text-center transition-colors ${!isSignUp ? 'text-ink' : 'text-ink/60'}`}>
                  Log In
                </button>
                <button type="button" onClick={() => setIsSignUp(true)} className={`relative z-10 w-1/2 py-2 min-h-[48px] text-sm font-fredoka font-black text-center transition-colors ${isSignUp ? 'text-ink' : 'text-ink/60'}`}>
                  Sign Up ✨
                </button>
              </div>

              <form id="auth-form" onSubmit={handleAuth} className="space-y-4">
                
                <div id="field-name-group" className={`${isSignUp ? 'block' : 'hidden'} transition-all duration-300`}>
                  <label className="block text-xs font-fredoka font-black uppercase tracking-wider text-ink mb-1.5">
                    Your Hacker Alias
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">👾</span>
                    <input 
                      type="text" 
                      placeholder="e.g. Ada Lovelace" 
                      className="w-full pl-12 pr-4 py-3 bg-[#FBF9FF] border-cartoon rounded-2xl font-nunito font-bold text-ink placeholder:text-ink/40 focus:outline-none focus:bg-white focus:shadow-sticker-sm transition-all"
                     />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-fredoka font-black uppercase tracking-wider text-ink">
                      Developer Email
                    </label>
                  </div>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">📧</span>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@domain.com" 
                      className="w-full pl-12 pr-4 py-3 bg-[#FBF9FF] border-cartoon rounded-2xl font-nunito font-bold text-ink placeholder:text-ink/40 focus:outline-none focus:bg-white focus:shadow-sticker-sm transition-all"
                      required
                     />
                  </div>

                </div>

                
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-fredoka font-black uppercase tracking-wider text-ink">
                      Password Runic Key
                    </label>
                    <button type="button"  className="text-xs min-h-[48px] flex items-center px-2 font-fredoka font-bold text-grape hover:underline hover:rotate-2 transition-transform">
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">🔑</span>
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••" 
                      className="w-full pl-12 pr-12 py-3 bg-[#FBF9FF] border-cartoon rounded-2xl font-nunito font-bold text-ink placeholder:text-ink/40 focus:outline-none focus:bg-white focus:shadow-sticker-sm transition-all"
                      required
                     />
                    
                    <button 
                      type="button" 
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-cream border-2 border-ink flex items-center justify-center text-sm hover:scale-105 active:scale-95 transition-transform"
                      title="Peek Password"
                    >
                      👁️
                    </button>
                  </div>
                </div>

                
                <div id="password-strength-group" className="hidden bg-cream p-3 rounded-2xl border-cartoon transition-all">
                  <div className="flex items-center justify-between text-xs font-fredoka font-bold mb-1.5">
                    <span>Key Strength: <span id="strength-label" className="text-bubblegum">Playful</span></span>
                    <span id="strength-crack" className="font-mono text-[10px] text-ink/70">~200 years</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span id="star-1" className="text-lg opacity-30 transition-opacity">⭐</span>
                    <span id="star-2" className="text-lg opacity-30 transition-opacity">⭐</span>
                    <span id="star-3" className="text-lg opacity-30 transition-opacity">⭐</span>
                    <span id="star-4" className="text-lg opacity-30 transition-opacity">⭐</span>
                    <span className="text-[11px] font-nunito font-extrabold text-ink/70 ml-auto">Rune ward active</span>
                  </div>
                </div>

                
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <div className="relative">
                      <input type="checkbox" id="check-remember" defaultChecked className="sr-only peer" />
                      <div className="w-10 h-6 bg-gray-200 border-2 border-ink rounded-full peer peer-checked:bg-mint transition-colors"></div>
                      <div className="dot absolute left-1 top-1 w-4 h-4 bg-white border border-ink rounded-full transition-transform peer-checked:translate-x-4 shadow-[1px_1px_0px_#1B1B3A]"></div>
                    </div>
                    <span className="text-xs font-fredoka font-bold text-ink">Keep me logged in</span>
                  </label>
                  <span className="text-xs font-mono font-bold text-ink/60">Ctrl+Enter ↵</span>
                </div>

                
                <div id="error-banner" className={`${error ? 'flex' : 'hidden'} bg-red-100 border-2 border-red-500 rounded-2xl p-3 items-center gap-3 anim-shake`}>
                  <span className="text-2xl">🚨</span>
                  <div className="text-xs font-fredoka font-bold text-red-700">
                    <div>Oops, Houston, we have a typo!</div>
                    <span className="font-nunito font-semibold text-red-600">{error}</span>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn-tactile w-full py-4 min-h-[56px] px-6 rounded-full bg-gradient-to-r from-bubblegum via-sunny to-mint border-cartoon-thick shadow-sticker font-fredoka font-black text-lg text-ink flex items-center justify-center gap-3 transition-transform hover:-translate-y-1 active:translate-y-1 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-4 border-ink border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span className="text-2xl">🚀</span>
                      <span>{isSignUp ? 'Create Developer Profile' : 'Launch Me In!'}</span>
                    </>
                  )}
                </button>

              </form>

              
              <div className="relative my-6 text-center">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t-2 border-dashed border-ink/30"></div></div>
                <span className="relative bg-white px-3 text-xs font-fredoka font-bold text-ink/60 uppercase tracking-wider">
                  or orbit in with
                </span>
              </div>

              
              <div className="grid grid-cols-3 gap-3">
                <button type="button" onClick={handleGoogleAuth} disabled={loading} className="btn-tactile py-2.5 px-3 min-h-[48px] bg-cream border-cartoon rounded-2xl shadow-sticker-sm flex items-center justify-center gap-2 hover:bg-white transition-all text-xs font-fredoka font-bold text-ink disabled:opacity-70">
                  <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.3 8.8 5 12 5z"/><path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"/><path fill="#FBBC05" d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.7s.1-2 .4-2.7L1.6 6.4C.6 8.4 0 10.6 0 13s.6 4.6 1.6 6.6l3.7-4.9z"/><path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.2 0-5.8-2.3-6.7-5.3L1.6 15.9C3.5 19.8 7.4 23 12 23z"/></svg>
                  <span>Google</span>
                </button>
                <button type="button" className="btn-tactile py-2.5 px-3 min-h-[48px] bg-cream border-cartoon rounded-2xl shadow-sticker-sm flex items-center justify-center gap-2 hover:bg-white transition-all text-xs font-fredoka font-bold text-ink">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                  <span>GitHub</span>
                </button>
                <button type="button" className="btn-tactile py-2.5 px-3 min-h-[48px] bg-cream border-cartoon rounded-2xl shadow-sticker-sm flex items-center justify-center gap-2 hover:bg-white transition-all text-xs font-fredoka font-bold text-ink">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.85-.92.04-2.02.62-2.67 1.37-.58.66-1.08 1.74-.95 2.76 1.02.08 2.08-.53 2.7-1.28"/></svg>
                  <span>Apple</span>
                </button>
              </div>

              
              <button type="button" onClick={() => setIsAuthenticated(true)} className="btn-tactile w-full mt-3 py-2.5 min-h-[48px] rounded-2xl border-2 border-dashed border-ink/40 hover:border-ink bg-cream/50 hover:bg-cream font-fredoka font-bold text-xs text-ink/80 flex items-center justify-center gap-2 transition-all">
                <span>🎒 Continue as Sandbox Guest (No Save)</span>
              </button>
              
              <div className="mt-6 pt-4 border-t-2 border-ink/10 flex flex-wrap items-center justify-between text-[11px] font-nunito font-extrabold text-ink/60">
                <div className="flex items-center gap-3">
                  <a href="#" className="hover:underline">Terms of Fun</a>
                  <span>•</span>
                  <a href="#" className="hover:underline">Privacy Shield</a>
                </div>
                <button type="button"  className="flex items-center gap-1.5 min-h-[48px] bg-cream px-4 py-2 rounded-full border border-ink text-ink hover:scale-105 transition-transform">
                  <span id="card-night-icon">🌙</span> Night Mode
                </button>
              </div>

            </div>


            
            <div id="auth-back-card" className="card-face-back absolute inset-0 w-full bg-cream border-cartoon-thick rounded-[32px] p-6 sm:p-8 shadow-sticker-lg flex flex-col justify-between">
              
              <div>
                
                <div className="flex items-center justify-between mb-4">
                  <button  className="w-12 h-12 rounded-xl bg-white border-2 border-ink shadow-sticker-sm flex items-center justify-center text-sm font-bold text-ink hover:scale-105 active:scale-95 transition-transform">
                    ←
                  </button>
                  <span className="text-xs font-mono font-bold bg-grape/20 text-grape px-2 py-0.5 rounded-full border border-ink">
                    Potion Owl Ward
                  </span>
                </div>

                <div className="text-center my-4">
                  <div className="w-16 h-16 bg-sunny rounded-full border-cartoon shadow-sticker-sm mx-auto flex items-center justify-center text-3xl mb-3 anim-gentle">
                    💌
                  </div>
                  <h3 className="text-2xl font-fredoka font-black text-ink">Lost your Runic Key?</h3>
                  <p className="text-xs font-nunito font-extrabold text-ink/70 mt-1 max-w-xs mx-auto">
                    Don't panic! Sphe will fly an encrypted magic envelope right to your developer inbox.
                  </p>
                </div>

                
                <div className="space-y-4 my-6">
                  <div>
                    <label className="block text-xs font-fredoka font-black uppercase tracking-wider text-ink mb-1.5">
                      Your Registered Email
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">📮</span>
                      <input 
                        type="email" 
                        value="alex.coder@devsphere.io"
                        className="w-full pl-12 pr-4 py-3 bg-white border-cartoon rounded-2xl font-nunito font-bold text-ink focus:outline-none focus:shadow-sticker-sm"
                       />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <button 
                   
                  className="btn-tactile w-full py-3.5 px-6 rounded-full bg-mint border-cartoon-thick shadow-sticker font-fredoka font-black text-base text-ink flex items-center justify-center gap-2 hover:-translate-y-1 active:translate-y-1"
                >
                  <span>✉️ Dispatch Reset Owl</span>
                </button>
                <button 
                   
                  className="w-full mt-3 py-2 text-xs font-fredoka font-bold text-ink/70 hover:underline text-center"
                >
                  Nevermind, I remembered my password!
                </button>
              </div>

            </div>

          </div>
        </div>

      </section>

    </div>

  </main>
    </>
  );
};
