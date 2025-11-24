import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'Advanced Features | Hybrid Search, Reranking, RAG & Caching | NeurondB',
  description: 'Hybrid search, reranking, RAG pipelines, and intelligent caching for production-ready AI applications. Combine vector search with full-text search, improve relevance with reranking, and build end-to-end RAG systems.',
  keywords: [
    'advanced features',
    'hybrid search',
    'reranking',
    'RAG pipelines',
    'intelligent caching',
    'production AI',
    'hybrid retrieval',
    'cross-encoder',
    'reciprocal rank fusion',
    'retrieval augmented generation',
    'semantic caching',
    'query caching'
  ].join(', '),
  alternates: {
    canonical: 'https://www.pgelephant.com/docs/neurondb/advanced-features',
  },
  openGraph: {
    title: 'Advanced Features | Hybrid Search, Reranking, RAG & Caching',
    description: 'Production-ready AI features: hybrid search, reranking, RAG pipelines, and intelligent caching.',
    type: 'article',
    url: 'https://www.pgelephant.com/docs/neurondb/advanced-features',
  },
}

const tableOfContents: TocItem[] = [
  { id: 'overview', title: 'Overview' },
  { id: 'hybrid-search', title: 'Hybrid Search' },
  { id: 'reranking', title: 'Reranking' },
  { id: 'rag-pipelines', title: 'RAG Pipelines' },
  { id: 'intelligent-caching', title: 'Intelligent Caching' },
  { id: 'production-patterns', title: 'Production Patterns' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/background-workers',
  label: 'Background Workers',
}

const nextLink: NavLink | undefined = undefined

export default function AdvancedFeaturesPage() {
  return (
    <PostgresDocsLayout
      title="Advanced Features"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="overview">
        <h2>Overview</h2>
        <p>
          <strong>Advanced Features</strong> provide production-ready capabilities for building sophisticated AI 
          applications. These features combine multiple techniques to deliver superior search relevance, intelligent 
          caching, and end-to-end RAG (Retrieval Augmented Generation) pipelines.
        </p>

        <h3>Key Capabilities</h3>
        <ul>
          <li><strong>Hybrid Search:</strong> Combine vector similarity with full-text search for best results</li>
          <li><strong>Reranking:</strong> Improve relevance with cross-encoder and LLM-based reranking</li>
          <li><strong>RAG Pipelines:</strong> End-to-end retrieval augmented generation workflows</li>
          <li><strong>Intelligent Caching:</strong> Semantic caching for embeddings, queries, and results</li>
        </ul>

        <h3>Production Benefits</h3>
        <ul>
          <li><strong>Higher Relevance:</strong> Hybrid search and reranking improve result quality</li>
          <li><strong>Lower Latency:</strong> Intelligent caching reduces computation and API calls</li>
          <li><strong>Better UX:</strong> RAG pipelines provide accurate, context-aware responses</li>
          <li><strong>Cost Efficiency:</strong> Caching reduces API costs and improves throughput</li>
        </ul>
      </section>

      <section id="hybrid-search">
        <h2>Hybrid Search</h2>
        <p>
          Hybrid search combines <strong>vector similarity search</strong> (semantic understanding) with 
          <strong>full-text search</strong> (keyword matching) to deliver superior search results that understand 
          both context and exact terms.
        </p>

        <h3>Why Hybrid Search?</h3>
        <ul>
          <li><strong>Vector Search Alone:</strong> Understands meaning but may miss exact keyword matches</li>
          <li><strong>Full-Text Search Alone:</strong> Precise keywords but no semantic understanding</li>
          <li><strong>Hybrid Search:</strong> Best of both worlds - semantic understanding + exact matching</li>
        </ul>

        <h3>Implementation</h3>
        <SqlCodeBlock
          title="Hybrid search query"
          code={`-- Combine vector and full-text search with weighted scoring
WITH vector_results AS (
  SELECT id, content,
         embedding <=> embed_text('PostgreSQL replication', 'text-embedding-ada-002') AS distance
  FROM documents
  ORDER BY distance
  LIMIT 20
),
text_results AS (
  SELECT id, content,
         ts_rank(to_tsvector('english', content), 
                 to_tsquery('english', 'PostgreSQL & replication')) AS rank
  FROM documents
  WHERE to_tsvector('english', content) @@ to_tsquery('english', 'PostgreSQL & replication')
  ORDER BY rank DESC
  LIMIT 20
)
SELECT 
  COALESCE(v.id, t.id) AS id,
  COALESCE(v.content, t.content) AS content,
  -- Weighted combination: 70% vector, 30% text
  COALESCE(1.0 - v.distance, 0.0) * 0.7 + COALESCE(t.rank, 0.0) * 0.3 AS hybrid_score
FROM vector_results v
FULL OUTER JOIN text_results t ON v.id = t.id
ORDER BY hybrid_score DESC
LIMIT 10;`}
        />

        <h3>Reciprocal Rank Fusion (RRF)</h3>
        <p>
          RRF combines rankings from multiple sources without requiring score normalization.
        </p>
        <SqlCodeBlock
          title="RRF hybrid search"
          code={`WITH vector_ranked AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY embedding <=> embed_text('query', 'text-embedding-ada-002')) AS v_rank
  FROM documents
  LIMIT 100
),
text_ranked AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY ts_rank(...) DESC) AS t_rank
  FROM documents
  WHERE to_tsvector('english', content) @@ to_tsquery('english', 'query')
  LIMIT 100
)
SELECT v.id,
       -- RRF formula: 1/(60 + rank) for each source
       1.0 / (60 + v.v_rank) + 1.0 / (60 + COALESCE(t.t_rank, 1000)) AS rrf_score
FROM vector_ranked v
LEFT JOIN text_ranked t ON v.id = t.id
ORDER BY rrf_score DESC
LIMIT 10;`}
        />

        <h3>Best Practices</h3>
        <ul>
          <li>Use 60-70% weight for vector search, 30-40% for full-text search</li>
          <li>Normalize scores from both sources before combining</li>
          <li>Consider query type: semantic queries favor vector, exact terms favor text</li>
          <li>Monitor recall and precision metrics to tune weights</li>
        </ul>
      </section>

      <section id="reranking">
        <h2>Reranking</h2>
        <p>
          Reranking improves search relevance by re-scoring initial results using more sophisticated models. 
          This two-stage approach (retrieve then rerank) provides better accuracy than single-stage retrieval.
        </p>

        <h3>Reranking Approaches</h3>

        <h4>Cross-Encoder Reranking</h4>
        <p>
          Cross-encoders process query-document pairs together, providing more accurate relevance scores 
          than bi-encoders (used in initial retrieval).
        </p>
        <SqlCodeBlock
          title="Cross-encoder reranking"
          code={`-- Retrieve initial candidates
WITH candidates AS (
  SELECT id, content
  FROM documents
  ORDER BY embedding <=> embed_text('PostgreSQL replication', 'text-embedding-ada-002')
  LIMIT 50
)
-- Rerank with cross-encoder
SELECT 
  id,
  content,
  neurondb_rerank(
    'cross-encoder/ms-marco-MiniLM-L-6-v2',
    content,
    'PostgreSQL replication'
  ) AS relevance_score
FROM candidates
ORDER BY relevance_score DESC
LIMIT 10;`}
        />

        <h4>LLM-Based Reranking</h4>
        <p>
          Use large language models to rerank results based on semantic understanding and reasoning.
        </p>
        <SqlCodeBlock
          title="LLM reranking"
          code={`-- Rerank with LLM
SELECT 
  id,
  content,
  neurondb_llm_rerank(
    'gpt-4',
    content,
    'PostgreSQL replication',
    criteria => 'relevance, accuracy, completeness'
  ) AS llm_score
FROM (
  SELECT id, content
  FROM documents
  ORDER BY embedding <=> embed_text('PostgreSQL replication', 'text-embedding-ada-002')
  LIMIT 20
) candidates
ORDER BY llm_score DESC
LIMIT 5;`}
        />

        <h4>Ensemble Reranking</h4>
        <p>
          Combine multiple reranking models for improved accuracy and robustness.
        </p>
        <SqlCodeBlock
          title="Ensemble reranking"
          code={`SELECT 
  id,
  content,
  -- Weighted combination of multiple rerankers
  neurondb_rerank('cross-encoder/model1', content, query) * 0.5 +
  neurondb_rerank('cross-encoder/model2', content, query) * 0.3 +
  neurondb_llm_rerank('gpt-4', content, query) * 0.2 AS ensemble_score
FROM candidates
ORDER BY ensemble_score DESC;`}
        />

        <h3>Reranking Best Practices</h3>
        <ul>
          <li>Retrieve 20-100 candidates, rerank top 10-20</li>
          <li>Use cross-encoders for speed, LLMs for accuracy</li>
          <li>Cache reranking results for common queries</li>
          <li>Monitor reranking latency and adjust candidate count</li>
        </ul>
      </section>

      <section id="rag-pipelines">
        <h2>RAG Pipelines</h2>
        <p>
          <strong>Retrieval Augmented Generation (RAG)</strong> enhances LLM responses by retrieving relevant 
          context from your database before generating answers. This grounds LLM outputs in your actual data, 
          reducing hallucinations and improving accuracy.
        </p>

        <h3>RAG Workflow</h3>
        <ol>
          <li><strong>User Question:</strong> "What is PostgreSQL replication?"</li>
          <li><strong>Retrieve:</strong> Find relevant documents using hybrid search</li>
          <li><strong>Rerank:</strong> Score and sort results by relevance</li>
          <li><strong>Generate:</strong> LLM creates answer using retrieved context</li>
          <li><strong>Response:</strong> Return answer with source citations</li>
        </ol>

        <h3>Complete RAG Pipeline</h3>
        <SqlCodeBlock
          title="End-to-end RAG pipeline"
          code={`-- 1. Document ingestion with embeddings
CREATE TABLE documents (
  id SERIAL PRIMARY KEY,
  content TEXT,
  embedding vector(1536),
  metadata JSONB
);

INSERT INTO documents (content, embedding, metadata)
SELECT 
  content,
  embed_text(content, 'text-embedding-ada-002'),
  jsonb_build_object('source', 'docs', 'timestamp', now())
FROM source_documents;

-- 2. RAG query function
CREATE OR REPLACE FUNCTION rag_query(user_query TEXT)
RETURNS TABLE(answer TEXT, sources JSONB) AS $$
DECLARE
  query_embedding vector(1536);
  retrieved_docs TEXT;
BEGIN
  -- Generate query embedding
  query_embedding := embed_text(user_query, 'text-embedding-ada-002');
  
  -- Retrieve relevant documents (hybrid search)
  SELECT string_agg(content, E'\n\n')
  INTO retrieved_docs
  FROM (
    SELECT content
    FROM documents
    ORDER BY embedding <=> query_embedding
    LIMIT 5
  ) top_docs;
  
  -- Generate answer with context
  RETURN QUERY
  SELECT 
    neurondb_llm_generate(
      'gpt-4',
      format('Context: %s\n\nQuestion: %s\n\nAnswer:', retrieved_docs, user_query)
    ) AS answer,
    (
      SELECT jsonb_agg(jsonb_build_object('id', id, 'content', content))
      FROM (
        SELECT id, content
        FROM documents
        ORDER BY embedding <=> query_embedding
        LIMIT 5
      ) sources
    ) AS sources;
END;
$$ LANGUAGE plpgsql;

-- 3. Use RAG pipeline
SELECT * FROM rag_query('What is PostgreSQL replication?');`}
        />

        <h3>RAG Best Practices</h3>
        <ul>
          <li>Retrieve 3-10 relevant documents for context</li>
          <li>Use hybrid search for better retrieval quality</li>
          <li>Rerank results before passing to LLM</li>
          <li>Include source citations in responses</li>
          <li>Monitor answer quality and adjust retrieval parameters</li>
        </ul>
      </section>

      <section id="intelligent-caching">
        <h2>Intelligent Caching</h2>
        <p>
          Intelligent caching reduces computation, API calls, and latency by storing frequently accessed data, 
          embeddings, and query results. NeurondB provides multiple caching layers for optimal performance.
        </p>

        <h3>Embedding Cache</h3>
        <p>
          Cache generated embeddings to avoid redundant API calls and computation.
        </p>
        <SqlCodeBlock
          title="Embedding cache"
          code={`-- Configure embedding cache
SET neurondb.embedding_cache_size = 10000;  -- Cache 10K embeddings
SET neurondb.embedding_cache_ttl = 86400;   -- 24 hour TTL

-- Cached embeddings are automatically used
SELECT embed_text('sample text', 'text-embedding-ada-002');  -- First call: API
SELECT embed_text('sample text', 'text-embedding-ada-002');  -- Second call: Cache

-- Check cache statistics
SELECT * FROM neurondb_embedding_cache_stats();`}
        />

        <h3>Query Result Cache</h3>
        <p>
          Cache query results for identical or similar queries using semantic similarity.
        </p>
        <SqlCodeBlock
          title="Query result cache"
          code={`-- Enable query result cache
SET neurondb.query_cache_enabled = on;
SET neurondb.query_cache_size = 1000;
SET neurondb.query_cache_ttl = 3600;  -- 1 hour

-- Cache is automatically used for identical queries
SELECT * FROM documents
WHERE embedding <=> embed_text('PostgreSQL', 'text-embedding-ada-002') < 0.3
ORDER BY embedding <=> embed_text('PostgreSQL', 'text-embedding-ada-002')
LIMIT 10;`}
        />

        <h3>Semantic Cache</h3>
        <p>
          Cache results for semantically similar queries, not just identical ones.
        </p>
        <SqlCodeBlock
          title="Semantic cache"
          code={`-- Enable semantic cache
SET neurondb.semantic_cache_enabled = on;
SET neurondb.semantic_cache_threshold = 0.95;  -- 95% similarity threshold

-- Similar queries use cached results
SELECT * FROM documents
WHERE embedding <=> embed_text('PostgreSQL database', 'text-embedding-ada-002') < 0.3
ORDER BY embedding <=> embed_text('PostgreSQL database', 'text-embedding-ada-002')
LIMIT 10;
-- If 'PostgreSQL' was cached and similarity > 0.95, uses cache`}
        />

        <h3>Model Output Cache</h3>
        <p>
          Cache model inference results to avoid redundant computation.
        </p>
        <SqlCodeBlock
          title="Model output cache"
          code={`-- Cache ONNX model outputs
SET neurondb.model_cache_enabled = on;
SET neurondb.model_cache_size = 5000;

-- Cached predictions are reused
SELECT predict_classification('model', features) FROM data;
SELECT predict_classification('model', features) FROM data;  -- Uses cache`}
        />

        <h3>Caching Best Practices</h3>
        <ul>
          <li>Enable caching for frequently accessed embeddings and queries</li>
          <li>Set appropriate TTLs based on data freshness requirements</li>
          <li>Monitor cache hit rates and adjust sizes accordingly</li>
          <li>Use semantic caching for similar but not identical queries</li>
          <li>Clear cache when data or models are updated</li>
        </ul>
      </section>

      <section id="production-patterns">
        <h2>Production Patterns</h2>

        <h3>Complete Search Pipeline</h3>
        <SqlCodeBlock
          title="Production search pipeline"
          code={`-- 1. Hybrid retrieval
WITH hybrid_results AS (
  SELECT id, content, hybrid_score
  FROM (
    -- Vector search (70%)
    SELECT id, content, (1.0 - distance) * 0.7 AS hybrid_score
    FROM (
      SELECT id, content, embedding <=> embed_text('query', 'text-embedding-ada-002') AS distance
      FROM documents
      ORDER BY distance
      LIMIT 50
    ) vector_results
    UNION ALL
    -- Full-text search (30%)
    SELECT id, content, ts_rank(...) * 0.3 AS hybrid_score
    FROM documents
    WHERE to_tsvector('english', content) @@ to_tsquery('english', 'query')
    LIMIT 50
  ) combined
  ORDER BY hybrid_score DESC
  LIMIT 20
)
-- 2. Reranking
SELECT 
  id,
  content,
  neurondb_rerank('cross-encoder/model', content, 'query') AS final_score
FROM hybrid_results
ORDER BY final_score DESC
LIMIT 10;`}
        />

        <h3>RAG with Caching</h3>
        <SqlCodeBlock
          title="Cached RAG pipeline"
          code={`-- RAG with intelligent caching
CREATE OR REPLACE FUNCTION cached_rag_query(user_query TEXT)
RETURNS TABLE(answer TEXT, sources JSONB) AS $$
DECLARE
  cached_answer TEXT;
BEGIN
  -- Check semantic cache first
  SELECT answer INTO cached_answer
  FROM rag_cache
  WHERE query_embedding <=> embed_text(user_query, 'text-embedding-ada-002') > 0.95
  ORDER BY created_at DESC
  LIMIT 1;
  
  IF cached_answer IS NOT NULL THEN
    RETURN QUERY SELECT cached_answer, '[]'::jsonb;
    RETURN;
  END IF;
  
  -- Generate new answer and cache it
  RETURN QUERY
  WITH generated AS (
    SELECT * FROM rag_query(user_query)
  )
  INSERT INTO rag_cache (query_embedding, answer, sources)
  SELECT embed_text(user_query, 'text-embedding-ada-002'), answer, sources
  FROM generated
  RETURNING answer, sources;
END;
$$ LANGUAGE plpgsql;`}
        />
      </section>

      <section>
        <h2>Related Documentation</h2>
        <ul>
          <li><a href="/docs/neurondb/hybrid">Hybrid Search</a> - Detailed hybrid search guide</li>
          <li><a href="/docs/neurondb/reranking">Reranking</a> - Complete reranking documentation</li>
          <li><a href="/docs/neurondb/rag">RAG Pipelines</a> - RAG implementation guide</li>
          <li><a href="/docs/neurondb/vector-engine">Vector Engine</a> - Vector search capabilities</li>
          <li><a href="/docs/neurondb/embedding-engine">Embedding Engine</a> - Embedding generation</li>
          <li><a href="/docs/neurondb/performance">Performance Tuning</a> - Optimize advanced features</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}

