import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        romantic: {
          50: '#fff5f7',
          100: '#ffe6ec',
          200: '#ffd0dc',
          300: '#ffacc2',
          400: '#ff779f',
          500: '#f9447a',
          600: '#e5215c',
          700: '#c21245',
          800: '#a1123c',
          900: '#861436',
          950: '#4d041a',
        },
        blush: {
          light: '#FFF0F5',
          DEFAULT: '#FFDEE9',
          dark: '#B5FFFC',
        },
        roseGold: '#B76E79',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-outfit)', 'sans-serif'],
        cursive: ['var(--font-dancing)', 'cursive'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(3deg)' },
        },
        pulseSlow: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.85' },
        },
        kissFloat: {
          '0%': { transform: 'translateY(0) scale(0.8) rotate(0deg)', opacity: '0' },
          '20%': { opacity: '0.9' },
          '80%': { opacity: '0.8' },
          '100%': { transform: 'translateY(-120px) scale(1.2) rotate(15deg)', opacity: '0' },
        },
        heartbeat: {
          '0%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.15)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.25)' },
          '70%': { transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        'pulse-slow': 'pulseSlow 3s ease-in-out infinite',
        'kiss-float': 'kissFloat 5s ease-out infinite',
        heartbeat: 'heartbeat 1.6s ease-in-out infinite',
        shimmer: 'shimmer 2.5s infinite linear',
      },
    },
  },
  plugins: [],
};
export default config;
