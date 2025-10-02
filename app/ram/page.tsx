import React, { useState, useEffect } from 'react';
import ProjectTemplate from '../_components/ProjectTemplate';
import RamDemoTerminal from '@/components/RamDemoTerminal';
import { Terminal, Server, Activity, Users, Shield, Zap } from 'lucide-react';

export const metadata = {
  title: 'RAM - PostgreSQL High Availability | Auto Failover | Clustering',
  description: 'PostgreSQL high availability solution with automatic failover and clustering. RAM provides enterprise-grade PostgreSQL clustering with Raft consensus and real-time monitoring.',
  keywords: [
    'RAM PostgreSQL', 'Resilient Adaptive Manager', 'PostgreSQL high availability', 'PostgreSQL clustering',
    'PostgreSQL auto failover', 'PostgreSQL HA', 'PostgreSQL cluster', 'database clustering',
    'PostgreSQL failover', 'PostgreSQL monitoring', 'database high availability', 'PostgreSQL management',
    'RAM daemon', 'PostgreSQL daemon', 'database auto failover', 'PostgreSQL clustering software',
    'PostgreSQL cluster management', 'database cluster', 'PostgreSQL production', 'database reliability',
    'PostgreSQL automatic failover', 'database monitoring', 'PostgreSQL enterprise', 'database clustering solution'
  ],
  openGraph: {
    title: 'RAM - Resilient Adaptive Manager for PostgreSQL',
    description: 'Auto-failover daemon with Raft consensus for PostgreSQL high availability and clustering. Production-ready database management.',
    type: 'website',
    url: 'https://www.pgelephant.com/ram',
    images: [
      {
        url: 'https://www.pgelephant.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'RAM - Resilient Adaptive Manager',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RAM - Resilient Adaptive Manager for PostgreSQL',
    description: 'Auto-failover daemon with Raft consensus for PostgreSQL high availability and clustering. Production-ready database management.',
    images: ['https://www.pgelephant.com/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.pgelephant.com/ram',
  },
}

// Structured Data for RAM
const ramStructuredData = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "RAM - Resilient Adaptive Manager",
  "alternateName": ["RAM", "Resilient Adaptive Manager", "PostgreSQL High Availability"],
  "description": "PostgreSQL high availability solution with automatic failover and clustering. RAM provides enterprise-grade PostgreSQL clustering with Raft consensus and real-time monitoring.",
  "url": "https://www.pgelephant.com/ram",
  "brand": {
    "@type": "Brand",
    "name": "pgElephant"
  },
  "category": "Database Software",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "pgElephant",
      "url": "https://www.pgelephant.com"
    }
  },
  "manufacturer": {
    "@type": "Organization",
    "name": "pgElephant Team",
    "url": "https://www.pgelephant.com"
  },
  "additionalProperty": [
    {
      "@type": "PropertyValue",
      "name": "PostgreSQL Clustering",
      "value": "Supported"
    },
    {
      "@type": "PropertyValue", 
      "name": "Automatic Failover",
      "value": "Supported"
    },
    {
      "@type": "PropertyValue",
      "name": "Raft Consensus",
      "value": "Supported"
    },
    {
      "@type": "PropertyValue",
      "name": "Real-time Monitoring",
      "value": "Supported"
    },
    {
      "@type": "PropertyValue",
      "name": "Production Ready",
      "value": "Yes"
    }
  ],
  "softwareVersion": "1.0.0",
  "datePublished": "2024-01-01",
  "dateModified": new Date().toISOString().split('T')[0],
  "downloadUrl": "https://www.pgelephant.com/download"
}

