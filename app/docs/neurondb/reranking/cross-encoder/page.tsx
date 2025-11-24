import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'Cross-Encoder Reranking in NeurondB | rerank_cross_encoder() Guide',
  description: 'Complete guide to cross-encoder reranking in NeurondB using rerank_cross_encoder(), rerank_flash(), and rerank_long_context() functions. Learn how to improve search relevance with neural reranking models, batch processing, and Flash Attention optimization.',
  keywords: [
    'cross-encoder reranking',
    'rerank_cross_encoder',
    'neural reranking',
    'search result reranking',
    'relevance scoring',
    'rerank_flash',
    'Flash Attention reranking',
    'long context reranking',
    'MS MARCO reranking',
    'semantic reranking',
    'query document matching'
  ].join(', '),
  alternates: {
    canonical: 'https://www.pgelephant.com/docs/neurondb/reranking/cross-encoder',
  },
  openGraph: {
    title: 'Cross-Encoder Reranking in NeurondB | Neural Reranking Guide',
    description: 'Improve search relevance with cross-encoder reranking in NeurondB. Complete guide with SQL examples and Flash Attention optimization.',
    type: 'article',
    url: 'https://www.pgelephant.com/docs/neurondb/reranking/cross-encoder',
  },
}

const tableOfContents: TocItem[] = [
  { id: 'overview', title: 'Overview' },
  { id: 'rerank-results', title: 'Rerank Results' },
  { id: 'batch-reranking', title: 'Batch Reranking' },
  { id: 'flash-reranking', title: 'Flash Attention Reranking' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/reranking/overview',
  label: 'Reranking Overview',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/reranking/llm-reranking',
  label: 'LLM Reranking',
}

export default function CrossEncoderPage() {
  return (
    <PostgresDocsLayout
      title="Cross-Encoder Reranking"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="overview">
        <h2>Overview</h2>
        <p>Neural reranking models for improved relevance.</p>
      </section>

      <section id="rerank-results">
        <h2>Rerank Results</h2>
        <p>Rerank search results with cross-encoder models. Cross-encoders process query-document pairs together for more accurate relevance scoring than bi-encoders.</p>
        <SqlCodeBlock
          title="Rerank search results"
          code={`-- Rerank search results using cross-encoder
-- Returns: table with (idx, score) where idx is array index, score is relevance
SELECT 
    idx, 
    score 
FROM rerank_cross_encoder(
    'What is machine learning?',           -- query text
    ARRAY[                                  -- candidate document texts
        'Neural networks tutorial',
        'Deep learning basics',
        'AI history'
    ],
    'ms-marco-MiniLM-L-6-v2',              -- model name (optional, NULL for default)
    3                                       -- top K results to return
)
ORDER BY score DESC;`}
        />
        <p><strong>Function Signature:</strong></p>
        <pre><code>rerank_cross_encoder(
    query TEXT,              -- Query text
    documents TEXT[],        -- Array of candidate document texts
    model_name TEXT,         -- Optional model name (NULL for default)
    top_k INTEGER           -- Number of top results to return
) RETURNS TABLE (
    idx INTEGER,            -- Index in original documents array
    score REAL              -- Relevance score (higher = more relevant)
)</code></pre>
        <p><strong>Common Models:</strong></p>
        <ul>
          <li><code>ms-marco-MiniLM-L-6-v2</code>: Fast, lightweight model (default)</li>
          <li><code>cross-encoder/ms-marco-MiniLM-L-12-v2</code>: Higher accuracy, slower</li>
          <li><code>cross-encoder/ms-marco-electra-base</code>: Best accuracy, slowest</li>
        </ul>
      </section>

      <section id="batch-reranking">
        <h2>Batch Reranking</h2>
        <p>Rerank multiple queries efficiently in a single batch operation. Batch processing is faster than individual calls.</p>
        <SqlCodeBlock
          title="Batch reranking"
          code={`-- Batch reranking for multiple queries
SELECT 
    query_id, 
    idx, 
    score
FROM rerank_cross_encoder_batch(
    ARRAY['query 1', 'query 2'],           -- Array of queries
    ARRAY[                                  -- Array of document arrays (one per query)
        ARRAY['doc 1', 'doc 2'],
        ARRAY['doc 3', 'doc 4']
    ],
    'model_name',                           -- Optional model name
    5                                       -- top K per query
)
ORDER BY query_id, score DESC;`}
        />
        <p><strong>Function Signature:</strong></p>
        <pre><code>rerank_cross_encoder_batch(
    queries TEXT[],         -- Array of query texts
    documents TEXT[][],     -- Array of document arrays (one per query)
    model_name TEXT,        -- Optional model name
    top_k INTEGER          -- Top K results per query
) RETURNS TABLE (
    query_id INTEGER,      -- Index of query in queries array
    idx INTEGER,           -- Index in documents array for that query
    score REAL             -- Relevance score
)</code></pre>
      </section>

      <section id="flash-reranking">
        <h2>Flash Attention Reranking</h2>
        <p>For long contexts, use Flash Attention reranking which is optimized for efficiency:</p>
        <SqlCodeBlock
          title="Flash reranking"
          code={`-- Flash Attention reranking (optimized for long contexts)
SELECT 
    idx,
    score
FROM rerank_flash(
    'machine learning',                    -- query text
    ARRAY[                                  -- candidate documents
        'machine learning algorithms',
        'deep learning models',
        'neural networks'
    ],
    NULL,                                   -- model name (NULL for default)
    3                                       -- top K
)
ORDER BY score DESC;

-- Long context reranking
SELECT 
    idx,
    score
FROM rerank_long_context(
    'query text',
    ARRAY['document 1', 'document 2', 'document 3'],
    8192,                                   -- max context length
    3                                       -- top K
)
ORDER BY score DESC;`}
        />
        <p><strong>Function Signatures:</strong></p>
        <pre><code>rerank_flash(
    query TEXT,
    documents TEXT[],
    model_name TEXT,
    top_k INTEGER
) RETURNS TABLE (idx INTEGER, score REAL)

rerank_long_context(
    query TEXT,
    documents TEXT[],
    max_length INTEGER,    -- Maximum context length
    top_k INTEGER
) RETURNS TABLE (idx INTEGER, score REAL)</code></pre>
      </section>

      <section>
        <h2>Learn More</h2>
        <p>
          For detailed documentation on cross-encoder models, model selection, fine-tuning, and performance optimization, visit:{' '}
          <a href="https://www.pgelephant.com/docs/neurondb/reranking/cross-encoder" target="_blank" rel="noopener noreferrer">
            Cross-Encoder Documentation
          </a>
        </p>
      </section>

      <section>
        <h2>Related Topics</h2>
        <ul>
          <li><a href="/docs/neurondb/reranking/llm-reranking">LLM Reranking</a> - LLM-powered reranking</li>
          <li><a href="/docs/neurondb/reranking/ensemble">Ensemble</a> - Combine reranking strategies</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}

