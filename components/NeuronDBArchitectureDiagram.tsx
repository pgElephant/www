'use client';

import React from 'react';

export default function NeuronDBArchitectureDiagram() {
  return (
    <div className="w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-xl p-8 shadow-2xl">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">
        NeuronDB Architecture
      </h2>
      
      <svg
        viewBox="0 0 1200 1450"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="pgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.9" />
          </linearGradient>
          
          <linearGradient id="mlGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.9" />
          </linearGradient>
          
          <linearGradient id="vectorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#D97706" stopOpacity="0.9" />
          </linearGradient>
          
          <linearGradient id="gpuGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EF4444" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#DC2626" stopOpacity="0.9" />
          </linearGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#60A5FA" />
          </marker>
        </defs>

        {/* PostgreSQL Core Base */}
        <rect x="400" y="50" width="400" height="80" rx="8" fill="url(#pgGradient)" filter="url(#glow)" />
        <text x="600" y="85" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">
          PostgreSQL 16-18 Core
        </text>
        <text x="600" y="110" textAnchor="middle" fill="white" fontSize="14" opacity="0.9">
          ACID | MVCC | WAL | Replication | SPI
        </text>

        {/* NeuronDB Extension Layer */}
        <rect x="350" y="170" width="500" height="100" rx="8" fill="#1E293B" stroke="#3B82F6" strokeWidth="2" />
        <text x="600" y="200" textAnchor="middle" fill="white" fontSize="22" fontWeight="bold">
          NeuronDB Extension Layer
        </text>
        <text x="600" y="225" textAnchor="middle" fill="#60A5FA" fontSize="14">
          Hooks: Executor | Planner | Utility
        </text>
        <text x="600" y="248" textAnchor="middle" fill="#60A5FA" fontSize="14">
          Shared Memory | LWLocks | Background Workers
        </text>

        {/* Arrow from PG to Extension */}
        <line x1="600" y1="130" x2="600" y2="170" stroke="#60A5FA" strokeWidth="2" markerEnd="url(#arrowhead)" />

        {/* Four Main Component Blocks */}
        
        {/* 1. Vector Engine */}
        <rect x="50" y="320" width="260" height="200" rx="8" fill="url(#vectorGradient)" filter="url(#glow)" />
        <text x="180" y="350" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">
          Vector Engine
        </text>
        <text x="180" y="380" textAnchor="middle" fill="white" fontSize="13">
          • HNSW Indexing
        </text>
        <text x="180" y="403" textAnchor="middle" fill="white" fontSize="13">
          • IVF Indexing
        </text>
        <text x="180" y="426" textAnchor="middle" fill="white" fontSize="13">
          • Cosine/L2/Inner Product
        </text>
        <text x="180" y="449" textAnchor="middle" fill="white" fontSize="13">
          • Quantization (FP16/INT8/Binary)
        </text>
        <text x="180" y="472" textAnchor="middle" fill="white" fontSize="13">
          • Sparse Vectors (SPLADE/ColBERT)
        </text>
        <text x="180" y="495" textAnchor="middle" fill="white" fontSize="13">
          • SIMD-Optimized Distance
        </text>

        {/* 2. ML Engine */}
        <rect x="340" y="320" width="260" height="200" rx="8" fill="url(#mlGradient)" filter="url(#glow)" />
        <text x="470" y="350" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">
          ML Engine
        </text>
        <text x="470" y="380" textAnchor="middle" fill="white" fontSize="13">
          • Classification (RF/XGBoost/SVM)
        </text>
        <text x="470" y="403" textAnchor="middle" fill="white" fontSize="13">
          • Regression (Linear/Ridge/Lasso)
        </text>
        <text x="470" y="426" textAnchor="middle" fill="white" fontSize="13">
          • Clustering (KMeans/DBSCAN/GMM)
        </text>
        <text x="470" y="449" textAnchor="middle" fill="white" fontSize="13">
          • 52 ML Algorithms (Pure C)
        </text>
        <text x="470" y="472" textAnchor="middle" fill="white" fontSize="13">
          • ONNX Runtime Integration
        </text>
        <text x="470" y="495" textAnchor="middle" fill="white" fontSize="13">
          • Batch Processing
        </text>

        {/* 3. Embedding Engine */}
        <rect x="630" y="320" width="260" height="200" rx="8" fill="#8B5CF6" filter="url(#glow)" />
        <text x="760" y="350" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">
          Embedding Engine
        </text>
        <text x="760" y="380" textAnchor="middle" fill="white" fontSize="13">
          • Text Embeddings (embed_text)
        </text>
        <text x="760" y="403" textAnchor="middle" fill="white" fontSize="13">
          • Batch Embeddings (embed_text_batch)
        </text>
        <text x="760" y="426" textAnchor="middle" fill="white" fontSize="13">
          • Multimodal (CLIP/ImageBind)
        </text>
        <text x="760" y="449" textAnchor="middle" fill="white" fontSize="13">
          • Hugging Face Integration
        </text>
        <text x="760" y="472" textAnchor="middle" fill="white" fontSize="13">
          • Cache Management
        </text>
        <text x="760" y="495" textAnchor="middle" fill="white" fontSize="13">
          • LLM Router & Runtime
        </text>

        {/* 4. GPU Accelerator */}
        <rect x="920" y="320" width="230" height="200" rx="8" fill="url(#gpuGradient)" filter="url(#glow)" />
        <text x="1035" y="350" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">
          GPU Accelerator
        </text>
        <text x="1035" y="380" textAnchor="middle" fill="white" fontSize="13">
          • CUDA (NVIDIA)
        </text>
        <text x="1035" y="403" textAnchor="middle" fill="white" fontSize="13">
          • ROCm (AMD)
        </text>
        <text x="1035" y="426" textAnchor="middle" fill="white" fontSize="13">
          • Metal (Apple Silicon)
        </text>
        <text x="1035" y="449" textAnchor="middle" fill="white" fontSize="13">
          • GPU Distance Ops
        </text>
        <text x="1035" y="472" textAnchor="middle" fill="white" fontSize="13">
          • GPU ML Inference
        </text>
        <text x="1035" y="495" textAnchor="middle" fill="white" fontSize="13">
          • Auto Detection & Fallback
        </text>

        {/* Arrows from Extension to Components */}
        <line x1="450" y1="270" x2="180" y2="320" stroke="#60A5FA" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <line x1="550" y1="270" x2="470" y2="320" stroke="#60A5FA" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <line x1="650" y1="270" x2="760" y2="320" stroke="#60A5FA" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <line x1="750" y1="270" x2="1035" y2="320" stroke="#60A5FA" strokeWidth="2" markerEnd="url(#arrowhead)" />

        {/* Advanced Features Layer */}
        <rect x="200" y="570" width="800" height="140" rx="8" fill="#1E293B" stroke="#10B981" strokeWidth="2" />
        <text x="600" y="600" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">
          Advanced Features
        </text>
        <text x="250" y="630" textAnchor="middle" fill="#10B981" fontSize="14">
          Hybrid Search
        </text>
        <text x="400" y="630" textAnchor="middle" fill="#10B981" fontSize="14">
          Reranking
        </text>
        <text x="550" y="630" textAnchor="middle" fill="#10B981" fontSize="14">
          RAG Pipeline
        </text>
        <text x="700" y="630" textAnchor="middle" fill="#10B981" fontSize="14">
          Query Planner
        </text>
        <text x="850" y="630" textAnchor="middle" fill="#10B981" fontSize="14">
          Sparse Vectors
        </text>
        <text x="250" y="660" textAnchor="middle" fill="white" fontSize="12">
          Vector + FTS
        </text>
        <text x="400" y="660" textAnchor="middle" fill="white" fontSize="12">
          Cross-Encoder/LLM
        </text>
        <text x="550" y="660" textAnchor="middle" fill="white" fontSize="12">
          Document Processing
        </text>
        <text x="700" y="660" textAnchor="middle" fill="white" fontSize="12">
          Cost Estimation
        </text>
        <text x="850" y="660" textAnchor="middle" fill="white" fontSize="12">
          SPLADE/ColBERT
        </text>
        <text x="250" y="690" textAnchor="middle" fill="white" fontSize="12">
          Multi-Vector
        </text>
        <text x="400" y="690" textAnchor="middle" fill="white" fontSize="12">
          MMR/RRF/Ensemble
        </text>
        <text x="550" y="690" textAnchor="middle" fill="white" fontSize="12">
          LLM Integration
        </text>
        <text x="700" y="690" textAnchor="middle" fill="white" fontSize="12">
          Index Selection
        </text>
        <text x="850" y="690" textAnchor="middle" fill="white" fontSize="12">
          BM25 Scoring
        </text>

        {/* Arrows to Advanced Features */}
        <line x1="180" y1="520" x2="400" y2="570" stroke="#60A5FA" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <line x1="470" y1="520" x2="530" y2="570" stroke="#60A5FA" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <line x1="760" y1="520" x2="670" y2="570" stroke="#60A5FA" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <line x1="1035" y1="520" x2="800" y2="570" stroke="#60A5FA" strokeWidth="2" markerEnd="url(#arrowhead)" />

        {/* Background Workers */}
        <rect x="50" y="750" width="340" height="240" rx="8" fill="#0F172A" stroke="#F59E0B" strokeWidth="2" />
        <text x="220" y="780" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">
          Background Workers (4)
        </text>
        <text x="220" y="810" textAnchor="middle" fill="#F59E0B" fontSize="14">
          neuranq (Queue Executor)
        </text>
        <text x="220" y="835" textAnchor="middle" fill="white" fontSize="12">
          Async jobs, SKIP LOCKED, retries
        </text>
        <text x="220" y="865" textAnchor="middle" fill="#F59E0B" fontSize="14">
          neuranmon (Auto-Tuner)
        </text>
        <text x="220" y="890" textAnchor="middle" fill="white" fontSize="12">
          ef_search tuning, recall@k tracking
        </text>
        <text x="220" y="920" textAnchor="middle" fill="#F59E0B" fontSize="14">
          neurandefrag (Index Maintenance)
        </text>
        <text x="220" y="945" textAnchor="middle" fill="white" fontSize="12">
          Compaction, tombstone pruning
        </text>
        <text x="220" y="975" textAnchor="middle" fill="#F59E0B" fontSize="14">
          neuranllm (LLM Processor)
        </text>
        <text x="220" y="1000" textAnchor="middle" fill="white" fontSize="12">
          LLM jobs, crash recovery
        </text>

        {/* Storage & Index Management */}
        <rect x="420" y="750" width="340" height="240" rx="8" fill="#0F172A" stroke="#8B5CF6" strokeWidth="2" />
        <text x="590" y="780" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">
          Storage & Index Manager
        </text>
        <text x="590" y="810" textAnchor="middle" fill="#8B5CF6" fontSize="14">
          Vector Storage (TOAST)
        </text>
        <text x="590" y="835" textAnchor="middle" fill="white" fontSize="12">
          Compressed storage, WAL integration
        </text>
        <text x="590" y="865" textAnchor="middle" fill="#8B5CF6" fontSize="14">
          HNSW & IVF Index Builder
        </text>
        <text x="590" y="890" textAnchor="middle" fill="white" fontSize="12">
          Automatic creation, incremental updates
        </text>
        <text x="590" y="920" textAnchor="middle" fill="#8B5CF6" fontSize="14">
          Index Cache & Buffer
        </text>
        <text x="590" y="945" textAnchor="middle" fill="white" fontSize="12">
          Hot centroid caching, prefetching
        </text>
        <text x="590" y="975" textAnchor="middle" fill="#8B5CF6" fontSize="14">
          Sparse Vector Index
        </text>
        <text x="590" y="1000" textAnchor="middle" fill="white" fontSize="12">
          SPLADE, ColBERT indexing
        </text>

        {/* Monitoring & Analytics */}
        <rect x="790" y="750" width="360" height="240" rx="8" fill="#0F172A" stroke="#10B981" strokeWidth="2" />
        <text x="970" y="780" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">
          Monitoring & Analytics
        </text>
        <text x="970" y="810" textAnchor="middle" fill="#10B981" fontSize="14">
          pg_stat_neurondb View
        </text>
        <text x="970" y="835" textAnchor="middle" fill="white" fontSize="12">
          Query latency, cache hit rates
        </text>
        <text x="970" y="865" textAnchor="middle" fill="#10B981" fontSize="14">
          Model Metrics & Analytics
        </text>
        <text x="970" y="890" textAnchor="middle" fill="white" fontSize="12">
          Accuracy, F1, Recall@K, MRR
        </text>
        <text x="970" y="920" textAnchor="middle" fill="#10B981" fontSize="14">
          Prometheus Exporter
        </text>
        <text x="970" y="945" textAnchor="middle" fill="white" fontSize="12">
          Real-time metrics, structured logging
        </text>
        <text x="970" y="975" textAnchor="middle" fill="#10B981" fontSize="14">
          Multi-Tenant Isolation
        </text>
        <text x="970" y="1000" textAnchor="middle" fill="white" fontSize="12">
          Tenant-aware metrics, RLS
        </text>

        {/* Arrows from Advanced Features to Lower Layer */}
        <line x1="400" y1="710" x2="220" y2="750" stroke="#60A5FA" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <line x1="600" y1="710" x2="590" y2="750" stroke="#60A5FA" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <line x1="800" y1="710" x2="970" y2="750" stroke="#60A5FA" strokeWidth="2" markerEnd="url(#arrowhead)" />
        
        {/* Additional component connections */}
        <line x1="1035" y1="520" x2="850" y2="570" stroke="#60A5FA" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <line x1="760" y1="520" x2="600" y2="570" stroke="#60A5FA" strokeWidth="2" markerEnd="url(#arrowhead)" />

        {/* API & Interface Layer */}
        <rect x="150" y="1000" width="900" height="120" rx="8" fill="#1E293B" stroke="#3B82F6" strokeWidth="2" />
        <text x="600" y="1030" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">
          API & Interface Layer (473 SQL Functions)
        </text>
        <text x="250" y="1060" textAnchor="middle" fill="#60A5FA" fontSize="14">
          SQL Functions
        </text>
        <text x="400" y="1060" textAnchor="middle" fill="#60A5FA" fontSize="14">
          Operators
        </text>
        <text x="550" y="1060" textAnchor="middle" fill="#60A5FA" fontSize="14">
          Views
        </text>
        <text x="700" y="1060" textAnchor="middle" fill="#60A5FA" fontSize="14">
          Types
        </text>
        <text x="850" y="1060" textAnchor="middle" fill="#60A5FA" fontSize="14">
          Aggregates
        </text>
        <text x="250" y="1090" textAnchor="middle" fill="white" fontSize="12">
          neurondb.train()
        </text>
        <text x="400" y="1090" textAnchor="middle" fill="white" fontSize="12">
          &lt;-&gt;, &lt;#&gt;, &lt;=&gt;
        </text>
        <text x="550" y="1090" textAnchor="middle" fill="white" fontSize="12">
          pg_stat_neurondb
        </text>
        <text x="700" y="1090" textAnchor="middle" fill="white" fontSize="12">
          vector, sparse_vector
        </text>
        <text x="850" y="1090" textAnchor="middle" fill="white" fontSize="12">
          vector_avg, vector_sum
        </text>

        {/* Arrows from lower layer to API */}
        <line x1="220" y1="990" x2="350" y2="1000" stroke="#60A5FA" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <line x1="590" y1="990" x2="600" y2="1000" stroke="#60A5FA" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <line x1="970" y1="990" x2="850" y2="1000" stroke="#60A5FA" strokeWidth="2" markerEnd="url(#arrowhead)" />

        {/* Client Applications */}
        <rect x="50" y="1170" width="200" height="80" rx="8" fill="#4F46E5" />
        <text x="150" y="1200" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">
          Web Applications
        </text>
        <text x="150" y="1225" textAnchor="middle" fill="white" fontSize="12">
          React, Next.js, Vue
        </text>

        <rect x="280" y="1170" width="200" height="80" rx="8" fill="#10B981" />
        <text x="380" y="1200" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">
          ML Pipelines
        </text>
        <text x="380" y="1225" textAnchor="middle" fill="white" fontSize="12">
          Python, Jupyter
        </text>

        <rect x="510" y="1170" width="200" height="80" rx="8" fill="#F59E0B" />
        <text x="610" y="1200" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">
          RAG Systems
        </text>
        <text x="610" y="1225" textAnchor="middle" fill="white" fontSize="12">
          LangChain, LlamaIndex
        </text>

        <rect x="740" y="1170" width="200" height="80" rx="8" fill="#8B5CF6" />
        <text x="840" y="1200" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">
          Search Engines
        </text>
        <text x="840" y="1225" textAnchor="middle" fill="white" fontSize="12">
          Semantic Search
        </text>

        <rect x="970" y="1170" width="180" height="80" rx="8" fill="#EF4444" />
        <text x="1060" y="1200" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">
          Analytics
        </text>
        <text x="1060" y="1225" textAnchor="middle" fill="white" fontSize="12">
          BI Tools, Dashboards
        </text>

        {/* Arrows from API to Clients */}
        <line x1="300" y1="1120" x2="150" y2="1170" stroke="#60A5FA" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <line x1="450" y1="1120" x2="380" y2="1170" stroke="#60A5FA" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <line x1="600" y1="1120" x2="610" y2="1170" stroke="#60A5FA" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <line x1="750" y1="1120" x2="840" y2="1170" stroke="#60A5FA" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <line x1="900" y1="1120" x2="1060" y2="1170" stroke="#60A5FA" strokeWidth="2" markerEnd="url(#arrowhead)" />

        {/* Data Flow Indicators */}
        <text x="600" y="1310" textAnchor="middle" fill="#60A5FA" fontSize="16" fontWeight="bold">
          Data Flow
        </text>
        <line x1="400" y1="1330" x2="800" y2="1330" stroke="#60A5FA" strokeWidth="2" />
        <text x="350" y="1335" textAnchor="end" fill="white" fontSize="12">
          Query
        </text>
        <polygon points="800,1330 785,1325 785,1335" fill="#60A5FA" />
        
        <line x1="800" y1="1360" x2="400" y2="1360" stroke="#10B981" strokeWidth="2" />
        <text x="850" y="1365" textAnchor="start" fill="white" fontSize="12">
          Results
        </text>
        <polygon points="400,1360 415,1355 415,1365" fill="#10B981" />

        {/* Legend */}
        <rect x="50" y="1390" width="1100" height="30" rx="4" fill="#0F172A" opacity="0.8" />
        <text x="70" y="1410" fill="#F59E0B" fontSize="12" fontWeight="bold">
          Vector Processing
        </text>
        <text x="220" y="1410" fill="#10B981" fontSize="12" fontWeight="bold">
          ML Operations
        </text>
        <text x="370" y="1410" fill="#8B5CF6" fontSize="12" fontWeight="bold">
          Embedding Generation
        </text>
        <text x="570" y="1410" fill="#EF4444" fontSize="12" fontWeight="bold">
          GPU Acceleration
        </text>
        <text x="740" y="1410" fill="#60A5FA" fontSize="12" fontWeight="bold">
          Data Flow
        </text>
        <text x="870" y="1410" fill="#3B82F6" fontSize="12" fontWeight="bold">
          Core Components
        </text>
      </svg>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-300">
        <div className="bg-slate-800 p-4 rounded-lg">
          <h3 className="text-amber-400 font-bold mb-2">Vector Engine</h3>
          <p>High-performance ANN search with HNSW and IVF indexing, supporting multiple distance metrics (L2, Cosine, Inner Product), quantization (FP16/INT8/Binary), and SIMD-optimized operations. Pure C implementation with 158 source files.</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg">
          <h3 className="text-green-400 font-bold mb-2">ML Engine</h3>
          <p>52 ML algorithms implemented in pure C: Random Forest, XGBoost, LightGBM, CatBoost, SVM, KNN, Decision Trees, Naive Bayes, Neural Networks, K-means, DBSCAN, GMM, PCA, and more. ONNX runtime integration for model inference.</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg">
          <h3 className="text-purple-400 font-bold mb-2">Embedding Engine</h3>
          <p>Text embeddings via embed_text() and embed_text_batch() functions. Multimodal support (CLIP, ImageBind). Hugging Face integration. LLM router and runtime with caching. Batch generation with GPU acceleration.</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg">
          <h3 className="text-red-400 font-bold mb-2">GPU Accelerator</h3>
          <p>Full GPU support: CUDA (NVIDIA), ROCm (AMD), Metal (Apple Silicon). GPU-accelerated distance calculations, ML inference, and batch processing. Automatic GPU detection with CPU fallback. Native C/C++ implementation.</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg">
          <h3 className="text-blue-400 font-bold mb-2">Background Workers (4)</h3>
          <p>neuranq (async job queue), neuranmon (auto-tuner), neurandefrag (index maintenance), neuranllm (LLM processor). All tenant-aware with QPS/cost budgets, crash recovery, and SKIP LOCKED processing.</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg">
          <h3 className="text-cyan-400 font-bold mb-2">Advanced Features</h3>
          <p>Hybrid search (vector + FTS), reranking (cross-encoder, LLM, MMR, RRF), complete RAG pipeline, sparse vectors (SPLADE, ColBERT), query planner with cost estimation, and intelligent caching.</p>
        </div>
      </div>
    </div>
  );
}

