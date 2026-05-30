import type { YouTubeChannelConfig } from '@/lib/youtube'
import { YOUTUBE_CHANNEL, YOUTUBE_CHANNEL_AI } from '@/lib/youtube'

export interface VideosHubFaqItem {
  question: string
  answer: string
}

export interface VideosHubConfig {
  path: '/videos' | '/videos-ai'
  channel: YouTubeChannelConfig
  title: string
  metaTitle: string
  description: string
  intro: string
  searchBlurb: string
  breadcrumbLabel: string
  libraryHeading: string
  libraryLabel: string
  excerptFallback: (title: string) => string
  topics: string[]
  faqHeading: string
  faq: VideosHubFaqItem[]
  relatedLinks: Array<{ href: string; label: string }>
  siblingHub?: { href: '/videos' | '/videos-ai'; label: string; description: string }
  keywords: string[]
  genre: string
  about?: { name: string; sameAs?: string }
  category: string
}

export const POSTGRESQL_VIDEOS_HUB: VideosHubConfig = {
  path: '/videos',
  channel: YOUTUBE_CHANNEL,
  title: 'PostgreSQL Videos, Tutorials & DBA Guides',
  metaTitle: 'PostgreSQL Videos & Tutorials | Free DBA Training',
  description:
    'Free PostgreSQL video tutorials on replication, high availability, performance tuning, VACUUM, indexing, backups, PITR, migrations, and production DBA skills. Watch embedded lessons from Dr. Ibrar Ahmed on pgElephant.',
  intro:
    'Search for PostgreSQL tutorials, DBA training, replication guides, performance tuning, backup and recovery, indexing, and production troubleshooting — then watch every lesson here on pgElephant.',
  searchBlurb:
    'pgElephant is a free PostgreSQL video library for engineers searching tutorials on replication, logical replication, high availability, slow queries, EXPLAIN ANALYZE, VACUUM, bloat, backups, PITR, indexing, migration, security, checkpoints, and production DBA workflows.',
  breadcrumbLabel: 'PostgreSQL Videos',
  libraryHeading: 'PostgreSQL Video Library',
  libraryLabel: 'PostgreSQL video',
  excerptFallback: (title) => `PostgreSQL tutorial covering ${title}.`,
  topics: [
    'PostgreSQL replication & logical replication',
    'High availability & disaster recovery',
    'Performance tuning & slow queries',
    'VACUUM, bloat & autovacuum',
    'Indexing & EXPLAIN ANALYZE',
    'Backups, PITR & checkpoints',
    'Oracle & MySQL to PostgreSQL migration',
    'Security hardening & production runbooks',
  ],
  faqHeading: 'PostgreSQL Video FAQ',
  faq: [
    {
      question: 'Where can I watch free PostgreSQL video tutorials?',
      answer:
        'You can watch free PostgreSQL tutorials here on pgElephant. This page embeds the full library from Dr. Ibrar Ahmed, covering replication, HA, performance, backups, indexing, and production DBA workflows.',
    },
    {
      question: 'What PostgreSQL topics do these videos cover?',
      answer:
        'Topics include logical replication, high availability, VACUUM and table bloat, slow query analysis, EXPLAIN ANALYZE, indexing strategies, backup and PITR, database migration, security hardening, checkpoints, and major version upgrades.',
    },
    {
      question: 'Are these PostgreSQL videos for beginners or DBAs?',
      answer:
        'Both. The collection includes DBA cheat sheets for daily operations and deeper walkthroughs for engineers managing PostgreSQL in production.',
    },
    {
      question: 'Who teaches the PostgreSQL videos on pgElephant?',
      answer:
        'The videos are from Dr. Ibrar Ahmed on the YouTube channel PostgreSQL with Dr. Ibrar Ahmed, embedded and curated on pgElephant for PostgreSQL engineers and teams.',
    },
  ],
  relatedLinks: [
    { href: '/docs', label: 'PostgreSQL documentation' },
    { href: '/blog', label: 'PostgreSQL blog' },
    { href: '/pgraft', label: 'PostgreSQL HA with pgraft' },
    { href: '/pg-stat-insights', label: 'PostgreSQL performance analytics' },
    { href: '/videos-ai', label: 'AI video tutorials' },
  ],
  siblingHub: {
    href: '/videos-ai',
    label: 'AI Videos',
    description: 'LLM, RAG, Claude, and agentic AI tutorials from Dr. Ibrar Ahmed.',
  },
  keywords: [
    'PostgreSQL videos',
    'PostgreSQL tutorials',
    'PostgreSQL DBA',
    'PostgreSQL training',
    'PostgreSQL performance tuning',
    'PostgreSQL high availability',
    'PostgreSQL replication',
    'PostgreSQL logical replication',
    'PostgreSQL backup',
    'PostgreSQL PITR',
    'PostgreSQL VACUUM',
    'PostgreSQL indexing',
    'PostgreSQL EXPLAIN ANALYZE',
    'PostgreSQL migration',
    'PostgreSQL security',
    'PostgreSQL disaster recovery',
    'PostgreSQL slow queries',
    'learn PostgreSQL',
    'PostgreSQL course',
    'PostgreSQL webinar',
    'Dr Ibrar Ahmed PostgreSQL',
    'pgElephant videos',
  ],
  genre: 'PostgreSQL',
  about: {
    name: 'PostgreSQL',
    sameAs: 'https://en.wikipedia.org/wiki/PostgreSQL',
  },
  category: 'PostgreSQL',
}

