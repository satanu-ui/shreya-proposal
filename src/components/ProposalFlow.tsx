'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ProposalStep, DateResponse } from '@/lib/types';
import Step1Proposal from './Step1Proposal';
import Step2Destination from './Step2Destination';
import Step3DateTime from './Step3DateTime';
import Step4Treats from './Step4Treats';
import Step5LoveNotes from './Step5LoveNotes';
import Step6Wishlist from './Step6Wishlist';
import Step7Celebration from './Step7Celebration';
import BackgroundKisses from './BackgroundKisses';
import CuteAudioPlayer from './CuteAudioPlayer';
import Link from 'next/link';
import { Lock } from 'lucide-react';

const STEP_ORDER: ProposalStep[] = [
  'proposal',
  'destination',
  'datetime',
  'food',
  'love_note',
  'wishlist',
  'celebration',
];

export default function ProposalFlow() {
  const [currentStep, setCurrentStep] = useState<ProposalStep>('proposal');
  const [formData, setFormData] = useState<DateResponse>({
    shreya_name: 'Shreya',
    agreed_to_date: false,
    no_click_attempts: 0,
    destination: '',
    custom_destination: '',
    date_selected: '',
    time_slot: '',
    custom_time: '',
    food_preferences: [],
    custom_food: '',
    what_she_likes_about_me: '',
    excitement_level: 10000,
    special_wishes: '',
    promise_kept: true,
  });

  const stepIndex = STEP_ORDER.indexOf(currentStep);

  // Animation variants for smooth cute page transitions
  const pageVariants: Variants = {
    initial: {
      opacity: 0,
      scale: 0.95,
      y: 20,
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 24,
        stiffness: 260,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -20,
      transition: {
        duration: 0.25,
      },
    },
  };

  // Step 1 Complete (Proposal accepted)
  const handleStep1Accept = (noAttempts: number) => {
    setFormData((prev) => ({
      ...prev,
      agreed_to_date: true,
      no_click_attempts: noAttempts,
    }));
    setCurrentStep('destination');
  };

  // Step 2 Complete (Destination chosen)
  const handleStep2Next = (destination: string, custom: string) => {
    setFormData((prev) => ({
      ...prev,
      destination,
      custom_destination: custom,
    }));
    setCurrentStep('datetime');
  };

  // Step 3 Complete (Date and time chosen)
  const handleStep3Next = (date: string, timeSlot: string, customTime: string) => {
    setFormData((prev) => ({
      ...prev,
      date_selected: date,
      time_slot: timeSlot,
      custom_time: customTime,
    }));
    setCurrentStep('food');
  };

  // Step 4 Complete (Treats chosen)
  const handleStep4Next = (foods: string[], customFood: string) => {
    setFormData((prev) => ({
      ...prev,
      food_preferences: foods,
      custom_food: customFood,
    }));
    setCurrentStep('love_note');
  };

  // Step 5 Complete (Love note written)
  const handleStep5Next = (note: string) => {
    setFormData((prev) => ({
      ...prev,
      what_she_likes_about_me: note,
    }));
    setCurrentStep('wishlist');
  };

  // Step 6 Complete (Wishlist and pinky promise)
  const handleStep6Next = (excitement: number, wishes: string, promise: boolean) => {
    setFormData((prev) => ({
      ...prev,
      excitement_level: excitement,
      special_wishes: wishes,
      promise_kept: promise,
    }));
    setCurrentStep('celebration');
  };

  const handleReset = () => {
    setCurrentStep('proposal');
  };

  return (
    <main className="relative min-h-[100dvh] w-full flex flex-col justify-between overflow-hidden bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
      {/* Background watercolor effects and floating kisses */}
      <BackgroundKisses />

      {/* Floating Music Box Toggle */}
      <CuteAudioPlayer />

      {/* Header Progress Indicator (Shown on steps 2 to 6) */}
      {stepIndex > 0 && stepIndex < 6 && (
        <div className="w-full max-w-md mx-auto pt-4 px-6 z-20">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold text-pink-700 tracking-wider uppercase">
              Step {stepIndex} of 5
            </span>
            <span className="text-[11px] font-semibold text-rose-500">
              For Shreya 💖
            </span>
          </div>
          <div className="w-full h-2 bg-pink-200/80 rounded-full overflow-hidden p-0.5">
            <motion.div
              className="h-full bg-gradient-to-r from-pink-500 via-rose-500 to-romantic-600 rounded-full"
              initial={{ width: `${((stepIndex - 1) / 5) * 100}%` }}
              animate={{ width: `${(stepIndex / 5) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>
      )}

      {/* Main Multi-Step Content Area */}
      <div className="flex-1 flex items-center justify-center relative z-10 w-full">
        <AnimatePresence mode="wait">
          {currentStep === 'proposal' && (
            <motion.div
              key="step-proposal"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              <Step1Proposal onAccept={handleStep1Accept} />
            </motion.div>
          )}

          {currentStep === 'destination' && (
            <motion.div
              key="step-destination"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              <Step2Destination
                initialDestination={formData.destination}
                initialCustom={formData.custom_destination || ''}
                onNext={handleStep2Next}
                onBack={() => setCurrentStep('proposal')}
              />
            </motion.div>
          )}

          {currentStep === 'datetime' && (
            <motion.div
              key="step-datetime"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              <Step3DateTime
                initialDate={formData.date_selected}
                initialTimeSlot={formData.time_slot}
                initialCustomTime={formData.custom_time || ''}
                onNext={handleStep3Next}
                onBack={() => setCurrentStep('destination')}
              />
            </motion.div>
          )}

          {currentStep === 'food' && (
            <motion.div
              key="step-food"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              <Step4Treats
                initialFood={formData.food_preferences}
                initialCustomFood={formData.custom_food || ''}
                onNext={handleStep4Next}
                onBack={() => setCurrentStep('datetime')}
              />
            </motion.div>
          )}

          {currentStep === 'love_note' && (
            <motion.div
              key="step-love-note"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              <Step5LoveNotes
                initialNote={formData.what_she_likes_about_me}
                onNext={handleStep5Next}
                onBack={() => setCurrentStep('food')}
              />
            </motion.div>
          )}

          {currentStep === 'wishlist' && (
            <motion.div
              key="step-wishlist"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              <Step6Wishlist
                initialExcitement={formData.excitement_level}
                initialWishes={formData.special_wishes || ''}
                initialPromise={formData.promise_kept}
                onNext={handleStep6Next}
                onBack={() => setCurrentStep('love_note')}
              />
            </motion.div>
          )}

          {currentStep === 'celebration' && (
            <motion.div
              key="step-celebration"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              <Step7Celebration data={formData} onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Discreet footer with secret admin link */}
      <footer className="relative z-20 py-3 text-center text-[11px] text-pink-500/70">
        <span>Made with endless love for Shreya 💋</span>
        <Link
          href="/admin"
          className="ml-3 inline-flex items-center text-pink-400 hover:text-pink-600 transition"
          title="Secret Responses View"
        >
          <Lock className="w-3 h-3 opacity-60 hover:opacity-100" />
        </Link>
      </footer>
    </main>
  );
}
