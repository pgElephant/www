import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'AI PostgreSQL Configuration | NeurondB GUC Settings & Tuning Guide',
  description:
    'Complete configuration reference for NeurondB (AI PostgreSQL extension). Learn GUC parameters for HNSW indexes, GPU acceleration, background workers, and production tuning. Alternative to PostgreSQL.ai and pgml configuration. Includes postgresql.conf settings and runtime overrides.',
  keywords: [
    'NeurondB configuration',
    'AI PostgreSQL configuration',
    'PostgreSQL.ai configuration',
    'pgml configuration',
    'PostgreSQL GUC settings',
    'HNSW configuration',
    'GPU acceleration settings',
    'vector database configuration',
    'NeurondB tuning',
    'postgresql.conf NeurondB',
    'performance tuning',
    'background workers config',
    'index configuration',
    'production settings',
    'PostgreSQL AI settings'
  ].join(', '),
  alternates: {
    canonical: 'https://www.pgelephant.com/docs/neurondb/configuration',
  },
  openGraph: {
    title: 'NeurondB Configuration Guide | PostgreSQL Settings & Tuning',
    description: 'Complete NeurondB configuration reference. Tune HNSW indexes, GPU acceleration, and performance for production.',
    type: 'article',
    url: 'https://www.pgelephant.com/docs/neurondb/configuration',
  },
}

const tableOfContents: TocItem[] = [
  { id: 'before-you-begin', title: 'Before you begin' },
  { id: 'core-configuration', title: 'Core configuration (postgresql.conf)' },
  { id: 'gpu-acceleration', title: 'GPU acceleration (optional)' },
  { id: 'runtime-overrides', title: 'Runtime overrides (session-level)' },
  { id: 'performance-profiles', title: 'Performance profiles' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/installation',
  label: 'Installation',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/troubleshooting',
  label: 'Troubleshooting',
}

export default function NeurondBConfigurationPage() {
  return (
    <PostgresDocsLayout
      title="Configure NeurondB for Production Workloads"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="before-you-begin">
        <h2>Before you begin</h2>
        <p>Ensure you have:</p>
        <ul>
          <li>NeurondB extension installed and listed in shared_preload_libraries</li>
          <li>PostgreSQL superuser access for ALTER SYSTEM and configuration reloads</li>
          <li>Baseline metrics for vector workload (QPS, recall targets, latency SLO)</li>
          <li>Optional: GPU drivers (CUDA or ROCm) installed if enabling GPU mode</li>
        </ul>
      </section>

      <section id="core-configuration">
        <h2>Core configuration (postgresql.conf)</h2>
        <p>Add the baseline NeurondB checks to your cluster configuration. Adjust vector index tuning, inference options, and background workers.</p>

        <h3>Baseline parameters</h3>
        <SqlCodeBlock
          title="postgresql.conf"
          code={`# Load extension
shared_preload_libraries = 'neurondb'

# Vector index tuning
neurondb.ef_search = 40           -- Search accuracy (10-200)
neurondb.m = 16                   -- HNSW connections per node (4-48)
neurondb.ef_construction = 200    -- Build quality (10-500)

# Embedding inference & caching
neurondb.model_path = '/var/lib/neurondb/models'
neurondb.inference_threads = 4
neurondb.batch_inference_size = 32
neurondb.cache_size_mb = 256

# Background workers
neurondb.neuranq_enabled = on
neurondb.neuranq_naptime = 1000
neurondb.neuranmon_enabled = on  
neurondb.neuranmon_naptime = 60000
neurondb.neurandefrag_enabled = on
neurondb.neurandefrag_naptime = 300000

# Performance toggles
neurondb.enable_prefetch = on
neurondb.enable_simd = on`}
        />
      </section>

      <section id="gpu-acceleration">
        <h2>GPU acceleration (optional)</h2>
        <p>Enable GPU kernels for distance computations and embedding inference. Define memory pools and fallback behaviour.</p>

        <h3>CUDA / ROCm settings</h3>
        <SqlCodeBlock
          title="GPU parameters"
          code={`# GPU configuration
neurondb.gpu_enabled = off
neurondb.gpu_backend = 'cuda'         -- or 'rocm'
neurondb.gpu_device = 0               -- GPU device ordinal
neurondb.gpu_batch_size = 8192
neurondb.gpu_streams = 2
neurondb.gpu_memory_pool_mb = 512
neurondb.gpu_fail_open = on           -- Fallback to CPU
neurondb.gpu_kernels = 'l2,cosine,ip'`}
        />

        <h3>Validate GPU runtime</h3>
        <SqlCodeBlock
          title="Runtime validation"
          code={`-- Confirm GPU kernels are registered
SELECT *
FROM   neurondb_gpu_capabilities();

-- Force GPU usage for this session
SET neurondb.gpu_enabled = on;
SET neurondb.gpu_backend = 'cuda';`}
        />
      </section>

      <section id="runtime-overrides">
        <h2>Runtime overrides (session-level)</h2>
        <p>Adjust accuracy, caching, and inference behaviour without restarting PostgreSQL. Ideal for A/B tests and workload experiments.</p>

        <h3>Session tuning commands</h3>
        <SqlCodeBlock
          title="Session overrides"
          code={`-- Improve recall for analytics session
SET neurondb.ef_search = 120;

-- Enable GPU acceleration in this session only
SET neurondb.gpu_enabled = on;

-- Increase vector cache size temporarily
SET neurondb.cache_size_mb = 512;

-- Inspect active configuration
SELECT * FROM neurondb_config();`}
        />
      </section>

      <section id="performance-profiles">
        <h2>Performance profiles</h2>
        <p>Apply recommended parameter combinations for specific workload goals. Use ALTER SYSTEM and reload to persist cluster-wide.</p>

        <h3>Low latency workloads</h3>
        <SqlCodeBlock
          title="Latency-optimised"
          code={`ALTER SYSTEM SET neurondb.ef_search = 20;
ALTER SYSTEM SET neurondb.enable_prefetch = on;
ALTER SYSTEM SET neurondb.enable_simd = on;
ALTER SYSTEM SET neurondb.gpu_enabled = on;`}
        />

        <h3>High accuracy workloads</h3>
        <SqlCodeBlock
          title="Recall-optimised"
          code={`ALTER SYSTEM SET neurondb.ef_search = 200;
ALTER SYSTEM SET neurondb.ef_construction = 500;
ALTER SYSTEM SET neurondb.m = 32;
ALTER SYSTEM SET neurondb.batch_inference_size = 16;`}
        />

        <h3>Large-scale deployments</h3>
        <SqlCodeBlock
          title="High throughput"
          code={`ALTER SYSTEM SET neurondb.cache_size_mb = 1024;
ALTER SYSTEM SET neurondb.inference_threads = 8;
ALTER SYSTEM SET neurondb.neuranq_batch_size = 200;
ALTER SYSTEM SET neurondb.enable_prefetch = on;`}
        />
      </section>

      <section>
        <h2>Next Steps</h2>
        <ul>
          <li><a href="/docs/neurondb/performance">Performance Guide</a> - Benchmark NeurondB under different parameter profiles and workloads.</li>
          <li><a href="/docs/neurondb/background-workers">Background Workers</a> - Configure neuranq, neuranmon, and neurandefrag scheduling.</li>
          <li><a href="/docs/neurondb/security">Security & Compliance</a> - Enable encryption, differential privacy, and audit logging.</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}
