import { NextRequest } from 'next/server';
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const blog = searchParams.get('blog') || 'pgraft';

  // Blog configurations
  const configs: Record<string, any> = {
    pgraft: {
      title: 'pgraft',
      subtitle: 'Raft Consensus Protocol Embedded in PostgreSQL',
      badges: [
        { text: '✓ Auto Leader Election', color: '#4f46e5' },
        { text: '✓ Zero Split-Brain', color: '#06b6d4' },
        { text: '✓ Crash-Safe Replication', color: '#10b981' },
        { text: '✓ Production Ready', color: '#fbbf24' },
      ],
      icon: 'raft',
    },
    'pg-stat-insights': {
      title: 'pg_stat_insights',
      subtitle: 'PostgreSQL Performance Monitoring',
      badges: [
        { text: '52 Metrics', color: '#4f46e5' },
        { text: '11 Views', color: '#06b6d4' },
        { text: 'Deep Insights', color: '#10b981' },
        { text: '✓ Drop-in Replacement', color: '#fbbf24' },
      ],
      icon: 'database',
    },
    pgbalancer: {
      title: 'pgbalancer',
      subtitle: 'Intelligent PostgreSQL Load Balancer',
      badges: [
        { text: 'Read/Write Split', color: '#4f46e5' },
        { text: 'Connection Pool', color: '#06b6d4' },
        { text: 'Health Checks', color: '#10b981' },
        { text: 'Zero Downtime', color: '#fbbf24' },
      ],
      icon: 'balance',
    },
    pgsentinel: {
      title: 'pgsentinel',
      subtitle: 'PostgreSQL Security & Monitoring',
      badges: [
        { text: 'Real-time Monitor', color: '#4f46e5' },
        { text: 'Threat Detection', color: '#06b6d4' },
        { text: 'Auto Response', color: '#10b981' },
        { text: 'Audit Logs', color: '#fbbf24' },
      ],
      icon: 'shield',
    },
  };

  const config = configs[blog] || configs.pgraft;

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '400px',
          display: 'flex',
          position: 'relative',
          background: 'linear-gradient(135deg, #070d1a 0%, #111827 25%, #1f2937 50%, #374151 75%, #4b5563 100%)',
        }}
      >
        {/* Overlay gradient */}
        <div
          style={{
            position: 'absolute',
            width: '1200px',
            height: '400px',
            background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.15) 0%, rgba(6, 182, 212, 0.15) 50%, rgba(16, 185, 129, 0.15) 100%)',
          }}
        />

        {/* Icon placeholder - simplified for ImageResponse */}
        <div
          style={{
            position: 'absolute',
            left: '80px',
            top: '100px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {config.icon === 'raft' && (
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ width: '70px', height: '70px', borderRadius: '12px', background: 'linear-gradient(135deg, #06b6d4, #4f46e5)' }} />
              <div style={{ width: '70px', height: '70px', borderRadius: '12px', background: 'linear-gradient(135deg, #fbbf24, #f59e0b)' }} />
              <div style={{ width: '70px', height: '70px', borderRadius: '12px', background: 'linear-gradient(135deg, #10b981, #06b6d4)' }} />
            </div>
          )}
          {config.icon === 'database' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ width: '140px', height: '40px', borderRadius: '50%', border: '3px solid #4f46e5' }} />
              <div style={{ width: '140px', height: '40px', borderRadius: '50%', border: '3px solid #06b6d4' }} />
              <div style={{ width: '140px', height: '40px', borderRadius: '50%', border: '3px solid #10b981' }} />
            </div>
          )}
        </div>

        {/* Content */}
        <div
          style={{
            position: 'absolute',
            left: '350px',
            top: '80px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {/* Title */}
          <div
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              background: 'linear-gradient(90deg, #4f46e5 0%, #06b6d4 50%, #10b981 100%)',
              backgroundClip: 'text',
              color: 'transparent',
              fontFamily: 'Arial, sans-serif',
            }}
          >
            {config.title}
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: '28px',
              color: '#e0e7ff',
              opacity: 0.9,
              fontFamily: 'Arial, sans-serif',
            }}
          >
            {config.subtitle}
          </div>

          {/* Badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginTop: '20px' }}>
            {config.badges.map((badge: any, index: number) => (
              <div
                key={index}
                style={{
                  padding: '8px 24px',
                  borderRadius: '18px',
                  border: `2px solid ${badge.color}`,
                  backgroundColor: `${badge.color}33`,
                  color: '#fff',
                  fontSize: '16px',
                  fontWeight: '600',
                  fontFamily: 'Arial, sans-serif',
                }}
              >
                {badge.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 400,
    }
  );
}
