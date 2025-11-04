export const metadata = {
  title: 'NeuronDB · Vector Types',
  description: 'Dense vectors, packed vectors, sparse maps, vector graphs, and retrieval text types in NeuronDB.',
}

import React from 'react'
import Link from 'next/link'
import { Database, Zap, BarChart3, Layers, CheckCircle, ArrowRight, Info } from 'lucide-react'

export default function Page() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #070d1a 0%, #111827 25%, #1f2937 50%, #374151 75%, #4b5563 100%)' }}>
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-cyan-500/10" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Database className="w-4 h-4" />
                Core Features
              </div>
              
              <h1 className="text-5xl font-bold text-white mb-6">
                Vector Types in NeurondB
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Understanding vectors, their purpose, and choosing the right type for your use case
              </p>
            </div>

            {/* What are Vectors */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8 mb-8">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <Info className="w-8 h-8 text-indigo-400" />
                What Are Vectors?
              </h2>
              <p className="text-white/80 mb-4 text-lg leading-relaxed">
                A <strong className="text-indigo-300">vector</strong> is a mathematical object represented as an array of numbers. 
                In AI and machine learning, vectors represent data (text, images, audio) in numerical format that computers can process and compare.
              </p>
              
              <div className="bg-slate-900/80 rounded-lg p-6 mb-6">
                <p className="text-white/70 mb-2">Example Vector:</p>
                <pre className="text-green-400 font-mono text-sm">
{`[0.234, -0.891, 0.456, 0.123, -0.678]`}
                </pre>
                <p className="text-white/60 text-sm mt-2">
                  This is a 5-dimensional vector where each number represents a feature
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-indigo-500/10 border border-indigo-400/30 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Traditional Database</h3>
                  <p className="text-white/70 text-sm">
                    Stores structured data: numbers, text, dates. Searches using exact matches or patterns.
                  </p>
                </div>
                <div className="bg-purple-500/10 border border-purple-400/30 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Vector Database</h3>
                  <p className="text-white/70 text-sm">
                    Stores numerical representations of data. Searches by semantic similarity and meaning.
                  </p>
                </div>
              </div>
            </div>

            {/* Why Vectors */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8 mb-8">
              <h2 className="text-3xl font-bold text-white mb-6">Why Use Vectors?</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Semantic Search</h3>
                    <p className="text-white/70">
                      Find similar items based on <em>meaning</em>, not just keywords. 
                      Search for "laptop" and get results for "notebook computer", "portable PC".
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Recommendations</h3>
                    <p className="text-white/70">
                      Build recommendation systems that suggest related products, content, or services based on similarity.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Anomaly Detection</h3>
                    <p className="text-white/70">
                      Identify unusual patterns by finding data points that are distant from normal clusters.
                    </p>
                  </div>
                </div>
              </div>

              {/* Visual Example */}
              <div className="mt-6 bg-slate-900/80 rounded-lg p-6">
                <p className="text-white/70 mb-3 font-semibold">How Vector Similarity Works:</p>
                <pre className="text-sm text-white/80 leading-relaxed">
{`Query: "laptop computers"
   ↓
Convert to vector: [0.8, 0.2, 0.1, ...]
   ↓
Find similar vectors in database:
   • "notebook PCs"     distance: 0.15 ✅ Very similar
   • "tablets"          distance: 0.45 ✅ Somewhat similar  
   • "bicycles"         distance: 2.30 ❌ Not similar`}
                </pre>
              </div>
            </div>

            {/* Vector Types */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8 mb-8">
              <h2 className="text-3xl font-bold text-white mb-6">NeurondB Vector Types</h2>
              
              {/* vector (float32) */}
              <div className="bg-indigo-500/10 border border-indigo-400/30 rounded-lg p-6 mb-6">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <Database className="w-6 h-6 text-indigo-400" />
                  vector (Standard Precision)
                </h3>
                <p className="text-white/80 mb-4">
                  The primary vector type using <strong>32-bit floating-point</strong> numbers (float32).
                </p>

                <div className="bg-slate-900/80 rounded-lg p-4 mb-4">
                  <pre className="text-green-400 font-mono text-sm overflow-x-auto">
{`-- Create table with vector column
CREATE TABLE embeddings (
    id SERIAL PRIMARY KEY,
    data vector(384)  -- 384-dimensional vector
);

-- Insert vector
INSERT INTO embeddings (data) 
VALUES ('[0.1, 0.2, 0.3, ...]'::vector);`}
                  </pre>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Specifications:</h4>
                    <ul className="text-white/70 text-sm space-y-1">
                      <li>• Precision: 32-bit float (7 decimal digits)</li>
                      <li>• Storage: 4 bytes × dimensions</li>
                      <li>• Range: ±1.175e-38 to ±3.402e+38</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Best For:</h4>
                    <ul className="text-white/70 text-sm space-y-1">
                      <li>• General-purpose embeddings</li>
                      <li>• Research and development</li>
                      <li>• High-accuracy requirements</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-500/10 rounded-lg p-4 mt-4">
                  <p className="text-white/80 text-sm">
                    <strong>Storage Example:</strong> 1 million 768-dimensional vectors = 1M × 768 × 4 bytes = 3GB
                  </p>
                </div>
              </div>

              {/* float16 */}
              <div className="bg-purple-500/10 border border-purple-400/30 rounded-lg p-6 mb-6">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <Zap className="w-6 h-6 text-purple-400" />
                  float16 (Half Precision)
                </h3>
                <p className="text-white/80 mb-4">
                  Compressed format using <strong>16-bit floating-point</strong> for 2x storage savings.
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Specifications:</h4>
                    <ul className="text-white/70 text-sm space-y-1">
                      <li>• Precision: 16-bit float</li>
                      <li>• Storage: 2 bytes × dimensions (50% savings)</li>
                      <li>• Accuracy: 99%+ recall maintained</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Best For:</h4>
                    <ul className="text-white/70 text-sm space-y-1">
                      <li>• Production deployments</li>
                      <li>• Large-scale applications</li>
                      <li>• Storage-constrained systems</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* int8 */}
              <div className="bg-cyan-500/10 border border-cyan-400/30 rounded-lg p-6 mb-6">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-cyan-400" />
                  int8 (Quantized)
                </h3>
                <p className="text-white/80 mb-4">
                  Highly compressed format using <strong>8-bit integers</strong> for 4x storage savings.
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Specifications:</h4>
                    <ul className="text-white/70 text-sm space-y-1">
                      <li>• Precision: 8-bit integer (-128 to 127)</li>
                      <li>• Storage: 1 byte × dimensions (75% savings)</li>
                      <li>• Accuracy: 95-98% recall</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Best For:</h4>
                    <ul className="text-white/70 text-sm space-y-1">
                      <li>• Very large datasets (100M+ vectors)</li>
                      <li>• Cost-optimized deployments</li>
                      <li>• Acceptable accuracy tradeoffs</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* binary */}
              <div className="bg-green-500/10 border border-green-400/30 rounded-lg p-6">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <Layers className="w-6 h-6 text-green-400" />
                  binary (Maximum Compression)
                </h3>
                <p className="text-white/80 mb-4">
                  Extreme compression using <strong>1-bit binary</strong> representation for 32x storage savings.
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Specifications:</h4>
                    <ul className="text-white/70 text-sm space-y-1">
                      <li>• Precision: 1-bit (0 or 1)</li>
                      <li>• Storage: 0.125 bytes × dimensions (96.875% savings)</li>
                      <li>• Speed: Fastest similarity calculations</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Best For:</h4>
                    <ul className="text-white/70 text-sm space-y-1">
                      <li>• Massive-scale deployments (1B+ vectors)</li>
                      <li>• Real-time filtering/ranking</li>
                      <li>• Memory-constrained environments</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Decision Matrix */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8 mb-8">
              <h2 className="text-3xl font-bold text-white mb-6">Choosing the Right Type</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-800/60">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-white">Type</th>
                      <th className="px-4 py-3 text-center font-semibold text-white">Storage (768-dim)</th>
                      <th className="px-4 py-3 text-center font-semibold text-white">Accuracy</th>
                      <th className="px-4 py-3 text-center font-semibold text-white">Speed</th>
                      <th className="px-4 py-3 text-left font-semibold text-white">Use Case</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700 bg-slate-800/40">
                    <tr>
                      <td className="px-4 py-3 font-medium text-cyan-300">vector (float32)</td>
                      <td className="px-4 py-3 text-center text-slate-300">3.0 KB</td>
                      <td className="px-4 py-3 text-center text-green-400">100%</td>
                      <td className="px-4 py-3 text-center text-yellow-400">Fast</td>
                      <td className="px-4 py-3 text-slate-300">Development, research, high accuracy</td>
                    </tr>
                    <tr className="bg-slate-800/60">
                      <td className="px-4 py-3 font-medium text-cyan-300">float16</td>
                      <td className="px-4 py-3 text-center text-slate-300">1.5 KB</td>
                      <td className="px-4 py-3 text-center text-green-400">99%+</td>
                      <td className="px-4 py-3 text-center text-green-400">Faster</td>
                      <td className="px-4 py-3 text-slate-300">Production, balanced performance</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-cyan-300">int8</td>
                      <td className="px-4 py-3 text-center text-slate-300">768 bytes</td>
                      <td className="px-4 py-3 text-center text-yellow-400">95-98%</td>
                      <td className="px-4 py-3 text-center text-green-400">Very Fast</td>
                      <td className="px-4 py-3 text-slate-300">Large scale, cost-optimized</td>
                    </tr>
                    <tr className="bg-slate-800/60">
                      <td className="px-4 py-3 font-medium text-cyan-300">binary</td>
                      <td className="px-4 py-3 text-center text-slate-300">96 bytes</td>
                      <td className="px-4 py-3 text-center text-orange-400">85-90%</td>
                      <td className="px-4 py-3 text-center text-green-400">Fastest</td>
                      <td className="px-4 py-3 text-slate-300">Massive scale, filtering</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 bg-blue-500/20 rounded-lg p-4">
                <p className="text-white/80 text-sm">
                  <strong>💡 Recommendation:</strong> Start with <code className="bg-slate-900 px-2 py-1 rounded text-indigo-300">vector (float32)</code> for development. 
                  Switch to <code className="bg-slate-900 px-2 py-1 rounded text-purple-300">float16</code> or <code className="bg-slate-900 px-2 py-1 rounded text-cyan-300">int8</code> in production when you understand your accuracy requirements.
                </p>
              </div>
            </div>

            {/* Code Examples */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8 mb-8">
              <h2 className="text-3xl font-bold text-white mb-6">Code Examples</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Creating Vector Columns</h3>
                  <div className="bg-slate-900/80 rounded-lg p-4">
                    <pre className="text-green-400 font-mono text-sm overflow-x-auto">
{`-- Standard precision
CREATE TABLE docs (id SERIAL, embedding vector(384));

-- Half precision (2x storage savings)
CREATE TABLE docs_half (id SERIAL, embedding float16(384));

-- Quantized (4x storage savings)
CREATE TABLE docs_int8 (id SERIAL, embedding int8(384));

-- Binary (32x storage savings)
CREATE TABLE docs_binary (id SERIAL, embedding binary(384));`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Similarity Search</h3>
                  <div className="bg-slate-900/80 rounded-lg p-4">
                    <pre className="text-green-400 font-mono text-sm overflow-x-auto">
{`-- L2 distance (Euclidean)
SELECT id, embedding <-> '[0.1, 0.2, ...]'::vector AS distance
FROM docs ORDER BY distance LIMIT 10;

-- Cosine similarity
SELECT id, embedding <=> '[0.1, 0.2, ...]'::vector AS similarity
FROM docs ORDER BY similarity DESC LIMIT 10;

-- Inner product
SELECT id, embedding <#> '[0.1, 0.2, ...]'::vector AS score
FROM docs ORDER BY score DESC LIMIT 10;`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-indigo-500/20 backdrop-blur-sm rounded-xl border border-indigo-400/30 p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Next Steps</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link 
                  href="/docs/neurondb/ml/embeddings"
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div>
                    <h3 className="text-white font-semibold mb-1">Understanding Embeddings</h3>
                    <p className="text-white/60 text-sm">Learn how to generate embeddings</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-indigo-400" />
                </Link>
                <Link 
                  href="/docs/neurondb/indexing"
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div>
                    <h3 className="text-white font-semibold mb-1">Indexing Strategies</h3>
                    <p className="text-white/60 text-sm">HNSW and IVF indexing</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-indigo-400" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

