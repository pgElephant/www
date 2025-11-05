import React from 'react'
import { Brain, Sparkles, Cpu, ArrowRight, CheckCircle2, Code, Zap, Database } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Machine Learning & Embeddings | NeuronDB Documentation',
  description: 'Complete guide to ML inference and embedding generation in NeuronDB with support for multiple models and frameworks',
}

const MLPage = () => {
  const mlCapabilities = [
    {
      icon: <Brain className="w-8 h-8 text-purple-400" />,
      title: 'In-Database ML Inference',
      description: 'Run ML models directly inside PostgreSQL',
      features: [
        'Zero data movement - models run where data lives',
        'Batch inference for high throughput',
        'Real-time predictions with low latency',
        'Automatic GPU acceleration when available'
      ]
    },
    {
      icon: <Sparkles className="w-8 h-8 text-cyan-400" />,
      title: 'Embedding Generation',
      description: 'Generate embeddings from text, images, and more',
      features: [
        'OpenAI, Cohere, HuggingFace model support',
        'Custom model deployment',
        'Automatic batching and caching',
        'Multi-modal embeddings (text, image, audio)'
      ]
    },
    {
      icon: <Cpu className="w-8 h-8 text-green-400" />,
      title: 'Model Management',
      description: 'Deploy and manage ML models efficiently',
      features: [
        'Model versioning and rollback',
        'A/B testing support',
        'Resource quota management',
        'Performance monitoring'
      ]
    }
  ]

  const supportedModels = [
    {
      category: 'Text Embeddings',
      models: [
        { name: 'text-embedding-ada-002', provider: 'OpenAI', dimensions: '1536', bestFor: 'General text similarity' },
        { name: 'text-embedding-3-small', provider: 'OpenAI', dimensions: '1536', bestFor: 'Efficient embeddings' },
        { name: 'text-embedding-3-large', provider: 'OpenAI', dimensions: '3072', bestFor: 'High quality embeddings' },
        { name: 'embed-english-v3.0', provider: 'Cohere', dimensions: '1024', bestFor: 'English text' },
        { name: 'embed-multilingual-v3.0', provider: 'Cohere', dimensions: '1024', bestFor: 'Multilingual text' }
      ]
    },
    {
      category: 'Sentence Transformers',
      models: [
        { name: 'all-MiniLM-L6-v2', provider: 'HuggingFace', dimensions: '384', bestFor: 'Fast, lightweight' },
        { name: 'all-mpnet-base-v2', provider: 'HuggingFace', dimensions: '768', bestFor: 'High quality' },
        { name: 'paraphrase-multilingual-MiniLM', provider: 'HuggingFace', dimensions: '384', bestFor: '50+ languages' }
      ]
    },
    {
      category: 'Multimodal',
      models: [
        { name: 'CLIP-ViT-B-32', provider: 'OpenAI', dimensions: '512', bestFor: 'Image + text' },
        { name: 'CLIP-ViT-L-14', provider: 'OpenAI', dimensions: '768', bestFor: 'High quality image search' }
      ]
    }
  ]

  const mlFunctions = [
    {
      name: 'neuron_generate_embedding()',
      description: 'Generate embeddings from text',
      signature: 'neuron_generate_embedding(text TEXT, model TEXT DEFAULT \'ada-002\') RETURNS vector',
      example: `SELECT neuron_generate_embedding('Machine learning with PostgreSQL');`
    },
    {
      name: 'neuron_batch_embed()',
      description: 'Generate embeddings for multiple texts efficiently',
      signature: 'neuron_batch_embed(texts TEXT[], model TEXT) RETURNS vector[]',
      example: `SELECT neuron_batch_embed(ARRAY['text1', 'text2'], 'ada-002');`
    },
    {
      name: 'neuron_predict()',
      description: 'Run ML inference with custom models',
      signature: 'neuron_predict(model_name TEXT, input JSONB) RETURNS JSONB',
      example: `SELECT neuron_predict('sentiment-model', '{"text": "Great product!"}'::jsonb);`
    },
    {
      name: 'neuron_load_model()',
      description: 'Load custom ML model into database',
      signature: 'neuron_load_model(name TEXT, path TEXT, config JSONB) RETURNS BOOLEAN',
      example: `SELECT neuron_load_model('custom-model', '/path/to/model', '{"device": "cuda"}'::jsonb);`
    }
  ]

  const workflowSteps = [
    {
      step: 1,
      title: 'Configure API Keys',
      description: 'Set up access to embedding providers',
      code: `-- Set OpenAI API key
ALTER SYSTEM SET neurondb.openai_api_key = 'sk-...';

-- Set Cohere API key  
ALTER SYSTEM SET neurondb.cohere_api_key = 'co-...';

-- Reload configuration
SELECT pg_reload_conf();`
    },
    {
      step: 2,
      title: 'Generate Embeddings',
      description: 'Create embeddings for your data',
      code: `-- Add embedding column
ALTER TABLE documents ADD COLUMN embedding vector(1536);

-- Generate embeddings
UPDATE documents 
SET embedding = neuron_generate_embedding(content, 'ada-002')
WHERE embedding IS NULL;`
    },
    {
      step: 3,
      title: 'Create Vector Index',
      description: 'Index embeddings for fast similarity search',
      code: `-- Create HNSW index
CREATE INDEX ON documents 
USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);`
    },
    {
      step: 4,
      title: 'Semantic Search',
      description: 'Query using natural language',
      code: `-- Search similar documents
WITH query AS (
  SELECT neuron_generate_embedding('PostgreSQL AI features') AS q_emb
)
SELECT d.title, d.content, 
       d.embedding <=> q.q_emb AS similarity
FROM documents d, query q
ORDER BY d.embedding <=> q.q_emb
LIMIT 10;`
    }
  ]

  const advancedFeatures = [
    {
      title: 'Automatic Retry & Fallback',
      description: 'Built-in retry logic and fallback models for API failures',
      icon: <Zap className="w-6 h-6 text-yellow-400" />
    },
    {
      title: 'Embedding Cache',
      description: 'Smart caching to reduce API costs and improve performance',
      icon: <Database className="w-6 h-6 text-blue-400" />
    },
    {
      title: 'Batch Processing',
      description: 'Automatic batching of requests for optimal throughput',
      icon: <Cpu className="w-6 h-6 text-green-400" />
    },
    {
      title: 'Custom Models',
      description: 'Deploy your own ONNX, TensorFlow, or PyTorch models',
      icon: <Brain className="w-6 h-6 text-purple-400" />
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
          
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
            Machine Learning & Embeddings
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed">
            Run ML models directly in PostgreSQL. Generate embeddings, perform inference, 
            and build AI applications without moving data out of your database.
          </p>
        </div>

        {/* ML Capabilities */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">ML Capabilities</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mlCapabilities.map((capability, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30 hover:border-purple-400/50 transition-all hover:shadow-lg hover:shadow-purple-500/20"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center mb-4 border border-purple-400/30">
                  {capability.icon}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">
                  {capability.title}
                </h3>
                <p className="text-slate-400 mb-4">{capability.description}</p>
                
                <ul className="space-y-2">
                  {capability.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Supported Models */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Supported Models</h2>
          
          <div className="space-y-8">
            {supportedModels.map((category, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-cyan-400/30">
                <h3 className="text-xl font-bold text-cyan-300 mb-4">{category.category}</h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-300">Model</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-300">Provider</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-300">Dimensions</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-300">Best For</th>
                      </tr>
                    </thead>
                    <tbody>
                      {category.models.map((model, i) => (
                        <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="py-3 px-4">
                            <pre className="text-sm overflow-x-auto"><code className="text-sm text-purple-300 bg-slate-900/50 px-2 py-1 rounded">
                              {model.name}
                            </code></pre>
                          </td>
                          <td className="py-3 px-4 text-sm text-slate-300">{model.provider}</td>
                          <td className="py-3 px-4 text-sm text-cyan-400 font-semibold">{model.dimensions}</td>
                          <td className="py-3 px-4 text-sm text-slate-400">{model.bestFor}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SQL Functions */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Code className="w-8 h-8 text-green-400" />
            SQL Functions
          </h2>
          
          <div className="space-y-4">
            {mlFunctions.map((func, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-green-400/30 hover:border-green-400/50 transition-all"
              >
                <h3 className="text-lg font-bold text-green-300 mb-2">
                  {func.name}
                </h3>
                <p className="text-slate-300 mb-3">{func.description}</p>
                
                <div className="bg-slate-900/50 rounded-lg p-4 mb-3">
                  <pre className="text-sm overflow-x-auto"><code className="text-sm text-cyan-400">{func.signature}</code></pre>
                </div>
                
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <p className="text-xs text-slate-400 mb-2">Example:</p>
                  <pre className="text-sm overflow-x-auto"><code className="text-sm text-green-400">{func.example}</code></pre>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Complete Workflow */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Complete Workflow</h2>
          
          <div className="space-y-6">
            {workflowSteps.map((step, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">{step.title}</h3>
                    <p className="text-slate-400">{step.description}</p>
                  </div>
                </div>
                
                <div className="bg-slate-900/50 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm overflow-x-auto"><code className="text-green-400">{step.code}</code></pre>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Advanced Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Advanced Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {advancedFeatures.map((feature, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30 hover:border-purple-400/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0 border border-purple-400/30">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-slate-400 text-sm">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Configuration Example */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Configuration</h2>
          
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30">
            <pre className="text-sm overflow-x-auto"><code className="text-green-400">{`
-- PostgreSQL configuration (postgresql.conf)
neurondb.ml_workers = 4                    # Number of ML worker processes
neurondb.embedding_cache_size = '1GB'      # Cache for embeddings
neurondb.model_memory_limit = '4GB'        # Max memory per model
neurondb.gpu_enabled = on                  # Enable GPU acceleration

-- API Configuration
neurondb.openai_api_key = 'sk-...'        # OpenAI API key
neurondb.cohere_api_key = 'co-...'        # Cohere API key
neurondb.huggingface_token = 'hf_...'     # HuggingFace token

-- Performance Tuning
neurondb.batch_size = 100                  # Embedding batch size
neurondb.request_timeout = 30              # API timeout (seconds)
neurondb.max_retries = 3                   # Retry failed requests
neurondb.cache_ttl = 86400                 # Cache TTL (seconds)`}</code></pre>
          </div>
        </section>

        {/* Related Documentation */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Related Documentation</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/docs/neurondb/ml/embeddings"
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-purple-400/50 transition-all group"
            >
              <span className="font-semibold">Detailed Embeddings Guide</span>
              <ArrowRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="/docs/neurondb/rag"
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-purple-400/50 transition-all group"
            >
              <span className="font-semibold">RAG Pipeline Guide</span>
              <ArrowRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="/docs/neurondb/hybrid"
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-purple-400/50 transition-all group"
            >
              <span className="font-semibold">Hybrid Search</span>
              <ArrowRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="/docs/neurondb/gpu"
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-purple-400/50 transition-all group"
            >
              <span className="font-semibold">GPU Acceleration</span>
              <ArrowRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

export default MLPage
