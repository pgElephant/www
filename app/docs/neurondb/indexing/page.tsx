import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'Vector Indexing in AI PostgreSQL | HNSW, IVF Indexes for NeurondB',
  description: 'Complete guide to vector indexing in NeurondB (AI PostgreSQL extension). Learn HNSW and IVF indexes, distance metrics (cosine, L2, inner product), and optimize ANN search. Alternative to PostgreSQL.ai for vector indexing in PostgreSQL.',
  keywords: [
    'HNSW index PostgreSQL',
    'AI PostgreSQL indexing',
    'PostgreSQL.ai indexing',
    'pgml vector search',
    'IVF index vector search',
    'vector indexing',
    'ANN search',
    'approximate nearest neighbor',
    'HNSW algorithm',
    'vector similarity index',
    'cosine distance index',
    'L2 distance index',
    'vector database indexing',
    'high-dimensional indexing',
    'nearest neighbor search',
    'ef_search tuning',
    'ef_construction parameter',
    'IVF lists parameter',
    'PostgreSQL AI vector index'
  ].join(', '),
  alternates: {
    canonical: 'https://www.pgelephant.com/docs/neurondb/indexing',
  },
  openGraph: {
    title: 'Vector Indexing & ANN Search | HNSW, IVF for NeurondB',
    description: 'Complete guide to HNSW and IVF vector indexes in NeurondB. Optimize ANN search for 10M+ vectors with millisecond latency.',
    type: 'article',
    url: 'https://www.pgelephant.com/docs/neurondb/indexing',
  },
}

