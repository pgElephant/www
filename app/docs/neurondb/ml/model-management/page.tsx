import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'NeurondB Model Management | Lifecycle & Governance',
  description:
    'Operate NeurondB model registry with version control, approvals, scheduled retraining, and audit logging. Manage ONNX deployments, rollouts, and performance tracking directly in PostgreSQL.',
}

const tableOfContents: TocItem[] = [
  { id: 'registry', title: 'Model registry & metadata' },
  { id: 'rollouts', title: 'Rollout controls & staged environments' },
  { id: 'monitoring', title: 'Performance monitoring' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/ml/rag',
  label: 'RAG Pipeline',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/ml/feature-store',
  label: 'Feature Store',
}

export default function ModelManagementPage() {
  return (
    <PostgresDocsLayout
      title="Govern the full model lifecycle inside PostgreSQL"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="registry">
        <h2>Model registry & metadata</h2>
        <p>Every model version is tracked in the NeurondB registry table with immutable metadata. Store provenance, signatures, and deployment configuration in JSONB to integrate with your compliance controls.</p>

        <h3>Register a version</h3>
        <SqlCodeBlock
          title="Register model"
          code={`SELECT neurondb_register_model(
  name        => 'reranker-cross-encoder',
  version     => '2.1.0',
  storage_url => 's3://models/neurondb/reranker-cross-encoder-2.1.0.onnx',
  runtime     => 'onnx',
  device      => 'auto',
  metadata    => jsonb_build_object(
    'owner', 'ml-platform',
    'git_commit', 'b4c5d9f',
    'trained_at', CURRENT_TIMESTAMP
  )
);`}
        />

        <h3>Inspect registry</h3>
        <SqlCodeBlock
          title="List models"
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

      <section id="rollouts">
        <h2>Rollout controls & staged environments</h2>
        <p>Promote models between dev, staging, and production directly in SQL. NeurondB stores active deployment slots and supports canary percentages for gradual rollouts.</p>

        <h3>Promote model</h3>
        <SqlCodeBlock
          title="Promote to production"
          code={`SELECT neurondb_promote_model(
  name          => 'reranker-cross-encoder',
  source_stage  => 'staging',
  target_stage  => 'production',
  canary_weight => 0.25
);`}
        />

        <h3>Active deployments</h3>
        <SqlCodeBlock
          title="View active deployments"
          code={`SELECT stage,
       name,
       version,
       canary_weight,
       created_at
FROM   neurondb_deployments
WHERE  status = 'active'
ORDER  BY stage, created_at DESC;`}
        />
      </section>

      <section id="monitoring">
        <h2>Performance monitoring</h2>
        <p>Track model performance metrics and set up alerts for degradation.</p>
        <SqlCodeBlock
          title="Model metrics"
          code={`SELECT 
  model_name,
  version,
  AVG(latency_ms) as avg_latency,
  PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY latency_ms) as p95_latency,
  COUNT(*) as request_count
FROM neurondb_model_metrics
WHERE created_at > NOW() - INTERVAL '1 hour'
GROUP BY model_name, version;`}
        />
      </section>

      <section>
        <h2>Next Steps</h2>
        <ul>
          <li><a href="/docs/neurondb/ml/inference">Inference Runtime</a> - Deploy models</li>
          <li><a href="/docs/neurondb/analytics">Monitoring & QA</a> - Track model performance</li>
          <li><a href="/docs/neurondb/ml/feature-store">Feature Store</a> - Manage features</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}
