#!/usr/bin/env node

/**
 * Convert SVG OG images to JPG using canvas
 * This creates placeholder JPG files that can be replaced with proper conversions
 */

const fs = require('fs');
const path = require('path');

console.log('📸 Creating JPG placeholders from existing main OG images...\n');

// Copy existing main site OG images as placeholders
const blogs = ['pgraft', 'pg-stat-insights', 'pgbalancer'];

blogs.forEach(blog => {
  const svgPath = path.join(__dirname, '..', 'public', 'blog', blog, 'og-image.svg');
  const jpgPath = path.join(__dirname, '..', 'public', 'blog', blog, 'og-image.jpg');
  
  if (fs.existsSync(svgPath)) {
    // For now, copy from main site OG image as placeholder
    const mainOgJpg = path.join(__dirname, '..', 'public', 'og-image.jpg');
    
    if (fs.existsSync(mainOgJpg)) {
      fs.copyFileSync(mainOgJpg, jpgPath);
      console.log(`✅ Created placeholder: ${blog}/og-image.jpg`);
    } else {
      console.log(`⚠️  Main og-image.jpg not found, skipping ${blog}`);
    }
  } else {
    console.log(`❌ SVG not found: ${blog}/og-image.svg`);
  }
});

console.log('\n📝 Next steps:');
console.log('1. Open each SVG in browser at 1200x630');
console.log('2. Take screenshot or use this online tool:');
console.log('   https://cloudconvert.com/svg-to-jpg');
console.log('3. Replace the placeholder JPG files with proper conversions');
console.log('4. Or install ImageMagick and run: brew install imagemagick && npm run convert-og-images');
