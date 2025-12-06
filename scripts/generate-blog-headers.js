#!/usr/bin/env node

/**
 * Blog Header SVG Generator
 * Generates consistent blog header images from templates
 * Usage: node scripts/generate-blog-headers.js
 */

const fs = require('fs');
const path = require('path');

// Common SVG template with placeholders
const svgTemplate = `<svg width="1200" height="400" viewBox="0 0 1200 400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Website theme gradient -->
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#070d1a;stop-opacity:1" />
      <stop offset="25%" style="stop-color:#111827;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#1f2937;stop-opacity:1" />
      <stop offset="75%" style="stop-color:#374151;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#4b5563;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="overlayGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#4f46e5;stop-opacity:0.15" />
      <stop offset="50%" style="stop-color:#06b6d4;stop-opacity:0.15" />
      <stop offset="100%" style="stop-color:#10b981;stop-opacity:0.15" />
    </linearGradient>
    <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#4f46e5;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#06b6d4;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#10b981;stop-opacity:1" />
    </linearGradient>
{{EXTRA_GRADIENTS}}
  </defs>
  
  <!-- Background -->
  <rect width="1200" height="400" fill="url(#bgGradient)"/>
  <rect width="1200" height="400" fill="url(#overlayGradient)"/>
  
  <!-- Subtle pattern overlay -->
  <g opacity="0.1">
    <circle cx="100" cy="100" r="3" fill="#fff"/>
    <circle cx="150" cy="150" r="2" fill="#fff"/>
    <circle cx="200" cy="80" r="2.5" fill="#fff"/>
    <circle cx="1000" cy="300" r="3" fill="#fff"/>
    <circle cx="1100" cy="200" r="2" fill="#fff"/>
    <circle cx="900" cy="250" r="2.5" fill="#fff"/>
  </g>
  
{{ICON_SVG}}
  
  <!-- Title -->
  <text x="350" y="150" font-family="Arial, sans-serif" font-size="50" font-weight="bold" 
        fill="url(#textGradient)">
    {{TITLE}}
  </text>
  
  <!-- Subtitle -->
  <text x="350" y="200" font-family="Arial, sans-serif" font-size="20" 
        fill="#e0e7ff" opacity="0.9">
    {{SUBTITLE}}
  </text>
  
{{BADGES}}
  
  <!-- Decorative elements -->
  <circle cx="950" cy="150" r="40" fill="#4f46e5" opacity="0.15"/>
  <circle cx="1050" cy="220" r="30" fill="#06b6d4" opacity="0.15"/>
  <circle cx="980" cy="280" r="25" fill="#10b981" opacity="0.15"/>
  <circle cx="1100" cy="150" r="20" fill="#fbbf24" opacity="0.15"/>
</svg>`;

