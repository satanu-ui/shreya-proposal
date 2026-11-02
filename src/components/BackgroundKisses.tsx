'use client';

import React, { useEffect, useState } from 'react';

interface FloatingElement {
  id: number;
  emoji: string;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function BackgroundKisses() {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    // Generate floating kiss and heart emojis
    const emojis = ['💋', '😘', '💖', '💕', '🌸', '✨', '🌹', '💌'];
    const items: FloatingElement[] = [];

    for (let i = 0; i < 22; i++) {
      items.push({
        id: i,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        left: Math.random() * 95, // 0 to 95vw
        size: Math.floor(Math.random() * 20) + 18, // 18px to 38px
        duration: Math.floor(Math.random() * 8) + 8, // 8s to 16s
        delay: Math.random() * 6, // 0 to 6s
        opacity: Math.random() * 0.45 + 0.25, // 0.25 to 0.7
      });
    }

    setElements(items);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Soft watercolor ambient glow blobs */}
      <div className="watercolor-blob-1" />
      <div className="watercolor-blob-2" />
      <div className="watercolor-blob-3" />

      {/* Decorative watercolor kiss background graphics (SVG lips) */}
      <svg
        className="absolute top-12 left-6 w-32 h-24 text-pink-300/30 -rotate-12 transform"
        viewBox="0 0 100 60"
        fill="currentColor"
      >
        <path d="M50 15 C35 5, 10 10, 5 30 C15 32, 35 25, 50 35 C65 25, 85 32, 95 30 C90 10, 65 5, 50 15 Z" />
        <path d="M50 38 C35 28, 15 35, 8 36 C18 52, 40 55, 50 48 C60 55, 82 52, 92 36 C85 35, 65 28, 50 38 Z" />
      </svg>

      <svg
        className="absolute bottom-20 right-8 w-44 h-32 text-rose-300/25 rotate-12 transform"
        viewBox="0 0 100 60"
        fill="currentColor"
      >
        <path d="M50 15 C35 5, 10 10, 5 30 C15 32, 35 25, 50 35 C65 25, 85 32, 95 30 C90 10, 65 5, 50 15 Z" />
        <path d="M50 38 C35 28, 15 35, 8 36 C18 52, 40 55, 50 48 C60 55, 82 52, 92 36 C85 35, 65 28, 50 38 Z" />
      </svg>

      {/* Floating kiss & heart items */}
      {elements.map((item) => (
        <span
          key={item.id}
          className="absolute select-none transition-transform"
          style={{
            left: `${item.left}%`,
            bottom: '-10%',
            fontSize: `${item.size}px`,
            opacity: item.opacity,
            animation: `kissFloat ${item.duration}s infinite ease-in`,
            animationDelay: `${item.delay}s`,
          }}
        >
          {item.emoji}
        </span>
      ))}
    </div>
  );
}
