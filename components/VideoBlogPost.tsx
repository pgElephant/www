import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import type { TopicHubConfig } from '@/config/topics'
import { formatPublishedDate, type YouTubeVideo } from '@/lib/youtube'
import {
  buildVideoBlogBody,
  getMatchedChannelEntry,
} from '@/lib/video-blog'
import { generateVideoBlogStructuredData } from '@/config/seo'
import { TechnicalCodeBlock } from '@/components/TechnicalCodeBlock'
import { TechnicalDiagram } from '@/components/TechnicalDiagram'
import type { ChannelIndexEntry } from '@/lib/channel-content'

type ArticleSection = NonNullable<ChannelIndexEntry['sections']>[number]
type ArticleExample = NonNullable<ChannelIndexEntry['examples']>[number]
type ArticleReference = NonNullable<ChannelIndexEntry['references']>[number]

function contentTokens(value: string): Set<string> {
  const ignored = new Set([
    'about',
    'after',
    'before',
    'from',
    'into',
    'only',
    'that',
    'this',
    'with',
    'where',
    'select',
  ])
  return new Set(
    value
      .toLowerCase()
      .replace(/[^a-z0-9_]+/g, ' ')
      .split(' ')
      .filter((token) => token.length > 3 && !ignored.has(token))
  )
}

function placeExamples(
  sections: ArticleSection[],
  examples: ArticleExample[]
): Map<number, ArticleExample[]> {
  const placements = new Map<number, ArticleExample[]>()
  const sectionTokens = sections.map((section) =>
    contentTokens(`${section.heading} ${section.paragraphs.join(' ')}`)
  )

  examples.forEach((example, exampleIndex) => {
    const exampleTokens = contentTokens(
      `${example.sectionHint || ''} ${example.code}`
    )
    let bestIndex = -1
    let bestScore = 0
    sectionTokens.forEach((tokens, sectionIndex) => {
      let score = 0
      exampleTokens.forEach((token) => {
        if (tokens.has(token)) score += 1
      })
      if (score > bestScore) {
        bestScore = score
        bestIndex = sectionIndex
      }
    })
    if (bestIndex < 0) {
      bestIndex = Math.min(
        sections.length - 1,
        Math.floor(((exampleIndex + 1) * sections.length) / (examples.length + 1))
      )
    }
    if ((placements.get(bestIndex)?.length || 0) >= 2) {
      const proportionalIndex = Math.min(
        sections.length - 1,
        Math.floor(((exampleIndex + 1) * sections.length) / (examples.length + 1))
      )
      bestIndex =
        sections.findIndex(
          (_, offset) =>
            (placements.get((proportionalIndex + offset) % sections.length)
              ?.length || 0) < 2
        ) + proportionalIndex
      bestIndex %= sections.length
    }
    const current = placements.get(bestIndex) || []
    current.push(example)
    placements.set(bestIndex, current)
  })

  return placements
}

function placeReferences(
  sections: ArticleSection[],
  references: ArticleReference[]
): Map<number, ArticleReference[]> {
  const placements = new Map<number, ArticleReference[]>()
  const sectionTokens = sections.map((section) =>
    contentTokens(`${section.heading} ${section.paragraphs.join(' ')}`)
  )

  references.forEach((reference, referenceIndex) => {
    const referenceTokens = contentTokens(reference.claim)
    let bestIndex = 0
    let bestScore = -1
    sectionTokens.forEach((tokens, sectionIndex) => {
      let score = 0
      referenceTokens.forEach((token) => {
        if (tokens.has(token)) score += 1
      })
      if (
        score > bestScore &&
        (placements.get(sectionIndex)?.length || 0) < 2
      ) {
        bestScore = score
        bestIndex = sectionIndex
      }
    })
    if (bestScore <= 0) {
      bestIndex = Math.min(
        sections.length - 1,
        Math.floor(
          ((referenceIndex + 1) * sections.length) / (references.length + 1)
        )
      )
    }
    const current = placements.get(bestIndex) || []
    current.push(reference)
    placements.set(bestIndex, current)
  })

  return placements
}

