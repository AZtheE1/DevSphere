"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BrainCircuit, Trophy, ArrowRight, Play } from "lucide-react";
import Quiz from "@/components/Quiz";

export default function Home() {
  const [started, setStarted] = useState(false);

  if (started) {
    return <Quiz onQuit={() => setStarted(false)} />;
  }

  return (
    <main className="min-h-screen bg-black text-white selection:bg-purple-500/30 overflow-hidden relative flex flex-col items-center justify-center p-6">
      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-900/20 rounded-full blur-[80px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-2xl flex flex-col items-center text-center space-y-12"
      >
        <div className="space-y-6">
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-24 h-24 mx-auto bg-gradient-to-tr from-purple-600 to-blue-500 rounded-3xl p-6 flex items-center justify-center shadow-2xl shadow-purple-500/20 mb-8"
          >
            <BrainCircuit className="w-full h-full text-white" />
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-blue-200">
            DevSphere Quiz
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Test your programming knowledge, climb the leaderboard, and prove your skills in multiple categories.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <button
            onClick={() => setStarted(true)}
            className="group relative inline-flex h-14 items-center justify-center gap-3 rounded-full bg-white px-8 text-black font-semibold overflow-hidden transition-transform hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Quiz <Play className="w-4 h-4 fill-current" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-blue-200 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          
          <button className="group relative inline-flex h-14 items-center justify-center gap-3 rounded-full bg-white/5 border border-white/10 px-8 text-white font-semibold backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/20 active:scale-95">
            <Trophy className="w-5 h-5 text-purple-400" />
            Leaderboard
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl pt-12 border-t border-white/10">
          {[
            { label: "Questions", value: "10" },
            { label: "Categories", value: "3+" },
            { label: "Difficulty", value: "Mixed" },
            { label: "Time Limit", value: "None" },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="flex flex-col items-center p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm"
            >
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs text-zinc-500 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </main>
  );
}
