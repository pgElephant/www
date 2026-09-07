import { MetadataRoute } from 'next'
import { TOPIC_LIST } from '@/config/topics'
import { fetchChannelVideos } from '@/lib/youtube'
import { videoSlug } from '@/lib/video-blog'
import { getDiscoveredRoutes, getRouteMeta } from '@/lib/sitemap-routes'
import { baseSEO } from '@/config/seo'

export const revalidate = 3600

function dedupeByUrl(entries: MetadataRoute.Sitemap): MetadataRoute.Sitemap {
  const seen = new Set<string>()
  const out: MetadataRoute.Sitemap = []
  for (const entry of entries) {
    if (seen.has(entry.url)) continue
    seen.add(entry.url)
    out.push(entry)
  }
  return out
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = baseSEO.siteUrl
  const currentDate = new Date()

  const topicVideoData = await Promise.all(
    TOPIC_LIST.map(async (topic) => ({
      topic,
      videos: await fetchChannelVideos(topic.channel),
    }))
  )

  const hubEntries: MetadataRoute.Sitemap = topicVideoData.map(({ topic, videos }) => {
    const routePath = `/${topic.path}`
    const { changeFrequency, priority } = getRouteMeta(routePath)
    const latest = videos[0]

    return {
      url: `${baseUrl}${routePath}`,
      lastModified: latest?.publishedAt ? new Date(latest.publishedAt) : currentDate,
      changeFrequency,
      priority,
      ...(latest?.thumbnailUrl ? { images: [latest.thumbnailUrl] } : {}),
    }
  })

  const videoBlogEntries: MetadataRoute.Sitemap = topicVideoData.flatMap(({ topic, videos }) =>
    videos.map((video) => {
      const routePath = `/${topic.path}/${videoSlug(video)}`
      const { changeFrequency, priority } = getRouteMeta(routePath)

      return {
        url: `${baseUrl}${routePath}`,
        lastModified: video.publishedAt ? new Date(video.publishedAt) : currentDate,
        changeFrequency,
        priority,
        images: video.thumbnailUrl ? [video.thumbnailUrl] : undefined,
      }
    })
  )

  const discoveredEntries: MetadataRoute.Sitemap = getDiscoveredRoutes()
    .filter((routePath) => !TOPIC_LIST.some((topic) => routePath === `/${topic.path}`))
    .map((routePath) => {
      const { changeFrequency, priority } = getRouteMeta(routePath)

      return {
        url: `${baseUrl}${routePath}`,
        lastModified: currentDate,
        changeFrequency,
        priority,
        ...(routePath === '/' || routePath === '/about'
          ? { images: [`${baseUrl}/profile/dr-ibrar-ahmed.png`] }
          : {}),
      }
    })

  // Personal / teaching content first for crawlers that sample the file head.
  return dedupeByUrl([
    ...discoveredEntries.filter((entry) => {
      const path = entry.url.replace(baseUrl, '') || '/'
      return (
        path === '/' ||
        path === '/about' ||
        path === '/github' ||
        path === '/blog' ||
        path.startsWith('/blog/')
      )
    }),
    ...hubEntries,
    ...videoBlogEntries,
    ...discoveredEntries.filter((entry) => {
      const path = entry.url.replace(baseUrl, '') || '/'
      return !(
        path === '/' ||
        path === '/about' ||
        path === '/github' ||
        path === '/blog' ||
        path.startsWith('/blog/')
      )
    }),
  ])
}
