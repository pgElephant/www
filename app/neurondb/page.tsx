import React from 'react';
import Link from 'next/link';
import ProductPageTemplate from '@/components/templates/ProductPageTemplate';
import NeurondBDemoTerminal from '@/components/NeurondBDemoTerminal';
import NeuronDBArchitectureDiagram from '@/components/NeuronDBArchitectureDiagram';
import { generateProductPageMetadata } from '@/config/seo';
import { Server, Bot, Database } from 'lucide-react';

export const metadata = generateProductPageMetadata('neurondb');

const neurondbConfig = {
  productId: 'neurondb' as const,
  hero: {
    subtitle: 'Production-grade vector search with 52 ML algorithms, 473 SQL functions, GPU acceleration, and complete RAG pipeline, all within PostgreSQL',
  },
  demo: <NeurondBDemoTerminal />,
  badges: [
    'PostgreSQL 16-18',
    '5 Vector Types',
    '52 ML Algorithms',
    '473 SQL Functions',
    'GPU Acceleration',
    '4 Background Workers',
  ],
  componentCards: [
    {
      title: 'NeuronDB',
      description: [
        'Vector search with HNSW and IVF indexing, supporting 5 vector types and 10+ distance metrics.',
        '52 ML algorithms implemented in pure C: Random Forest, XGBoost, LightGBM, CatBoost, SVM, KNN, and more.',
        'RAG pipeline with document processing, semantic retrieval, reranking, and LLM integration.',
        'GPU acceleration for CUDA (NVIDIA), ROCm (AMD), and Metal (Apple Silicon) with automatic detection.',
        '473 SQL functions with hybrid search, background workers, and security features.',
      ],
      href: '/docs/neurondb/getting-started',
      icon: <Database className="w-8 h-8 text-cyan-400" />,
    },
    {
      title: 'NeuronAgent',
      description: [
        'REST API and WebSocket agent runtime system with long-term memory and tool execution.',
        'Agent state machine with HNSW-based vector search for context retrieval and memory management.',
        'Tool registry supporting SQL, HTTP, Code, and Shell operations with streaming responses.',
        'Background jobs with API key authentication, crash recovery, and SKIP LOCKED processing.',
        'Integration with NeuronDB for embeddings, LLM operations, and vector search.',
      ],
      href: '/docs/neurondb/neuronagent',
      icon: <Bot className="w-8 h-8 text-cyan-400" />,
    },
    {
      title: 'NeuronMCP',
      description: [
        'Model Context Protocol server enabling MCP-compatible clients (like Claude Desktop) to access NeuronDB.',
        'JSON-RPC 2.0 implementation with stdio communication protocol and resource management.',
        'Tools for vector search, embedding generation, model training, and database schema management.',
        'Middleware support for custom integrations and tool architecture.',
        'MCP server with structured logging and error handling.',
      ],
      href: '/docs/neurondb/neuronmcp',
      icon: <Server className="w-8 h-8 text-cyan-400" />,
    },
  ],
  architecture: {
    title: 'Architecture',
    subtitle: 'Complete AI database architecture with vector search, ML inference, and RAG pipeline',
    content: <NeuronDBArchitectureDiagram />,
  },
  featurePillars: {
    kicker: 'Comprehensive AI Database Features',
    items: [
      { 
        title: 'Vector Search & Indexing', 
        desc: '5 production-grade vector types: vector (float32), vectorp (packed), vecmap (sparse map), vgraph (graph-based), rtext (retrieval text). HNSW and IVF indexing with automatic tuning. Multiple distance metrics: L2 (Euclidean), Cosine, Inner Product, Manhattan, Hamming, Jaccard. Product Quantization (PQ) and Optimized PQ (OPQ) for 2x-32x compression.' 
      },
      { 
        title: 'ML & Embeddings', 
        desc: '52 ML algorithms implemented in pure C: Random Forest, XGBoost, LightGBM, CatBoost, Linear/Logistic Regression, Ridge, Lasso, SVM, KNN, Naive Bayes, Decision Trees, Neural Networks, Deep Learning. Built-in embedding generation with caching. ONNX runtime integration. Batch processing with GPU acceleration. Model catalog and versioning.' 
      },
      { 
        title: 'Hybrid Search & Retrieval', 
        desc: 'Combine vector similarity with full-text search (BM25). Weighted scoring (70% vector + 30% text). Multi-vector documents. Faceted search with category filters. Temporal decay for time-sensitive relevance. Optimal for real-world search scenarios.' 
      },
      { 
        title: 'Advanced Reranking', 
        desc: 'Cross-encoder neural reranking for precision improvement. LLM-powered scoring (GPT-4, Claude). ColBERT late interaction models. MMR (Maximal Marginal Relevance) for diversity. Ensemble strategies combining multiple rankers. Sub-10ms latency.' 
      },
      { 
        title: 'Complete RAG Pipeline', 
        desc: 'End-to-end Retrieval Augmented Generation in PostgreSQL. Document chunking and processing. Semantic retrieval with reranking. LLM integration for answer generation. Context management. Guardrails for content safety. Production-ready RAG in SQL.' 
      },
      { 
        title: 'Background Workers', 
        desc: '4 production workers: neuranq (async job queue executor with SKIP LOCKED, retries, poison handling, batch processing), neuranmon (live query auto-tuner for search params, cache rotation, recall@k tracking), neurandefrag (automatic index maintenance, compaction, tombstone pruning, rebuild scheduling), neuranllm (LLM job processing with crash recovery). All tenant-aware with QPS/cost budgets.' 
      },
      { 
        title: 'ML Analytics Suite', 
        desc: 'Comprehensive analytics: K-means, Mini-batch K-means, DBSCAN, GMM, Hierarchical clustering (all GPU-accelerated). Dimensionality reduction: PCA, PCA Whitening, OPQ. Outlier detection: Z-score, Modified Z-score, IQR, Isolation Forest. Quality metrics: Davies-Bouldin Index, Recall@K, Precision@K, F1@K, MRR. Drift detection with temporal monitoring. Topic discovery and modeling.' 
      },
      { 
        title: 'GPU Acceleration', 
        desc: 'Full GPU support: CUDA (NVIDIA), ROCm (AMD), Metal (Apple Silicon). GPU-accelerated ML algorithms: Random Forest, XGBoost, LightGBM, Linear/Logistic Regression, SVM, KNN, Decision Trees, Naive Bayes, GMM, K-means. Batch distance computation (100x speedup). Automatic GPU detection with CPU fallback. Multi-stream compute overlap. Production-ready with memory management.' 
      },
      { 
        title: 'Performance & Optimization', 
        desc: 'SIMD-optimized distance calculations (AVX2, AVX-512, NEON). Intelligent query planning with cost estimates. ANN buffer cache for hot centroids. WAL compression with delta encoding. Parallel kNN execution. Predictive prefetching. Sub-millisecond searches on millions of vectors.' 
      },
      { 
        title: 'Enterprise Security', 
        desc: 'Vector encryption (AES-GCM via OpenSSL). Differential privacy for embeddings. Row-level security (RLS) integration. Multi-tenant isolation. HMAC-SHA256 signed results. Audit logging with tamper detection. Usage metering and governance policies. GDPR-compliant data handling.' 
      },
      { 
        title: 'Monitoring & Observability', 
        desc: 'pg_stat_neurondb view with real-time metrics. Worker heartbeats and watchdog. Query latency histograms. Cache hit rate tracking. Recall@K monitoring. Model cost accounting. Prometheus exporter ready. Structured JSON logging with neurondb: prefix.' 
      },
      { 
        title: 'PostgreSQL Native Architecture', 
        desc: 'Pure C implementation following 100% PostgreSQL coding standards. 144 source files + 64 headers, zero compiler warnings. PGXS build system. 473 SQL functions/types/operators. Shared memory for caching. WAL integration for durability. SPI for safe operations. Background worker framework. Standard extension, zero external dependencies, no core modifications.' 
      },
      { 
        title: 'NeuronAgent: AI Agent Runtime', 
        desc: 'REST API and WebSocket agent runtime system with long-term memory, tool execution, and streaming responses. Features agent state machine, HNSW-based vector search for context retrieval, extensible tool registry (SQL, HTTP, Code, Shell), background jobs, and API key authentication. Integrates seamlessly with NeuronDB for embeddings and LLM operations.' 
      },
      { 
        title: 'NeuronMCP: Model Context Protocol Server', 
        desc: 'MCP server enabling MCP-compatible clients (like Claude Desktop) to access NeuronDB through stdio communication. Full JSON-RPC 2.0 implementation with vector operations, ML tools, resource management, and middleware support. Provides tools for vector search, embedding generation, model training, and database schema management.' 
      },
    ],
  },
  featureMatrix: {
    title: 'Production Capabilities',
    subtitle: 'Comprehensive AI database features built for enterprise production workloads',
    content: (
    <table className="w-full text-sm border border-slate-700 rounded-lg overflow-hidden">
      <thead className="bg-slate-800/60">
        <tr className="text-left">
          <th className="px-4 py-3 font-semibold text-white">Capability</th>
          <th className="px-4 py-3 font-semibold text-white">Description</th>
          <th className="px-4 py-3 font-semibold text-white">Performance</th>
          <th className="px-4 py-3 font-semibold text-white">Production Ready</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-700 bg-slate-800/40">
        <tr>
            <td className="px-4 py-3 font-medium">
              <Link href="/docs/neurondb/vector-engine" className="text-cyan-300 hover:text-cyan-200 hover:underline transition-colors">
                Vector Search
              </Link>
            </td>
          <td className="px-4 py-3 text-slate-300">HNSW indexing, multiple distance metrics, quantization</td>
          <td className="px-4 py-3 text-slate-300">Sub-millisecond on millions</td>
          <td className="px-4 py-3 text-green-400">✓</td>
        </tr>
        <tr className="bg-slate-800/60">
            <td className="px-4 py-3 font-medium">
              <Link href="/docs/neurondb/ml/inference" className="text-cyan-300 hover:text-cyan-200 hover:underline transition-colors">
                ML Inference
              </Link>
            </td>
          <td className="px-4 py-3 text-slate-300">ONNX runtime, batch processing, embedding generation</td>
          <td className="px-4 py-3 text-slate-300">High-throughput batch ops</td>
          <td className="px-4 py-3 text-green-400">✓</td>
        </tr>
        <tr>
            <td className="px-4 py-3 font-medium">
              <Link href="/docs/neurondb/hybrid" className="text-cyan-300 hover:text-cyan-200 hover:underline transition-colors">
                Hybrid Search
              </Link>
            </td>
          <td className="px-4 py-3 text-slate-300">Vector + FTS, multi-vector, faceted, temporal</td>
          <td className="px-4 py-3 text-slate-300">Optimized query planning</td>
          <td className="px-4 py-3 text-green-400">✓</td>
        </tr>
        <tr className="bg-slate-800/60">
            <td className="px-4 py-3 font-medium">
              <Link href="/docs/neurondb/reranking/overview" className="text-cyan-300 hover:text-cyan-200 hover:underline transition-colors">
                Reranking
              </Link>
            </td>
          <td className="px-4 py-3 text-slate-300">Cross-encoder, LLM, ColBERT, ensemble</td>
          <td className="px-4 py-3 text-slate-300">GPU-accelerated support</td>
          <td className="px-4 py-3 text-green-400">✓</td>
        </tr>
        <tr>
            <td className="px-4 py-3 font-medium">
              <Link href="/docs/neurondb/background-workers" className="text-cyan-300 hover:text-cyan-200 hover:underline transition-colors">
                Background Workers
              </Link>
            </td>
          <td className="px-4 py-3 text-slate-300">Queue executor, auto-tuner, index maintenance</td>
          <td className="px-4 py-3 text-slate-300">Non-blocking async ops</td>
          <td className="px-4 py-3 text-green-400">✓</td>
        </tr>
        <tr className="bg-slate-800/60">
            <td className="px-4 py-3 font-medium">
              <Link href="/docs/neurondb/rag" className="text-cyan-300 hover:text-cyan-200 hover:underline transition-colors">
                RAG Pipeline
              </Link>
            </td>
          <td className="px-4 py-3 text-slate-300">Complete in-database RAG with document processing</td>
          <td className="px-4 py-3 text-slate-300">End-to-end optimization</td>
          <td className="px-4 py-3 text-green-400">✓</td>
        </tr>
          <tr>
            <td className="px-4 py-3 font-medium">
              <Link href="/docs/neurondb/analytics" className="text-cyan-300 hover:text-cyan-200 hover:underline transition-colors">
                ML Analytics
              </Link>
            </td>
            <td className="px-4 py-3 text-slate-300">Clustering (K-means, DBSCAN, GMM), PCA, outlier detection, quality metrics, drift detection</td>
            <td className="px-4 py-3 text-slate-300">GPU-accelerated algorithms</td>
            <td className="px-4 py-3 text-green-400">✓</td>
          </tr>
          <tr className="bg-slate-800/60">
            <td className="px-4 py-3 font-medium">
              <Link href="/docs/neurondb/gpu" className="text-cyan-300 hover:text-cyan-200 hover:underline transition-colors">
                GPU Acceleration
              </Link>
            </td>
            <td className="px-4 py-3 text-slate-300">CUDA (NVIDIA), ROCm (AMD), Metal (Apple), 100x speedup on batch ops</td>
            <td className="px-4 py-3 text-slate-300">Auto-detection with CPU fallback</td>
            <td className="px-4 py-3 text-green-400">✓</td>
          </tr>
          <tr>
            <td className="px-4 py-3 font-medium">
              <Link href="/docs/neurondb/performance" className="text-cyan-300 hover:text-cyan-200 hover:underline transition-colors">
                Performance Optimization
              </Link>
            </td>
            <td className="px-4 py-3 text-slate-300">SIMD (AVX2/AVX-512/NEON), intelligent query planning, ANN cache, WAL compression</td>
            <td className="px-4 py-3 text-slate-300">Predictive prefetching</td>
            <td className="px-4 py-3 text-green-400">✓</td>
          </tr>
          <tr className="bg-slate-800/60">
            <td className="px-4 py-3 font-medium">
              <Link href="/docs/neurondb/security" className="text-cyan-300 hover:text-cyan-200 hover:underline transition-colors">
                Enterprise Security
              </Link>
            </td>
            <td className="px-4 py-3 text-slate-300">Vector encryption (AES-GCM), differential privacy, RLS integration, multi-tenant isolation</td>
            <td className="px-4 py-3 text-slate-300">GDPR-compliant</td>
            <td className="px-4 py-3 text-green-400">✓</td>
          </tr>
          <tr>
            <td className="px-4 py-3 font-medium">
              <Link href="/docs/neurondb/performance/monitoring" className="text-cyan-300 hover:text-cyan-200 hover:underline transition-colors">
                Monitoring & Observability
              </Link>
            </td>
            <td className="px-4 py-3 text-slate-300">pg_stat_neurondb view, worker heartbeats, latency histograms, Prometheus exporter</td>
            <td className="px-4 py-3 text-slate-300">Real-time metrics</td>
            <td className="px-4 py-3 text-green-400">✓</td>
          </tr>
          <tr className="bg-slate-800/60">
            <td className="px-4 py-3 font-medium">
              <Link href="/docs/neurondb/getting-started" className="text-cyan-300 hover:text-cyan-200 hover:underline transition-colors">
                PostgreSQL Native
              </Link>
            </td>
            <td className="px-4 py-3 text-slate-300">Pure C implementation, 473 SQL functions, zero external dependencies, WAL integration</td>
            <td className="px-4 py-3 text-slate-300">Zero core modifications</td>
          <td className="px-4 py-3 text-green-400">✓</td>
        </tr>
          <tr>
            <td className="px-4 py-3 font-medium">
              <Link href="/docs/neurondb/neuronagent" className="text-cyan-300 hover:text-cyan-200 hover:underline transition-colors">
                NeuronAgent
              </Link>
            </td>
            <td className="px-4 py-3 text-slate-300">REST API and WebSocket agent runtime with long-term memory, tool execution, and streaming responses</td>
            <td className="px-4 py-3 text-slate-300">HNSW-based context retrieval</td>
            <td className="px-4 py-3 text-green-400">✓</td>
          </tr>
          <tr className="bg-slate-800/60">
            <td className="px-4 py-3 font-medium">
              <Link href="/docs/neurondb/neuronmcp" className="text-cyan-300 hover:text-cyan-200 hover:underline transition-colors">
                NeuronMCP
              </Link>
            </td>
            <td className="px-4 py-3 text-slate-300">Model Context Protocol server enabling MCP-compatible clients to access NeuronDB via stdio</td>
            <td className="px-4 py-3 text-slate-300">JSON-RPC 2.0 implementation</td>
            <td className="px-4 py-3 text-green-400">✓</td>
          </tr>
      </tbody>
    </table>
  ),
  },
  featureComparison: {
    title: 'NeurondB vs. Alternatives',
    subtitle: 'Comprehensive comparison of NeurondB with other PostgreSQL AI and vector extensions',
    content: (
    <table className="w-full text-sm border border-slate-700 rounded-lg overflow-hidden">
      <thead className="bg-slate-800/60">
        <tr className="text-left">
          <th className="px-3 py-3 font-semibold text-white text-xs">Feature</th>
          <th className="px-3 py-3 font-semibold text-white text-xs">NeurondB</th>
          <th className="px-3 py-3 font-semibold text-white text-xs">pgvector</th>
          <th className="px-3 py-3 font-semibold text-white text-xs">pgvectorscale</th>
          <th className="px-3 py-3 font-semibold text-white text-xs">pgai</th>
          <th className="px-3 py-3 font-semibold text-white text-xs">PostgresML</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-700 bg-slate-800/40">
        <tr>
          <td className="px-3 py-3 font-medium text-cyan-300 text-xs">Vector Indexing</td>
          <td className="px-3 py-3 text-green-400 text-xs">HNSW + IVF</td>
          <td className="px-3 py-3 text-green-400 text-xs">HNSW + IVF</td>
          <td className="px-3 py-3 text-green-400 text-xs">StreamingDiskANN</td>
          <td className="px-3 py-3 text-red-300 text-xs">Uses pgvector</td>
          <td className="px-3 py-3 text-yellow-300 text-xs">pgvector-based</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-3 py-3 font-medium text-cyan-300 text-xs">ML Inference</td>
          <td className="px-3 py-3 text-green-400 text-xs">ONNX (C++)</td>
          <td className="px-3 py-3 text-red-300 text-xs">None</td>
          <td className="px-3 py-3 text-red-300 text-xs">None</td>
          <td className="px-3 py-3 text-green-400 text-xs">API calls</td>
          <td className="px-3 py-3 text-green-400 text-xs">Python ML libs</td>
        </tr>
        <tr>
          <td className="px-3 py-3 font-medium text-cyan-300 text-xs">Embedding Generation</td>
          <td className="px-3 py-3 text-green-400 text-xs">In-database (ONNX)</td>
          <td className="px-3 py-3 text-red-300 text-xs">External</td>
          <td className="px-3 py-3 text-red-300 text-xs">External</td>
          <td className="px-3 py-3 text-yellow-300 text-xs">External API</td>
          <td className="px-3 py-3 text-green-400 text-xs">In-database (Transformers)</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-3 py-3 font-medium text-cyan-300 text-xs">Hybrid Search</td>
          <td className="px-3 py-3 text-green-400 text-xs">Native (Vector+FTS)</td>
          <td className="px-3 py-3 text-yellow-300 text-xs">Manual</td>
          <td className="px-3 py-3 text-yellow-300 text-xs">Manual</td>
          <td className="px-3 py-3 text-yellow-300 text-xs">Manual</td>
          <td className="px-3 py-3 text-yellow-300 text-xs">Manual</td>
        </tr>
        <tr>
          <td className="px-3 py-3 font-medium text-cyan-300 text-xs">Reranking</td>
          <td className="px-3 py-3 text-green-400 text-xs">Cross-encoder, LLM, ColBERT, MMR</td>
          <td className="px-3 py-3 text-red-300 text-xs">None</td>
          <td className="px-3 py-3 text-red-300 text-xs">None</td>
          <td className="px-3 py-3 text-red-300 text-xs">None</td>
          <td className="px-3 py-3 text-red-300 text-xs">None</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-3 py-3 font-medium text-cyan-300 text-xs">ML Algorithms</td>
          <td className="px-3 py-3 text-green-400 text-xs">52 algorithms: RF, XGBoost, LightGBM, CatBoost, SVM, KNN, DT, NB, NN, K-means, DBSCAN, GMM, PCA, etc.</td>
          <td className="px-3 py-3 text-red-300 text-xs">None</td>
          <td className="px-3 py-3 text-red-300 text-xs">None</td>
          <td className="px-3 py-3 text-red-300 text-xs">None</td>
          <td className="px-3 py-3 text-green-400 text-xs">XGBoost, LightGBM, sklearn suite, Linear/Logistic</td>
        </tr>
        <tr>
          <td className="px-3 py-3 font-medium text-cyan-300 text-xs">Background Workers</td>
          <td className="px-3 py-3 text-green-400 text-xs">4 workers: neuranq, neuranmon, neurandefrag, neuranllm</td>
          <td className="px-3 py-3 text-red-300 text-xs">None</td>
          <td className="px-3 py-3 text-red-300 text-xs">None</td>
          <td className="px-3 py-3 text-red-300 text-xs">None</td>
          <td className="px-3 py-3 text-red-300 text-xs">None</td>
        </tr>
        <tr>
          <td className="px-3 py-3 font-medium text-cyan-300 text-xs">RAG Pipeline</td>
          <td className="px-3 py-3 text-green-400 text-xs">Complete In-DB</td>
          <td className="px-3 py-3 text-red-300 text-xs">None</td>
          <td className="px-3 py-3 text-red-300 text-xs">None</td>
          <td className="px-3 py-3 text-yellow-300 text-xs">Partial (API)</td>
          <td className="px-3 py-3 text-yellow-300 text-xs">Partial (Python)</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-3 py-3 font-medium text-cyan-300 text-xs">Quantization</td>
          <td className="px-3 py-3 text-green-400 text-xs">FP16, INT8, Binary (2x-32x)</td>
          <td className="px-3 py-3 text-yellow-300 text-xs">Binary only</td>
          <td className="px-3 py-3 text-yellow-300 text-xs">Binary only</td>
          <td className="px-3 py-3 text-red-300 text-xs">None</td>
          <td className="px-3 py-3 text-red-300 text-xs">None</td>
        </tr>
        <tr>
          <td className="px-3 py-3 font-medium text-cyan-300 text-xs">Implementation</td>
          <td className="px-3 py-3 text-green-400 text-xs">Pure C</td>
          <td className="px-3 py-3 text-green-400 text-xs">Pure C</td>
          <td className="px-3 py-3 text-green-400 text-xs">Pure C</td>
          <td className="px-3 py-3 text-yellow-300 text-xs">Rust + SQL</td>
          <td className="px-3 py-3 text-yellow-300 text-xs">Python + C</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-3 py-3 font-medium text-cyan-300 text-xs">Training Models</td>
          <td className="px-3 py-3 text-yellow-300 text-xs">Fine-tuning (roadmap)</td>
          <td className="px-3 py-3 text-red-300 text-xs">None</td>
          <td className="px-3 py-3 text-red-300 text-xs">None</td>
          <td className="px-3 py-3 text-red-300 text-xs">None</td>
          <td className="px-3 py-3 text-green-400 text-xs">Full training (sklearn, XGBoost, etc.)</td>
        </tr>
        <tr>
          <td className="px-3 py-3 font-medium text-cyan-300 text-xs">Auto-Tuning</td>
          <td className="px-3 py-3 text-green-400 text-xs">neuranmon worker</td>
          <td className="px-3 py-3 text-red-300 text-xs">None</td>
          <td className="px-3 py-3 text-red-300 text-xs">None</td>
          <td className="px-3 py-3 text-red-300 text-xs">None</td>
          <td className="px-3 py-3 text-red-300 text-xs">None</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-3 py-3 font-medium text-cyan-300 text-xs">GPU Support</td>
          <td className="px-3 py-3 text-green-400 text-xs">CUDA + ROCm + Metal (native C/C++)</td>
          <td className="px-3 py-3 text-red-300 text-xs">None</td>
          <td className="px-3 py-3 text-red-300 text-xs">None</td>
          <td className="px-3 py-3 text-red-300 text-xs">None</td>
          <td className="px-3 py-3 text-green-400 text-xs">CUDA (via Python)</td>
        </tr>
        <tr>
          <td className="px-3 py-3 font-medium text-cyan-300 text-xs">PostgreSQL Versions</td>
          <td className="px-3 py-3 text-white/70 text-xs">16, 17, 18</td>
          <td className="px-3 py-3 text-white/70 text-xs">12-18</td>
          <td className="px-3 py-3 text-white/70 text-xs">15-18</td>
          <td className="px-3 py-3 text-white/70 text-xs">16-18</td>
          <td className="px-3 py-3 text-white/70 text-xs">14-16</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-3 py-3 font-medium text-cyan-300 text-xs">License</td>
          <td className="px-3 py-3 text-white/70 text-xs">PostgreSQL</td>
          <td className="px-3 py-3 text-white/70 text-xs">PostgreSQL</td>
          <td className="px-3 py-3 text-white/70 text-xs">Timescale License</td>
          <td className="px-3 py-3 text-white/70 text-xs">PostgreSQL</td>
          <td className="px-3 py-3 text-white/70 text-xs">PostgreSQL</td>
        </tr>
        <tr>
          <td className="px-3 py-3 font-medium text-cyan-300 text-xs">Vector Types</td>
          <td className="px-3 py-3 text-green-400 text-xs">5 types: vector, vectorp, vecmap, vgraph, rtext</td>
          <td className="px-3 py-3 text-green-400 text-xs">1 type: vector</td>
          <td className="px-3 py-3 text-green-400 text-xs">1 type: vector</td>
          <td className="px-3 py-3 text-yellow-300 text-xs">Uses pgvector</td>
          <td className="px-3 py-3 text-yellow-300 text-xs">Uses pgvector</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-3 py-3 font-medium text-cyan-300 text-xs">Distance Metrics</td>
          <td className="px-3 py-3 text-green-400 text-xs">10+ metrics: L2, Cosine, Inner Product, Manhattan, Hamming, Jaccard, etc.</td>
          <td className="px-3 py-3 text-green-400 text-xs">3 metrics: L2, Cosine, Inner Product</td>
          <td className="px-3 py-3 text-green-400 text-xs">3 metrics: L2, Cosine, Inner Product</td>
          <td className="px-3 py-3 text-yellow-300 text-xs">Uses pgvector</td>
          <td className="px-3 py-3 text-yellow-300 text-xs">Uses pgvector</td>
        </tr>
        <tr>
          <td className="px-3 py-3 font-medium text-cyan-300 text-xs">SQL Functions</td>
          <td className="px-3 py-3 text-green-400 text-xs">473 functions</td>
          <td className="px-3 py-3 text-yellow-300 text-xs">~20 functions</td>
          <td className="px-3 py-3 text-yellow-300 text-xs">~30 functions</td>
          <td className="px-3 py-3 text-yellow-300 text-xs">~15 functions</td>
          <td className="px-3 py-3 text-yellow-300 text-xs">~50 functions</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-3 py-3 font-medium text-cyan-300 text-xs">Index Maintenance</td>
          <td className="px-3 py-3 text-green-400 text-xs">Auto (neurandefrag worker)</td>
          <td className="px-3 py-3 text-red-300 text-xs">Manual</td>
          <td className="px-3 py-3 text-red-300 text-xs">Manual</td>
          <td className="px-3 py-3 text-red-300 text-xs">Manual</td>
          <td className="px-3 py-3 text-red-300 text-xs">Manual</td>
        </tr>
        <tr>
          <td className="px-3 py-3 font-medium text-cyan-300 text-xs">Performance (QPS)</td>
          <td className="px-3 py-3 text-green-400 text-xs">100K+ (with GPU)</td>
          <td className="px-3 py-3 text-yellow-300 text-xs">10K-50K</td>
          <td className="px-3 py-3 text-yellow-300 text-xs">50K-100K</td>
          <td className="px-3 py-3 text-red-300 text-xs">Limited (API overhead)</td>
          <td className="px-3 py-3 text-yellow-300 text-xs">5K-20K (Python overhead)</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-3 py-3 font-medium text-cyan-300 text-xs">Memory Efficiency</td>
          <td className="px-3 py-3 text-green-400 text-xs">Optimized (PQ/OPQ compression)</td>
          <td className="px-3 py-3 text-yellow-300 text-xs">Standard</td>
          <td className="px-3 py-3 text-green-400 text-xs">Disk-based (low memory)</td>
          <td className="px-3 py-3 text-yellow-300 text-xs">Standard</td>
          <td className="px-3 py-3 text-red-300 text-xs">High (Python models)</td>
        </tr>
        <tr>
          <td className="px-3 py-3 font-medium text-cyan-300 text-xs">Multi-tenancy</td>
          <td className="px-3 py-3 text-green-400 text-xs">Native (tenant-aware workers)</td>
          <td className="px-3 py-3 text-red-300 text-xs">None</td>
          <td className="px-3 py-3 text-red-300 text-xs">None</td>
          <td className="px-3 py-3 text-red-300 text-xs">None</td>
          <td className="px-3 py-3 text-red-300 text-xs">None</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-3 py-3 font-medium text-cyan-300 text-xs">Security</td>
          <td className="px-3 py-3 text-green-400 text-xs">Row-level security, encryption, audit logs</td>
          <td className="px-3 py-3 text-yellow-300 text-xs">PostgreSQL RLS</td>
          <td className="px-3 py-3 text-yellow-300 text-xs">PostgreSQL RLS</td>
          <td className="px-3 py-3 text-yellow-300 text-xs">PostgreSQL RLS</td>
          <td className="px-3 py-3 text-yellow-300 text-xs">PostgreSQL RLS</td>
        </tr>
        <tr>
          <td className="px-3 py-3 font-medium text-cyan-300 text-xs">Monitoring</td>
          <td className="px-3 py-3 text-green-400 text-xs">pg_stat_neurondb, Prometheus, Grafana</td>
          <td className="px-3 py-3 text-red-300 text-xs">Basic</td>
          <td className="px-3 py-3 text-red-300 text-xs">Basic</td>
          <td className="px-3 py-3 text-red-300 text-xs">Basic</td>
          <td className="px-3 py-3 text-yellow-300 text-xs">Limited</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-3 py-3 font-medium text-cyan-300 text-xs">Documentation</td>
          <td className="px-3 py-3 text-green-400 text-xs">Comprehensive (473 functions documented)</td>
          <td className="px-3 py-3 text-green-400 text-xs">Good</td>
          <td className="px-3 py-3 text-yellow-300 text-xs">Moderate</td>
          <td className="px-3 py-3 text-yellow-300 text-xs">Moderate</td>
          <td className="px-3 py-3 text-green-400 text-xs">Good</td>
        </tr>
        <tr>
          <td className="px-3 py-3 font-medium text-cyan-300 text-xs">Community Support</td>
          <td className="px-3 py-3 text-green-400 text-xs">Active (pgElephant)</td>
          <td className="px-3 py-3 text-green-400 text-xs">Very Active (Anthropic)</td>
          <td className="px-3 py-3 text-yellow-300 text-xs">Moderate (Timescale)</td>
          <td className="px-3 py-3 text-yellow-300 text-xs">Growing</td>
          <td className="px-3 py-3 text-green-400 text-xs">Active</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-3 py-3 font-medium text-cyan-300 text-xs">Production Readiness</td>
          <td className="px-3 py-3 text-green-400 text-xs">Enterprise-ready</td>
          <td className="px-3 py-3 text-green-400 text-xs">Production-ready</td>
          <td className="px-3 py-3 text-yellow-300 text-xs">Beta</td>
          <td className="px-3 py-3 text-yellow-300 text-xs">Early stage</td>
          <td className="px-3 py-3 text-green-400 text-xs">Production-ready</td>
        </tr>
        <tr>
          <td className="px-3 py-3 font-medium text-cyan-300 text-xs">Dependencies</td>
          <td className="px-3 py-3 text-green-400 text-xs">Zero (pure C, optional ONNX)</td>
          <td className="px-3 py-3 text-green-400 text-xs">Zero (pure C)</td>
          <td className="px-3 py-3 text-green-400 text-xs">Zero (pure C)</td>
          <td className="px-3 py-3 text-yellow-300 text-xs">Rust runtime</td>
          <td className="px-3 py-3 text-red-300 text-xs">Python + ML libraries</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-3 py-3 font-medium text-cyan-300 text-xs">Batch Processing</td>
          <td className="px-3 py-3 text-green-400 text-xs">Native (neuranq worker)</td>
          <td className="px-3 py-3 text-red-300 text-xs">Manual</td>
          <td className="px-3 py-3 text-red-300 text-xs">Manual</td>
          <td className="px-3 py-3 text-yellow-300 text-xs">Limited</td>
          <td className="px-3 py-3 text-green-400 text-xs">Native (Python)</td>
        </tr>
        <tr>
          <td className="px-3 py-3 font-medium text-cyan-300 text-xs">Model Catalog</td>
          <td className="px-3 py-3 text-green-400 text-xs">Built-in (versioning, A/B testing)</td>
          <td className="px-3 py-3 text-red-300 text-xs">None</td>
          <td className="px-3 py-3 text-red-300 text-xs">None</td>
          <td className="px-3 py-3 text-red-300 text-xs">None</td>
          <td className="px-3 py-3 text-yellow-300 text-xs">Basic</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-3 py-3 font-medium text-cyan-300 text-xs">Cost Efficiency</td>
          <td className="px-3 py-3 text-green-400 text-xs">High (in-DB, no API costs)</td>
          <td className="px-3 py-3 text-green-400 text-xs">High (in-DB)</td>
          <td className="px-3 py-3 text-green-400 text-xs">High (disk-based)</td>
          <td className="px-3 py-3 text-red-300 text-xs">Low (API costs)</td>
          <td className="px-3 py-3 text-yellow-300 text-xs">Moderate (Python overhead)</td>
        </tr>
      </tbody>
    </table>
  ),
  },
  ctaSection: {
    kicker: 'Get Started',
    title: 'Add AI Capabilities to PostgreSQL',
    description: 'Install NeurondB. Build semantic search, RAG applications, and ML features in your PostgreSQL infrastructure.',
    primaryCTA: { href: '/docs/neurondb/getting-started', label: 'View Documentation' },
    secondaryCTA: { href: 'https://github.com/pgElephant/NeurondB', label: 'View on GitHub', external: true },
  },
};

export default function NeurondBPage() {
  return <ProductPageTemplate {...neurondbConfig} />;
}

