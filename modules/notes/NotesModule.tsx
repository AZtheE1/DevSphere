'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalStore } from '@/store/useGlobalStore';
import { Sparkles, Plus, Pin, Trash2, Wand2, Edit3, Eye, FileText, Check } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  color: string;
  tags: string[];
  pinned: boolean;
  updatedAt: string;
}

const NOTE_COLORS = ['#FFD93D', '#FF6B9D', '#4CC9F0', '#6BE585', '#FF9F1C', '#E9E5FF'];

export const NotesModule: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: '🚀 Milestone 1 Launch Plan',
      content: '## Goals\n- Connect all 10 apps to the master dashboard.\n- Apply Google Stitch Neo-Brutalist design tokens.\n- Ensure zero console errors & seamless micro-animations.',
      color: '#FFD93D',
      tags: ['#launch', '#architecture'],
      pinned: true,
      updatedAt: 'Just now',
    },
    {
      id: '2',
      title: '💡 Toy Theme Ideas',
      content: 'Robots, candy buttons, stickers, spring physics, and cel-shaded gloss highlights!',
      color: '#FF6B9D',
      tags: ['#design', '#doodle'],
      pinned: false,
      updatedAt: '2h ago',
    },
    {
      id: '3',
      title: '🛒 Shopping List',
      content: '- 1x Mechanical Switch Kit\n- 2x Sticker Sheets\n- 1x Neon LED strip',
      color: '#6BE585',
      tags: ['#personal'],
      pinned: false,
      updatedAt: 'Yesterday',
    },
  ]);

  const [activeNoteId, setActiveNoteId] = useState<string>('1');
  const [viewMode, setViewMode] = useState<'board' | 'editor'>('board');
  const [markdownPreview, setMarkdownPreview] = useState(true);

  const { playSound, addXP } = useGlobalStore();
  const activeNote = notes.find((n) => n.id === activeNoteId) || notes[0];

  const createNewNote = () => {
    const newNote: Note = {
      id: String(Date.now()),
      title: '📝 New Note',
      content: 'Write your thoughts here...',
      color: NOTE_COLORS[Math.floor(Math.random() * NOTE_COLORS.length)],
      tags: ['#draft'],
      pinned: false,
      updatedAt: 'Just now',
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
    playSound('pop');
    addXP(15);
  };

  const updateActiveNote = (fields: Partial<Note>) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === activeNoteId ? { ...n, ...fields, updatedAt: 'Just now' } : n))
    );
  };

  const deleteNote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotes((prev) => prev.filter((n) => n.id !== id));
    playSound('zap');
  };

  const togglePin = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n))
    );
    playSound('click');
  };

  const runAiTagger = () => {
    if (!activeNote) return;
    playSound('laser');
    const text = (activeNote.title + ' ' + activeNote.content).toLowerCase();
    const suggestedTags: string[] = [];
    if (text.includes('plan') || text.includes('goal')) suggestedTags.push('#strategic');
    if (text.includes('code') || text.includes('app')) suggestedTags.push('#dev');
    if (text.includes('design') || text.includes('ui')) suggestedTags.push('#creative');
    if (suggestedTags.length === 0) suggestedTags.push('#insights', '#magic');

    updateActiveNote({ tags: Array.from(new Set([...activeNote.tags, ...suggestedTags])) });
    playSound('win');
    addXP(20);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-mint p-6 rounded-3xl border-[4px] border-ink shadow-neo-lg">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-ink font-bold text-xs border-[2px] border-ink mb-2 shadow-neo-sm">
            <Sparkles className="w-3.5 h-3.5 text-bubblegum" />
            App 04 • Stitch UI Model
          </div>
          <h1 className="text-3xl font-heading font-black text-ink">Corkboard Studio & Notes</h1>
          <p className="text-sm font-semibold text-ink/80 mt-1">
            Sticky notes board, dual-pane markdown editor & AI auto-tagger.
          </p>
        </div>

        {/* View Switcher & New Note Button */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center bg-white p-1 rounded-2xl border-[3px] border-ink shadow-neo-sm">
            <button
              onClick={() => {
                setViewMode('board');
                playSound('click');
              }}
              className={`px-3 py-1.5 rounded-xl font-heading font-bold text-xs transition-all ${
                viewMode === 'board' ? 'bg-sunny text-ink' : 'text-gray-600'
              }`}
            >
              📌 Corkboard
            </button>
            <button
              onClick={() => {
                setViewMode('editor');
                playSound('click');
              }}
              className={`px-3 py-1.5 rounded-xl font-heading font-bold text-xs transition-all ${
                viewMode === 'editor' ? 'bg-sunny text-ink' : 'text-gray-600'
              }`}
            >
              📝 Markdown
            </button>
          </div>

          <button
            onClick={createNewNote}
            className="px-4 py-2.5 rounded-2xl bg-sunny border-[3px] border-ink font-heading font-black text-xs text-ink shadow-neo-sm hover:translate-y-[-1px] active:translate-y-[2px] transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> New Sticky
          </button>
        </div>
      </div>

      {/* Mode 1: Corkboard View */}
      {viewMode === 'board' && (
        <div className="bg-cream p-8 rounded-[32px] border-[4.5px] border-ink shadow-neo-xl min-h-[460px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {notes.map((note) => (
                <motion.div
                  key={note.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={() => {
                    setActiveNoteId(note.id);
                    setViewMode('editor');
                    playSound('click');
                  }}
                  className="p-6 rounded-3xl border-[3.5px] border-ink shadow-neo cursor-pointer hover:translate-y-[-4px] hover:rotate-1 transition-all relative flex flex-col justify-between min-h-[220px]"
                  style={{ backgroundColor: note.color }}
                >
                  {/* Top Bar: Pin & Delete */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-ink/60 font-mono-code">
                      {note.updatedAt}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={(e) => togglePin(note.id, e)}
                        className={`p-1.5 rounded-lg border-[2px] border-ink ${
                          note.pinned ? 'bg-sunny' : 'bg-white'
                        }`}
                        title="Pin note"
                      >
                        <Pin className="w-3.5 h-3.5 text-ink" />
                      </button>
                      <button
                        onClick={(e) => deleteNote(note.id, e)}
                        className="p-1.5 rounded-lg bg-white border-[2px] border-ink hover:bg-bubblegum hover:text-white transition-colors"
                        title="Delete note"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Body */}
                  <div>
                    <h3 className="font-heading font-black text-lg text-ink mb-2 leading-tight">
                      {note.title}
                    </h3>
                    <p className="text-xs font-semibold text-ink/80 line-clamp-3">
                      {note.content}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t-[2px] border-ink/20">
                    {note.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-full bg-white/70 border border-ink text-[10px] font-bold text-ink"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Mode 2: Split Markdown Editor */}
      {viewMode === 'editor' && activeNote && (
        <div className="bg-white p-6 sm:p-8 rounded-[32px] border-[4.5px] border-ink shadow-neo-xl">
          {/* Editor Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b-[3px] border-ink mb-6">
            <input
              type="text"
              value={activeNote.title}
              onChange={(e) => updateActiveNote({ title: e.target.value })}
              className="font-heading font-black text-2xl text-ink bg-transparent outline-none flex-1 min-w-[200px]"
              placeholder="Note Title..."
            />

            <div className="flex items-center gap-2">
              {/* Color Swatches */}
              <div className="flex items-center gap-1 bg-cream p-1 rounded-xl border-[2px] border-ink">
                {NOTE_COLORS.map((c) => (
                  <button
                    key={c}
                    onClick={() => updateActiveNote({ color: c })}
                    className={`w-5 h-5 rounded-full border-[2px] border-ink transition-transform ${
                      activeNote.color === c ? 'scale-125 ring-2 ring-ink' : ''
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>

              {/* AI Auto Tagger */}
              <button
                onClick={runAiTagger}
                className="px-3 py-1.5 rounded-xl bg-grape text-white border-[2.5px] border-ink font-heading font-bold text-xs shadow-neo-sm hover:translate-y-[-1px] transition-all flex items-center gap-1.5"
                title="AI Magic Auto Tagger"
              >
                <Wand2 className="w-3.5 h-3.5" /> AI Tagger
              </button>

              {/* Toggle Markdown Preview */}
              <button
                onClick={() => setMarkdownPreview(!markdownPreview)}
                className="p-2 rounded-xl bg-cream border-[2.5px] border-ink text-ink hover:bg-sunny transition-all"
                title="Toggle Markdown Split View"
              >
                {markdownPreview ? <Eye className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Editor Body: Split View */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[350px]">
            {/* Left: Raw Markdown Input */}
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" /> Markdown Source
              </span>
              <textarea
                value={activeNote.content}
                onChange={(e) => updateActiveNote({ content: e.target.value })}
                className="flex-1 w-full p-4 rounded-2xl bg-cream border-[3px] border-ink font-mono-code text-sm text-ink resize-none outline-none focus:bg-white focus:ring-2 focus:ring-sky transition-all"
                placeholder="Write in Markdown (# Heading, - List item, **bold**)..."
              />
            </div>

            {/* Right: Rendered Markdown Preview */}
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" /> Live Rendered Preview
              </span>
              <div className="flex-1 p-5 rounded-2xl border-[3px] border-ink overflow-y-auto" style={{ backgroundColor: activeNote.color }}>
                <div className="prose prose-sm max-w-none text-ink">
                  {activeNote.content.split('\n').map((line, idx) => {
                    if (line.startsWith('## ')) {
                      return <h2 key={idx} className="font-heading font-black text-xl mb-2">{line.replace('## ', '')}</h2>;
                    }
                    if (line.startsWith('# ')) {
                      return <h1 key={idx} className="font-heading font-black text-2xl mb-2">{line.replace('# ', '')}</h1>;
                    }
                    if (line.startsWith('- ')) {
                      return (
                        <div key={idx} className="flex items-center gap-2 my-1 font-semibold">
                          <Check className="w-4 h-4 text-ink" />
                          <span>{line.replace('- ', '')}</span>
                        </div>
                      );
                    }
                    return <p key={idx} className="my-1.5 font-semibold text-sm">{line}</p>;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
