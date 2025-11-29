'use client'

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
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
  // Two-level tab structure: mainTab -> subTab
  const [activeMainTab, setActiveMainTab] = useState<'build' | 'vectors' | 'ml' | 'embeddings' | 'llm' | 'gpu' | 'hybrid' | 'advanced' | 'neuronagent' | 'neuronmcp'>('build')
  const [activeSubTab, setActiveSubTab] = useState<string>('')

  // Comprehensive tab structure covering all NeuronDB features
  const tabStructure = useMemo(() => ({
    build: { subTabs: [], defaultSubTab: '' },
    vectors: { 
      subTabs: ['operations', 'indexing', 'distance', 'quantization'],
      defaultSubTab: 'operations'
    },
    ml: { 
      subTabs: ['regression', 'classification', 'clustering', 'boosting', 'neural', 'timeseries', 'automl', 'recommender'],
      defaultSubTab: 'regression'
    },
    embeddings: {
      subTabs: ['text', 'batch', 'config', 'hf_models', 'multimodal'],
      defaultSubTab: 'text'
    },
    llm: {
      subTabs: ['integration', 'reranking', 'rag'],
      defaultSubTab: 'integration'
    },
    gpu: { subTabs: [], defaultSubTab: '' },
    hybrid: { subTabs: [], defaultSubTab: '' },
    advanced: {
      subTabs: ['sparse', 'quantization', 'workers', 'onnx', 'metrics', 'planner', 'types'],
      defaultSubTab: 'sparse'
    },
    neuronagent: { subTabs: [], defaultSubTab: '' },
    neuronmcp: { subTabs: [], defaultSubTab: '' }
  }), [])

  // Initialize sub-tab when main tab changes
  useEffect(() => {
    const structure = tabStructure[activeMainTab]
    if (structure.subTabs.length > 0) {
      setActiveSubTab(structure.defaultSubTab)
    } else {
      setActiveSubTab('')
    }
  }, [activeMainTab, tabStructure])
  const [copied, setCopied] = useState(false)
  const [inPsqlMode, setInPsqlMode] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const timeoutRefs = useRef<NodeJS.Timeout[]>([])

  // Base timing values (in ms)
  const baseTimings = useMemo(() => ({
    typeSpeed: 50,      // Faster typing for better UX
    commandDelay: 1000,  // Shorter delays
    outputDelay: 200,   // Faster output display
    betweenCommands: 1500 // Less wait between commands
  }), [])

  // NeurondB-specific demo commands and their outputs
  const buildCommands = useMemo(() => [
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
      command: 'cat << EOF >> /etc/postgresql/18/main/postgresql.conf',
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
        '● postgresql.service - PostgreSQL 18 database server',
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
        ' NeurondB 1.0.0 (PG 18)',
        '(1 row)',
        '',
        '\x1b[32m✓ NeurondB extension installed successfully\x1b[0m',
        '\x1b[36mAvailable: 100+ SQL functions, 20+ operators, 5 data types\x1b[0m'
      ]
    }
  ], [])

  // Vector Operations Sub-Tab Commands (from 027_vector_basic.sql, 009_vector_ops_basic.sql)
  const vectorOperationsCommands = useMemo(() => [
    {
      command: 'psql -d neurondb',
      output: ['psql (18.3)', 'Type "help" for help.', ''],
      isShellCommand: true,
      entersPsql: true
    },
    {
      command: 'SELECT vector \'[1,2,3]\' AS a1, vector \'{1,2,3}\' AS a2, array_to_vector(ARRAY[4,5,6]::float8[]) AS a3, array_to_vector_float4(ARRAY[1.0,2.0,3.0]::real[]) AS a4;',
      output: [
        '  a1   |  a2   |  a3   |  a4',
        '-------+-------+-------+-------',
        ' [1,2,3] | [1,2,3] | [4,5,6] | [1,2,3]',
        '(1 row)',
        '',
        '\x1b[36m-- Vector creation: bracket, brace, and array formats\x1b[0m',
        '\x1b[32m-- Supports float4, float8, and integer arrays\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT vector_dims(\'[1,2,3,4,5]\'::vector) AS dims, vector_norm(\'[3,4]\'::vector) AS norm, vector_normalize(\'[1,2,3,4,5]\'::vector) AS normalized;',
      output: [
        ' dims | norm |           normalized',
        '------+------+------------------------',
        '  5   | 5.0  | [0.1348,0.2697,0.4045,...]',
        '(1 row)',
        '',
        '\x1b[36m-- Vector properties: dimensions, L2 norm, normalization\x1b[0m',
        '\x1b[32m-- Normalized vector has unit length (norm = 1.0)\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT vector_add(\'[1,2,3]\'::vector, \'[4,5,6]\'::vector) AS addition, vector_sub(\'[4,5,6]\'::vector, \'[1,2,3]\'::vector) AS subtraction, vector_mul(\'[1,2,3]\'::vector, 2.0) AS scalar_multiplication;',
      output: [
        '  addition  | subtraction | scalar_multiplication',
        '------------+-------------+----------------------',
        ' [5,7,9]    | [3,3,3]     | [2,4,6]',
        '(1 row)',
        '',
        '\x1b[36m-- Vector arithmetic: addition, subtraction, scalar multiplication\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT vector_concat(\'[1,2,3]\'::vector, \'[4,5,6]\'::vector) AS concatenated, vector_dims(vector_concat(\'[1,2,3]\'::vector, \'[4,5,6]\'::vector)) AS concat_dims;',
      output: [
        ' concatenated | concat_dims',
        '--------------+-------------',
        ' [1,2,3,4,5,6]|      6',
        '(1 row)',
        '',
        '\x1b[36m-- Vector concatenation: combine two vectors\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT vector_get(\'[9,8,7]\'::vector, 0) AS idx0, vector_get(\'[9,8,7]\'::vector, 2) AS idx2;',
      output: [
        ' idx0 | idx2',
        '------+------',
        '  9   |  7',
        '(1 row)',
        '',
        '\x1b[36m-- Element access: 0-based indexing\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT vector_set(\'[1,2,3]\'::vector, 0, 11) AS set0, vector_set(\'[1,2,3]\'::vector, 2, 33) AS set2;',
      output: [
        '  set0   |  set2',
        '---------+--------',
        ' [11,2,3] | [1,2,33]',
        '(1 row)',
        '',
        '\x1b[36m-- Element mutation: set specific indices\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT vector_to_array(\'[10,20,30]\'::vector) AS arr, array_to_vector(ARRAY[1.0,2.0,3.0]::real[]) AS vec, vector_to_array_float4(\'[10,20,30]\'::vector) AS arr_f4;',
      output: [
        '      arr       |   vec   |    arr_f4',
        '----------------+---------+-----------',
        ' {10,20,30}     | [1,2,3] | {10,20,30}',
        '(1 row)',
        '',
        '\x1b[36m-- Array ↔ Vector conversion (roundtrip)\x1b[0m',
        '\x1b[32m-- Supports float4, float8, and integer arrays\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT vector_cast_dimension(\'[1,2,3,4,5]\'::vector, 3) AS truncate, vector_cast_dimension(\'[1,2,3]\'::vector, 5) AS pad;',
      output: [
        ' truncate |    pad',
        '----------+--------',
        ' [1,2,3]  | [1,2,3,0,0]',
        '(1 row)',
        '',
        '\x1b[36m-- Dimension casting: truncate or pad vectors\x1b[0m'
      ],
      isPsqlCommand: true
    }
  ], [])

  // Vector Indexing Sub-Tab Commands (from 036_index_basic.sql)
  const vectorIndexingCommands = useMemo(() => [
    {
      command: 'psql -d neurondb',
      output: ['psql (18.3)', 'Type "help" for help.', ''],
      isShellCommand: true,
      entersPsql: true
    },
    {
      command: 'CREATE TABLE index_test_table (id SERIAL PRIMARY KEY, embedding vector(28), label integer);',
      output: [
        'CREATE TABLE',
        '',
        '\x1b[36m-- Table for vector indexing tests\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'INSERT INTO index_test_table (embedding, label) SELECT array_to_vector(ARRAY[random(), random(), random()]::float8[]) AS features, (random() * 10)::integer AS label FROM generate_series(1, 100);',
      output: [
        'INSERT 0 100',
        '',
        '\x1b[32m-- 100 test vectors inserted\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'CREATE INDEX idx_test_hnsw_default ON index_test_table USING hnsw (embedding vector_l2_ops);',
      output: [
        'CREATE INDEX',
        '',
        '\x1b[36m-- HNSW index with default parameters\x1b[0m',
        '\x1b[32m-- L2 (Euclidean) distance operator\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'CREATE INDEX idx_test_hnsw_custom ON index_test_table USING hnsw (embedding vector_l2_ops) WITH (m = 16, ef_construction = 200);',
      output: [
        'CREATE INDEX',
        '',
        '\x1b[36m-- HNSW index with custom parameters:\x1b[0m',
        '\x1b[36m   m = 16 (max connections per node)\x1b[0m',
        '\x1b[36m   ef_construction = 200 (build quality)\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'CREATE INDEX idx_test_hnsw_cosine ON index_test_table USING hnsw (embedding vector_cosine_ops) WITH (m = 16, ef_construction = 200);',
      output: [
        'CREATE INDEX',
        '',
        '\x1b[36m-- HNSW index for cosine distance\x1b[0m',
        '\x1b[32m-- Optimized for angular similarity\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'CREATE INDEX idx_test_ivf ON index_test_table USING ivf (embedding vector_l2_ops) WITH (lists = 10);',
      output: [
        'CREATE INDEX',
        '',
        '\x1b[36m-- IVF (Inverted File) index\x1b[0m',
        '\x1b[36m   lists = 10 (number of clusters)\x1b[0m',
        '\x1b[32m-- Faster build, good for large datasets\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT id, embedding <-> (SELECT embedding FROM index_test_table LIMIT 1) AS distance FROM index_test_table ORDER BY embedding <-> (SELECT embedding FROM index_test_table LIMIT 1) LIMIT 10;',
      output: [
        ' id | distance',
        '----+----------',
        '  1 |  0.000000',
        ' 23 |  0.234567',
        ' 45 |  0.456789',
        '(10 rows)',
        '',
        '\x1b[36m-- KNN query using HNSW index (<-> operator)\x1b[0m',
        '\x1b[32m-- Query executed in 0.5ms using index\x1b[0m'
      ],
      isPsqlCommand: true
    }
  ], [])

  // Vector Distance Sub-Tab Commands (from 030_core_basic.sql)
  const vectorDistanceCommands = useMemo(() => [
    {
      command: 'psql -d neurondb',
      output: ['psql (18.3)', 'Type "help" for help.', ''],
      isShellCommand: true,
      entersPsql: true
    },
    {
      command: 'SELECT vector_l2_distance(vector \'[1,0,0]\', vector \'[0,1,0]\') AS l2_distance, vector \'[3,0,0]\' <-> vector \'[0,4,0]\' AS l2_operator;',
      output: [
        ' l2_distance | l2_operator',
        '-------------+-------------',
        '  1.414214   |   5.000000',
        '(1 row)',
        '',
        '\x1b[36m-- L2 (Euclidean) distance: function and operator\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT vector_cosine_distance(vector \'[1,0,0]\', vector \'[0,1,0]\') AS cosine_distance, vector \'[1,0,0]\' <=> vector \'[0,1,0]\' AS cosine_operator;',
      output: [
        ' cosine_distance | cosine_operator',
        '-----------------+-----------------',
        '     1.000000    |    1.000000',
        '(1 row)',
        '',
        '\x1b[36m-- Cosine distance: orthogonal vectors (90°)\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT vector_inner_product(vector \'[1,2,3]\', vector \'[3,2,1]\') AS inner_product, vector \'[1,2,3]\' <#> vector \'[3,2,1]\' AS ip_operator;',
      output: [
        ' inner_product | ip_operator',
        '---------------+-------------',
        '     10.000000 |   10.000000',
        '(1 row)',
        '',
        '\x1b[36m-- Inner product (dot product): function and operator\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT vector_l1_distance(vector \'[5,1]\', vector \'[3,4]\') AS l1_distance, vector_hamming_distance(vector \'[1,0,0]\', vector \'[0,1,0]\') AS hamming;',
      output: [
        ' l1_distance | hamming',
        '-------------+---------',
        '   5.000000  |    2',
        '(1 row)',
        '',
        '\x1b[36m-- L1 (Manhattan) and Hamming distances\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT vector_chebyshev_distance(vector \'[1,2,3]\', vector \'[4,5,6]\') AS chebyshev, vector_minkowski_distance(vector \'[1,2]\', vector \'[4,5]\', 2.0) AS minkowski_p2;',
      output: [
        ' chebyshev | minkowski_p2',
        '-----------+--------------',
        '  3.000000 |   4.242641',
        '(1 row)',
        '',
        '\x1b[36m-- Chebyshev (L∞) and Minkowski (generalized) distances\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT vector_l2_distance(v, v) AS l2_identical, vector_cosine_distance(v, v) AS cosine_identical FROM (SELECT vector \'[1,2,3,4,5]\' AS v) t;',
      output: [
        ' l2_identical | cosine_identical',
        '--------------+------------------',
        '   0.000000   |     0.000000',
        '(1 row)',
        '',
        '\x1b[36m-- Identical vectors: zero distance (as expected)\x1b[0m'
      ],
      isPsqlCommand: true
    }
  ], [])

  // Vector Quantization Sub-Tab Commands (from 027_vector_basic.sql)
  const vectorQuantizationCommands = useMemo(() => [
    {
      command: 'psql -d neurondb',
      output: ['psql (18.3)', 'Type "help" for help.', ''],
      isShellCommand: true,
      entersPsql: true
    },
    {
      command: 'SELECT vector_quantize_fp16(vector \'[1.0,2.0,3.0]\') IS NOT NULL AS fp16_quantized;',
      output: [
        ' fp16_quantized',
        '----------------',
        '       t',
        '(1 row)',
        '',
        '\x1b[36m-- FP16 quantization: 2x compression (float32 → float16)\x1b[0m',
        '\x1b[32m-- Memory saved: 50% reduction\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT vector_quantize_int8(vector \'[1.0,2.0,3.0]\', vector \'[0.0,0.0,0.0]\', vector \'[10.0,20.0,30.0]\') IS NOT NULL AS int8_quantized;',
      output: [
        ' int8_quantized',
        '----------------',
        '       t',
        '(1 row)',
        '',
        '\x1b[36m-- INT8 quantization: 4x compression\x1b[0m',
        '\x1b[36m-- Requires min/max vectors for scaling\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT quantize_fp8_e4m3(vector \'[1.0,2.0,3.0,4.0,5.0]\') IS NOT NULL AS fp8_e4m3;',
      output: [
        ' fp8_e4m3',
        '----------',
        '    t',
        '(1 row)',
        '',
        '\x1b[36m-- FP8 E4M3 quantization: 4x compression\x1b[0m',
        '\x1b[36m-- 4 exponent bits, 3 mantissa bits\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT quantize_fp8_e5m2(vector \'[1.0,2.0,3.0,4.0,5.0]\') IS NOT NULL AS fp8_e5m2;',
      output: [
        ' fp8_e5m2',
        '----------',
        '    t',
        '(1 row)',
        '',
        '\x1b[36m-- FP8 E5M2 quantization: 4x compression\x1b[0m',
        '\x1b[36m-- 5 exponent bits, 2 mantissa bits (better range)\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'WITH quantized AS (SELECT quantize_fp8_e4m3(vector \'[1.0,2.0,3.0]\') AS q) SELECT dequantize_fp8(q) IS NOT NULL AS dequantized FROM quantized;',
      output: [
        ' dequantized',
        '-------------',
        '      t',
        '(1 row)',
        '',
        '\x1b[36m-- Dequantization: restore original vector\x1b[0m',
        '\x1b[32m-- Round-trip preserves 95%+ accuracy\x1b[0m'
      ],
      isPsqlCommand: true
    }
  ], [])

  // ML Algorithms Tab Commands (from actual test files)
  const mlCommands = useMemo(() => [
    {
      command: 'psql -d neurondb',
      output: ['psql (18.3)', 'Type "help" for help.', ''],
      isShellCommand: true,
      entersPsql: true
    },
    {
      command: 'CREATE TEMP TABLE sample_train_subset AS SELECT features, label FROM test_train_view LIMIT 1000;',
      output: [
        'SELECT 1000',
        '',
        '\x1b[36m-- Training dataset: 1000 samples with features and labels\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'CREATE TEMP TABLE model_temp AS SELECT neurondb.train(\'default\', \'linear_regression\', \'sample_train_subset\', \'label\', ARRAY[\'features\'], \'{}\'::jsonb)::integer AS model_id;',
      output: [
        'SELECT 1',
        '',
        '\x1b[36m-- Training Linear Regression model\x1b[0m',
        '\x1b[32m-- Model ID: 12345 (stored in neurondb.ml_models)\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT algorithm, n_samples, n_features, ROUND(mse::numeric, 6) AS mse, ROUND(r_squared::numeric, 6) AS r_squared FROM neurondb.ml_models m, model_temp t WHERE m.model_id = t.model_id;',
      output: [
        '     algorithm      | n_samples | n_features |   mse   | r_squared',
        '--------------------+-----------+------------+---------+----------',
        ' linear_regression  |   1000    |     28     | 0.234567|  0.856789',
        '(1 row)',
        '',
        '\x1b[36m-- Model metrics: MSE and R² score\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'CREATE TEMP TABLE metrics_temp AS SELECT neurondb.evaluate((SELECT model_id FROM model_temp), \'test_test_view\', \'features\', \'label\') AS metrics;',
      output: [
        'SELECT 1',
        '',
        '\x1b[36m-- Evaluating model on test set\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT \'MSE\' AS metric, ROUND((metrics->>\'mse\')::numeric, 6)::text AS value FROM metrics_temp UNION ALL SELECT \'RMSE\', ROUND((metrics->>\'rmse\')::numeric, 6)::text FROM metrics_temp UNION ALL SELECT \'R²\', ROUND((metrics->>\'r_squared\')::numeric, 6)::text FROM metrics_temp ORDER BY metric;',
      output: [
        ' metric |  value',
        '--------+--------',
        ' MSE    | 0.234567',
        ' R²     | 0.856789',
        ' RMSE   | 0.484321',
        '(3 rows)',
        '',
        '\x1b[36m-- Evaluation metrics on test set\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'CREATE TEMP TABLE rf_model AS SELECT neurondb.train(\'default\', \'random_forest\', \'sample_train_subset\', \'label\', ARRAY[\'features\'], \'{"n_trees": 3}\'::jsonb)::integer AS model_id;',
      output: [
        'SELECT 1',
        '',
        '\x1b[36m-- Training Random Forest with 3 trees\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT \'Accuracy\' AS metric, ROUND((metrics->>\'accuracy\')::numeric, 4) AS value FROM (SELECT neurondb.evaluate((SELECT model_id FROM rf_model), \'test_test_view\', \'features\', \'label\') AS metrics) m UNION ALL SELECT \'Precision\', ROUND((metrics->>\'precision\')::numeric, 4) FROM (SELECT neurondb.evaluate((SELECT model_id FROM rf_model), \'test_test_view\', \'features\', \'label\') AS metrics) m;',
      output: [
        '  metric   | value',
        '-----------+-------',
        ' Accuracy  | 0.9234',
        ' Precision | 0.9156',
        '(2 rows)',
        '',
        '\x1b[36m-- Random Forest classification metrics\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'CREATE TEMP TABLE kmeans_model AS SELECT train_kmeans_model_id(\'sample_train_subset\', \'features\', 3, 100) AS model_id;',
      output: [
        'SELECT 1',
        '',
        '\x1b[36m-- Training K-Means clustering (k=3, max_iter=100)\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT \'Inertia\' AS metric, ROUND((metrics->>\'inertia\')::numeric, 6)::text AS value FROM (SELECT evaluate_kmeans_by_model_id((SELECT model_id FROM kmeans_model), \'test_test_view\', \'features\') AS metrics) m UNION ALL SELECT \'N_Clusters\', (metrics->>\'n_clusters\')::text FROM (SELECT evaluate_kmeans_by_model_id((SELECT model_id FROM kmeans_model), \'test_test_view\', \'features\') AS metrics) m;',
      output: [
        '   metric    |  value',
        '-------------+--------',
        ' Inertia     | 45.234567',
        ' N_Clusters  | 3',
        '(2 rows)',
        '',
        '\x1b[36m-- K-Means clustering evaluation\x1b[0m',
        '\x1b[32m-- Lower inertia = better clustering\x1b[0m'
      ],
      isPsqlCommand: true
    }
  ], [])

  // Embeddings Tab Commands
  const embeddingCommands = useMemo(() => [
    {
      command: 'psql -d neurondb',
      output: ['psql (18.3)', 'Type "help" for help.', ''],
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
  ], [])

  // GPU Acceleration Tab Commands (from 010_gpu_info_basic.sql)
  const gpuCommands = useMemo(() => [
    {
      command: 'psql -d neurondb',
      output: ['psql (18.3)', 'Type "help" for help.', ''],
      isShellCommand: true,
      entersPsql: true
    },
    {
      command: 'SELECT neurondb_gpu_enable() AS gpu_enabled;',
      output: [
        ' gpu_enabled',
        '-------------',
        '      t',
        '(1 row)',
        '',
        '\x1b[36m-- GPU acceleration enabled for current session\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT * FROM neurondb_gpu_info();',
      output: [
        ' device_name | memory_gb | compute_capability | cuda_version | status',
        '-------------+-----------+--------------------+--------------+--------',
        ' RTX 4090    |    24     |        8.9         |    12.6      | available',
        '(1 row)',
        '',
        '\x1b[36m-- GPU Information:\x1b[0m',
        '\x1b[36m   • Device: NVIDIA RTX 4090\x1b[0m',
        '\x1b[36m   • Memory: 24GB\x1b[0m',
        '\x1b[36m   • Compute Capability: 8.9\x1b[0m',
        '\x1b[36m   • CUDA Version: 12.6\x1b[0m',
        '\x1b[32m   • Status: Available ✓\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT * FROM neurondb_gpu_stats();',
      output: [
        ' queries | batches | avg_batch_size | avg_latency_ms | fallback_count',
        '---------+---------+----------------+----------------+----------------',
        '  1847   |   92    |      8192       |      2.3       |       0',
        '(1 row)',
        '',
        '\x1b[36m-- GPU Statistics:\x1b[0m',
        '\x1b[36m   • 1847 GPU queries executed\x1b[0m',
        '\x1b[36m   • 92 batches processed\x1b[0m',
        '\x1b[36m   • Avg batch size: 8192 vectors\x1b[0m',
        '\x1b[36m   • Avg latency: 2.3ms\x1b[0m',
        '\x1b[32m   • Zero fallbacks to CPU ✓\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT neurondb_llm_gpu_available() AS llm_gpu_available;',
      output: [
        ' llm_gpu_available',
        '-------------------',
        '        t',
        '(1 row)',
        '',
        '\x1b[36m-- LLM GPU acceleration available\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT * FROM neurondb_llm_gpu_info();',
      output: [
        ' device_name | memory_gb | status',
        '-------------+-----------+--------',
        ' RTX 4090    |    24     | available',
        '(1 row)',
        '',
        '\x1b[36m-- LLM GPU information\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT vector_l2_distance_gpu(\'[1,2,3]\'::vector, \'[4,5,6]\'::vector) AS gpu_l2_distance, vector_cosine_distance_gpu(\'[1,2,3]\'::vector, \'[4,5,6]\'::vector) AS gpu_cosine_distance;',
      output: [
        ' gpu_l2_distance | gpu_cosine_distance',
        '-----------------+---------------------',
        '    5.196152     |      0.025347',
        '(1 row)',
        '',
        '\x1b[36m-- GPU-accelerated distance calculations\x1b[0m',
        '\x1b[32m-- 100x faster for large batches\x1b[0m'
      ],
      isPsqlCommand: true
    }
  ], [])

  // Hybrid Search Tab Commands (from 011_hybrid_search_basic.sql)
  const hybridCommands = useMemo(() => [
    {
      command: 'psql -d neurondb',
      output: ['psql (18.3)', 'Type "help" for help.', ''],
      isShellCommand: true,
      entersPsql: true
    },
    {
      command: 'CREATE TEMP TABLE hybrid_search_test (id SERIAL PRIMARY KEY, title TEXT NOT NULL, content TEXT NOT NULL, embedding VECTOR(384), fts_vector tsvector);',
      output: [
        'CREATE TABLE',
        '',
        '\x1b[36m-- Table with both vector and full-text search columns\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'INSERT INTO hybrid_search_test (title, content, embedding, fts_vector) VALUES (\'PostgreSQL Database\', \'PostgreSQL is a powerful open-source relational database management system\', embed_text(\'PostgreSQL is a powerful open-source relational database management system\', \'all-MiniLM-L6-v2\'), to_tsvector(\'PostgreSQL is a powerful open-source relational database management system\'));',
      output: [
        'INSERT 0 1',
        '',
        '\x1b[36m-- Document with vector embedding + text index\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT search_result.id, hybrid_search_test.title, hybrid_search_test.content, search_result.score FROM hybrid_search_test, LATERAL hybrid_search(\'hybrid_search_test\', embed_text(\'database systems\', \'all-MiniLM-L6-v2\'), \'database systems\', \'{}\'::text, 0.7, 5) AS search_result(id, score) WHERE hybrid_search_test.id = search_result.id ORDER BY search_result.score DESC LIMIT 5;',
      output: [
        ' id |        title         |              content              | score',
        '----+----------------------+-----------------------------------+-------',
        '  1 | PostgreSQL Database  | PostgreSQL is a powerful...      | 0.92',
        '(1 row)',
        '',
        '\x1b[36m-- Hybrid Search: 70% vector + 30% BM25 text search\x1b[0m',
        '\x1b[36m-- Combines semantic similarity with keyword matching\x1b[0m',
        '\x1b[32m-- Best of both: meaning + exact terms ✓\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'WITH vector_results AS (SELECT id, embedding <-> embed_text(\'database systems\', \'all-MiniLM-L6-v2\') AS distance FROM hybrid_search_test ORDER BY distance LIMIT 5), text_results AS (SELECT id, ts_rank(to_tsvector(\'english\', title || \' \' || content), to_tsquery(\'english\', \'database & systems\')) AS rank FROM hybrid_search_test WHERE to_tsvector(\'english\', title || \' \' || content) @@ to_tsquery(\'english\', \'database & systems\') ORDER BY rank DESC LIMIT 5) SELECT COALESCE(v.id, t.id) AS id, hybrid_search_test.title FROM vector_results v FULL OUTER JOIN text_results t ON v.id = t.id JOIN hybrid_search_test ON hybrid_search_test.id = COALESCE(v.id, t.id) ORDER BY COALESCE(v.distance, 0.0) + COALESCE(t.rank, 0.0) DESC LIMIT 5;',
      output: [
        ' id |        title',
        '----+----------------------',
        '  1 | PostgreSQL Database',
        '(1 row)',
        '',
        '\x1b[36m-- Hybrid Search Fusion: combining vector and text results\x1b[0m',
        '\x1b[32m-- Optimal relevance through multi-modal retrieval\x1b[0m'
      ],
      isPsqlCommand: true
    }
  ], [])

  const usageCommands = useMemo(() => [
    {
      command: 'psql -d neurondb',
      output: [
        'psql (18.3)',
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
  ], [])

  // RAG Pipeline Tab Commands
  const ragCommands = useMemo(() => [
    {
      command: 'psql -d neurondb',
      output: ['psql (18.3)', 'Type "help" for help.', ''],
      isShellCommand: true,
      entersPsql: true
    },
    {
      command: 'CREATE TABLE knowledge_base (id SERIAL PRIMARY KEY, content TEXT, embedding vector(384));',
      output: [
        'CREATE TABLE',
        '',
        '\x1b[36m-- Knowledge base for RAG pipeline\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'INSERT INTO knowledge_base (content, embedding) VALUES (\'PostgreSQL is a powerful open-source relational database management system. It provides advanced features including ACID compliance, full-text search, and extensibility through extensions.\', embed_text(\'PostgreSQL is a powerful open-source relational database management system. It provides advanced features including ACID compliance, full-text search, and extensibility through extensions.\'));',
      output: [
        'INSERT 0 1',
        '',
        '\x1b[36m-- Document embedded and stored\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'WITH query_vec AS (SELECT embed_text(\'What is PostgreSQL?\') AS query_embedding), ranked_results AS (SELECT content AS document, embedding <-> query_embedding AS distance FROM knowledge_base, query_vec ORDER BY distance LIMIT 3) SELECT document, distance AS similarity_score FROM ranked_results;',
      output: [
        '                    document                     | similarity_score',
        '------------------------------------------------+------------------',
        ' PostgreSQL is a powerful open-source...        |        0.125',
        '(1 row)',
        '',
        '\x1b[36m-- RAG Pipeline: Query → Embed → Retrieve → Rank\x1b[0m',
        '\x1b[32m-- Retrieved most relevant document for query\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT idx, score, docs[idx] AS document FROM (SELECT ARRAY[\'PostgreSQL is a powerful relational database\', \'Machine learning models can be trained in SQL\', \'Vector search enables semantic similarity\'] AS docs) AS d, LATERAL ndb_llm_rerank(\'machine learning\', docs, \'ms-marco-MiniLM-L-6-v2\', 5) AS rerank_result ORDER BY score DESC;',
      output: [
        ' idx | score |              document',
        '-----+-------+-----------------------------------',
        '  1  | 0.945 | Machine learning models can be...',
        '  2  | 0.678 | Vector search enables semantic...',
        '  0  | 0.234 | PostgreSQL is a powerful...',
        '(3 rows)',
        '',
        '\x1b[36m-- LLM-powered reranking improves relevance\x1b[0m',
        '\x1b[32m-- Cross-encoder model scores query-document pairs\x1b[0m'
      ],
      isPsqlCommand: true
    }
  ], [])

  // Reranking (Flash Attention) Tab Commands
  const rerankingCommands = useMemo(() => [
    {
      command: 'psql -d neurondb',
      output: ['psql (18.3)', 'Type "help" for help.', ''],
      isShellCommand: true,
      entersPsql: true
    },
    {
      command: 'SELECT COUNT(*) AS result_count FROM rerank_flash(\'machine learning\', ARRAY[\'machine learning algorithms\', \'deep learning models\', \'neural networks\'], NULL, 3);',
      output: [
        ' result_count',
        '-------------',
        '      3',
        '(1 row)',
        '',
        '\x1b[36m-- Flash Attention reranking for fast, accurate results\x1b[0m',
        '\x1b[32m-- Optimized attention mechanism for long contexts\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT COUNT(*) AS result_count FROM rerank_flash(\'natural language processing\', ARRAY[\'NLP models\', \'text processing\', \'language models\'], \'cross-encoder\', 2);',
      output: [
        ' result_count',
        '-------------',
        '      2',
        '(1 row)',
        '',
        '\x1b[36m-- Custom model: cross-encoder for precision\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT COUNT(*) AS result_count FROM rerank_long_context(\'query text\', ARRAY[\'document 1\', \'document 2\', \'document 3\'], 8192, 3);',
      output: [
        ' result_count',
        '-------------',
        '      3',
        '(1 row)',
        '',
        '\x1b[36m-- Long context reranking: handles up to 8192 tokens\x1b[0m',
        '\x1b[32m-- Flash Attention enables efficient processing of long sequences\x1b[0m'
      ],
      isPsqlCommand: true
    }
  ], [])

  // Sparse Vectors Tab Commands
  const sparseCommands = useMemo(() => [
    {
      command: 'psql -d neurondb',
      output: ['psql (18.3)', 'Type "help" for help.', ''],
      isShellCommand: true,
      entersPsql: true
    },
    {
      command: 'SELECT sparse_vector_in(\'{vocab_size:30522, model:SPLADE, tokens:[100,200,300], weights:[0.5,0.8,0.3]}\') IS NOT NULL AS created;',
      output: [
        ' created',
        '--------',
        ' t',
        '(1 row)',
        '',
        '\x1b[36m-- Sparse vector created with SPLADE model\x1b[0m',
        '\x1b[36m-- Only stores non-zero token weights (memory efficient)\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT sparse_vector_dot_product(\'{vocab_size:30522, model:SPLADE, tokens:[100,200], weights:[0.5,0.8]}\'::sparse_vector, \'{vocab_size:30522, model:SPLADE, tokens:[100,200], weights:[0.3,0.7]}\'::sparse_vector) AS dot_product;',
      output: [
        ' dot_product',
        '------------',
        '    0.710',
        '(1 row)',
        '',
        '\x1b[36m-- Sparse vector dot product: efficient computation\x1b[0m',
        '\x1b[32m-- Only processes overlapping tokens (fast)\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT (\'{vocab_size:30522, model:SPLADE, tokens:[100,200], weights:[0.5,0.8]}\'::sparse_vector <*> \'{vocab_size:30522, model:SPLADE, tokens:[100,200], weights:[0.3,0.7]}\'::sparse_vector) AS result;',
      output: [
        ' result',
        '-------',
        ' 0.710',
        '(1 row)',
        '',
        '\x1b[36m-- Sparse vector operator <*> for dot product\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT bm25_score(\'machine learning\', \'machine learning algorithms\', 1.5, 0.75) AS score;',
      output: [
        '  score',
        '--------',
        ' 2.345',
        '(1 row)',
        '',
        '\x1b[36m-- BM25 score: classic information retrieval metric\x1b[0m',
        '\x1b[32m-- Combines term frequency with inverse document frequency\x1b[0m'
      ],
      isPsqlCommand: true
    }
  ], [])

  // Quantization (FP8) Tab Commands
  const quantizationCommands = useMemo(() => [
    {
      command: 'psql -d neurondb',
      output: ['psql (18.3)', 'Type "help" for help.', ''],
      isShellCommand: true,
      entersPsql: true
    },
    {
      command: 'SELECT quantize_fp8_e4m3(\'[1.0,2.0,3.0,4.0,5.0]\'::vector) IS NOT NULL AS created;',
      output: [
        ' created',
        '--------',
        ' t',
        '(1 row)',
        '',
        '\x1b[36m-- FP8 E4M3 quantization: 4 exponent, 3 mantissa bits\x1b[0m',
        '\x1b[32m-- 4x memory reduction: float32 → fp8 (75% compression)\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT quantize_fp8_e5m2(\'[1.0,2.0,3.0,4.0,5.0]\'::vector) IS NOT NULL AS created;',
      output: [
        ' created',
        '--------',
        ' t',
        '(1 row)',
        '',
        '\x1b[36m-- FP8 E5M2 quantization: 5 exponent, 2 mantissa bits\x1b[0m',
        '\x1b[36m-- Better range, slightly less precision\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'WITH quantized AS (SELECT quantize_fp8_e4m3(\'[1.0,2.0,3.0]\'::vector) AS q) SELECT dequantize_fp8(q) IS NOT NULL AS dequantized FROM quantized;',
      output: [
        ' dequantized',
        '-------------',
        '      t',
        '(1 row)',
        '',
        '\x1b[36m-- Dequantization: restore original vector (with minimal loss)\x1b[0m',
        '\x1b[32m-- Round-trip quantization preserves 95%+ accuracy\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT auto_quantize(\'[1.0,2.0,3.0]\'::vector, \'fp8_e4m3\') IS NOT NULL AS created;',
      output: [
        ' created',
        '--------',
        ' t',
        '(1 row)',
        '',
        '\x1b[36m-- Auto quantization: automatic format selection\x1b[0m',
        '\x1b[32m-- Optimizes for accuracy vs memory trade-off\x1b[0m'
      ],
      isPsqlCommand: true
    }
  ], [])

  // Multimodal Tab Commands
  const multimodalCommands = useMemo(() => [
    {
      command: 'psql -d neurondb',
      output: ['psql (18.3)', 'Type "help" for help.', ''],
      isShellCommand: true,
      entersPsql: true
    },
    {
      command: 'SELECT clip_embed(\'machine learning\', \'text\') IS NOT NULL AS created;',
      output: [
        ' created',
        '--------',
        ' t',
        '(1 row)',
        '',
        '\x1b[36m-- CLIP text embedding: unified text-image representation\x1b[0m',
        '\x1b[32m-- Enables cross-modal search (text ↔ image)\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT clip_embed(\'image_path\', \'image\') IS NOT NULL AS created;',
      output: [
        ' created',
        '--------',
        ' t',
        '(1 row)',
        '',
        '\x1b[36m-- CLIP image embedding: visual content → vector\x1b[0m',
        '\x1b[36m-- Same embedding space as text (semantic alignment)\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT imagebind_embed(\'natural language processing\', \'text\') IS NOT NULL AS created;',
      output: [
        ' created',
        '--------',
        ' t',
        '(1 row)',
        '',
        '\x1b[36m-- ImageBind text embedding: multi-modal foundation model\x1b[0m',
        '\x1b[32m-- Supports text, image, audio, video, depth, thermal\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT imagebind_embed(\'audio_path\', \'audio\') IS NOT NULL AS created;',
      output: [
        ' created',
        '--------',
        ' t',
        '(1 row)',
        '',
        '\x1b[36m-- ImageBind audio embedding: sound → vector\x1b[0m',
        '\x1b[32m-- Unified embedding space across all modalities\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'CREATE TABLE media (id SERIAL, type TEXT, content TEXT, embedding vector(512));',
      output: [
        'CREATE TABLE',
        '',
        '\x1b[36m-- Multi-modal media table\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'INSERT INTO media (type, content, embedding) VALUES (\'text\', \'A red car\', clip_embed(\'A red car\', \'text\')), (\'image\', \'car.jpg\', clip_embed(\'car.jpg\', \'image\'));',
      output: [
        'INSERT 0 2',
        '',
        '\x1b[36m-- Cross-modal search: find images matching text queries\x1b[0m',
        '\x1b[32m-- Query: "red car" → finds matching images ✓\x1b[0m'
      ],
      isPsqlCommand: true
    }
  ], [])

  // Background Workers Tab Commands
  const workersCommands = useMemo(() => [
    {
      command: 'psql -d neurondb',
      output: ['psql (18.3)', 'Type "help" for help.', ''],
      isShellCommand: true,
      entersPsql: true
    },
    {
      command: 'SELECT proname as function_name, pronargs as num_args FROM pg_proc WHERE pronamespace = \'neurondb\'::regnamespace AND (proname LIKE \'%neuran%\' OR proname LIKE \'%worker%\') ORDER BY proname;',
      output: [
        '   function_name   | num_args',
        '-------------------+----------',
        ' neurandefrag_run  |    0',
        ' neuranllm_process |    1',
        ' neuranmon_sample  |    0',
        ' neuranq_run_once  |    0',
        '(4 rows)',
        '',
        '\x1b[36m-- Background worker functions available\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT pid, backend_type, state FROM pg_stat_activity WHERE backend_type = \'background worker\' AND (query LIKE \'%neuron%\' OR application_name LIKE \'%neuron%\') ORDER BY backend_start DESC;',
      output: [
        '  pid  |  backend_type   | state',
        '-------+-----------------+-------',
        ' 12345 | background worker | active',
        ' 12346 | background worker | active',
        ' 12347 | background worker | active',
        '(3 rows)',
        '',
        '\x1b[36m-- Background workers running:\x1b[0m',
        '\x1b[36m   • neuranq:      Async job queue executor\x1b[0m',
        '\x1b[36m   • neuranmon:    Live query auto-tuner\x1b[0m',
        '\x1b[36m   • neurandefrag: Index maintenance worker\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT neuranq_run_once() AS queue_processed;',
      output: [
        ' queue_processed',
        '-----------------',
        '        12',
        '(1 row)',
        '',
        '\x1b[36m-- neuranq: Processed 12 jobs from queue\x1b[0m',
        '\x1b[32m-- Jobs: embedding generation, model inference, batch ops\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT neuranmon_sample() AS tuner_sampled;',
      output: [
        ' tuner_sampled',
        '---------------',
        '       8',
        '(1 row)',
        '',
        '\x1b[36m-- neuranmon: Sampled 8 queries for auto-tuning\x1b[0m',
        '\x1b[32m-- Auto-adjusting HNSW parameters (ef_search, m) for optimal performance\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT neurandefrag_run() AS defrag_executed;',
      output: [
        ' defrag_executed',
        '-----------------',
        '        3',
        '(1 row)',
        '',
        '\x1b[36m-- neurandefrag: Optimized 3 indexes\x1b[0m',
        '\x1b[32m-- Actions: compaction, tombstone pruning, rebuild scheduling\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT schemaname, tablename, CASE WHEN tablename = \'neurondb_job_queue\' THEN \'Queue Worker\' WHEN tablename = \'neurondb_query_metrics\' THEN \'Tuner Worker\' WHEN tablename = \'neurondb_llm_jobs\' THEN \'LLM Worker\' ELSE \'Other\' END as worker_type FROM pg_tables WHERE schemaname = \'neurondb\' AND tablename LIKE \'%job%\' OR tablename LIKE \'%metric%\' ORDER BY tablename;',
      output: [
        ' schemaname |      tablename       |  worker_type',
        '------------+----------------------+--------------',
        ' neurondb   | neurondb_job_queue   | Queue Worker',
        ' neurondb   | neurondb_llm_jobs    | LLM Worker',
        ' neurondb   | neurondb_query_metrics| Tuner Worker',
        '(3 rows)',
        '',
        '\x1b[36m-- Worker tables for job tracking and metrics\x1b[0m'
      ],
      isPsqlCommand: true
    }
  ], [])

  // ML Regression Sub-Tab Commands (from 001_linreg_basic.sql, 006_ridge_basic.sql, 007_lasso_basic.sql)
  const mlRegressionCommands = useMemo(() => [
    {
      command: 'psql -d neurondb',
      output: ['psql (18.3)', 'Type "help" for help.', ''],
      isShellCommand: true,
      entersPsql: true
    },
    {
      command: 'CREATE TEMP TABLE model_temp AS SELECT neurondb.train(\'default\', \'linear_regression\', \'test_train_view\', \'label\', ARRAY[\'features\'], \'{}\'::jsonb)::integer AS model_id;',
      output: [
        'SELECT 1',
        '',
        '\x1b[36m-- Training Linear Regression model\x1b[0m',
        '\x1b[32m-- Model ID: 12345 stored in neurondb.ml_models\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT algorithm, n_samples, ROUND(mse::numeric, 6) AS mse, ROUND(r_squared::numeric, 6) AS r_squared FROM neurondb.ml_models m, model_temp t WHERE m.model_id = t.model_id;',
      output: [
        '     algorithm      | n_samples |   mse   | r_squared',
        '--------------------+-----------+---------+----------',
        ' linear_regression  |   1000    | 0.234567|  0.856789',
        '(1 row)',
        '',
        '\x1b[36m-- Model metrics: MSE and R² score\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'CREATE TEMP TABLE metrics_temp AS SELECT neurondb.evaluate((SELECT model_id FROM model_temp), \'test_test_view\', \'features\', \'label\') AS metrics;',
      output: [
        'SELECT 1',
        '',
        '\x1b[36m-- Evaluating model on test set (optimized C batch processing)\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT \'MSE\' AS metric, ROUND((metrics->>\'mse\')::numeric, 6)::text AS value FROM metrics_temp UNION ALL SELECT \'RMSE\', ROUND((metrics->>\'rmse\')::numeric, 6)::text FROM metrics_temp UNION ALL SELECT \'R²\', ROUND((metrics->>\'r_squared\')::numeric, 6)::text FROM metrics_temp ORDER BY metric;',
      output: [
        ' metric |  value',
        '--------+--------',
        ' MSE    | 0.234567',
        ' R²     | 0.856789',
        ' RMSE   | 0.484321',
        '(3 rows)',
        '',
        '\x1b[36m-- Evaluation metrics on test set\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'CREATE TEMP TABLE ridge_model AS SELECT neurondb.train(\'default\', \'ridge\', \'test_train_view\', \'label\', ARRAY[\'features\'], \'{"alpha": 0.1}\'::jsonb)::integer AS model_id;',
      output: [
        'SELECT 1',
        '',
        '\x1b[36m-- Training Ridge Regression (L2 regularization)\x1b[0m',
        '\x1b[36m-- Alpha: 0.1 (regularization strength)\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'CREATE TEMP TABLE lasso_model AS SELECT neurondb.train(\'default\', \'lasso\', \'test_train_view\', \'label\', ARRAY[\'features\'], \'{"alpha": 0.1}\'::jsonb)::integer AS model_id;',
      output: [
        'SELECT 1',
        '',
        '\x1b[36m-- Training Lasso Regression (L1 regularization)\x1b[0m',
        '\x1b[36m-- Alpha: 0.1 (feature selection via sparsity)\x1b[0m'
      ],
      isPsqlCommand: true
    }
  ], [])

  // ML Classification Sub-Tab Commands (from 002_logreg_basic.sql, 004_svm_basic.sql, 012_nb_basic.sql, 005_dt_basic.sql)
  const mlClassificationCommands = useMemo(() => [
    {
      command: 'psql -d neurondb',
      output: ['psql (18.3)', 'Type "help" for help.', ''],
      isShellCommand: true,
      entersPsql: true
    },
    {
      command: 'CREATE TEMP TABLE logreg_model AS SELECT neurondb.train(\'default\', \'logistic_regression\', \'test_train_view\', \'label\', ARRAY[\'features\'], \'{"max_iters": 1000, "learning_rate": 0.01, "lambda": 0.001}\'::jsonb)::integer AS model_id;',
      output: [
        'SELECT 1',
        '',
        '\x1b[36m-- Training Logistic Regression for classification\x1b[0m',
        '\x1b[36m-- Max iterations: 1000, Learning rate: 0.01, Lambda: 0.001\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT \'Accuracy\' AS metric, ROUND((metrics->>\'accuracy\')::numeric, 4) AS value FROM (SELECT neurondb.evaluate((SELECT model_id FROM logreg_model), \'test_test_view\', \'features\', \'label\') AS metrics) m UNION ALL SELECT \'Precision\', ROUND((metrics->>\'precision\')::numeric, 4) FROM (SELECT neurondb.evaluate((SELECT model_id FROM logreg_model), \'test_test_view\', \'features\', \'label\') AS metrics) m UNION ALL SELECT \'F1\', ROUND((metrics->>\'f1_score\')::numeric, 4) FROM (SELECT neurondb.evaluate((SELECT model_id FROM logreg_model), \'test_test_view\', \'features\', \'label\') AS metrics) m;',
      output: [
        '  metric   | value',
        '-----------+-------',
        ' Accuracy  | 0.9234',
        ' F1        | 0.9156',
        ' Precision | 0.9123',
        '(3 rows)',
        '',
        '\x1b[36m-- Classification metrics on test set\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'CREATE TEMP TABLE svm_model AS SELECT neurondb.train(\'default\', \'svm\', \'test_train_view\', \'label\', ARRAY[\'features\'], \'{"C": 1.0, "max_iters": 1000}\'::jsonb)::integer AS model_id;',
      output: [
        'SELECT 1',
        '',
        '\x1b[36m-- Training SVM (Support Vector Machine)\x1b[0m',
        '\x1b[36m-- C: 1.0 (regularization parameter)\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'CREATE TEMP TABLE dt_model AS SELECT train_decision_tree_classifier(\'test_train_view\', \'features\', \'label\', 10, 2)::integer AS model_id;',
      output: [
        'SELECT 1',
        '',
        '\x1b[36m-- Training Decision Tree classifier\x1b[0m',
        '\x1b[36m-- Max depth: 10, Min samples split: 2\x1b[0m',
        '\x1b[32m-- Interpretable tree-based classifier\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'CREATE TEMP TABLE nb_model AS SELECT neurondb.train(\'default\', \'naive_bayes\', \'test_train_view\', \'label\', ARRAY[\'features\'], \'{}\'::jsonb)::integer AS model_id;',
      output: [
        'SELECT 1',
        '',
        '\x1b[36m-- Training Naive Bayes classifier\x1b[0m',
        '\x1b[32m-- Fast probabilistic classifier (CPU-only)\x1b[0m'
      ],
      isPsqlCommand: true
    }
  ], [])

  // ML Clustering Sub-Tab Commands (from 015_kmeans_basic.sql, 013_gmm_basic.sql, 017_hierarchical_basic.sql, 018_dbscan_basic.sql, 016_minibatch_kmeans_basic.sql)
  const mlClusteringCommands = useMemo(() => [
    {
      command: 'psql -d neurondb',
      output: ['psql (18.3)', 'Type "help" for help.', ''],
      isShellCommand: true,
      entersPsql: true
    },
    {
      command: 'CREATE TEMP TABLE kmeans_model AS SELECT train_kmeans_model_id(\'test_train_view\', \'features\', 3, 100) AS model_id;',
      output: [
        'SELECT 1',
        '',
        '\x1b[36m-- Training K-Means clustering (k=3, max_iter=100)\x1b[0m',
        '\x1b[32m-- Lloyd\'s algorithm with k-means++ initialization\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT \'Inertia\' AS metric, ROUND((metrics->>\'inertia\')::numeric, 6)::text AS value FROM (SELECT evaluate_kmeans_by_model_id((SELECT model_id FROM kmeans_model), \'test_test_view\', \'features\') AS metrics) m UNION ALL SELECT \'N_Clusters\', (metrics->>\'n_clusters\')::text FROM (SELECT evaluate_kmeans_by_model_id((SELECT model_id FROM kmeans_model), \'test_test_view\', \'features\') AS metrics) m UNION ALL SELECT \'N_Iterations\', (metrics->>\'n_iterations\')::text FROM (SELECT evaluate_kmeans_by_model_id((SELECT model_id FROM kmeans_model), \'test_test_view\', \'features\') AS metrics) m;',
      output: [
        '   metric    |  value',
        '-------------+--------',
        ' Inertia     | 45.234567',
        ' N_Clusters  | 3',
        ' N_Iterations| 23',
        '(3 rows)',
        '',
        '\x1b[36m-- K-Means evaluation: lower inertia = better clustering\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'WITH clusters AS (SELECT unnest(cluster_minibatch_kmeans(\'test_train_view\', \'features\', 3, 100, 100)) AS cluster_id) SELECT COUNT(DISTINCT cluster_id) AS num_clusters FROM clusters;',
      output: [
        ' num_clusters',
        '--------------',
        '      3',
        '(1 row)',
        '',
        '\x1b[36m-- Mini-Batch K-Means: faster for large datasets\x1b[0m',
        '\x1b[36m-- Batch size: 100, k=3 clusters\x1b[0m',
        '\x1b[32m-- 10x faster than standard K-Means on large data\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'CREATE TEMP TABLE gmm_model AS SELECT neurondb.train(\'default\', \'gmm\', \'test_train_view\', NULL, ARRAY[\'features\'], \'{"n_components": 3, "max_iters": 100}\'::jsonb)::integer AS model_id;',
      output: [
        'SELECT 1',
        '',
        '\x1b[36m-- Training GMM (Gaussian Mixture Model)\x1b[0m',
        '\x1b[36m-- 3 components, 100 max iterations\x1b[0m',
        '\x1b[32m-- Probabilistic clustering with soft assignments\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'WITH clusters AS (SELECT unnest(cluster_dbscan(\'test_train_view\', \'features\', 0.5, 5)) AS cluster_id) SELECT COUNT(DISTINCT cluster_id) FILTER (WHERE cluster_id != -1) AS num_clusters, COUNT(*) FILTER (WHERE cluster_id = -1) AS noise_points FROM clusters;',
      output: [
        ' num_clusters | noise_points',
        '--------------+--------------',
        '      5       |      12',
        '(1 row)',
        '',
        '\x1b[36m-- DBSCAN clustering: density-based\x1b[0m',
        '\x1b[36m-- eps=0.5, min_pts=5, noise points marked as -1\x1b[0m',
        '\x1b[32m-- Discovers clusters of arbitrary shape\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'WITH clusters AS (SELECT unnest(cluster_hierarchical(\'test_train_view\', \'features\', 3, \'average\')) AS cluster_id) SELECT COUNT(DISTINCT cluster_id) AS num_clusters FROM clusters;',
      output: [
        ' num_clusters',
        '--------------',
        '      3',
        '(1 row)',
        '',
        '\x1b[36m-- Hierarchical clustering: agglomerative\x1b[0m',
        '\x1b[36m-- Linkage: average, k=3 clusters\x1b[0m',
        '\x1b[32m-- Builds dendrogram of cluster relationships\x1b[0m'
      ],
      isPsqlCommand: true
    }
  ], [])

  // ML Boosting Sub-Tab Commands (from 003_rf_basic.sql, 019_xgboost_basic.sql, 020_catboost_basic.sql, 021_lightgbm_basic.sql)
  const mlBoostingCommands = useMemo(() => [
    {
      command: 'psql -d neurondb',
      output: ['psql (18.3)', 'Type "help" for help.', ''],
      isShellCommand: true,
      entersPsql: true
    },
    {
      command: 'CREATE TEMP TABLE rf_model AS SELECT neurondb.train(\'default\', \'random_forest\', \'test_train_view\', \'label\', ARRAY[\'features\'], \'{"n_trees": 3}\'::jsonb)::integer AS model_id;',
      output: [
        'SELECT 1',
        '',
        '\x1b[36m-- Training Random Forest with 3 trees\x1b[0m',
        '\x1b[32m-- Ensemble of decision trees with bagging\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT \'Accuracy\' AS metric, ROUND((metrics->>\'accuracy\')::numeric, 4) AS value FROM (SELECT neurondb.evaluate((SELECT model_id FROM rf_model), \'test_test_view\', \'features\', \'label\') AS metrics) m UNION ALL SELECT \'Precision\', ROUND((metrics->>\'precision\')::numeric, 4) FROM (SELECT neurondb.evaluate((SELECT model_id FROM rf_model), \'test_test_view\', \'features\', \'label\') AS metrics) m;',
      output: [
        '  metric   | value',
        '-----------+-------',
        ' Accuracy  | 0.9234',
        ' Precision | 0.9156',
        '(2 rows)',
        '',
        '\x1b[36m-- Random Forest classification metrics\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'CREATE TEMP TABLE xgb_model AS SELECT neurondb.train(\'default\', \'xgboost\', \'test_train_view\', \'label\', ARRAY[\'features\'], \'{}\'::jsonb)::integer AS model_id;',
      output: [
        'SELECT 1',
        '',
        '\x1b[36m-- Training XGBoost (Extreme Gradient Boosting)\x1b[0m',
        '\x1b[32m-- GPU-accelerated gradient boosting\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'CREATE TEMP TABLE lgb_model AS SELECT neurondb.train(\'default\', \'lightgbm\', \'test_train_view\', \'label\', ARRAY[\'features\'], \'{}\'::jsonb)::integer AS model_id;',
      output: [
        'SELECT 1',
        '',
        '\x1b[36m-- Training LightGBM (Light Gradient Boosting)\x1b[0m',
        '\x1b[32m-- Fast, memory-efficient gradient boosting\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'CREATE TEMP TABLE cat_model AS SELECT neurondb.train(\'default\', \'catboost\', \'test_train_view\', \'label\', ARRAY[\'features\'], \'{}\'::jsonb)::integer AS model_id;',
      output: [
        'SELECT 1',
        '',
        '\x1b[36m-- Training CatBoost (Categorical Boosting)\x1b[0m',
        '\x1b[32m-- Handles categorical features automatically\x1b[0m'
      ],
      isPsqlCommand: true
    }
  ], [])

  // ML Neural Network Sub-Tab Commands (from 022_neural_network_basic.sql)
  const mlNeuralCommands = useMemo(() => [
    {
      command: 'psql -d neurondb',
      output: ['psql (18.3)', 'Type "help" for help.', ''],
      isShellCommand: true,
      entersPsql: true
    },
    {
      command: 'CREATE TEMP TABLE nn_model AS SELECT neurondb.train(\'default\', \'neural_network\', \'test_train_view\', \'label\', ARRAY[\'features\'], \'{}\'::jsonb)::integer AS model_id;',
      output: [
        'SELECT 1',
        '',
        '\x1b[36m-- Training Neural Network (Deep Learning)\x1b[0m',
        '\x1b[32m-- Multi-layer perceptron with backpropagation\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT neurondb.predict((SELECT model_id FROM nn_model), array_to_vector_float8(ARRAY[7.0, 14.0]::double precision[])) AS prediction;',
      output: [
        ' prediction',
        '------------',
        '   0.8567',
        '(1 row)',
        '',
        '\x1b[36m-- Neural network inference on new data\x1b[0m'
      ],
      isPsqlCommand: true
    }
  ], [])

  // ML Time Series Sub-Tab Commands (from 024_timeseries_basic.sql, 029_arima_basic.sql)
  const mlTimeseriesCommands = useMemo(() => [
    {
      command: 'psql -d neurondb',
      output: ['psql (18.3)', 'Type "help" for help.', ''],
      isShellCommand: true,
      entersPsql: true
    },
    {
      command: 'CREATE TABLE ts_data (id serial PRIMARY KEY, features vector, label double precision);',
      output: [
        'CREATE TABLE',
        '',
        '\x1b[36m-- Time series data table\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'INSERT INTO ts_data (features, label) SELECT array_to_vector_float8(ARRAY[x::double precision]) AS features, (x::double precision + random()*0.1) AS label FROM generate_series(1, 30) x;',
      output: [
        'INSERT 0 30',
        '',
        '\x1b[32m-- 30 time series samples inserted\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'CREATE TEMP TABLE ts_model AS SELECT neurondb.train(\'default\', \'timeseries\', \'ts_data\', \'label\', ARRAY[\'features\'], \'{}\'::jsonb)::integer AS model_id;',
      output: [
        'SELECT 1',
        '',
        '\x1b[36m-- Training Time Series forecasting model\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT neurondb.predict((SELECT model_id FROM ts_model), array_to_vector_float8(ARRAY[31::double precision])) AS forecast;',
      output: [
        ' forecast',
        '---------',
        ' 31.2345',
        '(1 row)',
        '',
        '\x1b[36m-- Forecasting next time step\x1b[0m'
      ],
      isPsqlCommand: true
    }
  ], [])

  // ML AutoML Sub-Tab Commands (from 025_automl_basic.sql)
  const mlAutomlCommands = useMemo(() => [
    {
      command: 'psql -d neurondb',
      output: ['psql (18.3)', 'Type "help" for help.', ''],
      isShellCommand: true,
      entersPsql: true
    },
    {
      command: 'CREATE TEMP TABLE automl_model AS SELECT auto_train(\'test_train_view\', \'features\', \'label\', \'classification\', \'accuracy\')::integer AS model_id;',
      output: [
        'SELECT 1',
        '',
        '\x1b[36m-- AutoML: Automated model selection and hyperparameter tuning\x1b[0m',
        '\x1b[32m-- Task: classification, Metric: accuracy\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT model_id FROM automl_model;',
      output: [
        ' model_id',
        '----------',
        '   12345',
        '(1 row)',
        '',
        '\x1b[36m-- AutoML selected best model automatically\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT algorithm, ROUND((metrics->>\'accuracy\')::numeric, 4) AS accuracy FROM neurondb.ml_models m, automl_model a WHERE m.model_id = a.model_id;',
      output: [
        '  algorithm  | accuracy',
        '-------------+----------',
        ' xgboost     |  0.9456',
        '(1 row)',
        '',
        '\x1b[36m-- AutoML selected XGBoost as best algorithm\x1b[0m',
        '\x1b[32m-- Achieved 94.56% accuracy with optimized hyperparameters\x1b[0m'
      ],
      isPsqlCommand: true
    }
  ], [])

  // ML Recommender Sub-Tab Commands (from 028_recommender_basic.sql)
  const mlRecommenderCommands = useMemo(() => [
    {
      command: 'psql -d neurondb',
      output: ['psql (18.3)', 'Type "help" for help.', ''],
      isShellCommand: true,
      entersPsql: true
    },
    {
      command: 'CREATE TABLE cf_ratings (user_id INTEGER, item_id INTEGER, rating FLOAT4);',
      output: [
        'CREATE TABLE',
        '',
        '\x1b[36m-- Collaborative filtering ratings table\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'INSERT INTO cf_ratings (user_id, item_id, rating) SELECT (random() * 99 + 1)::INTEGER, (random() * 49 + 1)::INTEGER, (random() * 4 + 1)::FLOAT4 FROM generate_series(1, 1000);',
      output: [
        'INSERT 0 1000',
        '',
        '\x1b[32m-- 1000 ratings inserted (users × items)\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT COUNT(DISTINCT user_id) AS users, COUNT(DISTINCT item_id) AS items, COUNT(*) AS ratings FROM cf_ratings;',
      output: [
        ' users | items | ratings',
        '-------+-------+---------',
        '  100  |  50   |  1000',
        '(1 row)',
        '',
        '\x1b[36m-- Dataset: 100 users, 50 items, 1000 ratings\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'CREATE TEMP TABLE cf_model AS SELECT train_collaborative_filter(\'cf_ratings\', \'user_id\', \'item_id\', \'rating\') AS model_id;',
      output: [
        'SELECT 1',
        '',
        '\x1b[36m-- Training Collaborative Filtering (ALS algorithm)\x1b[0m',
        '\x1b[32m-- Matrix factorization for recommendation\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT user_id, item_id, predicted_rating FROM predict_collaborative_filter((SELECT model_id FROM cf_model), 1, 5) LIMIT 5;',
      output: [
        ' user_id | item_id | predicted_rating',
        '---------+---------+-----------------',
        '    1    |    1    |     4.234',
        '    1    |    2    |     3.567',
        '    1    |    3    |     4.891',
        '(5 rows)',
        '',
        '\x1b[36m-- Predicting ratings for user 1, top 5 items\x1b[0m'
      ],
      isPsqlCommand: true
    }
  ], [])

  // Embeddings Batch Sub-Tab Commands (from 032_embeddings_batch.sql)
  const embeddingsBatchCommands = useMemo(() => [
    {
      command: 'psql -d neurondb',
      output: ['psql (18.3)', 'Type "help" for help.', ''],
      isShellCommand: true,
      entersPsql: true
    },
    {
      command: 'WITH batch_result AS (SELECT embed_text_batch(ARRAY[\'First text\', \'Second text\', \'Third text\']) AS embeddings) SELECT \'Batch embedding\' AS test_name, array_length(batch_result.embeddings, 1) AS batch_size FROM batch_result;',
      output: [
        '   test_name    | batch_size',
        '----------------+------------',
        ' Batch embedding|     3',
        '(1 row)',
        '',
        '\x1b[36m-- Batch embedding: 3 texts → 3 vectors in one call\x1b[0m',
        '\x1b[32m-- 5x faster than individual embed_text() calls\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT array_length(embed_text_batch(ARRAY[\'Valid text\', NULL, \'Another text\']), 1) AS batch_size;',
      output: [
        ' batch_size',
        '------------',
        '     3',
        '(1 row)',
        '',
        '\x1b[36m-- Batch handles NULL elements gracefully\x1b[0m'
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
        '\x1b[32m-- Efficient parallel processing\x1b[0m'
      ],
      isPsqlCommand: true
    }
  ], [])

  // Embeddings Config Sub-Tab Commands (from 033_embeddings_config.sql)
  const embeddingsConfigCommands = useMemo(() => [
    {
      command: 'psql -d neurondb',
      output: ['psql (18.3)', 'Type "help" for help.', ''],
      isShellCommand: true,
      entersPsql: true
    },
    {
      command: 'SELECT configure_embedding_model(\'test_model\', \'{"batch_size": 32, "normalize": true, "device": "cpu", "timeout_ms": 5000}\'::text) AS config_success;',
      output: [
        ' config_success',
        '----------------',
        '       t',
        '(1 row)',
        '',
        '\x1b[36m-- Configuring embedding model parameters\x1b[0m',
        '\x1b[36m   batch_size: 32, normalize: true, device: cpu\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT config_json->>\'batch_size\' AS batch_size, config_json->>\'normalize\' AS normalize FROM neurondb.neurondb_embedding_model_config WHERE model_name = \'test_model\';',
      output: [
        ' batch_size | normalize',
        '------------+-----------',
        '    32      |   true',
        '(1 row)',
        '',
        '\x1b[36m-- Configuration stored and retrieved\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT get_embedding_model_config(\'test_model\') IS NOT NULL AS config_exists, (get_embedding_model_config(\'test_model\'))->>\'batch_size\' AS batch_size;',
      output: [
        ' config_exists | batch_size',
        '--------------+------------',
        '      t        |    32',
        '(1 row)',
        '',
        '\x1b[36m-- Get embedding model configuration\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT neurondb_embed(\'Alias test\') IS NOT NULL AS alias_works, array_length(neurondb_embed_batch(ARRAY[\'Text 1\', \'Text 2\']), 1) AS batch_alias;',
      output: [
        ' alias_works | batch_alias',
        '-------------+-------------',
        '      t      |      2',
        '(1 row)',
        '',
        '\x1b[36m-- Function aliases: neurondb_embed, neurondb_embed_batch\x1b[0m'
      ],
      isPsqlCommand: true
    }
  ], [])

  // Embeddings HF Models Sub-Tab Commands (from 034_embeddings_hf_models.sql)
  const embeddingsHfModelsCommands = useMemo(() => [
    {
      command: 'psql -d neurondb',
      output: ['psql (18.3)', 'Type "help" for help.', ''],
      isShellCommand: true,
      entersPsql: true
    },
    {
      command: 'SELECT \'sentence-transformers/all-MiniLM-L6-v2\' AS model_name, 384 AS expected_dims, vector_dims(embed_text(\'Test text\', \'sentence-transformers/all-MiniLM-L6-v2\')) AS actual_dims;',
      output: [
        '            model_name             | expected_dims | actual_dims',
        '----------------------------------+---------------+-------------',
        ' sentence-transformers/all-MiniLM-L6-v2 |     384      |    384',
        '(1 row)',
        '',
        '\x1b[36m-- Hugging Face model: all-MiniLM-L6-v2 (384 dim, fast)\x1b[0m',
        '\x1b[32m-- Default model for text embeddings\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT \'sentence-transformers/all-mpnet-base-v2\' AS model_name, 768 AS expected_dims, vector_dims(embed_text(\'Test text\', \'sentence-transformers/all-mpnet-base-v2\')) AS actual_dims;',
      output: [
        '            model_name              | expected_dims | actual_dims',
        '-----------------------------------+---------------+-------------',
        ' sentence-transformers/all-mpnet-base-v2 |     768      |    768',
        '(1 row)',
        '',
        '\x1b[36m-- Higher quality model: all-mpnet-base-v2 (768 dim)\x1b[0m',
        '\x1b[32m-- Better accuracy for complex queries\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT \'sentence-transformers/all-MiniLM-L12-v2\' AS model_name, 384 AS expected_dims, vector_dims(embed_text(\'Test text\', \'sentence-transformers/all-MiniLM-L12-v2\')) AS actual_dims;',
      output: [
        '            model_name              | expected_dims | actual_dims',
        '-----------------------------------+---------------+-------------',
        ' sentence-transformers/all-MiniLM-L12-v2 |     384      |    384',
        '(1 row)',
        '',
        '\x1b[36m-- Better quality than L6: all-MiniLM-L12-v2 (384 dim)\x1b[0m'
      ],
      isPsqlCommand: true
    }
  ], [])

  // Advanced ONNX Sub-Tab Commands (from 047_onnx_basic.sql)
  const advancedOnnxCommands = useMemo(() => [
    {
      command: 'psql -d neurondb',
      output: ['psql (18.3)', 'Type "help" for help.', ''],
      isShellCommand: true,
      entersPsql: true
    },
    {
      command: 'SELECT neurondb_hf_embedding(\'sentence-transformers/all-MiniLM-L6-v2\', \'Test text\') IS NOT NULL AS onnx_embedding;',
      output: [
        ' onnx_embedding',
        '----------------',
        '       t',
        '(1 row)',
        '',
        '\x1b[36m-- ONNX runtime: HuggingFace embedding inference\x1b[0m',
        '\x1b[32m-- Optimized model execution via ONNX\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT array_length(neurondb_hf_tokenize(\'sentence-transformers/all-MiniLM-L6-v2\', \'Test text\'), 1) AS token_count;',
      output: [
        ' token_count',
        '-------------',
        '      3',
        '(1 row)',
        '',
        '\x1b[36m-- ONNX tokenization: text → token IDs\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT neurondb_hf_classify(\'text-classification-model\', \'Test text\') AS classification_result;',
      output: [
        ' classification_result',
        '------------------------',
        ' positive',
        '(1 row)',
        '',
        '\x1b[36m-- ONNX classification: text → label\x1b[0m'
      ],
      isPsqlCommand: true
    }
  ], [])

  // Advanced Metrics Sub-Tab Commands (from 046_metrics_basic.sql)
  const advancedMetricsCommands = useMemo(() => [
    {
      command: 'psql -d neurondb',
      output: ['psql (18.3)', 'Type "help" for help.', ''],
      isShellCommand: true,
      entersPsql: true
    },
    {
      command: 'SELECT * FROM pg_stat_neurondb();',
      output: [
        ' backend_pid | queries | cache_hits | cache_misses | avg_latency_ms',
        '-------------+---------+------------+--------------+----------------',
        '   12345     |   1847  |    1654    |     193      |      2.3',
        '(1 row)',
        '',
        '\x1b[36m-- NeuronDB statistics view\x1b[0m',
        '\x1b[36m   • 1847 queries executed\x1b[0m',
        '\x1b[36m   • 1654 cache hits (89.4% hit rate)\x1b[0m',
        '\x1b[36m   • Avg latency: 2.3ms\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT pg_neurondb_stat_reset() AS stats_reset;',
      output: [
        ' stats_reset',
        '-------------',
        '      t',
        '(1 row)',
        '',
        '\x1b[36m-- Statistics reset\x1b[0m'
      ],
      isPsqlCommand: true
    }
  ], [])

  // Advanced Planner Sub-Tab Commands (from 043_planner_basic.sql)
  const advancedPlannerCommands = useMemo(() => [
    {
      command: 'psql -d neurondb',
      output: ['psql (18.3)', 'Type "help" for help.', ''],
      isShellCommand: true,
      entersPsql: true
    },
    {
      command: 'CREATE TABLE planner_test_table (id SERIAL PRIMARY KEY, embedding vector(28), label integer);',
      output: [
        'CREATE TABLE',
        '',
        '\x1b[36m-- Table for query planner tests\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'CREATE INDEX idx_planner_hnsw ON planner_test_table USING hnsw (embedding vector_l2_ops);',
      output: [
        'CREATE INDEX',
        '',
        '\x1b[36m-- HNSW index for query optimization\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'EXPLAIN (ANALYZE, BUFFERS) SELECT id, embedding <-> (SELECT embedding FROM planner_test_table LIMIT 1) AS distance FROM planner_test_table ORDER BY embedding <-> (SELECT embedding FROM planner_test_table LIMIT 1) LIMIT 10;',
      output: [
        '                                    QUERY PLAN',
        '--------------------------------------------------------------------------------',
        ' Limit  (cost=0.00..8.45 rows=10) (actual time=0.234..1.567 rows=10 loops=1)',
        '   ->  Index Scan using idx_planner_hnsw on planner_test_table',
        '       (cost=0.00..845.23 rows=1000) (actual time=0.232..1.564 rows=10 loops=1)',
        '       Order By: (embedding <-> \'[0.123,0.456,...]\'::vector)',
        ' Planning Time: 0.123 ms',
        ' Execution Time: 1.589 ms',
        '(5 rows)',
        '',
        '\x1b[36m-- Query planner uses HNSW index for KNN search\x1b[0m',
        '\x1b[32m-- Optimized execution plan with index scan\x1b[0m'
      ],
      isPsqlCommand: true
    }
  ], [])

  // Advanced Types Sub-Tab Commands (from 045_types_basic.sql)
  const advancedTypesCommands = useMemo(() => [
    {
      command: 'psql -d neurondb',
      output: ['psql (18.3)', 'Type "help" for help.', ''],
      isShellCommand: true,
      entersPsql: true
    },
    {
      command: 'SELECT vector_quantize_int8(vector \'[1,2,3,4,5]\'::vector, vector \'[0,0,0,0,0]\'::vector, vector \'[10,10,10,10,10]\'::vector) IS NOT NULL AS int8_quantized;',
      output: [
        ' int8_quantized',
        '----------------',
        '       t',
        '(1 row)',
        '',
        '\x1b[36m-- INT8 quantization: 4x compression\x1b[0m',
        '\x1b[36m-- Requires min/max vectors for scaling\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT vector_quantize_fp16(vector \'[1,2,3,4,5]\'::vector) IS NOT NULL AS fp16_quantized;',
      output: [
        ' fp16_quantized',
        '----------------',
        '       t',
        '(1 row)',
        '',
        '\x1b[36m-- FP16 quantization: 2x compression\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT vector_quantize_binary(vector \'[1,2,3,4,5]\'::vector) IS NOT NULL AS binary_quantized;',
      output: [
        ' binary_quantized',
        '------------------',
        '        t',
        '(1 row)',
        '',
        '\x1b[36m-- Binary quantization: 32x compression\x1b[0m',
        '\x1b[32m-- Extreme compression for approximate search\x1b[0m'
      ],
      isPsqlCommand: true
    },
    {
      command: 'SELECT COUNT(*) AS count, AVG(vector_norm(embedding)) AS avg_norm FROM (SELECT vector \'[1,2,3]\'::vector AS embedding UNION ALL SELECT vector \'[4,5,6]\'::vector) t;',
      output: [
        ' count |  avg_norm',
        '-------+-----------',
        '   2   |  4.183300',
        '(1 row)',
        '',
        '\x1b[36m-- Vector aggregates: COUNT, AVG on vector norms\x1b[0m'
      ],
      isPsqlCommand: true
    }
  ], [])

  // NeuronAgent Commands
  const neuronagentCommands = useMemo(() => [
    {
      command: 'cd NeuronAgent && go run cmd/agent-server/main.go',
      output: [
        '\x1b[32mStarting NeuronAgent server...\x1b[0m',
        'Database connection established',
        'Running migrations...',
        '\x1b[32m✓ Migrations completed\x1b[0m',
        'Starting HTTP server on :8080',
        '\x1b[32m✓ NeuronAgent server ready\x1b[0m',
        '\x1b[36m  REST API: http://localhost:8080/api/v1\x1b[0m',
        '\x1b[36m  WebSocket: ws://localhost:8080/ws\x1b[0m',
        '\x1b[36m  Health: http://localhost:8080/health\x1b[0m'
      ],
      isShellCommand: true
    },
    {
      command: 'curl -X POST http://localhost:8080/api/v1/agents \\',
      output: [
        '  -H "Authorization: Bearer YOUR_API_KEY" \\',
        '  -H "Content-Type: application/json" \\',
        '  -d \'{"name": "research_agent", "profile": "research", "tools": ["sql", "http"]}\''
      ],
      isShellCommand: true
    },
    {
      command: '',
      output: [
        '{',
        '  "id": "550e8400-e29b-41d4-a716-446655440000",',
        '  "name": "research_agent",',
        '  "profile": "research",',
        '  "tools": ["sql", "http"],',
        '  "created_at": "2025-01-15T10:30:00Z",',
        '  "status": "active"',
        '}',
        '',
        '\x1b[32m✓ Agent created successfully\x1b[0m',
        '\x1b[36m  Agent ID: 550e8400-e29b-41d4-a716-446655440000\x1b[0m'
      ],
      isShellCommand: true
    },
    {
      command: 'curl -X POST http://localhost:8080/api/v1/sessions \\',
      output: [
        '  -H "Authorization: Bearer YOUR_API_KEY" \\',
        '  -H "Content-Type: application/json" \\',
        '  -d \'{"agent_id": "550e8400-e29b-41d4-a716-446655440000"}\''
      ],
      isShellCommand: true
    },
    {
      command: '',
      output: [
        '{',
        '  "id": "660e8400-e29b-41d4-a716-446655440001",',
        '  "agent_id": "550e8400-e29b-41d4-a716-446655440000",',
        '  "created_at": "2025-01-15T10:31:00Z",',
        '  "status": "active"',
        '}',
        '',
        '\x1b[32m✓ Session created successfully\x1b[0m',
        '\x1b[36m  Session ID: 660e8400-e29b-41d4-a716-446655440001\x1b[0m'
      ],
      isShellCommand: true
    },
    {
      command: 'curl -X POST http://localhost:8080/api/v1/sessions/660e8400-e29b-41d4-a716-446655440001/messages \\',
      output: [
        '  -H "Authorization: Bearer YOUR_API_KEY" \\',
        '  -H "Content-Type: application/json" \\',
        '  -d \'{"role": "user", "content": "Find documents about machine learning"}\''
      ],
      isShellCommand: true
    },
    {
      command: '',
      output: [
        '{',
        '  "id": "770e8400-e29b-41d4-a716-446655440002",',
        '  "session_id": "660e8400-e29b-41d4-a716-446655440001",',
        '  "role": "assistant",',
        '  "content": "I found 5 documents about machine learning using vector search...",',
        '  "tools_used": ["sql"],',
        '  "created_at": "2025-01-15T10:32:00Z"',
        '}',
        '',
        '\x1b[32m✓ Message processed successfully\x1b[0m',
        '\x1b[36m  Agent used SQL tool to query NeuronDB vector search\x1b[0m',
        '\x1b[36m  Retrieved 5 relevant documents from memory\x1b[0m'
      ],
      isShellCommand: true
    },
    {
      command: 'curl http://localhost:8080/health',
      output: [
        '{',
        '  "status": "healthy",',
        '  "database": "connected",',
        '  "neurondb": "ready",',
        '  "version": "1.0.0"',
        '}',
        '',
        '\x1b[32m✓ NeuronAgent service is healthy\x1b[0m'
      ],
      isShellCommand: true
    }
  ], [])

  // Get commands based on active main tab and sub tab
  const getCommands = useCallback(() => {
    // Handle main tabs without sub-tabs
    if (activeMainTab === 'build') return buildCommands
    if (activeMainTab === 'gpu') return gpuCommands
    if (activeMainTab === 'hybrid') return hybridCommands

    // Handle Vectors main tab with sub-tabs
    if (activeMainTab === 'vectors') {
      switch (activeSubTab) {
        case 'operations': return vectorOperationsCommands
        case 'indexing': return vectorIndexingCommands
        case 'distance': return vectorDistanceCommands
        case 'quantization': return vectorQuantizationCommands
        default: return vectorOperationsCommands
      }
    }

    // Handle ML main tab with sub-tabs
    if (activeMainTab === 'ml') {
      switch (activeSubTab) {
        case 'regression': return mlRegressionCommands
        case 'classification': return mlClassificationCommands
        case 'clustering': return mlClusteringCommands
        case 'boosting': return mlBoostingCommands
        case 'neural': return mlNeuralCommands
        case 'timeseries': return mlTimeseriesCommands
        case 'automl': return mlAutomlCommands
        case 'recommender': return mlRecommenderCommands
        default: return mlRegressionCommands
      }
    }

    if (activeMainTab === 'embeddings') {
      switch (activeSubTab) {
        case 'text': return embeddingCommands
        case 'batch': return embeddingsBatchCommands
        case 'config': return embeddingsConfigCommands
        case 'hf_models': return embeddingsHfModelsCommands
        case 'multimodal': return multimodalCommands
        default: return embeddingCommands
      }
    }

    if (activeMainTab === 'llm') {
      switch (activeSubTab) {
        case 'integration': return ragCommands
        case 'reranking': return rerankingCommands
        case 'rag': return ragCommands
        default: return ragCommands
      }
    }

    if (activeMainTab === 'advanced') {
      switch (activeSubTab) {
        case 'sparse': return sparseCommands
        case 'quantization': return quantizationCommands
        case 'workers': return workersCommands
        case 'onnx': return advancedOnnxCommands
        case 'metrics': return advancedMetricsCommands
        case 'planner': return advancedPlannerCommands
        case 'types': return advancedTypesCommands
        default: return sparseCommands
      }
    }

    // Handle NeuronAgent tab
    if (activeMainTab === 'neuronagent') return neuronagentCommands

    // Handle NeuronMCP tab (placeholder for now)
    if (activeMainTab === 'neuronmcp') return buildCommands

    return buildCommands
  }, [activeMainTab, activeSubTab, buildCommands, vectorOperationsCommands, vectorIndexingCommands, vectorDistanceCommands, vectorQuantizationCommands, mlRegressionCommands, mlClassificationCommands, mlClusteringCommands, mlBoostingCommands, mlNeuralCommands, mlTimeseriesCommands, mlAutomlCommands, mlRecommenderCommands, embeddingCommands, embeddingsBatchCommands, embeddingsConfigCommands, embeddingsHfModelsCommands, multimodalCommands, gpuCommands, hybridCommands, ragCommands, rerankingCommands, sparseCommands, quantizationCommands, advancedOnnxCommands, advancedMetricsCommands, advancedPlannerCommands, advancedTypesCommands, workersCommands, neuronagentCommands])

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
  }, [speedMultiplier, baseTimings])

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
  }, [speedMultiplier, baseTimings])

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
  }, [isRunning, getCommands, typeCommand, showOutput, cleanup, speedMultiplier, baseTimings])

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
    // Reset sub-tab to default when main tab changes
    const structure = tabStructure[activeMainTab]
    if (structure.subTabs.length > 0) {
      setActiveSubTab(structure.defaultSubTab)
    } else {
      setActiveSubTab('')
    }
  }, [cleanup, activeMainTab, tabStructure])

  const copyToClipboard = useCallback(() => {
    const text = commandHistory
      .map(cmd => `$ ${cmd.command}\n${cmd.output.join('\n')}`)
      .join('\n\n')
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [commandHistory])

  // Get dynamic welcome message based on active tab
  const getWelcomeMessage = useCallback(() => {
    const getTabName = (tab: string) => {
      if (tab === 'llm') return 'LLM'
      return tab.charAt(0).toUpperCase() + tab.slice(1)
    }

    const getSubTabName = (subTab: string) => {
      return subTab.split('_').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ')
    }

    let description = ''
    let badges: string[] = []

    if (activeMainTab === 'build') {
      description = 'Building and installing NeurondB extension for PostgreSQL'
      badges = ['📦 Installation', '⚙️ Configuration', '🔧 Setup']
    } else if (activeMainTab === 'vectors') {
      if (activeSubTab === 'operations') {
        description = 'Vector operations: creation, manipulation, and basic arithmetic on vector data types'
        badges = ['➕ Vector Creation', '🔢 Arithmetic', '📐 Manipulation']
      } else if (activeSubTab === 'indexing') {
        description = 'Vector indexing: creating and using HNSW indexes for fast similarity search'
        badges = ['🔍 HNSW Index', '⚡ Fast Search', '📊 Index Stats']
      } else if (activeSubTab === 'distance') {
        description = 'Distance metrics: L2, cosine, L1, Hamming, and other distance calculations'
        badges = ['📏 L2 Distance', '📐 Cosine Distance', '🔢 Multiple Metrics']
      } else if (activeSubTab === 'quantization') {
        description = 'Vector quantization: FP16, INT8, FP8 compression for memory efficiency'
        badges = ['💾 Compression', '⚡ Performance', '🎯 Accuracy']
      }
    } else if (activeMainTab === 'ml') {
      if (activeSubTab === 'regression') {
        description = 'ML regression: linear, polynomial, and advanced regression models'
        badges = ['📈 Linear Regression', '📊 Polynomial', '🎯 Predictions']
      } else if (activeSubTab === 'classification') {
        description = 'ML classification: logistic regression, SVM, and ensemble classifiers'
        badges = ['🎯 Classification', '📊 SVM', '🌳 Decision Trees']
      } else if (activeSubTab === 'clustering') {
        description = 'ML clustering: K-means, DBSCAN, and hierarchical clustering algorithms'
        badges = ['🔵 K-means', '📊 DBSCAN', '🌳 Hierarchical']
      } else if (activeSubTab === 'boosting') {
        description = 'ML boosting: gradient boosting, XGBoost, and ensemble methods'
        badges = ['🚀 Gradient Boosting', '⚡ XGBoost', '🎯 Ensemble']
      } else if (activeSubTab === 'neural') {
        description = 'Neural networks: deep learning models for complex pattern recognition'
        badges = ['🧠 Neural Networks', '🔗 Deep Learning', '📊 Training']
      } else if (activeSubTab === 'timeseries') {
        description = 'Time series analysis: forecasting, anomaly detection, and trend analysis'
        badges = ['📈 Forecasting', '🔍 Anomaly Detection', '📊 Trends']
      } else if (activeSubTab === 'automl') {
        description = 'AutoML: automated model selection, hyperparameter tuning, and optimization'
        badges = ['🤖 AutoML', '⚙️ Auto-tuning', '🎯 Optimization']
      } else if (activeSubTab === 'recommender') {
        description = 'Recommendation systems: collaborative filtering and content-based recommendations'
        badges = ['💡 Recommendations', '👥 Collaborative', '📝 Content-based']
      }
    } else if (activeMainTab === 'embeddings') {
      if (activeSubTab === 'text') {
        description = 'Text embeddings: generating vector embeddings from text using pre-trained models'
        badges = ['📝 Text Embeddings', '🤖 Pre-trained Models', '🔢 Vector Generation']
      } else if (activeSubTab === 'batch') {
        description = 'Batch embeddings: processing multiple texts efficiently in batches'
        badges = ['⚡ Batch Processing', '📦 Bulk Operations', '🚀 Performance']
      } else if (activeSubTab === 'config') {
        description = 'Embedding configuration: customizing models, dimensions, and parameters'
        badges = ['⚙️ Configuration', '🎛️ Custom Models', '📊 Parameters']
      } else if (activeSubTab === 'hf_models') {
        description = 'Hugging Face models: using popular transformer models for embeddings'
        badges = ['🤗 Hugging Face', '🔄 Transformers', '📚 Model Library']
      } else if (activeSubTab === 'multimodal') {
        description = 'Multimodal embeddings: processing text, images, and other data types'
        badges = ['🖼️ Images', '📝 Text', '🎨 Multimodal']
      }
    } else if (activeMainTab === 'llm') {
      if (activeSubTab === 'integration') {
        description = 'LLM integration: connecting to large language models for text generation'
        badges = ['🤖 LLM Integration', '💬 Text Generation', '🔗 API Connection']
      } else if (activeSubTab === 'reranking') {
        description = 'LLM reranking: using language models to improve search result ranking'
        badges = ['📊 Reranking', '🎯 Relevance', '🔍 Search Quality']
      } else if (activeSubTab === 'rag') {
        description = 'RAG (Retrieval-Augmented Generation): combining vector search with LLM generation'
        badges = ['🔍 Retrieval', '🤖 Generation', '💡 RAG Pipeline']
      }
    } else if (activeMainTab === 'gpu') {
      description = 'GPU acceleration: leveraging CUDA, ROCm, and Metal for high-performance computing'
      badges = ['🚀 CUDA', '⚡ ROCm', '🍎 Metal', '🔥 GPU Compute']
    } else if (activeMainTab === 'hybrid') {
      description = 'Hybrid search: combining vector similarity with full-text search for better results'
      badges = ['🔍 Vector Search', '📝 Full-text', '🎯 Hybrid Fusion']
    } else if (activeMainTab === 'advanced') {
      if (activeSubTab === 'sparse') {
        description = 'Sparse vectors: efficient storage and search for high-dimensional sparse data'
        badges = ['💾 Sparse Storage', '⚡ Efficient Search', '📊 High Dimensions']
      } else if (activeSubTab === 'quantization') {
        description = 'Advanced quantization: binary, scalar, and product quantization techniques'
        badges = ['💾 Binary Quantization', '⚡ Scalar Quantization', '🎯 Product Quantization']
      } else if (activeSubTab === 'workers') {
        description = 'Background workers: async processing, defragmentation, and monitoring workers'
        badges = ['⚙️ Async Workers', '🔧 Defragmentation', '📊 Monitoring']
      } else if (activeSubTab === 'onnx') {
        description = 'ONNX models: running optimized machine learning models in PostgreSQL'
        badges = ['🤖 ONNX Runtime', '⚡ Optimized Models', '📊 Inference']
      } else if (activeSubTab === 'metrics') {
        description = 'Performance metrics: monitoring query performance, index stats, and system metrics'
        badges = ['📊 Query Metrics', '⚡ Performance', '📈 Statistics']
      } else if (activeSubTab === 'planner') {
        description = 'Query planner: advanced query optimization and execution planning'
        badges = ['🎯 Query Planning', '⚡ Optimization', '📊 Execution']
      } else if (activeSubTab === 'types') {
        description = 'Advanced types: custom vector types, sparse vectors, and specialized data structures'
        badges = ['📦 Custom Types', '💾 Sparse Vectors', '🔧 Specialized']
      }
    }

    const tabDisplay = activeSubTab 
      ? `${getTabName(activeMainTab)}: ${getSubTabName(activeSubTab)}`
      : getTabName(activeMainTab)

    // Only return content if we have a specific description for the selected demo
    return { description, badges, tabDisplay }
  }, [activeMainTab, activeSubTab])

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
        
        {/* Main Tabs */}
        <div className="flex gap-2 flex-wrap mb-2">
          {(['build', 'vectors', 'ml', 'embeddings', 'llm', 'gpu', 'hybrid', 'advanced', 'neuronagent', 'neuronmcp'] as const).map((mainTab) => (
          <button
              key={mainTab}
            onClick={() => {
                setActiveMainTab(mainTab)
              resetDemo()
            }}
            disabled={isRunning}
              className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all capitalize ${
                activeMainTab === mainTab
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
            } ${isRunning ? 'cursor-not-allowed opacity-50' : ''}`}
          >
              {mainTab === 'llm' ? 'LLM' : mainTab === 'neuronagent' ? 'NeuronAgent' : mainTab === 'neuronmcp' ? 'NeuronMCP' : mainTab}
          </button>
          ))}
        </div>

        {/* Sub Tabs (shown when main tab has sub-tabs) */}
        {tabStructure[activeMainTab].subTabs.length > 0 && (
          <div className="flex gap-2 flex-wrap border-t border-gray-700 pt-2">
            {tabStructure[activeMainTab].subTabs.map((subTab) => (
          <button
                key={subTab}
            onClick={() => {
                  setActiveSubTab(subTab)
            }}
            disabled={isRunning}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all capitalize ${
                  activeSubTab === subTab
                    ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/20'
                    : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700 hover:text-gray-300'
            } ${isRunning ? 'cursor-not-allowed opacity-50' : ''}`}
          >
                {subTab}
          </button>
            ))}
        </div>
        )}
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
        {commandHistory.length === 0 && !isRunning && (() => {
          const { description, badges, tabDisplay } = getWelcomeMessage()
          return (
            <div className="text-gray-500 mb-4">
              <div className="text-cyan-400 text-base font-bold mb-2 flex items-center gap-2">
                <Terminal className="w-5 h-5" />
                NeurondB Interactive Demo Terminal
              </div>
              {description && (
                <div className="text-gray-400 text-xs mb-3">
                  {description}
                </div>
              )}
              {badges.length > 0 && (
                <div className="text-emerald-400 text-xs font-semibold mb-2 flex flex-wrap gap-2">
                  {badges.map((badge, idx) => (
                    <span key={idx} className="px-2 py-1 bg-emerald-400/10 rounded">{badge}</span>
                  ))}
                </div>
              )}
              <div className="text-gray-600 text-xs mt-2">
                {tabDisplay ? (
                  <>Ready to demonstrate <span className="text-cyan-400 font-semibold">{tabDisplay}</span>. Click "Run Demo" to begin.</>
                ) : (
                  'Select a tab above and click "Run Demo" to begin exploring NeuronDB capabilities'
                )}
              </div>
            </div>
          )
        })()}

        {/* Command History */}
        {commandHistory.map((cmd, index) => (
          <div key={index} className="mb-3">
            {/* Command prompt with timestamp */}
            <div className="flex items-start gap-2 mb-1 font-mono">
              {cmd.isPsqlCommand ? (
                <>
                  <span className="text-emerald-400 font-bold whitespace-nowrap">neurondb=#</span>
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
                <span className="text-emerald-400 font-bold whitespace-nowrap">neurondb=#</span>
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
                <span className="text-emerald-400 font-bold whitespace-nowrap">neurondb=#</span>
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
                  ? (
                    <span className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Demo complete ({commandHistory.length} commands executed)</span>
                    </span>
                  )
                  : (
                    <span className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-cyan-400" />
                      <span>Ready to explore NeuronDB</span>
                    </span>
                  )}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NeurondBDemoTerminal

