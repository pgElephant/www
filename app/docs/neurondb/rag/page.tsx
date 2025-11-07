import React from 'react'
import Link from 'next/link'
import { Zap, Search, ArrowRight, CheckCircle, Database } from 'lucide-react'
import { NeurondBIcon } from '../../../../components/ProductIcons'

export const metadata = {
  title: 'RAG with PostgreSQL | NeuronDB Retrieval Augmented Generation',
  description: 'Build production RAG (Retrieval Augmented Generation) applications with NeuronDB and PostgreSQL. Combine vector search + full-text search for AI chatbots, document Q&A, and knowledge bases. Includes OpenAI, LangChain, LlamaIndex examples.',
  keywords: [
    'RAG PostgreSQL',
    'retrieval augmented generation',
    'RAG database',
    'ChatGPT PostgreSQL',
    'LangChain PostgreSQL',
    'LlamaIndex PostgreSQL',
    'AI chatbot database',
    'document QA PostgreSQL',
    'semantic search RAG',
    'hybrid search RAG',
    'vector database RAG',
    'OpenAI RAG',
    'GPT-4 PostgreSQL',
    'knowledge base database'
  ],
  openGraph: {
    title: 'Build RAG Applications with NeuronDB PostgreSQL',
    description: 'Production-ready RAG stack with PostgreSQL. Vector search, full-text search, and AI embeddings in one database.',
    url: 'https://www.pgelephant.com/docs/neurondb/rag',
  },
  alternates: {
    canonical: 'https://www.pgelephant.com/docs/neurondb/rag',
  },
}

