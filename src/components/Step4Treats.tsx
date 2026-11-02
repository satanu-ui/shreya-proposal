'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Utensils, ArrowRight, ArrowLeft, Check, Sparkles } from 'lucide-react';

interface Step4TreatsProps {
  initialFood: string[];
  initialCustomFood: string;
  onNext: (foods: string[], customFood: string) => void;
  onBack: () => void;
}

const TREAT_OPTIONS = [
  { id: 'italian', label: 'Creamy Pasta & Cheesy Pizza 🍕🍝', tag: 'Classic Romance' },
  { id: 'street_food', label: 'Street Food & Spicy Chaat Feast 🌮🥘', tag: 'Flavor Explosion' },
  { id: 'asian', label: 'Dim Sums, Ramen & Sushi 🥟🍜', tag: 'Delicious & Fun' },
  { id: 'burgers', label: 'Gourmet Burgers & Loaded Fries 🍔🍟', tag: 'Comfort Food' },
  { id: 'fondue', label: 'Strawberry Chocolate Fondue & Waffles 🍓🧇', tag: 'Sweet & Luscious' },
  { id: 'icecream', label: 'Artisan Gelato & Ice Cream Sundaes 🍨🍦', tag: 'Chill Vibes' },
  { id: 'boba', label: 'Boba Bubble Tea & French Macarons 🧋🧁', tag: 'Cute Aesthetic' },
  { id: 'feed_me', label: 'Whatever you feed me with love! 🥰✨', tag: 'Cheesy & Sweet' },
];

export default function Step4Treats({
  initialFood,
  initialCustomFood,
  onNext,
  onBack,
}: Step4TreatsProps) {
  const [selectedFoods, setSelectedFoods] = useState<string[]>(
    initialFood.length > 0 ? initialFood : [TREAT_OPTIONS[0].label, TREAT_OPTIONS[4].label]
  );
  const [customFood, setCustomFood] = useState<string>(initialCustomFood || '');
  const [error, setError] = useState<string>('');

  const toggleFood = (label: string) => {
    if (selectedFoods.includes(label)) {
      if (selectedFoods.length === 1) {
        setError('Pick at least one delicious thing we will share! 😋');
        return;
      }
      setSelectedFoods(selectedFoods.filter((f) => f !== label));
    } else {
      setError('');
      setSelectedFoods([...selectedFoods, label]);
    }
  };

  const handleNext = () => {
    if (selectedFoods.length === 0) {
      setError('Please choose at least one treat for our date! 💕');
      return;
    }
    setError('');
    onNext(selectedFoods, customFood);
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
          <Utensils className="w-3.5 h-3.5 text-pink-600" />
          Step 4 of 6: Delicious Treats
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-romantic-800">
          What Are We Eating, Cutie? 😋🍕
        </h2>
        <p className="text-xs sm:text-sm text-pink-700/80 mt-1">
          Pick everything you are craving (select as many as you like!):
        </p>
      </motion.div>

      {/* Food Choice Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[58vh] overflow-y-auto pr-1">
        {TREAT_OPTIONS.map((item) => {
          const isSelected = selectedFoods.includes(item.label);
          return (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleFood(item.label)}
              className={`p-3.5 rounded-2xl cursor-pointer transition-all border-2 flex items-center justify-between ${
                isSelected
                  ? 'bg-gradient-to-r from-pink-100 to-rose-100 border-rose-400 shadow-sm ring-1 ring-pink-400'
                  : 'bg-white/80 border-pink-100 hover:border-pink-300'
              }`}
            >
              <div className="flex-1 pr-2">
                <span className="text-[10px] font-bold text-pink-500 uppercase tracking-wider block">
                  {item.tag}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-gray-800 mt-0.5 block">
                  {item.label}
                </span>
              </div>

              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center border transition-colors ${
                  isSelected
                    ? 'bg-rose-500 border-rose-500 text-white'
                    : 'border-pink-300 bg-white'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Extra special cravings */}
      <div className="mt-4 p-3 bg-white/80 rounded-2xl border border-pink-200">
        <label className="block text-xs font-semibold text-pink-700 mb-1">
          Any specific restaurant, dessert, or favorite snack? (Optional)
        </label>
        <input
          type="text"
          value={customFood}
          onChange={(e) => setCustomFood(e.target.value)}
          placeholder="e.g. Extra garlic bread, Mango ice cream, dark chocolate..."
          className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-pink-50/40"
        />
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
          <span>Heart-to-Heart 💌</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
