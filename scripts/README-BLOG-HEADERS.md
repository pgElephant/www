# Blog Header Image Generator

This script generates consistent blog header images (1200x400) and OG images (1200x630) from a centralized template.

## Features

- ✅ **Consistent Design**: All headers use the same dark gradient background and text styling
- ✅ **Customizable Icons**: Different icons for each blog (raft, database, balance, shield)
- ✅ **Flexible Badges**: Configurable badges with custom text, colors, and widths
- ✅ **Automatic Generation**: Generates both header.svg and og-image.svg from one config

## Usage

### Generate All Headers

```bash
node scripts/generate-blog-headers.js
```

This will regenerate all blog headers based on the configurations in the script.

### Adding a New Blog

1. Open `scripts/generate-blog-headers.js`
2. Add a new entry to the `blogs` object:

```javascript
const blogs = {
  // ... existing blogs
  'my-new-blog': {
    title: 'MyBlog',
    subtitle: 'Short description here',
    icon: 'database', // or 'raft', 'balance', 'shield'
    badges: [
      { text: 'Feature 1', color: 'indigo', width: 150 },
      { text: 'Feature 2', color: 'cyan', width: 140 },
      { text: 'Feature 3', color: 'emerald', width: 160 },
      { text: 'Feature 4', color: 'yellow', width: 180 },
    ],
  },
};
```

3. Run the generator:

```bash
node scripts/generate-blog-headers.js
```

4. The script will create:
   - `public/blog/my-new-blog/header.svg` (1200x400)
   - `public/blog/my-new-blog/og-image.svg` (1200x630)

### Available Icons

- `raft`: Raft consensus nodes (3 connected nodes with leader)
- `database`: Database layers with bar chart metrics
- `balance`: Load balancer visualization
- `shield`: Security shield with checkmark

### Badge Colors

- `indigo`: #4f46e5 (primary purple-blue)
- `cyan`: #06b6d4 (bright blue)
- `emerald`: #10b981 (green)
- `yellow`: #fbbf24 (golden yellow)

### Adding New Icons

To add a new icon type:

1. Add the SVG markup to the `icons` object in the script
2. Use the same transform and positioning (`translate(80, 100)` or similar)
3. Use the theme colors: #4f46e5, #06b6d4, #10b981, #fbbf24

## Design Consistency

All headers maintain these standards:

### Background
- Gradient: `#070d1a → #111827 → #1f2937 → #374151 → #4b5563`
- Overlay: 15% opacity gradient of theme colors

### Typography
- Title: 72px bold, gradient fill
- Subtitle: 28px, #e0e7ff at 90% opacity
- Font: Arial, sans-serif

### Badges
- Height: 36px
- Border radius: 18px (fully rounded)
- Font: 16px, weight 600
- 20% fill opacity, 2px stroke

### Decorative Elements
- Subtle dot pattern (0.1 opacity)
- Corner circles with 15% opacity theme colors

## Cache Busting

When regenerating headers, increment the version in blog pages:

```tsx
// In app/blog/[slug]/page.tsx
![Blog header](/blog/my-blog/header.svg?v=6)

// In metadata
images: ['/blog/my-blog/og-image.svg?v=6']
```

## File Structure

```
public/
  blog/
    pgraft/
      header.svg        # 1200x400 blog header
      og-image.svg      # 1200x630 social media
    pg-stat-insights/
      header.svg
      og-image.svg
```

## Benefits

1. **Single Source of Truth**: All styling defined in one template
2. **Easy Updates**: Change gradient colors once, regenerate all headers
3. **Consistency**: Guaranteed identical backgrounds, text styles, and sizing
4. **Flexibility**: Customize icons and badges per blog
5. **Version Control**: SVG files are text-based and git-friendly

## Example Configuration

```javascript
'pgraft': {
  title: 'pgraft',
  subtitle: 'Raft Consensus Protocol Embedded in PostgreSQL',
  icon: 'raft',
  badges: [
    { text: '✓ Auto Leader Election', color: 'indigo', width: 220 },
    { text: '✓ Zero Split-Brain', color: 'cyan', width: 190 },
    { text: '✓ Crash-Safe Replication', color: 'emerald', width: 220 },
    { text: '✓ Production Ready', color: 'yellow', width: 190 },
  ],
}
```

This generates a professional header with:
- Raft consensus nodes illustration
- Dark gradient background
- Gradient text "pgraft"
- 4 feature badges in a 2x2 grid
- Consistent with all other blog headers
