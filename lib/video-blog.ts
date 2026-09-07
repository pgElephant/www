import type { YouTubeVideo } from '@/lib/youtube'
import type { TopicPath } from '@/config/topics'
import {
  findChannelEntryForVideo,
  stripEmDashes,
  type ChannelIndexEntry,
} from '@/lib/channel-content'

export function slugifyTitle(title: string): string {
  const slug = title
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)

  return slug || 'video'
}

export function videoSlug(video: YouTubeVideo): string {
  const base = slugifyTitle(video.title)
  return base.length >= 4 ? base : video.id
}

export function findVideoBySlug(
  videos: YouTubeVideo[],
  slug: string
): YouTubeVideo | undefined {
  return (
    videos.find((video) => videoSlug(video) === slug) ||
    videos.find((video) => video.id === slug)
  )
}

export function getMatchedChannelEntry(
  topicPath: TopicPath,
  video: YouTubeVideo
): ChannelIndexEntry | null {
  return findChannelEntryForVideo(topicPath, video)
}

function normalizeKey(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

/**
 * Full editorial article body for a video: local narration first, then
 * YouTube description. Written as lecture notes, not marketing copy.
 */
export function buildVideoBlogBody(
  video: YouTubeVideo,
  topicLabel: string,
  topicPath?: TopicPath
): string[] {
  if (topicPath) {
    const matched = findChannelEntryForVideo(topicPath, video)
    if (matched?.paragraphs?.length) {
      const titleKey = normalizeKey(video.title)
      return matched.paragraphs
        .map(stripEmDashes)
        .filter((paragraph) => normalizeKey(paragraph) !== titleKey)
        .filter(
          (paragraph) =>
            !normalizeKey(paragraph).startsWith(titleKey.slice(0, Math.min(36, titleKey.length)))
        )
        .slice(0, 12)
    }
  }

  const cleaned = cleanDescription(video.description)
  const paragraphs: string[] = []

  if (cleaned) {
    const chunks = packIntoParagraphs(cleaned, 10)
    paragraphs.push(...chunks.map(stripEmDashes))
  } else {
    paragraphs.push(
      stripEmDashes(
        `This ${topicLabel} lecture walks through "${video.title}" with the same production focus I use on the channel: what breaks, what the metrics say, and what to change.`
      )
    )
  }

  paragraphs.push(
    'Watch the video for the full walkthrough. Use this page when you want the argument in writing without scrubbing the timeline.'
  )

  return paragraphs.slice(0, 12).map(stripEmDashes)
}

function cleanDescription(description?: string): string {
  if (!description) return ''

  const lines = description
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !isNoiseLine(line))

  return lines.join(' ').replace(/\s+/g, ' ').trim()
}

function isNoiseLine(line: string): boolean {
  const lower = line.toLowerCase()
  return (
    /^(https?:\/\/|www\.)/i.test(line) ||
    lower.startsWith('subscribe') ||
    lower.startsWith('follow me') ||
    lower.startsWith('like and') ||
    lower.startsWith('#') ||
    lower.startsWith('chapters') ||
    lower.startsWith('timestamps') ||
    lower.startsWith('previous:') ||
    lower.startsWith('next:') ||
    lower.startsWith('playlist:') ||
    lower.startsWith('00:') ||
    /^\d{1,2}:\d{2}/.test(line) ||
    /^[\d:.\-\s]+$/.test(line)
  )
}

function packIntoParagraphs(text: string, max: number): string[] {
  const sentences =
    text.match(/(?:[^.!?]|\d\.\d)+[.!?]+|(?:[^.!?]|\d\.\d)+$/g) || [text]
  const paragraphs: string[] = []
  let buf = ''

  for (const sentence of sentences.map((part) => part.trim()).filter(Boolean)) {
    buf = buf ? `${buf} ${sentence}` : sentence
    if (buf.length > 320) {
      paragraphs.push(buf)
      buf = ''
      if (paragraphs.length >= max) break
    }
  }

  if (buf && paragraphs.length < max) paragraphs.push(buf)
  return paragraphs
}
