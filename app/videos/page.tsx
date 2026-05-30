import { Metadata } from 'next'
import Link from 'next/link'
import { ExternalLink, Play, Youtube } from 'lucide-react'
import {
  fetchChannelVideos,
  formatPublishedDate,
  YOUTUBE_CHANNEL,
  type YouTubeVideo,
} from '@/lib/youtube'

export const metadata: Metadata = {
  title: 'Videos',
  description:
    'PostgreSQL tutorials and DBA guides from Dr. Ibrar Ahmed — embedded from the official YouTube channel.',
  alternates: {
    canonical: '/videos',
  },
  openGraph: {
    title: 'Videos | pgElephant',
    description:
      'Watch PostgreSQL tutorials, high availability guides, and DBA cheat sheets from Dr. Ibrar Ahmed.',
    url: '/videos',
  },
}

export const revalidate = 3600

function VideoCard({ video }: { video: YouTubeVideo }) {
  const publishedLabel = formatPublishedDate(video.publishedAt)

  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
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
          <p className="mb-4 text-sm text-white/60">{publishedLabel}</p>
        )}
        <Link
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-red-400 transition-colors hover:text-red-300"
        >
          <Play className="h-4 w-4" />
          Watch on YouTube
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  )
}

export default async function VideosPage() {
  const videos = await fetchChannelVideos()

  return (
    <div className="min-h-screen bg-[#111827] pt-0">
      <section className="relative flex h-[360px] items-center overflow-hidden pt-20 text-center">
        <div className="container-extra-wide relative z-10 mx-auto w-full px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-4 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600/20">
                <Youtube className="h-8 w-8 text-red-500" />
              </div>
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
              Videos
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-white/80">
              PostgreSQL tutorials, high availability walkthroughs, and DBA cheat sheets from{' '}
              {YOUTUBE_CHANNEL.name}.
            </p>
            <Link
              href={YOUTUBE_CHANNEL.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-500"
            >
              <Youtube className="h-5 w-5" />
              Subscribe on YouTube
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16" style={{ backgroundColor: '#1f2937' }}>
        <div className="container-extra-wide mx-auto px-4">
          <div className="mx-auto mb-10 max-w-7xl text-center">
            <p className="text-white/70">
              {videos.length} video{videos.length === 1 ? '' : 's'} from{' '}
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
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
