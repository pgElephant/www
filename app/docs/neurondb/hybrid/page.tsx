export const metadata = {
  title: 'NeuronDB · Hybrid Search',
  description: 'Combine semantic vector search with lexical (BM25) and apply learning-to-rank for better relevance.',
}

import React from 'react'
import Link from 'next/link'
import { Search, Zap, BarChart3, ArrowRight, CheckCircle } from 'lucide-react'

export default function Page() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #070d1a 0%, #111827 25%, #1f2937 50%, #374151 75%, #4b5563 100%)' }}>
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Search className="w-4 h-4" />
              Hybrid Search
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Hybrid Search
              </span>
            </h1>
            
            <p className="text-xl text-white/80 mb-8">
              Combine vector similarity with full-text search for best-in-class retrieval. Get the semantic understanding of embeddings plus the precision of keyword matching.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-16">
            
            {/* What is Hybrid Search */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8">
              <h2 className="text-3xl font-bold text-white mb-6">What is Hybrid Search?</h2>
              <p className="text-white/80 text-lg mb-6">
                Hybrid search combines <strong>vector similarity</strong> (semantic meaning) with <strong>full-text search</strong> (keyword matching) to provide superior search results that understand both context and exact terms.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-purple-500/10 rounded-lg p-6 border border-purple-500/30">
                  <h3 className="text-lg font-bold text-purple-300 mb-3">Vector Search Alone</h3>
                  <ul className="space-y-2 text-white/70 text-sm">
                    <li>✓ Understands semantic meaning</li>
                    <li>✓ Finds conceptually similar content</li>
                    <li>✗ May miss exact keyword matches</li>
                    <li>✗ Can return loosely related results</li>
                  </ul>
                </div>
                <div className="bg-cyan-500/10 rounded-lg p-6 border border-cyan-500/30">
                  <h3 className="text-lg font-bold text-cyan-300 mb-3">Full-Text Search Alone</h3>
                  <ul className="space-y-2 text-white/70 text-sm">
                    <li>✓ Precise keyword matching</li>
                    <li>✓ Fast for exact terms</li>
                    <li>✗ No semantic understanding</li>
                    <li>✗ Misses synonyms and context</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-lg p-6 border border-purple-500/30 mt-6">
                <h3 className="text-lg font-bold text-green-300 mb-3">Hybrid Search = Best of Both</h3>
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Semantic understanding from vector embeddings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Precise keyword matching from full-text search</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Weighted scoring to balance both approaches</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Superior relevance and recall</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Basic Hybrid Search */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Basic Hybrid Search</h2>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8">
                <h3 className="text-xl font-bold text-white mb-4">Setup Table</h3>
                <div className="bg-slate-900/50 rounded-lg p-6 font-mono text-sm mb-6">
                  <code className="text-green-300">
                    {`-- Create table with vector and text columns
CREATE TABLE knowledge_base (
  id SERIAL PRIMARY KEY,
  title TEXT,
  content TEXT,
  embedding vector(384),
  ts_vector tsvector
);

-- Create indexes
CREATE INDEX ON knowledge_base USING hnsw (embedding vector_l2_ops);
CREATE INDEX ON knowledge_base USING gin (ts_vector);

-- Insert data with embeddings and text index
INSERT INTO knowledge_base (title, content, embedding, ts_vector)
VALUES (
  'PostgreSQL Performance',
  'Optimize queries with indexes and EXPLAIN',
  embed_text('Optimize queries with indexes and EXPLAIN'),
  to_tsvector('Optimize queries with indexes and EXPLAIN')
);`}
                  </code>
                </div>

                <h3 className="text-xl font-bold text-white mb-4">Perform Hybrid Search</h3>
                <div className="bg-slate-900/50 rounded-lg p-6 font-mono text-sm">
                  <code className="text-green-300">
                    {`-- Hybrid search: 70% vector + 30% text
SELECT * FROM hybrid_search(
  'knowledge_base',      -- table name
  'content',             -- text column
  'embedding',           -- vector column
  'database optimization', -- query
  10,                    -- limit
  0.7,                   -- vector weight (70%)
  0.3                    -- text weight (30%)
);

-- Returns: id, title, content, vector_score, text_score, hybrid_score`}
                  </code>
                </div>
              </div>
            </div>

            {/* Reranking */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Reranking for Precision</h2>
              <div className="space-y-6">
                
                {/* Cross-Encoder */}
                <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8">
                  <h3 className="text-xl font-bold text-white mb-4">Cross-Encoder Reranking</h3>
                  <p className="text-white/70 mb-4">
                    Cross-encoders jointly encode the query and each candidate for higher precision scoring.
                  </p>
                  <div className="bg-slate-900/50 rounded-lg p-6 font-mono text-sm">
                    <code className="text-green-300">
                      {`-- Rerank search results with cross-encoder
SELECT rerank_cross_encoder(
  'What is PostgreSQL?',                    -- query
  ARRAY[                                    -- candidate documents
    'PostgreSQL is a database',
    'MySQL is also a database',
    'Redis is a cache'
  ],
  'ms-marco-MiniLM-L-6-v2',                -- model
  3                                         -- top_n
);

-- Returns:
--  idx | score
-- -----+-------
--   0  | 0.945  (most relevant)
--   1  | 0.678
--   2  | 0.123  (least relevant)`}
                    </code>
                  </div>
                </div>

                {/* MMR */}
                <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8">
                  <h3 className="text-xl font-bold text-white mb-4">MMR (Maximal Marginal Relevance)</h3>
                  <p className="text-white/70 mb-4">
                    MMR balances relevance with diversity to avoid redundant results.
                  </p>
                  <div className="bg-slate-900/50 rounded-lg p-6 font-mono text-sm">
                    <code className="text-green-300">
                      {`-- MMR reranking for diverse results
SELECT * FROM mmr_rerank(
  'knowledge_base',           -- table
  'embedding',                -- vector column
  embed_text('database'),     -- query vector
  20,                         -- fetch top 20 candidates
  5,                          -- return top 5 diverse results
  0.7                         -- lambda (0.7 = 70% relevance, 30% diversity)
);

-- Returns: id, title, score, diversity`}
                    </code>
                  </div>
                </div>
              </div>
            </div>

            {/* Best Practices */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Best Practices</h2>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-cyan-300 mb-3">1. Tune Vector/Text Weights</h3>
                    <p className="text-white/70 mb-3">
                      Adjust the balance based on your use case:
                    </p>
                    <ul className="space-y-2 text-white/70 text-sm ml-4">
                      <li><code className="text-cyan-300">0.9/0.1</code> - Heavily semantic (concepts matter more than exact terms)</li>
                      <li><code className="text-cyan-300">0.7/0.3</code> - Balanced (default, works for most cases)</li>
                      <li><code className="text-cyan-300">0.5/0.5</code> - Equal weight (both semantic and keywords important)</li>
                      <li><code className="text-cyan-300">0.3/0.7</code> - Keyword-focused (exact terms critical)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-cyan-300 mb-3">2. Index Both Columns</h3>
                    <div className="bg-slate-900/50 rounded-lg p-4 font-mono text-sm">
                      <code className="text-green-300">
                        {`-- Always index both for performance
CREATE INDEX ON docs USING hnsw (embedding vector_l2_ops);
CREATE INDEX ON docs USING gin (ts_vector);`}
                      </code>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-cyan-300 mb-3">3. Use Reranking for Top Results</h3>
                    <p className="text-white/70 text-sm">
                      Fetch 50-100 candidates with hybrid search, then rerank top 10-20 for best precision.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30 p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Related Documentation</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/docs/neurondb/ml/embeddings" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-all group">
                  <Search className="w-6 h-6 text-purple-400" />
                  <div>
                    <div className="font-semibold text-white group-hover:text-purple-300">Embeddings</div>
                    <div className="text-sm text-white/60">Generate embeddings</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/40 ml-auto" />
                </Link>
                <Link href="/docs/neurondb/rag" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-all group">
                  <Zap className="w-6 h-6 text-cyan-400" />
                  <div>
                    <div className="font-semibold text-white group-hover:text-cyan-300">RAG Pipeline</div>
                    <div className="text-sm text-white/60">Complete RAG setup</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/40 ml-auto" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

