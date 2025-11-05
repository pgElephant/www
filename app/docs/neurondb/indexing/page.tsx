import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vector Indexing & ANN Search | HNSW, IVFFlat for PostgreSQL - NeuronDB',
  description: 'Complete guide to vector indexing in NeuronDB PostgreSQL. Learn HNSW, IVFFlat, LSH algorithms, distance metrics (cosine, L2, dot product), and optimize ANN (Approximate Nearest Neighbor) search performance. 10M+ vectors, millisecond queries.',
  keywords: [
    'HNSW PostgreSQL',
    'IVFFlat index',
    'vector index',
    'ANN search',
    'approximate nearest neighbor',
    'cosine similarity index',
    'L2 distance PostgreSQL',
    'dot product search',
    'vector indexing',
    'similarity search index',
    'fast vector search',
    'pgvector index',
    'vector database performance',
    'embedding index'
  ],
  openGraph: {
    title: 'Vector Indexing with HNSW & IVFFlat - NeuronDB PostgreSQL',
    description: 'Production-grade vector indexing for PostgreSQL. HNSW, IVFFlat, LSH with 10+ distance metrics.',
    url: 'https://www.pgelephant.com/docs/neurondb/indexing',
  },
  alternates: {
    canonical: 'https://www.pgelephant.com/docs/neurondb/indexing',
  },
};

