'use client';

import { useState } from 'react';
import { evaluate } from 'mathjs';
import { motion, AnimatePresence } from 'framer-motion';
import { Divide, Minus, Plus, Equal, X, RotateCcw, Trash2 } from 'lucide-react';
import { Button, cn } from '@devsphere/ui';
import { useAuth } from '@devsphere/auth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CalculatorHistory } from '@devsphere/types';

export function Calculator() {
  const [display, setDisplay] = useState('');
  const [result, setResult] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const { user, getToken } = useAuth();
  const queryClient = useQueryClient();

  const historyQuery = useQuery({
    queryKey: ['calculator-history'],
    queryFn: async () => {
      const token = await getToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_CALCULATOR_API_URL}/calculator/history`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.json() as Promise<CalculatorHistory[]>;
    },
    enabled: !!user,
  });

  const saveMutation = useMutation({
    mutationFn: async (data: { expression: string; result: string }) => {
      const token = await getToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_CALCULATOR_API_URL}/calculator/history`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calculator-history'] });
    },
  });

  const clearMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      await fetch(`${process.env.NEXT_PUBLIC_CALCULATOR_API_URL}/calculator/history`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calculator-history'] });
    },
  });

  const handleCalculate = () => {
    if (!display) return;
    
    // Security: Only allow digits, operators, dots, and parentheses
    const safeRegex = /^[0-9+\-*/.%() ]+$/;
    if (!safeRegex.test(display)) {
      setResult('Invalid Input');
      return;
    }

    try {
      const res = evaluate(display).toString();
      setResult(res);
      if (user) {
        saveMutation.mutate({ expression: display, result: res });
      }
    } catch (e) {
      setResult('Error');
    }
  };

  const append = (char: string) => {
    if (result) {
      setDisplay(result + char);
      setResult('');
    } else {
      setDisplay(display + char);
    }
  };

  const buttons = [
    { label: 'AC', action: () => { setDisplay(''); setResult(''); }, variant: 'ghost' as const },
    { label: 'C', action: () => setDisplay(display.slice(0, -1)), variant: 'ghost' as const },
    { label: '%', action: () => append('%'), variant: 'ghost' as const },
    { label: '/', action: () => append('/'), variant: 'secondary' as const, icon: Divide },
    { label: '7', action: () => append('7') },
    { label: '8', action: () => append('8') },
    { label: '9', action: () => append('9') },
    { label: '*', action: () => append('*'), variant: 'secondary' as const, icon: X },
    { label: '4', action: () => append('4') },
    { label: '5', action: () => append('5') },
    { label: '6', action: () => append('6') },
    { label: '-', action: () => append('-'), variant: 'secondary' as const, icon: Minus },
    { label: '1', action: () => append('1') },
    { label: '2', action: () => append('2') },
    { label: '3', action: () => append('3') },
    { label: '+', action: () => append('+'), variant: 'secondary' as const, icon: Plus },
    { label: '0', action: () => append('0'), className: 'col-span-2' },
    { label: '.', action: () => append('.') },
    { label: '=', action: handleCalculate, variant: 'primary' as const, icon: Equal },
  ];

  return (
    <div className="relative">
      <div className="glass-effect rounded-3xl p-6 shadow-2xl border border-white/10 z-10 relative">
        <div className="flex justify-between items-center mb-4">
          <button 
            onClick={() => setShowHistory(!showHistory)}
            className="p-2 text-zinc-500 hover:text-cyan-400 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
          <div className="text-xs font-bold text-zinc-600 uppercase tracking-widest">Scientific</div>
        </div>

        {/* Display */}
        <div className="mb-6 p-6 bg-black/40 rounded-2xl text-right min-h-[120px] flex flex-col justify-end">
          <div className="text-zinc-500 text-lg h-8 mb-2 font-medium tracking-tight">
            {display || '0'}
          </div>
          <div className="text-5xl font-black tracking-tighter truncate text-white">
            {result || '0'}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-4 gap-3">
          {buttons.map((btn, i) => (
            <Button
              key={i}
              variant={btn.variant || 'outline'}
              className={cn(
                "h-16 rounded-2xl text-xl font-bold transition-all hover:scale-105 active:scale-95",
                btn.className
              )}
              onClick={btn.action}
            >
              {btn.icon ? <btn.icon className="w-6 h-6" /> : btn.label}
            </Button>
          ))}
        </div>
      </div>

      {/* History Drawer */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute top-0 left-0 right-0 bottom-0 bg-[#090a0f]/95 backdrop-blur-xl z-20 rounded-3xl p-6 border border-white/10 overflow-hidden flex flex-col"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">History</h3>
              <div className="flex gap-2">
                <button onClick={() => clearMutation.mutate()} className="p-2 text-zinc-500 hover:text-red-400">
                  <Trash2 className="w-5 h-5" />
                </button>
                <button onClick={() => setShowHistory(false)} className="p-2 text-zinc-500 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              {historyQuery.data?.map((item) => (
                <div key={item.id} className="text-right border-b border-white/5 pb-2">
                  <div className="text-zinc-500 text-sm">{item.expression}</div>
                  <div className="text-xl font-bold text-cyan-400">= {item.result}</div>
                </div>
              ))}
              {!historyQuery.data?.length && (
                <div className="text-center text-zinc-600 mt-20">No history yet</div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
