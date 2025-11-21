import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'Vector Types & Features | NeuronDB Documentation',
  description: 'Comprehensive guide to NeuronDB vector data types, operators, and advanced features for AI workloads',
}

const tableOfContents: TocItem[] = [
  { id: 'vector-types', title: 'Vector Data Types' },
  { id: 'vector-operators', title: 'Vector Operators' },
  { id: 'index-types', title: 'Vector Index Types' },
  { id: 'example-usage', title: 'Example Usage' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/indexing',
  label: 'Indexing',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/gpu',
  label: 'GPU Acceleration',
}

export default function VectorTypesPage() {
  return (
    <PostgresDocsLayout
      title="Vector Types & Features"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="vector-types">
        <h2>Vector Data Types</h2>
        <p>NeuronDB provides comprehensive vector data types and operations for AI/ML workloads. Support for dense, sparse, binary vectors with GPU acceleration.</p>

        <h3>vector</h3>
        <p>Standard dense vector type (float32). Up to 16,000 dimensions. Storage: 4 bytes per dimension.</p>
        <p><strong>Use Cases:</strong> Semantic search, Recommendation systems, General embeddings</p>

        <h3>vectorp</h3>
        <p>Packed vector with Product Quantization. Up to 16,000 dimensions. Storage: Compressed (2x-32x smaller).</p>
        <p><strong>Use Cases:</strong> Large-scale search, Memory optimization, Cost reduction</p>

        <h3>halfvec</h3>
        <p>Half-precision vector (float16). Up to 16,000 dimensions. Storage: 2 bytes per dimension.</p>
        <p><strong>Use Cases:</strong> Memory-constrained environments, Mobile deployment, Edge computing</p>

        <h3>sparsevec</h3>
        <p>Sparse vector representation. Up to 1,000,000 dimensions. Storage: Only non-zero values stored.</p>
        <p><strong>Use Cases:</strong> High-dimensional text, Categorical embeddings, TF-IDF vectors</p>

        <h3>binaryvec</h3>
        <p>Binary vector (bit-packed). Up to 64,000 dimensions. Storage: 1 bit per dimension.</p>
        <p><strong>Use Cases:</strong> Hamming distance, Binary embeddings, Fast filtering</p>
      </section>

      <section id="vector-operators">
        <h2>Vector Operators</h2>

        <h3>Distance Functions</h3>
        <ul>
          <li><code>&lt;-&gt;</code> - L2 Distance: Euclidean distance (most common)</li>
          <li><code>&lt;#&gt;</code> - Inner Product: Negative inner product</li>
          <li><code>&lt;=&gt;</code> - Cosine Distance: 1 - cosine similarity</li>
          <li><code>&lt;+&gt;</code> - L1 Distance: Manhattan distance</li>
          <li><code>&lt;%&gt;</code> - Hamming Distance: Binary vector distance</li>
        </ul>

        <h3>Vector Operations</h3>
        <ul>
          <li><code>+</code> - Addition: Element-wise vector addition</li>
          <li><code>-</code> - Subtraction: Element-wise vector subtraction</li>
          <li><code>*</code> - Scalar Multiply: Multiply vector by scalar</li>
          <li><code>||</code> - Concatenation: Combine vectors</li>
        </ul>

        <h3>Comparison</h3>
        <ul>
          <li><code>=</code> - Equals: Exact vector equality</li>
          <li><code>&lt;&gt;</code> - Not Equals: Vector inequality</li>
          <li><code>@&gt;</code> - Contains: Subvector check</li>
        </ul>
      </section>

      <section id="index-types">
        <h2>Vector Index Types</h2>

        <h3>IVFFlat</h3>
        <p>Inverted File with Flat Compression. Best for large datasets (1M+ vectors). Recall: ~95-99%. Build time: Fast. Query time: Fast.</p>

        <h3>HNSW</h3>
        <p>Hierarchical Navigable Small World. Best for high recall requirements. Recall: ~98-99.9%. Build time: Moderate. Query time: Very Fast.</p>

        <h3>LSH</h3>
        <p>Locality Sensitive Hashing. Best for approximate search at scale. Recall: ~90-95%. Build time: Very Fast. Query time: Very Fast.</p>
      </section>

      <section id="example-usage">
        <h2>Example Usage</h2>
        <SqlCodeBlock
          title="Complete example"
          code={`-- Create table with vector column
CREATE TABLE embeddings (
  id SERIAL PRIMARY KEY,
  content TEXT,
  embedding vector(1536)  -- OpenAI ada-002 dimension
);

-- Insert vectors
INSERT INTO embeddings (content, embedding) VALUES
  ('AI and machine learning', '[0.1, 0.2, ...]'),
  ('Database systems', '[0.3, 0.4, ...]');

-- Create HNSW index for fast similarity search
CREATE INDEX ON embeddings USING hnsw (embedding vector_cosine_ops);

-- Find similar embeddings
SELECT content, embedding <=> '[0.15, 0.25, ...]'::vector AS distance
FROM embeddings
ORDER BY embedding <=> '[0.15, 0.25, ...]'::vector
LIMIT 5;

-- Vector operations
SELECT embedding + '[0.1, 0.1, ...]'::vector FROM embeddings LIMIT 1;
SELECT embedding * 2.0 FROM embeddings LIMIT 1;
SELECT embedding || '[0.5]'::vector FROM embeddings LIMIT 1;`}
        />
      </section>

      <section>
        <h2>Related Documentation</h2>
        <ul>
          <li><a href="/docs/neurondb/features/vector-types">Detailed Vector Types Guide</a></li>
          <li><a href="/docs/neurondb/indexing">Vector Indexing Deep Dive</a></li>
          <li><a href="/docs/neurondb/performance">Performance Optimization</a></li>
          <li><a href="/docs/neurondb/gpu">GPU Acceleration Guide</a></li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}
