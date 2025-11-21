import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../../components/SqlCodeBlock'
import BashCodeBlock from '../../../../../components/BashCodeBlock'

export const metadata: Metadata = {
  title: 'NeurondB Model Inference | ONNX & GPU Serving',
  description:
    'Deploy ONNX models inside PostgreSQL with NeurondB. Configure GPU batching, caching, runtime preferences, and integrate inference with SQL pipelines.',
}

const tableOfContents: TocItem[] = [
  { id: 'load-models', title: 'Load ONNX models' },
  { id: 'batching', title: 'GPU batching & scheduling' },
  { id: 'caching', title: 'Model caching' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/ml',
  label: 'ML Overview',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/ml/embeddings',
  label: 'Embeddings',
}

export default function InferencePage() {
  return (
    <PostgresDocsLayout
      title="Serve ONNX models directly from PostgreSQL"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="load-models">
        <h2>Load ONNX models</h2>
        <p>Register models once, version them, and share across schemas. Use GitHub releases or object storage URLs for centralized distribution.</p>

        <h3>Register a model</h3>
        <SqlCodeBlock
          title="Register a model"
          code={`SELECT neurondb_register_model(
  name          => 'text-embedding-3-small',
  version       => '1.0.0',
  storage_url   => 'https://github.com/pgElephant/NeurondB/releases/download/models/text-embedding-3-small.onnx',
  runtime       => 'onnx',
  device        => 'auto'
);`}
        />

        <h3>Inspect registry</h3>
        <SqlCodeBlock
          title="Inspect registry"
          code={`SELECT name,
       version,
       metadata ->> 'owner'     AS owner,
       metadata ->> 'git_commit' AS git_commit,
       created_at,
       status
FROM   neurondb_model_registry
ORDER  BY created_at DESC;`}
        />
      </section>

      <section id="batching">
        <h2>GPU batching & scheduling</h2>
        <p>NeurondB orchestrates micro-batches per GPU worker. Configure queue sizes, max latency, and fallbacks.</p>

        <h3>PostgreSQL configuration</h3>
        <BashCodeBlock
          title="postgresql.conf"
          code={`neurondb.gpu_enabled = on
neurondb.gpu_device_ids = '0,1'
neurondb.inference_batch_size = 32
neurondb.inference_max_latency_ms = 25
neurondb.inference_timeout_ms = 1000`}
        />

        <h3>Session-level overrides</h3>
        <SqlCodeBlock
          title="Session-level overrides"
          code={`SET neurondb.session_inference_batch_size = 16;
SET neurondb.session_inference_max_latency = '15ms';

SELECT neurondb_embed_batch(
  model_name => 'text-embedding-3-small',
  inputs     => ARRAY['vector search', 'pg extension', 'gpu batching']
);`}
        />
      </section>

      <section id="caching">
        <h2>Model caching</h2>
        <p>Models are automatically cached in shared memory for fast access across sessions.</p>
        <SqlCodeBlock
          title="Cache statistics"
          code={`SELECT * FROM neurondb_model_cache_stats();`}
        />
      </section>

      <section>
        <h2>Next Steps</h2>
        <ul>
          <li><a href="/docs/neurondb/ml/embeddings">Embedding Generation</a> - Generate embeddings</li>
          <li><a href="/docs/neurondb/performance">Performance Tuning</a> - Optimize inference</li>
          <li><a href="/docs/neurondb/ml/model-management">Model Management</a> - Version and deploy models</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}