export const AI_VIDEOS_HUB: VideosHubConfig = {
  path: '/videos-ai',
  channel: YOUTUBE_CHANNEL_AI,
  title: 'AI Videos, Tutorials & Automation Guides',
  metaTitle: 'AI Videos & Tutorials | LLM, RAG & Agentic AI',
  description:
    'Free AI video tutorials on LLMs, agents, RAG, Claude, Zapier automation, and production AI workflows. Watch embedded lessons from Dr. Ibrar Ahmed on pgElephant.',
  intro:
    'Explore AI tutorials on LLMs, agentic workflows, RAG, Claude, Zapier automation, and practical AI engineering — all embedded here on pgElephant from the AI With Dr. Ibrar Ahmed YouTube channel.',
  searchBlurb:
    'pgElephant is a free AI video library for developers searching tutorials on LLMs, ChatGPT alternatives, Claude, agentic AI, AI agents, RAG, vector search, Zapier automation, AI second brain workflows, and production AI engineering.',
  breadcrumbLabel: 'AI Videos',
  libraryHeading: 'AI Video Library',
  libraryLabel: 'AI video',
  excerptFallback: (title) => `AI tutorial covering ${title}.`,
  topics: [
    'LLMs & prompt engineering',
    'Agentic AI & AI agents',
    'RAG & vector search',
    'Claude & AI assistants',
    'Automation with Zapier',
    'AI workflows & second brain',
    'Production AI engineering',
    'AI with databases',
  ],
  faqHeading: 'AI Video FAQ',
  faq: [
    {
      question: 'Where can I watch free AI video tutorials from Dr. Ibrar Ahmed?',
      answer:
        'pgElephant hosts free AI video tutorials at https://www.pgelephant.com/videos-ai, including LLMs, agentic AI, RAG, Claude integrations, and automation walkthroughs from the AI With Dr. Ibrar Ahmed YouTube channel.',
    },
    {
      question: 'What AI topics are covered in these videos?',
      answer:
        'Topics include large language models, AI agents, retrieval-augmented generation (RAG), Claude and Zapier automation, zero-click workflows, AI second brain setups, and practical AI engineering for developers.',
    },
    {
      question: 'Are these AI videos for beginners or engineers?',
      answer:
        'Both. The library includes approachable AI explainers and hands-on build tutorials for developers implementing AI in real products and workflows.',
    },
    {
      question: 'Who teaches the AI videos on pgElephant?',
      answer:
        'The videos are from Dr. Ibrar Ahmed on the YouTube channel AI With Dr. Ibrar Ahmed, embedded and curated on pgElephant for developers and AI engineers.',
    },
  ],
  relatedLinks: [
    { href: '/blog', label: 'Technical blog' },
    { href: '/videos', label: 'PostgreSQL video tutorials' },
    { href: '/docs', label: 'Documentation' },
    { href: '/community', label: 'Community' },
  ],
  siblingHub: {
    href: '/videos',
    label: 'PostgreSQL Videos',
    description: 'PostgreSQL DBA, replication, HA, and performance tutorials.',
  },
  keywords: [
    'AI videos',
    'AI tutorials',
    'LLM tutorials',
    'large language model tutorials',
    'agentic AI',
    'AI agents',
    'RAG tutorial',
    'retrieval augmented generation',
    'Claude AI',
    'Claude tutorials',
    'ChatGPT tutorials',
    'AI automation',
    'Zapier AI',
    'AI engineering',
    'AI second brain',
    'machine learning tutorials',
    'AI with database',
    'Dr Ibrar Ahmed AI',
    'pgElephant AI videos',
  ],
  genre: 'Artificial Intelligence',
  about: {
    name: 'Artificial Intelligence',
    sameAs: 'https://en.wikipedia.org/wiki/Artificial_intelligence',
  },
  category: 'Artificial Intelligence',
}

export const VIDEO_HUBS = [POSTGRESQL_VIDEOS_HUB, AI_VIDEOS_HUB] as const
