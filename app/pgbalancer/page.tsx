import React from 'react';
import ProjectTemplate from '../_components/ProjectTemplate';
import PgbalancerDemoTerminal from '@/components/PgbalancerDemoTerminal';
import PgbalancerSEO from '@/components/SEO/PgbalancerSEO';
import { Database, Network, Zap, BarChart3, Brain, Cpu } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'pgbalancer - PostgreSQL Connection Pooler & Load Balancer | pgpool-II Alternative with HAProxy Mode',
  description: 'Modern PostgreSQL connection pooler and load balancer with pgpool-II compatibility and HAProxy-like connection balancing. AI-powered machine learning load balancing, automatic failover, REST API, MQTT clustering, and watchdog support. Production-ready alternative to pgpool-II, PgBouncer, and HAProxy for PostgreSQL. Built-in health monitoring and intelligent query routing.',
  keywords: [
    // Primary pgpool-II keywords
    'pgpool-ii', 'pgpool-ii alternative', 'pgpool ii', 'pgpool', 'pgpool alternative',
    'pgpool-ii fork', 'modern pgpool-ii', 'pgpool-ii replacement', 'better than pgpool-ii',
    'pgpool-ii vs pgbalancer', 'migrate from pgpool-ii', 'pgpool-ii modern alternative',
    
    // HAProxy keywords
    'haproxy postgresql', 'haproxy database', 'haproxy alternative', 'haproxy load balancer',
    'haproxy connection pooling', 'haproxy postgres', 'load balancer like haproxy',
    'haproxy mode', 'connection balancer haproxy', 'haproxy for postgresql',
    
    // Failover keywords
    'postgresql failover', 'automatic failover postgresql', 'database failover',
    'failover postgresql', 'postgres failover solution', 'automatic database failover',
    'zero downtime failover', 'failover and recovery', 'postgresql high availability failover',
    'instant failover postgresql', 'failover detection', 'watchdog failover',
    
    // Connection pooler keywords
    'postgresql connection pooler', 'connection pooler', 'database connection pooler',
    'postgres connection pooler', 'connection pool postgresql', 'pooler postgresql',
    'pgbouncer alternative', 'pgcat alternative', 'odyssey alternative',
    'best postgresql connection pooler', 'connection pooling middleware',
    
    // Load balancer keywords
    'postgresql load balancer', 'database load balancer', 'postgres load balancer',
    'load balancing postgresql', 'query load balancing', 'connection load balancing',
    'intelligent load balancing', 'read write load balancing', 'statement level load balancing',
    
    // AI and ML keywords
    'ai postgresql pooling', 'machine learning load balancing', 'ai-powered connection pooler',
    'predictive query routing', 'adaptive learning database', 'intelligent backend selection',
    
    // Core product keywords
    'pgbalancer', 'pg balancer', 'postgres balancer', 'postgresql pooling',
    'database connection pooling', 'connection pool management', 'postgresql clustering',
    
    // High availability keywords
    'postgresql ha', 'database high availability', 'postgres high availability',
    'ha postgresql', 'high availability solution', 'zero downtime postgresql',
    'high availability load balancer', 'ha connection pooler',
    
    // Modern features
    'rest api postgresql', 'rest api connection pooler', 'http api pooler',
    'mqtt clustering', 'yaml configuration', 'cli connection pooler', 'bctl cli',
    'jwt authentication pooler', 'modern connection pooler',
    
    // Technical features
    'watchdog support', 'health monitoring postgresql', 'backend health check',
    'query cache', 'connection cache', 'session pooling', 'transaction pooling',
    'statement level load balance', 'query based load balancing',
    
    // Comparison and migration
    'pgpool-ii vs pgbouncer', 'pgpool-ii vs haproxy', 'connection pooler comparison',
    'migrate from pgpool', 'pgpool to pgbalancer', 'haproxy to pgbalancer',
    'best postgresql pooling solution', 'enterprise connection pooler',
    
    // Use cases
    'postgresql replication pooling', 'read replica load balancing', 'master slave pooling',
    'multi master postgresql', 'streaming replication pooling', 'logical replication pooling',
    
    // Problem solving keywords
    'too many postgresql connections', 'connection limit postgresql', 'optimize postgresql connections',
    'postgresql connection pooling best practices', 'reduce connection overhead',
    'connection pooling strategy', 'database connection management'
  ].join(', '),
  authors: [
    { name: 'pgElephant Team', url: 'https://www.pgelephant.com' }
  ],
  category: 'Database Management Software',
  classification: 'Database Tools',
  openGraph: {
    title: 'pgbalancer - Modern PostgreSQL Connection Pooler with REST API',
    description: 'Production-ready PostgreSQL connection pooler and load balancer with REST API, CLI tool, YAML configuration, and JWT authentication. Modern fork of pgpool-II.',
    type: 'website',
    url: 'https://www.pgelephant.com/pgbalancer',
    siteName: 'pgElephant',
    images: [
      {
        url: 'https://www.pgelephant.com/og-pgbalancer.jpg',
        width: 1200,
        height: 630,
        alt: 'pgbalancer - Modern PostgreSQL Connection Pooler',
        type: 'image/jpeg',
      }
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@pgElephant',
    creator: '@pgElephant',
    title: 'pgbalancer - Modern PostgreSQL Connection Pooler with REST API',
    description: 'Production-ready PostgreSQL connection pooler with REST API, CLI tool, YAML configuration, and watchdog support. Modern fork of pgpool-II.',
    images: [
      {
        url: 'https://www.pgelephant.com/twitter-pgbalancer.jpg',
        alt: 'pgbalancer - Modern PostgreSQL Connection Pooler',
        width: 1200,
        height: 600,
      }
    ],
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  alternates: {
    canonical: 'https://www.pgelephant.com/pgbalancer',
    types: {
      'application/rss+xml': 'https://www.pgelephant.com/blog/rss.xml',
    },
  },
};

// Custom pgbalancer icon component
const PgbalancerIcon = ({ size = 80 }: { size?: number }) => (
  <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
    <Database className="text-blue-400 animate-pulse" style={{ width: size * 0.6, height: size * 0.6 }} />
    <Network className="text-green-400 absolute -top-2 -right-2 animate-bounce" style={{ width: size * 0.3, height: size * 0.3, animationDelay: '0.2s' }} />
    <Zap className="text-yellow-400 absolute -bottom-2 -left-2 animate-pulse" style={{ width: size * 0.25, height: size * 0.25, animationDelay: '0.7s' }} />
    <BarChart3 className="text-orange-400 absolute -bottom-2 -right-2 animate-pulse" style={{ width: size * 0.2, height: size * 0.2, animationDelay: '1.1s' }} />
  </div>
)

const pgbalancerConfig = {
  hero: {
    title: 'pgbalancer: AI-Powered PostgreSQL Connection Pooler',
    subtitle: 'Production-ready connection pooling with AI load balancing, REST API, MQTT clustering, and JWT authentication',
    projectName: 'pgbalancer',
    icon: <PgbalancerIcon size={80} />,
  },
  badges: [
    'PostgreSQL 13-18',
    'AI Load Balancing',
    'REST API',
    'MQTT Clustering',
    'Connection Pooling',
    'JWT Authentication',
    'bctl CLI',
    'Watchdog Support',
    'Production Ready',
  ],
  demo: <PgbalancerDemoTerminal />,
  features: [
    { icon: '🧠', iconColor: 'text-purple-500', title: 'AI Load Balancing', desc: 'Machine learning algorithm with adaptive learning, response time prediction, and health scoring. Learns from query patterns.' },
    { icon: '📊', iconColor: 'text-cyan-500', title: 'Predictive Analytics', desc: 'AI forecasts query execution times, analyzes complexity, and predicts backend performance based on historical data.' },
    { icon: '⚖️', iconColor: 'text-green-500', title: 'Adaptive Routing', desc: 'Intelligent query distribution using exploration vs exploitation strategy, weighted selection, and health scoring.' },
    { icon: '🚀', iconColor: 'text-blue-500', title: 'REST API', desc: 'Production-ready HTTP/JSON API with 17 endpoints including /api/v1/nodes, /api/v1/status, and AI statistics.' },
    { icon: '📡', iconColor: 'text-orange-500', title: 'MQTT Clustering', desc: 'Distributed coordination via MQTT with event publishing for node status, failover events, and health checks.' },
    { icon: '🔧', iconColor: 'text-teal-500', title: 'bctl CLI Tool', desc: 'Command-line client with box-drawing tables, JSON output, and MQTT integration for cluster management.' },
    { icon: '🔐', iconColor: 'text-pink-500', title: 'JWT Authentication', desc: 'Optional HMAC-SHA256 JWT tokens with Bearer format, 1-hour expiry, and backwards-compatible password auth.' },
    { icon: '🔄', iconColor: 'text-indigo-500', title: 'Connection Pooling', desc: 'Efficient connection reuse with configurable pool sizes (num_init_children, max_pool), connection timeouts, and cleanup.' },
    { icon: '🏥', iconColor: 'text-red-500', title: 'Health Monitoring', desc: 'Continuous backend health checks with configurable intervals, timeout detection, and automatic node recovery.' },
    { icon: '🐕', iconColor: 'text-yellow-500', title: 'Watchdog Support', desc: 'Multi-node coordination with leader election, automatic failover, and coordinated recovery across instances.' },
    { icon: '🎯', iconColor: 'text-violet-500', title: 'Query Analysis', desc: 'Smart query parsing with read/write detection, complexity estimation (0-100 scale), and optimal backend selection.' },
    { icon: '⚡', iconColor: 'text-red-500', title: 'High Performance', desc: 'Ultra-fast C implementation with <10ms REST API response time and <0.5ms query routing overhead.' },
  ],
  featurePillars: {
    kicker: 'AI-Powered Features & Architecture',
    items: [
      { title: 'AI Load Balancing Engine', desc: 'Machine learning algorithm with adaptive learning rate (10%), exploration vs exploitation (20%), and weighted random selection. Learns from query execution patterns and automatically optimizes routing decisions.' },
      { title: 'Predictive Query Routing', desc: 'AI analyzes query complexity (0-100 scale), estimates rows, detects read/write operations, and predicts execution time. Routes queries to optimal backends based on health scores and current load (0.0-1.0 scale).' },
      { title: 'Health Scoring & Metrics', desc: 'Each backend node tracked with avg_response_time, current_load, total_queries, success/failed queries, error_rate, predicted_load, and health_score. Metrics decay over time for freshness.' },
      { title: 'Adaptive Learning System', desc: 'AI updates node metrics after each query execution. Learns from feedback (response time, success/failure) and adjusts health scores. Continuous model improvement with success rate tracking.' },
      { title: 'REST API Management', desc: 'Production HTTP/JSON API with 17 endpoints: /api/v1/status (server stats), /api/v1/nodes (backend management), /api/v1/health/stats, /api/v1/control/reload, /api/v1/watchdog/info, and AI statistics.' },
      { title: 'MQTT Event Publishing', desc: 'Distributed coordination via MQTT protocol. Publishes node_status changes, failover_events, and health_check results to topics: pgbalancer/cluster/health, pgbalancer/cluster/failover, pgbalancer/cluster/config.' },
      { title: 'bctl CLI Tool', desc: 'Command-line client with MQTT integration. Commands: bctl nodes, bctl status, bctl health, bctl watchdog-status. Supports --table (box-drawing), --json, and --verbose output formats.' },
      { title: 'JWT Authentication', desc: 'Optional HMAC-SHA256 JWT tokens. Login endpoint: POST /api/v1/auth/login. Bearer token format with 1-hour expiry (3600s). Backwards compatible with password authentication.' },
      { title: 'Connection Pooling', desc: 'Efficient connection reuse with configurable parameters: num_init_children (32), max_pool (4 per child), child_life_time (300s), child_max_connections (0=unlimited). Automatic cleanup and session management.' },
      { title: 'Watchdog Clustering', desc: 'Multi-node watchdog coordination with leader election, heartbeat monitoring, automatic failover coordination, and recovery management. Supports VIP (Virtual IP) management and distributed consensus.' },
      { title: 'Query Cache', desc: 'Intelligent query result caching with cache invalidation, memory management, and TTL support. AI-driven cache warming and prefetching based on query patterns.' },
    ],
  },
  featureMatrix: (
    <div className="space-y-8">
      {/* Architecture Diagram */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 rounded-xl border border-slate-700">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">3-Node PostgreSQL Cluster Architecture</h3>
        
        <div className="space-y-6">
          {/* Clients Layer */}
          <div className="text-center">
            <div className="inline-flex items-center gap-4 px-6 py-3 bg-blue-600/20 border-2 border-blue-500 rounded-lg">
              <span className="text-lg font-semibold text-blue-300">Application Clients</span>
              <span className="text-sm text-slate-400">(psql, web apps, services)</span>
            </div>
          </div>
          
          {/* Arrow Down */}
          <div className="flex justify-center">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500"></div>
          </div>
          
          {/* pgbalancer Layer */}
          <div className="bg-purple-600/10 border-2 border-purple-500 rounded-xl p-6">
            <div className="text-center mb-4">
              <h4 className="text-xl font-bold text-purple-300">pgbalancer (Port 5432)</h4>
              <p className="text-sm text-slate-400">AI-Powered Connection Pooler & Load Balancer</p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-4">
              {/* AI Engine */}
              <div className="bg-slate-800/60 border border-purple-400 rounded-lg p-4">
                <div className="text-center">
                  <div className="text-3xl mb-2">🧠</div>
                  <div className="font-semibold text-purple-300">AI Engine</div>
                  <div className="text-xs text-slate-400 mt-2">
                    • Learning Rate: 10%<br/>
                    • Exploration: 20%<br/>
                    • Health Scoring<br/>
                    • Query Analysis
                  </div>
                </div>
              </div>
              
              {/* REST API */}
              <div className="bg-slate-800/60 border border-blue-400 rounded-lg p-4">
                <div className="text-center">
                  <div className="text-3xl mb-2">🚀</div>
                  <div className="font-semibold text-blue-300">REST API</div>
                  <div className="text-xs text-slate-400 mt-2">
                    • Port 8080<br/>
                    • 17 Endpoints<br/>
                    • JWT Auth<br/>
                    • AI Statistics
                  </div>
                </div>
              </div>
              
              {/* MQTT */}
              <div className="bg-slate-800/60 border border-orange-400 rounded-lg p-4">
                <div className="text-center">
                  <div className="text-3xl mb-2">📡</div>
                  <div className="font-semibold text-orange-300">MQTT</div>
                  <div className="text-xs text-slate-400 mt-2">
                    • Event Publishing<br/>
                    • Node Status<br/>
                    • Failover Events<br/>
                    • Health Checks
                  </div>
                </div>
              </div>
            </div>
            
            {/* Connection Pools */}
            <div className="mt-4 bg-slate-800/40 border border-cyan-400 rounded-lg p-4">
              <div className="text-center">
                <div className="font-semibold text-cyan-300 mb-2">Connection Pools</div>
                <div className="flex justify-around text-xs text-slate-400">
                  <span>32 Init Children</span>
                  <span>4 Max Pool/Child</span>
                  <span>300s Child Lifetime</span>
                  <span>Session Reuse</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Arrow Down */}
          <div className="flex justify-center">
            <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-green-500"></div>
          </div>
          
          {/* PostgreSQL Nodes Layer */}
          <div className="grid grid-cols-3 gap-4">
            {/* Node 1 - Primary */}
            <div className="bg-green-600/10 border-2 border-green-500 rounded-xl p-4">
              <div className="text-center">
                <div className="text-3xl mb-2">👑</div>
                <h5 className="font-bold text-green-300">PostgreSQL Primary</h5>
                <div className="text-sm text-slate-400 mt-2">localhost:5433</div>
                <div className="mt-3 space-y-1 text-xs text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">●</span>
                    <span className="text-slate-300">Read/Write</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">●</span>
                    <span className="text-slate-300">Weight: 1.0</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">●</span>
                    <span className="text-slate-300">Health: 100%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">●</span>
                    <span className="text-slate-300">Streaming Rep</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Node 2 - Standby 1 */}
            <div className="bg-blue-600/10 border-2 border-blue-500 rounded-xl p-4">
              <div className="text-center">
                <div className="text-3xl mb-2">📘</div>
                <h5 className="font-bold text-blue-300">PostgreSQL Standby 1</h5>
                <div className="text-sm text-slate-400 mt-2">localhost:5434</div>
                <div className="mt-3 space-y-1 text-xs text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400">●</span>
                    <span className="text-slate-300">Read Only</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400">●</span>
                    <span className="text-slate-300">Weight: 1.0</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400">●</span>
                    <span className="text-slate-300">Health: 98%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400">●</span>
                    <span className="text-slate-300">Hot Standby</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Node 3 - Standby 2 */}
            <div className="bg-indigo-600/10 border-2 border-indigo-500 rounded-xl p-4">
              <div className="text-center">
                <div className="text-3xl mb-2">📙</div>
                <h5 className="font-bold text-indigo-300">PostgreSQL Standby 2</h5>
                <div className="text-sm text-slate-400 mt-2">localhost:5435</div>
                <div className="mt-3 space-y-1 text-xs text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-indigo-400">●</span>
                    <span className="text-slate-300">Read Only</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-indigo-400">●</span>
                    <span className="text-slate-300">Weight: 1.0</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-indigo-400">●</span>
                    <span className="text-slate-300">Health: 99%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-indigo-400">●</span>
                    <span className="text-slate-300">Hot Standby</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* AI Routing Logic */}
          <div className="bg-purple-900/30 border border-purple-500/50 rounded-lg p-4">
            <div className="text-center mb-3">
              <h5 className="font-bold text-purple-300">AI Routing Logic</h5>
            </div>
            <div className="grid grid-cols-3 gap-4 text-xs">
              <div className="text-center">
                <div className="font-semibold text-green-300 mb-1">Write Queries</div>
                <div className="text-slate-400">→ Primary Only<br/>(Node 1)</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-blue-300 mb-1">Read Queries</div>
                <div className="text-slate-400">→ AI Weighted Selection<br/>(All 3 Nodes)</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-purple-300 mb-1">Complex Queries</div>
                <div className="text-slate-400">→ Lowest Load Node<br/>(AI Predicted)</div>
              </div>
            </div>
          </div>
          
          {/* Components Layer */}
          <div className="grid grid-cols-4 gap-3 mt-4">
            <div className="bg-slate-800/40 border border-yellow-500/50 rounded p-3 text-center">
              <div className="text-2xl mb-1">🔧</div>
              <div className="text-xs font-semibold text-yellow-300">bctl CLI</div>
              <div className="text-xs text-slate-400">Management</div>
            </div>
            <div className="bg-slate-800/40 border border-red-500/50 rounded p-3 text-center">
              <div className="text-2xl mb-1">🏥</div>
              <div className="text-xs font-semibold text-red-300">Health Checks</div>
              <div className="text-xs text-slate-400">30s Interval</div>
            </div>
            <div className="bg-slate-800/40 border border-orange-500/50 rounded p-3 text-center">
              <div className="text-2xl mb-1">🐕</div>
              <div className="text-xs font-semibold text-orange-300">Watchdog</div>
              <div className="text-xs text-slate-400">Auto Failover</div>
            </div>
            <div className="bg-slate-800/40 border border-cyan-500/50 rounded p-3 text-center">
              <div className="text-2xl mb-1">💾</div>
              <div className="text-xs font-semibold text-cyan-300">Query Cache</div>
              <div className="text-xs text-slate-400">AI-Driven</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Feature Comparison Table */}
      <table className="w-full text-sm border border-slate-700 rounded-lg overflow-hidden">
      <thead className="bg-slate-800/60">
        <tr className="text-left">
          <th className="px-4 py-3 font-semibold text-white">Feature</th>
          <th className="px-4 py-3 font-semibold text-white">Description</th>
          <th className="px-4 py-3 font-semibold text-white">Benefit</th>
          <th className="px-4 py-3 font-semibold text-white">Performance</th>
          <th className="px-4 py-3 font-semibold text-white">Scalability</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-700 bg-slate-800/40">
        <tr>
          <td className="px-4 py-3 font-medium text-purple-300">AI Intelligence Engine</td>
          <td className="px-4 py-3 text-slate-300">Machine learning algorithms analyze patterns and optimize automatically</td>
          <td className="px-4 py-3 text-slate-300">30% performance improvement, self-tuning capabilities</td>
          <td className="px-4 py-3 text-slate-300">Real-time ML optimization</td>
          <td className="px-4 py-3 text-slate-300">Adaptive resource allocation</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-4 py-3 font-medium text-blue-300">Intelligent Connection Pooling</td>
          <td className="px-4 py-3 text-slate-300">AI-driven connection reuse with predictive scaling capabilities</td>
          <td className="px-4 py-3 text-slate-300">15x connection efficiency, reduced latency</td>
          <td className="px-4 py-3 text-slate-300">&lt;0.5ms overhead per query</td>
          <td className="px-4 py-3 text-slate-300">10,000s of concurrent clients</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-blue-300">Smart Load Balancing</td>
          <td className="px-4 py-3 text-slate-300">ML-powered query distribution with adaptive workload optimization</td>
          <td className="px-4 py-3 text-slate-300">Intelligent scaling, optimized resource usage</td>
          <td className="px-4 py-3 text-slate-300">AI algorithm selection</td>
          <td className="px-4 py-3 text-slate-300">1000+ backend nodes</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-4 py-3 font-medium text-green-300">Predictive Scaling</td>
          <td className="px-4 py-3 text-slate-300">AI forecasts traffic patterns and pre-scales resources automatically</td>
          <td className="px-4 py-3 text-slate-300">Zero-downtime scaling, traffic prediction</td>
          <td className="px-4 py-3 text-slate-300">ML-based forecasting</td>
          <td className="px-4 py-3 text-slate-300">Dynamic auto-scaling</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-blue-300">Health Monitoring</td>
          <td className="px-4 py-3 text-slate-300">AI-powered continuous backend health prediction and monitoring</td>
          <td className="px-4 py-3 text-slate-300">Predictive failover, 99.99% availability</td>
          <td className="px-4 py-3 text-slate-300">Intelligent health checks</td>
          <td className="px-4 py-3 text-slate-300">Multi-backend AI monitoring</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-4 py-3 font-medium text-blue-300">Intelligent Query Cache</td>
          <td className="px-4 py-3 text-slate-300">AI-driven caching with machine learning pattern recognition</td>
          <td className="px-4 py-3 text-slate-300">90% cache hit rate, intelligent prefetching</td>
          <td className="px-4 py-3 text-slate-300">ML-backed, nanosecond retrieval</td>
          <td className="px-4 py-3 text-slate-300">Adaptive cache sizing</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-blue-300">REST API</td>
          <td className="px-4 py-3 text-slate-300">AI-enhanced HTTP API with intelligent management and monitoring</td>
          <td className="px-4 py-3 text-slate-300">Smart integration, AI insights</td>
          <td className="px-4 py-3 text-slate-300">Async, ML-optimized</td>
          <td className="px-4 py-3 text-slate-300">AI-native, cloud-ready</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-4 py-3 font-medium text-blue-300">Adaptive Query Routing</td>
          <td className="px-4 py-3 text-slate-300">AI analyzes patterns and routes queries to optimal backends</td>
          <td className="px-4 py-3 text-slate-300">Intelligent replica usage, ML-based routing</td>
          <td className="px-4 py-3 text-slate-300">AI query parsing & optimization</td>
          <td className="px-4 py-3 text-slate-300">Smart read replica distribution</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-green-300">MQTT Clustering</td>
          <td className="px-4 py-3 text-slate-300">Distributed cluster coordination via MQTT messaging</td>
          <td className="px-4 py-3 text-slate-300">Multi-node coordination, automatic discovery</td>
          <td className="px-4 py-3 text-slate-300">Event-driven, real-time updates</td>
          <td className="px-4 py-3 text-slate-300">Horizontal scaling, fault tolerance</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-4 py-3 font-medium text-purple-300">bctl Management</td>
          <td className="px-4 py-3 text-slate-300">Command-line utility for cluster administration</td>
          <td className="px-4 py-3 text-slate-300">Easy configuration, monitoring integration</td>
          <td className="px-4 py-3 text-slate-300">Fast CLI operations, real-time monitoring</td>
          <td className="px-4 py-3 text-slate-300">DevOps-friendly, automation ready</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-orange-300">Real-Time Metrics</td>
          <td className="px-4 py-3 text-slate-300">Comprehensive monitoring with Prometheus integration</td>
          <td className="px-4 py-3 text-slate-300">AI insights, performance analytics</td>
          <td className="px-4 py-3 text-slate-300">Low-latency metrics, ML-enhanced</td>
          <td className="px-4 py-3 text-slate-300">Cloud-native monitoring, scalable</td>
        </tr>
      </tbody>
    </table>
    </div>
  ),
  featureComparison: (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border border-slate-700 rounded-lg">
        <thead className="bg-slate-800/60">
          <tr className="text-left">
            <th className="px-4 py-3 font-semibold text-white">Feature</th>
            <th className="px-4 py-3 font-semibold text-white">pgbalancer</th>
            <th className="px-4 py-3 font-semibold text-white">pgpool-II</th>
            <th className="px-4 py-3 font-semibold text-white">PgBouncer</th>
            <th className="px-4 py-3 font-semibold text-white">Pgcat</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700">
          <tr className="bg-slate-800/40">
            <td className="px-4 py-3 font-medium text-slate-200">AI Intelligence Engine</td>
            <td className="px-4 py-3 text-purple-400">✓ Machine Learning</td>
            <td className="px-4 py-3 text-red-400">✗</td>
            <td className="px-4 py-3 text-red-400">✗</td>
            <td className="px-4 py-3 text-red-400">✗</td>
          </tr>
          <tr>
            <td className="px-4 py-3 font-medium text-slate-200">Predictive Scaling</td>
            <td className="px-4 py-3 text-purple-400">✓ AI-Powered</td>
            <td className="px-4 py-3 text-red-400">✗</td>
            <td className="px-4 py-3 text-red-400">✗</td>
            <td className="px-4 py-3 text-red-400">✗</td>
          </tr>
          <tr className="bg-slate-800/40">
            <td className="px-4 py-3 font-medium text-slate-200">Intelligent Connection Pooling</td>
            <td className="px-4 py-3 text-green-400">✓ AI-Enhanced</td>
            <td className="px-4 py-3 text-green-400">✓ Advanced</td>
            <td className="px-4 py-3 text-green-400">✓ Basic</td>
            <td className="px-4 py-3 text-green-400">✓ Advanced</td>
          </tr>
          <tr>
            <td className="px-4 py-3 font-medium text-slate-200">Smart Load Balancing</td>
            <td className="px-4 py-3 text-green-400">✓ ML-Optimized</td>
            <td className="px-4 py-3 text-green-400">✓ Multi-algo</td>
            <td className="px-4 py-3 text-red-400">✗</td>
            <td className="px-4 py-3 text-green-400">✓ Round-robin</td>
          </tr>
          <tr className="bg-slate-800/40">
            <td className="px-4 py-3 font-medium text-slate-200">AI-Enhanced REST API</td>
            <td className="px-4 py-3 text-purple-400">✓ AI Insights</td>
            <td className="px-4 py-3 text-yellow-400">~ PCP protocol</td>
            <td className="px-4 py-3 text-red-400">✗</td>
            <td className="px-4 py-3 text-yellow-400">~ HTTP stats</td>
          </tr>
          <tr>
            <td className="px-4 py-3 font-medium text-slate-200">Intelligent Query Cache</td>
            <td className="px-4 py-3 text-purple-400">✓ ML-Driven</td>
            <td className="px-4 py-3 text-green-400">✓ Built-in</td>
            <td className="px-4 py-3 text-red-400">✗</td>
            <td className="px-4 py-3 text-red-400">✗</td>
          </tr>
          <tr className="bg-slate-800/40">
            <td className="px-4 py-3 font-medium text-slate-200">Predictive Health Checks</td>
            <td className="px-4 py-3 text-purple-400">✓ AI-Predicted</td>
            <td className="px-4 py-3 text-green-400">✓ Advanced</td>
            <td className="px-4 py-3 text-yellow-400">~ Basic</td>
            <td className="px-4 py-3 text-green-400">✓ Advanced</td>
          </tr>
          <tr>
            <td className="px-4 py-3 font-medium text-slate-200">Intelligent Failover</td>
            <td className="px-4 py-3 text-purple-400">✓ AI-Enhanced</td>
            <td className="px-4 py-3 text-green-400">✓ Automatic</td>
            <td className="px-4 py-3 text-red-400">✗</td>
            <td className="px-4 py-3 text-green-400">✓ Automatic</td>
          </tr>
          <tr className="bg-slate-800/40">
            <td className="px-4 py-3 font-medium text-slate-200">Adaptive Query Routing</td>
            <td className="px-4 py-3 text-purple-400">✓ AI-Optimized</td>
            <td className="px-4 py-3 text-green-400">✓ Intelligent</td>
            <td className="px-4 py-3 text-red-400">✗</td>
            <td className="px-4 py-3 text-yellow-400">~ Basic</td>
          </tr>
          <tr>
            <td className="px-4 py-3 font-medium text-slate-200">Performance</td>
            <td className="px-4 py-3 text-purple-400">Ultra High (AI+C)</td>
            <td className="px-4 py-3 text-green-400">High (C)</td>
            <td className="px-4 py-3 text-green-400">Very High (C)</td>
            <td className="px-4 py-3 text-green-400">High (Rust)</td>
          </tr>
          <tr className="bg-slate-800/40">
            <td className="px-4 py-3 font-medium text-slate-200">MQTT Clustering</td>
            <td className="px-4 py-3 text-purple-400">✓ Distributed</td>
            <td className="px-4 py-3 text-red-400">✗</td>
            <td className="px-4 py-3 text-red-400">✗</td>
            <td className="px-4 py-3 text-red-400">✗</td>
          </tr>
          <tr>
            <td className="px-4 py-3 font-medium text-slate-200">Management CLI</td>
            <td className="px-4 py-3 text-purple-400">✓ bctl Tool</td>
            <td className="px-4 py-3 text-yellow-400">~ pgpool commands</td>
            <td className="px-4 py-3 text-red-400">✗</td>
            <td className="px-4 py-3 text-yellow-400">~ Basic CLI</td>
          </tr>
          <tr className="bg-slate-800/40">
            <td className="px-4 py-3 font-medium text-slate-200">Real-Time Metrics</td>
            <td className="px-4 py-3 text-purple-400">✓ Prometheus + AI</td>
            <td className="px-4 py-3 text-yellow-400">~ Basic stats</td>
            <td className="px-4 py-3 text-yellow-400">~ Simple metrics</td>
            <td className="px-4 py-3 text-yellow-400">~ Basic monitoring</td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
  codeExamples: [
    {
      title: 'REST API - Cluster Management',
      code: `# Get cluster status
curl -X GET http://localhost:8080/api/v1/cluster/status

# Add new backend node
curl -X POST http://localhost:8080/api/v1/backends \\
  -H "Content-Type: application/json" \\
  -d '{
    "host": "192.168.1.100",
    "port": 5432,
    "database": "mydb",
    "user": "postgres",
    "weight": 1.0,
    "max_connections": 100
  }'

# Update load balancing strategy
curl -X PUT http://localhost:8080/api/v1/config/load_balancing \\
  -H "Content-Type: application/json" \\
  -d '{
    "strategy": "ai_weighted",
    "health_check_interval": 30,
    "failover_threshold": 3
  }'

# Get AI model statistics
curl -X GET http://localhost:8080/api/v1/ai/stats`,
      language: 'bash',
    },
    {
      title: 'MQTT Cluster Coordination',
      code: `# MQTT Configuration
mqtt:
  broker: "mqtt://cluster-broker:1883"
  client_id: "pgbalancer-node-1"
  topics:
    cluster_health: "pgbalancer/cluster/health"
    config_updates: "pgbalancer/cluster/config"
    failover_events: "pgbalancer/cluster/failover"
  
# Subscribe to cluster events
mosquitto_sub -h cluster-broker -t "pgbalancer/cluster/health" \\
  -t "pgbalancer/cluster/failover"

# Publish health status
mosquitto_pub -h cluster-broker \\
  -t "pgbalancer/cluster/health" \\
  -m '{"node": "pgbalancer-1", "status": "healthy", "connections": 45}'

# Trigger failover via MQTT
mosquitto_pub -h cluster-broker \\
  -t "pgbalancer/cluster/failover" \\
  -m '{"backend": "db-1", "action": "disable", "reason": "high_latency"}'`,
      language: 'yaml',
    },
    {
      title: 'bctl Management Tool',
      code: `# Install bctl
go install github.com/pgelephant/pgbalancer/cmd/bctl@latest

# Connect to cluster
bctl connect --broker mqtt://cluster-broker:1883

# List all backends
bctl backends list

# Add new backend
bctl backends add \\
  --host 192.168.1.100 \\
  --port 5432 \\
  --database mydb \\
  --user postgres \\
  --weight 1.0

# Update AI model parameters
bctl ai update \\
  --learning-rate 0.01 \\
  --exploration-rate 0.1 \\
  --decay-factor 0.95

# Monitor cluster health
bctl monitor --watch

# Export configuration
bctl config export --format yaml > cluster-config.yaml`,
      language: 'bash',
    },
    {
      title: 'Python Integration',
      code: `import requests
import paho.mqtt.client as mqtt
import json

class PgbalancerClient:
    def __init__(self, api_url, mqtt_broker):
        self.api_url = api_url
        self.mqtt_client = mqtt.Client()
        self.mqtt_client.connect(mqtt_broker, 1883, 60)
        
    def get_cluster_status(self):
        response = requests.get(f"{self.api_url}/api/v1/cluster/status")
        return response.json()
    
    def add_backend(self, host, port, database, user, weight=1.0):
        data = {
            "host": host,
            "port": port,
            "database": database,
            "user": user,
            "weight": weight
        }
        response = requests.post(f"{self.api_url}/api/v1/backends", json=data)
        return response.json()
    
    def subscribe_to_events(self, callback):
        def on_message(client, userdata, msg):
            data = json.loads(msg.payload.decode())
            callback(data)
        
        self.mqtt_client.on_message = on_message
        self.mqtt_client.subscribe("pgbalancer/cluster/#")
        self.mqtt_client.loop_start()
    
    def publish_health_status(self, node_id, status, connections):
        data = {
            "node": node_id,
            "status": status,
            "connections": connections
        }
        self.mqtt_client.publish("pgbalancer/cluster/health", json.dumps(data))

# Usage
client = PgbalancerClient("http://localhost:8080", "cluster-broker")

# Get cluster status
status = client.get_cluster_status()
print(f"Active backends: {status['active_backends']}")

# Add new backend
result = client.add_backend("192.168.1.100", 5432, "mydb", "postgres")
print(f"Backend added: {result['success']}")

# Subscribe to cluster events
def handle_event(event):
    print(f"Cluster event: {event}")

client.subscribe_to_events(handle_event)`,
      language: 'python',
    },
  ],
  docsLinks: [
    {
      title: 'Getting Started',
      desc: 'Quick start guide for pgbalancer installation and configuration.',
      href: '/docs/pgbalancer/getting-started',
    },
    {
      title: 'Configuration',
      desc: 'Comprehensive configuration reference for optimal performance.',
      href: '/docs/pgbalancer/configuration',
    },
    {
      title: 'Monitoring & Metrics',
      desc: 'Learn how to monitor and optimize pgbalancer performance.',
      href: '/docs/pgbalancer/metrics',
    },
  ],
};

export default function PgbalancerPage() {
  return (
    <>
      <PgbalancerSEO />
      <ProjectTemplate {...pgbalancerConfig} />
    </>
  );
}

