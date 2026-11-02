'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { DateResponse } from '@/lib/types';
import { Heart, Lock, Calendar, MapPin, Utensils, Sparkles, RefreshCw, ArrowLeft, Download, Copy, Check } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [responses, setResponses] = useState<DateResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchResponses = useCallback(async (adminPin: string) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/responses?pin=${encodeURIComponent(adminPin)}`);
      const data = await res.json();
      if (res.ok && data.success) {
        setResponses(data.responses || []);
        setIsAuthenticated(true);
      } else {
        setError(data.error || 'Access denied');
      }
    } catch {
      setError('Failed to connect to database');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchResponses(pin);
  };

  const copySummary = (item: DateResponse) => {
    const text =
      `💖 SHREYA'S DATE PLAN 💖\n` +
      `📍 Destination: ${item.destination} ${item.custom_destination ? `(${item.custom_destination})` : ''}\n` +
      `📅 Date & Time: ${item.date_selected} (${item.time_slot})\n` +
      `🍕 Food: ${item.food_preferences.join(', ')}\n` +
      `💌 What she likes about me: "${item.what_she_likes_about_me}"\n` +
      `✨ Excitement: ${item.excitement_level}%\n` +
      `🙈 Tried to say No: ${item.no_click_attempts} times!`;

    navigator.clipboard.writeText(text);
    setCopiedId(item.id || 'current');
    setTimeout(() => setCopiedId(null), 2500);
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(responses, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `shreya_date_responses_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-pink-50/70 p-4 sm:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-pink-700 hover:text-pink-900 bg-white px-3 py-1.5 rounded-full border border-pink-200 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Proposal</span>
          </Link>

          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <h1 className="text-lg font-bold text-gray-800">Shreya’s Answers Vault</h1>
          </div>
        </div>

        {!isAuthenticated ? (
          /* Passcode screen */
          <div className="max-w-md mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-pink-200 shadow-xl text-center">
            <div className="w-16 h-16 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8" />
            </div>

            <h2 className="text-xl font-bold text-gray-800 mb-2">Boyfriend Passcode</h2>
            <p className="text-xs text-pink-600 mb-6">
              Enter the secret PIN to see everything Shreya submitted (Default PIN is: <strong className="font-mono">143</strong>)
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                placeholder="Enter PIN..."
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full text-center text-xl tracking-widest px-4 py-3 rounded-2xl border-2 border-pink-200 focus:outline-none focus:border-pink-500 font-mono font-bold"
              />

              {error && <p className="text-xs text-rose-600 font-semibold">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="btn-romantic w-full py-3 rounded-full font-bold text-sm shadow-md"
              >
                {loading ? 'Unlocking...' : 'Unlock Answers 💖'}
              </button>
            </form>
          </div>
        ) : (
          /* Responses list */
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-pink-200 shadow-sm">
              <div>
                <h2 className="text-base font-bold text-gray-800">
                  Recorded Submissions ({responses.length})
                </h2>
                <p className="text-xs text-gray-500">Live data from database</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fetchResponses(pin)}
                  className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full bg-pink-50 text-pink-700 hover:bg-pink-100 border border-pink-200 font-medium transition"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                  <span>Refresh</span>
                </button>

                {responses.length > 0 && (
                  <button
                    type="button"
                    onClick={exportJSON}
                    className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 font-medium transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export JSON</span>
                  </button>
                )}
              </div>
            </div>

            {responses.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-pink-200 shadow-sm">
                <span className="text-5xl mb-3 block">💌</span>
                <h3 className="text-lg font-bold text-gray-800">No responses yet!</h3>
                <p className="text-xs text-pink-600 mt-1 max-w-sm mx-auto">
                  When Shreya goes through the proposal website and seals the date, her answers will show up right here in real time!
                </p>
              </div>
            ) : (
              responses.map((item, index) => (
                <div
                  key={item.id || index}
                  className="bg-white rounded-3xl p-5 sm:p-6 border border-pink-200 shadow-md relative overflow-hidden"
                >
                  <div className="flex items-start justify-between pb-3 border-b border-pink-100 mb-4">
                    <div>
                      <span className="text-xs font-bold text-rose-600 uppercase tracking-wide">
                        Response #{responses.length - index}
                      </span>
                      <p className="text-[11px] text-gray-400">
                        {item.created_at ? new Date(item.created_at).toLocaleString() : 'Just now'}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => copySummary(item)}
                      className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-pink-50 text-pink-700 hover:bg-pink-100 border border-pink-200 font-semibold transition"
                    >
                      {copiedId === (item.id || 'current') ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Summary</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-3 bg-pink-50/50 rounded-2xl border border-pink-100">
                      <span className="text-pink-600 font-bold flex items-center gap-1.5 mb-1">
                        <MapPin className="w-3.5 h-3.5" /> Dream Destination:
                      </span>
                      <p className="font-bold text-gray-800 text-sm">{item.destination}</p>
                      {item.custom_destination && (
                        <p className="text-[11px] text-pink-700 mt-0.5">
                          Note: &ldquo;{item.custom_destination}&rdquo;
                        </p>
                      )}
                    </div>

                    <div className="p-3 bg-pink-50/50 rounded-2xl border border-pink-100">
                      <span className="text-pink-600 font-bold flex items-center gap-1.5 mb-1">
                        <Calendar className="w-3.5 h-3.5" /> Date & Time Slot:
                      </span>
                      <p className="font-bold text-gray-800 text-sm">
                        {item.date_selected}
                      </p>
                      <p className="text-[11px] text-gray-600 mt-0.5">
                        {item.time_slot} {item.custom_time ? `(${item.custom_time})` : ''}
                      </p>
                    </div>

                    <div className="p-3 bg-pink-50/50 rounded-2xl border border-pink-100">
                      <span className="text-pink-600 font-bold flex items-center gap-1.5 mb-1">
                        <Utensils className="w-3.5 h-3.5" /> Food & Treats:
                      </span>
                      <p className="font-semibold text-gray-800">
                        {item.food_preferences?.join(', ') || 'Everything yummy'}
                      </p>
                      {item.custom_food && (
                        <p className="text-[11px] text-pink-700 mt-0.5">
                          Special: &ldquo;{item.custom_food}&rdquo;
                        </p>
                      )}
                    </div>

                    <div className="p-3 bg-pink-50/50 rounded-2xl border border-pink-100">
                      <span className="text-pink-600 font-bold flex items-center gap-1.5 mb-1">
                        <Sparkles className="w-3.5 h-3.5" /> Fun Metrics:
                      </span>
                      <p className="font-semibold text-gray-800">
                        Excitement: <span className="text-rose-600 font-bold">{item.excitement_level}%</span>
                      </p>
                      <p className="text-[11px] text-gray-600 mt-0.5">
                        &quot;No&quot; clicks tried: <span className="font-bold text-pink-700">{item.no_click_attempts} times</span>
                      </p>
                    </div>

                    {/* What she likes about me */}
                    <div className="col-span-1 sm:col-span-2 p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl border-2 border-pink-200">
                      <span className="text-rose-700 font-extrabold flex items-center gap-1.5 mb-1 text-xs uppercase tracking-wider">
                        <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                        What She Likes About You:
                      </span>
                      <p className="text-gray-800 text-sm italic font-medium leading-relaxed mt-1">
                        &ldquo;{item.what_she_likes_about_me}&rdquo;
                      </p>
                    </div>

                    {item.special_wishes && (
                      <div className="col-span-1 sm:col-span-2 text-[11px] text-pink-700 bg-white p-2.5 rounded-xl border border-pink-200">
                        <strong>Dress code / Wish:</strong> {item.special_wishes}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
