import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'
import BashCodeBlock from '../../../../components/BashCodeBlock'

export const metadata: Metadata = {
  title: 'NeurondB Troubleshooting | Common Issues & Fixes',
  description: 'Diagnose and resolve NeurondB installation, GPU acceleration, clustering, and indexing issues with step-by-step SQL and configuration commands.',
}

const tableOfContents: TocItem[] = [
  { id: 'fast-triage', title: 'Fast triage checklist' },
  { id: 'gpu-issues', title: 'GPU acceleration issues' },
  { id: 'ml-clustering', title: 'ML clustering & analytics issues' },
  { id: 'index-diagnostics', title: 'Index build & query diagnostics' },
  { id: 'embedding-llm', title: 'Embedding & LLM integration issues' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/configuration',
  label: 'Configuration',
}

const nextLink: NavLink | undefined = undefined

export default function NeurondBTroubleshootingPage() {
  return (
    <PostgresDocsLayout
      title="Resolve NeurondB Operational Issues"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="fast-triage">
        <h2>Fast triage checklist</h2>
        <p>Before troubleshooting, verify:</p>
        <ul>
          <li>Enable <code>log_min_messages = debug1</code> temporarily when reproducing issues</li>
          <li>Verify <code>SELECT * FROM pg_extension WHERE extname = 'neurondb';</code> returns the expected version</li>
          <li>Collect <code>EXPLAIN (ANALYZE, BUFFERS)</code> plans for slow queries before tuning</li>
          <li>Ensure GPU drivers (CUDA/ROCm) are the same version used during compilation</li>
        </ul>
        <p><strong>Note:</strong> Run commands in a staging environment first. Switch settings back after confirming the fix.</p>
      </section>

      <section id="gpu-issues">
        <h2>GPU acceleration issues</h2>
        <p>Fix runtime failures when enabling CUDA or ROCm acceleration.</p>

        <h3>Error: "GPU function not available"</h3>
        <p>NeurondB cannot locate compiled GPU kernels or drivers.</p>
        <p>Confirm that GPU support was compiled and drivers are visible.</p>
        <BashCodeBlock
          title="Diagnostic commands"
          code={`# Confirm NeurondB was built with GPU support
strings $(pg_config --pkglibdir)/neurondb.so | grep USE_GPU

# Check driver visibility
nvidia-smi            # CUDA
rocm-smi              # ROCm
ls /dev/nvidia*       # CUDA devices
ls /dev/kfd           # ROCm device`}
        />
        <SqlCodeBlock
          title="Fallback to CPU while debugging"
          code={`-- Allow CPU fallback if GPU init fails
ALTER SYSTEM SET neurondb.gpu_fail_open = on;
SELECT pg_reload_conf();`}
        />

        <h3>GPU slower than CPU</h3>
        <p>Batch sizes or stream counts are too small to saturate the GPU.</p>
        <SqlCodeBlock
          title="Increase GPU parallelism"
          code={`SET neurondb.gpu_batch_size = 5000;
SET neurondb.gpu_streams = 8;
SET neurondb.gpu_memory_pool_mb = 2048;`}
        />
        <p>Re-run workload and compare latency using <code>\timing</code>.</p>

        <h3>Error: GPU out of memory</h3>
        <p>Reduce GPU batch sizes and memory pool before reattempting.</p>
        <SqlCodeBlock
          title="Reduce footprint"
          code={`SET neurondb.gpu_batch_size = 500;
SET neurondb.gpu_memory_pool_mb = 256;

-- Optional: quantize vectors to int8 to shrink memory
UPDATE documents SET embedding = vector_to_int8_gpu(embedding);`}
        />
      </section>

      <section id="ml-clustering">
        <h2>ML clustering & analytics issues</h2>
        <p>Address convergence, accuracy, and data quality warnings from NeurondB ML pipelines.</p>

        <h3>"K-Means did not converge"</h3>
        <p>Increase iteration budget or relax tolerance for the dataset.</p>
        <SqlCodeBlock
          title="Retry K-Means with relaxed thresholds"
          code={`SELECT *
FROM cluster_kmeans(
  (SELECT embedding FROM documents),
  5,         -- k
  500,       -- max_iter
  0.001      -- tol
);`}
        />

        <h3>Clustering quality is poor</h3>
        <p>Normalize embeddings and reassess the optimal k value.</p>
        <SqlCodeBlock
          title="Normalize before clustering"
          code={`WITH normalized AS (
  SELECT id,
         embedding / ||embedding|| AS norm_embedding
  FROM documents
)
SELECT *
FROM cluster_kmeans(
  (SELECT norm_embedding FROM normalized),
  6,
  150,
  0.0005
);`}
        />

        <h3>Outlier detection insufficient data</h3>
        <p>Collect more points or lower the Z-score threshold.</p>
        <SqlCodeBlock
          title="Adjust Z-score"
          code={`SELECT *
FROM detect_outliers_zscore(
  (SELECT embedding FROM documents),
  2.5  -- threshold
);`}
        />
      </section>

      <section id="index-diagnostics">
        <h2>Index build & query diagnostics</h2>
        <p>Resolve index build failures, poor recall, and sequential scans.</p>

        <h3>Index not used / sequential scan</h3>
        <SqlCodeBlock
          title="Verify plan"
          code={`EXPLAIN (ANALYZE, BUFFERS)
SELECT *
FROM documents
ORDER BY embedding <-> '{0.1,0.2,...}'::vector
LIMIT 10;`}
        />
        <p>If planner chooses seq scan, ensure the index operator class matches the query, or temporarily <code>SET enable_seqscan = off</code>.</p>

        <h3>Index build failed: out of memory</h3>
        <SqlCodeBlock
          title="Tune HNSW / IVF"
          code={`SET maintenance_work_mem = '4GB';

-- HNSW with lower memory
CREATE INDEX docs_hnsw ON documents
USING hnsw (embedding vector_l2_ops)
WITH (m = 12, ef_construction = 32);

-- Alternative IVF index
CREATE INDEX docs_ivf ON documents
USING ivfflat (embedding vector_l2_ops)
WITH (lists = 100);`}
        />

        <h3>Low recall / missing neighbours</h3>
        <SqlCodeBlock
          title="Increase search width"
          code={`SET hnsw.ef_search = 200;
-- IVF equivalent
SET ivfflat.probes = 20;`}
        />
      </section>

      <section id="embedding-llm">
        <h2>Embedding & LLM integration issues</h2>
        <p>Troubleshoot embedding API failures, timeouts, and dimension mismatches.</p>

        <h3>LLM API unauthorized</h3>
        <SqlCodeBlock
          title="Set API key"
          code={`SET neurondb.llm_api_key = 'sk-...';
ALTER DATABASE mydb SET neurondb.llm_api_key = 'sk-...';`}
        />

        <h3>Embedding API timeout</h3>
        <SqlCodeBlock
          title="Extend timeout & retries"
          code={`SET neurondb.llm_timeout_ms = 60000;
SET neurondb.llm_max_retries = 5;`}
        />

        <h3>Dimension mismatch errors</h3>
        <SqlCodeBlock
          title="Align vector dimensions"
          code={`ALTER TABLE documents
  ALTER COLUMN embedding
  TYPE vector(3072);

-- Confirm new dimension
SELECT attname, atttypmod
FROM pg_attribute
WHERE attrelid = 'documents'::regclass
  AND attname = 'embedding';`}
        />
      </section>

      <section>
        <h2>Next Steps</h2>
        <ul>
          <li><a href="/docs/neurondb/configuration">Configuration Reference</a> - Verify each GUC parameter and recommended value after making changes.</li>
          <li><a href="/docs/neurondb/performance">Performance Tuning</a> - Benchmark NeurondB after applying fixes to confirm SLO improvements.</li>
          <li><a href="https://github.com/pgElephant/NeurondB/issues" target="_blank" rel="noopener noreferrer">Open GitHub Issue</a> - Share logs and repro steps with the community for unresolved bugs.</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}
