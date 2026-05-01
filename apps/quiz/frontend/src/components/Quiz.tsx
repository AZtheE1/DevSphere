"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Loader2, ArrowRight, RotateCcw } from "lucide-react";

interface Question {
  id: string;
  category: string;
  difficulty: string;
  question: string;
  options: string[];
}

export default function Quiz({ onQuit }: { onQuit: () => void }) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Real answers should be validated on the backend in a production app, 
  // but for simplicity we'll just check them here based on what the API returns (we'd need to modify the backend to return correct_answer for this to work natively without another API call).
  // Assuming the backend sends correct_answer (which it currently does based on questions.service.ts)
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch("http://localhost:3003/questions");
        if (!res.ok) throw new Error("Failed to load questions");
        const data = await res.json();
        setQuestions(data);
        
        // Extract correct answers (the backend sends them currently)
        const answerMap: Record<string, string> = {};
        data.forEach((q: any) => {
          answerMap[q.id] = q.correct_answer;
        });
        setAnswers(answerMap);
      } catch (err) {
        setError("Could not load the quiz. Please make sure the backend is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleSelect = (option: string) => {
    if (isRevealed) return;
    setSelectedAnswer(option);
  };

  const handleConfirm = () => {
    if (!selectedAnswer || isRevealed) return;
    
    setIsRevealed(true);
    const currentQ = questions[currentIndex];
    
    if (selectedAnswer === answers[currentQ.id]) {
      setScore(s => s + 100); // 100 points per question
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(c => c + 1);
      setSelectedAnswer(null);
      setIsRevealed(false);
    } else {
      // Show results
      setCurrentIndex(questions.length);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
        <Loader2 className="w-12 h-12 text-purple-500 animate-spin mb-4" />
        <p className="text-zinc-400 animate-pulse">Loading questions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-6">
        <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl max-w-md text-center">
          <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-red-400 mb-2">Error</h2>
          <p className="text-red-300/80 mb-6">{error}</p>
          <button onClick={onQuit} className="px-6 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-full transition-colors">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (currentIndex >= questions.length && questions.length > 0) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-8 text-center backdrop-blur-xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-white/10">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
            />
          </div>
          
          <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
          <p className="text-zinc-400 mb-8">Here is how you did</p>
          
          <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 mb-8">
            {score}
          </div>
          
          <div className="space-y-3 mb-8">
            <div className="flex justify-between p-4 bg-black/40 rounded-xl border border-white/5">
              <span className="text-zinc-400">Correct Answers</span>
              <span className="font-medium">{score / 100} / {questions.length}</span>
            </div>
            <div className="flex justify-between p-4 bg-black/40 rounded-xl border border-white/5">
              <span className="text-zinc-400">Accuracy</span>
              <span className="font-medium">{Math.round((score / 100) / questions.length * 100)}%</span>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={onQuit}
              className="flex-1 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 font-medium transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => {
                setCurrentIndex(0);
                setScore(0);
                setSelectedAnswer(null);
                setIsRevealed(false);
              }}
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 font-medium transition-transform hover:scale-105 active:scale-95 flex justify-center items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Try Again
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col p-4 sm:p-8">
      {/* Header */}
      <header className="flex justify-between items-center max-w-4xl w-full mx-auto mb-12">
        <button onClick={onQuit} className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">
          Cancel
        </button>
        <div className="flex items-center gap-4">
          <div className="bg-white/10 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider text-purple-300 uppercase">
            {currentQ.category}
          </div>
          <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
            {score} pts
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col max-w-3xl w-full mx-auto">
        <div className="mb-8">
          <div className="flex justify-between text-sm text-zinc-500 mb-4 font-medium">
            <span>Question {currentIndex + 1} of {questions.length}</span>
            <span className="uppercase tracking-wider">{currentQ.difficulty}</span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-12">
            <motion.div 
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
              initial={{ width: `${(currentIndex / questions.length) * 100}%` }}
              animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              transition={{ ease: "easeInOut" }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.h2 
              key={currentQ.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-3xl sm:text-4xl font-semibold leading-tight mb-12"
            >
              {currentQ.question}
            </motion.h2>
          </AnimatePresence>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {currentQ.options.map((option, idx) => {
            const isSelected = selectedAnswer === option;
            const isCorrect = isRevealed && option === answers[currentQ.id];
            const isWrong = isRevealed && isSelected && option !== answers[currentQ.id];
            
            let bgStyle = "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20";
            if (isSelected && !isRevealed) bgStyle = "bg-purple-500/20 border-purple-500/50";
            if (isCorrect) bgStyle = "bg-green-500/20 border-green-500/50 text-green-300";
            if (isWrong) bgStyle = "bg-red-500/20 border-red-500/50 text-red-300";

            return (
              <motion.button
                key={option}
                onClick={() => handleSelect(option)}
                whileHover={!isRevealed ? { scale: 1.02 } : {}}
                whileTap={!isRevealed ? { scale: 0.98 } : {}}
                className={`p-6 rounded-2xl border text-left flex items-center justify-between transition-all ${bgStyle}`}
              >
                <span className="font-medium text-lg leading-snug">{option}</span>
                {isCorrect && <CheckCircle2 className="w-6 h-6 text-green-400" />}
                {isWrong && <XCircle className="w-6 h-6 text-red-400" />}
              </motion.button>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="mt-auto pt-12 flex justify-end">
          {!isRevealed ? (
            <button
              onClick={handleConfirm}
              disabled={!selectedAnswer}
              className={`px-8 py-4 rounded-xl font-bold transition-all flex items-center gap-2 ${
                selectedAnswer 
                  ? "bg-white text-black hover:bg-zinc-200" 
                  : "bg-white/5 text-zinc-500 cursor-not-allowed"
              }`}
            >
              Check Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 text-white transition-all flex items-center gap-2 hover:shadow-lg hover:shadow-purple-500/25"
            >
              {currentIndex < questions.length - 1 ? "Next Question" : "See Results"} 
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
