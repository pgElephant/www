import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'LLM Reranking | NeuronDB Reranking',
  description: 'GPT/Claude-powered scoring for reranking using LLM models in NeuronDB.',
}

const tableOfContents: TocItem[] = [
  { id: 'overview', title: 'Overview' },
  { id: 'llm-reranking', title: 'LLM Reranking' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/reranking/cross-encoder',
  label: 'Cross-Encoder',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/reranking/colbert',
  label: 'ColBERT',
}

export default function LLMRerankingPage() {
  return (
    <PostgresDocsLayout
      title="LLM Reranking"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="overview">
        <h2>Overview</h2>
        <p>GPT/Claude-powered scoring for reranking.</p>
      </section>

      <section id="llm-reranking">
        <h2>LLM Reranking</h2>
        <p>Rerank search results using Large Language Models (LLMs) for semantic relevance scoring. LLM reranking provides high-quality relevance assessment but may have higher latency and cost.</p>
        
        <h3>Basic LLM Reranking</h3>
        <SqlCodeBlock
          title="LLM reranking"
          code={`-- LLM reranking using ndb_llm_rerank function
WITH documents AS (
    SELECT ARRAY[
        'PostgreSQL is a powerful relational database',
        'Machine learning models can be trained in SQL',
        'Vector search enables semantic similarity',
        'RAG pipelines combine retrieval and generation',
        'NeuronDB extends PostgreSQL with ML capabilities'
    ] AS docs
)
SELECT 
    idx,
    score,
    docs[idx] AS document
FROM documents,
    LATERAL ndb_llm_rerank(
        'machine learning',              -- query text
        docs,                            -- candidate documents array
        'ms-marco-MiniLM-L-6-v2',        -- model name (optional)
        5                                -- top K results
    ) AS rerank_result
ORDER BY score DESC;`}
        />
        <p><strong>Function Signature:</strong></p>
        <pre><code>ndb_llm_rerank(
    query TEXT,              -- Query text
    documents TEXT[],        -- Array of candidate document texts
    model_name TEXT,         -- Optional model name
    top_k INTEGER           -- Number of top results to return
) RETURNS TABLE (
    idx INTEGER,            -- Index in documents array
    score REAL              -- Relevance score (higher = more relevant)
)</code></pre>

        <h3>Configuration</h3>
        <p>Configure LLM providers and API keys for reranking:</p>
        <SqlCodeBlock
          title="LLM configuration"
          code={`-- Set Hugging Face API key
SET neurondb.llm_api_key = 'your-huggingface-api-key';

-- Set Hugging Face endpoint
SET neurondb.huggingface_endpoint = 'https://api-inference.huggingface.co';

-- For OpenAI (if supported)
SET neurondb.openai_api_key = 'your-openai-api-key';`}
        />

        <h3>Performance Considerations</h3>
        <ul>
          <li><strong>Latency:</strong> LLM reranking is slower than cross-encoders due to API calls</li>
          <li><strong>Cost:</strong> Each reranking call may incur API costs</li>
          <li><strong>Batch Processing:</strong> Consider batching multiple queries for efficiency</li>
          <li><strong>Fallback:</strong> Use cross-encoders as fallback if LLM is unavailable</li>
        </ul>
      </section>

      <section>
        <h2>Learn More</h2>
        <p>
          For detailed documentation on LLM reranking, model configuration, cost optimization, and prompt engineering, visit:{' '}
          <a href="https://pgelephant.com/neurondb/reranking/llm/" target="_blank" rel="noopener noreferrer">
            LLM Reranking Documentation
          </a>
        </p>
      </section>

      <section>
        <h2>Related Topics</h2>
        <ul>
          <li><a href="/docs/neurondb/reranking/cross-encoder">Cross-Encoder</a> - Neural reranking</li>
          <li><a href="/docs/neurondb/reranking/ensemble">Ensemble</a> - Combine rerankers</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}

