import React from 'react';

interface Badge {
  text: string;
  color: 'indigo' | 'cyan' | 'emerald' | 'yellow';
}

interface BlogHeaderSVGProps {
  title: string;
  subtitle: string;
  badges: Badge[];
  icon: 'database' | 'raft' | 'monitor' | 'balance' | 'shield';
  width?: number;
  height?: number;
}

export function BlogHeaderSVG({
  title,
  subtitle,
  badges,
  icon,
  width = 1200,
  height = 400,
}: BlogHeaderSVGProps) {
  const badgeColors = {
    indigo: { fill: '#4f46e5', stroke: '#4f46e5' },
    cyan: { fill: '#06b6d4', stroke: '#06b6d4' },
    emerald: { fill: '#10b981', stroke: '#10b981' },
    yellow: { fill: '#fbbf24', stroke: '#fbbf24' },
  };

  const renderIcon = () => {
    switch (icon) {
      case 'database':
        return (
          <g transform="translate(80, 100)">
            <g opacity="0.9">
              <ellipse cx="90" cy="50" rx="70" ry="20" fill="none" stroke="#4f46e5" strokeWidth="3"/>
              <ellipse cx="90" cy="80" rx="70" ry="20" fill="none" stroke="#06b6d4" strokeWidth="3"/>
              <ellipse cx="90" cy="110" rx="70" ry="20" fill="none" stroke="#10b981" strokeWidth="3"/>
              <line x1="20" y1="50" x2="20" y2="110" stroke="#4f46e5" strokeWidth="2" opacity="0.5"/>
              <line x1="160" y1="50" x2="160" y2="110" stroke="#10b981" strokeWidth="2" opacity="0.5"/>
            </g>
            <g transform="translate(0, 140)">
              <rect x="20" y="40" width="18" height="50" fill="#4f46e5" rx="2" opacity="0.9"/>
              <rect x="48" y="25" width="18" height="65" fill="#06b6d4" rx="2" opacity="0.9"/>
              <rect x="76" y="32" width="18" height="58" fill="#10b981" rx="2" opacity="0.9"/>
              <rect x="104" y="15" width="18" height="75" fill="#fbbf24" rx="2" opacity="0.9"/>
              <rect x="132" y="28" width="18" height="62" fill="#4f46e5" rx="2" opacity="0.9"/>
            </g>
          </g>
        );

      case 'raft':
        return (
          <g transform="translate(80, 120)">
            <defs>
              <linearGradient id="node1" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#06b6d4"/>
                <stop offset="1" stopColor="#4f46e5"/>
              </linearGradient>
              <linearGradient id="node2" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#fbbf24"/>
                <stop offset="1" stopColor="#f59e0b"/>
              </linearGradient>
              <linearGradient id="node3" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#10b981"/>
                <stop offset="1" stopColor="#06b6d4"/>
              </linearGradient>
            </defs>
            <rect x="0" y="0" width="70" height="70" rx="12" fill="url(#node1)" opacity="0.9"/>
            <circle cx="35" cy="35" r="12" fill="#fff" opacity="0.9"/>
            <text x="35" y="95" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="600" fill="#06b6d4" textAnchor="middle">Follower</text>
            <rect x="0" y="120" width="70" height="70" rx="12" fill="url(#node2)" opacity="0.9"/>
            <circle cx="35" cy="155" r="12" fill="#fff" opacity="0.9"/>
            <text x="35" y="215" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="700" fill="#fbbf24" textAnchor="middle">LEADER</text>
            <rect x="120" y="60" width="70" height="70" rx="12" fill="url(#node3)" opacity="0.9"/>
            <circle cx="155" cy="95" r="12" fill="#fff" opacity="0.9"/>
            <text x="155" y="155" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="600" fill="#10b981" textAnchor="middle">Follower</text>
            <line x1="70" y1="35" x2="120" y2="95" stroke="#06b6d4" strokeWidth="3" opacity="0.5"/>
            <line x1="35" y1="70" x2="35" y2="120" stroke="#fbbf24" strokeWidth="3" opacity="0.6"/>
            <line x1="70" y1="155" x2="120" y2="95" stroke="#10b981" strokeWidth="3" opacity="0.5"/>
          </g>
        );

      case 'monitor':
        return (
          <g transform="translate(80, 100)">
            <rect x="0" y="0" width="180" height="120" rx="8" fill="none" stroke="#4f46e5" strokeWidth="3" opacity="0.9"/>
            <line x1="0" y1="100" x2="180" y2="100" stroke="#4f46e5" strokeWidth="2" opacity="0.7"/>
            <g transform="translate(20, 20)">
              <path d="M 0,60 L 20,50 L 40,65 L 60,30 L 80,45 L 100,20 L 120,35 L 140,15" 
                    fill="none" stroke="#06b6d4" strokeWidth="3" strokeLinecap="round"/>
              <circle cx="0" cy="60" r="4" fill="#06b6d4"/>
              <circle cx="40" cy="65" r="4" fill="#10b981"/>
              <circle cx="80" cy="45" r="4" fill="#fbbf24"/>
              <circle cx="140" cy="15" r="4" fill="#4f46e5"/>
            </g>
            <rect x="15" y="140" width="150" height="8" rx="4" fill="#374151" opacity="0.5"/>
            <rect x="70" y="148" width="40" height="20" rx="2" fill="#1f2937" opacity="0.8"/>
          </g>
        );

      case 'balance':
        return (
          <g transform="translate(80, 100)">
            <g opacity="0.9">
              <circle cx="90" cy="80" r="50" fill="none" stroke="#4f46e5" strokeWidth="3"/>
              <line x1="40" y1="80" x2="140" y2="80" stroke="#06b6d4" strokeWidth="4"/>
              <circle cx="40" cy="80" r="8" fill="#06b6d4"/>
              <circle cx="140" cy="80" r="8" fill="#10b981"/>
              <line x1="90" y1="40" x2="90" y2="120" stroke="#fbbf24" strokeWidth="3" opacity="0.7"/>
              <path d="M 50,120 L 90,60 L 130,120" fill="none" stroke="#10b981" strokeWidth="3"/>
              <path d="M 50,40 L 90,100 L 130,40" fill="none" stroke="#4f46e5" strokeWidth="3"/>
            </g>
          </g>
        );

      case 'shield':
        return (
          <g transform="translate(80, 100)">
            <path d="M 90,20 L 150,40 L 150,100 Q 150,150 90,180 Q 30,150 30,100 L 30,40 Z" 
                  fill="none" stroke="#4f46e5" strokeWidth="3" opacity="0.9"/>
            <path d="M 90,40 L 130,55 L 130,95 Q 130,125 90,145 Q 50,125 50,95 L 50,55 Z" 
                  fill="#06b6d4" opacity="0.2"/>
            <path d="M 70,80 L 85,95 L 110,60" fill="none" stroke="#10b981" strokeWidth="4" 
                  strokeLinecap="round" strokeLinejoin="round"/>
          </g>
        );

      default:
        return null;
    }
  };

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#070d1a', stopOpacity: 1 }} />
          <stop offset="25%" style={{ stopColor: '#111827', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#1f2937', stopOpacity: 1 }} />
          <stop offset="75%" style={{ stopColor: '#374151', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#4b5563', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="overlayGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#4f46e5', stopOpacity: 0.15 }} />
          <stop offset="50%" style={{ stopColor: '#06b6d4', stopOpacity: 0.15 }} />
          <stop offset="100%" style={{ stopColor: '#10b981', stopOpacity: 0.15 }} />
        </linearGradient>
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#4f46e5', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#06b6d4', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      
      {/* Background */}
      <rect width={width} height={height} fill="url(#bgGradient)"/>
      <rect width={width} height={height} fill="url(#overlayGradient)"/>
      
      {/* Subtle pattern overlay */}
      <g opacity="0.1">
        <circle cx="100" cy="100" r="3" fill="#fff"/>
        <circle cx="150" cy="150" r="2" fill="#fff"/>
        <circle cx="200" cy="80" r="2.5" fill="#fff"/>
        <circle cx="1000" cy="300" r="3" fill="#fff"/>
        <circle cx="1100" cy="200" r="2" fill="#fff"/>
        <circle cx="900" cy="250" r="2.5" fill="#fff"/>
      </g>
      
      {/* Icon */}
      {renderIcon()}
      
      {/* Title */}
      <text x="350" y="150" fontFamily="Arial, sans-serif" fontSize="72" fontWeight="bold" 
            fill="url(#textGradient)">
        {title}
      </text>
      
      {/* Subtitle */}
      <text x="350" y="200" fontFamily="Arial, sans-serif" fontSize="28" 
            fill="#e0e7ff" opacity="0.9">
        {subtitle}
      </text>
      
      {/* Badges */}
      {badges.map((badge, index) => {
        const row = Math.floor(index / 2);
        const col = index % 2;
        const x = 350 + (col * 250);
        const y = 230 + (row * 50);
        const colors = badgeColors[badge.color];
        const badgeWidth = badge.text.length * 10 + 40; // Dynamic width based on text
        
        return (
          <g key={index} transform={`translate(${x}, ${y})`}>
            <rect x="0" y="0" width={badgeWidth} height="36" rx="18" fill={colors.fill} opacity="0.2"/>
            <rect x="0" y="0" width={badgeWidth} height="36" rx="18" fill="none" stroke={colors.stroke} strokeWidth="2"/>
            <text x={badgeWidth / 2} y="24" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="600" 
                  fill="#fff" textAnchor="middle">{badge.text}</text>
          </g>
        );
      })}
      
      {/* Decorative elements */}
      <circle cx="950" cy="150" r="40" fill="#4f46e5" opacity="0.15"/>
      <circle cx="1050" cy="220" r="30" fill="#06b6d4" opacity="0.15"/>
      <circle cx="980" cy="280" r="25" fill="#10b981" opacity="0.15"/>
      <circle cx="1100" cy="150" r="20" fill="#fbbf24" opacity="0.15"/>
    </svg>
  );
}

export default BlogHeaderSVG;
