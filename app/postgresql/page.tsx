import type { Metadata } from 'next'
import { TOPIC_HUBS } from '@/config/topics'
import { TopicHubPage } from '@/components/TopicHubPage'
import { generateTopicHubMetadata } from '@/config/seo'

export const revalidate = 3600

const topic = TOPIC_HUBS.postgresql

export const metadata: Metadata = generateTopicHubMetadata(topic)

export default function PostgresqlPage() {
  return <TopicHubPage topic={topic} />
}