const tableOfContents: TocItem[] = [
  { id: 'distance-metrics', title: 'Distance Metrics' },
  { id: 'distance-operators', title: 'Distance Operators Summary' },
  { id: 'vector-indexes', title: 'Vector Indexes' },
  { id: 'index-selection', title: 'Index Selection Guidelines' },
  { id: 'operator-classes', title: 'Operator Classes' },
  { id: 'tuning-parameters', title: 'Index Tuning Parameters' },
  { id: 'gpu-acceleration', title: 'GPU-Accelerated Distance Functions' },
  { id: 'best-practices', title: 'Best Practices' },
  { id: 'example-workflow', title: 'Example: Complete Indexing Workflow' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/configuration',
  label: 'Configuration',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/background-workers',
  label: 'Background Workers',
}

export default function IndexingPage() {
  return (
    <PostgresDocsLayout
      title="Indexing and Distance Metrics"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="distance-metrics">
        <h2>Distance Metrics</h2>
        <p>NeuronDB supports several distance metrics for vector similarity, each optimized for different use cases:</p>

        <h3>L2 (Euclidean) Distance</h3>
        <p>The straight-line distance between two points. Lower values mean more similar vectors. Commonly used for embeddings that represent spatial relationships.</p>
        <SqlCodeBlock
          title="L2 distance operator"
          code={`-- L2 distance operator
SELECT embedding <-> '[0.1, 0.2, 0.3]'::vector
FROM documents
ORDER BY embedding <-> '[0.1, 0.2, 0.3]'::vector
LIMIT 10;

-- GPU-accelerated L2 distance (when GPU enabled)
SELECT id, vector_l2_distance_gpu(embedding, '[0.1, 0.2, 0.3]'::vector) AS distance
FROM documents
ORDER BY distance
LIMIT 10;`}
        />

        <h3>Cosine Distance</h3>
        <p>Measures the angle between vectors, normalized to [0, 2]. Lower values indicate more similar directions. Ideal for text embeddings and normalized vectors where magnitude is less important than direction.</p>
        <SqlCodeBlock
          title="Cosine distance operator"
          code={`-- Cosine distance operator
SELECT embedding <=> '[0.1, 0.2, 0.3]'::vector
FROM documents
ORDER BY embedding <=> '[0.1, 0.2, 0.3]'::vector
LIMIT 10;

-- GPU-accelerated cosine distance
SELECT id, vector_cosine_distance_gpu(embedding, '[0.1, 0.2, 0.3]'::vector) AS distance
FROM documents
ORDER BY distance
LIMIT 10;`}
        />

        <h3>Inner Product (Dot Product)</h3>
        <p>Computes the dot product of two vectors. Higher values indicate greater similarity. Use with normalized vectors for maximum inner product search (MIPS).</p>
        <SqlCodeBlock
          title="Inner product operator"
          code={`-- Inner product operator (negative for ordering, higher is more similar)
SELECT embedding <#> '[0.1, 0.2, 0.3]'::vector
FROM documents
ORDER BY embedding <#> '[0.1, 0.2, 0.3]'::vector
LIMIT 10;

-- GPU-accelerated inner product
SELECT id, vector_inner_product_gpu(embedding, query_vec) AS score
FROM documents, (SELECT '[0.1, 0.2, 0.3]'::vector AS query_vec) q
ORDER BY score DESC
LIMIT 10;`}
        />
      </section>

      <section id="distance-operators">
        <h2>Distance Operators Summary</h2>
        <table>
          <thead>
            <tr>
              <th>Operator</th>
              <th>Distance Type</th>
              <th>Ordering</th>
              <th>Use Case</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>&lt;-&gt;</code></td>
              <td>L2 (Euclidean)</td>
              <td>ASC (lower = more similar)</td>
              <td>Spatial data, general embeddings</td>
            </tr>
            <tr>
              <td><code>&lt;=&gt;</code></td>
              <td>Cosine</td>
              <td>ASC (lower = more similar)</td>
              <td>Text embeddings, normalized vectors</td>
            </tr>
            <tr>
              <td><code>&lt;#&gt;</code></td>
              <td>Inner Product</td>
              <td>ASC (higher raw value = more similar)</td>
              <td>MIPS, normalized embeddings</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="vector-indexes">
        <h2>Vector Indexes</h2>
        <p>NeuronDB implements advanced approximate nearest neighbor (ANN) index types for fast similarity search:</p>

        <h3>HNSW (Hierarchical Navigable Small World)</h3>
        <p>A graph-based index offering excellent recall and speed. HNSW builds a multi-layer graph structure for efficient navigation to nearest neighbors. Recommended for most use cases.</p>
        <SqlCodeBlock
          title="HNSW index examples"
          code={`-- Create HNSW index with L2 distance
CREATE INDEX ON documents USING hnsw (embedding vector_l2_ops);

-- Create HNSW index with cosine distance
CREATE INDEX ON documents USING hnsw (embedding vector_cosine_ops);

-- Create HNSW index with inner product
CREATE INDEX ON documents USING hnsw (embedding vector_ip_ops);

-- Custom parameters (m = max connections per layer, ef_construction = search width during build)
CREATE INDEX ON documents USING hnsw (embedding vector_l2_ops)
WITH (m = 16, ef_construction = 64);

-- Runtime tuning: increase ef_search for better recall at query time
SET hnsw.ef_search = 100;

SELECT * FROM documents
ORDER BY embedding <-> '[0.1, 0.2, 0.3]'::vector
LIMIT 10;`}
        />

        <h3>IVF (Inverted File)</h3>
        <p>Partitions the vector space into clusters (centroids). At query time, only the nearest clusters are searched. Best for very large datasets where index build time and memory are critical.</p>
        <SqlCodeBlock
          title="IVF index examples"
          code={`-- Create IVF index with 10 lists (adjust based on dataset size)
CREATE INDEX ON documents USING ivf (embedding vector_l2_ops)
WITH (lists = 10);

-- IVF with cosine distance
CREATE INDEX ON documents USING ivf (embedding vector_cosine_ops)
WITH (lists = 10);

-- IVF with custom parameters
CREATE INDEX ON documents USING ivf (embedding vector_l2_ops)
WITH (lists = 100);

-- Runtime tuning: probes controls how many lists to search (higher = better recall, slower)
SET ivf.probes = 10;

SELECT * FROM documents
ORDER BY embedding <-> '[0.1, 0.2, 0.3]'::vector
LIMIT 10;`}
        />
      </section>

      <section id="index-selection">
        <h2>Index Selection Guidelines</h2>

        <h3>Use HNSW when:</h3>
        <ul>
          <li>You need high recall and fast query performance</li>
          <li>Index build time and memory usage are acceptable</li>
          <li>Dataset size is small to medium (&lt; 10M vectors)</li>
          <li>You want the best general-purpose ANN index</li>
        </ul>

        <h3>Use IVF when:</h3>
        <ul>
          <li>Dataset is very large (&gt; 10M vectors)</li>
          <li>Index build time and memory are constrained</li>
          <li>You can tolerate slightly lower recall for faster build</li>
          <li>Data distribution has natural clusters</li>
        </ul>

        <h3>No index (exact search) when:</h3>
        <ul>
          <li>Dataset is very small (&lt; 10k vectors)</li>
          <li>You require 100% recall (no approximation)</li>
          <li>Vectors are frequently updated (avoid index rebuild overhead)</li>
        </ul>
      </section>

      <section id="operator-classes">
        <h2>Operator Classes</h2>
        <p>Operator classes define which distance metric an index uses. Choose the operator class matching your query pattern:</p>
        <table>
          <thead>
            <tr>
              <th>Operator Class</th>
              <th>Distance Metric</th>
              <th>Index Support</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>vector_l2_ops</code></td>
              <td>L2 (Euclidean)</td>
              <td>HNSW, IVF</td>
            </tr>
            <tr>
              <td><code>vector_cosine_ops</code></td>
              <td>Cosine</td>
              <td>HNSW, IVF</td>
            </tr>
            <tr>
              <td><code>vector_ip_ops</code></td>
              <td>Inner Product</td>
              <td>HNSW, IVF</td>
            </tr>
          </tbody>
        </table>
        <p><strong>Important:</strong> The operator class in your index must match the distance operator in your query. For example, an index with <code>vector_l2_ops</code> will be used for queries with <code>&lt;-&gt;</code>, but not for <code>&lt;=&gt;</code> (cosine) queries.</p>
      </section>

      <section id="tuning-parameters">
        <h2>Index Tuning Parameters</h2>

        <h3>HNSW Parameters</h3>
        <ul>
          <li><strong>m</strong> (default: 16): Max connections per layer. Higher m = better recall, larger index. Typical range: 12–64.</li>
          <li><strong>ef_construction</strong> (default: 64): Search width during index build. Higher = better index quality, slower build. Typical range: 64–500.</li>
          <li><strong>hnsw.ef_search</strong> (runtime GUC, default: 40): Search width at query time. Higher = better recall, slower queries. Typical range: 40–400.</li>
        </ul>
        <SqlCodeBlock
          title="HNSW tuning"
          code={`-- Build-time tuning
CREATE INDEX ON documents USING hnsw (embedding vector_l2_ops)
WITH (m = 32, ef_construction = 128);

-- Runtime tuning for higher recall
SET hnsw.ef_search = 200;`}
        />

        <h3>IVF Parameters</h3>
        <ul>
          <li><strong>lists</strong> (build-time): Number of clusters. Rule of thumb: <code>sqrt(num_rows)</code> for datasets &gt; 1M. Typical range: 10–10,000.</li>
          <li><strong>ivf.probes</strong> (runtime GUC, default: 1): Number of clusters to search at query time. Higher = better recall, slower queries. Typical range: 1–100.</li>
        </ul>
        <SqlCodeBlock
          title="IVF tuning"
          code={`-- Build-time tuning (for 10M rows, sqrt(10M) ~ 3162)
CREATE INDEX ON documents USING ivf (embedding vector_l2_ops)
WITH (lists = 3000);

-- Runtime tuning for better recall
SET ivf.probes = 20;`}
        />
      </section>

      <section id="gpu-acceleration">
        <h2>GPU-Accelerated Distance Functions</h2>
        <p>When GPU acceleration is enabled, NeuronDB provides GPU-accelerated distance computation functions for batch operations. See the <a href="/docs/neurondb/gpu">GPU Acceleration</a> page for configuration details.</p>
        <SqlCodeBlock
          title="GPU distance functions"
          code={`-- Enable GPU acceleration (session-level)
SET neurondb.gpu_enabled = true;
SET neurondb.gpu_device = 0;
SET neurondb.gpu_batch_size = 1000;

-- GPU distance functions
SELECT id, 
       vector_l2_distance_gpu(embedding, query_vec) AS l2_dist,
       vector_cosine_distance_gpu(embedding, query_vec) AS cos_dist,
       vector_inner_product_gpu(embedding, query_vec) AS ip_score
FROM documents, (SELECT '[0.1, 0.2, 0.3]'::vector AS query_vec) q
ORDER BY l2_dist
LIMIT 100;`}
        />
      </section>

      <section id="best-practices">
        <h2>Best Practices</h2>

        <h3>1. Index Selection</h3>
        <p>Start with HNSW for most workloads. Switch to IVF if your dataset exceeds 10M vectors or index build time becomes prohibitive.</p>

        <h3>2. Distance Metric</h3>
        <p>Use cosine distance for text embeddings from models like OpenAI, Cohere, or Sentence Transformers. Use L2 for image embeddings or when embedding model documentation recommends Euclidean distance.</p>

        <h3>3. Normalization</h3>
        <p>For cosine similarity, normalizing vectors before storage can improve performance. L2-normalized vectors make cosine distance equivalent to L2 distance (with a scaling factor).</p>

        <h3>4. Index Maintenance</h3>
        <p>Indexes are automatically updated on INSERT/UPDATE/DELETE, but frequent updates can degrade quality. For bulk loads, consider building the index after data ingestion with <code>CREATE INDEX</code>.</p>

        <h3>5. Query Tuning</h3>
        <p>Adjust runtime GUCs (<code>hnsw.ef_search</code>, <code>ivfflat.probes</code>) to balance recall and latency. Monitor query performance and index scan statistics with <code>EXPLAIN ANALYZE</code>.</p>
      </section>

      <section id="example-workflow">
        <h2>Example: Complete Indexing Workflow</h2>
        <SqlCodeBlock
          title="Complete workflow"
          code={`-- 1. Create table with vector column
CREATE TABLE documents (
  id SERIAL PRIMARY KEY,
  content TEXT,
  embedding vector(1536)  -- OpenAI ada-002 dimension
);

-- 2. Insert embeddings (bulk load or incremental)
INSERT INTO documents (content, embedding)
SELECT content, embedding FROM external_source;

-- 3. Create HNSW index for cosine similarity (text embeddings)
CREATE INDEX documents_embedding_idx ON documents 
USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);

-- 4. Tune runtime parameters for better recall
SET hnsw.ef_search = 100;

-- 5. Perform similarity search
SELECT id, content, embedding <=> '[0.1, 0.2, ...]'::vector AS distance
FROM documents
ORDER BY embedding <=> '[0.1, 0.2, ...]'::vector
LIMIT 10;

-- 6. Monitor index usage
EXPLAIN ANALYZE
SELECT id FROM documents
ORDER BY embedding <=> '[0.1, 0.2, ...]'::vector
LIMIT 10;`}
        />
      </section>

      <section>
        <h2>Next Steps</h2>
        <ul>
          <li><a href="/docs/neurondb/gpu">Learn about GPU acceleration</a> for faster distance computation.</li>
          <li><a href="/docs/neurondb/hybrid">Explore hybrid search</a> combining vector and full-text search.</li>
          <li><a href="/docs/neurondb/analytics">Use ML analytics</a> for clustering and outlier detection.</li>
          <li><a href="/docs/neurondb/performance">Optimize performance</a> with indexing and query best practices.</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}
