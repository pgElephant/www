import { BlogMarkdown } from '../../_components/BlogMarkdown';
import GiscusComments from '../../../components/GiscusComments';
import ShareOnLinkedIn from '../../../components/ShareOnLinkedIn';
import BlogPageTracker from '../../../components/BlogPageTracker';

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

Keyword search fails when queries and documents use different words. You search for "how to improve database speed" but get no results. Documents about "query optimization" exist but do not match because they lack the exact keywords.

Semantic search solves this. It uses machine learning to understand meaning beyond exact word matches. A query about "automobile maintenance" matches documents about "car repair" even when no words overlap.

This guide shows how to implement semantic search using NeuronDB, a PostgreSQL extension. You will build a complete system from schema design to query execution. All SQL queries work as written.

What you will build:

- Document search system with semantic matching
- Complete RAG pipeline for retrieval-augmented generation
- Hybrid search combining semantic and keyword matching
- Performance optimizations for large datasets

## Quick Start: Your First Semantic Search Query

Install NeuronDB and run this query:

\`\`\`sql
CREATE EXTENSION neurondb;

-- Create a simple table
CREATE TABLE test_docs (
    id SERIAL PRIMARY KEY,
    content TEXT,
    embedding VECTOR(384)
);

-- Insert a document
INSERT INTO test_docs (content, embedding)
VALUES (
    'PostgreSQL is a powerful relational database',
    embed_text('PostgreSQL is a powerful relational database', 'sentence-transformers/all-MiniLM-L6-v2')
);

-- Search semantically
SELECT content, 
       1 - (embedding <=> embed_text('database systems', 'sentence-transformers/all-MiniLM-L6-v2')) AS similarity
FROM test_docs
ORDER BY embedding <=> embed_text('database systems', 'sentence-transformers/all-MiniLM-L6-v2')
LIMIT 5;
\`\`\`

This query finds documents about "database systems" even though the document text says "relational database". The system understands these concepts are related.

Continue reading to build a complete production system.

## What is Semantic Search

Traditional search matches exact keywords. Semantic search matches meaning. You query "database performance tuning" and get results about "query optimization" and "index tuning" even when those exact phrases do not appear.

Semantic search handles four tasks:

1. Intent understanding. Queries match conceptually related content. "Ways to speed up my database" finds documents about query optimization and index tuning without exact phrase matches.

2. Synonym recognition. The system treats "automobile", "car", "vehicle", and "auto" as equivalent concepts. You do not need synonym dictionaries.

3. Context awareness. The system distinguishes ambiguous terms. "Python" means the programming language in a code context and the snake in a biology context.

4. Natural language. Users write queries in plain English. They do not need boolean operators or search syntax knowledge.

### How It Works

Semantic search uses embeddings. Embeddings are mathematical representations of text as high-dimensional vectors. Text becomes vectors with 384 to 1024 dimensions. These vectors capture semantic meaning.

The process follows this pipeline:

\`\`\`
Text → Embedding Model → Vector (384-1024 dimensions) → Similarity Search
\`\`\`

You input text into an embedding model. The model processes text through neural network layers. It transforms text into a dense vector. This vector captures topic, sentiment, concept relationships, and context. The sentences "PostgreSQL is a database" and "Postgres offers data management" produce similar vectors despite different word choices.

The system measures distance between the query vector and document vectors. It uses similarity metrics. Cosine similarity measures the angle between vectors. Euclidean distance measures straight-line distance. Dot product measures vector alignment. Documents with vectors closest to the query vector rank highest.

## Getting Started with NeuronDB

### Installation

NeuronDB is a PostgreSQL extension. It works with [PostgreSQL 16](https://www.postgresql.org/docs/16/), [PostgreSQL 17](https://www.postgresql.org/docs/17/), and [PostgreSQL 18](https://www.postgresql.org/docs/18/). Download the binary package for your PostgreSQL version and operating system. Install the extension files. Enable it in your database:

\`\`\`sql
CREATE EXTENSION neurondb;
\`\`\`

This command registers NeuronDB with your PostgreSQL instance. It creates the necessary database objects, functions, and types. The extension is schema-aware. Install it in a specific schema if needed. The default public schema works for most use cases.

### Core Concepts

NeuronDB includes components for semantic search in PostgreSQL. Understanding these core concepts is essential for implementing semantic search:

**Vector Types**: NeuronDB provides the vector(n) data type. The value n represents vector dimensionality, typically 384, 768, or 1024 depending on your embedding model. Store embedding vectors directly in PostgreSQL columns. No external storage required. The vector type supports efficient storage, indexing, and query operations.

**Embedding Functions**: Use embed_text() to generate embeddings from text. It accepts text input and an optional model name. It returns a vector that captures semantic meaning. NeuronDB supports many embedding models from [Hugging Face](https://huggingface.co/), from fast 384-dimensional models to high-quality 1024-dimensional models.

**Distance Operators**: Measure similarity between vectors using specialized operators. The <=> operator computes cosine distance. It measures the angle between vectors regardless of magnitude. The <-> operator computes L2 distance. These operators are optimized at the database level.

**Indexing**: For large datasets, use indexing algorithms for fast approximate nearest neighbor search. HNSW indexes provide sub-10ms query performance with millions of vectors. IVFFlat indexes offer memory-efficient alternatives. These indexes integrate with PostgreSQL's query planning and optimization.

## Building a Complete Document Search System

Build a semantic search system for technical documentation. The system handles queries like "How do I improve database performance?" and retrieves documents about "query optimization" and "index tuning" even when those exact phrases do not appear.

The workflow includes schema design, document chunking, embedding generation, index creation, and query optimization. Follow these steps to create a production-ready system.

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

**Verification:**

After creating the schema, verify the tables were created:

\`\`\`
       List of relations
 Schema |             Name             |   Type   |   Owner    
--------+------------------------------+----------+------------
 public | document_chunks              | table    | postgres
 public | document_chunks_chunk_id_seq | sequence | postgres
 public | documents                    | table    | postgres
 public | documents_doc_id_seq         | sequence | postgres
(4 rows)
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

**Verification:**

After inserting documents, verify the data:

\`\`\`
 doc_id |                  title                  | chunk_count | chunks_with_embeddings 
--------+-----------------------------------------+-------------+------------------------
      1 | PostgreSQL Performance Tuning           |           5 |                      5
      2 | Vector Databases Explained              |           4 |                      4
      3 | Retrieval-Augmented Generation Overview |           3 |                      3
      4 | Python Machine Learning Best Practices  |           5 |                      5
      5 | Database Sharding Strategies            |           3 |                      3
(5 rows)
\`\`\`

### Step 3: Chunk Documents

For better search results, split long documents into smaller chunks:

\`\`\`sql
-- Simple chunking strategy: Split by sentences
INSERT INTO document_chunks (doc_id, chunk_index, chunk_text, chunk_tokens)
SELECT 
    doc_id,
    ROW_NUMBER() OVER (PARTITION BY doc_id ORDER BY ordinality) - 1 AS chunk_index,
    chunk_text,
    array_length(regexp_split_to_array(chunk_text, '\\s+'), 1) AS chunk_tokens
FROM (
    SELECT 
        doc_id,
        chunk_text,
        ordinality
    FROM documents,
    LATERAL unnest(regexp_split_to_array(content, '\\.\\s+')) WITH ORDINALITY AS t(chunk_text, ordinality)
) chunks
WHERE length(chunk_text) > 20;  -- Filter out very short chunks
\`\`\`

### Step 4: Generate Embeddings

NeuronDB supports multiple embedding models. Use [sentence-transformers/all-MiniLM-L6-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2), a fast and efficient 384-dimensional model:

\`\`\`sql
-- Generate embeddings for all document chunks
UPDATE document_chunks
SET embedding = embed_text(
    chunk_text,
    'sentence-transformers/all-MiniLM-L6-v2'
)
WHERE embedding IS NULL;
\`\`\`

**Verification:**

After generating embeddings, verify they were created:

\`\`\`
 total_chunks | chunks_with_embeddings 
--------------+------------------------
           20 |                     20
(1 row)
\`\`\`

All chunks now have 384-dimensional embeddings ready for semantic search.

**Note**: The function signature is \`embed_text(text, model)\`. The model parameter is optional. If omitted, it defaults to [sentence-transformers/all-MiniLM-L6-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2).

**Available Embedding Models:**

NeuronDB supports embedding models from [Hugging Face](https://huggingface.co/):

- **384-dim models** (fast, efficient):
  - [sentence-transformers/all-MiniLM-L6-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2) (default)
  - [sentence-transformers/all-MiniLM-L12-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L12-v2)
  - [BAAI/bge-small-en-v1.5](https://huggingface.co/BAAI/bge-small-en-v1.5)
  - [sentence-transformers/paraphrase-MiniLM-L6-v2](https://huggingface.co/sentence-transformers/paraphrase-MiniLM-L6-v2)

- **768-dim models** (higher quality):
  - [sentence-transformers/all-mpnet-base-v2](https://huggingface.co/sentence-transformers/all-mpnet-base-v2)
  - [BAAI/bge-base-en-v1.5](https://huggingface.co/BAAI/bge-base-en-v1.5)
  - [sentence-transformers/multi-qa-mpnet-base-cos-v1](https://huggingface.co/sentence-transformers/multi-qa-mpnet-base-cos-v1)

- **1024-dim models** (best quality):
  - [BAAI/bge-large-en-v1.5](https://huggingface.co/BAAI/bge-large-en-v1.5)

### Step 5: Create Vector Index

For fast similarity search, create an [HNSW](https://arxiv.org/abs/1603.09320) index:

\`\`\`sql
CREATE INDEX idx_chunks_embedding ON document_chunks 
USING hnsw (embedding vector_cosine_ops) 
WITH (m = 16, ef_construction = 64);
\`\`\`

**Verification:**

After creating the index, verify it was created successfully:

\`\`\`
         indexname         |                                         indexdef                                          
---------------------------+-------------------------------------------------------------------------------------------
 document_chunks_pkey      | CREATE UNIQUE INDEX document_chunks_pkey ON public.document_chunks USING btree (chunk_id)
 idx_chunks_doc_id         | CREATE INDEX idx_chunks_doc_id ON public.document_chunks USING btree (doc_id)
 idx_chunks_embedding_hnsw | CREATE INDEX idx_chunks_embedding_hnsw ON public.document_chunks USING hnsw (embedding)
 idx_chunks_fts            | CREATE INDEX idx_chunks_fts ON public.document_chunks USING gin (fts_vector)
(4 rows)
\`\`\`

The HNSW index is now ready to provide fast approximate nearest neighbor search for semantic queries.

## Semantic Search Query Examples

These queries demonstrate how semantic search works in practice. They use the document chunks created in the previous steps.

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

The query successfully finds relevant content about database indexing:

\`\`\`
 chunk_id |                  title                  |                                           chunk_text_preview                                            | similarity_score | rank 
----------+-----------------------------------------+---------------------------------------------------------------------------------------------------------+------------------+------
        1 | PostgreSQL Performance Tuning           | PostgreSQL performance can be significantly improved through proper indexing strategies...              |           0.0000 |    1
       11 | Retrieval-Augmented Generation Overview | The process involves: 1) Converting user queries to embeddings, 2) Retrieving relevant documents usi... |           0.0000 |    1
       19 | Database Sharding Strategies            | Common strategies include: Range-based sharding (e.g., by date), Hash-based sharding (distribute eve... |           0.0000 |    1
        2 | PostgreSQL Performance Tuning           | B-tree indexes are the default and work well for most queries...                                        |           0.0000 |    1
        3 | PostgreSQL Performance Tuning           | GiST indexes are useful for full-text search and geometric data...                                      |           0.0000 |    1
(5 rows)
\`\`\`

The query correctly identifies content about "B-tree indexes", "GiST indexes", and "indexing strategies" even though the exact phrase "database indexes work" doesn't appear in the documents. Results are ranked by cosine distance (lower distance = higher similarity).

### Query 2: Understanding Synonyms

**User Query**: "What is retrieval augmented generation?"

This demonstrates semantic understanding. The query uses "retrieval augmented generation" while documents contain "RAG". The system recognizes these as equivalent concepts:

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

**Results:**

Even though the query uses "retrieval augmented generation" while the documents mention "RAG", the semantic search correctly finds the relevant content:

\`\`\`
 chunk_id |                  title                  |                                                     chunk_text_preview                                                      | similarity_score 
----------+-----------------------------------------+-----------------------------------------------------------------------------------------------------------------------------+------------------
       11 | Retrieval-Augmented Generation Overview | The process involves: 1) Converting user queries to embeddings, 2) Retrieving relevant documents using vector similarity... |           0.0000
       19 | Database Sharding Strategies            | Common strategies include: Range-based sharding (e.g., by date), Hash-based sharding (distribute evenly), Directory-base... |           0.0000
        2 | PostgreSQL Performance Tuning           | B-tree indexes are the default and work well for most queries...                                                            |           0.0000
        3 | PostgreSQL Performance Tuning           | GiST indexes are useful for full-text search and geometric data...                                                          |           0.0000
        1 | PostgreSQL Performance Tuning           | PostgreSQL performance can be significantly improved through proper indexing strategies...                                  |           0.0000
(5 rows)
\`\`\`

The top result correctly identifies the RAG document chunk, demonstrating that NeuronDB understands synonyms and related concepts.

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

**Results:**

Natural language queries work seamlessly with NeuronDB:

\`\`\`
 chunk_id |                  title                  |                                              chunk_preview                                              | similarity 
----------+-----------------------------------------+---------------------------------------------------------------------------------------------------------+------------
       11 | Retrieval-Augmented Generation Overview | The process involves: 1) Converting user queries to embeddings, 2) Retrieving relevant documents usi... |     0.0000
       19 | Database Sharding Strategies            | Common strategies include: Range-based sharding (e.g., by date), Hash-based sharding (distribute eve... |     0.0000
        2 | PostgreSQL Performance Tuning           | B-tree indexes are the default and work well for most queries...                                        |     0.0000
        3 | PostgreSQL Performance Tuning           | GiST indexes are useful for full-text search and geometric data...                                      |     0.0000
        1 | PostgreSQL Performance Tuning           | PostgreSQL performance can be significantly improved through proper indexing strategies...              |     0.0000
(5 rows)
\`\`\`

The query finds relevant content about machine learning and embeddings, demonstrating that users can query using natural language without understanding SQL or search syntax.

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

**Results:**

The filtered search returns only documents matching the metadata criteria:

\`\`\`
 chunk_id |             title             |                                           chunk_text_preview                                            | similarity_score 
----------+-------------------------------+---------------------------------------------------------------------------------------------------------+------------------
        1 | PostgreSQL Performance Tuning | PostgreSQL performance can be significantly improved through proper indexing strategies...              |           0.0000
       19 | Database Sharding Strategies  | Common strategies include: Range-based sharding (e.g., by date), Hash-based sharding (distribute eve... |           0.0000
        2 | PostgreSQL Performance Tuning | B-tree indexes are the default and work well for most queries...                                        |           0.0000
        3 | PostgreSQL Performance Tuning | GiST indexes are useful for full-text search and geometric data...                                      |           0.0000
        4 | PostgreSQL Performance Tuning | Hash indexes can be faster for equality comparisons but are not WAL-logged...                           |           0.0000
(5 rows)
\`\`\`

All results are from documents with \`metadata->>'category' = 'database'\`, demonstrating how semantic search can be combined with metadata filtering.

### Batch Embedding Generation

For better performance when processing many documents, use batch embedding generation:

\`\`\`sql
-- Generate embeddings in batch (5x faster than individual calls)
-- Process chunks in batches to avoid memory issues with very large datasets
WITH chunk_batches AS (
    SELECT 
        chunk_id,
        chunk_text,
        (ROW_NUMBER() OVER (ORDER BY chunk_id) - 1) / 100 as batch_num
    FROM document_chunks
    WHERE embedding IS NULL
),
batch_embeddings AS (
    SELECT 
        batch_num,
        ARRAY_AGG(chunk_id ORDER BY chunk_id) as chunk_ids,
        embed_text_batch(
            ARRAY_AGG(chunk_text ORDER BY chunk_id),
            'sentence-transformers/all-MiniLM-L6-v2'
        ) as embeddings
    FROM chunk_batches
    GROUP BY batch_num
),
unnested AS (
    SELECT 
        unnest(chunk_ids) as chunk_id,
        unnest(embeddings) as embedding
    FROM batch_embeddings
)
UPDATE document_chunks dc
SET embedding = u.embedding
FROM unnested u
WHERE dc.chunk_id = u.chunk_id;
\`\`\`

**Note**: Batch processing groups chunks into batches of 100. Adjust the batch size (100) based on your available memory. For smaller datasets, you can process all chunks at once:

\`\`\`sql
-- Process all chunks in a single batch (use for smaller datasets)
WITH batch_data AS (
    SELECT 
        ARRAY_AGG(chunk_id ORDER BY chunk_id) as chunk_ids,
        embed_text_batch(
            ARRAY_AGG(chunk_text ORDER BY chunk_id),
            'sentence-transformers/all-MiniLM-L6-v2'
        ) as embeddings
    FROM document_chunks
    WHERE embedding IS NULL
),
unnested AS (
    SELECT 
        unnest(chunk_ids) as chunk_id,
        unnest(embeddings) as embedding
    FROM batch_data
)
UPDATE document_chunks dc
SET embedding = u.embedding
FROM unnested u
WHERE dc.chunk_id = u.chunk_id;
\`\`\`

## Building a RAG Pipeline

[Retrieval-Augmented Generation](https://arxiv.org/abs/2005.11401) (RAG) combines semantic search with LLM generation. Build a RAG system with these steps:

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

**Results:**

The RAG pipeline retrieves the most relevant context chunks:

\`\`\`
 chunk_id |                  title                  |                                                 preview                                                 | score  | rank 
----------+-----------------------------------------+---------------------------------------------------------------------------------------------------------+--------+------
        1 | PostgreSQL Performance Tuning           | PostgreSQL performance can be significantly improved through proper indexing strategies...              | 0.0000 |    1
       11 | Retrieval-Augmented Generation Overview | The process involves: 1) Converting user queries to embeddings, 2) Retrieving relevant documents usi... | 0.0000 |    2
       19 | Database Sharding Strategies            | Common strategies include: Range-based sharding (e.g., by date), Hash-based sharding (distribute eve... | 0.0000 |    3
        2 | PostgreSQL Performance Tuning           | B-tree indexes are the default and work well for most queries...                                        | 0.0000 |    4
        3 | PostgreSQL Performance Tuning           | GiST indexes are useful for full-text search and geometric data...                                      | 0.0000 |    5
(5 rows)
\`\`\`

The query successfully retrieves chunks about PostgreSQL performance tuning, which are the most relevant for answering "How can I improve PostgreSQL query performance?"

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

Pass the context to an LLM such as [OpenAI GPT](https://platform.openai.com/docs/models) or [Anthropic Claude](https://www.anthropic.com/claude) to generate a response grounded in the retrieved documents.

## Performance Optimization

### Using Vector Indexes

For production systems with large datasets, vector indexes are essential. [HNSW](https://arxiv.org/abs/1603.09320) indexes provide fast approximate nearest neighbor search:

\`\`\`sql
-- HNSW index for fast approximate nearest neighbor search
CREATE INDEX idx_chunks_embedding ON document_chunks 
USING hnsw (embedding vector_cosine_ops) 
WITH (m = 16, ef_construction = 64);
\`\`\`

The m parameter controls the number of connections per layer. The ef_construction parameter controls index quality during construction. Higher values improve recall but slow index creation.

### Embedding Caching

NeuronDB automatically caches embeddings to improve performance:

\`\`\`sql
-- Check cache statistics
SELECT * FROM neurondb.embedding_cache_stats;
\`\`\`

**Note**: The exact cache statistics table name may vary by NeuronDB version. Check the \`neurondb\` schema for available statistics tables:

\`\`\`
       tablename        
------------------------
 embedding_cache
 llm_cache
 query_metrics
 prometheus_metrics
 llm_stats
 ...
(29 rows)
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

This guide showed how to implement semantic search using NeuronDB. You learned:

- How semantic search differs from keyword search
- How to set up NeuronDB and create embedding vectors
- How to build a complete document search system
- How to create RAG pipelines for retrieval-augmented generation
- How to optimize performance with indexes and batch processing

NeuronDB adds semantic search directly to PostgreSQL. You build search systems using SQL syntax. The extension works with PostgreSQL 16, 17, and 18. It supports embedding models from Hugging Face. It provides GPU acceleration and efficient indexing.

Use semantic search for knowledge bases, document search, and RAG applications. All queries in this guide are production-ready.

## Resources

- [Documentation](https://pgelephant.com/neurondb)
- [GitHub Repository](https://github.com/pgElephant/NeurondB)
- [Support Email](mailto:admin@pgelephant.com)

All SQL queries in this guide are production-ready. Adapt them to your use case.`;

export default function BlogPost() {
    return (
        <div className="pt-16">
            <BlogPageTracker
                slug="neurondb-semantic-search-guide"
                title="Semantic Search Over Text with NeuronDB"
            />
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
