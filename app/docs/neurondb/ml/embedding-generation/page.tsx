import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'Embedding Generation | NeuronDB ML',
  description: 'Generate embeddings from text, images, and multimodal data with intelligent caching in NeuronDB.',
}

const tableOfContents: TocItem[] = [
  { id: 'overview', title: 'Overview' },
  { id: 'text-embeddings', title: 'Text Embeddings' },
  { id: 'batch-generation', title: 'Batch Generation' },
  { id: 'caching', title: 'Caching' },
  { id: 'configuration', title: 'Configuration' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/ml/recommendation-systems',
  label: 'Recommendation Systems',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/ml/inference',
  label: 'Model Inference',
}

export default function EmbeddingGenerationPage() {
  return (
    <PostgresDocsLayout
      title="Embedding Generation"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="overview">
        <h2>Overview</h2>
        <p>Generate embeddings from text, images, and multimodal data with intelligent caching.</p>
      </section>

      <section id="text-embeddings">
        <h2>Text Embeddings</h2>
        <p>Generate embeddings from text using the <code>embed_text</code> function. NeuronDB supports multiple embedding models and automatically caches results for performance.</p>
        
        <h3>Basic Text Embedding</h3>
        <SqlCodeBlock
          title="Generate text embedding"
          code={`-- Basic text embedding (uses default model)
SELECT 
    'Hello, world!' AS text,
    embed_text('Hello, world!') AS embedding,
    vector_dims(embed_text('Hello, world!')) AS dimensions;

-- Verify embedding is not null
SELECT 
    embed_text('Hello, world!') IS NOT NULL AS not_null,
    vector_dims(embed_text('Hello, world!')) AS dims;`}
        />
        <p><strong>Function Signature:</strong></p>
        <pre><code>embed_text(
    text TEXT,                    -- Input text
    model_name TEXT DEFAULT NULL  -- Optional model name
) RETURNS VECTOR                  -- Returns embedding vector</code></pre>

        <h3>Specify Embedding Model</h3>
        <SqlCodeBlock
          title="Generate with specific model"
          code={`-- Use specific embedding model
SELECT 
    embed_text('Test text', 'sentence-transformers/all-MiniLM-L6-v2') AS embedding,
    vector_dims(embed_text('Test text', 'sentence-transformers/all-MiniLM-L6-v2')) AS dims;

-- Common models:
-- 'all-MiniLM-L6-v2' (default, 384 dimensions)
-- 'sentence-transformers/all-MiniLM-L6-v2' (384 dimensions)
-- 'all-mpnet-base-v2' (768 dimensions)
-- 'text-embedding-ada-002' (1536 dimensions, requires API key)`}
        />

        <h3>Embedding Consistency</h3>
        <p>Same text produces the same embedding (cached):</p>
        <SqlCodeBlock
          title="Vector consistency"
          code={`-- Same text produces same embedding
WITH embeddings AS (
    SELECT
        embed_text('Consistency test') AS vec1,
        embed_text('Consistency test') AS vec2
)
SELECT
    vector_dims(vec1) = vector_dims(vec2) AS dims_match,
    vec1 <-> vec2 AS distance  -- Should be 0 or very close
FROM embeddings;`}
        />

        <h3>Unicode and Special Characters</h3>
        <SqlCodeBlock
          title="Unicode support"
          code={`-- Unicode and special characters are supported
SELECT 
    vector_dims(embed_text('Hello 世界 🌍')) AS unicode_dims,
    vector_dims(embed_text('Text with "quotes" and ''apostrophes''')) AS special_chars_dims;`}
        />

        <h3>Long Text</h3>
        <SqlCodeBlock
          title="Long text embedding"
          code={`-- Long text is automatically handled
SELECT 
    vector_dims(embed_text(repeat('This is a long text. ', 100))) AS long_text_dims;`}
        />
      </section>

      <section id="batch-generation">
        <h2>Batch Generation</h2>
        <p>Generate embeddings for multiple texts efficiently using batch functions. Batch processing is faster and more efficient than individual calls.</p>
        <SqlCodeBlock
          title="Batch embedding generation"
          code={`-- Batch embedding generation
-- Returns: array of vectors
SELECT embed_text_batch(
    ARRAY['First text', 'Second text', 'Third text']
) AS embeddings;

-- Use with table data
WITH texts AS (
    SELECT ARRAY_AGG(content) AS text_array
    FROM documents
    LIMIT 100
)
SELECT 
    embed_text_batch(text_array) AS batch_embeddings
FROM texts;

-- Process embeddings from batch
SELECT 
    unnest(embed_text_batch(ARRAY['text1', 'text2', 'text3'])) AS embedding;`}
        />
        <p><strong>Function Signature:</strong></p>
        <pre><code>embed_text_batch(
    texts TEXT[],              -- Array of text strings
    model_name TEXT DEFAULT NULL
) RETURNS VECTOR[]             -- Returns array of vectors</code></pre>
        <p><strong>Performance:</strong> Batch generation is significantly faster than individual <code>embed_text()</code> calls, especially when GPU acceleration is enabled.</p>
      </section>

      <section id="caching">
        <h2>Caching</h2>
        <p>Embeddings are automatically cached to improve performance. The cache stores embeddings by text content and model name, avoiding redundant computation.</p>
        <SqlCodeBlock
          title="View cache statistics"
          code={`-- View embedding cache statistics
SELECT * FROM neurondb.embedding_cache_stats;

-- View cached embeddings
SELECT 
    cache_key,
    model_name,
    vector_dims(embedding) AS dims,
    created_at
FROM neurondb.embedding_cache
ORDER BY created_at DESC
LIMIT 10;

-- Check cache hit rate
SELECT 
    cache_hits,
    cache_misses,
    ROUND(100.0 * cache_hits / NULLIF(cache_hits + cache_misses, 0), 2) AS hit_rate_percent
FROM neurondb.embedding_cache_stats;`}
        />
        <p><strong>Cache Configuration:</strong></p>
        <ul>
          <li>Cache is enabled by default</li>
          <li>Cache key is based on text content and model name</li>
          <li>Cache size is configurable via <code>neurondb.embedding_cache_size</code></li>
          <li>Cache automatically evicts least recently used entries when full</li>
        </ul>
      </section>

      <section id="configuration">
        <h2>Configuration</h2>
        <p>Configure embedding generation via PostgreSQL GUC settings:</p>
        <SqlCodeBlock
          title="Embedding configuration"
          code={`-- Set default embedding model
SET neurondb.default_embedding_model = 'all-MiniLM-L6-v2';

-- Configure LLM API key for external models (Hugging Face)
SET neurondb.llm_api_key = 'your-api-key';

-- Enable GPU acceleration for embeddings
SET neurondb.gpu_enabled = true;

-- Configure cache size (number of entries)
SET neurondb.embedding_cache_size = 10000;`}
        />
        <p><strong>Note:</strong> If LLM is not configured, <code>embed_text()</code> gracefully returns zero vectors as fallback. Configure API keys or enable GPU for real embeddings.</p>
      </section>

      <section>
        <h2>Learn More</h2>
        <p>
          For detailed documentation on embedding models, providers, caching strategies, and multimodal embeddings, visit:{' '}
          <a href="https://pgelephant.com/neurondb/ml/embeddings/" target="_blank" rel="noopener noreferrer">
            Embedding Generation Documentation
          </a>
        </p>
      </section>

      <section>
        <h2>Related Topics</h2>
        <ul>
          <li><a href="/docs/neurondb/ml/model-management">Model Management</a> - Manage embedding models</li>
          <li><a href="/docs/neurondb/indexing">Vector Search</a> - Index and search embeddings</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}

