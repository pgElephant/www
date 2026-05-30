export interface YouTubeVideo {
  id: string
  title: string
  description?: string
  publishedAt: string
  thumbnailUrl: string
  url: string
}

export interface YouTubeChannelConfig {
  handle: string
  id: string
  url: string
  name: string
}

export const YOUTUBE_CHANNEL: YouTubeChannelConfig = {
  handle: '@DrIbrarAhmed',
  id: 'UCn-OaZ1f3NaEJZu_8T5GM0g',
  url: 'https://www.youtube.com/@DrIbrarAhmed',
  name: 'PostgreSQL with Dr. Ibrar Ahmed',
}

export const YOUTUBE_CHANNEL_AI: YouTubeChannelConfig = {
  handle: '@DrIbrarAhmedAI',
  id: 'UCGMbodcC3rLHEI96xPZyy0Q',
  url: 'https://www.youtube.com/@DrIbrarAhmedAI',
  name: 'AI With Dr. Ibrar Ahmed',
}

const USER_AGENT = 'Mozilla/5.0 (compatible; pgElephant/1.0)'

function decodeXml(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
}

function parseRssEntries(xml: string): YouTubeVideo[] {
  const entries = xml.split('<entry>').slice(1)
  const videos: YouTubeVideo[] = []

  for (const entry of entries) {
    const id = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1]
    const title = entry.match(/<media:title>([^<]+)<\/media:title>/)?.[1]
    const publishedAt = entry.match(/<published>([^<]+)<\/published>/)?.[1]
    const description = entry.match(/<media:description>([\s\S]*?)<\/media:description>/)?.[1]
    const thumbnailUrl = entry.match(/<media:thumbnail url="([^"]+)"/)?.[1]

    if (!id || !title || !publishedAt) {
      continue
    }

    videos.push({
      id,
      title: decodeXml(title),
      description: description ? decodeXml(description.trim()) : undefined,
      publishedAt,
      thumbnailUrl: thumbnailUrl ?? `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      url: `https://www.youtube.com/watch?v=${id}`,
    })
  }

  return videos
}

async function fetchVideoIdsFromChannelPage(channel: YouTubeChannelConfig): Promise<string[]> {
  const response = await fetch(`${channel.url}/videos`, {
    headers: { 'User-Agent': USER_AGENT },
    next: { revalidate: 3600 },
  })

  if (!response.ok) {
    return []
  }

  const html = await response.text()
  const ids = new Set<string>()
  let match: RegExpExecArray | null

  const pattern = /"videoId":"([a-zA-Z0-9_-]{11})"/g
  while ((match = pattern.exec(html)) !== null) {
    ids.add(match[1])
  }

  return Array.from(ids)
}

function decodeJsonString(value: string): string {
  return value
    .replace(/\\n/g, '\n')
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'")
    .replace(/\\\\/g, '\\')
    .replace(/\\u0026/g, '&')
}

async function fetchVideoWatchMetadata(
  videoId: string
): Promise<Pick<YouTubeVideo, 'publishedAt' | 'description'>> {
  const response = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
    headers: { 'User-Agent': USER_AGENT },
    next: { revalidate: 86400 },
  })

  if (!response.ok) {
    return { publishedAt: '', description: undefined }
  }

  const html = await response.text()
  const publishedAt = html.match(/"uploadDate":"([^"]+)"/)?.[1] ?? ''
  const shortDescription = html.match(/"shortDescription":"((?:\\.|[^"\\])*)"/)?.[1]

  return {
    publishedAt,
    description: shortDescription ? decodeJsonString(shortDescription).trim() : undefined,
  }
}

async function fetchOembedVideo(videoId: string): Promise<YouTubeVideo | null> {
  const response = await fetch(
    `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
    { next: { revalidate: 86400 } }
  )

  if (!response.ok) {
    return null
  }

  const data = (await response.json()) as {
    title: string
    thumbnail_url: string
  }

  const watchMetadata = await fetchVideoWatchMetadata(videoId)

  return {
    id: videoId,
    title: data.title,
    publishedAt: watchMetadata.publishedAt,
    description: watchMetadata.description,
    thumbnailUrl: data.thumbnail_url,
    url: `https://www.youtube.com/watch?v=${videoId}`,
  }
}

async function enrichVideoMetadata(video: YouTubeVideo): Promise<YouTubeVideo> {
  if (video.publishedAt && video.description) {
    return video
  }

  const watchMetadata = await fetchVideoWatchMetadata(video.id)

  return {
    ...video,
    publishedAt: video.publishedAt || watchMetadata.publishedAt,
    description: video.description || watchMetadata.description,
  }
}

export async function fetchChannelVideos(
  channel: YouTubeChannelConfig = YOUTUBE_CHANNEL
): Promise<YouTubeVideo[]> {
  const [rssResponse, scrapedIds] = await Promise.all([
    fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channel.id}`, {
      next: { revalidate: 3600 },
    }),
    fetchVideoIdsFromChannelPage(channel),
  ])

  const videosById = new Map<string, YouTubeVideo>()

  if (rssResponse.ok) {
    const xml = await rssResponse.text()
    for (const video of parseRssEntries(xml)) {
      videosById.set(video.id, video)
    }
  }

  const missingIds = scrapedIds.filter((id) => !videosById.has(id))
  const oembedVideos = await Promise.all(missingIds.map((id) => fetchOembedVideo(id)))

  for (const video of oembedVideos) {
    if (video) {
      videosById.set(video.id, video)
    }
  }

  const enrichedVideos = await Promise.all(
    Array.from(videosById.values()).map((video) => enrichVideoMetadata(video))
  )

  return enrichedVideos.sort((a, b) => {
    const aTime = a.publishedAt ? Date.parse(a.publishedAt) : 0
    const bTime = b.publishedAt ? Date.parse(b.publishedAt) : 0
    return bTime - aTime
  })
}

export function formatPublishedDate(isoDate: string): string | null {
  if (!isoDate) {
    return null
  }

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(isoDate))
}
