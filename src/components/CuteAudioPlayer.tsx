'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export default function CuteAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Romantic melody notes (frequencies in Hz for a soft music-box arpeggio)
  // C4, E4, G4, B4, C5, A4, F4, G4 (Warm romantic progression)
  const notes = [
    261.63, 329.63, 392.0, 493.88, 523.25, 440.0, 349.23, 392.0,
    329.63, 392.0, 440.0, 523.25, 493.88, 392.0, 329.63, 261.63,
  ];

  const playTone = (freq: number) => {
    if (!audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Soft music-box sine & gentle triangle
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Gentle bell envelope
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch {
      // Audio context might be restricted before interaction
    }
  };

  const startMelody = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }

    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    let noteIndex = 0;
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      playTone(notes[noteIndex]);
      noteIndex = (noteIndex + 1) % notes.length;
    }, 450);

    setIsPlaying(true);
  };

  const stopMelody = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsPlaying(false);
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopMelody();
    } else {
      startMelody();
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="fixed top-4 right-4 z-40">
      <button
        onClick={toggleMusic}
        type="button"
        title={isPlaying ? 'Mute romantic tune' : 'Play romantic music box'}
        className="group flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/80 backdrop-blur-md border border-pink-200/80 shadow-md hover:bg-pink-50 transition-all text-pink-600 active:scale-95"
      >
        <span className="relative flex h-3 w-3">
          {isPlaying && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
          )}
          <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
        </span>

        {isPlaying ? (
          <>
            <Volume2 className="w-4 h-4 text-pink-600 animate-pulse" />
            <span className="text-xs font-medium text-pink-700 hidden sm:inline">Our Melody</span>
          </>
        ) : (
          <>
            <Music className="w-4 h-4 text-pink-400 group-hover:text-pink-600" />
            <span className="text-xs font-medium text-pink-500 hidden sm:inline">Play Music 🎵</span>
          </>
        )}
      </button>
    </div>
  );
}
