import { Metadata } from 'next'
import GettingStartedLayout from '../../../../components/GettingStartedLayout'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'
import BashCodeBlock from '../../../../components/BashCodeBlock'
import { NeurondBIcon } from '../../../../components/ProductIcons'

export const metadata: Metadata = {
  title: 'NeurondB Troubleshooting | Common Issues & Fixes',
  description: 'Diagnose and resolve NeurondB installation, GPU acceleration, clustering, and indexing issues with step-by-step SQL and configuration commands.',
}

export default function NeurondBTroubleshootingPage() {
  return (
    <GettingStartedLayout
      product="NeurondB"
      hero={{
        label: 'NeurondB',
        labelIcon: <NeurondBIcon size={20} />, 
        labelAccent: 'indigo',
        title: 'Resolve NeurondB Operational Issues',
        description:
          'Use the guided diagnostics below to fix GPU acceleration errors, ML clustering failures, index build problems, and API integration issues. Each card includes the exact SQL/Bash remediation steps.',
        cta: {
          href: '/docs/neurondb/troubleshooting',
          label: 'Bookmark troubleshooting playbook',
        },
      }}
      theme={{
        pageBackground:
          'bg-gradient-to-br from-slate-50 via-white to-rose-50 dark:from-slate-900 dark:via-slate-800 dark:to-rose-900',
        heroOverlay:
          'bg-gradient-to-r from-rose-500/20 to-red-500/20 dark:from-rose-500/10 dark:to-red-500/10',
        requirementsBorder: 'rose',
        requirementsBackground: 'bg-white/90 dark:bg-slate-900/60',
      }}
      requirements={{
        title: 'Fast triage checklist',
        items: [
          'Enable `log_min_messages = debug1` temporarily when reproducing issues',
          'Verify `SELECT * FROM pg_extension WHERE extname = ' + "'neurondb'" + ';` returns the expected version',
          'Collect `EXPLAIN (ANALYZE, BUFFERS)` plans for slow queries before tuning',
          'Ensure GPU drivers (CUDA/ROCm) are the same version used during compilation',
        ],
        note: 'Run commands in a staging environment first. Switch settings back after confirming the fix.',
      }}
      sections={[
        {
          title: 'GPU acceleration issues',
          description: 'Fix runtime failures when enabling CUDA or ROCm acceleration.',
          cards: [
            {
              id: 'gpu-missing',
              title: 'Error: "GPU function not available"',
              accent: 'rose',
              description: 'NeurondB cannot locate compiled GPU kernels or drivers.',
              content: (
                <>
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
                </>
              ),
            },
            {
              id: 'gpu-slow',
              title: 'GPU slower than CPU',
              accent: 'amber',
              description: 'Batch sizes or stream counts are too small to saturate the GPU.',
              content: (
                <>
                  <SqlCodeBlock
                    title="Increase GPU parallelism"
                    code={`SET neurondb.gpu_batch_size = 5000;
SET neurondb.gpu_streams = 8;
SET neurondb.gpu_memory_pool_mb = 2048;`}
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-400">Re-run workload and compare latency using `\timing`.</p>
                </>
              ),
            },
            {
              id: 'gpu-oom',
              title: 'Error: GPU out of memory',
              accent: 'purple',
              description: 'Reduce GPU batch sizes and memory pool before reattempting.',
              content: (
                <SqlCodeBlock
                  title="Reduce footprint"
                  code={`SET neurondb.gpu_batch_size = 500;
SET neurondb.gpu_memory_pool_mb = 256;

-- Optional: quantize vectors to int8 to shrink memory
UPDATE documents SET embedding = vector_to_int8_gpu(embedding);`}
                />
              ),
            },
          ],
        },
        {
          title: 'ML clustering & analytics issues',
          description: 'Address convergence, accuracy, and data quality warnings from NeurondB ML pipelines.',
          cards: [
            {
              id: 'kmeans-converge',
              title: '"K-Means did not converge"',
              accent: 'indigo',
              description: 'Increase iteration budget or relax tolerance for the dataset.',
              content: (
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
              ),
            },
            {
              id: 'cluster-quality',
              title: 'Clustering quality is poor',
              accent: 'emerald',
              description: 'Normalize embeddings and reassess the optimal k value.',
              content: (
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
              ),
            },
            {
              id: 'outlier-data',
              title: 'Outlier detection insufficient data',
              accent: 'cyan',
              description: 'Collect more points or lower the Z-score threshold.',
              content: (
                <SqlCodeBlock
                  title="Adjust Z-score"
                  code={`SELECT *
FROM detect_outliers_zscore(
  (SELECT embedding FROM documents),
  2.5  -- threshold
);`}
                />
              ),
            },
          ],
        },
        {
          title: 'Index build & query diagnostics',
          description: 'Resolve index build failures, poor recall, and sequential scans.',
          cards: [
            {
              id: 'index-missing',
              title: 'Index not used / sequential scan',
              accent: 'blue',
              content: (
                <>
                  <SqlCodeBlock
                    title="Verify plan"
                    code={`EXPLAIN (ANALYZE, BUFFERS)
SELECT *
FROM documents
ORDER BY embedding <-> '{0.1,0.2,...}'::vector
LIMIT 10;`}
                  />
                  <p className="text-sm text-slate-600 dark:text-slate-300">If planner chooses seq scan, ensure the index operator class matches the query, or temporarily `SET enable_seqscan = off`.</p>
                </>
              ),
            },
            {
              id: 'index-oom',
              title: 'Index build failed: out of memory',
              accent: 'rose',
              content: (
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
              ),
            },
            {
              id: 'low-recall',
              title: 'Low recall / missing neighbours',
              accent: 'amber',
              content: (
                <SqlCodeBlock
                  title="Increase search width"
                  code={`SET hnsw.ef_search = 200;
-- IVF equivalent
SET ivfflat.probes = 20;`}
                />
              ),
            },
          ],
        },
        {
          title: 'Embedding & LLM integration issues',
          description: 'Troubleshoot embedding API failures, timeouts, and dimension mismatches.',
          cards: [
            {
              id: 'api-unauthorized',
              title: 'LLM API unauthorized',
              accent: 'rose',
              content: (
                <SqlCodeBlock
                  title="Set API key"
                  code={`SET neurondb.llm_api_key = 'sk-...';
ALTER DATABASE mydb SET neurondb.llm_api_key = 'sk-...';`}
                />
              ),
            },
            {
              id: 'api-timeout',
              title: 'Embedding API timeout',
              accent: 'purple',
              content: (
                <SqlCodeBlock
                  title="Extend timeout & retries"
                  code={`SET neurondb.llm_timeout_ms = 60000;
SET neurondb.llm_max_retries = 5;`}
                />
              ),
            },
            {
              id: 'dimension-mismatch',
              title: 'Dimension mismatch errors',
              accent: 'blue',
              content: (
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
              ),
            },
          ],
        },
      ]}
      nextSteps={[
        {
          href: '/docs/neurondb/configuration',
          title: '⚙️ Configuration Reference',
          description: 'Verify each GUC parameter and recommended value after making changes.',
        },
        {
          href: '/docs/neurondb/performance',
          title: '🚀 Performance Tuning',
          description: 'Benchmark NeurondB after applying fixes to confirm SLO improvements.',
        },
        {
          href: 'https://github.com/pgElephant/NeurondB/issues',
          title: '💬 Open GitHub Issue',
          description: 'Share logs and repro steps with the community for unresolved bugs.',
          external: true,
        },
      ]}
      supportLinks={[
        {
          href: 'https://github.com/pgElephant/NeurondB/issues',
          label: 'GitHub Issues',
          description: 'Report unresolved issues or request debug assistance.',
          external: true,
        },
        {
          href: 'https://github.com/pgElephant/NeurondB/discussions',
          label: 'GitHub Discussions',
          description: 'Share remediation tips and triage results with other operators.',
          external: true,
        },
      ]}
    />
  )
}
