import React from 'react';
import ProjectTemplate from '../_components/ProjectTemplate';
import PgbalancerDemoTerminal from '@/components/PgbalancerDemoTerminal';
import { Database, Network, Zap, BarChart3 } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'pgbalancer - PostgreSQL Connection Pooling & Load Balancing | pgElephant',
  description: 'pgbalancer provides enterprise-grade PostgreSQL connection pooling with intelligent load balancing, high availability, and performance optimization. Based on pgpool-II.',
  keywords: 'PostgreSQL connection pooling, load balancing, high availability, performance optimization, pgpool-II',
  openGraph: {
    title: 'pgbalancer - PostgreSQL Connection Pooling & Load Balancing',
    description: 'Enterprise-grade PostgreSQL connection pooling with intelligent load balancing and high availability.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'pgbalancer - PostgreSQL Connection Pooling & Load Balancing',
    description: 'Enterprise-grade PostgreSQL connection pooling with intelligent load balancing and high availability.',
  },
};

// Custom pgbalancer icon component
const PgbalancerIcon = ({ size = 80 }: { size?: number }) => (
  <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
    <Database className="text-blue-400 animate-pulse" style={{ width: size * 0.6, height: size * 0.6 }} />
    <Network className="text-green-400 absolute -top-2 -right-2 animate-bounce" style={{ width: size * 0.3, height: size * 0.3, animationDelay: '0.2s' }} />
    <Zap className="text-yellow-400 absolute -bottom-2 -left-2 animate-pulse" style={{ width: size * 0.25, height: size * 0.25, animationDelay: '0.7s' }} />
    <BarChart3 className="text-purple-400 absolute -bottom-2 -right-2 animate-pulse" style={{ width: size * 0.2, height: size * 0.2, animationDelay: '1.1s' }} />
  </div>
)

