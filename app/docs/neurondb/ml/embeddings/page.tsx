import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'NeuronDB · Embeddings',
  description: 'Configure providers, generate text embeddings, cache results, and query embeddings with NeuronDB.',
}

const tableOfContents: TocItem[] = [
  { id: 'what-are-embeddings', title: 'What Are Embeddings?' },
  { id: 'why-embeddings-matter', title: 'Why Embeddings Matter' },
  { id: 'text-embeddings', title: 'Text Embeddings' },
  { id: 'image-embeddings', title: 'Image Embeddings' },
  { id: 'batch-generation', title: 'Batch Generation' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/ml/inference',
  label: 'Inference',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/ml/clustering',
  label: 'Clustering',
}

export default function Page() {
  return (
    <PostgresDocsLayout
      title="Understanding Embeddings"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="what-are-embeddings">
        <h2>What Are Embeddings?</h2>
        <p><strong>Embeddings</strong> are dense vector representations of data (text, images, audio) that capture semantic meaning in a high-dimensional space. Unlike traditional keyword-based representations, embeddings encode contextual relationships, allowing machines to understand similarity and meaning.</p>

        <h3>Key Concept</h3>
        <p><strong>Traditional Search:</strong> Matches exact keywords → "machine learning" only finds documents with those exact words</p>
        <p><strong>Semantic Search (Embeddings):</strong> Understands meaning → "machine learning" also finds "neural networks", "AI models", "deep learning"</p>

        <h3>How Embeddings Capture Similarity</h3>
        <pre><code>{`Text "cat"    → [0.8, 0.2, 0.1, ...]     ┐
Text "kitten" → [0.75, 0.25, 0.12, ...]   ├─ Close together (similar meaning)
Text "dog"    → [0.7, 0.3, 0.15, ...]     ┘

Text "car"    → [-0.3, 0.9, -0.5, ...]    ← Far apart (different concept)`}</code></pre>
      </section>

      <section id="why-embeddings-matter">
        <h2>Why Embeddings Matter</h2>

        <h3>Understanding Context</h3>
        <p>Embeddings capture context and meaning. The word "bank" has different embeddings near "river" vs "money" based on context.</p>

        <h3>Language Independence</h3>
        <p>Similar concepts in different languages have similar embeddings. Search in English, find results in Spanish/French/Chinese.</p>

        <h3>Multimodal Capabilities</h3>
        <p>Text, images, and audio can be embedded in the same space. Search for images using text descriptions!</p>
      </section>

      <section id="text-embeddings">
        <h2>Text Embeddings</h2>
        <p>Generate embeddings from text using various models.</p>

        <h3>Basic Usage</h3>
        <SqlCodeBlock
          title="Generate text embedding"
          code={`-- Generate embedding
SELECT embed_text('Hello world', 'text-embedding-ada-002');

-- Use in similarity search
SELECT content, embedding <=> embed_text('PostgreSQL vector search') AS distance
FROM documents
ORDER BY distance
LIMIT 10;`}
        />

        <h3>Supported Models</h3>
        <ul>
          <li>OpenAI: text-embedding-ada-002, text-embedding-3-small, text-embedding-3-large</li>
          <li>Cohere: embed-english-v3.0, embed-multilingual-v3.0</li>
          <li>HuggingFace: all-MiniLM-L6-v2, all-mpnet-base-v2</li>
        </ul>
      </section>

      <section id="image-embeddings">
        <h2>Image Embeddings</h2>
        <p>Generate embeddings from images using CLIP models.</p>
        <SqlCodeBlock
          title="Image embedding"
          code={`SELECT embed_image('/path/to/image.jpg', 'CLIP-ViT-B-32');`}
        />
      </section>

      <section id="batch-generation">
        <h2>Batch Generation</h2>
        <p>Generate embeddings for multiple items efficiently.</p>
        <SqlCodeBlock
          title="Batch embeddings"
          code={`-- Batch text embeddings
SELECT embed_text_batch(
  ARRAY['text1', 'text2', 'text3'],
  'text-embedding-ada-002'
);

-- Use in bulk insert
INSERT INTO documents (content, embedding)
SELECT content, embed_text(content, 'text-embedding-ada-002')
FROM source_documents;`}
        />
      </section>

      <section>
        <h2>Next Steps</h2>
        <ul>
          <li><a href="/docs/neurondb/ml/inference">ONNX Inference</a> - Deploy custom models</li>
          <li><a href="/docs/neurondb/indexing">Vector Indexing</a> - Index embeddings for fast search</li>
          <li><a href="/docs/neurondb/rag">RAG Pipelines</a> - Build RAG applications</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}
