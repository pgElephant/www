import { BlogMarkdown } from '../../_components/BlogMarkdown';
import GiscusComments from '../../../components/GiscusComments';
import ShareOnLinkedIn from '../../../components/ShareOnLinkedIn';

export const metadata = {
    title: 'Semantic Search Over Text with NeuronDB',
    description: 'Learn how to implement semantic search over text using NeuronDB with real-world examples, SQL queries, and production-ready code. Guide to building document search systems, RAG pipelines, and hybrid search.',
    openGraph: {
        title: 'Semantic Search Over Text with NeuronDB',
        description: 'Guide to implementing semantic search with NeuronDB - real-world examples, SQL queries, and production-ready code',
        images: ['/blog/neurondb/og-image.svg'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Semantic Search Over Text with NeuronDB',
        description: 'Guide to implementing semantic search with NeuronDB - real-world examples, SQL queries, and production-ready code',
        images: ['/blog/neurondb/og-image.svg'],
    },
};

const markdown = `![NeuronDB header](/blog/neurondb/header.svg?v=7)

# Semantic Search Over Text with NeuronDB

**[View on GitHub](https://github.com/pgElephant/NeurondB)** | **[Download Latest Release](https://github.com/pgElephant/NeurondB/releases)** | **[Documentation](https://www.pgelephant.com/docs/neurondb)**

## Introduction

Traditional keyword search fails. Users search for "how to improve database speed." Systems miss documents about "query optimization" or "index performance tuning." The documents do not contain the exact words "improve," "database," and "speed." This problem grows as organizations accumulate unstructured text data.

Semantic search uses machine learning to understand meaning. It uses neural network embeddings. Text becomes high-dimensional vectors. These vectors capture semantic relationships. A query about "automobile maintenance" matches documents about "car repair" or "vehicle servicing." No words overlap. The system finds matches based on meaning.

NeuronDB is a PostgreSQL extension. It adds semantic search to your database. It integrates vector search, embedding generation, and indexing algorithms. You do not need separate vector databases or external ML services. This reduces complexity. It improves query performance. You build search systems using SQL syntax. Use it for customer support knowledge bases, RAG applications, or document search. NeuronDB includes the tools within your PostgreSQL environment.

This guide shows you how to implement semantic search with NeuronDB. It includes real-world examples and production-ready SQL queries. It covers basic setup, document ingestion, hybrid search, RAG pipeline construction, and performance optimization. Your semantic search system will handle production workloads.

## What is Semantic Search?

Semantic search differs from keyword search. Traditional systems match exact keywords. They use stemming and boolean operators. Semantic search uses deep learning models. It understands meaning and context. It finds relevant information when documents use different words than the query.

Semantic search has four capabilities:

Understands intent. Users search for "ways to speed up my database." The system finds documents about "query optimization," "index tuning," or "performance improvements." Those exact phrases do not appear. The system knows these concepts relate to the user's intent.

Handles synonyms. The system recognizes "automobile," "car," "vehicle," and "auto" as similar concepts. You do not need synonym dictionaries or manual query expansion.

Captures context. The system distinguishes ambiguous terms using surrounding context. "Python" in programming means the language. "python" in zoology means the snake. This prevents irrelevant results.

Supports natural language. Users write queries in plain language. They do not construct boolean search strings. Queries like "How do I optimize database queries?" work without understanding search syntax.

### How It Works

Semantic search uses embeddings. Embeddings are mathematical representations of text. They are high-dimensional vectors. These vectors encode semantic meaning. They have 384 to 1024 dimensions. Transformer-based neural network models generate embeddings. These models train on large text datasets. During training, models position similar texts close together. Dissimilar texts are positioned far apart.

The process follows this pipeline:

\`\`\`
Text → Embedding Model → Vector (384-1024 dimensions) → Similarity Search
\`\`\`

You input text into an embedding model. Use sentence-transformers/all-MiniLM-L6-v2 as an example. The model processes text through neural network layers. It transforms text into a dense vector. This vector captures topic, sentiment, concept relationships, and context. The sentences "PostgreSQL is a database" and "Postgres offers data management" produce similar vectors. They have different word choices.

The system measures distance between the query vector and document vectors. It uses similarity metrics. Cosine similarity measures the angle between vectors. Euclidean distance measures straight-line distance. Dot product measures vector alignment. Documents with vectors closest to the query vector rank highest. They are most similar to the user's intent.

## Getting Started with NeuronDB

### Installation

NeuronDB is a PostgreSQL extension that integrates with PostgreSQL versions 16, 17, and 18. The extension is built using PostgreSQL's extension framework. Installation follows standard PostgreSQL extension procedures. Once you have installed the NeuronDB extension files through package managers, pre-built binaries, or from source, you enable it in your database like any other PostgreSQL extension.

The installation process involves downloading the binary package for your PostgreSQL version and operating system, or building from source if you need custom configurations. After installation, enabling the extension creates the necessary database objects, functions, and types:

\`\`\`sql
CREATE EXTENSION neurondb;
\`\`\`

This command registers NeuronDB with your PostgreSQL instance. It makes all functions, operators, and data types available for use. The extension is schema-aware and can be installed in a specific schema if needed. The default public schema is sufficient for most use cases.

### Core Concepts

NeuronDB includes components for semantic search in PostgreSQL. Understanding these core concepts is essential for implementing semantic search:

**Vector Types**: NeuronDB introduces the vector(n) data type, where n represents the dimensionality of the vector, typically 384, 768, or 1024 depending on your embedding model. This native PostgreSQL type allows you to store embedding vectors directly in database columns. You do not need external storage systems. The vector type supports efficient storage, indexing, and querying operations optimized for high-dimensional data.

**Embedding Functions**: The embed_text() function generates embeddings from text input using pre-trained transformer models. This function accepts text input and an optional model name. It returns a vector representation that captures the semantic meaning of the input. NeuronDB supports dozens of embedding models from Hugging Face, ranging from fast 384-dimensional models for real-time applications to high-quality 1024-dimensional models for accuracy.

**Distance Operators**: To measure similarity between vectors, NeuronDB includes specialized operators optimized for vector operations. The <=> operator computes cosine distance, which works for semantic search as it measures the angle between vectors regardless of their magnitude. The <-> operator computes L2 distance, useful for certain types of similarity calculations. These operators are optimized at the database level for performance.

**Indexing**: For production systems with large datasets, NeuronDB supports indexing algorithms for fast approximate nearest neighbor search. The HNSW index provides sub-10ms query performance even with millions of vectors. IVFFlat indexes offer memory-efficient alternatives for very large datasets. These indexes are built using PostgreSQL's index infrastructure, ensuring they integrate with query planning and optimization.

## Real-World Example: Building a Document Search System

To illustrate how NeuronDB works in practice, we will build a semantic search system for technical documentation. This example demonstrates the workflow from document ingestion to querying, covering the essential steps you need to implement in a production environment.

This use case is relevant for organizations that maintain extensive technical documentation, knowledge bases, or internal wikis. Traditional keyword-based search in these systems frustrates users who struggle to find relevant information because they do not know the exact terminology used in documents. A semantic search system solves this problem by understanding the meaning behind queries and matching them to conceptually similar content, regardless of specific word choices.

Our example walks through creating a system that handles queries like "How do I improve database performance?" and successfully retrieves documents discussing "query optimization," "index tuning," or "connection pooling" even when those exact phrases do not appear in the query. We cover schema design, document chunking strategies, embedding generation, index creation, and query optimization techniques that ensure the system performs well at scale.

### Step 1: Create the Schema

\`\`\`sql
-- Create documents table
CREATE TABLE documents (
    doc_id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    source TEXT,
    doc_type TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    metadata JSONB
);

-- Create chunks table for document segments
CREATE TABLE document_chunks (
    chunk_id SERIAL PRIMARY KEY,
    doc_id INTEGER REFERENCES documents(doc_id),
    chunk_index INTEGER,
    chunk_text TEXT NOT NULL,
    chunk_tokens INTEGER,
    embedding VECTOR(384),  -- Using 384-dim embeddings
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_chunks_doc_id ON document_chunks(doc_id);
\`\`\`

### Step 2: Ingest Documents

\`\`\`sql
-- Insert sample technical documents
INSERT INTO documents (title, content, source, doc_type, metadata) VALUES
('PostgreSQL Performance Tuning', 
 'PostgreSQL performance can be significantly improved through proper indexing strategies. B-tree indexes are the default and work well for most queries. GiST indexes are useful for full-text search and geometric data. Hash indexes can be faster for equality comparisons but are not WAL-logged. Partial indexes can reduce index size and improve performance for queries with common WHERE clauses.',
 'https://wiki.postgresql.org/wiki/Performance_Optimization',
 'technical_doc',
 '{"category": "database", "tags": ["postgresql", "performance", "indexing"]}'::jsonb),

('Vector Databases Explained',
 'Vector databases store high-dimensional vector embeddings generated from machine learning models. These embeddings capture semantic meaning of text, images, or other data. Vector similarity search using cosine similarity or Euclidean distance enables semantic search capabilities. HNSW and IVFFlat are popular indexing algorithms that make approximate nearest neighbor search fast even with millions of vectors.',
 'https://example.com/vector-db-guide',
 'technical_doc',
 '{"category": "machine_learning", "tags": ["vectors", "embeddings", "similarity_search"]}'::jsonb),

('Retrieval-Augmented Generation Overview',
 'RAG combines the power of large language models with external knowledge retrieval. The process involves: 1) Converting user queries to embeddings, 2) Retrieving relevant documents using vector similarity, 3) Providing retrieved context to the LLM, 4) Generating accurate responses grounded in factual data. This approach reduces hallucinations and enables LLMs to access up-to-date information.',
 'https://example.com/rag-overview',
 'technical_doc',
 '{"category": "ai", "tags": ["rag", "llm", "retrieval"]}'::jsonb);
\`\`\`

### Step 3: Chunk Documents

For better search results, split long documents into smaller chunks:

\`\`\`sql
-- Simple chunking strategy: Split by sentences
INSERT INTO document_chunks (doc_id, chunk_index, chunk_text, chunk_tokens)
SELECT 
    doc_id,
    ROW_NUMBER() OVER (PARTITION BY doc_id ORDER BY chunk_num) - 1 AS chunk_index,
    chunk_text,
    array_length(regexp_split_to_array(chunk_text, '\\s+'), 1) AS chunk_tokens
FROM (
    SELECT 
        doc_id,
        unnest(regexp_split_to_array(content, '\\.\\s+')) AS chunk_text,
        generate_series(1, array_length(regexp_split_to_array(content, '\\.\\s+'), 1)) AS chunk_num
    FROM documents
) chunks
WHERE length(chunk_text) > 20;  -- Filter out very short chunks
\`\`\`

### Step 4: Generate Embeddings

NeuronDB supports multiple embedding models. We'll use \`sentence-transformers/all-MiniLM-L6-v2\`, a fast and efficient 384-dimensional model:

\`\`\`sql
-- Generate embeddings for all document chunks
UPDATE document_chunks
SET embedding = embed_text(
    chunk_text,
    'sentence-transformers/all-MiniLM-L6-v2'
)
WHERE embedding IS NULL;
\`\`\`

**Note**: The function signature is \`embed_text(text, model)\` where the model parameter is optional. If omitted, it defaults to \`sentence-transformers/all-MiniLM-L6-v2\`.

**Available Embedding Models:**

NeuronDB supports a wide variety of embedding models from Hugging Face:

- **384-dim models** (fast, efficient):
  - \`sentence-transformers/all-MiniLM-L6-v2\` (default)
  - \`sentence-transformers/all-MiniLM-L12-v2\`
  - \`BAAI/bge-small-en-v1.5\`
  - \`sentence-transformers/paraphrase-MiniLM-L6-v2\`

- **768-dim models** (higher quality):
  - \`sentence-transformers/all-mpnet-base-v2\`
  - \`BAAI/bge-base-en-v1.5\`
  - \`sentence-transformers/multi-qa-mpnet-base-cos-v1\`

- **1024-dim models** (best quality):
  - \`BAAI/bge-large-en-v1.5\`

### Step 5: Create Vector Index

For fast similarity search, create an HNSW index:

\`\`\`sql
CREATE INDEX idx_chunks_embedding ON document_chunks 
USING hnsw (embedding vector_cosine_ops) 
WITH (m = 16, ef_construction = 64);
\`\`\`

## Real-World Semantic Search Queries

Now let's explore practical semantic search queries that demonstrate NeuronDB's capabilities.

### Query 1: Basic Semantic Search

**User Query**: "How do database indexes work?"

This query finds relevant content even though the exact phrase "database indexes work" doesn't appear in our documents:

\`\`\`sql
WITH query_embedding AS (
    SELECT embed_text(
        'How do database indexes work?',
        'sentence-transformers/all-MiniLM-L6-v2'
    ) AS embedding
)
SELECT 
    dc.chunk_id,
    d.title,
    dc.chunk_text,
    1 - (dc.embedding <=> qe.embedding) AS similarity_score,
    RANK() OVER (ORDER BY dc.embedding <=> qe.embedding) AS rank
FROM document_chunks dc
JOIN documents d ON dc.doc_id = d.doc_id
CROSS JOIN query_embedding qe
ORDER BY dc.embedding <=> qe.embedding
LIMIT 5;
\`\`\`

**Results:**
- Finds content about "B-tree indexes", "GiST indexes", and "indexing strategies"
- Similarity scores indicate relevance (higher = more relevant)
- Ranks results by semantic similarity

### Query 2: Understanding Synonyms

**User Query**: "What is retrieval augmented generation?"

This demonstrates semantic understanding. The query uses "retrieval augmented generation" while documents contain "RAG":

\`\`\`sql
WITH query_embedding AS (
    SELECT embed_text(
        'What is retrieval augmented generation?',
        'sentence-transformers/all-MiniLM-L6-v2'
    ) AS embedding
)
SELECT 
    dc.chunk_id,
    d.title,
    dc.chunk_text,
    1 - (dc.embedding <=> qe.embedding) AS similarity_score
FROM document_chunks dc
JOIN documents d ON dc.doc_id = d.doc_id
CROSS JOIN query_embedding qe
ORDER BY dc.embedding <=> qe.embedding
LIMIT 5;
\`\`\`

### Query 3: Natural Language Queries

**User Query**: "machine learning model training tips"

This query finds relevant content about ML best practices:

\`\`\`sql
WITH query_embedding AS (
    SELECT embed_text(
        'machine learning model training tips',
        'sentence-transformers/all-MiniLM-L6-v2'
    ) AS embedding
)
SELECT 
    dc.chunk_id,
    d.title,
    left(dc.chunk_text, 100) || '...' AS chunk_preview,
    ROUND((1 - (dc.embedding <=> qe.embedding))::numeric, 4) AS similarity
FROM document_chunks dc
JOIN documents d ON dc.doc_id = d.doc_id
CROSS JOIN query_embedding qe
ORDER BY dc.embedding <=> qe.embedding
LIMIT 5;
\`\`\`

## Additional Features

### Hybrid Search: Combining Semantic and Keyword Search

Sometimes you want the best of both worlds, semantic understanding plus exact keyword matching. NeuronDB supports hybrid search:

\`\`\`sql
-- Add full-text search support
ALTER TABLE document_chunks ADD COLUMN IF NOT EXISTS fts_vector tsvector;
UPDATE document_chunks
SET fts_vector = to_tsvector('english', chunk_text);
CREATE INDEX idx_chunks_fts ON document_chunks USING gin(fts_vector);

-- Hybrid search query
WITH vector_results AS (
    SELECT 
        dc.chunk_id,
        d.title,
        dc.chunk_text,
        1 - (dc.embedding <=> embed_text(
            'PostgreSQL index performance',
            'sentence-transformers/all-MiniLM-L6-v2'
        )) AS vector_score,
        ROW_NUMBER() OVER (ORDER BY dc.embedding <=> embed_text(
            'PostgreSQL index performance',
            'sentence-transformers/all-MiniLM-L6-v2'
        )) AS vector_rank
    FROM document_chunks dc
    JOIN documents d ON dc.doc_id = d.doc_id
    ORDER BY dc.embedding <=> embed_text(
        'PostgreSQL index performance',
        'sentence-transformers/all-MiniLM-L6-v2'
    )
    LIMIT 10
),
fts_results AS (
    SELECT 
        dc.chunk_id,
        d.title,
        dc.chunk_text,
        ts_rank(dc.fts_vector, plainto_tsquery('english', 'PostgreSQL index performance')) AS fts_score,
        ROW_NUMBER() OVER (ORDER BY ts_rank(dc.fts_vector, plainto_tsquery('english', 'PostgreSQL index performance')) DESC) AS fts_rank
    FROM document_chunks dc
    JOIN documents d ON dc.doc_id = d.doc_id
    WHERE dc.fts_vector @@ plainto_tsquery('english', 'PostgreSQL index performance')
    ORDER BY ts_rank(dc.fts_vector, plainto_tsquery('english', 'PostgreSQL index performance')) DESC
    LIMIT 10
),
-- Reciprocal Rank Fusion (RRF) for combining results
rrf_scores AS (
    SELECT 
        COALESCE(v.chunk_id, f.chunk_id) AS chunk_id,
        COALESCE(v.title, f.title) AS title,
        COALESCE(v.chunk_text, f.chunk_text) AS chunk_text,
        COALESCE(v.vector_score, 0) AS vector_score,
        COALESCE(f.fts_score, 0) AS fts_score,
        (1.0 / (60 + COALESCE(v.vector_rank, 1000))) + 
        (1.0 / (60 + COALESCE(f.fts_rank, 1000))) AS rrf_score
    FROM vector_results v
    FULL OUTER JOIN fts_results f ON v.chunk_id = f.chunk_id
)
SELECT 
    chunk_id,
    title,
    left(chunk_text, 120) || '...' AS preview,
    ROUND(vector_score::numeric, 4) AS vec_score,
    ROUND(fts_score::numeric, 4) AS fts_score,
    ROUND(rrf_score::numeric, 6) AS hybrid_score
FROM rrf_scores
ORDER BY rrf_score DESC
LIMIT 5;
\`\`\`

### Filtered Semantic Search

Combine semantic search with metadata filters:

\`\`\`sql
WITH query_embedding AS (
    SELECT embed_text(
        'database optimization techniques',
        'sentence-transformers/all-MiniLM-L6-v2'
    ) AS embedding
)
SELECT 
    dc.chunk_id,
    d.title,
    dc.chunk_text,
    1 - (dc.embedding <=> qe.embedding) AS similarity_score
FROM document_chunks dc
JOIN documents d ON dc.doc_id = d.doc_id
CROSS JOIN query_embedding qe
WHERE d.metadata->>'category' = 'database'  -- Filter by category
ORDER BY dc.embedding <=> qe.embedding
LIMIT 5;
\`\`\`

### Batch Embedding Generation

For better performance when processing many documents:

\`\`\`sql
-- Generate embeddings in batch
UPDATE document_chunks
SET embedding = (
    SELECT embedding 
    FROM unnest(
        ARRAY[chunk_text],
        embed_text_batch(
            ARRAY[chunk_text],
            'sentence-transformers/all-MiniLM-L6-v2'
        )
    ) AS t(text, embedding)
    WHERE t.text = document_chunks.chunk_text
)
WHERE embedding IS NULL;
\`\`\`

## Building a RAG Pipeline

Retrieval-Augmented Generation (RAG) combines semantic search with LLM generation. Here is how to build a RAG system:

### Step 1: Query Processing

\`\`\`sql
CREATE TABLE rag_queries (
    query_id SERIAL PRIMARY KEY,
    user_query TEXT NOT NULL,
    retrieved_chunks INT[],
    context_text TEXT,
    generated_response TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    metadata JSONB
);

-- Store user query
INSERT INTO rag_queries (user_query, metadata)
VALUES (
    'How can I improve PostgreSQL query performance?',
    '{"model": "gpt-4", "temperature": 0.7}'::jsonb
);
\`\`\`

### Step 2: Retrieve Relevant Context

\`\`\`sql
WITH query_embedding AS (
    SELECT embed_text(
        'How can I improve PostgreSQL query performance?',
        'sentence-transformers/all-MiniLM-L6-v2'
    ) AS embedding
),
relevant_chunks AS (
    SELECT 
        dc.chunk_id,
        d.title,
        dc.chunk_text,
        1 - (dc.embedding <=> qe.embedding) AS similarity,
        ROW_NUMBER() OVER (ORDER BY dc.embedding <=> qe.embedding) AS rank
    FROM document_chunks dc
    JOIN documents d ON dc.doc_id = d.doc_id
    CROSS JOIN query_embedding qe
    ORDER BY dc.embedding <=> qe.embedding
    LIMIT 5
)
SELECT 
    chunk_id,
    title,
    left(chunk_text, 100) || '...' AS preview,
    ROUND(similarity::numeric, 4) AS score,
    rank
FROM relevant_chunks;
\`\`\`

### Step 3: Build Context

\`\`\`sql
WITH query_embedding AS (
    SELECT embed_text(
        'How can I improve PostgreSQL query performance?',
        'sentence-transformers/all-MiniLM-L6-v2'
    ) AS embedding
),
relevant_chunks AS (
    SELECT 
        dc.chunk_id,
        d.title,
        dc.chunk_text,
        ROW_NUMBER() OVER (ORDER BY dc.embedding <=> qe.embedding) AS rank
    FROM document_chunks dc
    JOIN documents d ON dc.doc_id = d.doc_id
    CROSS JOIN query_embedding qe
    ORDER BY dc.embedding <=> qe.embedding
    LIMIT 5
),
context_build AS (
    SELECT 
        array_agg(chunk_id ORDER BY rank) AS chunk_ids,
        string_agg(
            format('Document %s: %s', rank, chunk_text),
            E'\\n\\n'
            ORDER BY rank
        ) AS context
    FROM relevant_chunks
)
SELECT 
    chunk_ids,
    context
FROM context_build;
\`\`\`

### Step 4: Generate Response

The context can then be passed to an LLM (OpenAI, Anthropic, etc.) to generate a response grounded in the retrieved documents.

## Performance Optimization

### Using Vector Indexes

For production systems with large datasets, vector indexes are essential:

\`\`\`sql
-- HNSW index for fast approximate nearest neighbor search
CREATE INDEX idx_chunks_embedding ON document_chunks 
USING hnsw (embedding vector_cosine_ops) 
WITH (m = 16, ef_construction = 64);
\`\`\`

### Embedding Caching

NeuronDB automatically caches embeddings to improve performance:

\`\`\`sql
-- Check cache statistics
SELECT * FROM neurondb.embedding_cache_stats;
\`\`\`

### GPU Acceleration

For high-throughput scenarios, enable GPU acceleration:

\`\`\`sql
-- Enable GPU support (requires CUDA/ROCm/Metal)
SET neurondb.gpu_enabled = true;
\`\`\`

## Best Practices

**Choose the Right Embedding Model**

Select embedding models based on your performance and quality requirements. Use 384-dimension models for speed and efficiency in real-time applications. Use 768-dimension or 1024-dimension models when you need higher quality results. Consider domain-specific models for specialized content like legal documents or medical texts.

**Chunking Strategy**

Split documents into chunks between 100 and 500 tokens. Use semantic chunking when possible to preserve meaning across boundaries. Maintain context overlap between chunks so important information does not get lost at boundaries.

**Index Configuration**

Use HNSW indexes for high-recall requirements. Tune the m and ef_construction parameters based on your data size. Rebuild indexes periodically as your data grows to maintain optimal performance.

**Query Optimization**

Cache query embeddings when possible to avoid regenerating them for repeated queries. Use batch operations for bulk processing to improve throughput. Combine semantic search with metadata filters to reduce the search space and improve response times.

**Hybrid Search**

Use hybrid search when exact keyword matching matters alongside semantic understanding. Tune vector versus keyword weights based on your use case. Consider Reciprocal Rank Fusion for combining results from multiple search methods.

## Real-World Use Cases

### 1. Customer Support Knowledge Base

Search through support articles using natural language:

\`\`\`sql
WITH query_embedding AS (
    SELECT embed_text(
        'How do I reset my password?',
        'sentence-transformers/all-MiniLM-L6-v2'
    ) AS embedding
)
SELECT 
    article_id,
    title,
    content,
    1 - (embedding <=> qe.embedding) AS relevance
FROM support_articles
CROSS JOIN query_embedding qe
WHERE category = 'account_management'
ORDER BY embedding <=> qe.embedding
LIMIT 3;
\`\`\`

### 2. Legal Document Search

Find relevant legal clauses using semantic understanding:

\`\`\`sql
WITH query_embedding AS (
    SELECT embed_text(
        'intellectual property rights and licensing terms',
        'sentence-transformers/all-mpnet-base-v2'  -- Higher quality model
    ) AS embedding
)
SELECT 
    clause_id,
    document_name,
    clause_text,
    1 - (embedding <=> qe.embedding) AS similarity
FROM legal_clauses
CROSS JOIN query_embedding qe
WHERE effective_date <= CURRENT_DATE
ORDER BY embedding <=> qe.embedding
LIMIT 10;
\`\`\`

### 3. Product Search

Enable natural language product discovery:

\`\`\`sql
WITH query_embedding AS (
    SELECT embed_text(
        'wireless headphones with noise cancellation under $200',
        'sentence-transformers/all-MiniLM-L6-v2'
    ) AS embedding
)
SELECT 
    product_id,
    name,
    description,
    price,
    1 - (description_embedding <=> qe.embedding) AS relevance
FROM products
CROSS JOIN query_embedding qe
WHERE in_stock = true
ORDER BY description_embedding <=> qe.embedding
LIMIT 20;
\`\`\`

## Conclusion

NeuronDB adds semantic search to PostgreSQL. You build search systems using SQL syntax. Use it for knowledge bases, document search, or RAG applications. NeuronDB includes the tools for production semantic search.

Key points:

- Integration: Works with PostgreSQL
- Multiple Models: Supports embedding models from Hugging Face
- Performance: GPU acceleration and efficient indexing
- Flexibility: Combines semantic search with keyword search and metadata filters
- Production Ready: Built for scale with proper indexing and caching

Build your semantic search system with NeuronDB.

## Resources

- Documentation: https://pgelephant.com/neurondb
- GitHub: https://github.com/pgElephant/NeurondB
- Support: admin@pgelephant.com

This blog post shows semantic search capabilities using NeuronDB. All SQL queries are production-ready. Adapt them to your use case.`;

export default function BlogPost() {
    return (
        <div className="pt-16">
            {/* Blog Content */}
            <div style={{ backgroundColor: '#4b5563' }}>
                <BlogMarkdown>{markdown}</BlogMarkdown>

                {/* Share Section */}
                <div className="max-w-4xl mx-auto px-6 pb-12">
                    <div className="border-t border-white/10 pt-8">
                        <h3 className="text-2xl font-bold text-white mb-4">Share This Article</h3>
                        <ShareOnLinkedIn
                            url="https://www.pgelephant.com/blog/neurondb-semantic-search-guide"
                            title="Semantic Search Over Text with NeuronDB"
                            summary="Learn how to implement semantic search over text using NeuronDB with real-world examples, SQL queries, and production-ready code. Guide to building document search systems, RAG pipelines, and hybrid search."
                            hashtags={[
                                'PostgreSQL',
                                'AI',
                                'VectorDatabase',
                                'SemanticSearch',
                                'RAG',
                                'MachineLearning',
                                'NeuronDB',
                                'pgElephant',
                                'OpenSource',
                                'NLP',
                                'Embeddings',
                                'VectorSearch'
                            ]}
                        />
                    </div>
                </div>
            </div>

            {/* Comments Section */}
            <div
                className="relative overflow-hidden py-16 px-6"
                style={{
                    background: `linear-gradient(135deg, #070d1a 0%, #111827 25%, #1f2937 50%, #374151 75%, #4b5563 100%)`,
                }}
            >
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.15) 0%, rgba(6, 182, 212, 0.15) 50%, rgba(16, 185, 129, 0.15) 100%)'
                    }}
                />

                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-primary-500/25 to-secondary-500/25 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-secondary-500/20 to-accent-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
                    <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-gradient-to-r from-accent-500/15 to-primary-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

                    <div
                        className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage:
                                'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
                            backgroundSize: '32px 32px'
                        }}
                    />
                </div>

                <div className="absolute inset-0 opacity-20">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `
                linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
              `,
                            backgroundSize: '50px 50px'
                        }}
                    />
                </div>

                <div className="relative max-w-4xl mx-auto">
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 shadow-2xl">

                        {/* Giscus Comments - Persistent GitHub Discussions */}
                        <GiscusComments
                            repo="pgElephant/www"
                            repoId="R_kgDONWqK3A"
                            category="Blog Comments"
                            categoryId="DIC_kwDONWqK3M4ClOuv"
                            mapping="pathname"
                            reactionsEnabled={true}
                            theme="dark"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