// Icon templates
const icons = {
  raft: `  <!-- Raft nodes illustration -->
  <g transform="translate(80, 120)">
    <defs>
      <linearGradient id="node1" x1="0" y1="0" x2="1" y2="1">
        <stop stop-color="#06b6d4"/>
        <stop offset="1" stop-color="#4f46e5"/>
      </linearGradient>
      <linearGradient id="node2" x1="0" y1="0" x2="1" y2="1">
        <stop stop-color="#fbbf24"/>
        <stop offset="1" stop-color="#f59e0b"/>
      </linearGradient>
      <linearGradient id="node3" x1="0" y1="0" x2="1" y2="1">
        <stop stop-color="#10b981"/>
        <stop offset="1" stop-color="#06b6d4"/>
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="70" height="70" rx="12" fill="url(#node1)" opacity="0.9"/>
    <circle cx="35" cy="35" r="12" fill="#fff" opacity="0.9"/>
    <text x="35" y="95" font-family="Arial, sans-serif" font-size="14" font-weight="600" fill="#06b6d4" text-anchor="middle">Follower</text>
    <rect x="0" y="120" width="70" height="70" rx="12" fill="url(#node2)" opacity="0.9"/>
    <circle cx="35" cy="155" r="12" fill="#fff" opacity="0.9"/>
    <text x="35" y="215" font-family="Arial, sans-serif" font-size="14" font-weight="700" fill="#fbbf24" text-anchor="middle">LEADER</text>
    <rect x="120" y="60" width="70" height="70" rx="12" fill="url(#node3)" opacity="0.9"/>
    <circle cx="155" cy="95" r="12" fill="#fff" opacity="0.9"/>
    <text x="155" y="155" font-family="Arial, sans-serif" font-size="14" font-weight="600" fill="#10b981" text-anchor="middle">Follower</text>
    <line x1="70" y1="35" x2="120" y2="95" stroke="#06b6d4" stroke-width="3" opacity="0.5"/>
    <line x1="35" y1="70" x2="35" y2="120" stroke="#fbbf24" stroke-width="3" opacity="0.6"/>
    <line x1="70" y1="155" x2="120" y2="95" stroke="#10b981" stroke-width="3" opacity="0.5"/>
  </g>`,

  database: `  <!-- Performance monitoring illustration -->
  <g transform="translate(80, 100)">
    <g opacity="0.9">
      <ellipse cx="90" cy="50" rx="70" ry="20" fill="none" stroke="#4f46e5" stroke-width="3"/>
      <ellipse cx="90" cy="80" rx="70" ry="20" fill="none" stroke="#06b6d4" stroke-width="3"/>
      <ellipse cx="90" cy="110" rx="70" ry="20" fill="none" stroke="#10b981" stroke-width="3"/>
      <line x1="20" y1="50" x2="20" y2="110" stroke="#4f46e5" stroke-width="2" opacity="0.5"/>
      <line x1="160" y1="50" x2="160" y2="110" stroke="#10b981" stroke-width="2" opacity="0.5"/>
    </g>
    <g transform="translate(0, 140)">
      <rect x="20" y="40" width="18" height="50" fill="#4f46e5" rx="2" opacity="0.9"/>
      <rect x="48" y="25" width="18" height="65" fill="#06b6d4" rx="2" opacity="0.9"/>
      <rect x="76" y="32" width="18" height="58" fill="#10b981" rx="2" opacity="0.9"/>
      <rect x="104" y="15" width="18" height="75" fill="#fbbf24" rx="2" opacity="0.9"/>
      <rect x="132" y="28" width="18" height="62" fill="#4f46e5" rx="2" opacity="0.9"/>
    </g>
  </g>`,

  balance: `  <!-- Load balancer illustration -->
  <g transform="translate(80, 100)">
    <g opacity="0.9">
      <circle cx="90" cy="80" r="50" fill="none" stroke="#4f46e5" stroke-width="3"/>
      <line x1="40" y1="80" x2="140" y2="80" stroke="#06b6d4" stroke-width="4"/>
      <circle cx="40" cy="80" r="8" fill="#06b6d4"/>
      <circle cx="140" cy="80" r="8" fill="#10b981"/>
      <line x1="90" y1="40" x2="90" y2="120" stroke="#fbbf24" stroke-width="3" opacity="0.7"/>
      <path d="M 50,120 L 90,60 L 130,120" fill="none" stroke="#10b981" stroke-width="3"/>
      <path d="M 50,40 L 90,100 L 130,40" fill="none" stroke="#4f46e5" stroke-width="3"/>
    </g>
  </g>`,

  shield: `  <!-- Security shield illustration -->
  <g transform="translate(80, 100)">
    <path d="M 90,20 L 150,40 L 150,100 Q 150,150 90,180 Q 30,150 30,100 L 30,40 Z" 
          fill="none" stroke="#4f46e5" stroke-width="3" opacity="0.9"/>
    <path d="M 90,40 L 130,55 L 130,95 Q 130,125 90,145 Q 50,125 50,95 L 50,55 Z" 
          fill="#06b6d4" opacity="0.2"/>
    <path d="M 70,80 L 85,95 L 110,60" fill="none" stroke="#10b981" stroke-width="4" 
          stroke-linecap="round" stroke-linejoin="round"/>
  </g>`,

  neurondb: `  <!-- Neural network / AI vector database illustration -->
  <g transform="translate(80, 100)">
    <g opacity="0.9">
      <!-- Neural network nodes -->
      <circle cx="40" cy="40" r="12" fill="#4f46e5" opacity="0.8"/>
      <circle cx="90" cy="30" r="12" fill="#06b6d4" opacity="0.8"/>
      <circle cx="140" cy="40" r="12" fill="#10b981" opacity="0.8"/>
      <circle cx="65" cy="90" r="12" fill="#fbbf24" opacity="0.8"/>
      <circle cx="115" cy="90" r="12" fill="#4f46e5" opacity="0.8"/>
      <!-- Connections -->
      <line x1="40" y1="40" x2="90" y2="30" stroke="#06b6d4" stroke-width="2" opacity="0.5"/>
      <line x1="90" y1="30" x2="140" y2="40" stroke="#06b6d4" stroke-width="2" opacity="0.5"/>
      <line x1="40" y1="40" x2="65" y2="90" stroke="#06b6d4" stroke-width="2" opacity="0.5"/>
      <line x1="90" y1="30" x2="65" y2="90" stroke="#06b6d4" stroke-width="2" opacity="0.5"/>
      <line x1="90" y1="30" x2="115" y2="90" stroke="#06b6d4" stroke-width="2" opacity="0.5"/>
      <line x1="140" y1="40" x2="115" y2="90" stroke="#06b6d4" stroke-width="2" opacity="0.5"/>
      <line x1="65" y1="90" x2="115" y2="90" stroke="#fbbf24" stroke-width="2" opacity="0.6"/>
      <!-- Vector arrows -->
      <path d="M 20,120 L 50,120 L 45,115 M 50,120 L 45,125" stroke="#10b981" stroke-width="2" fill="none"/>
      <path d="M 70,120 L 100,120 L 95,115 M 100,120 L 95,125" stroke="#10b981" stroke-width="2" fill="none"/>
      <path d="M 120,120 L 150,120 L 145,115 M 150,120 L 145,125" stroke="#10b981" stroke-width="2" fill="none"/>
    </g>
  </g>`,
};

