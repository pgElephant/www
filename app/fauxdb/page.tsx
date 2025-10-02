'use client'

import { useState } from 'react'
import ProjectTemplate from '../_components/ProjectTemplate'
import FauxDbDemoTerminal from '@/components/FauxDbDemoTerminal'
import { Play, Terminal, Monitor, CheckCircle, Users, Star, Clock, BarChart3 } from 'lucide-react'

const fauxdbConfig = {
  hero: {
    title: 'FauxDB: MongoDB wire-protocol proxy with PostgreSQL storage',
    subtitle: 'MongoDB wire protocol proxy, Rust-powered, PostgreSQL backend',
    projectName: 'fauxdb',
  },
  badges: [
    'MongoDB Compatible',
    'Query Translator',
    'Rust Engine',
    'PostgreSQL Backend',
    'ACID Transactions',
    'Geospatial',
  ],
  demo: (
    <div className="max-w-6xl mx-auto mb-8">
      <FauxDbDemoTerminal />
    </div>
  ),
  featurePillars: {
    kicker: 'Overview',
    items: [
      { title: 'MongoDB Wire Protocol', desc: 'Full MongoDB wire protocol proxy for seamless compatibility.' },
      { title: 'Query Translation', desc: 'Real-time MongoDB queries translated to PostgreSQL SQL.' },
      { title: 'Rust-Powered Engine', desc: 'High-performance, safe, and modern proxy engine.' },
      { title: 'PostgreSQL Backend', desc: 'Reliable, battle-tested PostgreSQL storage backend.' },
    ],
  },
  docsLinks: [
    { href: '/docs/fauxdb/api', title: 'API Reference', desc: 'Explore the FauxDB API.' },
    { href: '/docs/fauxdb/query-translation', title: 'Query Translation', desc: 'Learn how MongoDB queries are translated.' },
  ],
};

export default function FauxDbPage() {
  return <ProjectTemplate {...fauxdbConfig} />;
}