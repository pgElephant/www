import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../../components/SqlCodeBlock'
import BashCodeBlock from '../../../../../components/BashCodeBlock'

export const metadata: Metadata = {
  title: 'NeurondB Reranking Overview | Cross-Encoder Playbooks',
  description:
    'Improve retrieval relevance with NeurondB reranking pipelines. Use cross-encoders, LLM verification, and fallback scoring to refine top-K candidates.',
}

const tableOfContents: TocItem[] = [
  { id: 'pipeline', title: 'End-to-end pipeline' },
  { id: 'batching', title: 'Batch efficiently' },
  { id: 'evaluation', title: 'Evaluate & guardrail' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/hybrid/overview',
  label: 'Hybrid Overview',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/rag',
  label: 'RAG Pipelines',
}

export default function RerankingOverviewPage() {
  return (
    <PostgresDocsLayout
      title="Boost relevance with cross-encoder reranking"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="pipeline">
        <h2>End-to-end pipeline</h2>
        <p>Retrieve top-K vectors, rerank them with cross-encoders, then evaluate with business-specific scoring. This pattern keeps latency predictable while improving quality.</p>
        <SqlCodeBlock
          title="Three-stage rerank"
          code={`WITH initial AS (
  SELECT id,
         content,
         embedding <-> embed_text('PostgreSQL failover') AS distance
  FROM   docs
  ORDER  BY distance
  LIMIT  80
),
ranked AS (
  SELECT id,
         neurondb_rerank(
           model_name => 'cross-encoder-nli-base',
           query      => 'PostgreSQL failover',
           document   => content
         ) AS cross_score
  FROM   initial
),
scored AS (
  SELECT id,
         cross_score,
         distance,
         0.7 * cross_score + 0.3 * (1 - distance) AS final_score
  FROM   ranked
  JOIN   initial USING (id)
)
SELECT id, final_score
FROM   scored
ORDER  BY final_score DESC
LIMIT  15;`}
        />
      </section>

      <section id="batching">
        <h2>Batch efficiently</h2>
        <p>Batch reranking requests to maintain throughput. The NeurondB inference scheduler groups payloads and leverages GPU execution when available.</p>
        <BashCodeBlock
          title="Tune batching"
          code={`-- Limit max rerank latency to 40ms
SET neurondb.session_inference_max_latency = '40ms';

-- Process 32 candidates per batch
SET neurondb.session_rerank_batch_size = 32;`}
        />
      </section>

      <section id="evaluation">
        <h2>Evaluate & guardrail</h2>
        <p>Monitor reranking quality and set up fallbacks for production reliability.</p>
        <SqlCodeBlock
          title="Quality metrics"
          code={`SELECT 
  AVG(cross_score) AS avg_relevance,
  PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY cross_score) AS median_score,
  COUNT(*) FILTER (WHERE cross_score > 0.7) AS high_quality_count
FROM reranked_results;`}
        />
      </section>

      <section>
        <h2>Next Steps</h2>
        <ul>
          <li><a href="/docs/neurondb/ml/inference">Inference Runtime</a> - ONNX model deployment</li>
          <li><a href="/docs/neurondb/hybrid/overview">Hybrid Retrieval</a> - Combine with hybrid search</li>
          <li><a href="/docs/neurondb/rag">RAG Pipelines</a> - Complete RAG workflows</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}