export default function IndexingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Indexing and Distance Metrics</h1>
        <p className="text-lg text-muted-foreground">
          NeuronDB provides powerful indexing and distance computation for vector search, 
          supporting multiple distance functions and approximate nearest neighbor (ANN) algorithms.
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Distance Metrics</h2>
        <p className="mb-4">
          NeuronDB supports several distance metrics for vector similarity, each optimized for different use cases:
        </p>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">L2 (Euclidean) Distance</h3>
            <p className="mb-3">
              The straight-line distance between two points. Lower values mean more similar vectors.
              Commonly used for embeddings that represent spatial relationships.
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`
-- L2 distance operator
SELECT embedding <-> '[0.1, 0.2, 0.3]'::vector
FROM documents
ORDER BY embedding <-> '[0.1, 0.2, 0.3]'::vector
LIMIT 10;

-- GPU-accelerated L2 distance (when GPU enabled)
SELECT id, vector_l2_distance_gpu(embedding, '[0.1, 0.2, 0.3]'::vector) AS distance
FROM documents
ORDER BY distance
LIMIT 10;`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Cosine Distance</h3>
            <p className="mb-3">
              Measures the angle between vectors, normalized to [0, 2]. Lower values indicate more similar directions.
              Ideal for text embeddings and normalized vectors where magnitude is less important than direction.
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`
-- Cosine distance operator
SELECT embedding <=> '[0.1, 0.2, 0.3]'::vector
FROM documents
ORDER BY embedding <=> '[0.1, 0.2, 0.3]'::vector
LIMIT 10;

-- GPU-accelerated cosine distance
SELECT id, vector_cosine_distance_gpu(embedding, '[0.1, 0.2, 0.3]'::vector) AS distance
FROM documents
ORDER BY distance
LIMIT 10;`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Inner Product (Dot Product)</h3>
            <p className="mb-3">
              Computes the dot product of two vectors. Higher values indicate greater similarity.
              Use with normalized vectors for maximum inner product search (MIPS).
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`
-- Inner product operator (negative for ordering, higher is more similar)
SELECT embedding <#> '[0.1, 0.2, 0.3]'::vector
FROM documents
ORDER BY embedding <#> '[0.1, 0.2, 0.3]'::vector
LIMIT 10;

-- GPU-accelerated inner product
SELECT id, vector_inner_product_gpu(embedding, '[0.1, 0.2, 0.3]'::vector) AS score
FROM documents
ORDER BY score DESC
LIMIT 10;`}</code>
            </pre>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Distance Operators Summary</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">Operator</th>
                <th className="text-left p-3">Distance Type</th>
                <th className="text-left p-3">Ordering</th>
                <th className="text-left p-3">Use Case</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3"><code>&lt;-&gt;</code></td>
                <td className="p-3">L2 (Euclidean)</td>
                <td className="p-3">ASC (lower = more similar)</td>
                <td className="p-3">Spatial data, general embeddings</td>
              </tr>
              <tr className="border-b">
                <td className="p-3"><code>&lt;=&gt;</code></td>
                <td className="p-3">Cosine</td>
                <td className="p-3">ASC (lower = more similar)</td>
                <td className="p-3">Text embeddings, normalized vectors</td>
              </tr>
              <tr className="border-b">
                <td className="p-3"><code>&lt;#&gt;</code></td>
                <td className="p-3">Inner Product</td>
                <td className="p-3">ASC (higher raw value = more similar)</td>
                <td className="p-3">MIPS, normalized embeddings</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Vector Indexes</h2>
        <p className="mb-4">
          NeuronDB implements advanced approximate nearest neighbor (ANN) index types for fast similarity search:
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">HNSW (Hierarchical Navigable Small World)</h3>
            <p className="mb-3">
              A graph-based index offering excellent recall and speed. HNSW builds a multi-layer graph structure
              for efficient navigation to nearest neighbors. Recommended for most use cases.
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`
-- Create HNSW index with L2 distance
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
LIMIT 10;`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">IVF (Inverted File)</h3>
            <p className="mb-3">
              Partitions the vector space into clusters (centroids). At query time, only the nearest clusters are searched.
              Best for very large datasets where index build time and memory are critical.
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`
-- Create IVF index with 100 lists (adjust based on dataset size)
CREATE INDEX ON documents USING ivfflat (embedding vector_l2_ops)
WITH (lists = 100);

-- IVF with cosine distance
CREATE INDEX ON documents USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Runtime tuning: probes controls how many lists to search (higher = better recall, slower)
SET ivfflat.probes = 10;

SELECT * FROM documents
ORDER BY embedding <-> '[0.1, 0.2, 0.3]'::vector
LIMIT 10;`}</code>
            </pre>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Index Selection Guidelines</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-2">Use HNSW when:</h4>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>You need high recall and fast query performance</li>
              <li>Index build time and memory usage are acceptable</li>
              <li>Dataset size is small to medium (&lt; 10M vectors)</li>
              <li>You want the best general-purpose ANN index</li>
            </ul>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-2">Use IVF when:</h4>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Dataset is very large (&gt; 10M vectors)</li>
              <li>Index build time and memory are constrained</li>
              <li>You can tolerate slightly lower recall for faster build</li>
              <li>Data distribution has natural clusters</li>
            </ul>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-2">No index (exact search) when:</h4>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Dataset is very small (&lt; 10k vectors)</li>
              <li>You require 100% recall (no approximation)</li>
              <li>Vectors are frequently updated (avoid index rebuild overhead)</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Operator Classes</h2>
        <p className="mb-4">
          Operator classes define which distance metric an index uses. Choose the operator class matching your query pattern:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">Operator Class</th>
                <th className="text-left p-3">Distance Metric</th>
                <th className="text-left p-3">Index Support</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3"><code>vector_l2_ops</code></td>
                <td className="p-3">L2 (Euclidean)</td>
                <td className="p-3">HNSW, IVF</td>
              </tr>
              <tr className="border-b">
                <td className="p-3"><code>vector_cosine_ops</code></td>
                <td className="p-3">Cosine</td>
                <td className="p-3">HNSW, IVF</td>
              </tr>
              <tr className="border-b">
                <td className="p-3"><code>vector_ip_ops</code></td>
                <td className="p-3">Inner Product</td>
                <td className="p-3">HNSW, IVF</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <p className="text-sm">
            <strong>Important:</strong> The operator class in your index must match the distance operator in your query.
            For example, an index with <code>vector_l2_ops</code> will be used for queries with <code>&lt;-&gt;</code>,
            but not for <code>&lt;=&gt;</code> (cosine) queries.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Index Tuning Parameters</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">HNSW Parameters</h3>
            <ul className="space-y-2 list-disc list-inside">
              <li>
                <strong>m</strong> (default: 16): Max connections per layer. Higher m = better recall, larger index.
                Typical range: 12–64.
              </li>
              <li>
                <strong>ef_construction</strong> (default: 64): Search width during index build. Higher = better index quality, slower build.
                Typical range: 64–500.
              </li>
              <li>
                <strong>hnsw.ef_search</strong> (runtime GUC, default: 40): Search width at query time. Higher = better recall, slower queries.
                Typical range: 40–400.
              </li>
            </ul>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto mt-4">
              <code>{`
-- Build-time tuning
CREATE INDEX ON documents USING hnsw (embedding vector_l2_ops)
WITH (m = 32, ef_construction = 128);

-- Runtime tuning for higher recall
SET hnsw.ef_search = 200;`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">IVF Parameters</h3>
            <ul className="space-y-2 list-disc list-inside">
              <li>
                <strong>lists</strong> (build-time): Number of clusters. Rule of thumb: <code>sqrt(num_rows)</code> for datasets &gt; 1M.
                Typical range: 100–10,000.
              </li>
              <li>
                <strong>ivfflat.probes</strong> (runtime GUC, default: 1): Number of clusters to search at query time.
                Higher = better recall, slower queries. Typical range: 1–100.
              </li>
            </ul>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto mt-4">
              <code>{`
-- Build-time tuning (for 10M rows, sqrt(10M) ~ 3162)
CREATE INDEX ON documents USING ivfflat (embedding vector_l2_ops)
WITH (lists = 3000);

-- Runtime tuning for better recall
SET ivfflat.probes = 20;`}</code>
            </pre>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">GPU-Accelerated Distance Functions</h2>
        <p className="mb-4">
          When GPU acceleration is enabled, NeuronDB provides GPU-accelerated distance computation functions
          for batch operations. See the <a href="/docs/neurondb/gpu" className="text-blue-600 hover:underline">GPU Acceleration</a> page
          for configuration details.
        </p>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`
-- Enable GPU acceleration (session-level)
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
LIMIT 100;`}</code>
  </pre>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-2">1. Index Selection</h4>
            <p className="text-muted-foreground">
              Start with HNSW for most workloads. Switch to IVF if your dataset exceeds 10M vectors or index build time becomes prohibitive.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-2">2. Distance Metric</h4>
            <p className="text-muted-foreground">
              Use cosine distance for text embeddings from models like OpenAI, Cohere, or Sentence Transformers.
              Use L2 for image embeddings or when embedding model documentation recommends Euclidean distance.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-2">3. Normalization</h4>
            <p className="text-muted-foreground">
              For cosine similarity, normalizing vectors before storage can improve performance. L2-normalized vectors
              make cosine distance equivalent to L2 distance (with a scaling factor).
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-2">4. Index Maintenance</h4>
            <p className="text-muted-foreground">
              Indexes are automatically updated on INSERT/UPDATE/DELETE, but frequent updates can degrade quality.
              For bulk loads, consider building the index after data ingestion with <code>CREATE INDEX</code>.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-2">5. Query Tuning</h4>
            <p className="text-muted-foreground">
              Adjust runtime GUCs (<code>hnsw.ef_search</code>, <code>ivfflat.probes</code>) to balance recall and latency.
              Monitor query performance and index scan statistics with <code>EXPLAIN ANALYZE</code>.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Example: Complete Indexing Workflow</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`
-- 1. Create table with vector column
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
LIMIT 10;`}</code>
  </pre>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Next Steps</h2>
        <ul className="space-y-2">
          <li>
            <a href="/docs/neurondb/gpu" className="text-blue-600 hover:underline">
              Learn about GPU acceleration
            </a> for faster distance computation.
          </li>
          <li>
            <a href="/docs/neurondb/hybrid" className="text-blue-600 hover:underline">
              Explore hybrid search
            </a> combining vector and full-text search.
          </li>
          <li>
            <a href="/docs/neurondb/analytics" className="text-blue-600 hover:underline">
              Use ML analytics
            </a> for clustering and outlier detection.
          </li>
          <li>
            <a href="/docs/neurondb/performance" className="text-blue-600 hover:underline">
              Optimize performance
            </a> with indexing and query best practices.
          </li>
        </ul>
      </section>
    </div>
  );
}