export default function NeuronDBRAGPage() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #070d1a 0%, #111827 25%, #1f2937 50%, #374151 75%, #4b5563 100%)' }}>
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-pink-500/10" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-violet-500/20 text-violet-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              RAG Pipeline
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                RAG Pipeline
              </span>
            </h1>
            
            <p className="text-xl text-white/80 mb-8">
              Complete Retrieval Augmented Generation pipeline in PostgreSQL. Build production-ready RAG systems entirely in-database with document processing, semantic retrieval, reranking, and LLM generation.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-16">
            
            {/* What is RAG */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8">
              <h2 className="text-3xl font-bold text-white mb-6">What is RAG?</h2>
              <p className="text-white/80 text-lg mb-6">
                <strong>Retrieval Augmented Generation (RAG)</strong> enhances LLM responses by retrieving relevant context from your database before generating answers. This grounds LLM outputs in your actual data, reducing hallucinations and improving accuracy.
              </p>
              
              <div className="bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 rounded-lg p-6 border border-violet-500/30">
                <h3 className="text-lg font-bold text-white mb-4">RAG Workflow</h3>
                <div className="space-y-3 text-white/80">
                  <div className="flex items-start gap-3">
                    <div className="bg-violet-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">1</div>
                    <div>
                      <strong>User Question:</strong> "What is PostgreSQL replication?"
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-fuchsia-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">2</div>
                    <div>
                      <strong>Retrieve:</strong> Find relevant documents using hybrid search
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">3</div>
                    <div>
                      <strong>Rerank:</strong> Score and sort results by relevance
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">4</div>
                    <div>
                      <strong>Generate:</strong> LLM creates answer using retrieved context
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-indigo-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">5</div>
                    <div>
                      <strong>Return:</strong> Grounded, accurate answer with sources
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Complete RAG Example */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Complete RAG Example</h2>
              
              <div className="space-y-6">
                {/* Step 1: Setup */}
                <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8">
                  <h3 className="text-xl font-bold text-violet-300 mb-4">Step 1: Setup Knowledge Base</h3>
                  <div className="bg-slate-900/50 rounded-lg p-6">
                    <pre className="text-sm overflow-x-auto"><code className="text-green-300">
                      {`
-- Create knowledge base table
CREATE TABLE knowledge_docs (
  id SERIAL PRIMARY KEY,
  title TEXT,
  content TEXT,
  embedding vector(384),
  ts_vector tsvector,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create indexes
CREATE INDEX ON knowledge_docs USING hnsw (embedding vector_l2_ops);
CREATE INDEX ON knowledge_docs USING gin (ts_vector);
CREATE INDEX ON knowledge_docs USING gin (metadata);`}
                    </code></pre>
                  </div>
                </div>

                {/* Step 2: Ingest */}
                <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8">
                  <h3 className="text-xl font-bold text-fuchsia-300 mb-4">Step 2: Ingest Documents</h3>
                  <div className="bg-slate-900/50 rounded-lg p-6">
                    <pre className="text-sm overflow-x-auto"><code className="text-green-300">
                      {`
-- Insert documents with automatic embedding generation
INSERT INTO knowledge_docs (title, content, embedding, ts_vector, metadata)
VALUES (
  'PostgreSQL Replication Guide',
  'PostgreSQL supports streaming replication for high availability...',
  embed_text('PostgreSQL supports streaming replication for high availability...'),
  to_tsvector('PostgreSQL supports streaming replication for high availability...'),
  '{"category": "database", "tags": ["replication", "ha"]}'::jsonb
);

-- Batch insert with embeddings
INSERT INTO knowledge_docs (title, content, embedding, ts_vector)
SELECT 
  title,
  content,
  embed_cached(content),  -- Uses cache for duplicate content
  to_tsvector(content)
FROM imported_documents;`}
                    </code></pre>
                  </div>
                </div>

                {/* Step 3: Retrieve */}
                <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8">
                  <h3 className="text-xl font-bold text-pink-300 mb-4">Step 3: Retrieve Relevant Documents</h3>
                  <div className="bg-slate-900/50 rounded-lg p-6">
                    <pre className="text-sm overflow-x-auto"><code className="text-green-300">
                      {`
-- Hybrid search: 70% vector + 30% text
WITH candidates AS (
  SELECT * FROM hybrid_search(
    'knowledge_docs',
    'content',
    'embedding',
    'What is PostgreSQL replication?',
    20,    -- fetch 20 candidates
    0.7,   -- 70% vector weight
    0.3    -- 30% text weight
  )
)
-- Rerank top candidates for precision
SELECT * FROM rerank_cross_encoder(
  'What is PostgreSQL replication?',
  (SELECT array_agg(content) FROM candidates),
  'ms-marco-MiniLM-L-6-v2',
  5  -- return top 5
);`}
                    </code></pre>
                  </div>
                </div>

                {/* Step 4: Generate */}
                <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8">
                  <h3 className="text-xl font-bold text-purple-300 mb-4">Step 4: Generate Answer</h3>
                  <div className="bg-slate-900/50 rounded-lg p-6">
                    <pre className="text-sm overflow-x-auto"><code className="text-green-300">
                      {`
-- Complete RAG query
SELECT neurondb_rag_answer(
  'What is PostgreSQL replication?',    -- question
  'knowledge_docs',                      -- table
  'content',                             -- content column
  'embedding',                           -- vector column
  '{                                     -- options
    "model": "gpt-4",
    "temperature": 0.7,
    "max_tokens": 500,
    "retrieve_count": 5,
    "rerank": true
  }'::jsonb
);

-- Returns:
-- {
--   "answer": "PostgreSQL replication is...",
--   "sources": [{"id": 1, "title": "...", "score": 0.95}],
--   "tokens_used": 342,
--   "latency_ms": 1234
-- }`}
                    </code></pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced Features */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Advanced RAG Features</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-6">
                  <h3 className="text-lg font-bold text-violet-300 mb-3">Multi-Query RAG</h3>
                  <p className="text-white/70 text-sm mb-4">
                    Generate multiple query variations to improve recall.
                  </p>
                  <div className="bg-slate-900/50 rounded-lg p-4 font-mono text-xs">
                    <pre className="text-sm overflow-x-auto"><code className="text-cyan-300">
                      {`
SELECT neurondb_multiquery_rag(
  'complex question',
  'docs', 'content', 'embedding',
  3  -- generate 3 variations
);`}
                    </code></pre>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-6">
                  <h3 className="text-lg font-bold text-fuchsia-300 mb-3">Contextual Compression</h3>
                  <p className="text-white/70 text-sm mb-4">
                    Extract only relevant sections from retrieved documents.
                  </p>
                  <div className="bg-slate-900/50 rounded-lg p-4 font-mono text-xs">
                    <pre className="text-sm overflow-x-auto"><code className="text-cyan-300">
                      {`
SELECT compress_context(
  'question',
  documents_array,
  model := 'gpt-4'
);`}
                    </code></pre>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-6">
                  <h3 className="text-lg font-bold text-pink-300 mb-3">Guardrails</h3>
                  <p className="text-white/70 text-sm mb-4">
                    Content safety checks and policy enforcement.
                  </p>
                  <div className="bg-slate-900/50 rounded-lg p-4 font-mono text-xs">
                    <pre className="text-sm overflow-x-auto"><code className="text-cyan-300">
                      {`
SELECT check_guardrails(
  answer_text,
  '{
    "toxicity": 0.1,
    "pii_detection": true
  }'::jsonb
);`}
                    </code></pre>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-6">
                  <h3 className="text-lg font-bold text-purple-300 mb-3">Cost Tracking</h3>
                  <p className="text-white/70 text-sm mb-4">
                    Monitor LLM token usage and costs per query.
                  </p>
                  <div className="bg-slate-900/50 rounded-lg p-4 font-mono text-xs">
                    <pre className="text-sm overflow-x-auto"><code className="text-cyan-300">
                      {`
SELECT * 
FROM neurondb_llm_costs
ORDER BY timestamp DESC
LIMIT 10;`}
                    </code></pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-gradient-to-r from-violet-500/20 to-pink-500/20 rounded-xl border border-violet-500/30 p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Related Documentation</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <Link href="/docs/neurondb/hybrid" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-all group">
                  <Search className="w-6 h-6 text-violet-400" />
                  <div className="flex-1">
                    <div className="font-semibold text-white text-sm">Hybrid Search</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/40" />
                </Link>
                <Link href="/docs/neurondb/ml/embeddings" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-all group">
                  <NeurondBIcon size={24} />
                  <div className="flex-1">
                    <div className="font-semibold text-white text-sm">Embeddings</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/40" />
                </Link>
                <Link href="/docs/neurondb/background-workers" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-all group">
                  <Database className="w-6 h-6 text-pink-400" />
                  <div className="flex-1">
                    <div className="font-semibold text-white text-sm">Workers</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/40" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

