import { MetadataRoute } from 'next'
import { fetchChannelVideos } from '@/lib/youtube'
import { getDiscoveredRoutes, getRouteMeta } from '@/lib/sitemap-routes'
import { VIDEO_HUBS } from '@/config/videos'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.pgelephant.com'
  const currentDate = new Date()

  const hubVideoData = await Promise.all(
    VIDEO_HUBS.map(async (hub) => ({
      hub,
      videos: await fetchChannelVideos(hub.channel),
    }))
  )

  const videoHubByPath = new Map(
    hubVideoData.map(({ hub, videos }) => [
      hub.path,
      {
        lastModified: videos[0]?.publishedAt ? new Date(videos[0].publishedAt) : currentDate,
        images: videos[0]?.thumbnailUrl ? [videos[0].thumbnailUrl] : undefined,
      },
    ])
  )

  return getDiscoveredRoutes().map((routePath) => {
    const { changeFrequency, priority } = getRouteMeta(routePath)
    const videoHub = videoHubByPath.get(routePath as '/videos' | '/videos-ai')

    return {
      url: `${baseUrl}${routePath}`,
      lastModified: videoHub?.lastModified ?? currentDate,
      changeFrequency,
      priority,
      ...(videoHub?.images ? { images: videoHub.images } : {}),
    }
  })
}
