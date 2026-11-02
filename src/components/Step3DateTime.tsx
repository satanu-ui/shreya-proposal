'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, ArrowLeft, Heart, Sun, Sunset, Moon, Coffee } from 'lucide-react';

interface Step3DateTimeProps {
  initialDate: string;
  initialTimeSlot: string;
  initialCustomTime: string;
  onNext: (date: string, timeSlot: string, customTime: string) => void;
  onBack: () => void;
}

const TIME_SLOTS = [
  {
    id: 'morning',
    title: 'Morning Sunshine & Coffee ☕',
    range: '09:00 AM - 12:00 PM',
    desc: 'Fresh morning breeze, sweet cafe breakfast & relaxed smiles.',
    icon: Coffee,
    color: 'from-amber-50 to-orange-100 border-amber-300',
  },
  {
    id: 'afternoon',
    title: 'Sunny Afternoon Adventure ☀️',
    range: '01:00 PM - 04:30 PM',
    desc: 'Bright sunny vibes, fun activities, shopping & desserts.',
    icon: Sun,
    color: 'from-yellow-50 to-pink-100 border-yellow-300',
  },
  {
    id: 'sunset',
    title: 'Golden Hour Sunset Magic 🌇',
    range: '05:00 PM - 07:30 PM',
    desc: 'Breathtaking golden sky, gentle winds & holding hands.',
    icon: Sunset,
    color: 'from-rose-50 to-purple-100 border-rose-300',
  },
  {
    id: 'night',
    title: 'Romantic Starlight Night 🌙',
    range: '08:00 PM - 11:30 PM',
    desc: 'City lights, cozy dinner, romantic deep talks & starry skies.',
    icon: Moon,
    color: 'from-indigo-50 to-pink-100 border-indigo-300',
  },
];

export default function Step3DateTime({
  initialDate,
  initialTimeSlot,
  initialCustomTime,
  onNext,
  onBack,
}: Step3DateTimeProps) {
  // Default date: next Saturday if not set
  const getInitialDefaultDate = () => {
    if (initialDate) return initialDate;
    const now = new Date();
    // Default to 3 days from now
    now.setDate(now.getDate() + 3);
    return now.toISOString().split('T')[0];
  };

  const [date, setDate] = useState<string>(getInitialDefaultDate());
  const [timeSlot, setTimeSlot] = useState<string>(initialTimeSlot || TIME_SLOTS[2].title);
  const [customTime, setCustomTime] = useState<string>(initialCustomTime || '');
  const [error, setError] = useState<string>('');

  // Quick pick helpers
  const setQuickDate = (daysFromNow: number) => {
    const d = new Date();
    d.setDate(d.getDate() + daysFromNow);
    setDate(d.toISOString().split('T')[0]);
  };

  const handleNext = () => {
    if (!date) {
      setError('Please choose a special date, Shreya! 🥺');
      return;
    }
    setError('');
    onNext(date, timeSlot, customTime);
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
          <Calendar className="w-3.5 h-3.5 text-pink-600" />
          Step 3 of 6: Our Date & Time
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-romantic-800">
          When Are We Going Out? 📅⏰
        </h2>
        <p className="text-xs sm:text-sm text-pink-700/80 mt-1">
          Pick your free day and the time slot that suits you best!
        </p>
      </motion.div>

      <div className="space-y-5 max-h-[60vh] overflow-y-auto pr-1">
        {/* Date Section */}
        <div className="romantic-card rounded-2xl p-4 sm:p-5 shadow-sm">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-2">
            <Calendar className="w-4 h-4 text-pink-600" />
            <span>Select the Day:</span>
          </label>

          <input
            type="date"
            value={date}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border-2 border-pink-200 focus:outline-none focus:border-pink-500 font-semibold text-gray-700 bg-pink-50/50"
          />

          {/* Quick pick chips */}
          <div className="flex flex-wrap gap-2 mt-3">
            <button
              type="button"
              onClick={() => setQuickDate(1)}
              className="text-xs px-2.5 py-1 rounded-lg bg-pink-100 hover:bg-pink-200 text-pink-800 font-medium transition"
            >
              Tomorrow 🌸
            </button>
            <button
              type="button"
              onClick={() => setQuickDate(3)}
              className="text-xs px-2.5 py-1 rounded-lg bg-pink-100 hover:bg-pink-200 text-pink-800 font-medium transition"
            >
              This Weekend 💕
            </button>
            <button
              type="button"
              onClick={() => setQuickDate(7)}
              className="text-xs px-2.5 py-1 rounded-lg bg-pink-100 hover:bg-pink-200 text-pink-800 font-medium transition"
            >
              Next Week ✨
            </button>
          </div>
        </div>

        {/* Time Slot Section */}
        <div className="romantic-card rounded-2xl p-4 sm:p-5 shadow-sm">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3">
            <Clock className="w-4 h-4 text-pink-600" />
            <span>Choose Your Favorite Time of Day:</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TIME_SLOTS.map((slot) => {
              const isSelected = timeSlot === slot.title;
              const Icon = slot.icon;
              return (
                <div
                  key={slot.id}
                  onClick={() => setTimeSlot(slot.title)}
                  className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? `bg-gradient-to-br ${slot.color} ring-2 ring-pink-400 shadow-sm`
                      : 'bg-white/80 border-pink-100 hover:border-pink-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Icon className="w-4 h-4 text-pink-600" />
                    <span className="text-[10px] font-bold text-pink-600 bg-white/80 px-2 py-0.5 rounded-full border border-pink-200">
                      {slot.range}
                    </span>
                  </div>
                  <h4 className="font-bold text-gray-800 text-xs sm:text-sm mt-2">{slot.title}</h4>
                  <p className="text-[11px] text-gray-500 mt-1">{slot.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Optional specific time */}
          <div className="mt-4 pt-3 border-t border-pink-100">
            <label className="text-xs font-semibold text-pink-800 block mb-1">
              Have an exact time in mind? (Optional)
            </label>
            <input
              type="time"
              value={customTime}
              onChange={(e) => setCustomTime(e.target.value)}
              className="w-full sm:w-1/2 px-3 py-1.5 text-xs rounded-lg border border-pink-200 bg-pink-50/30 focus:outline-none focus:border-pink-400"
            />
          </div>
        </div>
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
          <span>Pick Our Treats 🍕</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
