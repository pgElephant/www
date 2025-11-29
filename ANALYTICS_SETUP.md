# Analytics Setup Guide

This guide explains how to set up visitor tracking for your blog using Google Analytics 4.

## Quick Start

1. **Get your Google Analytics 4 Measurement ID**
   - Go to [Google Analytics](https://analytics.google.com/)
   - Create a new property or use an existing one
   - Navigate to Admin → Data Streams → Web
   - Copy your Measurement ID (format: `G-XXXXXXXXXX`)

2. **Set the environment variable**
   - Create a `.env.local` file in the root directory (if it doesn't exist)
   - Add your Google Analytics ID:
     ```
     NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
     ```
   - Replace `G-XXXXXXXXXX` with your actual Measurement ID

3. **Deploy or restart your development server**
   - The analytics will automatically start tracking once the environment variable is set
   - For production, make sure to set the environment variable in your hosting platform (Vercel, Netlify, etc.)

## What Gets Tracked

### Automatic Tracking
- **Page views** - Every page navigation is automatically tracked
- **Blog post views** - Special tracking for blog posts with slug and title
- **Core Web Vitals** - Performance metrics (LCP, CLS, FID, FCP, TTFB)

### Blog-Specific Events
- `blog_post_view` - When someone views a blog post
- `blog_engagement` - User engagement metrics (read time, scroll depth, shares, comments)

## Viewing Your Analytics

1. Go to [Google Analytics Dashboard](https://analytics.google.com/)
2. Navigate to **Reports** → **Engagement** → **Pages and screens** to see page views
3. Navigate to **Reports** → **Engagement** → **Events** to see custom events like blog post views
4. Navigate to **Reports** → **Engagement** → **Web Vitals** to see performance metrics

## Blog Visitor Metrics

To see blog-specific visitor data:

1. **Blog Page Views**: 
   - Go to Reports → Engagement → Pages and screens
   - Filter by URL path containing `/blog/`

2. **Blog Post Performance**:
   - Go to Reports → Engagement → Events
   - Look for `blog_post_view` events
   - You can see which blog posts are most popular

3. **User Engagement**:
   - Go to Reports → Engagement → Events
   - Look for `blog_engagement` events to see user interaction patterns

## Adding Tracking to New Blog Posts

To add tracking to a new blog post, import and add the `BlogPageTracker` component:

```tsx
import BlogPageTracker from '@/components/BlogPageTracker'

export default function BlogPost() {
  return (
    <div>
      <BlogPageTracker 
        slug="your-blog-post-slug"
        title="Your Blog Post Title"
      />
      {/* Rest of your blog post content */}
    </div>
  )
}
```

## Custom Event Tracking

You can track custom events using the analytics utility:

```tsx
import { trackEvent, trackBlogEngagement } from '@/lib/analytics'

// Track a custom event
trackEvent('button_click', {
  category: 'User Interaction',
  label: 'Download Button',
  value: 1
})

// Track blog engagement
trackBlogEngagement('blog-post-slug', 'share', 1)
```

## Privacy Considerations

- Google Analytics respects user privacy settings
- Consider adding a cookie consent banner for GDPR compliance
- You can configure data retention settings in Google Analytics Admin

## Troubleshooting

### Analytics not working?
1. Check that `NEXT_PUBLIC_GA_ID` is set correctly
2. Verify the ID format is `G-XXXXXXXXXX`
3. Check browser console for errors
4. Use Google Analytics DebugView to verify events are being sent

### Not seeing data?
- Google Analytics can take 24-48 hours to show data
- Use Real-Time reports to verify tracking is working immediately
- Check that ad blockers aren't blocking the analytics script

## Alternative: Vercel Analytics

If you're deploying on Vercel, you can also use Vercel Analytics (already installed):

1. Import in your layout:
```tsx
import { Analytics } from '@vercel/analytics/react'
```

2. Add to your layout:
```tsx
<Analytics />
```

Vercel Analytics provides:
- Real-time visitor tracking
- Page view analytics
- Web Vitals monitoring
- No additional setup required (works automatically on Vercel)

