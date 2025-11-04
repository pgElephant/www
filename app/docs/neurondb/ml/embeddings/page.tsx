export const metadata = {
  title: 'NeuronDB · Embeddings',
  description: 'Configure providers, generate text embeddings, cache results, and query embeddings with NeuronDB.',
}

import React from 'react'
import Link from 'next/link'
import { Brain, Sparkles, Image as ImageIcon, FileText, Zap, CheckCircle, ArrowRight, Code } from 'lucide-react'

export default function Page() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #070d1a 0%, #111827 25%, #1f2937 50%, #374151 75%, #4b5563 100%)' }}>
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-cyan-500/10" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Brain className="w-4 h-4" />
                Machine Learning
              </div>
              
              <h1 className="text-5xl font-bold text-white mb-6">
                Understanding Embeddings
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Learn what embeddings are, why they matter, and how to use them effectively in NeurondB
              </p>
            </div>

            {/* What are Embeddings */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8 mb-8">
              <h2 className="text-3xl font-bold text-white mb-6">What Are Embeddings?</h2>
              <p className="text-white/80 mb-6 text-lg leading-relaxed">
                <strong className="text-purple-300">Embeddings</strong> are dense vector representations of data (text, images, audio) that capture semantic meaning in a high-dimensional space. 
                Unlike traditional keyword-based representations, embeddings encode contextual relationships, allowing machines to understand similarity and meaning.
              </p>

              <div className="bg-purple-500/10 border border-purple-400/30 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-white mb-4">Key Concept</h3>
                <div className="space-y-3 text-white/80">
                  <p>
                    <strong>Traditional Search:</strong> Matches exact keywords → "machine learning" only finds documents with those exact words
                  </p>
                  <p>
                    <strong>Semantic Search (Embeddings):</strong> Understands meaning → "machine learning" also finds "neural networks", "AI models", "deep learning"
                  </p>
                </div>
              </div>

              {/* Visual Example */}
              <div className="bg-slate-900/80 rounded-lg p-6">
                <p className="text-white/70 mb-3 font-semibold">How Embeddings Capture Similarity:</p>
                <pre className="text-sm text-white/80 leading-relaxed">
{`
Text "cat"    → [0.8, 0.2, 0.1, ...]     ┐
Text "kitten" → [0.75, 0.25, 0.12, ...]   ├─ Close together (similar meaning)
Text "dog"    → [0.7, 0.3, 0.15, ...]     ┘

Text "car"    → [-0.3, 0.9, -0.5, ...]    ← Far apart (different concept)`}
                </pre>
              </div>
            </div>

            {/* Why Embeddings Matter */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8 mb-8">
              <h2 className="text-3xl font-bold text-white mb-6">Why Embeddings Matter</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Understanding Context</h3>
                    <p className="text-white/70">
                      Embeddings capture context and meaning. The word "bank" has different embeddings near "river" vs "money" based on context.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Language Independence</h3>
                    <p className="text-white/70">
                      Similar concepts in different languages have similar embeddings. Search in English, find results in Spanish/French/Chinese.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Multimodal Capabilities</h3>
                    <p className="text-white/70">
                      Text, images, and audio can be embedded in the same space. Search for images using text descriptions!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Text Embeddings */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8 mb-8">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <FileText className="w-8 h-8 text-indigo-400" />
                Text Embeddings
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Basic Usage</h3>
                  <div className="bg-slate-900/80 rounded-lg p-4">
                    <pre className="text-green-400 font-mono text-sm overflow-x-auto">
{`
-- Generate embedding from text
SELECT embed_text('artificial intelligence');

-- Result: vector(384) containing the embedding
-- [0.234, -0.891, 0.456, ..., 0.123]`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Choose a Model</h3>
                  <div className="bg-slate-900/80 rounded-lg p-4">
                    <pre className="text-green-400 font-mono text-sm overflow-x-auto">
{`
-- Fast, efficient model (384 dimensions)
SELECT embed_text('machine learning', 'all-MiniLM-L6-v2');

-- Higher quality (768 dimensions)
SELECT embed_text('machine learning', 'all-mpnet-base-v2');`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Batch Processing</h3>
                  <p className="text-white/70 mb-3">
                    Process multiple texts efficiently (3-5x faster than individual calls):
                  </p>
                  <div className="bg-slate-900/80 rounded-lg p-4">
                    <pre className="text-green-400 font-mono text-sm overflow-x-auto">
{`
-- Embed multiple texts at once
SELECT embed_text_batch(
    ARRAY[
        'artificial intelligence',
        'machine learning',
        'deep learning'
    ],
    'all-MiniLM-L6-v2'
);`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Embeddings */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8 mb-8">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <ImageIcon className="w-8 h-8 text-purple-400" />
                Image Embeddings
              </h2>

              <p className="text-white/80 mb-6">
                Convert visual information into vectors for reverse image search, classification, and multimodal search.
              </p>

              <div className="bg-slate-900/80 rounded-lg p-4 mb-6">
                <pre className="text-green-400 font-mono text-sm overflow-x-auto">
{`
-- Embed image from binary data
SELECT embed_image(
    pg_read_binary_file('/path/to/image.jpg'),
    'clip'  -- CLIP model (text + image)
);

-- Search images using text
SELECT filename, 
       embedding <-> embed_text('sunset beach') AS distance
FROM images
ORDER BY distance
LIMIT 10;`}
                </pre>
              </div>

              <div className="bg-purple-500/20 rounded-lg p-4">
                <p className="text-white/80 text-sm">
                  <strong>🎨 Multimodal Magic:</strong> With CLIP embeddings, you can search for images using text descriptions and vice versa!
                </p>
              </div>
            </div>

            {/* Practical Example */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8 mb-8">
              <h2 className="text-3xl font-bold text-white mb-6">Complete Example: Document Search</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="bg-indigo-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                    Create Table
                  </h3>
                  <div className="bg-slate-900/80 rounded-lg p-4">
                    <pre className="text-green-400 font-mono text-sm overflow-x-auto">
{`
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    title TEXT,
    content TEXT,
    embedding vector(384)
);`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                    Insert Documents with Embeddings
                  </h3>
                  <div className="bg-slate-900/80 rounded-lg p-4">
                    <pre className="text-green-400 font-mono text-sm overflow-x-auto">
{`
INSERT INTO documents (title, content, embedding) VALUES
    ('Machine Learning', 'Introduction to ML...', 
     embed_text('Introduction to ML...')),
    ('Deep Learning', 'Neural networks...', 
     embed_text('Neural networks...'));`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="bg-cyan-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                    Semantic Search
                  </h3>
                  <div className="bg-slate-900/80 rounded-lg p-4">
                    <pre className="text-green-400 font-mono text-sm overflow-x-auto">
{`
SELECT title, content,
       embedding <-> embed_text('AI algorithms') AS distance
FROM documents
ORDER BY distance
LIMIT 5;`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Tips */}
            <div className="bg-yellow-500/20 backdrop-blur-sm rounded-xl border border-yellow-400/30 p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Zap className="w-6 h-6 text-yellow-400" />
                Performance Tips
              </h2>
              <ul className="space-y-3 text-white/80">
                <li>• <strong>Batch processing:</strong> Use <pre className="text-sm overflow-x-auto"><code className="bg-slate-900 px-2 py-1 rounded text-indigo-300">embed_text_batch()</code></pre> for 3-5x speedup</li>
                <li>• <strong>Caching:</strong> Use <pre className="text-sm overflow-x-auto"><code className="bg-slate-900 px-2 py-1 rounded text-purple-300">embed_cached()</code></pre> to avoid regenerating embeddings</li>
                <li>• <strong>Indexing:</strong> Create HNSW indexes on embedding columns for fast search</li>
                <li>• <strong>Model selection:</strong> Smaller models (384-dim) are faster, larger models (768-dim) are more accurate</li>
                <li>• <strong>Quantization:</strong> Use int8 or binary types for 4-32x storage savings</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

