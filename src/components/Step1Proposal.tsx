'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Step1ProposalProps {
  onAccept: (noAttempts: number) => void;
}

export default function Step1Proposal({ onAccept }: Step1ProposalProps) {
  const [noCount, setNoCount] = useState(0);
  const [noPosition, setNoPosition] = useState<{ x: number; y: number } | null>(null);
  const [teaseMessage, setTeaseMessage] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);

  const playfulMessages = [
    "Wait, are you sure Shreya? 🥺",
    "Think again, my pretty princess! 💕",
    "You really thought this button would work? Hehe 🙈",
    "My heart just skipped a beat... say YES! 💓",
    "Don't do this to me cutie pie! 😭❤️",
    "Look how big the YES button is getting! 😍",
    "The universe wants you to click YES! ✨",
    "There is no escaping my love, Shreya! 💍🥰",
    "Fine, clicking this button also means YES! 😘",
  ];

  const playfulNoTexts = [
    "No 🥺",
    "Are you sure? 💔",
    "Really sure? 🥺",
    "Think again! 💕",
    "Last chance! 🙈",
    "Surely not? 😢",
    "You can't click me! 🏃‍♀️",
    "Try again! 😜",
    "Yes in disguise! 😘",
  ];

  // Move the "No" button smoothly away when hovered or touched
  const moveNoButton = () => {
    const nextCount = noCount + 1;
    setNoCount(nextCount);

    const messageIndex = Math.min(nextCount - 1, playfulMessages.length - 1);
    setTeaseMessage(playfulMessages[messageIndex]);

    // Random safe offsets within the screen / container
    // Keep it on screen regardless of mobile or desktop
    const randomAngle = Math.random() * 2 * Math.PI;
    const distance = Math.min(window.innerWidth * 0.35, 140) + Math.random() * 60;
    const offsetX = Math.cos(randomAngle) * distance;
    const offsetY = Math.sin(randomAngle) * distance;

    setNoPosition({
      x: offsetX,
      y: offsetY,
    });
  };

  const handleNoClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    moveNoButton();

    // After 5 attempts, clicking the runaway button smartly accepts as YES!
    if (noCount >= 5) {
      handleYesClick();
    }
  };

  const handleYesClick = () => {
    // Little heart burst confetti
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#ff4d80', '#e5215c', '#ffacc2', '#ffffff'],
      });
    } catch {
      // ignore
    }

    onAccept(noCount);
  };

  // Yes button scale increases with each 'No' attempt
  const yesScale = Math.min(1 + noCount * 0.12, 1.85);

  return (
    <div
      ref={containerRef}
      className="w-full max-w-lg mx-auto flex flex-col items-center text-center px-4 py-8 relative z-10"
    >
      {/* Top Cute Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/90 text-romantic-600 text-xs sm:text-sm font-semibold mb-6 border border-pink-200 shadow-sm"
      >
        <Sparkles className="w-4 h-4 text-pink-500 animate-spin" style={{ animationDuration: '6s' }} />
        <span>A Special Message For You</span>
        <Sparkles className="w-4 h-4 text-pink-500 animate-spin" style={{ animationDuration: '6s' }} />
      </motion.div>

      {/* Main Love Title */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, type: 'spring' }}
        className="space-y-3 mb-6"
      >
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-romantic-700 leading-tight">
          I LOVE YOU
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-600 to-romantic-600 drop-shadow-sm font-serif mt-1">
            SHREYA 💋
          </span>
        </h1>
        <p className="text-sm sm:text-base text-pink-800/80 font-medium max-w-sm mx-auto">
          Every second with you feels like pure magic, my beautiful girl. ✨
        </p>
      </motion.div>

      {/* Romantic Illustration / Interactive Avatar */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
        className="relative my-4"
      >
        <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-pink-200 via-rose-100 to-white p-2 shadow-2xl border-4 border-white flex items-center justify-center animate-pulse-slow">
          <div className="w-full h-full rounded-full bg-gradient-to-b from-rose-50 to-pink-100 flex flex-col items-center justify-center p-3">
            <span className="text-5xl sm:text-6xl animate-bounce" style={{ animationDuration: '2s' }}>
              😘
            </span>
            <div className="flex gap-1 mt-2 text-rose-500">
              <Heart className="w-4 h-4 fill-pink-500 animate-pulse" />
              <Heart className="w-5 h-5 fill-rose-600 animate-heartbeat" />
              <Heart className="w-4 h-4 fill-pink-500 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Floating Kiss Emojis around avatar */}
        <span className="absolute -top-2 -right-2 text-2xl animate-float">💋</span>
        <span className="absolute -bottom-1 -left-2 text-2xl animate-bounce" style={{ animationDelay: '0.5s' }}>
          💌
        </span>
        <span className="absolute top-1/2 -left-4 text-xl animate-pulse">🌸</span>
      </motion.div>

      {/* The Big Proposal Question */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="romantic-card rounded-3xl p-6 sm:p-8 w-full mt-4 mb-8 shadow-xl"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
          Will you go on a dream date with me? 🥺👉👈
        </h2>
        <p className="text-xs sm:text-sm text-pink-600 font-medium">
          Saying YES unlocks the sweetest plan I made for us!
        </p>

        {/* Playful Tease Alert */}
        <AnimatePresence>
          {teaseMessage && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 py-2 px-3 bg-pink-100/80 border border-pink-300 rounded-xl text-xs sm:text-sm text-pink-800 font-semibold"
            >
              {teaseMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons: Growing YES & Dodging NO */}
        <div className="relative mt-8 flex flex-col sm:flex-row items-center justify-center gap-5 min-h-[90px]">
          {/* YES Button */}
          <motion.button
            type="button"
            onClick={handleYesClick}
            animate={{ scale: yesScale }}
            whileHover={{ scale: yesScale * 1.05 }}
            whileTap={{ scale: yesScale * 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="btn-romantic font-bold px-8 py-3.5 rounded-full text-base sm:text-lg flex items-center justify-center gap-2 cursor-pointer z-20 shadow-lg min-w-[150px]"
          >
            <Heart className="w-5 h-5 fill-white" />
            <span>YES, Absolutely! 🥰</span>
          </motion.button>

          {/* Smart NO Button (Runs away & morphs) */}
          <motion.button
            type="button"
            onMouseEnter={moveNoButton}
            onTouchStart={moveNoButton}
            onClick={handleNoClick}
            animate={
              noPosition
                ? { x: noPosition.x, y: noPosition.y }
                : { x: 0, y: 0 }
            }
            transition={{ type: 'spring', stiffness: 450, damping: 22 }}
            className="px-6 py-3 rounded-full text-sm sm:text-base font-semibold text-gray-500 bg-white/90 border border-pink-200 hover:border-pink-300 shadow-sm cursor-pointer hover:bg-pink-50 transition-colors select-none z-10"
          >
            {playfulNoTexts[Math.min(noCount, playfulNoTexts.length - 1)]}
          </motion.button>
        </div>

        {/* Subtle hint */}
        {noCount > 0 && (
          <p className="text-[11px] text-pink-400 mt-6 italic">
            (P.s. You tried saying No {noCount} {noCount === 1 ? 'time' : 'times'}... you know you love me! 😉💋)
          </p>
        )}
      </motion.div>
    </div>
  );
}
