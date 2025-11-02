'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Terminal, Play, Square, RotateCcw, Copy, Check } from 'lucide-react'

interface TerminalCommand {
  command: string
  output: string[]
  timestamp: string
  isPsqlCommand?: boolean
  isShellCommand?: boolean
}

const NeurondBDemoTerminal = () => {
  const [isRunning, setIsRunning] = useState(false)
  const [currentCommand, setCurrentCommand] = useState('')
  const [commandHistory, setCommandHistory] = useState<TerminalCommand[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [cursorVisible, setCursorVisible] = useState(true)
  const [speedMultiplier, setSpeedMultiplier] = useState(1)
  const [activeTab, setActiveTab] = useState<'build' | 'usage' | 'vectors' | 'ml' | 'embeddings' | 'gpu' | 'hybrid'>('build')
  const [copied, setCopied] = useState(false)
  const [inPsqlMode, setInPsqlMode] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const timeoutRefs = useRef<NodeJS.Timeout[]>([])

  // Base timing values (in ms)
  const baseTimings = {
    typeSpeed: 50,      // Faster typing for better UX
    commandDelay: 1000,  // Shorter delays
    outputDelay: 200,   // Faster output display
    betweenCommands: 1500 // Less wait between commands
  }

  // NeurondB-specific demo commands and their outputs
  const buildCommands = [
    {
      command: 'git clone https://github.com/pgelephant/neurondb.git && cd neurondb',
      output: [
        '\x1b[32mCloning into \'neurondb\'...\x1b[0m',
        'remote: Enumerating objects: 2847, done.',
        'remote: Counting objects: 100% (2847/2847), done.',
        'remote: Compressing objects: 100% (1523/1523), done.',
        'remote: Total 2847 (delta 891), reused 2846 (delta 890)',
        'Receiving objects: 100% (2847/2847), 1.2 MiB | 850 KiB/s, done.',
        'Resolving deltas: 100% (891/891), done.',
        '\x1b[32m✓ Repository cloned successfully\x1b[0m'
      ]
    },
    {
      command: 'ls -lh',
      output: [
        'total 128',
        'drwxr-xr-x  5 user  staff   160B  Makefile',
        'drwxr-xr-x  8 user  staff   256B  README.md',
        'drwxr-xr-x  4 user  staff   128B  FEATURES.md',
        'drwxr-xr-x  3 user  staff    96B  neurondb--1.0.sql',
        'drwxr-xr-x  7 user  staff   224B  neurondb.control',
        'drwxr-xr-x  12 user staff   384B  include/',
        'drwxr-xr-x  15 user staff   480B  src/',
        'drwxr-xr-x  10 user staff   320B  sql/',
        'drwxr-xr-x  6 user  staff   192B  expected/',
        'drwxr-xr-x  23 user staff   736B  t/'
      ]
    },
    {
      command: 'make clean && make -j4 && sudo make install',
      output: [
        '\x1b[33mCleaning previous build...\x1b[0m',
        'rm -f *.so *.o src/*.o',
        '',
        '\x1b[36m=== Building NeurondB Extension ===\x1b[0m',
        'CC      src/neurondb.c                  \x1b[32m✓\x1b[0m',
        'CC      src/distance.c                  \x1b[32m✓\x1b[0m',
        'CC      src/quantization.c              \x1b[32m✓\x1b[0m',
        'CC      src/ml_inference.c              \x1b[32m✓\x1b[0m',
        'CC      src/hybrid_search.c             \x1b[32m✓\x1b[0m',
        'CC      src/vector_ops.c                \x1b[32m✓\x1b[0m',
        'CC      src/hnsw_index.c                \x1b[32m✓\x1b[0m',
        'CC      src/bgworker_queue.c            \x1b[32m✓\x1b[0m',
        'CC      src/bgworker_tuner.c            \x1b[32m✓\x1b[0m',
        'CC      src/bgworker_defrag.c           \x1b[32m✓\x1b[0m',
        'LINK    neurondb.so                     \x1b[32m✓\x1b[0m',
        '',
        '\x1b[36m=== Installing Extension ===\x1b[0m',
        'install neurondb.so → /usr/local/pgsql/lib/',
        'install neurondb.control → /usr/local/pgsql/share/extension/',
        'install neurondb--1.0.sql → /usr/local/pgsql/share/extension/',
        '',
        '\x1b[32m✓ Installation complete!\x1b[0m'
      ]
    },
    {
      command: 'cat << EOF >> /etc/postgresql/16/main/postgresql.conf',
      output: [
        '\x1b[36m# NeurondB Configuration\x1b[0m',
        '# Load extension on PostgreSQL startup',
        'shared_preload_libraries = \'neurondb\'',
        '',
        '\x1b[36m# Background Workers\x1b[0m',
        'neurondb.neuranq_enabled = on            # Async queue executor',
        'neurondb.neuranmon_enabled = on          # Performance auto-tuner',
        'neurondb.neurandefrag_enabled = on       # Index maintenance worker',
        '',
        '\x1b[36m# Vector Index Parameters (HNSW)\x1b[0m',
        'neurondb.ef_search = 40                  # Search accuracy (10-200)',
        'neurondb.m = 16                          # Connections per node (4-48)',
        'neurondb.ef_construction = 200           # Build quality (10-500)',
        '',
        '\x1b[36m# ML Inference Settings\x1b[0m',
        'neurondb.model_path = \'/var/lib/models\' # ONNX model directory',
        'neurondb.inference_threads = 4           # Parallel inference threads',
        '',
        'EOF',
        '\x1b[32m✓ Configuration added\x1b[0m'
      ]
    },
    {
      command: 'sudo systemctl restart postgresql',
      output: [
        '\x1b[33mRestarting PostgreSQL...\x1b[0m',
        '● postgresql.service - PostgreSQL 16 database server',
        '   Loaded: loaded',
        '   Active: active (running) since Thu 2025-10-31 12:00:00 UTC',
        '',
        '\x1b[32m✓ PostgreSQL restarted successfully\x1b[0m',
        '\x1b[32m✓ NeurondB extension loaded\x1b[0m'
      ]
    },
    {
      command: 'psql -d postgres -c "CREATE EXTENSION neurondb; SELECT neurondb_version();"',
      output: [
        'CREATE EXTENSION',
        '',
        '    neurondb_version    ',
        '------------------------',
        ' NeurondB 1.0.0 (PG 16)',
        '(1 row)',
        '',
        '\x1b[32m✓ NeurondB extension installed successfully\x1b[0m',
        '\x1b[36mAvailable: 100+ SQL functions, 20+ operators, 5 data types\x1b[0m'
      ]
    }
  ]

  // Vector Operations Tab Commands
  const vectorCommands = [
    {
      command: 'psql -d vectordb',
      output: ['psql (16.3)', 'Type "help" for help.', ''],
      isShellCommand: true,
      entersPsql: true
    },
    {
      command: 'SELECT \'[1,2,3]\'::vector + \'[4,5,6]\'::vector AS addition;',
      output: [
        '  addition  ',
        '------------',
        ' [5,7,9]',
        '(1 row)',
        '',
        '\x1b[36m-- Vector addition: element-wise sum\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT vector_l2_distance(\'[1,0,0]\'::vector, \'[0,1,0]\'::vector) AS euclidean;',
      output: [
        '  euclidean  ',
        '-------------',
        ' 1.41421356',
        '(1 row)',
        '',
        '\x1b[36m-- L2 (Euclidean) distance between vectors\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT vector_cosine_distance(\'[1,0,0]\'::vector, \'[1,0,0]\'::vector) AS cosine;',
      output: [
        '  cosine  ',
        '----------',
        ' 0.000000',
        '(1 row)',
        '',
        '\x1b[36m-- Cosine distance: 0 means identical direction\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT quantize_vector_i8(\'[0.5, 0.3, -0.2, 0.8]\'::vector) AS int8_quantized;',
      output: [
        '      int8_quantized      ',
        '-------------------------',
        ' \\x7f4ccc19ff',
        '(1 row)',
        '',
        '\x1b[36m-- 8x compression: float32 → int8\x1b[0m',
        '\x1b[32m-- Memory saved: 75% reduction\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'CREATE TABLE products (id INT, name TEXT, features vector(128));',
      output: [
        'CREATE TABLE',
        '',
        '\x1b[36m-- Product feature vectors for similarity search\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'INSERT INTO products VALUES (1, \'Laptop\', array_fill(random()::float, ARRAY[128])::float[]::vector), (2, \'Phone\', array_fill(random()::float, ARRAY[128])::float[]::vector);',
      output: [
        'INSERT 0 2',
        '',
        '\x1b[32m-- 2 products with 128-dim feature vectors\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT name, features <-> (SELECT features FROM products WHERE id = 1) AS similarity FROM products ORDER BY similarity;',
      output: [
        '  name   | similarity',
        '---------+------------',
        ' Laptop  |  0.000000',
        ' Phone   |  1.234567',
        '(2 rows)',
        '',
        '\x1b[36m-- Finding similar products using vector distance\x1b[0m'
      ],
      isPsqlCommand: true
    }
  ]

  // ML Algorithms Tab Commands
  const mlCommands = [
    {
      command: 'psql -d vectordb',
      output: ['psql (16.3)', 'Type "help" for help.', ''],
      isShellCommand: true,
      entersPsql: true
    },
    {
      command: 'CREATE TABLE customer_data (id INT, features vector(10));',
      output: ['CREATE TABLE', '', '\x1b[36m-- Table for ML algorithms demo\x1b[0m'],
      isPsqlCommand: true
    },
    {
      command: 'INSERT INTO customer_data SELECT i, array_fill(random()::float, ARRAY[10])::float[]::vector FROM generate_series(1, 500) i;',
      output: [
        'INSERT 0 500',
        '',
        '\x1b[32m-- 500 customer feature vectors generated\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT cluster_kmeans(\'customer_data\', \'features\', 5, 100) AS kmeans_result;',
      output: [
        '                kmeans_result                ',
        '---------------------------------------------',
        ' {"clusters": 5, "iterations": 23,',
        '  "inertia": 45.67, "converged": true}',
        '(1 row)',
        '',
        '\x1b[36m-- K-Means clustering: 5 customer segments identified\x1b[0m',
        '\x1b[36m-- Converged in 23 iterations\x1b[0m',
        '\x1b[32m-- Algorithm: Lloyd\'s K-Means with k-means++ initialization\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT id, cluster_id, centroid_distance FROM neurondb_cluster_assignments(\'customer_data\', \'features\', 5) LIMIT 5;',
      output: [
        ' id | cluster_id | centroid_distance',
        '----+------------+------------------',
        '  1 |      3     |       0.234',
        '  2 |      1     |       0.456',
        '  3 |      3     |       0.189',
        '  4 |      5     |       0.678',
        '  5 |      2     |       0.345',
        '(5 rows)',
        '',
        '\x1b[36m-- Each customer assigned to nearest cluster\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT detect_outliers(\'customer_data\', \'features\', 0.95) AS outlier_count;',
      output: [
        ' outlier_count',
        '---------------',
        '      12',
        '(1 row)',
        '',
        '\x1b[36m-- Outlier Detection: 12 anomalous customers (2.4%)\x1b[0m',
        '\x1b[36m-- Algorithm: Isolation Forest with 95% confidence\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT reduce_dimensionality_pca(\'customer_data\', \'features\', 3) AS pca_result;',
      output: [
        '                     pca_result                     ',
        '-------------------------------------------------------',
        ' {"components": 3, "explained_variance": [0.45, 0.23, 0.12],',
        '  "total_variance_explained": 0.80}',
        '(1 row)',
        '',
        '\x1b[36m-- PCA: Reduced 10 → 3 dimensions\x1b[0m',
        '\x1b[36m-- Retained 80% of variance\x1b[0m',
        '\x1b[32m-- Algorithm: Singular Value Decomposition (SVD)\x1b[0m'
      ],
      isPsqlCommand: true
    }
  ]

  // Embeddings Tab Commands
  const embeddingCommands = [
    {
      command: 'psql -d vectordb',
      output: ['psql (16.3)', 'Type "help" for help.', ''],
      isShellCommand: true,
      entersPsql: true
    },
    {
      command: 'SELECT embed_text(\'artificial intelligence\') AS embedding;',
      output: [
        '                         embedding                          ',
        '------------------------------------------------------------',
        ' [0.234,-0.891,0.456,0.123,-0.678,...] (384 dimensions)',
        '(1 row)',
        '',
        '\x1b[36m-- Text → Vector embedding using all-MiniLM-L6-v2\x1b[0m',
        '\x1b[36m-- Model: 384 dimensions, optimized for semantic search\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT embed_text(\'machine learning\', \'all-mpnet-base-v2\') AS embedding;',
      output: [
        '                         embedding                          ',
        '------------------------------------------------------------',
        ' [0.145,-0.723,0.891,0.234,...] (768 dimensions)',
        '(1 row)',
        '',
        '\x1b[36m-- Higher quality model: 768 dimensions\x1b[0m',
        '\x1b[32m-- Better accuracy for complex queries\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT unnest(embed_text_batch(ARRAY[\'AI\', \'ML\', \'DL\'])) AS batch_embeddings;',
      output: [
        '              batch_embeddings               ',
        '-----------------------------------------------',
        ' [0.456,0.234,...]  (384 dimensions)',
        ' [0.567,0.123,...]  (384 dimensions)',
        ' [0.678,0.345,...]  (384 dimensions)',
        '(3 rows)',
        '',
        '\x1b[36m-- Batch embedding: 3 texts → 3 vectors\x1b[0m',
        '\x1b[32m-- 5x faster than individual calls\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'CREATE TABLE articles (id INT, title TEXT, content TEXT, embedding vector(384));',
      output: [
        'CREATE TABLE',
        '',
        '\x1b[36m-- Articles table with embedding column\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'INSERT INTO articles VALUES (1, \'AI Basics\', \'Introduction to artificial intelligence\', embed_cached(\'Introduction to artificial intelligence\'));',
      output: [
        'INSERT 0 1',
        '',
        '\x1b[36m-- Embedding generated and cached for reuse\x1b[0m',
        '\x1b[32m-- Cache hit on next identical text: <1ms vs 50ms\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT title, embedding <-> embed_text(\'AI tutorial\') AS similarity FROM articles ORDER BY similarity LIMIT 3;',
      output: [
        '   title    | similarity',
        '------------+------------',
        ' AI Basics  |   0.234',
        '(1 row)',
        '',
        '\x1b[36m-- Semantic similarity search\x1b[0m',
        '\x1b[36m-- Lower distance = more similar\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT cache_key, model_name, access_count, hit_rate FROM neurondb_embedding_cache ORDER BY access_count DESC LIMIT 3;',
      output: [
        '           cache_key            |    model_name     | access_count | hit_rate',
        '------------------------------------+-------------------+--------------+---------',
        ' Introduction to artificial... | all-MiniLM-L6-v2  |     47       |  0.96',
        ' machine learning algorithms  | all-MiniLM-L6-v2  |     23       |  0.91',
        ' deep neural networks         | all-MiniLM-L6-v2  |     15       |  0.87',
        '(3 rows)',
        '',
        '\x1b[36m-- Embedding cache statistics\x1b[0m',
        '\x1b[32m-- 96% hit rate: significant performance boost\x1b[0m'
      ],
      isPsqlCommand: true
    }
  ]

  // GPU Acceleration Tab Commands
  const gpuCommands = [
    {
      command: 'psql -d vectordb',
      output: ['psql (16.3)', 'Type "help" for help.', ''],
      isShellCommand: true,
      entersPsql: true
    },
    {
      command: 'SELECT neurondb_gpu_info();',
      output: [
        '                     neurondb_gpu_info                      ',
        '------------------------------------------------------------',
        ' {"device": "NVIDIA RTX 4090", "memory": "24GB",',
        '  "compute_capability": "8.9", "cuda_version": "12.6",',
        '  "status": "available"}',
        '(1 row)',
        '',
        '\x1b[36m-- GPU detected and available for acceleration\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT neurondb_gpu_enable(true);',
      output: [
        ' neurondb_gpu_enable',
        '---------------------',
        ' GPU enabled',
        '(1 row)',
        '',
        '\x1b[32m-- GPU acceleration activated for current session\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT cluster_kmeans_gpu(\'customer_data\', \'features\', 10, 100);',
      output: [
        '                 cluster_kmeans_gpu                 ',
        '-------------------------------------------------------',
        ' {"clusters": 10, "iterations": 18, "inertia": 234.5,',
        '  "device": "GPU", "speedup": "23.4x"}',
        '(1 row)',
        '',
        '\x1b[36m-- GPU K-Means: 500 vectors, 10 clusters\x1b[0m',
        '\x1b[32m-- 23.4x speedup vs CPU (18ms vs 421ms)\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT vector_l2_distance_gpu(features, \'[0.5,0.3,...]\'::vector) FROM products ORDER BY 1 LIMIT 3;',
      output: [
        ' vector_l2_distance_gpu',
        '------------------------',
        '        0.234',
        '        0.567',
        '        0.891',
        '(3 rows)',
        '',
        '\x1b[36m-- Batch GPU distance calculation\x1b[0m',
        '\x1b[32m-- 100x faster for large batches\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT * FROM pg_stat_neurondb_gpu;',
      output: [
        ' backend_pid | queries | batches | avg_batch_size | avg_latency_ms | fallback_count',
        '-------------+---------+---------+----------------+----------------+----------------',
        '   12345     |   1847  |    92   |      8192      |      2.3       |       0',
        '(1 row)',
        '',
        '\x1b[36m-- GPU Statistics:\x1b[0m',
        '\x1b[36m   • 1847 GPU queries executed\x1b[0m',
        '\x1b[36m   • Avg batch: 8192 vectors\x1b[0m',
        '\x1b[36m   • Avg latency: 2.3ms\x1b[0m',
        '\x1b[32m   • Zero fallbacks to CPU ✓\x1b[0m'
      ],
      isPsqlCommand: true
    }
  ]

  // Hybrid Search Tab Commands  
  const hybridCommands = [
    {
      command: 'psql -d vectordb',
      output: ['psql (16.3)', 'Type "help" for help.', ''],
      isShellCommand: true,
      entersPsql: true
    },
    {
      command: 'CREATE TABLE knowledge_base (id SERIAL PRIMARY KEY, title TEXT, content TEXT, embedding vector(384), ts_vector tsvector);',
      output: [
        'CREATE TABLE',
        '',
        '\x1b[36m-- Table with both vector and full-text search columns\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'INSERT INTO knowledge_base (title, content, embedding, ts_vector) VALUES (\'PostgreSQL Performance\', \'Optimize queries with indexes and EXPLAIN\', embed_text(\'Optimize queries with indexes and EXPLAIN\'), to_tsvector(\'Optimize queries with indexes and EXPLAIN\'));',
      output: [
        'INSERT 0 1',
        '',
        '\x1b[36m-- Document with vector embedding + text index\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT * FROM hybrid_search(\'knowledge_base\', \'content\', \'embedding\', \'database optimization\', 10, 0.7, 0.3);',
      output: [
        ' id |        title         |              content              | vector_score | text_score | hybrid_score',
        '----+----------------------+-----------------------------------+--------------+------------+-------------',
        '  1 | PostgreSQL Performance| Optimize queries with indexes...  |     0.92     |    0.85    |     0.90',
        '(1 row)',
        '',
        '\x1b[36m-- Hybrid Search: 70% vector + 30% BM25 text search\x1b[0m',
        '\x1b[36m-- Combines semantic similarity with keyword matching\x1b[0m',
        '\x1b[32m-- Best of both: meaning + exact terms ✓\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT rerank_cross_encoder(\'What is PostgreSQL?\', ARRAY[\'PostgreSQL is a database\', \'MySQL is also a database\', \'Redis is a cache\'], \'ms-marco-MiniLM\', 3);',
      output: [
        ' idx | score ',
        '-----+-------',
        '  0  | 0.945',
        '  1  | 0.678',
        '  2  | 0.123',
        '(3 rows)',
        '',
        '\x1b[36m-- Cross-encoder reranking for higher precision\x1b[0m',
        '\x1b[32m-- Improved relevance: 94.5% vs 67.8% vs 12.3%\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT * FROM mmr_rerank(\'knowledge_base\', \'embedding\', embed_text(\'database\'), 20, 5, 0.7);',
      output: [
        ' id |  title   |   score   | diversity',
        '----+----------+-----------+-----------',
        '  1 | Doc A    |   0.923   |   1.000',
        '  5 | Doc E    |   0.856   |   0.834',
        ' 12 | Doc L    |   0.789   |   0.756',
        '(3 rows)',
        '',
        '\x1b[36m-- MMR (Maximal Marginal Relevance) reranking\x1b[0m',
        '\x1b[36m-- Balances relevance (70%) with diversity (30%)\x1b[0m',
        '\x1b[32m-- Avoids redundant results ✓\x1b[0m'
      ],
      isPsqlCommand: true
    }
  ]

  const usageCommands = [
    {
      command: 'psql -d vectordb',
      output: [
        'psql (16.3)',
        'Type "help" for help.',
        ''
      ],
      isShellCommand: true,
      entersPsql: true
    },
    {
      command: 'CREATE TABLE documents (id SERIAL PRIMARY KEY, title TEXT, content TEXT, embedding vector(384));',
      output: [
        'CREATE TABLE',
        '',
        '\x1b[36m-- Table created with vector column (384 dimensions)\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'INSERT INTO documents (title, content, embedding) VALUES (\'PostgreSQL Guide\', \'Learn PostgreSQL fundamentals\', embed_text(\'Learn PostgreSQL fundamentals\'));',
      output: [
        'INSERT 0 1',
        '',
        '\x1b[36m-- Automatic embedding generation using embed_text() function\x1b[0m',
        '\x1b[36m-- Model: all-MiniLM-L6-v2 (384-dimensional embeddings)\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'INSERT INTO documents (title, content, embedding) SELECT \'Doc \' || i, \'Content about topic \' || i, embed_text(\'Content about topic \' || i) FROM generate_series(1, 1000) i;',
      output: [
        'INSERT 0 1000',
        '',
        '\x1b[32m✓ 1000 documents inserted with embeddings\x1b[0m',
        '\x1b[36m-- Batch embedding generation completed\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'CREATE INDEX docs_embedding_idx ON documents USING hnsw (embedding vector_l2_ops) WITH (m = 16, ef_construction = 200);',
      output: [
        'CREATE INDEX',
        '',
        '\x1b[36m-- HNSW index parameters:\x1b[0m',
        '\x1b[36m   m = 16                (max connections per node)\x1b[0m',
        '\x1b[36m   ef_construction = 200 (build-time accuracy)\x1b[0m',
        '\x1b[36m-- Index will be built by neurandefrag background worker\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT title, content, embedding <-> embed_text(\'PostgreSQL database\') AS distance FROM documents ORDER BY embedding <-> embed_text(\'PostgreSQL database\') LIMIT 5;',
      output: [
        '       title       |           content            | distance ',
        '-------------------+------------------------------+----------',
        ' PostgreSQL Guide  | Learn PostgreSQL fundamentals|  0.125',
        ' Doc 42            | Content about topic 42       |  0.789',
        ' Doc 156           | Content about topic 156      |  0.823',
        ' Doc 891           | Content about topic 891      |  0.867',
        ' Doc 234           | Content about topic 234      |  0.901',
        '(5 rows)',
        '',
        '\x1b[36m-- Vector similarity search using L2 distance (<-> operator)\x1b[0m',
        '\x1b[32m-- Query executed in 2.3ms using HNSW index\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT * FROM hybrid_search(\'documents\', \'content\', \'embedding\', \'PostgreSQL AI database\', 5, 0.7, 0.3);',
      output: [
        ' id |      title       |            content            | vector_score | text_score | hybrid_score',
        '----+------------------+-------------------------------+--------------+------------+-------------',
        '  1 | PostgreSQL Guide | Learn PostgreSQL fundamentals |     0.95     |    0.85    |     0.92',
        ' 42 | Doc 42           | Content about topic 42        |     0.76     |    0.12    |     0.57',
        '156 | Doc 156          | Content about topic 156       |     0.71     |    0.08    |     0.52',
        '(3 rows)',
        '',
        '\x1b[36m-- Hybrid search: 70% vector + 30% full-text (BM25)\x1b[0m',
        '\x1b[36m-- Combines semantic similarity with keyword matching\x1b[0m',
        '\x1b[32m-- Query executed in 5.8ms\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT model_name, input_dim, output_dim, status FROM neurondb_models();',
      output: [
        '       model_name        | input_dim | output_dim | status ',
        '-------------------------+-----------+------------+--------',
        ' all-MiniLM-L6-v2        |     -     |    384     | loaded',
        ' bert-base-uncased       |     -     |    768     | loaded',
        ' cross-encoder/ms-marco  |     -     |      1     | loaded',
        '(3 rows)',
        '',
        '\x1b[36m-- ML models loaded for inference\x1b[0m',
        '\x1b[36m-- Models cached in shared memory for fast inference\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT * FROM neurondb_index_stats WHERE index_name = \'docs_embedding_idx\';',
      output: [
        '    index_name      | vectors | levels | ef_construction | m  | recall@10 | build_time',
        '--------------------+---------+--------+-----------------+----+-----------+-----------',
        ' docs_embedding_idx |   1001  |   3    |       200       | 16 |   0.995   |   1.234s',
        '(1 row)',
        '',
        '\x1b[36m-- Index Statistics:\x1b[0m',
        '\x1b[36m   • 1001 vectors indexed\x1b[0m',
        '\x1b[36m   • 3-level HNSW graph structure\x1b[0m',
        '\x1b[36m   • 99.5% recall@10 (excellent accuracy)\x1b[0m',
        '\x1b[32m-- Index quality: Excellent ✓\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT worker_name, status, last_run, jobs_processed, avg_runtime_ms FROM neurondb_worker_status();',
      output: [
        '  worker_name  | status  |      last_run       | jobs_processed | avg_runtime_ms',
        '---------------+---------+---------------------+----------------+---------------',
        ' neuranq       | running | 2025-10-31 12:30:15 |      427       |      12.3',
        ' neuranmon     | running | 2025-10-31 12:30:10 |       89       |      45.7',
        ' neurandefrag  | running | 2025-10-31 12:28:00 |       23       |     234.8',
        '(3 rows)',
        '',
        '\x1b[36m-- Background Workers:\x1b[0m',
        '\x1b[36m   • neuranq:       Async embedding generation queue\x1b[0m',
        '\x1b[36m   • neuranmon:     Auto-tuning index parameters\x1b[0m',
        '\x1b[36m   • neurandefrag:  Index maintenance and optimization\x1b[0m',
        '\x1b[32m-- All workers healthy ✓\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'EXPLAIN ANALYZE SELECT * FROM documents ORDER BY embedding <-> embed_text(\'machine learning\') LIMIT 10;',
      output: [
        '                                    QUERY PLAN',
        '--------------------------------------------------------------------------------',
        ' Limit  (cost=0.00..8.45 rows=10) (actual time=0.234..1.567 rows=10 loops=1)',
        '   ->  Index Scan using docs_embedding_idx on documents',
        '       (cost=0.00..845.23 rows=1001) (actual time=0.232..1.564 rows=10 loops=1)',
        '       Order By: (embedding <-> \'[0.123,0.456,...]\'::vector)',
        '       Index Condition: (embedding IS NOT NULL)',
        ' Planning Time: 0.123 ms',
        ' Execution Time: 1.589 ms',
        '(6 rows)',
        '',
        '\x1b[36m-- HNSW index scan used (excellent performance)\x1b[0m',
        '\x1b[32m-- Total time: 1.712ms for similarity search over 1000 vectors\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT * FROM neurondb_cache_stats();',
      output: [
        '  cache_type   | size_mb | hit_rate | evictions | avg_inference_ms',
        '---------------+---------+----------+-----------+-----------------',
        ' embeddings    |   45.2  |  0.956   |    123    |       8.2',
        ' models        |  128.5  |  0.998   |      0    |        -',
        ' index_pages   |   67.8  |  0.923   |    456    |        -',
        '(3 rows)',
        '',
        '\x1b[36m-- Cache Performance:\x1b[0m',
        '\x1b[36m   • Embedding cache: 95.6% hit rate\x1b[0m',
        '\x1b[36m   • Model cache: 99.8% hit rate (models stay in memory)\x1b[0m',
        '\x1b[36m   • Index page cache: 92.3% hit rate\x1b[0m',
        '\x1b[32m-- Overall cache efficiency: Excellent ✓\x1b[0m'
      ],
      isPsqlCommand: true
    }
  ]

  // Get commands based on active tab
  const getCommands = () => {
    switch (activeTab) {
      case 'build': return buildCommands
      case 'vectors': return vectorCommands
      case 'ml': return mlCommands
      case 'embeddings': return embeddingCommands
      case 'gpu': return gpuCommands
      case 'hybrid': return hybridCommands
      case 'usage':
      default: return usageCommands
    }
  }

  // Cleanup all intervals and timeouts
  const cleanup = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    timeoutRefs.current.forEach(timeout => clearTimeout(timeout))
    timeoutRefs.current = []
  }, [])

  // Cursor blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(prev => !prev)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [commandHistory, currentCommand])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanup()
    }
  }, [cleanup])

  // Type command effect with cleanup
  const typeCommand = useCallback((command: string, onComplete: () => void) => {
    setIsTyping(true)
    setCurrentCommand('')
    let index = 0
    
    const interval = setInterval(() => {
      index++
      setCurrentCommand(command.slice(0, index))
      
      if (index > command.length) {
        clearInterval(interval)
        setIsTyping(false)
        onComplete()
      }
    }, baseTimings.typeSpeed / speedMultiplier)
    
    intervalRef.current = interval
  }, [speedMultiplier, baseTimings.typeSpeed])

  // Show output with delay and cleanup
  const showOutput = useCallback((output: string[], onComplete: () => void) => {
    let outputIndex = 0
    
    const interval = setInterval(() => {
      outputIndex++
      const currentOutput = output.slice(0, outputIndex)
      
      setCommandHistory(prev => {
        if (prev.length === 0) return prev
        return [
          ...prev.slice(0, -1),
          {
            ...prev[prev.length - 1],
            output: currentOutput
          }
        ]
      })
      
      if (outputIndex >= output.length) {
        clearInterval(interval)
        onComplete()
      }
    }, baseTimings.outputDelay / speedMultiplier)
    
    intervalRef.current = interval
  }, [speedMultiplier, baseTimings.outputDelay])

  // Run demo sequence with proper cleanup
  const runDemo = useCallback(() => {
    if (isRunning) return
    
    // Cleanup any existing intervals/timeouts
    cleanup()
    
    setIsRunning(true)
    setCommandHistory([])
    setCurrentCommand('')
    
    let commandIndex = 0
    const commands = getCommands()
    
    const runNextCommand = () => {
      if (commandIndex >= commands.length) {
        setIsRunning(false)
        cleanup()
        return
      }
      
      const cmd = commands[commandIndex]
      
      // Check if this command enters psql mode
      if ((cmd as any).entersPsql) {
        setInPsqlMode(true)
      }
      
      // Type the command first (no history entry yet)
      typeCommand(cmd.command, () => {
        // After typing completes, add to history with output
        setCommandHistory(prev => [
          ...prev,
          {
            command: cmd.command,
            output: [],
            timestamp: new Date().toLocaleTimeString(),
            isPsqlCommand: (cmd as any).isPsqlCommand,
            isShellCommand: (cmd as any).isShellCommand
          }
        ])
        
        // Show output after command is added to history
        const timeout1 = setTimeout(() => {
          showOutput(cmd.output, () => {
            // Move to next command after output is shown
            const timeout2 = setTimeout(() => {
              commandIndex++
              runNextCommand()
            }, baseTimings.betweenCommands / speedMultiplier)
            timeoutRefs.current.push(timeout2)
          })
        }, baseTimings.commandDelay / speedMultiplier)
        timeoutRefs.current.push(timeout1)
      })
    }
    
    runNextCommand()
  }, [isRunning, activeTab, buildCommands, usageCommands, typeCommand, showOutput, cleanup, speedMultiplier, baseTimings])

  const stopDemo = useCallback(() => {
    cleanup()
    setIsRunning(false)
    setCurrentCommand('')
    setIsTyping(false)
  }, [cleanup])

  const resetDemo = useCallback(() => {
    cleanup()
    setIsRunning(false)
    setCommandHistory([])
    setCurrentCommand('')
    setIsTyping(false)
  }, [cleanup])

  const copyToClipboard = useCallback(() => {
    const text = commandHistory
      .map(cmd => `$ ${cmd.command}\n${cmd.output.join('\n')}`)
      .join('\n\n')
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [commandHistory])

  return (
    <div className="bg-black rounded-lg shadow-2xl border border-gray-700 overflow-hidden">
      {/* Terminal Header */}
      <div className="bg-gray-800 px-4 py-3 border-b border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-accent-500 rounded-full"></div>
            <span className="text-gray-300 text-sm ml-4 font-mono">neurondb-demo</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={copyToClipboard}
              disabled={commandHistory.length === 0}
              className={`p-2 rounded transition-all ${
                copied 
                  ? 'bg-green-600 text-white' 
                  : commandHistory.length === 0
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'hover:bg-gray-700 text-gray-400 hover:text-white'
              }`}
              title={copied ? 'Copied!' : 'Copy to clipboard'}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={resetDemo}
              disabled={isRunning}
              className={`p-2 rounded transition-all ${
                isRunning 
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                  : 'hover:bg-gray-700 text-gray-400 hover:text-white'
              }`}
              title="Reset demo"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => {
              setActiveTab('build')
              resetDemo()
            }}
            disabled={isRunning}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'build'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
            } ${isRunning ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            Build
          </button>
          <button
            onClick={() => {
              setActiveTab('usage')
              resetDemo()
            }}
            disabled={isRunning}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'usage'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
            } ${isRunning ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            Usage
          </button>
          <button
            onClick={() => {
              setActiveTab('vectors')
              resetDemo()
            }}
            disabled={isRunning}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'vectors'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
            } ${isRunning ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            Vectors
          </button>
          <button
            onClick={() => {
              setActiveTab('ml')
              resetDemo()
            }}
            disabled={isRunning}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'ml'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
            } ${isRunning ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            ML Algos
          </button>
          <button
            onClick={() => {
              setActiveTab('embeddings')
              resetDemo()
            }}
            disabled={isRunning}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'embeddings'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
            } ${isRunning ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            Embeddings
          </button>
          <button
            onClick={() => {
              setActiveTab('gpu')
              resetDemo()
            }}
            disabled={isRunning}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'gpu'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
            } ${isRunning ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            GPU
          </button>
          <button
            onClick={() => {
              setActiveTab('hybrid')
              resetDemo()
            }}
            disabled={isRunning}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'hybrid'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
            } ${isRunning ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            Hybrid
          </button>
        </div>
      </div>

      {/* Terminal Content */}
      <div 
        ref={terminalRef}
        className="h-[500px] overflow-y-auto p-4 font-mono text-sm bg-black text-left"
        style={{ 
          fontFamily: 'JetBrains Mono, Fira Code, Monaco, Consolas, monospace',
          lineHeight: '1.6'
        }}
      >
        {/* Welcome Message */}
        {commandHistory.length === 0 && !isRunning && (
          <div className="text-gray-500 mb-4">
            <div className="text-cyan-400 text-base font-bold mb-2">
              NeurondB Interactive Demo Terminal
            </div>
            <div className="text-gray-400 text-xs">
              PostgreSQL extension for AI/ML with vector search, hybrid retrieval, and ONNX inference
            </div>
            <div className="text-gray-600 text-xs mt-2">
              Select a tab above and click "Run Demo" to begin
            </div>
          </div>
        )}

        {/* Command History */}
        {commandHistory.map((cmd, index) => (
          <div key={index} className="mb-3">
            {/* Command prompt with timestamp */}
            <div className="flex items-start gap-2 mb-1 font-mono">
              {cmd.isPsqlCommand ? (
                <>
                  <span className="text-emerald-400 font-bold whitespace-nowrap">vectordb=#</span>
                  <span className="text-gray-200 break-all">{cmd.command}</span>
                </>
              ) : (
                <>
                  <span className="text-emerald-400 font-bold">$</span>
                  <span className="text-gray-200 ml-2 break-all">{cmd.command}</span>
                </>
              )}
            </div>
            
            {/* Output with ANSI color support */}
            {cmd.output.map((line, lineIndex) => {
              // Parse ANSI color codes (simplified)
              const renderLine = (text: string) => {
                // Green text
                if (text.includes('\x1b[32m')) {
                  const parts = text.split(/\x1b\[32m|\x1b\[0m/)
                  return (
                    <span>
                      {parts.map((part, i) => 
                        i % 2 === 1 ? <span key={i} className="text-emerald-400">{part}</span> : <span key={i} className="text-gray-300">{part}</span>
                      )}
                    </span>
                  )
                }
                // Yellow text
                if (text.includes('\x1b[33m')) {
                  const parts = text.split(/\x1b\[33m|\x1b\[0m/)
                  return (
                    <span>
                      {parts.map((part, i) => 
                        i % 2 === 1 ? <span key={i} className="text-yellow-400">{part}</span> : <span key={i} className="text-gray-300">{part}</span>
                      )}
                    </span>
                  )
                }
                // Cyan text
                if (text.includes('\x1b[36m')) {
                  const parts = text.split(/\x1b\[36m|\x1b\[0m/)
                  return (
                    <span>
                      {parts.map((part, i) => 
                        i % 2 === 1 ? <span key={i} className="text-cyan-400">{part}</span> : <span key={i} className="text-gray-300">{part}</span>
                      )}
                    </span>
                  )
                }
                // Default
                return <span className="text-gray-300">{text}</span>
              }

              return (
                <div key={lineIndex} className="font-mono text-sm pl-4 whitespace-pre">
                  {renderLine(line)}
                </div>
              )
            })}
          </div>
        ))}

        {/* Current Command Being Typed */}
        {isTyping && (
          <div className="flex items-center gap-2 font-mono">
            {inPsqlMode ? (
              <>
                <span className="text-emerald-400 font-bold whitespace-nowrap">vectordb=#</span>
                <span className="text-gray-200 ml-2">{currentCommand}</span>
                <span className={`inline-block w-2 h-4 bg-emerald-400 ml-1 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></span>
              </>
            ) : (
              <>
                <span className="text-emerald-400 font-bold">$</span>
                <span className="text-gray-200 ml-2">{currentCommand}</span>
                <span className={`inline-block w-2 h-4 bg-emerald-400 ml-1 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></span>
              </>
            )}
          </div>
        )}

        {/* Idle Prompt */}
        {!isRunning && !isTyping && commandHistory.length > 0 && (
          <div className="flex items-center gap-2 mt-2 font-mono">
            {inPsqlMode ? (
              <>
                <span className="text-emerald-400 font-bold whitespace-nowrap">vectordb=#</span>
                <span className={`inline-block w-2 h-4 bg-emerald-400 ml-1 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></span>
              </>
            ) : (
              <>
                <span className="text-emerald-400 font-bold">$</span>
                <span className={`inline-block w-2 h-4 bg-emerald-400 ml-1 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Terminal Controls */}
      <div className="bg-gray-800 px-4 py-3 border-t border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={runDemo}
              disabled={isRunning}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition-all shadow-lg ${
                isRunning 
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed shadow-none' 
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white hover:scale-105 shadow-emerald-600/30'
              }`}
            >
              <Play className="w-4 h-4" />
              {isRunning ? 'Running Demo...' : 'Run Demo'}
            </button>
            
            <button
              onClick={stopDemo}
              disabled={!isRunning}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition-all ${
                !isRunning 
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                  : 'bg-red-600 hover:bg-red-700 text-white hover:scale-105'
              }`}
            >
              <Square className="w-4 h-4" />
              Stop
            </button>

            <button
              onClick={resetDemo}
              disabled={isRunning}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition-all ${
                isRunning 
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>

            <div className="flex items-center gap-3 ml-6 pl-6 border-l border-gray-700">
              <span className="text-gray-400 text-sm font-medium">Speed:</span>
              <div className="flex gap-2">
                {[1, 2, 3].map((speed) => (
                  <button
                    key={speed}
                    onClick={() => setSpeedMultiplier(speed)}
                    disabled={isRunning}
                    className={`px-3 py-1.5 rounded-md text-sm font-mono font-bold transition-all ${
                      speedMultiplier === speed
                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                        : 'bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white'
                    } ${isRunning ? 'cursor-not-allowed opacity-50' : ''}`}
                  >
                    {speed}×
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="text-sm flex items-center gap-3">
            {isRunning ? (
              <span className="flex items-center gap-2 text-emerald-400">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="font-semibold">Running at {speedMultiplier}× speed</span>
              </span>
            ) : (
              <span className="text-gray-500">
                {commandHistory.length > 0 
                  ? `Demo complete (${commandHistory.length} commands executed)` 
                  : 'Ready'}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NeurondBDemoTerminal

