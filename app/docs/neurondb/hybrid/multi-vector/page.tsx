import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'Multi-Vector Search | NeuronDB Hybrid Search',
  description: 'Use multiple embeddings per document for enhanced retrieval in NeuronDB.',
}

const tableOfContents: TocItem[] = [
  { id: 'overview', title: 'Overview' },
  { id: 'store-multiple-embeddings', title: 'Store Multiple Embeddings' },
  { id: 'multi-vector-search', title: 'Multi-Vector Search' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/hybrid/overview',
  label: 'Hybrid Search Overview',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/hybrid/faceted-search',
  label: 'Faceted Search',
}

export default function MultiVectorPage() {
  return (
    <PostgresDocsLayout
      title="Multi-Vector"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="overview">
        <h2>Overview</h2>
        <p>Use multiple embeddings per document for enhanced retrieval.</p>
      </section>

      <section id="store-multiple-embeddings">
        <h2>Store Multiple Embeddings</h2>
        <SqlCodeBlock
          title="Create table with multiple embeddings"
          code={`-- Create table with multiple embeddings
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    content TEXT,
    title_embedding vector(384),
    content_embedding vector(384),
    summary_embedding vector(384)
);`}
        />
      </section>

      <section id="multi-vector-search">
        <h2>Multi-Vector Search</h2>
        <p>Search across multiple embeddings:</p>
        <SqlCodeBlock
          title="Search with multiple vectors"
          code={`-- Search with multiple vectors
SELECT id, content,
       multi_vector_search(
           embed_text('query'),
           ARRAY[
               title_embedding,
               content_embedding,
               summary_embedding
           ],
           ARRAY[0.2, 0.6, 0.2]  -- weights per embedding
       ) AS combined_score
FROM documents
ORDER BY combined_score DESC
LIMIT 10;`}
        />
      </section>

      <section>
        <h2>Learn More</h2>
        <p>
          For detailed documentation on multi-vector strategies, embedding selection, weight optimization, and performance tuning, visit:{' '}
          <a href="https://www.pgelephant.com/docs/neurondb/hybrid/multi-vector" target="_blank" rel="noopener noreferrer">
            Multi-Vector Documentation
          </a>
        </p>
      </section>

      <section>
        <h2>Related Topics</h2>
        <ul>
          <li><a href="/docs/neurondb/hybrid/overview">Hybrid Search</a> - Combine multiple search types</li>
          <li><a href="/docs/neurondb/indexing">Vector Search</a> - Vector similarity</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}

