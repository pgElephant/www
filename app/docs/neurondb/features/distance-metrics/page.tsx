import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'NeurondB Distance Metrics | Vector Similarity Guide',
  description:
    'Understand and tune NeurondB distance metrics including cosine, inner product, L2/L1, Hamming, and hybrid scoring. Includes SQL examples and tuning guidance.',
}

const tableOfContents: TocItem[] = [
  { id: 'l2-distance', title: 'L2 Distance (<->)' },
  { id: 'inner-product', title: 'Inner Product (<#>)' },
  { id: 'cosine-distance', title: 'Cosine Distance (<=>)' },
  { id: 'manhattan-distance', title: 'L1 / Manhattan Distance (<+>)' },
  { id: 'hamming-distance', title: 'Hamming Distance (<%>)' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/features/vector-types',
  label: 'Vector Types',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/features/quantization',
  label: 'Quantization',
}

export default function Page() {
  return (
    <PostgresDocsLayout
      title="Distance Metrics"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="l2-distance">
        <h2>L2 Distance (&lt;-&gt;)</h2>
        <p>Euclidean distance between two vectors. Balanced accuracy and performance for normalized embeddings and general semantic search workloads.</p>
        <p><strong>Use Cases:</strong> Semantic document search, Image similarity, Recommendations</p>
        <SqlCodeBlock
          title="L2 distance query"
          code={`SELECT id, title, embedding <-> query_embedding AS distance
FROM   neurondb_vectors
ORDER  BY distance
LIMIT  10;`}
        />
        <h3>Tuning Tips</h3>
        <ul>
          <li>Normalize embeddings during ingestion to keep magnitudes comparable</li>
          <li>Consider IVF+PQ indexing for billion-scale collections</li>
          <li>Set neurondb.metric_preference = l2 to influence planner choices</li>
        </ul>
      </section>

      <section id="inner-product">
        <h2>Inner Product (&lt;#&gt;)</h2>
        <p>Negative inner product (equivalent to maximizing dot product). Ideal when embeddings are already length-normalized or you want to prioritize directional similarity.</p>
        <p><strong>Use Cases:</strong> Recommendation ranking, Two-tower retrieval models, Vector reranking pipelines</p>
        <SqlCodeBlock
          title="Inner product query"
          code={`SELECT id, product_name, embedding <#> embed_text('wireless earbuds') AS score
FROM   products
ORDER  BY score
LIMIT  20;`}
        />
        <h3>Tuning Tips</h3>
        <ul>
          <li>Normalize embeddings with embed_text(..., normalize =&gt; true)</li>
          <li>Track score variance with pg_stat_insights histograms</li>
          <li>Set neurondb.inner_product_bias to adjust for magnitude break-even points</li>
        </ul>
      </section>

      <section id="cosine-distance">
        <h2>Cosine Distance (&lt;=&gt;)</h2>
        <p>Measure of angular distance between vectors (1 - cosine similarity). Works well for text embeddings and hybrid keyword/semantic ranking.</p>
        <p><strong>Use Cases:</strong> LLM retrieval augmented generation, Support ticket similarity, Knowledge base search</p>
        <SqlCodeBlock
          title="Cosine distance query"
          code={`SELECT doc_id, summary, embedding <=> embed_text('llm retrieval best practices') AS distance
FROM   kb_articles
ORDER  BY distance
LIMIT  15;`}
        />
        <h3>Tuning Tips</h3>
        <ul>
          <li>Combine with CLASSIFIER reranker functions for hybrid scoring</li>
          <li>Monitor neurondb.cosine_precision to adjust GPU/CPU execution balance</li>
          <li>Use neurondb.hybrid_weight to blend cosine and lexical scores</li>
        </ul>
      </section>

      <section id="manhattan-distance">
        <h2>L1 / Manhattan Distance (&lt;+&gt;)</h2>
        <p>Summation of absolute differences per dimension. Useful for sparse or quantized embeddings where L2 can exaggerate outliers.</p>
        <p><strong>Use Cases:</strong> Anomaly detection, Time-series embeddings, Quantized representations</p>
        <SqlCodeBlock
          title="Manhattan distance query"
          code={`SELECT sensor_id,
       embedding <+> embed_series($1::float4[]) AS divergence
FROM   telemetry_vectors
WHERE  measurement_window = $2
ORDER  BY divergence DESC
LIMIT  5;`}
        />
        <h3>Tuning Tips</h3>
        <ul>
          <li>Pair with sparsevec or PQ compressed vectors for memory efficiency</li>
          <li>Set neurondb.l1_gpu_threshold to control GPU offload</li>
          <li>Track divergence trends in neurondb_metric_samples view</li>
        </ul>
      </section>

      <section id="hamming-distance">
        <h2>Hamming Distance (&lt;%&gt;)</h2>
        <p>Counts differing bits between binary vectors. Designed for binary embeddings, perceptual hashes, and fingerprinting workloads.</p>
        <p><strong>Use Cases:</strong> Perceptual image dedupe, Audio/video fingerprinting, Security anomaly detection</p>
        <SqlCodeBlock
          title="Hamming distance query"
          code={`SELECT asset_id,
       fingerprint <% embed_binary($1) AS distance
FROM   media_fingerprints
ORDER  BY distance
LIMIT  12;`}
        />
        <h3>Tuning Tips</h3>
        <ul>
          <li>Store fingerprints using neurondb.bit type to minimize storage</li>
          <li>Configure neurondb.hamming_bit_packing to align CPU vectorization</li>
          <li>Use neurondb_distance_profile() to audit distribution per collection</li>
        </ul>
      </section>

      <section>
        <h2>Next Steps</h2>
        <ul>
          <li><a href="/docs/neurondb/indexing">Indexing Guide</a> - Create indexes for distance metrics</li>
          <li><a href="/docs/neurondb/features/quantization">Quantization</a> - Compress vectors</li>
          <li><a href="/docs/neurondb/performance">Performance</a> - Optimize distance calculations</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}
