import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'Hybrid Search PostgreSQL | Vector + Full-Text BM25 - NeuronDB',
  description: 'Combine semantic vector search with BM25 full-text search in PostgreSQL. Reciprocal Rank Fusion (RRF), learning-to-rank, and weighted scoring for best-in-class search relevance.',
  alternates: {
    canonical: 'https://www.pgelephant.com/docs/neurondb/hybrid',
  },
}

const tableOfContents: TocItem[] = [
  { id: 'what-is-hybrid', title: 'What is Hybrid Search?' },
  { id: 'implementation', title: 'Implementation' },
  { id: 'scoring', title: 'Scoring Methods' },
  { id: 'best-practices', title: 'Best Practices' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/indexing',
  label: 'Indexing',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/hybrid/overview',
  label: 'Hybrid Overview',
}

export default function Page() {
  return (
    <PostgresDocsLayout
      title="Hybrid Search"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="what-is-hybrid">
        <h2>What is Hybrid Search?</h2>
        <p>Hybrid search combines <strong>vector similarity</strong> (semantic meaning) with <strong>full-text search</strong> (keyword matching) to provide superior search results that understand both context and exact terms.</p>

        <h3>Vector Search Alone</h3>
        <ul>
          <li>✓ Understands semantic meaning</li>
          <li>✓ Finds conceptually similar content</li>
          <li>✗ May miss exact keyword matches</li>
          <li>✗ Can return loosely related results</li>
        </ul>

        <h3>Full-Text Search Alone</h3>
        <ul>
          <li>✓ Precise keyword matching</li>
          <li>✓ Fast for exact terms</li>
          <li>✗ No semantic understanding</li>
          <li>✗ Misses synonyms and context</li>
        </ul>

        <h3>Hybrid Search = Best of Both</h3>
        <ul>
          <li>Semantic understanding from vector embeddings</li>
          <li>Precise keyword matching from full-text search</li>
          <li>Superior relevance through combined scoring</li>
          <li>Handles both conceptual and exact queries</li>
        </ul>
      </section>

      <section id="implementation">
        <h2>Implementation</h2>

        <h3>Basic Hybrid Query</h3>
        <SqlCodeBlock
          title="Hybrid search query"
          code={`WITH vector_results AS (
  SELECT id, content,
         embedding <=> embed_text('PostgreSQL replication') AS distance
  FROM documents
  ORDER BY distance
  LIMIT 20
),
text_results AS (
  SELECT id, content,
         ts_rank(to_tsvector('english', content), 
                 to_tsquery('english', 'PostgreSQL & replication')) AS rank
  FROM documents
  WHERE to_tsvector('english', content) @@ to_tsquery('english', 'PostgreSQL & replication')
  ORDER BY rank DESC
  LIMIT 20
)
SELECT 
  COALESCE(v.id, t.id) AS id,
  COALESCE(v.content, t.content) AS content,
  COALESCE(1.0 - v.distance, 0.0) * 0.6 + COALESCE(t.rank, 0.0) * 0.4 AS score
FROM vector_results v
FULL OUTER JOIN text_results t ON v.id = t.id
ORDER BY score DESC
LIMIT 10;`}
        />
      </section>

      <section id="scoring">
        <h2>Scoring Methods</h2>

        <h3>Weighted Sum</h3>
        <p>Combine vector and text scores with weights.</p>
        <SqlCodeBlock
          title="Weighted scoring"
          code={`SELECT id, content,
       (1.0 - vector_distance) * 0.7 + text_rank * 0.3 AS hybrid_score
FROM (
  SELECT id, content,
         embedding <=> embed_text('query') AS vector_distance,
         ts_rank(to_tsvector('english', content), query_fts) AS text_rank
  FROM documents, to_tsquery('english', 'query') AS query_fts
) combined
ORDER BY hybrid_score DESC
LIMIT 10;`}
        />

        <h3>Reciprocal Rank Fusion (RRF)</h3>
        <p>Combine rankings using RRF algorithm.</p>
        <SqlCodeBlock
          title="RRF scoring"
          code={`WITH vector_ranked AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY embedding <=> embed_text('query')) AS v_rank
  FROM documents
),
text_ranked AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY ts_rank(...) DESC) AS t_rank
  FROM documents
  WHERE to_tsvector('english', content) @@ to_tsquery('english', 'query')
)
SELECT v.id,
       1.0 / (60 + v.v_rank) + 1.0 / (60 + t.t_rank) AS rrf_score
FROM vector_ranked v
JOIN text_ranked t ON v.id = t.id
ORDER BY rrf_score DESC
LIMIT 10;`}
        />
      </section>

      <section id="best-practices">
        <h2>Best Practices</h2>
        <ul>
          <li>Use appropriate weights based on your use case (typically 60-70% vector, 30-40% text)</li>
          <li>Normalize scores from both sources before combining</li>
          <li>Consider reranking top-K results with cross-encoders</li>
          <li>Monitor recall and precision metrics</li>
        </ul>
      </section>

      <section>
        <h2>Next Steps</h2>
        <ul>
          <li><a href="/docs/neurondb/hybrid/overview">Hybrid Overview</a> - Detailed hybrid retrieval guide</li>
          <li><a href="/docs/neurondb/reranking/overview">Reranking</a> - Improve relevance with reranking</li>
          <li><a href="/docs/neurondb/rag">RAG Pipelines</a> - Build RAG applications</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}
