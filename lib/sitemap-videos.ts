import type { YouTubeVideo } from '@/lib/youtube'
import type { VideosHubConfig } from '@/config/videos'

const SITE_URL = 'https://www.pgelephant.com'

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function buildVideoTag(video: YouTubeVideo, descriptionFallback: string): string {
  const title = escapeXml(video.title)
  const description = escapeXml(
    video.description?.slice(0, 2048) || `${descriptionFallback}: ${video.title}`
  )
  const thumbnail = escapeXml(video.thumbnailUrl)
  const player = escapeXml(`https://www.youtube.com/embed/${video.id}`)
  const watchPage = escapeXml(video.url)

  return `    <video:video>
      <video:thumbnail_loc>${thumbnail}</video:thumbnail_loc>
      <video:title>${title}</video:title>
      <video:description>${description}</video:description>
      <video:content_loc>${watchPage}</video:content_loc>
      <video:player_loc allow_embed="yes">${player}</video:player_loc>
      <video:publication_date>${video.publishedAt}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:requires_subscription>no</video:requires_subscription>
      <video:live>no</video:live>
    </video:video>`
}

export function buildHubVideoSitemapBlock(
  hub: VideosHubConfig,
  videos: YouTubeVideo[]
): string {
  const pageUrl = `${SITE_URL}${hub.path}`
  const validVideos = videos.filter((video) => video.publishedAt && video.title && video.thumbnailUrl)
  const lastmod = validVideos[0]?.publishedAt || new Date().toISOString()
  const videoTags = validVideos
    .map((video) => buildVideoTag(video, hub.genre))
    .join('\n')

  return `  <url>
    <loc>${pageUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
${videoTags}
  </url>`
}

export function buildVideoSitemapXml(hubs: Array<{ hub: VideosHubConfig; videos: YouTubeVideo[] }>): string {
  const blocks = hubs.map(({ hub, videos }) => buildHubVideoSitemapBlock(hub, videos)).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${blocks}
</urlset>`
}
