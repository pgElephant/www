import videoCache from '@/data/youtube-videos.json';

export interface YouTubeVideo {
  id: string;
  title: string;
  description?: string;
  publishedAt: string;
  thumbnailUrl: string;
  url: string;
  durationSeconds?: number;
  isShort?: boolean;
}

export interface YouTubeChannelConfig {
  handle: string;
  id: string;
  url: string;
  name: string;
  logo: string;
  banner?: string;
}

export const YOUTUBE_CHANNEL: YouTubeChannelConfig = {
  handle: '@DrIbrarAhmed',
  id: 'UCn-OaZ1f3NaEJZu_8T5GM0g',
  url: 'https://www.youtube.com/@DrIbrarAhmed',
  name: 'PostgreSQL Mechanics',
  logo: '/channels/postgresql-mechanics.jpg',
  banner: '/channels/postgresql-banner.jpg',
};

export const YOUTUBE_CHANNEL_AI: YouTubeChannelConfig = {
  handle: '@DrIbrarAhmedAI',
  id: 'UCGMbodcC3rLHEI96xPZyy0Q',
  url: 'https://www.youtube.com/@DrIbrarAhmedAI',
  name: 'AI Mechanics',
  logo: '/channels/ai-mechanics.jpg',
  banner: '/channels/ai-banner.jpg',
};

export const YOUTUBE_CHANNEL_CYBER: YouTubeChannelConfig = {
  handle: '@DrIbrarCyberSecurity',
  id: 'UCLHMt_5urzRSg1T8rs0V2Jg',
  url: 'https://www.youtube.com/@DrIbrarCyberSecurity',
  name: 'Cyber Mechanics',
  logo: '/channels/cyber-mechanics.jpg',
  banner: '/channels/cyber-banner.jpg',
};

const USER_AGENT = 'Mozilla/5.0 (compatible; DrIbrarAhmedSite/1.0)';
const MIN_LONG_FORM_SECONDS = 90;
const KNOWN_SHORT_VIDEO_IDS = new Set([
  '62VNgSdoc6E',
  '_uppjqKvp1w',
  '0wR4BuQMA50',
  '0DCk7wqvTlA',
  'svYSrl9IWc0',
  'iGCTjhALxTs',
  'PVFRCS6pt84',
  'OayiK01eebY',
  'LcfV4xbUQoo',
  'mUKrnvYYsWA',
  'KZJeLiRIxug',
  's6_yGxEeps4',
  'eK34XNKmJoE',
  'dZq9ooSxehU',
  'V-OSxCbAw78',
  'vBP7AaVQ6E4',
  '8KktbKngGjs',
  'FE0Vw1LTJWo',
]);

const VIDEO_CACHE_BY_CHANNEL_ID: Record<string, YouTubeVideo[]> = {
  [YOUTUBE_CHANNEL.id]: videoCache.postgresql as YouTubeVideo[],
  [YOUTUBE_CHANNEL_AI.id]: videoCache.ai as YouTubeVideo[],
  [YOUTUBE_CHANNEL_CYBER.id]: videoCache.cybersecurity as YouTubeVideo[],
};

function decodeXml(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function looksLikeShortByTitle(title: string): boolean {
  const t = title.toLowerCase();
  return (
    /#shorts?\b/.test(t) ||
    /\bshorts?\b/.test(t) ||
    /\bvertical\b/.test(t) ||
    /\b\d{1,2}\s*sec(onds)?\b/.test(t) ||
    /\b\d{1,2}s\b/.test(t)
  );
}

function looksLikeShortByDescription(description?: string): boolean {
  if (!description) return false;
  if (/\bai shorts?\b/i.test(description)) return true;
  const durationHint = description.match(
    /(?:^|\[|\()\s*(\d{1,3})\s*(?:seconds?|secs?|s)\s*(?:\]|\)|:|$)/i
  );
  return durationHint ? Number(durationHint[1]) < MIN_LONG_FORM_SECONDS : false;
}

function parseRssEntries(xml: string): YouTubeVideo[] {
  const entries = xml.split('<entry>').slice(1);
  const videos: YouTubeVideo[] = [];

  for (const entry of entries) {
    const id = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
    const title = entry.match(/<media:title>([^<]+)<\/media:title>/)?.[1];
    const publishedAt = entry.match(/<published>([^<]+)<\/published>/)?.[1];
    const description = entry.match(/<media:description>([\s\S]*?)<\/media:description>/)?.[1];
    const thumbnailUrl = entry.match(/<media:thumbnail url="([^"]+)"/)?.[1];

    if (!id || !title || !publishedAt) {
      continue;
    }

    const decodedTitle = decodeXml(title);
    videos.push({
      id,
      title: decodedTitle,
      description: description ? decodeXml(description.trim()) : undefined,
      publishedAt,
      thumbnailUrl: thumbnailUrl ?? `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      url: `https://www.youtube.com/watch?v=${id}`,
      isShort: looksLikeShortByTitle(decodedTitle) || looksLikeShortByDescription(description),
    });
  }

  return videos;
}

