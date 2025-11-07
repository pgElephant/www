import { Metadata } from 'next'
import { Brain } from 'lucide-react'
import GettingStartedLayout from '../../../../components/GettingStartedLayout'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'
import BashCodeBlock from '../../../../components/BashCodeBlock'

export const metadata: Metadata = {
  title: 'NeurondB Configuration Guide | PostgreSQL Vector Database Settings',
  description:
    'Complete configuration reference for NeurondB. Tune HNSW indexes, GPU acceleration, background workers, and performance profiles for production workloads.',
  alternates: {
    canonical: 'https://www.pgelephant.com/docs/neurondb/configuration',
  },
}

export default function NeurondBConfigurationPage() {
  return (
    <GettingStartedLayout
      product="NeurondB"
      hero={{
        label: 'Configuration',
        labelIcon: <Brain className="h-4 w-4" />, 
        labelAccent: 'amber',
        title: 'Configure NeurondB for Production Workloads',
        description:
          'Reference every NeurondB GUC parameter with recommended values for search accuracy, GPU acceleration, background workers, and security.',
        cta: {
          href: '/docs/neurondb/troubleshooting',
          label: 'View troubleshooting playbooks',
        },
      }}
      theme={{
        pageBackground:
          'bg-gradient-to-br from-slate-50 via-white to-amber-50 dark:from-slate-900 dark:via-slate-800 dark:to-amber-900',
        heroOverlay:
          'bg-gradient-to-r from-amber-500/20 to-orange-500/20 dark:from-amber-500/10 dark:to-orange-500/10',
        requirementsBorder: 'amber',
        requirementsBackground: 'bg-white/90 dark:bg-slate-900/60',
      }}
      requirements={{
        title: 'Before you begin',
        items: [
          'NeurondB extension installed and listed in shared_preload_libraries',
          'PostgreSQL superuser access for ALTER SYSTEM and configuration reloads',
          'Baseline metrics for vector workload (QPS, recall targets, latency SLO)',
          'Optional: GPU drivers (CUDA or ROCm) installed if enabling GPU mode',
        ],
      }}
      sections={[
        {
          title: 'Core configuration (postgresql.conf)',
          description: 'Add the baseline NeurondB checks to your cluster configuration. Adjust vector index tuning, inference options, and background workers.',
          cards: [
            {
              id: 'core-config',
              title: 'Baseline parameters',
              accent: 'amber',
              content: (
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
              ),
            },
          ],
        },
        {
          title: 'GPU acceleration (optional)',
          description: 'Enable GPU kernels for distance computations and embedding inference. Define memory pools and fallback behaviour.',
          cards: [
            {
              id: 'gpu-config',
              title: 'CUDA / ROCm settings',
              accent: 'rose',
              content: (
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
              ),
            },
            {
              id: 'gpu-validation',
              title: 'Validate GPU runtime',
              accent: 'purple',
              content: (
                <BashCodeBlock
                  title="Runtime validation"
                  code={`-- Confirm GPU kernels are registered
SELECT *
FROM   neurondb_gpu_capabilities();

-- Force GPU usage for this session
SET neurondb.gpu_enabled = on;
SET neurondb.gpu_backend = 'cuda';`}
                />
              ),
            },
          ],
        },
        {
          title: 'Runtime overrides (session-level)',
          description: 'Adjust accuracy, caching, and inference behaviour without restarting PostgreSQL. Ideal for A/B tests and workload experiments.',
          cards: [
            {
              id: 'runtime-overrides',
              title: 'Session tuning commands',
              accent: 'cyan',
              content: (
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
              ),
            },
          ],
        },
        {
          title: 'Performance profiles',
          description: 'Apply recommended parameter combinations for specific workload goals. Use ALTER SYSTEM and reload to persist cluster-wide.',
          cards: [
            {
              id: 'low-latency',
              title: 'Low latency workloads',
              accent: 'emerald',
              content: (
                <SqlCodeBlock
                  title="Latency-optimised"
                  code={`ALTER SYSTEM SET neurondb.ef_search = 20;
ALTER SYSTEM SET neurondb.enable_prefetch = on;
ALTER SYSTEM SET neurondb.enable_simd = on;
ALTER SYSTEM SET neurondb.gpu_enabled = on;`}
                />
              ),
            },
            {
              id: 'high-accuracy',
              title: 'High accuracy workloads',
              accent: 'indigo',
              content: (
                <SqlCodeBlock
                  title="Recall-optimised"
                  code={`ALTER SYSTEM SET neurondb.ef_search = 200;
ALTER SYSTEM SET neurondb.ef_construction = 500;
ALTER SYSTEM SET neurondb.m = 32;
ALTER SYSTEM SET neurondb.batch_inference_size = 16;`}
                />
              ),
            },
            {
              id: 'large-scale',
              title: 'Large-scale deployments',
              accent: 'amber',
              content: (
                <SqlCodeBlock
                  title="High throughput"
                  code={`ALTER SYSTEM SET neurondb.cache_size_mb = 1024;
ALTER SYSTEM SET neurondb.inference_threads = 8;
ALTER SYSTEM SET neurondb.neuranq_batch_size = 200;
ALTER SYSTEM SET neurondb.enable_prefetch = on;`}
                />
              ),
            },
          ],
        },
      ]}
      nextSteps={[
        {
          href: '/docs/neurondb/performance',
          title: '🚀 Performance Guide',
          description: 'Benchmark NeurondB under different parameter profiles and workloads.',
        },
        {
          href: '/docs/neurondb/background-workers',
          title: '🛠 Background Workers',
          description: 'Configure neuranq, neuranmon, and neurandefrag scheduling.',
        },
        {
          href: '/docs/neurondb/security',
          title: '🔐 Security & Compliance',
          description: 'Enable encryption, differential privacy, and audit logging.',
        },
      ]}
      supportLinks={[
        {
          href: 'https://github.com/pgElephant/NeurondB/issues',
          label: 'GitHub Issues',
          description: 'Report configuration bugs or request new parameters.',
          external: true,
        },
        {
          href: 'https://github.com/pgElephant/NeurondB/discussions',
          label: 'GitHub Discussions',
          description: 'Share configuration best practices with the community.',
          external: true,
        },
      ]}
    />
  )
}

