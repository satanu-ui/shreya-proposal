'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowRight, ArrowLeft, PenLine, Sparkles } from 'lucide-react';

interface Step5LoveNotesProps {
  initialNote: string;
  onNext: (note: string) => void;
  onBack: () => void;
}

const QUICK_TAGS = [
  'Your sweet smile 😊',
  'How you care for me 🫂',
  'Your funny silly jokes 😂',
  'Your warm tight hugs 🤗',
  'The way you look at me 🥺',
  'Your gentle voice 🎶',
  'How safe I feel with you 🛡️',
  'Everything about you ❤️',
];

export default function Step5LoveNotes({
  initialNote,
  onNext,
  onBack,
}: Step5LoveNotesProps) {
  const [note, setNote] = useState<string>(initialNote || '');
  const [error, setError] = useState<string>('');

  const appendTag = (tag: string) => {
    if (!note.includes(tag)) {
      const newText = note.trim() ? `${note.trim()}, ${tag}` : tag;
      setNote(newText);
      setError('');
    }
  };

  const handleNext = () => {
    if (!note.trim() || note.trim().length < 3) {
      setError('Please write at least a few words, my love! 🥺 I want to know what you like about me!');
      return;
    }
    setError('');
    onNext(note.trim());
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6 z-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold mb-2">
          <Heart className="w-3.5 h-3.5 text-pink-600 fill-pink-500" />
          Step 5 of 6: A Question From My Heart
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-romantic-800">
          What Do You Like About Me? 💌
        </h2>
        <p className="text-xs sm:text-sm text-pink-700/80 mt-1">
          Speak your heart out, Shreya... I am all ears! 🥰
        </p>
      </motion.div>

      {/* Love Letter Note Container */}
      <div className="romantic-card rounded-3xl p-5 sm:p-6 shadow-xl border-2 border-pink-200/80 relative overflow-hidden">
        {/* Decorative corner kiss stamp */}
        <div className="absolute top-3 right-3 text-2xl rotate-12 opacity-80 select-none">
          💋
        </div>

        <div className="flex items-center gap-2 mb-3">
          <PenLine className="w-4 h-4 text-pink-600" />
          <span className="text-xs font-bold text-pink-900 tracking-wide uppercase">
            Your Love Letter to Me:
          </span>
        </div>

        {/* Textarea with stationery ruled lines feel */}
        <textarea
          rows={5}
          value={note}
          onChange={(e) => {
            setNote(e.target.value);
            if (error) setError('');
          }}
          placeholder="Tell me what you like most about me... (e.g. the way you smile, how you always listen to me, how you make me laugh until my stomach hurts...)"
          className="w-full p-4 text-sm sm:text-base rounded-2xl border-2 border-pink-200/80 focus:outline-none focus:border-pink-500 bg-pink-50/40 text-gray-800 placeholder-pink-400/70 resize-none transition-all shadow-inner leading-relaxed"
        />

        {/* Quick tap chips */}
        <div className="mt-4">
          <span className="text-xs font-semibold text-pink-700 block mb-2">
            Tap any of these to add to your answer: 👇
          </span>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_TAGS.map((tag, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => appendTag(tag)}
                className="text-xs px-2.5 py-1 rounded-full bg-pink-100/80 hover:bg-pink-200 text-pink-800 font-medium border border-pink-200 transition-all hover:scale-105 active:scale-95"
              >
                + {tag}
              </button>
            ))}
          </div>
        </div>

        {note.length > 20 && (
          <p className="text-xs text-rose-500 font-semibold mt-3 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Aww Shreya, reading this makes my heart melt! 🥹💖</span>
          </p>
        )}
      </div>

      {error && <p className="text-xs text-rose-600 font-semibold mt-2 text-center">{error}</p>}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mt-6 pt-2 border-t border-pink-100">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-pink-700 hover:text-pink-900 bg-white/70 rounded-full border border-pink-200 hover:bg-white transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="btn-romantic flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold shadow-md cursor-pointer"
        >
          <span>One Last Sweet Step ✨</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
