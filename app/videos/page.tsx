import type { Metadata } from 'next'
import Link from 'next/link'
import { ExternalLink, Play, Youtube } from 'lucide-react'
import {
  generateVideosBreadcrumbSchema,
  generateVideosFaqSchema,
  generateVideosMetadata,
  generateVideosPageSchema,
  getVideosPageCopy,
} from '@/config/seo'
import {
  fetchChannelVideos,
  formatPublishedDate,
  YOUTUBE_CHANNEL,
  type YouTubeVideo,
} from '@/lib/youtube'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const videos = await fetchChannelVideos()
  return generateVideosMetadata(videos, YOUTUBE_CHANNEL.name)
}

function VideoStructuredData({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

function VideoCard({ video }: { video: YouTubeVideo }) {
  const publishedLabel = formatPublishedDate(video.publishedAt)
  const excerpt = video.description
    ? video.description.split('\n').find((line) => line.trim().length > 0)?.trim()
    : undefined

  return (
    <article
      id={`video-${video.id}`}
      className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm scroll-mt-28"
      itemScope
      itemType="https://schema.org/VideoObject"
    >
      <meta itemProp="embedUrl" content={`https://www.youtube.com/embed/${video.id}`} />
      <meta itemProp="contentUrl" content={video.url} />
      {video.publishedAt && <meta itemProp="uploadDate" content={video.publishedAt} />}
      <meta itemProp="thumbnailUrl" content={video.thumbnailUrl} />

      <div className="relative aspect-video bg-black">
        <iframe
          src={`https://www.youtube.com/embed/${video.id}`}
          title={video.title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>

      <div className="p-5">
        <h2 className="mb-2 text-lg font-semibold leading-snug text-white" itemProp="name">
          {video.title}
        </h2>
        {publishedLabel && (
          <p className="mb-3 text-sm text-white/60">
            <time dateTime={video.publishedAt}>{publishedLabel}</time>
          </p>
        )}
        {excerpt && (
          <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-white/70" itemProp="description">
            {excerpt}
          </p>
        )}
        <Link
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-red-400 transition-colors hover:text-red-300"
          itemProp="url"
        >
          <Play className="h-4 w-4" aria-hidden="true" />
          Watch on YouTube
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}

export default async function VideosPage() {
  const videos = await fetchChannelVideos()
  const copy = getVideosPageCopy()
  const structuredData = [
    generateVideosPageSchema(videos, YOUTUBE_CHANNEL.name, YOUTUBE_CHANNEL.url),
    generateVideosBreadcrumbSchema(),
    generateVideosFaqSchema(),
  ]

  return (
    <div className="min-h-screen bg-[#111827] pt-0">
      {structuredData.map((schema, index) => (
        <VideoStructuredData key={index} data={schema} />
      ))}

      <section className="relative flex min-h-[420px] items-center overflow-hidden pt-20 text-center">
        <div className="container-extra-wide relative z-10 mx-auto w-full px-4 py-12">
          <div className="mx-auto max-w-4xl">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/60">
              <ol className="flex flex-wrap items-center justify-center gap-2">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-white">
                  PostgreSQL Videos
                </li>
              </ol>
            </nav>

            <div className="mb-4 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600/20">
                <Youtube className="h-8 w-8 text-red-500" aria-hidden="true" />
              </div>
            </div>

            <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
              {copy.title}
            </h1>
            <p className="mx-auto mb-6 max-w-3xl text-lg leading-relaxed text-white/80">
              {copy.description}
            </p>
            <p className="mx-auto mb-8 max-w-3xl text-base leading-relaxed text-white/70">
              Search for PostgreSQL tutorials, DBA training, replication guides, performance tuning,
              backup and recovery, indexing, and production troubleshooting — then watch every lesson
              here on pgElephant, embedded from {YOUTUBE_CHANNEL.name}.
            </p>

            <div className="mb-8 flex flex-wrap justify-center gap-2">
              {copy.topics.map((topic) => (
                <span
                  key={topic}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80"
                >
                  {topic}
                </span>
              ))}
            </div>

            <Link
              href={YOUTUBE_CHANNEL.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-500"
            >
              <Youtube className="h-5 w-5" aria-hidden="true" />
              Subscribe on YouTube
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16" style={{ backgroundColor: '#1f2937' }} aria-labelledby="video-library-heading">
        <div className="container-extra-wide mx-auto px-4">
          <div className="mx-auto mb-10 max-w-7xl text-center">
            <h2 id="video-library-heading" className="mb-3 text-2xl font-semibold text-white md:text-3xl">
              PostgreSQL Video Library
            </h2>
            <p className="text-white/70">
              {videos.length} PostgreSQL video{videos.length === 1 ? '' : 's'} from{' '}
              <Link
                href={YOUTUBE_CHANNEL.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-400 hover:text-red-300"
              >
                {YOUTUBE_CHANNEL.handle}
              </Link>
            </p>
          </div>

          {videos.length > 0 ? (
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
              {videos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
              <p className="mb-4 text-white/80">Videos could not be loaded right now.</p>
              <Link
                href={YOUTUBE_CHANNEL.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-red-400 hover:text-red-300"
              >
                Visit the YouTube channel
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-white/10 py-16" style={{ backgroundColor: '#111827' }} aria-labelledby="faq-heading">
        <div className="container-extra-wide mx-auto max-w-4xl px-4">
          <h2 id="faq-heading" className="mb-8 text-center text-2xl font-semibold text-white md:text-3xl">
            PostgreSQL Video FAQ
          </h2>
          <div className="space-y-6">
            <article className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="mb-2 text-lg font-semibold text-white">
                Where can I watch free PostgreSQL video tutorials?
              </h3>
              <p className="text-white/75 leading-relaxed">
                You can watch free PostgreSQL tutorials here on pgElephant. This page embeds the full
                library from Dr. Ibrar Ahmed, covering replication, HA, performance, backups, indexing,
                and production DBA workflows.
              </p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="mb-2 text-lg font-semibold text-white">
                What PostgreSQL topics do these videos cover?
              </h3>
              <p className="text-white/75 leading-relaxed">
                Topics include logical replication, high availability, VACUUM and table bloat,
                slow query analysis, EXPLAIN ANALYZE, indexing strategies, backup and PITR,
                database migration, security hardening, checkpoints, and major version upgrades.
              </p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="mb-2 text-lg font-semibold text-white">
                Are these PostgreSQL videos for beginners or DBAs?
              </h3>
              <p className="text-white/75 leading-relaxed">
                Both. The collection includes DBA cheat sheets for daily operations and deeper
                walkthroughs for engineers managing PostgreSQL in production.
              </p>
            </article>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/docs" className="text-cyan-400 hover:text-cyan-300">
              PostgreSQL documentation
            </Link>
            <Link href="/blog" className="text-cyan-400 hover:text-cyan-300">
              PostgreSQL blog
            </Link>
            <Link href="/pgraft" className="text-cyan-400 hover:text-cyan-300">
              PostgreSQL HA with pgraft
            </Link>
            <Link href="/pg-stat-insights" className="text-cyan-400 hover:text-cyan-300">
              PostgreSQL performance analytics
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
