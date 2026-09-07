import type { YouTubeVideo } from '@/lib/youtube'
import type { TopicHubConfig } from '@/config/topics'
import { buildVideoBlogBody, videoSlug } from '@/lib/video-blog'
import { baseSEO } from '@/config/seo'

const SITE_URL = baseSEO.siteUrl

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function sitemapDescription(video: YouTubeVideo, topic: TopicHubConfig): string {
  const description =
    buildVideoBlogBody(video, topic.topicLabel, topic.path)[0]?.trim() || ''
  const looksEditorial =
    description.length < 80 ||
    /^[-=_*#\s]+$/.test(description) ||
    /\b(?:narration|calm read|scene|episode code)\b/i.test(description)

  if (!looksEditorial) return description.slice(0, 2048)

  return `${video.title}. A detailed ${topic.topicLabel} article and long-form video by Dr. Ibrar Ahmed, with technical context, examples, and production guidance.`.slice(
    0,
    2048
  )
}

function buildVideoTag(
  video: YouTubeVideo,
  topic: TopicHubConfig
): string {
  const title = escapeXml(video.title)
  const description = escapeXml(sitemapDescription(video, topic))
  const thumbnail = escapeXml(video.thumbnailUrl)
  const player = escapeXml(`https://www.youtube.com/embed/${video.id}`)
  const duration =
    video.durationSeconds && video.durationSeconds <= 28800
      ? `\n      <video:duration>${Math.round(video.durationSeconds)}</video:duration>`
      : ''

  return `    <video:video>
      <video:thumbnail_loc>${thumbnail}</video:thumbnail_loc>
      <video:title>${title}</video:title>
      <video:description>${description}</video:description>
      <video:player_loc allow_embed="yes">${player}</video:player_loc>
      <video:publication_date>${video.publishedAt}</video:publication_date>
      <video:uploader info="${escapeXml(topic.channel.url)}">Dr. Ibrar Ahmed</video:uploader>${duration}
      <video:family_friendly>yes</video:family_friendly>
      <video:requires_subscription>no</video:requires_subscription>
      <video:live>no</video:live>
    </video:video>`
}

export function buildVideoBlogSitemapBlock(
  topic: TopicHubConfig,
  video: YouTubeVideo
): string {
  const pageUrl = `${SITE_URL}/${topic.path}/${videoSlug(video)}`
  const lastmod = video.publishedAt || new Date().toISOString()

  return `  <url>
    <loc>${escapeXml(pageUrl)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
${buildVideoTag(video, topic)}
  </url>`
}

export function buildVideoSitemapXml(
  topics: Array<{ topic: TopicHubConfig; videos: YouTubeVideo[] }>
): string {
  const postBlocks = topics
    .flatMap(({ topic, videos }) =>
      videos
        .filter((video) => video.publishedAt && video.title && video.thumbnailUrl)
        .map((video) => buildVideoBlogSitemapBlock(topic, video))
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${postBlocks}
</urlset>`
}