function referenceLabel(reference: ArticleReference): string {
  if (reference.url.includes('postgresql.org')) {
    return 'PostgreSQL documentation'
  }
  if (reference.url.includes('docs.aws.amazon.com')) {
    return 'AWS documentation'
  }
  return reference.reference || 'Technical source'
}

export function VideoBlogPost({
  topic,
  video,
}: {
  topic: TopicHubConfig
  video: YouTubeVideo
}) {
  const paragraphs = buildVideoBlogBody(video, topic.topicLabel, topic.path)
  const published = formatPublishedDate(video.publishedAt)
  const matched = getMatchedChannelEntry(topic.path, video)
  const structuredData = generateVideoBlogStructuredData(topic, video)
  const sections = matched?.sections?.filter(
    (section) => section.heading && section.paragraphs.length
  )
  const examples = matched?.examples ?? []
  const references = matched?.references ?? []
  const hasStructuredArticle = Boolean(sections?.length)
  const inlineExamples = sections?.length
    ? placeExamples(sections, examples)
    : new Map<number, ArticleExample[]>()
  const inlineReferences = sections?.length
    ? placeReferences(sections, references)
    : new Map<number, ArticleReference[]>()
  const articleText = sections?.length
    ? sections.flatMap((section) => section.paragraphs).join(' ')
    : paragraphs.join(' ')
  const wordCount = articleText.trim().split(/\s+/).filter(Boolean).length
  const readingMinutes = Math.max(3, Math.ceil(wordCount / 220))
  const isIndexGuide =
    topic.path === 'postgresql' &&
    /database indexes.*production troubleshooting/i.test(video.title)

  return (
    <main className={`min-h-screen ${topic.shellClass}`}>
      <article className="mx-auto max-w-4xl px-5 py-12 sm:px-6 sm:py-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <p className="mb-8 text-sm text-stone-500">
          <Link href="/" className="hover:text-stone-300">
            Home
          </Link>
          <span className="mx-2" aria-hidden="true">
            /
          </span>
          <Link href={`/${topic.path}`} className="hover:text-stone-300">
            {topic.title}
          </Link>
          <span className="mx-2" aria-hidden="true">
            /
          </span>
          <span className="text-stone-400">Article</span>
        </p>

        <header className="mb-10 border-b border-stone-800 pb-8">
          <p className={`mb-4 text-[11px] font-medium uppercase tracking-[0.22em] ${topic.accentTextClass}`}>
            {topic.channel.name}
          </p>
          <h1 className="font-serif text-3xl font-medium leading-[1.15] tracking-tight text-stone-50 sm:text-[2.75rem]">
            {video.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-stone-500">
            <span>Dr. Ibrar Ahmed</span>
            {published && (
              <time dateTime={video.publishedAt}>{published}</time>
            )}
            <span>{readingMinutes} min read</span>
            {matched?.source ? <span>From the lecture notes</span> : null}
          </div>
        </header>

        <div className="relative mb-10 aspect-video overflow-hidden border border-stone-800 bg-black">
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

        {isIndexGuide ? (
          <section className="mb-12 border border-sky-900/40 bg-sky-950/[0.12]">
            <div className="border-b border-sky-900/30 px-5 py-4 sm:px-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-400">
                Measured in the five-million-row lab
              </p>
            </div>
            <div className="grid grid-cols-2 divide-x divide-y divide-sky-900/30 sm:grid-cols-4 sm:divide-y-0">
              {[
                ['5M', 'Rows tested'],
                ['4.8s', 'Baseline'],
                ['12ms', 'Correct index'],
                ['399x', 'Improvement'],
              ].map(([value, label]) => (
                <div key={label} className="px-5 py-5 sm:px-6">
                  <p className="font-serif text-2xl text-sky-100">{value}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-stone-500">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {hasStructuredArticle && (
          <aside className={`mb-12 border-l-2 ${topic.accentBorderClass} bg-black/20 px-5 py-5 sm:px-6`}>
            <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${topic.accentTextClass}`}>
              In this article
            </p>
            <ol className="mt-4 grid gap-x-8 gap-y-2 text-sm text-stone-400 sm:grid-cols-2">
              {sections?.map((section, index) => (
                <li key={`${index}-${section.heading}`}>
                  <a
                    href={`#section-${index + 1}`}
                    className="group flex gap-3 transition hover:text-stone-100"
                  >
                    <span className="font-mono text-xs text-stone-600">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span>{section.heading}</span>
                  </a>
                </li>
              ))}
            </ol>
          </aside>
        )}

        {matched?.takeaways?.length ? (
          <section className="mb-12 border-y border-stone-800 py-7">
            <h2 className="font-serif text-2xl font-medium text-stone-100">
              What you will learn
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {matched.takeaways.map((takeaway) => (
                <li
                  key={takeaway}
                  className="flex gap-3 text-sm leading-relaxed text-stone-400"
                >
                  <span
                    className={`mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full ${topic.accentBarClass}`}
                    aria-hidden="true"
                  />
                  {takeaway}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <TechnicalDiagram title={video.title} topic={topic.path} />

        {hasStructuredArticle ? (
          <div className="space-y-14">
            {sections?.map((section, sectionIndex) => (
              <section
                id={`section-${sectionIndex + 1}`}
                key={`${sectionIndex}-${section.heading}`}
                className="scroll-mt-24"
              >
                <div className="mb-6 flex items-baseline gap-4 border-b border-stone-800 pb-4">
                  <span className="font-mono text-xs text-stone-600">
                    {String(sectionIndex + 1).padStart(2, '0')}
                  </span>
                  <h2 className="font-serif text-2xl font-medium tracking-tight text-stone-100 sm:text-3xl">
                    {section.heading}
                  </h2>
                </div>
                <div className="space-y-6 text-[1.05rem] leading-[1.85] text-stone-300">
                  {section.paragraphs.map((paragraph, paragraphIndex) => (
                    <p key={`${paragraphIndex}-${paragraph.slice(0, 32)}`}>
                      {paragraph}
                      {paragraphIndex === section.paragraphs.length - 1 &&
                      inlineReferences.get(sectionIndex)?.length ? (
                        <>
                          <span className="text-stone-500"> Sources: </span>
                          {inlineReferences
                            .get(sectionIndex)
                            ?.map((reference, referenceIndex, sectionReferences) => (
                              <span key={`${reference.claim}-${referenceIndex}`}>
                                <a
                                  href={reference.url || video.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title={referenceLabel(reference)}
                                  className="text-sky-400 underline decoration-sky-400/30 underline-offset-4 transition hover:text-sky-300 hover:decoration-current"
                                >
                                  {reference.claim}
                                </a>
                                {referenceIndex < sectionReferences.length - 1
                                  ? ', '
                                  : '.'}
                              </span>
                            ))}
                        </>
                      ) : null}
                    </p>
                  ))}
                </div>
                {inlineExamples.get(sectionIndex)?.length ? (
                  <div className="mt-8">
                    {inlineExamples.get(sectionIndex)?.map((example, index) => (
                      <TechnicalCodeBlock
                        key={`${example.source}-${index}`}
                        code={example.code}
                        language={example.language}
                        title={example.title}
                        result={example.result}
                        resultLabel={example.resultLabel}
                      />
                    ))}
                  </div>
                ) : null}
              </section>
            ))}
          </div>
        ) : (
          <div className="space-y-6 text-[1.05rem] leading-[1.85] text-stone-300">
            {paragraphs.map((paragraph, index) => (
              <p key={`${index}-${paragraph.slice(0, 32)}`}>{paragraph}</p>
            ))}
          </div>
        )}

        <footer className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-stone-800 pt-7 text-sm">
          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-stone-200 underline-offset-4 hover:underline"
          >
            Watch on YouTube
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          <a
            href={topic.channel.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-stone-400 underline-offset-4 hover:text-stone-200 hover:underline"
          >
            {topic.channel.handle}
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          <Link
            href={`/${topic.path}`}
            className="text-stone-400 underline-offset-4 hover:text-stone-200 hover:underline"
          >
            More {topic.title} articles
          </Link>
        </footer>
      </article>
    </main>
  )
}
