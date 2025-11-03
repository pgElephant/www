#!/bin/bash

# Convert SVG OG images to JPG format for better social media compatibility
# Requires ImageMagick (brew install imagemagick)

set -e

echo "🎨 Converting SVG OG images to JPG (1200x630)..."
echo ""

cd public/blog

# Convert each blog's OG image
for blog in pgraft pg-stat-insights pgbalancer; do
  if [ -f "$blog/og-image.svg" ]; then
    echo "Converting $blog/og-image.svg..."
    magick "$blog/og-image.svg" \
            -background "#070d1a" \
            -resize 1200x630! \
            -quality 95 \
            "$blog/og-image.jpg"
    
    size=$(ls -lh "$blog/og-image.jpg" | awk '{print $5}')
    echo "✅ Created $blog/og-image.jpg ($size)"
    echo ""
  else
    echo "⚠️  $blog/og-image.svg not found"
    echo ""
  fi
done

echo "✨ Conversion complete!"
echo ""
echo "📊 Generated files:"
ls -lh */og-image.jpg 2>/dev/null || echo "No JPG files found"
