# How to View Blog Views in Google Analytics

## Quick Steps to See Blog Views

### 1. Verify Analytics is Working (Real-Time)

1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your property: **blogs** (Stream ID: 13066740553)
3. Click **Reports** → **Realtime**
4. Visit your blog: https://www.pgelephant.com/blog
5. You should see yourself appear within 10-30 seconds

If you don't see yourself:
- Check browser console for errors (F12 → Console)
- Verify the Google tag is loading (F12 → Network → filter "gtag")
- Make sure ad blockers are disabled

### 2. View Blog Page Views (Historical Data)

**Option A: Pages and Screens Report**
1. Go to **Reports** → **Engagement** → **Pages and screens**
2. In the search/filter box, type: `/blog`
3. This shows all blog pages with view counts
4. Click any page to see detailed metrics

**Option B: Events Report (Blog-Specific)**
1. Go to **Reports** → **Engagement** → **Events**
2. Look for `blog_post_view` event
3. Click on it to see which blog posts were viewed
4. You'll see:
   - Event count (total views)
   - Blog post titles
   - Blog post slugs

### 3. Create a Custom Report for Blog Views

1. Go to **Explore** (left sidebar)
2. Click **Blank** report
3. Add dimensions:
   - **Page path** (to see URLs)
   - **Page title** (to see blog post titles)
4. Add metrics:
   - **Views** (or **Event count** if using blog_post_view)
5. Add filter:
   - **Page path** contains `/blog`
6. Save the report as "Blog Views"

### 4. View Individual Blog Post Performance

1. Go to **Reports** → **Engagement** → **Pages and screens**
2. Filter by `/blog/`
3. Click on a specific blog post URL
4. You'll see:
   - Total views
   - Average time on page
   - Bounce rate
   - User demographics

### 5. Set Up Blog Views Dashboard

1. Go to **Reports** → **Engagement** → **Pages and screens**
2. Click the **Customize report** icon (pencil)
3. Add filters:
   - **Page path** contains `/blog`
4. Add secondary dimension: **Page title**
5. Save as a saved report

## Troubleshooting: No Data Showing

### Check 1: Verify Tag Installation
1. Visit your site: https://www.pgelephant.com
2. Open browser DevTools (F12)
3. Go to **Console** tab
4. Type: `window.dataLayer`
5. You should see an array with analytics data

### Check 2: Verify Environment Variable
1. Check if `.env.local` exists in project root
2. Should contain: `NEXT_PUBLIC_GA_ID=G-ED3JM2F0VS`
3. For production, verify it's set in your hosting platform

### Check 3: Wait Time
- Google Analytics can take 24-48 hours to show historical data
- Use **Realtime** reports to verify immediately
- Real-time shows data within seconds

### Check 4: Ad Blockers
- Disable ad blockers when testing
- Some users have ad blockers that prevent tracking
- This is normal and expected

## Understanding the Data

### What You'll See

**Page Views:**
- Total number of times blog pages were viewed
- Includes repeat visits from same user

**Unique Page Views:**
- Number of unique sessions that viewed the page
- One user visiting 5 times = 1 unique view

**Average Time on Page:**
- How long users spend reading
- Higher = more engagement

**Bounce Rate:**
- Percentage of single-page sessions
- Lower = users reading more content

## Quick Reference: GA4 Navigation

- **Realtime**: See current visitors (instant)
- **Reports → Engagement → Pages and screens**: All page views
- **Reports → Engagement → Events**: Custom events like `blog_post_view`
- **Explore**: Create custom reports and analyses
- **Admin → Data Streams**: Verify your stream is active

## Next Steps

1. **Set up email reports**: Get weekly blog view summaries
2. **Create goals**: Track when users read 3+ blog posts
3. **Set up audiences**: Segment blog readers for remarketing
4. **Link Search Console**: See which blog posts rank in Google

## Common Questions

**Q: Why do I see "No data received in past 48 hours"?**
A: This means no visitors in the last 48 hours. Visit your site to generate data, or wait for real visitors.

**Q: How do I see which blog posts are most popular?**
A: Reports → Engagement → Pages and screens → Filter `/blog/` → Sort by Views

**Q: Can I see individual user journeys?**
A: Yes, in Explore → User explorer (requires user ID tracking)

**Q: How do I track blog post shares?**
A: The `blog_engagement` event tracks shares. Check Reports → Engagement → Events → `blog_engagement`

