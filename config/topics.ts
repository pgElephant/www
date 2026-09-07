import type { YouTubeChannelConfig } from '@/lib/youtube'
import {
  YOUTUBE_CHANNEL,
  YOUTUBE_CHANNEL_AI,
  YOUTUBE_CHANNEL_CYBER,
} from '@/lib/youtube'

export type TopicPath = 'ai' | 'postgresql' | 'cybersecurity'

export interface TopicHubConfig {
  path: TopicPath
  title: string
  metaTitle: string
  description: string
  intro: string
  channel: YouTubeChannelConfig
  topicLabel: string
  emptyMessage: string
  keywords: string[]
  /** Page shell / identity */
  shellClass: string
  accentTextClass: string
  accentBorderClass: string
  accentBarClass: string
  identityLabel: string
}

export const TOPIC_HUBS: Record<TopicPath, TopicHubConfig> = {
  ai: {
    path: 'ai',
    title: 'AI',
    metaTitle: 'AI Mechanics notes & videos',
    description:
      'Long-form notes from AI Mechanics: LLMs, embeddings, RAG, KV cache, inference, and agents.',
    intro:
      'How modern AI works when you strip away the demos: next-token prediction, attention, embeddings, vector search, RAG, KV cache, speculative decoding, and agents with MCP. Each article pairs with the full lecture.',
    channel: YOUTUBE_CHANNEL_AI,
    topicLabel: 'AI',
    emptyMessage: 'No long-form AI videos loaded right now. Visit AI Mechanics on YouTube.',
    keywords: [
      'AI Mechanics',
      'Dr Ibrar Ahmed',
      'LLM tutorials',
      'RAG',
      'embeddings',
      'KV cache',
      'AI agents',
      'MCP',
      'inference',
    ],
    shellClass: 'bg-[#0b0c10]',
    accentTextClass: 'text-amber-500/90',
    accentBorderClass: 'border-amber-900/40',
    accentBarClass: 'bg-amber-600',
    identityLabel: 'Systems of intelligence',
  },
  postgresql: {
    path: 'postgresql',
    title: 'PostgreSQL',
    metaTitle: 'PostgreSQL Mechanics notes & videos',
    description:
      'Long-form notes from PostgreSQL Mechanics: tuning, HA, RDS, Aurora, indexes, and production DBA work.',
    intro:
      'Production PostgreSQL for people who keep databases alive: indexes, EXPLAIN, HA, Patroni, PgBouncer, PITR, RDS, Aurora, and what actually changes in new major versions. Articles sit beside the full videos.',
    channel: YOUTUBE_CHANNEL,
    topicLabel: 'PostgreSQL',
    emptyMessage:
      'No long-form PostgreSQL videos loaded right now. Visit PostgreSQL Mechanics on YouTube.',
    keywords: [
      'PostgreSQL Mechanics',
      'Dr Ibrar Ahmed',
      'PostgreSQL tutorials',
      'PostgreSQL DBA',
      'PostgreSQL HA',
      'Amazon RDS',
      'Aurora',
      'Patroni',
      'PgBouncer',
    ],
    shellClass: 'bg-[#070a10]',
    accentTextClass: 'text-sky-400/90',
    accentBorderClass: 'border-sky-900/40',
    accentBarClass: 'bg-sky-500',
    identityLabel: 'How the database really works',
  },
  cybersecurity: {
    path: 'cybersecurity',
    title: 'Cyber Security',
    metaTitle: 'Cyber Mechanics notes & videos',
    description:
      'Long-form notes from Cyber Mechanics: AI security, LLM agents, malware analysis, and defensive SOC education.',
    intro:
      'Defensive cyber education for engineers and SOC teams: AI agents, LLM security, malware paths, and how anonymity systems fail in practice. Educational only. Each article embeds the matching lecture.',
    channel: YOUTUBE_CHANNEL_CYBER,
    topicLabel: 'cyber security',
    emptyMessage:
      'No long-form cyber security videos loaded right now. Visit Cyber Mechanics on YouTube.',
    keywords: [
      'Cyber Mechanics',
      'Dr Ibrar Ahmed',
      'AI security',
      'LLM security',
      'malware analysis',
      'SOC',
      'cybersecurity education',
      'defensive security',
    ],
    shellClass: 'bg-[#080b0a]',
    accentTextClass: 'text-emerald-400/90',
    accentBorderClass: 'border-emerald-900/40',
    accentBarClass: 'bg-emerald-500',
    identityLabel: 'Defensive craft',
  },
}

export const TOPIC_LIST = Object.values(TOPIC_HUBS)
