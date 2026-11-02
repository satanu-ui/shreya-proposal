'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ArrowLeft, Heart, ShieldCheck } from 'lucide-react';

interface Step6WishlistProps {
  initialExcitement: number;
  initialWishes: string;
  initialPromise: boolean;
  onNext: (excitement: number, wishes: string, promise: boolean) => void;
  onBack: () => void;
}

export default function Step6Wishlist({
  initialExcitement,
  initialWishes,
  initialPromise,
  onNext,
  onBack,
}: Step6WishlistProps) {
  const [excitement, setExcitement] = useState<number>(initialExcitement || 10000);
  const [wishes, setWishes] = useState<string>(initialWishes || 'We both wear matching pastel cute outfits! 🌸');
  const [promise, setPromise] = useState<boolean>(initialPromise ?? true);

  const getExcitementLabel = (val: number) => {
    if (val < 2000) return 'Super excited! 😊✨';
    if (val < 10000) return 'Butterflies in my stomach! 🦋';
    if (val < 50000) return 'Counting down every single second! ⏰💓';
    if (val < 100000) return 'Can’t stop smiling thinking about it! 🥰';
    return '1,000,000% OFF THE CHARTS IN LOVE! 🚀💖';
  };

  const handleNext = () => {
    onNext(excitement, wishes, promise);
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
          <Sparkles className="w-3.5 h-3.5 text-pink-600" />
          Step 6 of 6: The Final Touch
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-romantic-800">
          Almost Ready, My Love! ✨
        </h2>
        <p className="text-xs sm:text-sm text-pink-700/80 mt-1">
          A couple of fun questions before we lock in our dream date!
        </p>
      </motion.div>

      <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
        {/* Excitement Level Slider */}
        <div className="romantic-card rounded-2xl p-4 sm:p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span>How excited are you to see me?</span>
            </label>
            <span className="text-xs font-extrabold text-rose-600 bg-pink-100 px-2.5 py-0.5 rounded-full">
              {excitement.toLocaleString()}%
            </span>
          </div>

          <input
            type="range"
            min="100"
            max="100000"
            step="1000"
            value={excitement}
            onChange={(e) => setExcitement(Number(e.target.value))}
            className="w-full accent-rose-500 cursor-pointer h-2 bg-pink-200 rounded-lg"
          />

          <div className="mt-2 text-center">
            <span className="text-xs font-bold text-pink-800 bg-white/80 px-3 py-1 rounded-full border border-pink-200 inline-block shadow-sm">
              {getExcitementLabel(excitement)}
            </span>
          </div>
        </div>

        {/* Dress code & special wishes */}
        <div className="romantic-card rounded-2xl p-4 sm:p-5 shadow-sm">
          <label className="text-sm font-bold text-gray-800 block mb-2">
            What is our dress code or vibe? 👗👔
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
            {[
              'Matching pastel / pink vibes 🌸',
              'Comfy hoodies & sneakers 👟',
              'Classy dress & formal look 💃🕺',
              'Surprise me, you look cute anyway! 🥰',
            ].map((vibe, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setWishes(vibe)}
                className={`p-2.5 text-xs text-left rounded-xl border font-medium transition ${
                  wishes === vibe
                    ? 'bg-pink-100 border-pink-400 font-bold text-pink-900 shadow-sm'
                    : 'bg-white/70 border-pink-200 text-gray-700 hover:bg-pink-50'
                }`}
              >
                {vibe}
              </button>
            ))}
          </div>

          <input
            type="text"
            value={wishes}
            onChange={(e) => setWishes(e.target.value)}
            placeholder="Or type your own custom wish..."
            className="w-full px-3 py-2 text-xs rounded-xl border border-pink-200 bg-pink-50/30 focus:outline-none focus:border-pink-400"
          />
        </div>

        {/* Pinky Promise */}
        <div className="romantic-card rounded-2xl p-4 shadow-sm flex items-center justify-between gap-3 bg-gradient-to-r from-pink-50 to-rose-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-gray-800">
                The Sacred Love Pinky Promise 🤞💖
              </h4>
              <p className="text-[11px] text-gray-600">
                I promise to bring my brightest smile and let you hold my hand all day!
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setPromise(true)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition shadow-sm ${
              promise
                ? 'bg-rose-500 text-white'
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            {promise ? 'PROMISED! 💍' : 'Promise?'}
          </button>
        </div>
      </div>

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
          className="btn-romantic flex items-center gap-2 px-7 py-2.5 rounded-full text-sm font-bold shadow-md cursor-pointer animate-pulse-slow"
        >
          <span>Seal It With A Kiss 💋</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
