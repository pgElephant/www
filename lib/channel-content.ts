import fs from 'fs'
import path from 'path'
import type { TopicPath } from '@/config/topics'
import type { YouTubeVideo } from '@/lib/youtube'

export interface ChannelIndexEntry {
  topic: TopicPath
  slug: string
  title: string
  titles: string[]
  titleKeys: string[]
  folderKey: string
  paragraphs: string[]
  sections?: Array<{
    heading: string
    paragraphs: string[]
  }>
  examples?: Array<{
    title: string
    language: string
    code: string
    source: string
    sectionHint?: string
    result?: string
    resultLabel?: string
  }>
  takeaways?: string[]
  references?: Array<{
    claim: string
    reference: string
    classification: string
    url: string
  }>
  cover?: string | null
  source?: string | null
}

interface ChannelIndexFile {
  generatedAt: string
  count: number
  entries: ChannelIndexEntry[]
}

let cachedIndex: ChannelIndexFile | null = null

function normalizeTitle(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[\u2013\u2014\u2212]/g, '-')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

function tokenSet(value: string): Set<string> {
  return new Set(
    normalizeTitle(value)
      .split(' ')
      .filter((token) => token.length > 2)
  )
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0
  let overlap = 0
  a.forEach((token) => {
    if (b.has(token)) overlap += 1
  })
  const union = new Set<string>()
  a.forEach((token) => union.add(token))
  b.forEach((token) => union.add(token))
  return union.size === 0 ? 0 : overlap / union.size
}

export function loadChannelIndex(): ChannelIndexFile {
  if (cachedIndex) return cachedIndex

  const indexPath = path.join(process.cwd(), 'data', 'channel-index.json')
  if (!fs.existsSync(indexPath)) {
    cachedIndex = { generatedAt: '', count: 0, entries: [] }
    return cachedIndex
  }

  cachedIndex = JSON.parse(fs.readFileSync(indexPath, 'utf8')) as ChannelIndexFile
  return cachedIndex
}

export function findChannelEntryForVideo(
  topic: TopicPath,
  video: YouTubeVideo
): ChannelIndexEntry | null {
  const index = loadChannelIndex()
  const topicEntries = index.entries.filter((entry) => entry.topic === topic)
  if (topicEntries.length === 0) return null

  const videoKey = normalizeTitle(video.title)
  const videoTokens = tokenSet(video.title)

  if (topic === 'postgresql') {
    const preferred = preferredPostgresEntry(topicEntries, videoKey)
    if (preferred) return preferred
  }

  let best: ChannelIndexEntry | null = null
  let bestScore = 0

  for (const entry of topicEntries) {
    for (const key of entry.titleKeys) {
      if (!key) continue
      if (key === videoKey) {
        return entry
      }
      const keyTokens = tokenSet(key)
      const shorterSize = Math.min(keyTokens.size, videoTokens.size)
      const longerSize = Math.max(keyTokens.size, videoTokens.size)
      const containment =
        shorterSize >= 4 &&
        longerSize > 0 &&
        shorterSize / longerSize >= 0.65 &&
        (videoKey.includes(key) || key.includes(videoKey))
      if (containment) return entry
      const score = jaccard(videoTokens, keyTokens)
      if (score > bestScore) {
        bestScore = score
        best = entry
      }
    }

    const folderScore = jaccard(videoTokens, tokenSet(entry.folderKey))
    if (folderScore > bestScore) {
      bestScore = folderScore
      best = entry
    }
  }

  return bestScore >= 0.42 ? best : null
}

function preferredPostgresEntry(
  entries: ChannelIndexEntry[],
  title: string
): ChannelIndexEntry | null {
  if (/postgresql 19.*vacuum/.test(title)) {
    const feature = entries.find((entry) => entry.slug === '19_vacuum')
    const foundation = entries.find((entry) => entry.slug === 'vacuum')
    if (feature && foundation) {
      return {
        ...foundation,
        title: feature.title,
        titles: feature.titles,
        titleKeys: feature.titleKeys,
        examples: feature.examples,
        source: feature.source,
      }
    }
  }

  const rules: Array<[RegExp, string[]]> = [
    [/\baurora\b/, ['aurora']],
    [/\bamazon rds\b|\brds postgresql\b/, ['rds']],
    [/\bactive active\b|across 3 regions/, ['uha']],
    [/\bpatroni\b|\betcd\b|full region failure/, ['ha']],
    [/\bwork mem\b|400 gb memory|400gb/, ['performance--postgres_e02_work_mem']],
    [
      /\bpgbouncer\b|connections.*idle|connections.*active/,
      ['performance--postgres_e04_connection_pooling'],
    ],
    [
      /16 cores|1 of 16 cpu|uses one/,
      [
        'performance--postgres_e01_server_not_maxed_out',
        'performance--postgres_e03_cpu_not_the_bottleneck',
      ],
    ],
    [/\bjoin stat\b/, ['19_stats']],
    [/\bvacuum\b/, ['vacuum', '19_vacuum']],
    [/\bindex\b|indexes/, ['indexes_complete_guide', 'indexes']],
  ]

  for (const [pattern, slugPrefixes] of rules) {
    if (!pattern.test(title)) continue
    for (const prefix of slugPrefixes) {
      const candidates = entries.filter(
        (entry) => entry.slug === prefix || entry.slug.startsWith(prefix)
      )
      if (!candidates.length) continue
      return candidates.sort(
        (a, b) =>
          b.paragraphs.join(' ').length - a.paragraphs.join(' ').length
      )[0]
    }
  }

  return null
}

export function stripEmDashes(text: string): string {
  return text
    .replace(/[\u2013\u2014\u2212]/g, '-')
    .replace(/\s+-\s+/g, ' - ')
}
