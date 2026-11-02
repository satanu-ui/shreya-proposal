-- ========================================================
-- FREE SUPABASE DATABASE SETUP FOR SHREYA'S DATE PROPOSAL
-- ========================================================
-- 1. Create a free account at https://supabase.com
-- 2. Create a new project (e.g. "shreya-proposal")
-- 3. Go to SQL Editor in the left sidebar
-- 4. Paste this script and click "RUN"
-- ========================================================

CREATE TABLE IF NOT EXISTS date_responses (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  shreya_name TEXT DEFAULT 'Shreya',
  agreed_to_date BOOLEAN DEFAULT TRUE,
  no_click_attempts INT DEFAULT 0,
  destination TEXT NOT NULL,
  custom_destination TEXT,
  date_selected TEXT NOT NULL,
  time_slot TEXT NOT NULL,
  custom_time TEXT,
  food_preferences TEXT[] DEFAULT '{}',
  custom_food TEXT,
  what_she_likes_about_me TEXT,
  excitement_level INT DEFAULT 10000,
  special_wishes TEXT,
  promise_kept BOOLEAN DEFAULT TRUE,
  user_agent TEXT
);

-- Enable Row Level Security (RLS)
ALTER TABLE date_responses ENABLE ROW LEVEL SECURITY;

-- Allow public inserts so Shreya can submit without signing in
CREATE POLICY "Allow public inserts"
ON date_responses
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Allow public read (or protected via API)
CREATE POLICY "Allow read"
ON date_responses
FOR SELECT
TO anon, authenticated
USING (true);
