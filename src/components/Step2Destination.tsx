'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Sparkles, ArrowRight, ArrowLeft, Check } from 'lucide-react';

interface Step2DestinationProps {
  initialDestination: string;
  initialCustom: string;
  onNext: (destination: string, custom: string) => void;
  onBack: () => void;
}

export const DESTINATIONS = [
  {
    id: 'candlelight',
    title: 'Candlelight Dinner 🕯️',
    vibe: 'Romantic & Elegant',
    desc: 'Dim warm lights, soft music, delicious food & gazing into each other’s eyes.',
    gradient: 'from-amber-100 to-rose-100',
    borderColor: 'border-amber-300',
  },
  {
    id: 'beach_sunset',
    title: 'Sunset Beach Walk 🌅',
    vibe: 'Dreamy & Peaceful',
    desc: 'Golden hour waves, cool sea breeze, barefoot on the sand and holding hands.',
    gradient: 'from-orange-100 to-pink-100',
    borderColor: 'border-rose-300',
  },
  {
    id: 'amusement_park',
    title: 'Amusement Park & Ferris Wheel 🎡',
    vibe: 'Playful & Cute',
    desc: 'Cotton candy, laughing on rollercoaster rides & a sweet kiss at the very top.',
    gradient: 'from-sky-100 to-pink-100',
    borderColor: 'border-sky-300',
  },
  {
    id: 'movie_fort',
    title: 'Cozy Movie & Blanket Fort 🎬',
    vibe: 'Warm & Cuddly',
    desc: 'Fairy lights, giant pillows, hot popcorn & warm cuddles in our own private world.',
    gradient: 'from-indigo-100 to-rose-100',
    borderColor: 'border-indigo-300',
  },
  {
    id: 'stargazing',
    title: 'Stargazing Night Picnic 🌌',
    vibe: 'Magical & Intimate',
    desc: 'Picnic blanket, sweet strawberries, soft guitar tunes and counting stars.',
    gradient: 'from-purple-100 to-pink-100',
    borderColor: 'border-purple-300',
  },
  {
    id: 'aesthetic_cafe',
    title: 'Aesthetic Cafe Date ☕',
    vibe: 'Chic & Sweet',
    desc: 'Iced caramel lattes, warm bakery croissants & clicking endless cute photos of you.',
    gradient: 'from-emerald-100 to-pink-100',
    borderColor: 'border-emerald-300',
  },
  {
    id: 'custom_spot',
    title: 'Surprise Me / Custom Spot ✨',
    vibe: 'Your Special Wish',
    desc: 'Have a secret dream place in your heart? Tell me and I’ll take you there!',
    gradient: 'from-rose-100 to-pink-200',
    borderColor: 'border-pink-400',
  },
];

export default function Step2Destination({
  initialDestination,
  initialCustom,
  onNext,
  onBack,
}: Step2DestinationProps) {
  const [selected, setSelected] = useState<string>(initialDestination || DESTINATIONS[0].title);
  const [customText, setCustomText] = useState<string>(initialCustom || '');
  const [error, setError] = useState<string>('');

  const handleNext = () => {
    if (selected.includes('Custom') && !customText.trim()) {
      setError('Please tell me your dream spot, my love! 💕');
      return;
    }
    setError('');
    onNext(selected, customText);
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
          <MapPin className="w-3.5 h-3.5 text-pink-600" />
          Step 2 of 6: Dream Destination
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-romantic-800">
          Where Should Our Dream Date Be? 🏰✨
        </h2>
        <p className="text-xs sm:text-sm text-pink-700/80 mt-1">
          Pick where you want us to make unforgettable memories together:
        </p>
      </motion.div>

      {/* Grid of cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-[58vh] overflow-y-auto pr-1 pb-2">
        {DESTINATIONS.map((item) => {
          const isSelected = selected === item.title;
          return (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelected(item.title);
                setError('');
              }}
              className={`p-4 rounded-2xl cursor-pointer transition-all border-2 text-left relative overflow-hidden ${
                isSelected
                  ? `bg-gradient-to-br ${item.gradient} ${item.borderColor} shadow-md ring-2 ring-pink-400`
                  : 'bg-white/80 border-pink-100 hover:border-pink-300 hover:bg-pink-50/50'
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-pink-600/80">
                  {item.vibe}
                </span>
                {isSelected && (
                  <span className="w-5 h-5 rounded-full bg-pink-600 text-white flex items-center justify-center">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                )}
              </div>

              <h3 className="font-bold text-gray-800 text-base mt-1.5">{item.title}</h3>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">{item.desc}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Custom input if custom selected */}
      {selected.includes('Custom') && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 p-3 bg-white/90 rounded-2xl border border-pink-200"
        >
          <label className="block text-xs font-semibold text-pink-700 mb-1">
            Tell me the place you have in mind: ✨
          </label>
          <input
            type="text"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder="e.g. A rooftop overlooking city lights, a road trip..."
            className="w-full px-3 py-2 text-sm rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-pink-50/40"
          />
        </motion.div>
      )}

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
          <span>Choose Date & Time</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
