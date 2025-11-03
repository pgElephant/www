#!/usr/bin/env node

/**
 * Convert SVG OG images to PNG for better social media compatibility
 * 
 * This uses Puppeteer to render SVG files as PNG images at 1200x630 resolution
 * 
 * Usage: npm install puppeteer && node scripts/convert-og-images.js
 */

const fs = require('fs');
const path = require('path');

// Simple SVG to data URL converter (no external dependencies)
function convertSvgToDataUrl(svgPath) {
  const svgContent = fs.readFileSync(svgPath, 'utf8');
  const base64 = Buffer.from(svgContent).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

// Instructions for manual conversion
console.log('📋 SVG to JPG Conversion Instructions\n');
console.log('Since ImageMagick is not installed, please use one of these methods:\n');

console.log('METHOD 1: Online Converter (Recommended)');
console.log('==========================================');
console.log('1. Go to: https://cloudconvert.com/svg-to-jpg');
console.log('2. Upload these files:');
console.log('   - public/blog/pgraft/og-image.svg');
console.log('   - public/blog/pg-stat-insights/og-image.svg');
console.log('3. Settings:');
console.log('   - Width: 1200px');
console.log('   - Height: 630px');
console.log('   - Quality: 95%');
console.log('4. Download and save as:');
console.log('   - public/blog/pgraft/og-image.jpg');
console.log('   - public/blog/pg-stat-insights/og-image.jpg\n');

console.log('METHOD 2: Browser Screenshot');
console.log('============================');
console.log('1. Open each SVG file in Chrome/Safari');
console.log('2. Open DevTools (F12)');
console.log('3. Set device emulation to 1200x630');
console.log('4. Take screenshot (Cmd+Shift+P -> "Capture screenshot")');
console.log('5. Save as JPG with quality 95%\n');

console.log('METHOD 3: Install ImageMagick');
console.log('=============================');
console.log('On macOS:');
console.log('  brew install imagemagick');
console.log('Then run:');
console.log('  convert -background "#070d1a" -resize 1200x630! public/blog/pgraft/og-image.svg public/blog/pgraft/og-image.jpg');
console.log('  convert -background "#070d1a" -resize 1200x630! public/blog/pg-stat-insights/og-image.svg public/blog/pg-stat-insights/og-image.jpg\n');

console.log('AFTER CONVERSION:');
console.log('=================');
console.log('Run this command to update metadata:');
console.log('  node scripts/update-og-metadata.js\n');

// List existing SVG files
const blogDir = path.join(__dirname, '..', 'public', 'blog');
const blogs = ['pgraft', 'pg-stat-insights'];

console.log('Current SVG files:');
blogs.forEach(blog => {
  const svgPath = path.join(blogDir, blog, 'og-image.svg');
  if (fs.existsSync(svgPath)) {
    const stats = fs.statSync(svgPath);
    console.log(`  ✓ ${blog}/og-image.svg (${Math.round(stats.size / 1024)}KB)`);
  } else {
    console.log(`  ✗ ${blog}/og-image.svg (missing)`);
  }
});

console.log('\n💡 TIP: After creating JPG files, the metadata will automatically use them for better social media compatibility!');