const pgbalancerConfig = {
  hero: {
    title: 'pgbalancer: Connection Pooling & Load Balancing',
    subtitle: 'Enterprise-Grade PostgreSQL Performance Optimization',
    projectName: 'pgbalancer',
    icon: <PgbalancerIcon size={80} />,
  },
  badges: [
    'Connection Pooling',
    'Load Balancing',
    'High Performance',
    'REST API',
    'Production Ready',
  ],
  demo: <PgbalancerDemoTerminal />,
  featurePillars: {
    kicker: 'Overview',
    items: [
      { title: 'Connection Pooling', desc: 'Efficient connection reuse reduces overhead and improves scalability.' },
      { title: 'Load Balancing', desc: 'Distribute queries across multiple PostgreSQL servers for optimal performance.' },
      { title: 'High Availability', desc: 'Automatic failover and health checks ensure continuous operation.' },
      { title: 'REST API Management', desc: 'Modern REST API replaces legacy PCP protocol for easier integration.' },
      { title: 'Query Routing', desc: 'Intelligent routing directs read/write queries to appropriate servers.' },
      { title: 'Performance Monitoring', desc: 'Built-in metrics and monitoring for real-time insights.' },
    ],
  },
  featureMatrix: (
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
          <td className="px-4 py-3 font-medium text-blue-300">Connection Pooling</td>
          <td className="px-4 py-3 text-slate-300">Reuses database connections across client requests</td>
          <td className="px-4 py-3 text-slate-300">10x connection efficiency, reduced latency</td>
          <td className="px-4 py-3 text-slate-300">&lt;1ms overhead per query</td>
          <td className="px-4 py-3 text-slate-300">1000s of concurrent clients</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-4 py-3 font-medium text-blue-300">Load Balancing</td>
          <td className="px-4 py-3 text-slate-300">Distributes queries across backend servers</td>
          <td className="px-4 py-3 text-slate-300">Horizontal scaling, optimized resource usage</td>
          <td className="px-4 py-3 text-slate-300">Smart algorithm selection</td>
          <td className="px-4 py-3 text-slate-300">100+ backend nodes</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-blue-300">Health Monitoring</td>
          <td className="px-4 py-3 text-slate-300">Continuous backend health checks</td>
          <td className="px-4 py-3 text-slate-300">Automatic failover, high availability</td>
          <td className="px-4 py-3 text-slate-300">Configurable intervals</td>
          <td className="px-4 py-3 text-slate-300">Multi-backend monitoring</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-4 py-3 font-medium text-blue-300">Query Cache</td>
          <td className="px-4 py-3 text-slate-300">In-memory caching for frequently used queries</td>
          <td className="px-4 py-3 text-slate-300">Reduced database load, faster responses</td>
          <td className="px-4 py-3 text-slate-300">Memory-backed, microsecond retrieval</td>
          <td className="px-4 py-3 text-slate-300">Configurable cache size</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-blue-300">REST API</td>
          <td className="px-4 py-3 text-slate-300">Modern HTTP API for management and monitoring</td>
          <td className="px-4 py-3 text-slate-300">Easy integration, standard protocols</td>
          <td className="px-4 py-3 text-slate-300">Async, non-blocking</td>
          <td className="px-4 py-3 text-slate-300">Stateless, cloud-native</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-4 py-3 font-medium text-blue-300">Statement Routing</td>
          <td className="px-4 py-3 text-slate-300">Smart routing of read/write queries</td>
          <td className="px-4 py-3 text-slate-300">Optimized replica usage, primary protection</td>
          <td className="px-4 py-3 text-slate-300">Query parsing & classification</td>
          <td className="px-4 py-3 text-slate-300">Read replica fan-out</td>
        </tr>
      </tbody>
    </table>
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
            <td className="px-4 py-3 font-medium text-slate-200">Connection Pooling</td>
            <td className="px-4 py-3 text-green-400">✓ Advanced</td>
            <td className="px-4 py-3 text-green-400">✓ Advanced</td>
            <td className="px-4 py-3 text-green-400">✓ Basic</td>
            <td className="px-4 py-3 text-green-400">✓ Advanced</td>
          </tr>
          <tr>
            <td className="px-4 py-3 font-medium text-slate-200">Load Balancing</td>
            <td className="px-4 py-3 text-green-400">✓ Multi-algo</td>
            <td className="px-4 py-3 text-green-400">✓ Multi-algo</td>
            <td className="px-4 py-3 text-red-400">✗</td>
            <td className="px-4 py-3 text-green-400">✓ Round-robin</td>
          </tr>
          <tr className="bg-slate-800/40">
            <td className="px-4 py-3 font-medium text-slate-200">REST API</td>
            <td className="px-4 py-3 text-green-400">✓ Native</td>
            <td className="px-4 py-3 text-yellow-400">~ PCP protocol</td>
            <td className="px-4 py-3 text-red-400">✗</td>
            <td className="px-4 py-3 text-yellow-400">~ HTTP stats</td>
          </tr>
          <tr>
            <td className="px-4 py-3 font-medium text-slate-200">Query Cache</td>
            <td className="px-4 py-3 text-green-400">✓ Built-in</td>
            <td className="px-4 py-3 text-green-400">✓ Built-in</td>
            <td className="px-4 py-3 text-red-400">✗</td>
            <td className="px-4 py-3 text-red-400">✗</td>
          </tr>
          <tr className="bg-slate-800/40">
            <td className="px-4 py-3 font-medium text-slate-200">Health Checks</td>
            <td className="px-4 py-3 text-green-400">✓ Advanced</td>
            <td className="px-4 py-3 text-green-400">✓ Advanced</td>
            <td className="px-4 py-3 text-yellow-400">~ Basic</td>
            <td className="px-4 py-3 text-green-400">✓ Advanced</td>
          </tr>
          <tr>
            <td className="px-4 py-3 font-medium text-slate-200">Failover Support</td>
            <td className="px-4 py-3 text-green-400">✓ Automatic</td>
            <td className="px-4 py-3 text-green-400">✓ Automatic</td>
            <td className="px-4 py-3 text-red-400">✗</td>
            <td className="px-4 py-3 text-green-400">✓ Automatic</td>
          </tr>
          <tr className="bg-slate-800/40">
            <td className="px-4 py-3 font-medium text-slate-200">Statement Routing</td>
            <td className="px-4 py-3 text-green-400">✓ Intelligent</td>
            <td className="px-4 py-3 text-green-400">✓ Intelligent</td>
            <td className="px-4 py-3 text-red-400">✗</td>
            <td className="px-4 py-3 text-yellow-400">~ Basic</td>
          </tr>
          <tr>
            <td className="px-4 py-3 font-medium text-slate-200">Performance</td>
            <td className="px-4 py-3 text-green-400">High (C)</td>
            <td className="px-4 py-3 text-green-400">High (C)</td>
            <td className="px-4 py-3 text-green-400">Very High (C)</td>
            <td className="px-4 py-3 text-green-400">High (Rust)</td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
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
  return <ProjectTemplate {...pgbalancerConfig} />;
}

