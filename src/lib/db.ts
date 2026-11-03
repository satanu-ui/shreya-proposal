import { createClient } from '@supabase/supabase-js';
import { DateResponse } from './types';
import fs from 'fs';
import path from 'path';

// Helper to sanitize Supabase URL (strip /rest/v1 or trailing slashes if accidentally pasted)
function cleanSupabaseUrl(url?: string): string | undefined {
  if (!url) return undefined;
  return url.trim().replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
}

// Supabase client initialization (optional, if configured)
const rawSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseUrl = cleanSupabaseUrl(rawSupabaseUrl);
const supabaseKey = (
  process.env.SUPABASE_SERVICE_ROLE_KEY || 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
  process.env.SUPABASE_KEY
)?.trim();

const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey) 
  : null;

// In-memory fallback cache for serverless runtime
declare global {
  // eslint-disable-next-line no-var
  var __inMemoryResponses: DateResponse[] | undefined;
}

if (!global.__inMemoryResponses) {
  global.__inMemoryResponses = [];
}

const LOCAL_DATA_FILE = path.join(process.cwd(), 'data', 'responses.json');

// Helper to ensure local data folder exists for dev
function ensureDataFolder() {
  try {
    const dir = path.dirname(LOCAL_DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  } catch {
    // Read-only filesystem in some serverless envs, ignore
  }
}

/**
 * Save Shreya's response to Database
 */
export async function saveResponse(data: DateResponse): Promise<{ success: boolean; id: string; source: string; error?: string }> {
  const timestamp = new Date().toISOString();
  const recordId = `resp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const recordWithMeta: DateResponse = {
    ...data,
    id: recordId,
    created_at: timestamp,
  };

  let savedSuccessfully = false;
  let primarySource = 'memory';

  // 1. Try Supabase if configured
  if (supabase) {
    try {
      const { data: inserted, error } = await supabase
        .from('date_responses')
        .insert([
          {
            id: recordId,
            shreya_name: recordWithMeta.shreya_name || 'Shreya',
            agreed_to_date: recordWithMeta.agreed_to_date,
            no_click_attempts: recordWithMeta.no_click_attempts,
            destination: recordWithMeta.destination,
            custom_destination: recordWithMeta.custom_destination || null,
            date_selected: recordWithMeta.date_selected,
            time_slot: recordWithMeta.time_slot,
            custom_time: recordWithMeta.custom_time || null,
            food_preferences: recordWithMeta.food_preferences,
            custom_food: recordWithMeta.custom_food || null,
            what_she_likes_about_me: recordWithMeta.what_she_likes_about_me,
            excitement_level: recordWithMeta.excitement_level,
            special_wishes: recordWithMeta.special_wishes || null,
            promise_kept: recordWithMeta.promise_kept,
            user_agent: recordWithMeta.user_agent || null,
            created_at: timestamp,
          }
        ])
        .select();

      if (!error && inserted) {
        savedSuccessfully = true;
        primarySource = 'supabase';
        console.log('✅ Response saved to Supabase successfully!');
      } else if (error) {
        console.warn('⚠️ Supabase insert note:', error.message);
      }
    } catch (err) {
      console.warn('⚠️ Supabase connection error:', err);
    }
  }

  // 2. Try sending webhook notification if WEBHOOK_URL is set (e.g. Discord, Slack, Telegram)
  const webhookUrl = process.env.NOTIFICATION_WEBHOOK_URL || process.env.DISCORD_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `💖 **SHREYA SAID YES!** 💖\n` +
                   `📅 **Date:** ${recordWithMeta.date_selected} (${recordWithMeta.time_slot})\n` +
                   `📍 **Place:** ${recordWithMeta.destination} ${recordWithMeta.custom_destination ? `(${recordWithMeta.custom_destination})` : ''}\n` +
                   `🍕 **Food:** ${recordWithMeta.food_preferences.join(', ')}\n` +
                   `💌 **What she likes about you:** "${recordWithMeta.what_she_likes_about_me}"\n` +
                   `✨ **Excitement:** ${recordWithMeta.excitement_level}%\n` +
                   `🙈 **"No" clicks attempted:** ${recordWithMeta.no_click_attempts} times!`
        })
      });
    } catch (whErr) {
      console.warn('Webhook notification failed:', whErr);
    }
  }

  // 3. Fallback to local JSON file (works in local dev and Node servers)
  try {
    ensureDataFolder();
    let currentList: DateResponse[] = [];
    if (fs.existsSync(LOCAL_DATA_FILE)) {
      const content = fs.readFileSync(LOCAL_DATA_FILE, 'utf-8');
      currentList = JSON.parse(content);
    }
    currentList.unshift(recordWithMeta);
    fs.writeFileSync(LOCAL_DATA_FILE, JSON.stringify(currentList, null, 2), 'utf-8');
    savedSuccessfully = true;
    if (primarySource === 'memory') primarySource = 'local_file';
  } catch {
    // If running in readonly serverless environment without file write access
  }

  // 4. Always store in global in-memory list
  global.__inMemoryResponses?.unshift(recordWithMeta);
  savedSuccessfully = true;

  return {
    success: savedSuccessfully,
    id: recordId,
    source: primarySource,
  };
}

/**
 * Retrieve all responses for the Admin Dashboard
 */
export async function getAllResponses(): Promise<DateResponse[]> {
  // 1. Try Supabase
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('date_responses')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data as DateResponse[];
      }
    } catch (err) {
      console.warn('Failed to fetch from Supabase:', err);
    }
  }

  // 2. Try Local File
  try {
    if (fs.existsSync(LOCAL_DATA_FILE)) {
      const content = fs.readFileSync(LOCAL_DATA_FILE, 'utf-8');
      const list = JSON.parse(content);
      if (Array.isArray(list) && list.length > 0) {
        return list;
      }
    }
  } catch {
    // ignore
  }

  // 3. In-memory
  return global.__inMemoryResponses || [];
}
