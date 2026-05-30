import Link from 'next/link'
import { ExternalLink, Play, Sparkles, Youtube } from 'lucide-react'
import type { VideosHubConfig } from '@/config/videos'
import { generateVideosHubStructuredData } from '@/config/seo'
import {
  fetchChannelVideos,
  formatPublishedDate,
  type YouTubeVideo,
} from '@/lib/youtube'

function VideoStructuredData({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

function VideoCard({
  video,
  excerptFallback,
}: {
  video: YouTubeVideo
  excerptFallback: (title: string) => string
}) {
  const publishedLabel = formatPublishedDate(video.publishedAt)
  const excerpt =
    video.description?.split('\n').find((line) => line.trim().length > 0)?.trim() ||
    excerptFallback(video.title)

  return (
    <article
      id={`video-${video.id}`}
      className="scroll-mt-28 overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
    >
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
        <h2 className="mb-2 text-lg font-semibold leading-snug text-white">{video.title}</h2>
        {publishedLabel && (
          <p className="mb-3 text-sm text-white/60">
            <time dateTime={video.publishedAt}>{publishedLabel}</time>
          </p>
        )}
        <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-white/70">{excerpt}</p>
        <Link
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-red-400 transition-colors hover:text-red-300"
        >
          <Play className="h-4 w-4" aria-hidden="true" />
          Watch on YouTube
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}

export async function VideosHubPage({ hub }: { hub: VideosHubConfig }) {
  const videos = await fetchChannelVideos(hub.channel)
  const structuredData = generateVideosHubStructuredData(hub, videos)
  const isAiHub = hub.path === '/videos-ai'
  const accentClass = isAiHub ? 'from-violet-600/20 to-fuchsia-600/20' : 'bg-red-600/20'
  const buttonClass = isAiHub
    ? 'bg-violet-600 hover:bg-violet-500'
    : 'bg-red-600 hover:bg-red-500'
  const Icon = isAiHub ? Sparkles : Youtube

  return (
    <div className="min-h-screen bg-[#111827] pt-0">
      <VideoStructuredData data={structuredData} />

      <main>
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
                  {hub.breadcrumbLabel}
                </li>
              </ol>
            </nav>

            <div className="mb-4 flex justify-center">
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl ${
                  isAiHub ? `bg-gradient-to-br ${accentClass}` : accentClass
                }`}
              >
                <Icon
                  className={`h-8 w-8 ${isAiHub ? 'text-violet-400' : 'text-red-500'}`}
                  aria-hidden="true"
                />
              </div>
            </div>

            <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
              {hub.title}
            </h1>
            <p className="mx-auto mb-6 max-w-3xl text-lg leading-relaxed text-white/80">
              {hub.description}
            </p>
            <p className="mx-auto mb-8 max-w-3xl text-base leading-relaxed text-white/70">
              {hub.intro} Embedded from {hub.channel.name}.
            </p>

            <p className="mx-auto mb-6 max-w-3xl text-base leading-relaxed text-white/70">
              {hub.searchBlurb}
            </p>

            <div className="mb-8 flex flex-wrap justify-center gap-2">
              {hub.topics.map((topic) => (
                <span
                  key={topic}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80"
                >
                  {topic}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href={hub.channel.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white transition-colors ${buttonClass}`}
              >
                <Youtube className="h-5 w-5" aria-hidden="true" />
                Subscribe on YouTube
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </Link>
              {hub.siblingHub && (
                <Link
                  href={hub.siblingHub.href}
                  className="inline-flex max-w-sm flex-col items-start rounded-lg border border-white/20 px-6 py-3 text-left text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  <span>{hub.siblingHub.label}</span>
                  <span className="mt-1 text-xs font-normal text-white/60">
                    {hub.siblingHub.description}
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-16"
        style={{ backgroundColor: '#1f2937' }}
        aria-labelledby="video-library-heading"
      >
        <div className="container-extra-wide mx-auto px-4">
          <div className="mx-auto mb-10 max-w-7xl text-center">
            <h2
              id="video-library-heading"
              className="mb-3 text-2xl font-semibold text-white md:text-3xl"
            >
              {hub.libraryHeading}
            </h2>
            <p className="text-white/70">
              {videos.length} {hub.libraryLabel}
              {videos.length === 1 ? '' : 's'} from{' '}
              <Link
                href={hub.channel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-400 hover:text-red-300"
              >
                {hub.channel.handle}
              </Link>
            </p>
          </div>

          {videos.length > 0 ? (
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
              {videos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  excerptFallback={hub.excerptFallback}
                />
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
              <p className="mb-4 text-white/80">Videos could not be loaded right now.</p>
              <Link
                href={hub.channel.url}
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

      <section
        className="border-t border-white/10 py-16"
        style={{ backgroundColor: '#111827' }}
        aria-labelledby="faq-heading"
      >
        <div className="container-extra-wide mx-auto max-w-4xl px-4">
          <h2
            id="faq-heading"
            className="mb-8 text-center text-2xl font-semibold text-white md:text-3xl"
          >
            {hub.faqHeading}
          </h2>
          <div className="space-y-6">
            {hub.faq.map((item) => (
              <article key={item.question} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="mb-2 text-lg font-semibold text-white">{item.question}</h3>
                <p className="leading-relaxed text-white/75">{item.answer}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm">
            {hub.relatedLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-cyan-400 hover:text-cyan-300">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
      </main>
    </div>
  )
}
