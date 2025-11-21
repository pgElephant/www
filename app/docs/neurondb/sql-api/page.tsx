import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'SQL API Reference | NeuronDB',
  description: 'Complete SQL API reference for NeuronDB functions, operators, and configuration parameters.',
}

const tableOfContents: TocItem[] = [
  { id: 'vector-types', title: 'Vector Types' },
  { id: 'distance-operators', title: 'Distance Operators' },
  { id: 'embedding-functions', title: 'Embedding Functions' },
  { id: 'index-functions', title: 'Index Functions' },
  { id: 'ml-functions', title: 'ML Functions' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/performance',
  label: 'Performance',
}

const nextLink: NavLink | undefined = undefined

export default function SqlApiPage() {
  return (
    <PostgresDocsLayout
      title="SQL API Reference"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="vector-types">
        <h2>Vector Types</h2>

        <h3>vector(n)</h3>
        <p>A fixed-dimension vector of floating-point numbers.</p>
        <SqlCodeBlock
          title="Vector type examples"
          code={`-- Create table with vector column
CREATE TABLE embeddings (
  id SERIAL PRIMARY KEY,
  embedding vector(1536)  -- 1536-dimensional vector
);

-- Insert vectors
INSERT INTO embeddings (embedding) VALUES ('[1, 2, 3]');
INSERT INTO embeddings (embedding) VALUES (ARRAY[1.0, 2.0, 3.0]::vector);

-- Cast from array
SELECT ARRAY[1.0, 2.0, 3.0]::vector(3);`}
        />
      </section>

      <section id="distance-operators">
        <h2>Distance Operators</h2>
        <table>
          <thead>
            <tr>
              <th>Operator</th>
              <th>Description</th>
              <th>Return Type</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>&lt;-&gt;</code></td>
              <td>L2 (Euclidean) distance</td>
              <td><code>float</code></td>
              <td><code>embedding &lt;-&gt; '[1,2,3]'</code></td>
            </tr>
            <tr>
              <td><code>&lt;=&gt;</code></td>
              <td>Cosine distance</td>
              <td><code>float</code></td>
              <td><code>embedding &lt;=&gt; '[1,2,3]'</code></td>
            </tr>
            <tr>
              <td><code>&lt;#&gt;</code></td>
              <td>Inner product (negative dot product)</td>
              <td><code>float</code></td>
              <td><code>embedding &lt;#&gt; '[1,2,3]'</code></td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="embedding-functions">
        <h2>Embedding Functions</h2>

        <h3>neurondb_embed(text, model)</h3>
        <p>Generate embeddings using configured LLM providers.</p>
        <p><strong>Parameters:</strong> text (TEXT), model (TEXT)</p>
        <p><strong>Returns:</strong> vector</p>
        <SqlCodeBlock
          title="Embedding generation"
          code={`-- Configure OpenAI provider
SET neurondb.llm_provider = 'openai';
SET neurondb.llm_api_key = 'sk-...';

-- Generate embedding
SELECT neurondb_embed('Hello world', 'text-embedding-ada-002');

-- Batch embeddings
INSERT INTO documents (content, embedding)
SELECT content, neurondb_embed(content, 'text-embedding-ada-002')
FROM documents WHERE embedding IS NULL;`}
        />
      </section>

      <section id="index-functions">
        <h2>Index Functions</h2>

        <h3>Creating Indexes</h3>
        <SqlCodeBlock
          title="Index creation"
          code={`-- HNSW index
CREATE INDEX ON documents USING hnsw (embedding vector_l2_ops)
WITH (m = 16, ef_construction = 64);

-- IVF index
CREATE INDEX ON documents USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);`}
        />
      </section>

      <section id="ml-functions">
        <h2>ML Functions</h2>

        <h3>cluster_kmeans</h3>
        <p>K-Means clustering algorithm.</p>
        <SqlCodeBlock
          title="K-Means clustering"
          code={`SELECT *
FROM cluster_kmeans(
  (SELECT embedding FROM documents),
  5,         -- k
  500,       -- max_iter
  0.001      -- tol
);`}
        />
      </section>

      <section>
        <h2>Next Steps</h2>
        <ul>
          <li><a href="/docs/neurondb/indexing">Indexing Guide</a> - Learn about vector indexes</li>
          <li><a href="/docs/neurondb/ml">ML Functions</a> - Complete ML API reference</li>
          <li><a href="/docs/neurondb/configuration">Configuration</a> - All GUC parameters</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}