async function fetchVideoIdsFromChannelPage(channel: YouTubeChannelConfig): Promise<string[]> {
  const response = await fetch(`${channel.url}/videos`, {
    headers: { 'User-Agent': USER_AGENT },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    return [];
  }

  const html = await response.text();
  const ids = new Set<string>();
  let match: RegExpExecArray | null;

  const pattern = /"videoId":"([a-zA-Z0-9_-]{11})"/g;
  while ((match = pattern.exec(html)) !== null) {
    ids.add(match[1]);
  }

  return Array.from(ids);
}

function decodeJsonString(value: string): string {
  return value
    .replace(/\\n/g, '\n')
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'")
    .replace(/\\\\/g, '\\')
    .replace(/\\u0026/g, '&');
}

function parseIso8601Duration(value: string): number | undefined {
  const match = value.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return undefined;
  const hours = Number(match[1] || 0);
  const minutes = Number(match[2] || 0);
  const seconds = Number(match[3] || 0);
  return hours * 3600 + minutes * 60 + seconds;
}

async function fetchVideoWatchMetadata(videoId: string): Promise<{
  publishedAt: string;
  description?: string;
  durationSeconds?: number;
  isShort?: boolean;
}> {
  const response = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
    headers: { 'User-Agent': USER_AGENT },
    next: { revalidate: 86400 },
  });

  if (!response.ok) {
    return { publishedAt: '' };
  }

  const html = await response.text();
  const publishedAt = html.match(/"uploadDate":"([^"]+)"/)?.[1] ?? '';
  const shortDescription = html.match(/"shortDescription":"((?:\\.|[^"\\])*)"/)?.[1];
  const lengthSecondsRaw =
    html.match(/"lengthSeconds":"(\d+)"/)?.[1] || html.match(/"approxDurationMs":"(\d+)"/)?.[1];
  const isoDuration = html.match(/"duration":"(PT[^"]+)"/)?.[1];
  const isShortFlag =
    /"isShortsEligible":true/.test(html) ||
    /"isShortVideo":true/.test(html) ||
    html.includes('/shorts/');

  let durationSeconds: number | undefined;
  if (lengthSecondsRaw) {
    const n = Number(lengthSecondsRaw);
    durationSeconds = n > 100000 ? Math.round(n / 1000) : n;
  } else if (isoDuration) {
    durationSeconds = parseIso8601Duration(isoDuration);
  }

  const isShort =
    isShortFlag ||
    (typeof durationSeconds === 'number' &&
      durationSeconds > 0 &&
      durationSeconds < MIN_LONG_FORM_SECONDS);

  return {
    publishedAt,
    description: shortDescription ? decodeJsonString(shortDescription).trim() : undefined,
    durationSeconds,
    isShort,
  };
}

async function fetchOembedVideo(videoId: string): Promise<YouTubeVideo | null> {
  const response = await fetch(
    `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
    { next: { revalidate: 86400 } }
  );

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as {
    title: string;
    thumbnail_url: string;
  };

  const watchMetadata = await fetchVideoWatchMetadata(videoId);

  return {
    id: videoId,
    title: data.title,
    publishedAt: watchMetadata.publishedAt,
    description: watchMetadata.description,
    thumbnailUrl: data.thumbnail_url,
    url: `https://www.youtube.com/watch?v=${videoId}`,
    durationSeconds: watchMetadata.durationSeconds,
    isShort: watchMetadata.isShort || looksLikeShortByTitle(data.title),
  };
}

