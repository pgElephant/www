'use client';

import React from 'react';

export default function NeuronDBArchitectureDiagram() {
  return (
    <div className="w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-xl p-8 shadow-2xl">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">
        NeuronDB Architecture
      </h2>
      
      <svg
        viewBox="0 0 1200 1400"
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
          PostgreSQL 14+ Core
        </text>
        <text x="600" y="110" textAnchor="middle" fill="white" fontSize="14" opacity="0.9">
          ACID | MVCC | WAL | Replication
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
          • ANN Search
        </text>
        <text x="180" y="495" textAnchor="middle" fill="white" fontSize="13">
          • Batch Operations
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
          • Clustering (KMeans/DBSCAN)
        </text>
        <text x="470" y="449" textAnchor="middle" fill="white" fontSize="13">
          • Dimensionality Reduction
        </text>
        <text x="470" y="472" textAnchor="middle" fill="white" fontSize="13">
          • AutoML Pipeline
        </text>
        <text x="470" y="495" textAnchor="middle" fill="white" fontSize="13">
          • ONNX Runtime Integration
        </text>

        {/* 3. Embedding Engine */}
        <rect x="630" y="320" width="260" height="200" rx="8" fill="#8B5CF6" filter="url(#glow)" />
        <text x="760" y="350" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">
          Embedding Engine
        </text>
        <text x="760" y="380" textAnchor="middle" fill="white" fontSize="13">
          • Text Embeddings (BERT/GPT)
        </text>
        <text x="760" y="403" textAnchor="middle" fill="white" fontSize="13">
          • Image Embeddings (CLIP/ResNet)
        </text>
        <text x="760" y="426" textAnchor="middle" fill="white" fontSize="13">
          • Multimodal Embeddings
        </text>
        <text x="760" y="449" textAnchor="middle" fill="white" fontSize="13">
          • Batch Generation
        </text>
        <text x="760" y="472" textAnchor="middle" fill="white" fontSize="13">
          • Cache Management
        </text>
        <text x="760" y="495" textAnchor="middle" fill="white" fontSize="13">
          • Model Registry
        </text>

        {/* 4. GPU Accelerator */}
        <rect x="920" y="320" width="230" height="200" rx="8" fill="url(#gpuGradient)" filter="url(#glow)" />
        <text x="1035" y="350" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">
          GPU Accelerator
        </text>
        <text x="1035" y="380" textAnchor="middle" fill="white" fontSize="13">
          • CUDA Support
        </text>
        <text x="1035" y="403" textAnchor="middle" fill="white" fontSize="13">
          • ROCm Support
        </text>
        <text x="1035" y="426" textAnchor="middle" fill="white" fontSize="13">
          • Parallel Matrix Ops
        </text>
        <text x="1035" y="449" textAnchor="middle" fill="white" fontSize="13">
          • Batch Processing
        </text>
        <text x="1035" y="472" textAnchor="middle" fill="white" fontSize="13">
          • Memory Pool
        </text>
        <text x="1035" y="495" textAnchor="middle" fill="white" fontSize="13">
          • Auto Fallback
        </text>

        {/* Arrows from Extension to Components */}
        <line x1="450" y1="270" x2="180" y2="320" stroke="#60A5FA" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <line x1="550" y1="270" x2="470" y2="320" stroke="#60A5FA" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <line x1="650" y1="270" x2="760" y2="320" stroke="#60A5FA" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <line x1="750" y1="270" x2="1035" y2="320" stroke="#60A5FA" strokeWidth="2" markerEnd="url(#arrowhead)" />

        {/* Advanced Features Layer */}
        <rect x="200" y="570" width="800" height="120" rx="8" fill="#1E293B" stroke="#10B981" strokeWidth="2" />
        <text x="600" y="600" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">
          Advanced Features
        </text>
        <text x="300" y="630" textAnchor="middle" fill="#10B981" fontSize="14">
          Hybrid Search
        </text>
        <text x="450" y="630" textAnchor="middle" fill="#10B981" fontSize="14">
          Reranking (Cross-Encoder)
        </text>
        <text x="600" y="630" textAnchor="middle" fill="#10B981" fontSize="14">
          RAG Pipeline
        </text>
        <text x="750" y="630" textAnchor="middle" fill="#10B981" fontSize="14">
          Query Optimization
        </text>
        <text x="900" y="630" textAnchor="middle" fill="#10B981" fontSize="14">
          Cache Layer
        </text>
        <text x="300" y="660" textAnchor="middle" fill="#10B981" fontSize="14">
          FTS + Vector
        </text>
        <text x="450" y="660" textAnchor="middle" fill="#10B981" fontSize="14">
          MMR Diversification
        </text>
        <text x="600" y="660" textAnchor="middle" fill="#10B981" fontSize="14">
          Context Retrieval
        </text>
        <text x="750" y="660" textAnchor="middle" fill="#10B981" fontSize="14">
          Adaptive Indexing
        </text>
        <text x="900" y="660" textAnchor="middle" fill="#10B981" fontSize="14">
          Result Caching
        </text>

        {/* Arrows to Advanced Features */}
        <line x1="180" y1="520" x2="400" y2="570" stroke="#60A5FA" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <line x1="470" y1="520" x2="530" y2="570" stroke="#60A5FA" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <line x1="760" y1="520" x2="670" y2="570" stroke="#60A5FA" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <line x1="1035" y1="520" x2="800" y2="570" stroke="#60A5FA" strokeWidth="2" markerEnd="url(#arrowhead)" />

        {/* Background Workers */}
        <rect x="50" y="740" width="340" height="180" rx="8" fill="#0F172A" stroke="#F59E0B" strokeWidth="2" />
        <text x="220" y="770" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">
          Background Workers
        </text>
        <text x="220" y="800" textAnchor="middle" fill="#F59E0B" fontSize="14">
          neuranq (Query Processor)
        </text>
        <text x="220" y="825" textAnchor="middle" fill="white" fontSize="12">
          Async query execution
        </text>
        <text x="220" y="855" textAnchor="middle" fill="#F59E0B" fontSize="14">
          neuranmon (Monitor)
        </text>
        <text x="220" y="880" textAnchor="middle" fill="white" fontSize="12">
          Performance tracking
        </text>
        <text x="220" y="910" textAnchor="middle" fill="#F59E0B" fontSize="14">
          neurandefrag (Maintenance)
        </text>

        {/* Storage & Index Management */}
        <rect x="420" y="740" width="340" height="180" rx="8" fill="#0F172A" stroke="#8B5CF6" strokeWidth="2" />
        <text x="590" y="770" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">
          Storage & Index Manager
        </text>
        <text x="590" y="800" textAnchor="middle" fill="#8B5CF6" fontSize="14">
          Vector Storage (TOAST)
        </text>
        <text x="590" y="825" textAnchor="middle" fill="white" fontSize="12">
          Compressed storage for large vectors
        </text>
        <text x="590" y="855" textAnchor="middle" fill="#8B5CF6" fontSize="14">
          Index Builder
        </text>
        <text x="590" y="880" textAnchor="middle" fill="white" fontSize="12">
          Automatic index creation/maintenance
        </text>
        <text x="590" y="910" textAnchor="middle" fill="white" fontSize="12">
          Incremental updates, defragmentation
        </text>

        {/* Monitoring & Analytics */}
        <rect x="790" y="740" width="360" height="180" rx="8" fill="#0F172A" stroke="#10B981" strokeWidth="2" />
        <text x="970" y="770" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">
          Monitoring & Analytics
        </text>
        <text x="970" y="800" textAnchor="middle" fill="#10B981" fontSize="14">
          Query Performance Metrics
        </text>
        <text x="970" y="825" textAnchor="middle" fill="white" fontSize="12">
          Latency, throughput, cache hit rates
        </text>
        <text x="970" y="855" textAnchor="middle" fill="#10B981" fontSize="14">
          Model Performance Analytics
        </text>
        <text x="970" y="880" textAnchor="middle" fill="white" fontSize="12">
          Accuracy, F1, confusion matrix
        </text>
        <text x="970" y="910" textAnchor="middle" fill="white" fontSize="12">
          Real-time dashboards, alerts
        </text>

        {/* Arrows from Advanced Features to Lower Layer */}
        <line x1="400" y1="690" x2="220" y2="740" stroke="#60A5FA" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <line x1="600" y1="690" x2="590" y2="740" stroke="#60A5FA" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <line x1="800" y1="690" x2="970" y2="740" stroke="#60A5FA" strokeWidth="2" markerEnd="url(#arrowhead)" />

        {/* API & Interface Layer */}
        <rect x="150" y="970" width="900" height="120" rx="8" fill="#1E293B" stroke="#3B82F6" strokeWidth="2" />
        <text x="600" y="1000" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">
          API & Interface Layer
        </text>
        <text x="250" y="1030" textAnchor="middle" fill="#60A5FA" fontSize="14">
          SQL Functions
        </text>
        <text x="400" y="1030" textAnchor="middle" fill="#60A5FA" fontSize="14">
          Operators
        </text>
        <text x="550" y="1030" textAnchor="middle" fill="#60A5FA" fontSize="14">
          Views
        </text>
        <text x="700" y="1030" textAnchor="middle" fill="#60A5FA" fontSize="14">
          Procedures
        </text>
        <text x="850" y="1030" textAnchor="middle" fill="#60A5FA" fontSize="14">
          REST API
        </text>
        <text x="950" y="1030" textAnchor="middle" fill="#60A5FA" fontSize="14">
          Python API
        </text>
        <text x="250" y="1060" textAnchor="middle" fill="white" fontSize="12">
          neuron_*()
        </text>
        <text x="400" y="1060" textAnchor="middle" fill="white" fontSize="12">
          &lt;-&gt;, &lt;#&gt;, &lt;=&gt;
        </text>
        <text x="550" y="1060" textAnchor="middle" fill="white" fontSize="12">
          neuron_models
        </text>
        <text x="700" y="1060" textAnchor="middle" fill="white" fontSize="12">
          neuron_train()
        </text>
        <text x="850" y="1060" textAnchor="middle" fill="white" fontSize="12">
          HTTP/JSON
        </text>
        <text x="950" y="1060" textAnchor="middle" fill="white" fontSize="12">
          neurondb-py
        </text>

        {/* Arrows from lower layer to API */}
        <line x1="220" y1="920" x2="350" y2="970" stroke="#60A5FA" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <line x1="590" y1="920" x2="600" y2="970" stroke="#60A5FA" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <line x1="970" y1="920" x2="850" y2="970" stroke="#60A5FA" strokeWidth="2" markerEnd="url(#arrowhead)" />

        {/* Client Applications */}
        <rect x="50" y="1140" width="200" height="80" rx="8" fill="#4F46E5" />
        <text x="150" y="1170" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">
          Web Applications
        </text>
        <text x="150" y="1195" textAnchor="middle" fill="white" fontSize="12">
          React, Next.js, Vue
        </text>

        <rect x="280" y="1140" width="200" height="80" rx="8" fill="#10B981" />
        <text x="380" y="1170" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">
          ML Pipelines
        </text>
        <text x="380" y="1195" textAnchor="middle" fill="white" fontSize="12">
          Python, Jupyter
        </text>

        <rect x="510" y="1140" width="200" height="80" rx="8" fill="#F59E0B" />
        <text x="610" y="1170" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">
          RAG Systems
        </text>
        <text x="610" y="1195" textAnchor="middle" fill="white" fontSize="12">
          LangChain, LlamaIndex
        </text>

        <rect x="740" y="1140" width="200" height="80" rx="8" fill="#8B5CF6" />
        <text x="840" y="1170" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">
          Search Engines
        </text>
        <text x="840" y="1195" textAnchor="middle" fill="white" fontSize="12">
          Semantic Search
        </text>

        <rect x="970" y="1140" width="180" height="80" rx="8" fill="#EF4444" />
        <text x="1060" y="1170" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">
          Analytics
        </text>
        <text x="1060" y="1195" textAnchor="middle" fill="white" fontSize="12">
          BI Tools, Dashboards
        </text>

        {/* Arrows from API to Clients */}
        <line x1="300" y1="1090" x2="150" y2="1140" stroke="#60A5FA" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <line x1="450" y1="1090" x2="380" y2="1140" stroke="#60A5FA" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <line x1="600" y1="1090" x2="610" y2="1140" stroke="#60A5FA" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <line x1="750" y1="1090" x2="840" y2="1140" stroke="#60A5FA" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <line x1="900" y1="1090" x2="1060" y2="1140" stroke="#60A5FA" strokeWidth="2" markerEnd="url(#arrowhead)" />

        {/* Data Flow Indicators */}
        <text x="600" y="1280" textAnchor="middle" fill="#60A5FA" fontSize="16" fontWeight="bold">
          Data Flow
        </text>
        <line x1="400" y1="1300" x2="800" y2="1300" stroke="#60A5FA" strokeWidth="2" />
        <text x="350" y="1305" textAnchor="end" fill="white" fontSize="12">
          Query
        </text>
        <polygon points="800,1300 785,1295 785,1305" fill="#60A5FA" />
        
        <line x1="800" y1="1330" x2="400" y2="1330" stroke="#10B981" strokeWidth="2" />
        <text x="850" y1="1335" textAnchor="start" fill="white" fontSize="12">
          Results
        </text>
        <polygon points="400,1330 415,1325 415,1335" fill="#10B981" />

        {/* Legend */}
        <rect x="50" y="1360" width="1100" height="30" rx="4" fill="#0F172A" opacity="0.8" />
        <text x="70" y="1380" fill="#F59E0B" fontSize="12" fontWeight="bold">
          Vector Processing
        </text>
        <text x="220" y="1380" fill="#10B981" fontSize="12" fontWeight="bold">
          ML Operations
        </text>
        <text x="370" y="1380" fill="#8B5CF6" fontSize="12" fontWeight="bold">
          Embedding Generation
        </text>
        <text x="570" y="1380" fill="#EF4444" fontSize="12" fontWeight="bold">
          GPU Acceleration
        </text>
        <text x="740" y="1380" fill="#60A5FA" fontSize="12" fontWeight="bold">
          Data Flow
        </text>
        <text x="870" y="1380" fill="#3B82F6" fontSize="12" fontWeight="bold">
          Core Components
        </text>
      </svg>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-300">
        <div className="bg-slate-800 p-4 rounded-lg">
          <h3 className="text-amber-400 font-bold mb-2">Vector Engine</h3>
          <p>High-performance ANN search with HNSW and IVF indexing, supporting multiple distance metrics and quantization techniques.</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg">
          <h3 className="text-green-400 font-bold mb-2">ML Engine</h3>
          <p>Comprehensive machine learning suite with classification, regression, clustering, and AutoML capabilities powered by ONNX.</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg">
          <h3 className="text-purple-400 font-bold mb-2">Embedding Engine</h3>
          <p>Multi-modal embedding generation for text, images, and mixed data using state-of-the-art transformer models.</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg">
          <h3 className="text-red-400 font-bold mb-2">GPU Accelerator</h3>
          <p>CUDA and ROCm support for parallel matrix operations with automatic fallback to CPU for maximum compatibility.</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg">
          <h3 className="text-blue-400 font-bold mb-2">Background Workers</h3>
          <p>Dedicated workers for async processing, monitoring, and maintenance to keep your system running optimally.</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg">
          <h3 className="text-cyan-400 font-bold mb-2">Advanced Features</h3>
          <p>Hybrid search, reranking, RAG pipelines, and intelligent caching for production-ready AI applications.</p>
        </div>
      </div>
    </div>
  );
}

