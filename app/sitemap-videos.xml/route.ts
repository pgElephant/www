import { buildVideoSitemapXml } from '@/lib/sitemap-videos'
import { fetchChannelVideos } from '@/lib/youtube'
import { TOPIC_LIST } from '@/config/topics'

export const revalidate = 3600

export async function GET() {
  const topicVideos = await Promise.all(
    TOPIC_LIST.map(async (topic) => ({
      topic,
      videos: await fetchChannelVideos(topic.channel),
    }))
  )

  const xml = buildVideoSitemapXml(topicVideos)

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
