'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, CheckCircle, Share2, Calendar, MapPin, Utensils, MessageCircle, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DateResponse } from '@/lib/types';

interface Step7CelebrationProps {
  data: DateResponse;
  onReset: () => void;
}

export default function Step7Celebration({ data, onReset }: Step7CelebrationProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedSource, setSavedSource] = useState<string>('');

  useEffect(() => {
    // 1. Trigger celebratory confetti burst
    const end = Date.now() + 3.5 * 1000;
    const colors = ['#ff4d80', '#e5215c', '#ffacc2', '#ffd0dc', '#ffffff'];

    (function frame() {
      try {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });
      } catch {
        // ignore
      }

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    // 2. Persist to API / Database
    const persistData = async () => {
      setIsSubmitting(true);
      try {
        const res = await fetch('/api/responses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const result = await res.json();
        if (result.success) {
          setSavedSource(result.source || 'db');
        }
      } catch (err) {
        console.warn('API sync notice:', err);
      } finally {
        setIsSubmitting(false);
      }

      // 3. Save to localStorage backup
      try {
        localStorage.setItem('shreya_date_response', JSON.stringify(data));
      } catch {
        // ignore
      }
    };

    persistData();
  }, [data]);

  // Generate WhatsApp message for instant 1-click sharing
  const shareToWhatsApp = () => {
    const text =
      `💖 *SHREYA SAID YES!* 💖\n\n` +
      `Hey my love! I just planned our dream date: 🥰\n\n` +
      `📍 *Where we are going:* ${data.destination} ${data.custom_destination ? `(${data.custom_destination})` : ''}\n` +
      `📅 *Date:* ${data.date_selected}\n` +
      `⏰ *Time Slot:* ${data.time_slot} ${data.custom_time ? `(${data.custom_time})` : ''}\n` +
      `🍕 *Treats we'll eat:* ${data.food_preferences.join(', ')}\n\n` +
      `💌 *What I love about you:* \n"${data.what_she_likes_about_me}"\n\n` +
      `✨ *Excitement:* ${data.excitement_level}%\n` +
      `🙈 *I tried to say No:* ${data.no_click_attempts} times hehe!\n\n` +
      `I can't wait to see you! I LOVE YOU! 💋❤️`;

    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6 z-10 text-center">
      {/* Celebration Header */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="mb-6"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-pink-400 to-rose-600 text-white shadow-xl shadow-pink-500/30 mb-3 animate-heartbeat">
          <span className="text-4xl">💋</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-romantic-800">
          IT’S OFFICIAL! 🎉💍
        </h1>
        <p className="text-base sm:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600 mt-1">
          I LOVE YOU SO MUCH, SHREYA! 💖
        </p>
        <p className="text-xs text-pink-700/80 mt-1">
          Our date is sealed with infinite kisses. You made me the happiest person alive!
        </p>
      </motion.div>

      {/* The Official Romantic Date Pass / Ticket */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="romantic-card rounded-3xl p-5 sm:p-6 text-left shadow-2xl border-2 border-pink-300 relative overflow-hidden"
      >
        {/* Ticket Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-dashed border-pink-200">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 fill-rose-500 text-rose-500 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-widest text-romantic-700">
              OFFICIAL DATE PASS
            </span>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Confirmed
          </span>
        </div>

        {/* Ticket Details */}
        <div className="grid grid-cols-2 gap-3 py-4 text-xs">
          <div>
            <span className="text-[10px] text-pink-500 font-bold uppercase block">Special Girl</span>
            <span className="font-extrabold text-gray-800 text-sm">Shreya 💕</span>
          </div>
          <div>
            <span className="text-[10px] text-pink-500 font-bold uppercase block">Lucky Guy</span>
            <span className="font-extrabold text-gray-800 text-sm">Your Boyfriend 🥰</span>
          </div>

          <div className="col-span-2">
            <span className="text-[10px] text-pink-500 font-bold uppercase block flex items-center gap-1">
              <MapPin className="w-3 h-3 text-rose-500" /> Destination
            </span>
            <span className="font-bold text-gray-800 text-sm">
              {data.destination}
              {data.custom_destination ? ` (${data.custom_destination})` : ''}
            </span>
          </div>

          <div>
            <span className="text-[10px] text-pink-500 font-bold uppercase block flex items-center gap-1">
              <Calendar className="w-3 h-3 text-rose-500" /> Date
            </span>
            <span className="font-bold text-gray-800">{data.date_selected}</span>
          </div>

          <div>
            <span className="text-[10px] text-pink-500 font-bold uppercase block">Time Slot</span>
            <span className="font-bold text-gray-800">
              {data.time_slot} {data.custom_time ? `(${data.custom_time})` : ''}
            </span>
          </div>

          <div className="col-span-2">
            <span className="text-[10px] text-pink-500 font-bold uppercase block flex items-center gap-1">
              <Utensils className="w-3 h-3 text-rose-500" /> Food & Treats
            </span>
            <span className="font-medium text-gray-700 text-xs">
              {data.food_preferences.join(', ')}
            </span>
          </div>
        </div>

        {/* What she likes about me highlight */}
        {data.what_she_likes_about_me && (
          <div className="mt-2 pt-3 border-t border-pink-100 bg-pink-50/70 p-3 rounded-xl border border-pink-200">
            <span className="text-[10px] font-bold text-rose-600 uppercase block mb-1">
              What Shreya Likes About Me:
            </span>
            <p className="text-xs text-gray-800 italic leading-relaxed">
              &ldquo;{data.what_she_likes_about_me}&rdquo;
            </p>
          </div>
        )}

        {/* Ticket Footer barcode styling */}
        <div className="mt-4 pt-3 border-t-2 border-dashed border-pink-200 flex items-center justify-between text-[11px] text-pink-700 font-mono">
          <span>TICKET: LOVE-SHREYA-143</span>
          <span className="flex items-center gap-1 font-sans text-rose-500 font-bold">
            <ShieldCheck className="w-3.5 h-3.5" /> Sealed With 💋
          </span>
        </div>
      </motion.div>

      {/* Actions */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
        {/* WhatsApp Share Button */}
        <button
          type="button"
          onClick={shareToWhatsApp}
          className="w-full sm:w-auto px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Send To My WhatsApp 💬</span>
        </button>

        {/* Replay */}
        <button
          type="button"
          onClick={onReset}
          className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-white/80 hover:bg-white text-pink-700 font-semibold text-xs border border-pink-200 transition-all shadow-sm"
        >
          Experience Again 🔄
        </button>
      </div>

      {isSubmitting && (
        <p className="text-[11px] text-pink-500 mt-3 animate-pulse">
          Saving our special plan to database... 💖
        </p>
      )}

      {savedSource && (
        <p className="text-[11px] text-emerald-600 font-medium mt-2">
          ✓ Recorded securely for our special day! ✨
        </p>
      )}
    </div>
  );
}
