import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Troubleshooting | NeuronDB',
  description: 'Common issues, error messages, and solutions for NeuronDB vector database operations.'
};

export default function TroubleshootingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Troubleshooting</h1>
        <p className="text-lg text-muted-foreground">
          Solutions to common NeuronDB issues, error messages, and configuration problems.
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-4">GPU Acceleration Issues</h2>
        
        <div className="space-y-6">
          <div className="p-4 border border-red-200 dark:border-red-800 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-red-700 dark:text-red-400">
              Error: "GPU function not available" or "CUDA initialization failed"
            </h3>
            <div className="space-y-3 text-sm">
              <p><strong>Cause:</strong> GPU support not compiled, CUDA/ROCm not installed, or GPU device unavailable.</p>
              <p><strong>Solutions:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Verify NeuronDB was compiled with GPU support: Check build logs for <code>-DUSE_GPU</code></li>
                <li>Ensure CUDA or ROCm drivers are installed: <code>nvidia-smi</code> or <code>rocm-smi</code></li>
                <li>Check GPU device availability: <code>ls /dev/nvidia*</code> or <code>ls /dev/kfd</code></li>
                <li>Set <code>neurondb.gpu_fail_open = true</code> to fallback to CPU on GPU errors</li>
              </ul>
              <pre className="bg-muted p-3 rounded mt-2 overflow-x-auto">
                <code>{`
-- Enable fail-open mode (CPU fallback)
SET neurondb.gpu_fail_open = true;

-- Verify GPU status in logs
SET neurondb.log_level = 'debug';`}</code>
              </pre>
            </div>
          </div>

          <div className="p-4 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-yellow-700 dark:text-yellow-400">
              Warning: GPU operations slower than CPU
            </h3>
            <div className="space-y-3 text-sm">
              <p><strong>Cause:</strong> Small batch sizes, inefficient memory transfers, or insufficient GPU parallelism.</p>
              <p><strong>Solutions:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Increase <code>neurondb.gpu_batch_size</code> (try 1000–10000 for large datasets)</li>
                <li>Use multiple streams: <code>SET neurondb.gpu_streams = 8;</code></li>
                <li>Increase memory pool: <code>SET neurondb.gpu_memory_pool_mb = 1024;</code></li>
                <li>GPU acceleration benefits large batch operations; small queries may be faster on CPU</li>
              </ul>
              <pre className="bg-muted p-3 rounded mt-2 overflow-x-auto">
                <code>{`
-- Optimize for large batches
SET neurondb.gpu_batch_size = 5000;
SET neurondb.gpu_streams = 8;
SET neurondb.gpu_memory_pool_mb = 2048;`}</code>
              </pre>
            </div>
          </div>

          <div className="p-4 border border-red-200 dark:border-red-800 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-red-700 dark:text-red-400">
              Error: "GPU out of memory"
            </h3>
            <div className="space-y-3 text-sm">
              <p><strong>Cause:</strong> Batch size too large for available GPU memory.</p>
              <p><strong>Solutions:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Reduce <code>neurondb.gpu_batch_size</code></li>
                <li>Lower <code>neurondb.gpu_memory_pool_mb</code></li>
                <li>Use smaller vector dimensions or quantization</li>
                <li>Close other GPU-using applications</li>
              </ul>
              <pre className="bg-muted p-3 rounded mt-2 overflow-x-auto">
                <code>{`
-- Reduce memory usage
SET neurondb.gpu_batch_size = 500;
SET neurondb.gpu_memory_pool_mb = 256;

-- Use quantization to reduce memory
SELECT vector_to_int8_gpu(embedding) FROM documents;`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">ML Analytics Issues</h2>
        
        <div className="space-y-6">
          <div className="p-4 border border-red-200 dark:border-red-800 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-red-700 dark:text-red-400">
              Error: "K-Means did not converge"
            </h3>
            <div className="space-y-3 text-sm">
              <p><strong>Cause:</strong> Max iterations reached before clusters stabilized.</p>
              <p><strong>Solutions:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Increase <code>max_iter</code> parameter (e.g., 200, 500)</li>
                <li>Adjust tolerance: lower <code>tol</code> for faster convergence</li>
                <li>Try different <code>k</code> values; too many clusters can slow convergence</li>
                <li>Check for outliers or scale features before clustering</li>
              </ul>
              <pre className="bg-muted p-3 rounded mt-2 overflow-x-auto">
                <code>{`
-- Increase iterations and relax tolerance
SELECT * FROM cluster_kmeans(
  (SELECT embedding FROM documents),
  5,
  500,  -- increased max_iter
  0.001  -- relaxed tolerance
);`}</code>
              </pre>
            </div>
          </div>

          <div className="p-4 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-yellow-700 dark:text-yellow-400">
              Issue: Clustering produces poor quality results
            </h3>
            <div className="space-y-3 text-sm">
              <p><strong>Cause:</strong> Inappropriate <code>k</code>, non-normalized embeddings, or skewed data distribution.</p>
              <p><strong>Solutions:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Normalize embeddings before clustering (especially for GMM)</li>
                <li>Use elbow method or silhouette analysis to find optimal <code>k</code></li>
                <li>Try mini-batch K-Means for very large datasets</li>
                <li>Consider GMM for overlapping clusters</li>
              </ul>
              <pre className="bg-muted p-3 rounded mt-2 overflow-x-auto">
                <code>{`
-- Normalize embeddings
WITH normalized AS (
  SELECT id, embedding / ||embedding|| AS norm_emb
  FROM documents
)
SELECT * FROM cluster_kmeans(
  (SELECT norm_emb FROM normalized),
  5, 100, 0.0001
);`}</code>
              </pre>
            </div>
          </div>

          <div className="p-4 border border-red-200 dark:border-red-800 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-red-700 dark:text-red-400">
              Error: "Outlier detection failed: insufficient data"
            </h3>
            <div className="space-y-3 text-sm">
              <p><strong>Cause:</strong> Not enough data points for statistical outlier detection.</p>
              <p><strong>Solutions:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Ensure at least 30–50 data points for Z-score method</li>
                <li>Lower the Z-score threshold for more sensitive detection</li>
                <li>Combine with other outlier detection methods for robustness</li>
              </ul>
              <pre className="bg-muted p-3 rounded mt-2 overflow-x-auto">
                <code>{`
-- Lower threshold for more outliers
SELECT * FROM detect_outliers_zscore(
  (SELECT embedding FROM documents),
  2.5  -- lower threshold (default 3.0)
);`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Indexing and Query Issues</h2>
        
        <div className="space-y-6">
          <div className="p-4 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-yellow-700 dark:text-yellow-400">
              Issue: Index not being used (sequential scan instead of index scan)
            </h3>
            <div className="space-y-3 text-sm">
              <p><strong>Cause:</strong> Operator class mismatch, missing index, or planner cost estimation.</p>
              <p><strong>Solutions:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Verify index operator class matches query: <code>vector_l2_ops</code> for <code>&lt;-&gt;</code></li>
                <li>Check index exists: <code>\d tablename</code></li>
                <li>Use <code>EXPLAIN ANALYZE</code> to verify index usage</li>
                <li>Increase <code>effective_cache_size</code> if planner prefers sequential scan</li>
              </ul>
              <pre className="bg-muted p-3 rounded mt-2 overflow-x-auto">
                <code>{`
-- Verify index usage
EXPLAIN ANALYZE
SELECT * FROM documents
ORDER BY embedding <-> '[1,2,3]'::vector
LIMIT 10;

-- Expected: Index Scan using hnsw_idx on documents

-- Force index usage (if needed)
SET enable_seqscan = off;`}</code>
              </pre>
            </div>
          </div>

          <div className="p-4 border border-red-200 dark:border-red-800 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-red-700 dark:text-red-400">
              Error: "Index build failed: out of memory"
            </h3>
            <div className="space-y-3 text-sm">
              <p><strong>Cause:</strong> HNSW index requires significant memory during construction.</p>
              <p><strong>Solutions:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Increase <code>maintenance_work_mem</code> (e.g., 2GB, 4GB)</li>
                <li>Lower <code>m</code> or <code>ef_construction</code> parameters</li>
                <li>Switch to IVF index for very large datasets</li>
                <li>Build index in smaller batches or use parallel workers</li>
              </ul>
              <pre className="bg-muted p-3 rounded mt-2 overflow-x-auto">
                <code>{`
-- Increase memory for index build
SET maintenance_work_mem = '4GB';

-- Lower HNSW parameters
CREATE INDEX ON documents USING hnsw (embedding vector_l2_ops)
WITH (m = 12, ef_construction = 32);

-- Or switch to IVF
CREATE INDEX ON documents USING ivfflat (embedding vector_l2_ops)
WITH (lists = 100);`}</code>
              </pre>
            </div>
          </div>

          <div className="p-4 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-yellow-700 dark:text-yellow-400">
              Issue: Low recall (relevant results not returned)
            </h3>
            <div className="space-y-3 text-sm">
              <p><strong>Cause:</strong> ANN index approximation or insufficient search width.</p>
              <p><strong>Solutions:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Increase <code>hnsw.ef_search</code> (HNSW) or <code>ivfflat.probes</code> (IVF)</li>
                <li>Rebuild index with higher <code>ef_construction</code> (HNSW) or more <code>lists</code> (IVF)</li>
                <li>Use exact search (no index) for 100% recall if dataset is small</li>
                <li>Check that distance metric matches embedding model recommendations</li>
              </ul>
              <pre className="bg-muted p-3 rounded mt-2 overflow-x-auto">
                <code>{`
-- Increase search width for HNSW
SET hnsw.ef_search = 200;

-- Increase probes for IVF
SET ivfflat.probes = 20;

-- Exact search (no index)
DROP INDEX documents_embedding_idx;
SELECT * FROM documents ORDER BY embedding <-> query LIMIT 10;`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Embedding and LLM Issues</h2>
        
        <div className="space-y-6">
          <div className="p-4 border border-red-200 dark:border-red-800 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-red-700 dark:text-red-400">
              Error: "LLM API call failed: Unauthorized"
            </h3>
            <div className="space-y-3 text-sm">
              <p><strong>Cause:</strong> Invalid or missing API key.</p>
              <p><strong>Solutions:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Verify <code>neurondb.llm_api_key</code> is set correctly</li>
                <li>Check API key has not expired or been revoked</li>
                <li>Ensure API key has embedding permissions (not just completion)</li>
                <li>Use environment variables or secrets manager for production</li>
              </ul>
              <pre className="bg-muted p-3 rounded mt-2 overflow-x-auto">
                <code>{`
-- Set API key (session-level for testing)
SET neurondb.llm_api_key = 'sk-...';

-- Persistent configuration (postgresql.conf or ALTER DATABASE)
ALTER DATABASE mydb SET neurondb.llm_api_key = 'sk-...';`}</code>
              </pre>
            </div>
          </div>

          <div className="p-4 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-yellow-700 dark:text-yellow-400">
              Warning: "LLM API timeout"
            </h3>
            <div className="space-y-3 text-sm">
              <p><strong>Cause:</strong> Slow network, API rate limits, or large batch size.</p>
              <p><strong>Solutions:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Increase <code>neurondb.llm_timeout_ms</code> (default 30000ms)</li>
                <li>Reduce batch size for <code>neurondb_embed_batch</code></li>
                <li>Enable retries: <code>SET neurondb.llm_max_retries = 5;</code></li>
                <li>Check network connectivity and API status</li>
              </ul>
              <pre className="bg-muted p-3 rounded mt-2 overflow-x-auto">
                <code>{`
-- Increase timeout and retries
SET neurondb.llm_timeout_ms = 60000;  -- 60 seconds
SET neurondb.llm_max_retries = 5;

-- Smaller batches
SELECT neurondb_embed_batch(
  ARRAY(SELECT content FROM documents LIMIT 100),  -- batch 100 at a time
  'text-embedding-ada-002'
);`}</code>
              </pre>
            </div>
          </div>

          <div className="p-4 border border-red-200 dark:border-red-800 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-red-700 dark:text-red-400">
              Error: "Dimension mismatch"
            </h3>
            <div className="space-y-3 text-sm">
              <p><strong>Cause:</strong> Vector dimension doesn't match column definition or model output.</p>
              <p><strong>Solutions:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Verify embedding model output dimensions (e.g., ada-002: 1536, ada-003: 3072)</li>
                <li>Match column definition: <code>ALTER TABLE ... ALTER COLUMN embedding TYPE vector(3072);</code></li>
                <li>Use correct model name when calling <code>neurondb_embed</code></li>
              </ul>
              <pre className="bg-muted p-3 rounded mt-2 overflow-x-auto">
                <code>{`
-- Check current column dimension
SELECT attname, atttypmod 
FROM pg_attribute 
WHERE attrelid = 'documents'::regclass AND attname = 'embedding';

-- Update column dimension
ALTER TABLE documents ALTER COLUMN embedding TYPE vector(3072);`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Performance Issues</h2>
        
        <div className="space-y-6">
          <div className="p-4 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-yellow-700 dark:text-yellow-400">
              Issue: Slow queries on large datasets
            </h3>
            <div className="space-y-3 text-sm">
              <p><strong>Cause:</strong> Missing indexes, suboptimal index parameters, or non-selective queries.</p>
              <p><strong>Solutions:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Create appropriate vector indexes (HNSW or IVF)</li>
                <li>Tune runtime GUCs: <code>hnsw.ef_search</code>, <code>ivfflat.probes</code></li>
                <li>Use LIMIT to reduce result set size</li>
                <li>Consider hybrid search to pre-filter with metadata</li>
              </ul>
            </div>
          </div>

          <div className="p-4 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-yellow-700 dark:text-yellow-400">
              Issue: High memory usage
            </h3>
            <div className="space-y-3 text-sm">
              <p><strong>Cause:</strong> Large HNSW indexes, high batch sizes, or insufficient memory configuration.</p>
              <p><strong>Solutions:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Switch to IVF for memory-constrained environments</li>
                <li>Lower HNSW <code>m</code> parameter</li>
                <li>Use vector quantization (int8, fp16, binary) to reduce storage</li>
                <li>Increase <code>shared_buffers</code> and <code>effective_cache_size</code></li>
              </ul>
              <pre className="bg-muted p-3 rounded mt-2 overflow-x-auto">
                <code>{`
-- Use quantization to save memory
ALTER TABLE documents ADD COLUMN embedding_int8 vector;
UPDATE documents SET embedding_int8 = vector_to_int8_gpu(embedding);
CREATE INDEX ON documents USING hnsw (embedding_int8 vector_l2_ops);`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Diagnostic Tools</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">Query Analysis</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`
-- Detailed query plan
EXPLAIN (ANALYZE, BUFFERS, VERBOSE)
SELECT * FROM documents
ORDER BY embedding <-> '[1,2,3]'::vector
LIMIT 10;

-- Check index size and statistics
SELECT 
  schemaname, tablename, indexname, 
  pg_size_pretty(pg_relation_size(indexrelid)) AS index_size
FROM pg_stat_user_indexes
WHERE tablename = 'documents';`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Configuration Check</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`
-- View current NeuronDB settings
SELECT name, setting, source 
FROM pg_settings 
WHERE name LIKE 'neurondb.%'
ORDER BY name;

-- Check GPU status in logs
SHOW neurondb.log_level;
SET neurondb.log_level = 'debug';`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Performance Monitoring</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`
-- Enable timing
\timing on

-- Track execution statistics
SELECT 
  calls, total_exec_time, mean_exec_time, query
FROM pg_stat_statements
WHERE query LIKE '%embedding%'
ORDER BY mean_exec_time DESC
LIMIT 10;`}</code>
            </pre>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Getting Help</h2>
        <div className="space-y-3">
          <p>If you encounter issues not covered here:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Check PostgreSQL logs for detailed error messages</li>
            <li>Enable <code>neurondb.log_level = 'debug'</code> for verbose output</li>
            <li>Review the <a href="/docs/neurondb/configuration" className="text-blue-600 hover:underline">Configuration</a> guide for GUC details</li>
            <li>Consult the <a href="/docs/neurondb/sql-api" className="text-blue-600 hover:underline">SQL API Reference</a> for function signatures</li>
            <li>Visit the NeuronDB GitHub repository for issue tracking and community support</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
