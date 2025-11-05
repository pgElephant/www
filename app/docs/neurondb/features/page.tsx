import React from 'react'
import { Database, Zap, Layers, ArrowRight, CheckCircle2, Code } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Vector Types & Features | NeuronDB Documentation',
  description: 'Comprehensive guide to NeuronDB vector data types, operators, and advanced features for AI workloads',
}

const VectorTypesPage = () => {
  const vectorTypes = [
    {
      name: 'vector',
      description: 'Standard dense vector type',
      dimensions: 'Up to 16,000',
      storage: '4 bytes per dimension (float32)',
      useCases: ['Semantic search', 'Recommendation systems', 'Image similarity']
    },
    {
      name: 'halfvec',
      description: 'Half-precision vector (float16)',
      dimensions: 'Up to 16,000',
      storage: '2 bytes per dimension',
      useCases: ['Memory-constrained environments', 'Mobile deployment', 'Edge computing']
    },
    {
      name: 'sparsevec',
      description: 'Sparse vector representation',
      dimensions: 'Up to 1,000,000',
      storage: 'Only non-zero values stored',
      useCases: ['High-dimensional text', 'Categorical embeddings', 'TF-IDF vectors']
    },
    {
      name: 'bit',
      description: 'Binary vector (bit-packed)',
      dimensions: 'Up to 64,000',
      storage: '1 bit per dimension',
      useCases: ['Hamming distance', 'Binary embeddings', 'Fingerprinting']
    }
  ]

  const operators = [
    {
      category: 'Distance Functions',
      items: [
        { operator: '<->', name: 'L2 Distance', description: 'Euclidean distance (most common)' },
        { operator: '<#>', name: 'Inner Product', description: 'Negative inner product' },
        { operator: '<=>', name: 'Cosine Distance', description: '1 - cosine similarity' },
        { operator: '<+>', name: 'L1 Distance', description: 'Manhattan distance' },
        { operator: '<%>', name: 'Hamming Distance', description: 'Binary vector distance' }
      ]
    },
    {
      category: 'Vector Operations',
      items: [
        { operator: '+', name: 'Addition', description: 'Element-wise vector addition' },
        { operator: '-', name: 'Subtraction', description: 'Element-wise vector subtraction' },
        { operator: '*', name: 'Scalar Multiply', description: 'Multiply vector by scalar' },
        { operator: '||', name: 'Concatenation', description: 'Combine vectors' }
      ]
    },
    {
      category: 'Comparison',
      items: [
        { operator: '=', name: 'Equals', description: 'Exact vector equality' },
        { operator: '<>', name: 'Not Equals', description: 'Vector inequality' },
        { operator: '@>', name: 'Contains', description: 'Subvector check' }
      ]
    }
  ]

  const indexTypes = [
    {
      name: 'IVFFlat',
      description: 'Inverted File with Flat Compression',
      bestFor: 'Large datasets (1M+ vectors)',
      recall: '~95-99%',
      buildTime: 'Fast',
      queryTime: 'Fast'
    },
    {
      name: 'HNSW',
      description: 'Hierarchical Navigable Small World',
      bestFor: 'High recall requirements',
      recall: '~98-99.9%',
      buildTime: 'Moderate',
      queryTime: 'Very Fast'
    },
    {
      name: 'LSH',
      description: 'Locality Sensitive Hashing',
      bestFor: 'Approximate search at scale',
      recall: '~90-95%',
      buildTime: 'Very Fast',
      queryTime: 'Very Fast'
    }
  ]

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'GPU Acceleration',
      description: 'CUDA and ROCm support for vector operations',
      link: '/docs/neurondb/gpu'
    },
    {
      icon: <Layers className="w-6 h-6" />,
      title: 'Hybrid Search',
      description: 'Combine semantic and full-text search',
      link: '/docs/neurondb/hybrid'
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: 'Vector Indexing',
      description: 'Multiple index types for optimal performance',
      link: '/docs/neurondb/indexing'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-6 py-16 max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <Link 
            href="/docs/neurondb" 
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-6 transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to NeuronDB Documentation
          </Link>
          
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Vector Types & Features
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed">
            NeuronDB provides comprehensive vector data types and operations for AI/ML workloads. 
            Support for dense, sparse, binary vectors with GPU acceleration.
          </p>
        </div>

        {/* Vector Types */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Database className="w-8 h-8 text-purple-400" />
            Vector Data Types
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {vectorTypes.map((type, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30 hover:border-purple-400/50 transition-all hover:shadow-lg hover:shadow-purple-500/20"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold text-purple-300">
                    {type.name}
                  </h3>
                  <span className="text-xs px-3 py-1 bg-purple-500/20 rounded-full border border-purple-400/30">
                    {type.dimensions}
                  </span>
                </div>
                
                <p className="text-slate-300 mb-4">{type.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    Storage: {type.storage}
                  </div>
                </div>
                
                <div className="pt-4 border-t border-white/10">
                  <p className="text-sm text-slate-400 mb-2">Common Use Cases:</p>
                  <div className="flex flex-wrap gap-2">
                    {type.useCases.map((useCase, i) => (
                      <span 
                        key={i}
                        className="text-xs px-2 py-1 bg-cyan-500/10 text-cyan-300 rounded border border-cyan-400/30"
                      >
                        {useCase}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Vector Operators */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Code className="w-8 h-8 text-cyan-400" />
            Vector Operators
          </h2>
          
          <div className="space-y-8">
            {operators.map((category, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-cyan-400/30">
                <h3 className="text-xl font-bold text-cyan-300 mb-4">{category.category}</h3>
                
                <div className="space-y-3">
                  {category.items.map((item, i) => (
                    <div 
                      key={i}
                      className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-400/30 transition-all"
                    >
                      <pre className="text-sm overflow-x-auto"><code className="text-lg font-mono text-pink-400 bg-slate-900/50 px-3 py-1 rounded min-w-[60px] text-center">
                        {item.operator}
                      </code></pre>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white mb-1">{item.name}</h4>
                        <p className="text-sm text-slate-400">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Index Types */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Layers className="w-8 h-8 text-green-400" />
            Vector Index Types
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {indexTypes.map((index, i) => (
              <div 
                key={i}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-green-400/30 hover:border-green-400/50 transition-all hover:shadow-lg hover:shadow-green-500/20"
              >
                <h3 className="text-xl font-bold text-green-300 mb-3">{index.name}</h3>
                <p className="text-sm text-slate-300 mb-4">{index.description}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Best For:</span>
                    <span className="text-white">{index.bestFor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Recall:</span>
                    <span className="text-green-400 font-semibold">{index.recall}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Build Time:</span>
                    <span className="text-white">{index.buildTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Query Time:</span>
                    <span className="text-white">{index.queryTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Advanced Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Advanced Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Link
                key={index}
                href={feature.link}
                className="group bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30 hover:border-purple-400/50 transition-all hover:shadow-lg hover:shadow-purple-500/20"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center mb-4 border border-purple-400/30 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-400 mb-4">{feature.description}</p>
                <div className="flex items-center gap-2 text-purple-400 group-hover:text-purple-300 font-semibold">
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Example Usage */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Example Usage</h2>
          
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30">
            <pre className="text-sm overflow-x-auto"><code className="text-green-400">{`
-- Create table with vector column
CREATE TABLE embeddings (
  id SERIAL PRIMARY KEY,
  content TEXT,
  embedding vector(1536)  -- OpenAI ada-002 dimension
);

-- Insert vectors
INSERT INTO embeddings (content, embedding) VALUES
  ('AI and machine learning', '[0.1, 0.2, ...]'),
  ('Database systems', '[0.3, 0.4, ...]');

-- Create HNSW index for fast similarity search
CREATE INDEX ON embeddings USING hnsw (embedding vector_cosine_ops);

-- Find similar embeddings
SELECT content, embedding <=> '[0.15, 0.25, ...]'::vector AS distance
FROM embeddings
ORDER BY embedding <=> '[0.15, 0.25, ...]'::vector
LIMIT 5;

-- Vector operations
SELECT embedding + '[0.1, 0.1, ...]'::vector FROM embeddings LIMIT 1;
SELECT embedding * 2.0 FROM embeddings LIMIT 1;
SELECT embedding || '[0.5]'::vector FROM embeddings LIMIT 1;`}</code></pre>
          </div>
        </section>

        {/* Related Documentation */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Related Documentation</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/docs/neurondb/features/vector-types"
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-purple-400/50 transition-all group"
            >
              <span className="font-semibold">Detailed Vector Types Guide</span>
              <ArrowRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="/docs/neurondb/indexing"
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-purple-400/50 transition-all group"
            >
              <span className="font-semibold">Vector Indexing Deep Dive</span>
              <ArrowRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="/docs/neurondb/performance"
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-purple-400/50 transition-all group"
            >
              <span className="font-semibold">Performance Optimization</span>
              <ArrowRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="/docs/neurondb/gpu"
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-purple-400/50 transition-all group"
            >
              <span className="font-semibold">GPU Acceleration Guide</span>
              <ArrowRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

export default VectorTypesPage