// Badge generator
function generateBadges(badges) {
  const colorMap = {
    indigo: '#4f46e5',
    cyan: '#06b6d4',
    emerald: '#10b981',
    yellow: '#fbbf24',
  };

  return badges.map((badge, index) => {
    const row = Math.floor(index / 2);
    const col = index % 2;
    const x = 350 + (col * 250);
    const y = 230 + (row * 50);
    const color = colorMap[badge.color] || colorMap.indigo;
    const width = badge.width || 220;

    return `  <g transform="translate(${x}, ${y})">
    <rect x="0" y="0" width="${width}" height="36" rx="18" fill="${color}" opacity="0.2"/>
    <rect x="0" y="0" width="${width}" height="36" rx="18" fill="none" stroke="${color}" stroke-width="2"/>
    <text x="${width / 2}" y="24" font-family="Arial, sans-serif" font-size="11" font-weight="600" 
          fill="#fff" text-anchor="middle">${badge.text}</text>
  </g>`;
  }).join('\n');
}

// Blog configurations
const blogs = {
  pgraft: {
    title: 'pgraft',
    subtitle: 'Raft Consensus Protocol Embedded in PostgreSQL',
    icon: 'raft',
    badges: [
      { text: '✓ Auto Leader Election', color: 'indigo', width: 220 },
      { text: '✓ Zero Split-Brain', color: 'cyan', width: 190 },
      { text: '✓ Crash-Safe Replication', color: 'emerald', width: 220 },
      { text: '✓ Production Ready', color: 'yellow', width: 190 },
    ],
  },
  'pg-stat-insights': {
    title: 'pg_stat_insights',
    subtitle: 'PostgreSQL Performance Monitoring',
    icon: 'database',
    badges: [
      { text: '52 Metrics', color: 'indigo', width: 130 },
      { text: '11 Views', color: 'cyan', width: 130 },
      { text: 'Deep Insights', color: 'emerald', width: 180 },
      { text: '✓ Drop-in Replacement', color: 'yellow', width: 230 },
    ],
  },
  'pgbalancer': {
    title: 'pgbalancer',
    subtitle: 'AI-Powered PostgreSQL Connection Pooler',
    icon: 'balance',
    badges: [
      { text: 'AI Load Balancing', color: 'indigo', width: 180 },
      { text: 'REST API', color: 'cyan', width: 130 },
      { text: 'MQTT Clustering', color: 'emerald', width: 180 },
      { text: '✓ Production Ready', color: 'yellow', width: 190 },
    ],
  },
  'neurondb': {
    title: 'NeuronDB',
    subtitle: 'PostgreSQL AI Vector Database Extension',
    icon: 'neurondb',
    badges: [
      { text: 'Vector Search', color: 'indigo', width: 140 },
      { text: 'HNSW Indexing', color: 'cyan', width: 150 },
      { text: 'GPU Acceleration', color: 'emerald', width: 170 },
      { text: 'RAG Ready', color: 'yellow', width: 130 },
    ],
  },
};

// Generate SVGs
Object.entries(blogs).forEach(([slug, config]) => {
  let svg = svgTemplate;

  // Replace placeholders
  svg = svg.replace('{{TITLE}}', config.title);
  svg = svg.replace('{{SUBTITLE}}', config.subtitle);
  svg = svg.replace('{{ICON_SVG}}', icons[config.icon] || '');
  svg = svg.replace('{{BADGES}}', generateBadges(config.badges));
  svg = svg.replace('{{EXTRA_GRADIENTS}}', '');

  // Write header.svg
  const headerPath = path.join(__dirname, '..', 'public', 'blog', slug, 'header.svg');
  fs.mkdirSync(path.dirname(headerPath), { recursive: true });
  fs.writeFileSync(headerPath, svg);
  console.log(`✅ Generated: ${headerPath}`);

  // Create OG image (1200x630) - same design, different dimensions
  const ogSvg = svg
    .replace('height="400"', 'height="630"')
    .replace('viewBox="0 0 1200 400"', 'viewBox="0 0 1200 630"');

  const ogPath = path.join(__dirname, '..', 'public', 'blog', slug, 'og-image.svg');
  fs.writeFileSync(ogPath, ogSvg);
  console.log(`✅ Generated: ${ogPath}`);
});

console.log('\n✨ All blog headers generated successfully!');
