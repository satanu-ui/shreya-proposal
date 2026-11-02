import type { Metadata, Viewport } from 'next';
import { Outfit, Playfair_Display, Dancing_Script } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const dancing = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'For My Beautiful Shreya 💖 | I Love You',
  description: 'A special romantic proposal and dream date planner for Shreya.',
  openGraph: {
    title: 'For My Beautiful Shreya 💖',
    description: 'Will you go on a dream date with me? 🥺👉👈',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#ffe6ec',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${playfair.variable} ${dancing.variable}`}>
      <body className="antialiased selection:bg-pink-300 selection:text-pink-950">
        {children}
      </body>
    </html>
  );
}