async function enrichVideoMetadata(video: YouTubeVideo): Promise<YouTubeVideo> {
  if (video.publishedAt && video.description && typeof video.durationSeconds === 'number') {
    const isShort =
      Boolean(video.isShort) ||
      looksLikeShortByTitle(video.title) ||
      video.durationSeconds < MIN_LONG_FORM_SECONDS;
    return { ...video, isShort };
  }

  const watchMetadata = await fetchVideoWatchMetadata(video.id);
  const durationSeconds = video.durationSeconds ?? watchMetadata.durationSeconds;
  const isShort =
    Boolean(video.isShort) ||
    Boolean(watchMetadata.isShort) ||
    looksLikeShortByTitle(video.title) ||
    (typeof durationSeconds === 'number' && durationSeconds < MIN_LONG_FORM_SECONDS);

  return {
    ...video,
    publishedAt: video.publishedAt || watchMetadata.publishedAt,
    description: video.description || watchMetadata.description,
    durationSeconds,
    isShort,
  };
}

function isLongFormVideo(video: YouTubeVideo): boolean {
  if (KNOWN_SHORT_VIDEO_IDS.has(video.id)) return false;
  if (video.isShort) return false;
  if (looksLikeShortByTitle(video.title)) return false;
  if (looksLikeShortByDescription(video.description)) return false;
  if (typeof video.durationSeconds === 'number' && video.durationSeconds < MIN_LONG_FORM_SECONDS) {
    return false;
  }
  return true;
}

export async function fetchChannelVideos(
  channel: YouTubeChannelConfig = YOUTUBE_CHANNEL,
  options: { limit?: number; includeShorts?: boolean } = {}
): Promise<YouTubeVideo[]> {
  const cached = VIDEO_CACHE_BY_CHANNEL_ID[channel.id] || [];
  if (process.env.YOUTUBE_OFFLINE === '1') {
    const filtered = options.includeShorts ? cached : cached.filter(isLongFormVideo);
    return typeof options.limit === 'number' ? filtered.slice(0, options.limit) : filtered;
  }

  try {
    const videosById = new Map<string, YouTubeVideo>();

    const rssResponse = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${channel.id}`,
      { next: { revalidate: 3600 } }
    );

    if (rssResponse.ok) {
      const xml = await rssResponse.text();
      for (const video of parseRssEntries(xml)) {
        videosById.set(video.id, video);
      }
    }

    if (videosById.size === 0) {
      const scrapedIds = await fetchVideoIdsFromChannelPage(channel);
      const oembedVideos = await Promise.all(
        scrapedIds.slice(0, options.limit ?? 15).map(id => fetchOembedVideo(id))
      );
      for (const video of oembedVideos) {
        if (video) {
          videosById.set(video.id, video);
        }
      }
    }

    if (videosById.size === 0) {
      for (const video of cached) {
        videosById.set(video.id, video);
      }
    }

    const sorted = Array.from(videosById.values()).sort((a, b) => {
      const aTime = a.publishedAt ? Date.parse(a.publishedAt) : 0;
      const bTime = b.publishedAt ? Date.parse(b.publishedAt) : 0;
      return bTime - aTime;
    });

    // Enrich a pool larger than limit so shorts filtering still fills the page.
    const poolSize =
      typeof options.limit === 'number'
        ? Math.max(options.limit * 3, options.limit + 8)
        : sorted.length;
    const enriched = await Promise.all(
      sorted.slice(0, poolSize).map(video => enrichVideoMetadata(video))
    );

    const filtered = options.includeShorts ? enriched : enriched.filter(isLongFormVideo);

    return typeof options.limit === 'number' ? filtered.slice(0, options.limit) : filtered;
  } catch {
    const filtered = options.includeShorts ? cached : cached.filter(isLongFormVideo);
    return typeof options.limit === 'number' ? filtered.slice(0, options.limit) : filtered;
  }
}

export function formatPublishedDate(isoDate: string): string | null {
  if (!isoDate) {
    return null;
  }

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(isoDate));
}
