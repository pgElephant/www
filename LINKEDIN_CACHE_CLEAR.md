# How to Clear LinkedIn Cache for Blog Posts

## The Problem
LinkedIn caches Open Graph (OG) images for **7+ days**. Even after updating your images, LinkedIn shows the old cached version.

## Solutions (Try in Order)

### Method 1: LinkedIn Post Inspector (Official Tool)
**This is the BEST method** - forces LinkedIn to re-scrape your page.

1. **Go to LinkedIn Post Inspector**:
   - URL: https://www.linkedin.com/post-inspector/
   - Or search Google for "LinkedIn Post Inspector"

2. **Inspect Each Blog URL**:
   ```
   https://www.pgelephant.com/blog/pgraft
   https://www.pgelephant.com/blog/pg-stat-insights
   https://www.pgelephant.com/blog/pgbalancer
   ```

3. **Click "Inspect"** - LinkedIn will:
   - Re-fetch the page
   - Re-read Open Graph metadata
   - Cache the NEW image
   - Show you a preview

4. **Verify** - Check the preview shows correct image

5. **Share Again** - LinkedIn will now use the fresh cache

---

### Method 2: Add URL Parameters (Workaround)
If Post Inspector doesn't work, trick LinkedIn into thinking it's a new URL:

**Share with `?v=1` parameter:**
```
https://www.pgelephant.com/blog/pg-stat-insights?v=1
https://www.pgelephant.com/blog/pgraft?v=1
https://www.pgelephant.com/blog/pgbalancer?v=1
```

LinkedIn sees this as a "different" URL and re-scrapes it. The parameter doesn't affect the page - it just bypasses cache.

---

### Method 3: Use Third-Party Cache Checker
These tools can force a re-scrape:

1. **OpenGraph.xyz**:
   - Go to: https://www.opengraph.xyz/
   - Enter URL: `https://www.pgelephant.com/blog/pg-stat-insights`
   - Click "Submit"
   - Shows current cache and can trigger refresh

2. **Debug Meta Tags**:
   - Go to: https://www.debugmetatags.com/
   - Enter URL
   - Click "Debug" to see what LinkedIn sees

---

### Method 4: Wait It Out (Last Resort)
LinkedIn cache expires after **7-14 days**. Not ideal but guaranteed to work eventually.

---

## Why This Happens

1. **Performance**: LinkedIn caches OG images to reduce server load
2. **CDN**: Images cached on LinkedIn's CDN globally
3. **No Manual Clear**: LinkedIn doesn't provide a "clear cache" button for users

## Current Status Check

### Before Converting to JPG:
Your current OG images are **SVG format**, which some platforms don't cache properly:
```
/blog/pgraft/og-image.svg?v=7
/blog/pg-stat-insights/og-image.svg?v=7
/blog/pgbalancer/og-image.svg?v=7
```

### After Converting to JPG:
You'll have **JPG format** which LinkedIn handles better:
```
/blog/pgraft/og-image.jpg?v=7
/blog/pg-stat-insights/og-image.jpg?v=7
/blog/pgbalancer/og-image.jpg?v=7
```

## Step-by-Step Process

### Today (with SVG):
1. Use LinkedIn Post Inspector on current URLs
2. LinkedIn will cache the SVG (may not display)

### After JPG Conversion:
1. Convert SVG to JPG (1200x630)
2. Upload JPG files to server
3. Deploy to production
4. **Increment version to v8** in metadata (forces new cache)
5. Use LinkedIn Post Inspector again
6. LinkedIn caches the JPG version

## Quick Commands

### Check what LinkedIn sees:
```bash
curl -A "LinkedInBot/1.0" https://www.pgelephant.com/blog/pg-stat-insights | grep og:image
```

### After deploying JPG, increment version:
```bash
# Update all blogs to v8
# This forces LinkedIn to see it as a "new" image
```

## Testing

### Verify OG Image Tag:
```bash
# View source of your blog page
# Look for:
<meta property="og:image" content="/blog/pg-stat-insights/og-image.jpg?v=7" />
```

### Test with Multiple Tools:
1. LinkedIn Post Inspector ⭐ (Primary)
2. Facebook Sharing Debugger
3. Twitter Card Validator
4. OpenGraph.xyz

## Why JPG is Better Than SVG

✅ **JPG (Recommended)**:
- LinkedIn caches reliably
- Facebook displays correctly
- Twitter shows properly
- Universal support
- Faster loading

❌ **SVG (Current)**:
- LinkedIn may not render
- Facebook strips/ignores
- Twitter doesn't display
- Inconsistent caching

## After Following This Guide

✅ LinkedIn will show your custom blog header images  
✅ Each blog post has unique OG image  
✅ Images update when you change them (with new version number)  
✅ Professional appearance when sharing on social media  

## Support Links

- LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/
- Facebook Debug: https://developers.facebook.com/tools/debug/
- Twitter Validator: https://cards-dev.twitter.com/validator
- OG Preview: https://www.opengraph.xyz/
