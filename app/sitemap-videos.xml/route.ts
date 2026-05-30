import { buildVideoSitemapXml } from '@/lib/sitemap-videos'
import { fetchChannelVideos } from '@/lib/youtube'
import { VIDEO_HUBS } from '@/config/videos'

export const revalidate = 3600

export async function GET() {
  const hubVideos = await Promise.all(
    VIDEO_HUBS.map(async (hub) => ({
      hub,
      videos: await fetchChannelVideos(hub.channel),
    }))
  )

  const xml = buildVideoSitemapXml(hubVideos)

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