const ramConfig = {
  hero: {
    title: 'RAM: Resilient Adaptive Manager',
    subtitle: 'PostgreSQL Auto-Failover Daemon with Raft Consensus',
    projectName: 'RAM',
    icon: '/ico/RAM_HD.ico',
  },
  badges: [
    'PostgreSQL Clustering',
    'Raft Consensus',
    'Auto Failover',
    'Real-time Monitoring',
    'Production Ready',
  ],
  demo: (
    <div className="max-w-6xl mx-auto mb-8">
      <RamDemoTerminal />
                      </div>
  ),
  featurePillars: {
    kicker: 'Overview',
    items: [
      { title: 'Auto-Failover Daemon', desc: 'Intelligent failover with sub-second detection and recovery.' },
      { title: 'Raft Consensus', desc: 'Reliable leader election and strong consistency guarantees.' },
      { title: 'Real-time Monitoring', desc: 'Comprehensive health checks and performance metrics.' },
      { title: 'PostgreSQL Integration', desc: 'Native PostgreSQL clustering with seamless integration.' },
      { title: 'Production Ready', desc: 'Enterprise-grade reliability and operational excellence.' },
      { title: 'Minimal Configuration', desc: 'Production-ready defaults, simple setup and scaling.' },
    ],
  },
  features: [
    { icon: <Zap className="w-5 h-5" />, iconColor: 'text-indigo-500', title: 'Automatic Failover', desc: 'Zero-downtime failover with sub-second detection and leader election.' },
    { icon: <Users className="w-5 h-5" />, iconColor: 'text-sky-500', title: 'Raft Consensus', desc: 'Leader election, log replication, term monotonicity with split-brain prevention.' },
    { icon: <Terminal className="w-5 h-5" />, iconColor: 'text-green-500', title: 'Professional CLI', desc: 'Advanced command-line interface with JSON/table output formats.' },
    { icon: <Activity className="w-5 h-5" />, iconColor: 'text-yellow-500', title: 'Real-time Monitoring', desc: 'Prometheus metrics, Grafana dashboards, and health checks.' },
    { icon: <Shield className="w-5 h-5" />, iconColor: 'text-pink-500', title: 'Enterprise Security', desc: 'Token-based authentication, SSL/TLS, rate limiting, and audit logging.' },
    { icon: <Server className="w-5 h-5" />, iconColor: 'text-cyan-500', title: 'Cloud-Native', desc: 'Docker, Kubernetes, and Helm chart support for modern deployments.' },
  ],
  featureMatrix: (
    <table className="w-full text-sm border border-slate-700 rounded-lg overflow-hidden">
      <thead className="bg-slate-800/60">
        <tr className="text-left">
          <th className="px-4 py-3 font-semibold text-white">Capability</th>
          <th className="px-4 py-3 font-semibold text-white">Description</th>
          <th className="px-4 py-3 font-semibold text-white">Operational Impact</th>
                  </tr>
                </thead>
      <tbody className="divide-y divide-slate-700 bg-slate-800/40">
        <tr>
          <td className="px-4 py-3 font-medium text-cyan-300">Auto-Failover</td>
          <td className="px-4 py-3 text-white/90">Intelligent failover with sub-second detection and recovery.</td>
          <td className="px-4 py-3 text-white/90">Zero-downtime operations.</td>
                  </tr>
        <tr className="bg-slate-800/60">
          <td className="px-4 py-3 font-medium text-cyan-300">Raft Consensus</td>
          <td className="px-4 py-3 text-white/90">Leader election, log replication, term monotonicity.</td>
          <td className="px-4 py-3 text-white/90">Deterministic failover; no split-brain.</td>
                  </tr>
                  <tr>
          <td className="px-4 py-3 font-medium text-cyan-300">Real-time Monitoring</td>
          <td className="px-4 py-3 text-white/90">Comprehensive health checks and performance metrics.</td>
          <td className="px-4 py-3 text-white/90">Proactive issue detection.</td>
                  </tr>
        <tr className="bg-slate-800/60">
          <td className="px-4 py-3 font-medium text-cyan-300">PostgreSQL Integration</td>
          <td className="px-4 py-3 text-white/90">Native PostgreSQL clustering with seamless integration.</td>
          <td className="px-4 py-3 text-white/90">Native DB admin UX.</td>
                  </tr>
                </tbody>
              </table>
  ),
  docsLinks: [
    { href: '/docs/ram/architecture', title: 'Architecture', desc: 'Learn about RAM\'s internal architecture.' },
    { href: '/docs/ram/api', title: 'API Reference', desc: 'Explore the RAM API.' },
  ],
};

export default function RamPage() {
  return (
    <div className="min-h-screen">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(ramStructuredData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.pgelephant.com/" },
              { "@type": "ListItem", "position": 2, "name": "RAM", "item": "https://www.pgelephant.com/ram" }
            ]
          })
        }}
      />
      <ProjectTemplate {...ramConfig} />
    </div>
  );
}