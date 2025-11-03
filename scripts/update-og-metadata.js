#!/usr/bin/env node

/**
 * Update blog metadata to use JPG OG images instead of SVG
 * Run this after converting SVG files to JPG
 */

const fs = require('fs');
const path = require('path');

const blogs = [
  {
    file: 'app/blog/pgraft/page.tsx',
    jpgExists: fs.existsSync('public/blog/pgraft/og-image.jpg'),
  },
  {
    file: 'app/blog/pg-stat-insights/page.tsx',
    jpgExists: fs.existsSync('public/blog/pg-stat-insights/og-image.jpg'),
  },
];

let updatedCount = 0;

blogs.forEach(blog => {
  if (!blog.jpgExists) {
    console.log(`⏭️  Skipping ${blog.file} - JPG not found`);
    return;
  }

  const filePath = path.join(__dirname, '..', blog.file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace SVG with JPG in OG images (increment version to v7)
  const updated = content
    .replace(/og-image\.svg\?v=6/g, 'og-image.jpg?v=7')
    .replace(/og-image\.svg"/g, 'og-image.jpg"');
  
  if (updated !== content) {
    fs.writeFileSync(filePath, updated);
    console.log(`✅ Updated ${blog.file}`);
    updatedCount++;
  } else {
    console.log(`ℹ️  No changes needed for ${blog.file}`);
  }
});

console.log(`\n📊 Summary: Updated ${updatedCount} file(s)`);

if (updatedCount > 0) {
  console.log('\n✨ Next steps:');
  console.log('1. Build and test: npm run build');
  console.log('2. Commit changes: git add -A && git commit -m "fix: use JPG format for OG images"');
  console.log('3. Push to deploy: git push origin main');
  console.log('4. Clear social media cache:');
  console.log('   - LinkedIn: https://www.linkedin.com/post-inspector/');
  console.log('   - Facebook: https://developers.facebook.com/tools/debug/');
  console.log('   - Twitter: https://cards-dev.twitter.com/validator');
}
