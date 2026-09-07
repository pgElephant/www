import type { Metadata } from 'next'
import { TOPIC_HUBS } from '@/config/topics'
import { TopicHubPage } from '@/components/TopicHubPage'
import { generateTopicHubMetadata } from '@/config/seo'

export const revalidate = 3600

const topic = TOPIC_HUBS.cybersecurity

export const metadata: Metadata = generateTopicHubMetadata(topic)

export default function CybersecurityPage() {
  return <TopicHubPage topic={topic} />
}
