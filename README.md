# 💖 Romantic Proposal & Dream Date Website for Shreya

An interactive, responsive web application crafted specifically for proposing to **Shreya** with a dream date adventure. It runs on any device (**Android, iOS, Windows, Mac**) with touch-optimized controls, cute animations, watercolor kiss motifs, and persistent database storage.

---

## ✨ Features

1. **💖 Page 1: "I LOVE YOU SHREYA" & The Proposal**
   - Romantic typography with animated emojis (`💋`, `😘`, `💖`, `✨`).
   - "Will you go on a dream date with me?" with interactive **Yes** and **No** buttons.
   - **Smart "No" Button Magic**:
     - Dodges away on hover (desktop) or touch (mobile) with playful teasing texts ("*Wait, are you sure Shreya? 🥺*", "*Think again cutie! 💕*").
     - With every attempt to click "No", the **YES** button grows bigger and pulses brighter!
     - After multiple playful tries, clicking "No" smartly triggers **YES**!

2. **🏰 Page 2: Dream Date Destination**
   - Gorgeous cards: Candlelight Dinner 🕯️, Beach Sunset Walk 🌅, Amusement Park 🎡, Cozy Movie Fort 🎬, Stargazing Picnic 🌌, Aesthetic Parisian Cafe ☕, or Custom Surprise Spot ✨.

3. **📅 Page 3: Date & Time Picker**
   - Touch-friendly calendar date picker with quick chips (*Tomorrow, This Weekend, Next Week*).
   - Time of day selection (*Morning Sunshine, Sunny Afternoon, Golden Hour Sunset, Starlight Night*) or exact time input.

4. **🍕 Page 4: Delicious Food & Sweet Treats**
   - Multi-select cravings: Creamy Pasta & Pizza, Dim Sums & Sushi, Street Food & Chaat, Burgers & Fries, Strawberry Chocolate Fondue, Boba Tea & Macarons, plus custom favorites.

5. **💌 Page 5: "What Do You Like About Me?"**
   - Heartfelt stationery love letter space where Shreya can write what she likes about you.
   - Interactive quick chips to tap (*Your warm smile 😊, How you care for me 🫂, Your funny jokes 😂, Your warm hugs 🤗, Everything about you ❤️*).

6. **✨ Page 6: Excitement Meter & Pinky Promise**
   - Excitement slider from **100% to 1,000,000%** with funny dynamic reactions.
   - Dress code selection (*Matching pastels, cozy hoodies, classy attire*).
   - Sealed with a sacred Love Pinky Promise 🤞.

7. **🎉 Page 7: Grand Celebration & Date Pass**
   - Cannon of floating hearts and watercolor kiss confetti.
   - Beautiful official **Date Boarding Pass** displaying both your names, chosen venue, date, time, and food.
   - **1-Click WhatsApp Share Button**: Automatically formats all her answers with emojis and lets her send it straight to your WhatsApp chat!

8. **🔒 Secret Admin Dashboard (`/admin`)**
   - Protected by a secret passcode (Default: `143`).
   - Live view of all submitted responses, her answers to "What she likes about you", timestamp, and device info.
   - One-click copy summary for WhatsApp or export to JSON.

9. **🌸 Aesthetics & Audio**
   - Pink and white pastel color palette with soft glassmorphism cards.
   - Floating watercolor kiss emojis (`💋`) and ambient glitter sparkles.
   - Built-in soft romantic music box melody player with audio toggle.

---

## 🚀 Free Vercel Deployment Guide (Under 3 Minutes)

This project is 100% free to deploy on Vercel:

### Step 1: Push Code to GitHub
1. Create a new repository on your [GitHub](https://github.com) account (e.g., `shreya-proposal`).
2. Run these commands in this directory:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/shreya-proposal.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Vercel (Free)
1. Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
2. Click **"Add New..."** -> **"Project"**.
3. Select your `shreya-proposal` repository and click **"Import"**.
4. (Optional) In **Environment Variables**, add:
   - `ADMIN_PIN`: `143` (or your own private PIN)
   - `SUPABASE_URL` and `SUPABASE_KEY` (if you want Supabase cloud DB - see below)
5. Click **"Deploy"**!
6. In ~60 seconds, Vercel will give you a live free URL (e.g. `https://shreya-proposal.vercel.app`) to send to Shreya!

---

## 🗄️ Free Database Setup (Supabase)

The app already includes an in-memory & file storage engine. For permanent cloud storage on Vercel:

1. Sign up for free at [supabase.com](https://supabase.com).
2. Click **"New Project"** (name it `shreya-proposal`).
3. Click **"SQL Editor"** in the left menu, paste the contents of `supabase_setup.sql`, and click **Run**.
4. Go to **Project Settings** -> **API**, copy:
   - `Project URL`
   - `anon / public key`
5. In your Vercel project dashboard under **Settings** -> **Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your anon key
6. Redeploy or hit save! Every response from Shreya is now securely stored in your Postgres database!

---

## 💻 Local Development

```bash
# Run development server
npm run dev

# Open in browser:
# http://localhost:3000
# http://localhost:3000/admin (Passcode: 143)
```
