import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'NeuronDB · RAG Pipeline (Chunk → Embed → Rank → Transform)',
  description: 'Build retrieval-augmented generation pipelines directly in PostgreSQL with NeuronDB utilities for chunking, embedding, ranking and transformations.',
}

const tableOfContents: TocItem[] = [
  { id: 'text-chunking', title: 'Text Chunking' },
  { id: 'text-embeddings', title: 'Text Embeddings' },
  { id: 'ranking', title: 'Ranking' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/ml/regression',
  label: 'Regression',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/ml/model-management',
  label: 'Model Management',
}

export default function Page() {
  return (
    <PostgresDocsLayout
      title="RAG Pipeline"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="text-chunking">
        <h2>Text Chunking</h2>
        <p>Split long documents into smaller chunks with overlap to maintain context between chunks.</p>
        <SqlCodeBlock
          title="Overlap-aware chunking"
          code={`WITH long_document AS (
    SELECT 'This is a very long document that needs to be chunked...' as doc
)
SELECT 
    unnest(neurondb.chunk(
        doc,       -- Text to chunk
        100,       -- Chunk size (characters)
        20         -- Overlap (characters)
    )) as chunk
FROM long_document;`}
        />
      </section>

      <section id="text-embeddings">
        <h2>Text Embeddings</h2>
        <p>Generate embeddings from text using various models.</p>
        <SqlCodeBlock
          title="Generate embeddings"
          code={`WITH text_samples AS (
    SELECT 'Machine learning in databases is powerful' as text, 1 as id
    UNION ALL
    SELECT 'PostgreSQL extensions enable ML capabilities' as text, 2 as id
)
SELECT 
    id,
    text,
    neurondb.embed(
        'all-MiniLM-L6-v2',  -- Model name
        text,                 -- Text to embed
        true                  -- Use GPU acceleration
    ) as embedding
FROM text_samples;`}
        />
      </section>

      <section id="ranking">
        <h2>Ranking</h2>
        <p>Rank documents by relevance using various scoring methods.</p>
        <SqlCodeBlock
          title="Rank documents"
          code={`SELECT 
    id,
    content,
    neurondb.rank(
        query_embedding,
        document_embedding,
        'cosine'  -- Distance metric
    ) as relevance_score
FROM documents
ORDER BY relevance_score DESC
LIMIT 10;`}
        />
      </section>

      <section>
        <h2>Next Steps</h2>
        <ul>
          <li><a href="/docs/neurondb/rag">RAG Guide</a> - Complete RAG workflows</li>
          <li><a href="/docs/neurondb/ml/model-management">Model Management</a> - Deploy RAG models</li>
          <li><a href="/docs/neurondb/hybrid">Hybrid Search</a> - Combine with hybrid search</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}
