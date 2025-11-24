import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'ColBERT Reranking | NeuronDB Reranking',
  description: 'Late interaction models for efficient reranking using ColBERT in NeuronDB.',
}

const tableOfContents: TocItem[] = [
  { id: 'overview', title: 'Overview' },
  { id: 'colbert-reranking', title: 'ColBERT Reranking' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/reranking/llm-reranking',
  label: 'LLM Reranking',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/reranking/ensemble',
  label: 'Ensemble Reranking',
}

export default function ColBERTPage() {
  return (
    <PostgresDocsLayout
      title="ColBERT Reranking"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="overview">
        <h2>Overview</h2>
        <p>Late interaction models for efficient reranking.</p>
      </section>

      <section id="colbert-reranking">
        <h2>ColBERT Reranking</h2>
        <SqlCodeBlock
          title="ColBERT reranking"
          code={`-- ColBERT reranking
SELECT idx, score FROM rerank_colbert(
    'query text',
    ARRAY['doc 1', 'doc 2', 'doc 3'],
    'colbert-base-msmarco',
    5
);`}
        />
      </section>

      <section>
        <h2>Learn More</h2>
        <p>
          For detailed documentation on ColBERT models, late interaction, and efficiency optimization, visit:{' '}
          <a href="https://pgelephant.com/neurondb/reranking/colbert/" target="_blank" rel="noopener noreferrer">
            ColBERT Documentation
          </a>
        </p>
      </section>

      <section>
        <h2>Related Topics</h2>
        <ul>
          <li><a href="/docs/neurondb/reranking/cross-encoder">Cross-Encoder</a> - Neural reranking</li>
          <li><a href="/docs/neurondb/reranking/ensemble">Ensemble</a> - Combine strategies</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}

