import { fetchChannelVideos } from '@/lib/youtube'

export const revalidate = 3600

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const videos = await fetchChannelVideos()
  const pageUrl = 'https://www.pgelephant.com/videos'

  const videoEntries = videos
    .map((video) => {
      const title = escapeXml(video.title)
      const description = escapeXml(
        video.description?.slice(0, 2048) || `PostgreSQL tutorial: ${video.title}`
      )
      const thumbnail = escapeXml(video.thumbnailUrl)
      const player = escapeXml(`https://www.youtube.com/embed/${video.id}`)

      return `  <url>
    <loc>${pageUrl}#video-${video.id}</loc>
    <lastmod>${video.publishedAt || new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <video:video>
      <video:thumbnail_loc>${thumbnail}</video:thumbnail_loc>
      <video:title>${title}</video:title>
      <video:description>${description}</video:description>
      <video:player_loc allow_embed="yes">${player}</video:player_loc>
      <video:publication_date>${video.publishedAt || new Date().toISOString()}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:requires_subscription>no</video:requires_subscription>
      <video:live>no</video:live>
    </video:video>
  </url>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <url>
    <loc>${pageUrl}</loc>
    <lastmod>${videos[0]?.publishedAt || new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
${videoEntries}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
