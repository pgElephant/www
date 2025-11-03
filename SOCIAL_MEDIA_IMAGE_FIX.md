# Social Media Image Display Fix

## Problem
When sharing blog posts on LinkedIn, Facebook, Twitter/X, the generic pgElephant image shows instead of the specific blog header image (pg_stat_insights, pgraft, etc.).

## Root Cause
1. **SVG Format**: Some social platforms don't properly display SVG Open Graph images
2. **Cache**: Social platforms aggressively cache OG images
3. **Format Preference**: JPG/PNG format is more reliable for social sharing

## Solution

### Step 1: Convert SVG to JPG (Required)

We need to convert the SVG OG images to JPG format (1200x630).

**Option A: Use Online Converter**
1. Go to https://cloudconvert.com/svg-to-jpg
2. Upload each file:
   - `public/blog/pgraft/og-image.svg`
   - `public/blog/pg-stat-insights/og-image.svg`
   - `public/blog/pgbalancer/og-image.svg` (when created)
3. Settings:
   - Width: 1200px
   - Height: 630px
   - Quality: 95%
4. Download and save as:
   - `public/blog/pgraft/og-image.jpg`
   - `public/blog/pg-stat-insights/og-image.jpg`
   - `public/blog/pgbalancer/og-image.jpg`

**Option B: Use ImageMagick (if installed)**
```bash
cd public/blog

# pgraft
convert -background none -resize 1200x630! pgraft/og-image.svg pgraft/og-image.jpg

# pg_stat_insights
convert -background none -resize 1200x630! pg-stat-insights/og-image.svg pg-stat-insights/og-image.jpg

# pgbalancer (when created)
convert -background none -resize 1200x630! pgbalancer/og-image.svg pgbalancer/og-image.jpg
```

**Option C: Use Screenshot Tool**
1. Open each SVG in browser at 1200x630
2. Take screenshot or use browser DevTools device emulation
3. Save as JPG at 1200x630

### Step 2: Update Metadata to Use JPG

After creating JPG files, update the blog page metadata:

**File: `app/blog/pg-stat-insights/page.tsx`**
```tsx
export const metadata = {
  // ...
  openGraph: {
    title: 'pg_stat_insights: PostgreSQL Performance Monitoring',
    description: '52 Metrics, 11 Views, Deep Insights - Drop-in Replacement for pg_stat_statements',
    images: ['/blog/pg-stat-insights/og-image.jpg?v=7'],  // Changed from .svg to .jpg
  },
  twitter: {
    card: 'summary_large_image',
    title: 'pg_stat_insights: PostgreSQL Performance Monitoring',
    description: '52 Metrics, 11 Views, Deep Insights - Drop-in Replacement for pg_stat_statements',
    images: ['/blog/pg-stat-insights/og-image.jpg?v=7'],  // Changed from .svg to .jpg
  },
};
```

Do the same for `app/blog/pgraft/page.tsx`.

### Step 3: Clear Social Media Cache

After deploying the JPG images, force social platforms to refresh:

#### LinkedIn
1. Go to https://www.linkedin.com/post-inspector/
2. Enter your URL: `https://www.pgelephant.com/blog/pg-stat-insights`
3. Click **Inspect**
4. LinkedIn will fetch fresh metadata

#### Facebook/Meta
1. Go to https://developers.facebook.com/tools/debug/
2. Enter URL: `https://www.pgelephant.com/blog/pg-stat-insights`
3. Click **Debug**
4. Click **Scrape Again** to refresh cache

#### Twitter/X
1. Go to https://cards-dev.twitter.com/validator
2. Enter URL and validate
3. Or use: https://www.opengraph.xyz/url/https%3A%2F%2Fwww.pgelephant.com%2Fblog%2Fpg-stat-insights

### Step 4: Verify

1. Test with Open Graph debugger: https://www.opengraph.xyz/
2. Enter your blog URL
3. Verify the correct image displays
4. Try sharing on LinkedIn/Facebook to confirm

## Quick Fix Commands

```bash
# After creating JPG files manually or via converter
cd /Users/pgedge/pge/www

# Update metadata to use JPG
# Edit app/blog/pg-stat-insights/page.tsx
# Edit app/blog/pgraft/page.tsx
# Change .svg?v=6 to .jpg?v=7

# Commit and deploy
git add public/blog/*/og-image.jpg app/blog/*/page.tsx
git commit -m "fix: use JPG format for OG images for better social media compatibility"
git push origin main
```

## Why JPG Works Better

1. **Universal Support**: All social platforms support JPG
2. **Better Rendering**: Platforms render JPG more consistently
3. **No SVG Limitations**: Some platforms strip SVG or render incorrectly
4. **Faster Processing**: Social crawlers process JPG faster
5. **Predictable Colors**: JPG color rendering is more consistent

## Current Status

✅ SVG files exist and are correct  
❌ JPG files need to be created  
❌ Metadata needs to be updated to use JPG  
❌ Social media cache needs to be cleared  

## After Fix

✅ Blog URLs will show correct header images on LinkedIn/Facebook/Twitter  
✅ Each blog post will have unique OG image  
✅ Cache-busting with v=7 ensures fresh images  
