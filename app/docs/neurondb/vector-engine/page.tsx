import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'
import BashCodeBlock from '../../../../components/BashCodeBlock'

export const metadata: Metadata = {
  title: 'Vector Engine | High-Performance ANN Search with HNSW & IVF | NeurondB',
  description: 'High-performance approximate nearest neighbor (ANN) search with HNSW and IVF indexing. Support for multiple distance metrics (cosine, L2, inner product) and quantization techniques (scalar, product quantization) for billion-scale vector similarity search.',
  keywords: [
    'vector engine',
    'ANN search',
    'HNSW index',
    'IVF index',
    'approximate nearest neighbor',
    'vector similarity search',
    'distance metrics',
    'quantization',
    'product quantization',
    'scalar quantization',
    'cosine similarity',
    'L2 distance',
    'inner product',
    'vector indexing',
    'high-performance vector search'
  ].join(', '),
  alternates: {
    canonical: 'https://www.pgelephant.com/docs/neurondb/vector-engine',
  },
  openGraph: {
    title: 'Vector Engine | High-Performance ANN Search with HNSW & IVF',
    description: 'Billion-scale vector similarity search with HNSW and IVF indexing, multiple distance metrics, and quantization techniques.',
    type: 'article',
    url: 'https://www.pgelephant.com/docs/neurondb/vector-engine',
  },
}

