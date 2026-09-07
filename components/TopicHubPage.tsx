import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import type { TopicHubConfig } from '@/config/topics'
import {
  fetchChannelVideos,
  formatPublishedDate,
  type YouTubeVideo,
} from '@/lib/youtube'
import { buildVideoBlogBody, videoSlug } from '@/lib/video-blog'
import { generateTopicHubStructuredData } from '@/config/seo'

export async function TopicHubPage({ topic }: { topic: TopicHubConfig }) {
  const videos = await fetchChannelVideos(topic.channel)
  const structuredData = generateTopicHubStructuredData(topic, videos)

  return (
    <main className={topic.shellClass}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className={`border-b ${topic.accentBorderClass}`}>
        {topic.channel.banner ? (
          <div className="w-full border-b border-stone-900 bg-black">
            <Image
              src={topic.channel.banner}
              alt={`${topic.channel.name} channel banner`}
              width={2560}
              height={424}
              priority
              className="mx-auto block h-auto w-full max-w-[1400px]"
              sizes="(max-width: 1400px) 100vw, 1400px"
            />
          </div>
        ) : null}

        <div className="mx-auto max-w-3xl px-5 pb-12 pt-10 sm:px-6 sm:pb-14">
          <div className={`mb-6 h-1 w-12 ${topic.accentBarClass}`} aria-hidden="true" />
          <p className="mb-5 text-sm text-stone-500">
            <Link href="/" className="hover:text-stone-300">
              Home
            </Link>
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            <span className="text-stone-400">{topic.title}</span>
          </p>
          <div className="flex items-start gap-4">
            <Image
              src={topic.channel.logo}
              alt=""
              width={72}
              height={72}
              className="h-[4.5rem] w-[4.5rem] rounded-full border border-stone-700 object-cover"
              priority
            />
            <div>
              <p className={`text-[11px] font-medium uppercase tracking-[0.22em] ${topic.accentTextClass}`}>
                {topic.identityLabel}
              </p>
              <h1 className="mt-2 font-serif text-3xl font-medium tracking-tight text-stone-50 sm:text-4xl">
                {topic.channel.name}
              </h1>
              <p className="mt-2 text-sm text-stone-500">{topic.channel.handle}</p>
            </div>
          </div>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-stone-400">
            {topic.intro}
          </p>
          <p className="mt-6">
            <a
              href={topic.channel.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-stone-200 underline-offset-4 hover:underline"
            >
              Open channel on YouTube
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-5 py-12 sm:px-6 sm:py-16">
        <h2 className="mb-8 font-serif text-2xl font-medium tracking-tight text-stone-100">
          Articles
        </h2>
        {videos.length > 0 ? (
          <ul className="space-y-0 divide-y divide-stone-800/80 border-y border-stone-800/80">
            {videos.map((video) => (
              <VideoBlogCard key={video.id} topic={topic} video={video} />
            ))}
          </ul>
        ) : (
          <p className="border border-stone-800 bg-stone-900/30 px-5 py-8 text-sm text-stone-400">
            {topic.emptyMessage}{' '}
            <a
              href={topic.channel.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-200 underline-offset-4 hover:underline"
            >
              Open YouTube
            </a>
          </p>
        )}
      </div>
    </main>
  )
}

function VideoBlogCard({
  topic,
  video,
}: {
  topic: TopicHubConfig
  video: YouTubeVideo
}) {
  const slug = videoSlug(video)
  const published = formatPublishedDate(video.publishedAt)
  const preview = buildVideoBlogBody(video, topic.topicLabel, topic.path)[0]

  return (
    <li className="py-7">
      <article>
        <Link
          href={`/${topic.path}/${slug}`}
          className="group grid gap-4 sm:grid-cols-[12rem_1fr] sm:gap-6"
        >
          <div className="relative aspect-video overflow-hidden border border-stone-800 bg-stone-900 sm:aspect-auto sm:h-28">
            <Image
              src={video.thumbnailUrl}
              alt=""
              fill
              className="object-cover transition duration-200 group-hover:opacity-90"
              sizes="(max-width: 640px) 100vw, 192px"
              unoptimized
            />
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-medium leading-snug text-stone-100 group-hover:text-white">
              {video.title}
            </h3>
            {published && (
              <time
                dateTime={video.publishedAt}
                className="mt-2 block text-xs text-stone-500"
              >
                {published}
              </time>
            )}
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-stone-400">
              {preview}
            </p>
          </div>
        </Link>
      </article>
    </li>
  )
}
