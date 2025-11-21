import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'Machine Learning & Embeddings | NeuronDB Documentation',
  description: 'Complete guide to ML inference and embedding generation in NeuronDB with support for multiple models and frameworks',
}

const tableOfContents: TocItem[] = [
  { id: 'ml-capabilities', title: 'ML Capabilities' },
  { id: 'supported-models', title: 'Supported Models' },
  { id: 'ml-functions', title: 'ML Functions' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/analytics',
  label: 'Analytics',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/ml/inference',
  label: 'Inference',
}

export default function MLPage() {
  return (
    <PostgresDocsLayout
      title="Machine Learning & Embeddings"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="ml-capabilities">
        <h2>ML Capabilities</h2>

        <h3>In-Database ML Inference</h3>
        <p>Run ML models directly inside PostgreSQL with zero data movement, batch inference for high throughput, real-time predictions with low latency, and automatic GPU acceleration when available.</p>

        <h3>Embedding Generation</h3>
        <p>Generate embeddings from text, images, and more. Supports OpenAI, Cohere, HuggingFace models, custom model deployment, automatic batching and caching, and multi-modal embeddings (text, image, audio).</p>

        <h3>Model Management</h3>
        <p>Deploy and manage ML models efficiently with model versioning and rollback, A/B testing support, resource quota management, and performance monitoring.</p>
      </section>

      <section id="supported-models">
        <h2>Supported Models</h2>

        <h3>Text Embeddings</h3>
        <ul>
          <li><strong>text-embedding-ada-002</strong> (OpenAI) - 1536 dimensions - General text similarity</li>
          <li><strong>text-embedding-3-small</strong> (OpenAI) - 1536 dimensions - Efficient embeddings</li>
          <li><strong>text-embedding-3-large</strong> (OpenAI) - 3072 dimensions - High quality embeddings</li>
          <li><strong>embed-english-v3.0</strong> (Cohere) - 1024 dimensions - English text</li>
          <li><strong>embed-multilingual-v3.0</strong> (Cohere) - 1024 dimensions - Multilingual text</li>
        </ul>

        <h3>Sentence Transformers</h3>
        <ul>
          <li><strong>all-MiniLM-L6-v2</strong> (HuggingFace) - 384 dimensions - Fast, lightweight</li>
          <li><strong>all-mpnet-base-v2</strong> (HuggingFace) - 768 dimensions - High quality</li>
          <li><strong>paraphrase-multilingual-MiniLM</strong> (HuggingFace) - 384 dimensions - 50+ languages</li>
        </ul>

        <h3>Multimodal</h3>
        <ul>
          <li><strong>CLIP-ViT-B-32</strong> (OpenAI) - 512 dimensions - Image + text</li>
          <li><strong>CLIP-ViT-L-14</strong> (OpenAI) - 768 dimensions - High quality image search</li>
        </ul>
      </section>

      <section id="ml-functions">
        <h2>ML Functions</h2>

        <h3>embed_text()</h3>
        <p>Generate text embeddings with automatic caching.</p>
        <p><strong>Signature:</strong> <code>embed_text(text TEXT, model TEXT DEFAULT 'all-MiniLM-L6-v2') RETURNS vector</code></p>
        <SqlCodeBlock
          title="Example"
          code={`SELECT embed_text('Machine learning with PostgreSQL');`}
        />

        <h3>embed_text_batch()</h3>
        <p>Generate embeddings for multiple texts efficiently.</p>
        <p><strong>Signature:</strong> <code>embed_text_batch(texts TEXT[], model TEXT DEFAULT 'all-MiniLM-L6-v2') RETURNS vector[]</code></p>
        <SqlCodeBlock
          title="Example"
          code={`SELECT embed_text_batch(ARRAY['text1', 'text2'], 'all-MiniLM-L6-v2');`}
        />

        <h3>train_random_forest_classifier()</h3>
        <p>Train Random Forest classifier with GPU support.</p>
        <p><strong>Signature:</strong> <code>train_random_forest_classifier(table_name TEXT, features_col TEXT, label_col TEXT, n_trees INT, max_depth INT)</code></p>
        <SqlCodeBlock
          title="Example"
          code={`SELECT train_random_forest_classifier('training_data', 'features', 'label', 100, 10);`}
        />

        <h3>cluster_kmeans()</h3>
        <p>K-means clustering with GPU acceleration.</p>
        <p><strong>Signature:</strong> <code>cluster_kmeans(table_name TEXT, vector_column TEXT, k INTEGER, max_iter INTEGER DEFAULT 100)</code></p>
        <SqlCodeBlock
          title="Example"
          code={`SELECT cluster_kmeans('documents', 'embedding', 5, 100);`}
        />
      </section>

      <section>
        <h2>Next Steps</h2>
        <ul>
          <li><a href="/docs/neurondb/ml/inference">ONNX Inference</a> - Deploy ONNX models</li>
          <li><a href="/docs/neurondb/ml/embeddings">Embeddings</a> - Generate embeddings</li>
          <li><a href="/docs/neurondb/ml/clustering">Clustering</a> - ML clustering algorithms</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}
