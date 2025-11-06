export const metadata = {
  title: 'NeuronDB · RAG Pipeline (Chunk → Embed → Rank → Transform)',
  description: 'Build retrieval-augmented generation pipelines directly in PostgreSQL with NeuronDB utilities for chunking, embedding, ranking and transformations.'
}

import React from 'react'
import Link from 'next/link'
import { BookOpen, ArrowRight, Database, Activity, TrendingUp, Code } from 'lucide-react'

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <Link href="/docs/neurondb/ml" className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-200 transition-colors">
            <ArrowRight className="w-4 h-4 rotate-180" /> Back to Machine Learning
          </Link>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text flex items-center gap-3">
          <BookOpen className="w-10 h-10 text-indigo-400" /> RAG Pipeline
        </h1>
        
        <p className="text-lg text-gray-300 mb-8">
          Build Retrieval-Augmented Generation pipelines with text chunking, embeddings, ranking, and transformations—all in SQL.
        </p>

        {/* TEXT CHUNKING */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-indigo-400">neurondb.chunk() - Text Chunking</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 mb-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Database className="w-5 h-5 text-indigo-400" />
                Overlap-Aware Chunking
              </h3>
              <p className="text-gray-300 mb-4">
                Split long documents into smaller chunks with overlap to maintain context between chunks.
              </p>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`WITH long_document AS (
    SELECT 'This is a very long document that needs to be chunked into smaller pieces for processing. ' ||
           'Each chunk will have some overlap with the next chunk to maintain context. ' ||
           'This is important for Retrieval-Augmented Generation pipelines. ' ||
           'The chunks can then be embedded and stored in a vector database. ' ||
           'When a user asks a question, relevant chunks are retrieved and used for generation.' as doc
)
SELECT 
    unnest(neurondb.chunk(
        doc,       -- Text to chunk
        100,       -- Chunk size (characters)
        20         -- Overlap (characters)
    )) as chunk,
    generate_subscripts(neurondb.chunk(doc, 100, 20), 1) as chunk_number
FROM long_document
LIMIT 5;

-- Output: 5 overlapping chunks
-- chunk_number | chunk
-- -------------+-----------------------------------------------
--            1 | This is a very long document that needs to be...
--            2 | ...to be chunked into smaller pieces for proc...
--            3 | ...processing. Each chunk will have some over...
--            4 | ...overlap with the next chunk to maintain co...
--            5 | ...context. This is important for Retrieval-A...`}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* TEXT EMBEDDINGS */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-purple-400">neurondb.embed() - Text Embeddings</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 mb-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-purple-400" />
                Generate Embeddings with GPU Support
              </h3>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`WITH text_samples AS (
    SELECT 'Machine learning in databases is powerful' as text, 1 as id
    UNION ALL
    SELECT 'PostgreSQL extensions enable ML capabilities' as text, 2 as id
    UNION ALL
    SELECT 'Vector search with HNSW indexes is fast' as text, 3 as id
)
SELECT 
    id,
    text,
    vector_dims(neurondb.embed(
        'all-MiniLM-L6-v2',  -- Model name
        text,                 -- Text to embed
        true                  -- Use GPU acceleration
    )) as embedding_dims,
    substring(
        neurondb.embed('all-MiniLM-L6-v2', text, true)::text, 
        1, 50
    ) || '...' as embedding_preview
FROM text_samples;

-- Output:
-- id | text                                      | embedding_dims | embedding_preview
-- ---+-------------------------------------------+----------------+------------------
--  1 | Machine learning in databases is powerful |            384 | [0.123, -0.456,..
--  2 | PostgreSQL extensions enable ML...        |            384 | [-0.234, 0.567,..
--  3 | Vector search with HNSW indexes is fast   |            384 | [0.345, -0.123,..`}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* DOCUMENT RERANKING */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-pink-400">neurondb.rank() - Document Reranking</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 mb-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-pink-400" />
                Rerank Documents by Relevance
              </h3>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`WITH documents AS (
    SELECT ARRAY[
        'PostgreSQL is a powerful relational database',
        'Machine learning models can be trained in SQL',
        'Vector search enables semantic similarity',
        'RAG pipelines combine retrieval and generation',
        'NeuronDB extends PostgreSQL with ML capabilities'
    ] as docs
)
SELECT neurondb.rank(
    'machine learning',  -- Query
    docs,                -- Documents to rank
    'bm25'               -- Ranking algorithm (BM25)
) as ranked_results
FROM documents;

-- Output: Documents ranked by relevance to query
-- ranked_results
-- --------------------------------------------------------------
-- ['Machine learning models can be trained in SQL', 
--  'NeuronDB extends PostgreSQL with ML capabilities',
--  'RAG pipelines combine retrieval and generation',
--  ...]`}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* DATA TRANSFORMATIONS */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-cyan-400">neurondb.transform() - Data Transformations</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`WITH raw_data AS (
    SELECT ARRAY[1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0]::float8[] as data
)
SELECT 
    'Original' as transformation,
    data
FROM raw_data

UNION ALL

SELECT 
    'Normalized (L2)' as transformation,
    neurondb.transform('normalize', data)
FROM raw_data

UNION ALL

SELECT 
    'Standardized (Z-score)' as transformation,
    neurondb.transform('standardize', data)
FROM raw_data

UNION ALL

SELECT 
    'Min-Max Scaled' as transformation,
    neurondb.transform('min_max', data)
FROM raw_data;

-- transformations available:
-- • normalize: L2 normalization
-- • standardize: Z-score standardization (mean=0, std=1)
-- • min_max: Scale to [0, 1] range`}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* COMPLETE WORKFLOW */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-green-400">Complete RAG Workflow</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Create RAG document store with chunks and embeddings
DROP TABLE IF EXISTS rag_documents CASCADE;
CREATE TEMP TABLE rag_documents AS
WITH long_docs AS (
    SELECT 
        i as doc_id,
        'Document about ' || 
        CASE 
            WHEN i % 3 = 0 THEN 'machine learning and artificial intelligence applications'
            WHEN i % 3 = 1 THEN 'database systems and query optimization techniques'
            ELSE 'vector search and similarity matching algorithms'
        END ||
        '. This contains detailed information about the topic.' as content
    FROM generate_series(1, 10) i
)
SELECT 
    doc_id,
    content,
    unnest(neurondb.chunk(content, 50, 10)) as chunk,
    generate_subscripts(neurondb.chunk(content, 50, 10), 1) as chunk_num,
    neurondb.embed('all-MiniLM-L6-v2', unnest(neurondb.chunk(content, 50, 10))) as embedding
FROM long_docs;

-- Query the RAG document store
SELECT 
    doc_id,
    chunk_num,
    substring(chunk, 1, 60) || '...' as chunk_preview,
    vector_dims(embedding) as embedding_dims
FROM rag_documents
LIMIT 10;`}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* COMPLETE DEMO FILES */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Code className="w-6 h-6 text-purple-400" />
            Complete Demo SQL File
          </h2>
          <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
            <a href="https://github.com/pgElephant/NeurondB/tree/main/demo/ML/sql/019_rag_pipeline.sql" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 hover:underline">
              📄 View complete demo on GitHub: demo/ML/sql/019_rag_pipeline.sql
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
