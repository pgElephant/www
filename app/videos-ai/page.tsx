import type { Metadata } from 'next'
import { generateVideosHubMetadata } from '@/config/seo'
import { AI_VIDEOS_HUB } from '@/config/videos'
import { VideosHubPage } from '@/components/VideosHubPage'
import { fetchChannelVideos } from '@/lib/youtube'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const videos = await fetchChannelVideos(AI_VIDEOS_HUB.channel)
  return generateVideosHubMetadata(AI_VIDEOS_HUB, videos)
}

export default function VideosAiPage() {
  return <VideosHubPage hub={AI_VIDEOS_HUB} />
}
