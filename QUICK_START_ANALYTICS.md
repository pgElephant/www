# Quick Start: Enable Google Analytics

Your Google Analytics is already integrated! Just follow these steps:

## Step 1: Create Environment File

Create a file named `.env.local` in the root directory (`/Users/ibrarahmed/pgelephant/pge/www/`) with this content:

```bash
NEXT_PUBLIC_GA_ID=G-ED3JM2F0VS
```

## Step 2: Restart Development Server

If your dev server is running, stop it and restart:

```bash
npm run dev
```

## Step 3: Verify It's Working

1. Open your browser's Developer Tools (F12)
2. Go to the Network tab
3. Filter by "gtag" or "google-analytics"
4. Visit any page on your site
5. You should see requests to `googletagmanager.com`

Or check the Console tab - you should see no errors related to analytics.

## Step 4: Check Real-Time Data

1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your property
3. Go to **Reports** → **Realtime**
4. Visit your site - you should see yourself as a visitor within seconds!

## For Production Deployment

When deploying to Vercel, Netlify, or another platform:

1. Go to your hosting platform's environment variables settings
2. Add: `NEXT_PUBLIC_GA_ID` = `G-ED3JM2F0VS`
3. Redeploy your site

## What Gets Tracked

✅ All page views automatically  
✅ Blog post views with custom events  
✅ Core Web Vitals (performance metrics)  
✅ User engagement events  

## Viewing Blog Visitors

After setup, you can view blog visitor data:

1. **Real-time visitors**: Reports → Realtime
2. **Blog page views**: Reports → Engagement → Pages and screens (filter by `/blog/`)
3. **Blog post performance**: Reports → Engagement → Events → `blog_post_view`
4. **User demographics**: Reports → User → Demographics

That's it! Your analytics are now tracking visitors. 🎉

