import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'Temporal Search | NeuronDB Hybrid Search',
  description: 'Time-decay relevance scoring for time-aware retrieval in NeuronDB.',
}

const tableOfContents: TocItem[] = [
  { id: 'overview', title: 'Overview' },
  { id: 'temporal-search-query', title: 'Temporal Search Query' },
  { id: 'time-weighted-ranking', title: 'Time-Weighted Ranking' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/hybrid/faceted-search',
  label: 'Faceted Search',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/reranking/overview',
  label: 'Reranking Overview',
}

export default function TemporalSearchPage() {
  return (
    <PostgresDocsLayout
      title="Temporal Search"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="overview">
        <h2>Overview</h2>
        <p>Time-decay relevance scoring for time-aware retrieval.</p>
      </section>

      <section id="temporal-search-query">
        <h2>Temporal Search Query</h2>
        <p>Apply time decay to relevance scores:</p>
        <SqlCodeBlock
          title="Temporal search with decay"
          code={`-- Temporal search with decay
SELECT * FROM temporal_search(
    'documents',
    embed_text('query'),
    'timestamp_column',
    INTERVAL '30 days',  -- decay period
    0.5,                 -- decay factor
    10                   -- top K
);`}
        />
      </section>

      <section id="time-weighted-ranking">
        <h2>Time-Weighted Ranking</h2>
        <p>Boost recent documents:</p>
        <SqlCodeBlock
          title="Time-weighted hybrid search"
          code={`-- Time-weighted hybrid search
SELECT id, content,
       temporal_hybrid_score(
           embed_text('query'),
           embedding,
           created_at,
           INTERVAL '7 days',
           0.3  -- time weight
       ) AS score
FROM documents
ORDER BY score DESC
LIMIT 10;`}
        />
      </section>

      <section>
        <h2>Learn More</h2>
        <p>
          For detailed documentation on temporal search, decay functions, time windowing, and freshness scoring, visit:{' '}
          <a href="https://www.pgelephant.com/docs/neurondb/hybrid/temporal-search" target="_blank" rel="noopener noreferrer">
            Temporal Search Documentation
          </a>
        </p>
      </section>

      <section>
        <h2>Related Topics</h2>
        <ul>
          <li><a href="/docs/neurondb/hybrid/overview">Hybrid Search</a> - Combined search</li>
          <li><a href="/docs/neurondb/hybrid/faceted-search">Faceted Search</a> - Category filtering</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}