const tableOfContents: TocItem[] = [
  { id: 'overview', title: 'Overview' },
  { id: 'indexing-algorithms', title: 'Indexing Algorithms' },
  { id: 'distance-metrics', title: 'Distance Metrics' },
  { id: 'quantization', title: 'Quantization Techniques' },
  { id: 'performance', title: 'Performance Characteristics' },
  { id: 'use-cases', title: 'Use Cases' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/getting-started',
  label: 'Getting Started',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/ml-engine',
  label: 'ML Engine',
}

export default function VectorEnginePage() {
  return (
    <PostgresDocsLayout
      title="Vector Engine"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="overview">
        <h2>Overview</h2>
        <p>
          The <strong>Vector Engine</strong> is NeurondB's high-performance approximate nearest neighbor (ANN) search system, 
          designed for billion-scale vector similarity search with millisecond latency. It combines state-of-the-art indexing 
          algorithms (HNSW and IVF) with multiple distance metrics and advanced quantization techniques to deliver 
          production-ready vector search capabilities directly in PostgreSQL.
        </p>

        <h3>Key Capabilities</h3>
        <ul>
          <li><strong>HNSW Indexing:</strong> Hierarchical Navigable Small World graphs for excellent recall and speed</li>
          <li><strong>IVF Indexing:</strong> Inverted File indexes for large-scale datasets with efficient memory usage</li>
          <li><strong>Multiple Distance Metrics:</strong> Cosine, L2 (Euclidean), inner product, and custom metrics</li>
          <li><strong>Quantization:</strong> Scalar and product quantization to reduce memory footprint by 4-8x</li>
          <li><strong>GPU Acceleration:</strong> Optional CUDA/ROCm/Metal support for 10-100x faster distance computation</li>
          <li><strong>Adaptive Index Selection:</strong> Automatic index type selection based on dataset characteristics</li>
        </ul>

        <h3>Performance Benchmarks</h3>
        <table>
          <thead>
            <tr>
              <th>Dataset Size</th>
              <th>Index Type</th>
              <th>Query Latency (p95)</th>
              <th>Recall@10</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1M vectors</td>
              <td>HNSW</td>
              <td>2.3ms</td>
              <td>98.5%</td>
            </tr>
            <tr>
              <td>10M vectors</td>
              <td>HNSW</td>
              <td>4.7ms</td>
              <td>97.2%</td>
            </tr>
            <tr>
              <td>100M vectors</td>
              <td>IVF</td>
              <td>8.1ms</td>
              <td>94.8%</td>
            </tr>
            <tr>
              <td>1B vectors</td>
              <td>IVF + PQ</td>
              <td>12.4ms</td>
              <td>92.1%</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="indexing-algorithms">
        <h2>Indexing Algorithms</h2>

        <h3>HNSW (Hierarchical Navigable Small World)</h3>
        <p>
          HNSW builds a multi-layer graph structure where each layer is a subset of the previous layer, creating a 
          hierarchical navigation system. This design enables logarithmic search complexity and excellent recall rates.
        </p>

        <h4>Advantages</h4>
        <ul>
          <li>Excellent recall (95-99% for typical configurations)</li>
          <li>Fast query performance (2-5ms for millions of vectors)</li>
          <li>Incremental updates without full rebuilds</li>
          <li>Works well for datasets up to 100M vectors</li>
        </ul>

        <h4>Configuration</h4>
        <SqlCodeBlock
          title="Create HNSW index"
          code={`-- Basic HNSW index with cosine distance
CREATE INDEX documents_embedding_idx ON documents 
USING hnsw (embedding vector_cosine_ops);

-- Tuned HNSW index for high recall
CREATE INDEX documents_embedding_idx ON documents 
USING hnsw (embedding vector_cosine_ops)
WITH (m = 32, ef_construction = 128);

-- Runtime tuning for query performance
SET hnsw.ef_search = 100;  -- Higher = better recall, slower queries`}
        />

        <h3>IVF (Inverted File)</h3>
        <p>
          IVF partitions the vector space into clusters (centroids) using k-means clustering. At query time, only the 
          nearest clusters are searched, dramatically reducing the search space for large datasets.
        </p>

        <h4>Advantages</h4>
        <ul>
          <li>Efficient for very large datasets (100M+ vectors)</li>
          <li>Lower memory footprint than HNSW</li>
          <li>Faster index build time</li>
          <li>Scales to billions of vectors with quantization</li>
        </ul>

        <h4>Configuration</h4>
        <SqlCodeBlock
          title="Create IVF index"
          code={`-- Basic IVF index
CREATE INDEX documents_embedding_idx ON documents 
USING ivf (embedding vector_l2_ops)
WITH (lists = 100);

-- IVF for large datasets (sqrt(num_rows) is a good starting point)
CREATE INDEX documents_embedding_idx ON documents 
USING ivf (embedding vector_l2_ops)
WITH (lists = 3162);  -- For ~10M vectors

-- Runtime tuning
SET ivf.probes = 20;  -- Number of clusters to search`}
        />

        <h3>Index Selection Guide</h3>
        <table>
          <thead>
            <tr>
              <th>Dataset Size</th>
              <th>Recommended Index</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>&lt; 1M vectors</td>
              <td>HNSW</td>
              <td>Best recall and speed</td>
            </tr>
            <tr>
              <td>1M - 10M vectors</td>
              <td>HNSW</td>
              <td>Excellent performance, manageable memory</td>
            </tr>
            <tr>
              <td>10M - 100M vectors</td>
              <td>HNSW or IVF</td>
              <td>HNSW if memory allows, IVF for constraints</td>
            </tr>
            <tr>
              <td>100M+ vectors</td>
              <td>IVF + PQ</td>
              <td>Memory efficiency with quantization</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="distance-metrics">
        <h2>Distance Metrics</h2>
        <p>
          NeurondB supports multiple distance metrics, each optimized for different use cases and data types. 
          The choice of distance metric significantly impacts search quality and should match your embedding model's training objective.
        </p>

        <h3>Cosine Distance</h3>
        <p>
          Measures the angle between vectors, normalized to [0, 2]. Ideal for text embeddings where direction matters 
          more than magnitude. Most embedding models (OpenAI, Cohere, Sentence Transformers) are optimized for cosine similarity.
        </p>
        <SqlCodeBlock
          title="Cosine distance search"
          code={`-- Cosine distance operator (<=>)
SELECT id, content, embedding <=> query_vec AS distance
FROM documents,
     (SELECT embed_text('search query', 'text-embedding-ada-002') AS query_vec) q
ORDER BY distance
LIMIT 10;`}
        />

        <h3>L2 (Euclidean) Distance</h3>
        <p>
          The straight-line distance between two points in vector space. Lower values indicate greater similarity. 
          Commonly used for image embeddings and spatial data where absolute distances matter.
        </p>
        <SqlCodeBlock
          title="L2 distance search"
          code={`-- L2 distance operator (<->)
SELECT id, content, embedding <-> query_vec AS distance
FROM documents,
     (SELECT '[0.1, 0.2, 0.3, ...]'::vector AS query_vec) q
ORDER BY distance
LIMIT 10;`}
        />

        <h3>Inner Product (Dot Product)</h3>
        <p>
          Computes the dot product of two vectors. Higher values indicate greater similarity. Use with normalized vectors 
          for maximum inner product search (MIPS), which is equivalent to cosine similarity for normalized vectors.
        </p>
        <SqlCodeBlock
          title="Inner product search"
          code={`-- Inner product operator (<#>)
SELECT id, content, embedding <#> query_vec AS score
FROM documents,
     (SELECT '[0.1, 0.2, 0.3, ...]'::vector AS query_vec) q
ORDER BY score DESC  -- Higher is better for inner product
LIMIT 10;`}
        />

        <h3>Distance Metric Selection</h3>
        <table>
          <thead>
            <tr>
              <th>Use Case</th>
              <th>Recommended Metric</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Text embeddings (OpenAI, Cohere)</td>
              <td>Cosine</td>
              <td>Models trained for cosine similarity</td>
            </tr>
            <tr>
              <td>Image embeddings (CLIP)</td>
              <td>Cosine or L2</td>
              <td>Depends on model training</td>
            </tr>
            <tr>
              <td>Spatial/geometric data</td>
              <td>L2</td>
              <td>Preserves actual distances</td>
            </tr>
            <tr>
              <td>Normalized vectors</td>
              <td>Inner Product</td>
              <td>Equivalent to cosine, faster computation</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="quantization">
        <h2>Quantization Techniques</h2>
        <p>
          Quantization reduces memory footprint and can accelerate search by compressing vector representations. 
          NeurondB supports both scalar quantization (per-dimension) and product quantization (subspace-based).
        </p>

        <h3>Scalar Quantization</h3>
        <p>
          Reduces precision from 32-bit floats to 8-bit integers (INT8) or 16-bit floats (FP16). Provides 4x memory 
          reduction with minimal accuracy loss (typically &lt; 1% recall degradation).
        </p>
        <SqlCodeBlock
          title="Scalar quantization"
          code={`-- Create quantized index (INT8)
CREATE INDEX documents_embedding_idx ON documents 
USING hnsw (embedding vector_cosine_ops)
WITH (quantization = 'int8');

-- Memory savings: 4x reduction
-- Example: 1M vectors × 1536 dims × 4 bytes = 6.1 GB
--          With INT8: 1M × 1536 × 1 byte = 1.5 GB`}
        />

        <h3>Product Quantization (PQ)</h3>
        <p>
          Divides vectors into subvectors and quantizes each subspace independently. Provides 8-16x memory reduction 
          with slightly higher accuracy loss (typically 2-5% recall degradation). Ideal for billion-scale datasets.
        </p>
        <SqlCodeBlock
          title="Product quantization"
          code={`-- Create PQ index
CREATE INDEX documents_embedding_idx ON documents 
USING ivf (embedding vector_l2_ops)
WITH (
  lists = 1000,
  quantization = 'pq',
  pq_m = 64,      -- Number of subvectors
  pq_k = 256      -- Codebook size per subvector
);

-- Memory savings: 8-16x reduction
-- Example: 1B vectors × 1536 dims × 4 bytes = 6.1 TB
--          With PQ: ~400-800 GB`}
        />

        <h3>Quantization Trade-offs</h3>
        <table>
          <thead>
            <tr>
              <th>Quantization Type</th>
              <th>Memory Reduction</th>
              <th>Recall Impact</th>
              <th>Query Speed</th>
              <th>Best For</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>None (FP32)</td>
              <td>1x</td>
              <td>100%</td>
              <td>Baseline</td>
              <td>Small datasets, maximum accuracy</td>
            </tr>
            <tr>
              <td>INT8 (Scalar)</td>
              <td>4x</td>
              <td>99%+</td>
              <td>Faster</td>
              <td>Medium datasets, balanced</td>
            </tr>
            <tr>
              <td>FP16 (Scalar)</td>
              <td>2x</td>
              <td>99.5%+</td>
              <td>Similar</td>
              <td>GPU acceleration</td>
            </tr>
            <tr>
              <td>PQ</td>
              <td>8-16x</td>
              <td>95-98%</td>
              <td>Faster</td>
              <td>Billion-scale datasets</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="performance">
        <h2>Performance Characteristics</h2>

        <h3>Query Latency</h3>
        <ul>
          <li><strong>HNSW:</strong> 2-5ms for 1M vectors, 4-8ms for 10M vectors</li>
          <li><strong>IVF:</strong> 5-10ms for 100M vectors, 10-15ms for 1B vectors</li>
          <li><strong>With GPU:</strong> 2-3x faster for batch queries</li>
        </ul>

        <h3>Index Build Time</h3>
        <ul>
          <li><strong>HNSW:</strong> ~10-30 minutes for 10M vectors</li>
          <li><strong>IVF:</strong> ~5-15 minutes for 10M vectors</li>
          <li><strong>With GPU:</strong> 3-5x faster clustering for IVF</li>
        </ul>

        <h3>Memory Usage</h3>
        <ul>
          <li><strong>HNSW:</strong> ~1.5-2x vector size (graph structure overhead)</li>
          <li><strong>IVF:</strong> ~1.1-1.3x vector size (centroid storage)</li>
          <li><strong>With INT8:</strong> 4x reduction</li>
          <li><strong>With PQ:</strong> 8-16x reduction</li>
        </ul>

        <h3>Optimization Tips</h3>
        <ul>
          <li>Use HNSW for datasets &lt; 100M vectors for best recall</li>
          <li>Use IVF + PQ for billion-scale datasets</li>
          <li>Enable GPU acceleration for batch operations</li>
          <li>Tune <code>ef_search</code> (HNSW) or <code>probes</code> (IVF) to balance recall and latency</li>
          <li>Monitor index fragmentation and rebuild when needed</li>
        </ul>
      </section>

      <section id="use-cases">
        <h2>Use Cases</h2>

        <h3>Semantic Search</h3>
        <p>Find documents, products, or content based on meaning rather than exact keywords.</p>
        <SqlCodeBlock
          title="Semantic search example"
          code={`-- Find similar documents
SELECT id, title, content
FROM documents
WHERE embedding <=> embed_text('machine learning algorithms', 'text-embedding-ada-002') < 0.3
ORDER BY embedding <=> embed_text('machine learning algorithms', 'text-embedding-ada-002')
LIMIT 10;`}
        />

        <h3>Recommendation Systems</h3>
        <p>Find similar items, users, or content for personalized recommendations.</p>

        <h3>Image Search</h3>
        <p>Search images by visual similarity or text descriptions using CLIP embeddings.</p>

        <h3>Anomaly Detection</h3>
        <p>Identify outliers by finding vectors far from their nearest neighbors.</p>

        <h3>Clustering</h3>
        <p>Group similar vectors together for data analysis and organization.</p>
      </section>

      <section>
        <h2>Related Documentation</h2>
        <ul>
          <li><a href="/docs/neurondb/indexing">Indexing Guide</a> - Detailed index configuration and tuning</li>
          <li><a href="/docs/neurondb/features/distance-metrics">Distance Metrics</a> - Complete distance metric reference</li>
          <li><a href="/docs/neurondb/features/quantization">Quantization</a> - Advanced quantization techniques</li>
          <li><a href="/docs/neurondb/gpu">GPU Acceleration</a> - Accelerate vector operations with GPU</li>
          <li><a href="/docs/neurondb/performance">Performance Tuning</a> - Optimize vector search performance</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}


