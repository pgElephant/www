import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { TOPIC_HUBS } from '@/config/topics'
import { VideoBlogPost } from '@/components/VideoBlogPost'
import { fetchChannelVideos } from '@/lib/youtube'
import { findVideoBySlug, videoSlug } from '@/lib/video-blog'
import { generateVideoBlogMetadata } from '@/config/seo'

export const revalidate = 3600

const topic = TOPIC_HUBS.postgresql

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const videos = await fetchChannelVideos(topic.channel)
  return videos.map((video) => ({ slug: videoSlug(video) }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const videos = await fetchChannelVideos(topic.channel)
  const video = findVideoBySlug(videos, slug)
  if (!video) {
    return { title: 'Not found', robots: { index: false, follow: false } }
  }
  return generateVideoBlogMetadata(topic, video)
}

export default async function PostgresqlVideoBlogPage({ params }: Props) {
  const { slug } = await params
  const videos = await fetchChannelVideos(topic.channel)
  const video = findVideoBySlug(videos, slug)
  if (!video) notFound()
  return <VideoBlogPost topic={topic} video={video} />
}
