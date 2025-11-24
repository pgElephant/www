import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'Embedding Engine | Multi-Modal Embedding Generation | NeurondB',
  description: 'Multi-modal embedding generation for text, images, and mixed data using state-of-the-art transformer models. Support for OpenAI, Cohere, HuggingFace, and custom models with automatic caching and batch processing.',
  keywords: [
    'embedding engine',
    'text embeddings',
    'image embeddings',
    'multi-modal embeddings',
    'transformer models',
    'OpenAI embeddings',
    'Cohere embeddings',
    'HuggingFace embeddings',
    'CLIP embeddings',
    'sentence transformers',
    'embedding generation',
    'semantic embeddings',
    'vector embeddings'
  ].join(', '),
  alternates: {
    canonical: 'https://www.pgelephant.com/docs/neurondb/embedding-engine',
  },
  openGraph: {
    title: 'Embedding Engine | Multi-Modal Embedding Generation',
    description: 'Generate embeddings for text, images, and mixed data using state-of-the-art transformer models.',
    type: 'article',
    url: 'https://www.pgelephant.com/docs/neurondb/embedding-engine',
  },
}

const tableOfContents: TocItem[] = [
  { id: 'overview', title: 'Overview' },
  { id: 'text-embeddings', title: 'Text Embeddings' },
  { id: 'image-embeddings', title: 'Image Embeddings' },
  { id: 'multi-modal', title: 'Multi-Modal Embeddings' },
  { id: 'models', title: 'Supported Models' },
  { id: 'caching', title: 'Caching & Performance' },
  { id: 'use-cases', title: 'Use Cases' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/ml-engine',
  label: 'ML Engine',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/gpu',
  label: 'GPU Accelerator',
}

export default function EmbeddingEnginePage() {
  return (
    <PostgresDocsLayout
      title="Embedding Engine"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="overview">
        <h2>Overview</h2>
        <p>
          The <strong>Embedding Engine</strong> provides multi-modal embedding generation capabilities, transforming 
          text, images, and mixed data into dense vector representations using state-of-the-art transformer models. 
          With support for OpenAI, Cohere, HuggingFace, and custom models, the Embedding Engine enables semantic 
          search, similarity matching, and AI-powered applications directly in PostgreSQL.
        </p>

        <h3>Key Features</h3>
        <ul>
          <li><strong>Multi-Modal Support:</strong> Text, images, audio, and mixed data embeddings</li>
          <li><strong>Multiple Providers:</strong> OpenAI, Cohere, HuggingFace, and custom models</li>
          <li><strong>Automatic Caching:</strong> Intelligent caching to reduce API calls and latency</li>
          <li><strong>Batch Processing:</strong> Efficient batch generation for high-throughput scenarios</li>
          <li><strong>GPU Acceleration:</strong> Automatic GPU offload for transformer models</li>
          <li><strong>Model Management:</strong> Version control, A/B testing, and model switching</li>
        </ul>

        <h3>What Are Embeddings?</h3>
        <p>
          Embeddings are dense vector representations that capture semantic meaning in a high-dimensional space. 
          Unlike traditional keyword-based representations, embeddings encode contextual relationships, enabling 
          machines to understand similarity and meaning across different data types.
        </p>

        <h3>Why Use Embeddings?</h3>
        <ul>
          <li><strong>Semantic Understanding:</strong> Find conceptually similar content, not just exact matches</li>
          <li><strong>Language Independence:</strong> Similar concepts in different languages have similar embeddings</li>
          <li><strong>Cross-Modal Search:</strong> Search images with text, or text with images</li>
          <li><strong>Context Awareness:</strong> Understand meaning based on surrounding context</li>
        </ul>
      </section>

      <section id="text-embeddings">
        <h2>Text Embeddings</h2>
        <p>
          Generate embeddings from text using various transformer models optimized for different use cases, 
          languages, and quality requirements.
        </p>

        <h3>Basic Usage</h3>
        <SqlCodeBlock
          title="Generate text embedding"
          code={`-- Generate embedding for a single text
SELECT embed_text('Machine learning with PostgreSQL', 'text-embedding-ada-002');

-- Use in similarity search
SELECT 
  id,
  content,
  embedding <=> embed_text('PostgreSQL vector search', 'text-embedding-ada-002') AS distance
FROM documents
ORDER BY distance
LIMIT 10;`}
        />

        <h3>Batch Generation</h3>
        <p>
          Generate embeddings for multiple texts efficiently with automatic batching and parallel processing.
        </p>
        <SqlCodeBlock
          title="Batch text embeddings"
          code={`-- Generate embeddings for multiple texts
SELECT embed_text_batch(
  ARRAY[
    'First document text',
    'Second document text',
    'Third document text'
  ],
  'text-embedding-ada-002'
) AS embeddings;

-- Bulk insert with embeddings
INSERT INTO documents (content, embedding)
SELECT 
  content,
  embed_text(content, 'text-embedding-ada-002')
FROM source_documents
WHERE embedding IS NULL;`}
        />

        <h3>Supported Text Models</h3>
        <table>
          <thead>
            <tr>
              <th>Provider</th>
              <th>Model</th>
              <th>Dimensions</th>
              <th>Best For</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>OpenAI</td>
              <td>text-embedding-ada-002</td>
              <td>1536</td>
              <td>General purpose, production-ready</td>
            </tr>
            <tr>
              <td>OpenAI</td>
              <td>text-embedding-3-small</td>
              <td>1536</td>
              <td>Cost-effective, high quality</td>
            </tr>
            <tr>
              <td>OpenAI</td>
              <td>text-embedding-3-large</td>
              <td>3072</td>
              <td>Maximum quality, larger vectors</td>
            </tr>
            <tr>
              <td>Cohere</td>
              <td>embed-english-v3.0</td>
              <td>1024</td>
              <td>English text, high quality</td>
            </tr>
            <tr>
              <td>Cohere</td>
              <td>embed-multilingual-v3.0</td>
              <td>1024</td>
              <td>100+ languages</td>
            </tr>
            <tr>
              <td>HuggingFace</td>
              <td>all-MiniLM-L6-v2</td>
              <td>384</td>
              <td>Fast, lightweight, self-hosted</td>
            </tr>
            <tr>
              <td>HuggingFace</td>
              <td>all-mpnet-base-v2</td>
              <td>768</td>
              <td>High quality, self-hosted</td>
            </tr>
            <tr>
              <td>HuggingFace</td>
              <td>paraphrase-multilingual-MiniLM</td>
              <td>384</td>
              <td>50+ languages, self-hosted</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="image-embeddings">
        <h2>Image Embeddings</h2>
        <p>
          Generate embeddings from images using CLIP (Contrastive Language-Image Pre-training) models, enabling 
          cross-modal search between images and text.
        </p>

        <h3>Basic Usage</h3>
        <SqlCodeBlock
          title="Generate image embedding"
          code={`-- Generate embedding from image file
SELECT embed_image('/path/to/image.jpg', 'CLIP-ViT-B-32');

-- Generate from image URL
SELECT embed_image_url('https://example.com/image.jpg', 'CLIP-ViT-B-32');

-- Generate from base64 encoded image
SELECT embed_image_base64(base64_data, 'CLIP-ViT-B-32')
FROM image_data;`}
        />

        <h3>Image Search</h3>
        <p>
          Search images by visual similarity or using text descriptions.
        </p>
        <SqlCodeBlock
          title="Image similarity search"
          code={`-- Find similar images
SELECT 
  id,
  image_path,
  image_embedding <=> query_embedding AS distance
FROM images,
     (SELECT embed_image('/path/to/query.jpg', 'CLIP-ViT-B-32') AS query_embedding) q
ORDER BY distance
LIMIT 10;

-- Search images with text
SELECT 
  id,
  image_path,
  image_embedding <=> embed_text('a red sports car', 'CLIP-ViT-B-32') AS distance
FROM images
ORDER BY distance
LIMIT 10;`}
        />

        <h3>Supported Image Models</h3>
        <table>
          <thead>
            <tr>
              <th>Model</th>
              <th>Dimensions</th>
              <th>Best For</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>CLIP-ViT-B-32</td>
              <td>512</td>
              <td>General purpose, fast</td>
            </tr>
            <tr>
              <td>CLIP-ViT-L-14</td>
              <td>768</td>
              <td>High quality, detailed images</td>
            </tr>
            <tr>
              <td>CLIP-ViT-B-16</td>
              <td>512</td>
              <td>Balanced quality and speed</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="multi-modal">
        <h2>Multi-Modal Embeddings</h2>
        <p>
          Combine text and image embeddings in the same vector space, enabling cross-modal search and unified 
          semantic understanding across different data types.
        </p>

        <h3>Cross-Modal Search</h3>
        <SqlCodeBlock
          title="Cross-modal search"
          code={`-- Search images with text
SELECT 
  id,
  image_path,
  image_embedding <=> embed_text('a sunset over mountains', 'CLIP-ViT-B-32') AS similarity
FROM images
ORDER BY similarity
LIMIT 10;

-- Search text with images
SELECT 
  id,
  content,
  text_embedding <=> embed_image('/path/to/query.jpg', 'CLIP-ViT-B-32') AS similarity
FROM documents
ORDER BY similarity
LIMIT 10;`}
        />

        <h3>Unified Embedding Space</h3>
        <p>
          Store text and image embeddings in the same table and search across both modalities simultaneously.
        </p>
        <SqlCodeBlock
          title="Unified search"
          code={`-- Create unified content table
CREATE TABLE content (
  id SERIAL PRIMARY KEY,
  type TEXT,  -- 'text' or 'image'
  content TEXT,  -- text content or image path
  embedding vector(512)  -- CLIP embeddings
);

-- Insert text and images
INSERT INTO content (type, content, embedding)
SELECT 
  'text',
  content,
  embed_text(content, 'CLIP-ViT-B-32')
FROM text_documents;

INSERT INTO content (type, content, embedding)
SELECT 
  'image',
  image_path,
  embed_image(image_path, 'CLIP-ViT-B-32')
FROM images;

-- Search across all content types
SELECT 
  type,
  content,
  embedding <=> embed_text('nature photography', 'CLIP-ViT-B-32') AS similarity
FROM content
ORDER BY similarity
LIMIT 20;`}
        />
      </section>

      <section id="models">
        <h2>Supported Models</h2>

        <h3>OpenAI Models</h3>
        <ul>
          <li><strong>text-embedding-ada-002:</strong> General purpose, 1536 dimensions, production-ready</li>
          <li><strong>text-embedding-3-small:</strong> Cost-effective, 1536 dimensions</li>
          <li><strong>text-embedding-3-large:</strong> Maximum quality, 3072 dimensions</li>
        </ul>

        <h3>Cohere Models</h3>
        <ul>
          <li><strong>embed-english-v3.0:</strong> High-quality English embeddings, 1024 dimensions</li>
          <li><strong>embed-multilingual-v3.0:</strong> 100+ languages, 1024 dimensions</li>
        </ul>

        <h3>HuggingFace Models</h3>
        <ul>
          <li><strong>all-MiniLM-L6-v2:</strong> Fast, lightweight, 384 dimensions</li>
          <li><strong>all-mpnet-base-v2:</strong> High quality, 768 dimensions</li>
          <li><strong>paraphrase-multilingual-MiniLM:</strong> 50+ languages, 384 dimensions</li>
        </ul>

        <h3>CLIP Models</h3>
        <ul>
          <li><strong>CLIP-ViT-B-32:</strong> General purpose, 512 dimensions</li>
          <li><strong>CLIP-ViT-L-14:</strong> High quality, 768 dimensions</li>
        </ul>

        <h3>Custom Models</h3>
        <p>
          Deploy custom transformer models in ONNX format for specialized use cases.
        </p>
        <SqlCodeBlock
          title="Deploy custom model"
          code={`-- Deploy custom ONNX model
SELECT deploy_embedding_model(
  model_name => 'custom_text_encoder',
  model_path => '/path/to/model.onnx',
  input_type => 'text',
  output_dim => 768
);

-- Use custom model
SELECT embed_text('sample text', 'custom_text_encoder');`}
        />
      </section>

      <section id="caching">
        <h2>Caching & Performance</h2>

        <h3>Automatic Caching</h3>
        <p>
          The Embedding Engine automatically caches embeddings to reduce API calls, latency, and costs. 
          Identical inputs return cached results instantly.
        </p>
        <SqlCodeBlock
          title="Caching configuration"
          code={`-- Configure embedding cache
SET neurondb.embedding_cache_size = 10000;  -- Cache 10K embeddings
SET neurondb.embedding_cache_ttl = 86400;     -- 24 hour TTL

-- Check cache statistics
SELECT * FROM neurondb_embedding_cache_stats();

-- Clear cache
SELECT clear_embedding_cache();`}
        />

        <h3>Batch Processing</h3>
        <p>
          Process multiple embeddings in parallel for improved throughput and efficiency.
        </p>
        <SqlCodeBlock
          title="Batch processing"
          code={`-- Batch processing with automatic parallelization
SELECT embed_text_batch(
  texts,
  'text-embedding-ada-002',
  batch_size => 100,
  parallel => true
)
FROM (
  SELECT array_agg(content) AS texts
  FROM documents
  WHERE embedding IS NULL
) batch;`}
        />

        <h3>Performance Metrics</h3>
        <ul>
          <li><strong>Single Embedding (API):</strong> 50-200ms (depends on provider)</li>
          <li><strong>Single Embedding (Cached):</strong> &lt; 1ms</li>
          <li><strong>Batch (100 items, API):</strong> 200-500ms</li>
          <li><strong>Batch (100 items, Local):</strong> 10-50ms (GPU: 2-10ms)</li>
        </ul>

        <h3>Optimization Tips</h3>
        <ul>
          <li>Enable caching for frequently accessed content</li>
          <li>Use batch processing for bulk operations</li>
          <li>Deploy local models (HuggingFace) for low-latency requirements</li>
          <li>Use GPU acceleration for local transformer models</li>
          <li>Pre-compute embeddings during data ingestion</li>
        </ul>
      </section>

      <section id="use-cases">
        <h2>Use Cases</h2>

        <h3>Semantic Search</h3>
        <p>
          Find documents, products, or content based on meaning rather than exact keywords.
        </p>

        <h3>Recommendation Systems</h3>
        <p>
          Recommend similar items, users, or content based on embedding similarity.
        </p>

        <h3>Image Search</h3>
        <p>
          Search images by visual similarity or text descriptions using CLIP embeddings.
        </p>

        <h3>Content Moderation</h3>
        <p>
          Identify similar content, detect duplicates, and flag inappropriate material.
        </p>

        <h3>Multilingual Search</h3>
        <p>
          Search across multiple languages using multilingual embedding models.
        </p>

        <h3>RAG Applications</h3>
        <p>
          Generate embeddings for retrieval augmented generation (RAG) pipelines.
        </p>
      </section>

      <section>
        <h2>Related Documentation</h2>
        <ul>
          <li><a href="/docs/neurondb/ml/embeddings">Embeddings Guide</a> - Detailed embedding documentation</li>
          <li><a href="/docs/neurondb/ml/embedding-generation">Embedding Generation</a> - Advanced embedding techniques</li>
          <li><a href="/docs/neurondb/vector-engine">Vector Engine</a> - Index and search embeddings</li>
          <li><a href="/docs/neurondb/gpu">GPU Accelerator</a> - Accelerate embedding generation</li>
          <li><a href="/docs/neurondb/rag">RAG Pipelines</a> - Build RAG applications with embeddings</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}

