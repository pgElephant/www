import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'NeuronDB · Vector Types',
  description: 'Dense vectors, packed vectors, sparse maps, vector graphs, and retrieval text types in NeuronDB.',
}

const tableOfContents: TocItem[] = [
  { id: 'what-are-vectors', title: 'What Are Vectors?' },
  { id: 'why-vectors', title: 'Why Use Vectors?' },
  { id: 'vector-types', title: 'Vector Types' },
  { id: 'usage-examples', title: 'Usage Examples' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/features',
  label: 'Features',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/features/distance-metrics',
  label: 'Distance Metrics',
}

export default function Page() {
  return (
    <PostgresDocsLayout
      title="Vector Types in NeurondB"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="what-are-vectors">
        <h2>What Are Vectors?</h2>
        <p>A <strong>vector</strong> is a mathematical object represented as an array of numbers. In AI and machine learning, vectors represent data (text, images, audio) in numerical format that computers can process and compare.</p>

        <h3>Example Vector</h3>
        <pre><code>{`[0.234, -0.891, 0.456, 0.123, -0.678]`}</code></pre>
        <p>This is a 5-dimensional vector where each number represents a feature.</p>

        <h3>Traditional Database vs Vector Database</h3>
        <p><strong>Traditional Database:</strong> Stores structured data: numbers, text, dates. Searches using exact matches or patterns.</p>
        <p><strong>Vector Database:</strong> Stores numerical representations of data. Searches by semantic similarity and meaning.</p>
      </section>

      <section id="why-vectors">
        <h2>Why Use Vectors?</h2>

        <h3>Semantic Search</h3>
        <p>Find similar items based on <em>meaning</em>, not just keywords. Search for "laptop" and get results for "notebook computer", "portable PC".</p>

        <h3>Recommendations</h3>
        <p>Build recommendation systems that suggest related products, content, or services based on similarity.</p>

        <h3>Anomaly Detection</h3>
        <p>Identify outliers and unusual patterns in high-dimensional data.</p>

        <h3>Clustering</h3>
        <p>Group similar items together for analysis and organization.</p>
      </section>

      <section id="vector-types">
        <h2>Vector Types</h2>

        <h3>vector(n)</h3>
        <p>Standard dense vector type (float32). Up to 16,000 dimensions. Storage: 4 bytes per dimension.</p>
        <SqlCodeBlock
          title="vector type"
          code={`CREATE TABLE documents (
  id SERIAL PRIMARY KEY,
  embedding vector(1536)
);

INSERT INTO documents (embedding) VALUES ('[0.1, 0.2, 0.3]');`}
        />

        <h3>vectorp</h3>
        <p>Packed vector with Product Quantization. Compressed (2x-32x smaller). Best for large-scale search and memory optimization.</p>

        <h3>halfvec</h3>
        <p>Half-precision vector (float16). 2 bytes per dimension. Best for memory-constrained environments.</p>

        <h3>sparsevec</h3>
        <p>Sparse vector representation. Up to 1,000,000 dimensions. Only non-zero values stored. Best for high-dimensional text and TF-IDF vectors.</p>

        <h3>binaryvec</h3>
        <p>Binary vector (bit-packed). 1 bit per dimension. Best for Hamming distance and binary embeddings.</p>
      </section>

      <section id="usage-examples">
        <h2>Usage Examples</h2>
        <SqlCodeBlock
          title="Complete example"
          code={`-- Create table with different vector types
CREATE TABLE documents (
  id SERIAL PRIMARY KEY,
  dense_embedding vector(1536),
  sparse_features sparsevec,
  binary_fingerprint binaryvec
);

-- Insert vectors
INSERT INTO documents (dense_embedding, sparse_features, binary_fingerprint)
VALUES (
  '[0.1, 0.2, ...]'::vector(1536),
  sparsevec_from_map('{"0": 0.5, "100": 0.3, "500": 0.8}'),
  binaryvec_from_array(ARRAY[1,0,1,1,0]::int[])
);

-- Search with different types
SELECT id FROM documents
WHERE dense_embedding <=> '[0.1, 0.2, ...]'::vector < 0.5;`}
        />
      </section>

      <section>
        <h2>Next Steps</h2>
        <ul>
          <li><a href="/docs/neurondb/features/distance-metrics">Distance Metrics</a> - Learn about distance functions</li>
          <li><a href="/docs/neurondb/indexing">Indexing</a> - Index vectors for fast search</li>
          <li><a href="/docs/neurondb/features/quantization">Quantization</a> - Compress vectors</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}
