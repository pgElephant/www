export const metadata = {
  title: 'NeurondB Model Management | Lifecycle & Governance',
  description:
    'Operate NeurondB model registry with version control, approvals, scheduled retraining, and audit logging. Manage ONNX deployments, rollouts, and performance tracking directly in PostgreSQL.',
}

import Link from 'next/link'
import { ClipboardCheck, GitBranch, Key, RefreshCcw, ShieldCheck } from 'lucide-react'
import BashCodeBlock from '../../../../../components/BashCodeBlock'
import SqlCodeBlock from '../../../../../components/SqlCodeBlock'
import { NeurondBIcon } from '../../../../../components/ProductIcons'

const ModelManagementPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-900 to-emerald-900 opacity-90" />
        <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-6 px-6 pb-16 pt-16">
          <div className="inline-flex items-center gap-3 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-100">
            <NeurondBIcon size={24} />
            <span>NeurondB · Model Management</span>
          </div>
          <h1 className="text-4xl font-bold text-white md:text-5xl">Govern the full model lifecycle inside PostgreSQL</h1>
          <p className="max-w-3xl text-base text-emerald-100 md:text-lg">
            Register ONNX models, promote versions through staged environments, and capture approval workflows without leaving the database. NeurondB integrates model registry, rollout controls, and performance monitoring in SQL.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/docs/neurondb/ml/inference"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500/20 px-4 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-500/30"
            >
              Inference Runtime
            </Link>
            <Link
              href="/docs/neurondb/analytics"
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/40 px-4 py-2 text-sm font-semibold text-emerald-200 transition hover:border-emerald-300"
            >
              Monitoring & QA
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-16 px-6 pb-24 pt-12">
        <section id="registry" className="rounded-3xl border border-slate-700/60 bg-slate-900/70 p-8 shadow-xl">
          <h2 className="text-2xl font-semibold text-white">Model registry & metadata</h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-300">
            Every model version is tracked in the NeurondB registry table with immutable metadata. Store provenance, signatures, and deployment configuration in JSONB to integrate with your compliance controls.
          </p>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <SqlCodeBlock
              title="Register a version"
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
          </div>
        </section>

        <section id="rollouts" className="rounded-3xl border border-emerald-500/40 bg-emerald-500/10 p-8 shadow-xl">
          <h2 className="text-2xl font-semibold text-white">Rollout controls & staged environments</h2>
          <p className="mt-2 max-w-3xl text-sm text-emerald-100">
            Promote models between dev, staging, and production directly in SQL. NeurondB stores active deployment slots and supports canary percentages for gradual rollouts.
          </p>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <SqlCodeBlock
              title="Promote model"
              code={`SELECT neurondb_promote_model(
  name          => 'reranker-cross-encoder',
  source_stage  => 'staging',
  target_stage  => 'production',
  canary_weight => 0.25
);`}
            />
            <SqlCodeBlock
              title="Active deployments"
              code={`SELECT stage,
       name,
       version,
       canary_weight,
       promoted_at
FROM   neurondb_model_deployments
WHERE  name = 'reranker-cross-encoder'
ORDER  BY promoted_at DESC;`}
            />
          </div>
        </section>

        <section id="approvals" className="rounded-3xl border border-slate-700/60 bg-slate-900/70 p-8 shadow-xl">
          <h2 className="text-2xl font-semibold text-white">Approval workflows & access control</h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-300">
            Require sign-off before promoting models and manage RBAC with PostgreSQL roles. Capture cryptographic signatures when compliance demands full auditability.
          </p>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <SqlCodeBlock
              title="Enforce approvals"
              code={`-- Create approval policy (requires reviewer role)
SELECT neurondb_create_approval_policy(
  name         => 'prod-reranker-policy',
  model_name   => 'reranker-cross-encoder',
  min_approvers => 2,
  expiration    => interval '24 hours'
);`}
            />
            <SqlCodeBlock
              title="Approve promotion"
              code={`SET ROLE ml-reviewer;
SELECT neurondb_approve_model(
  model_name => 'reranker-cross-encoder',
  version    => '2.1.0',
  signature  => encode(digest('approval payload', 'sha256'), 'hex')
);`}
            />
          </div>
        </section>

        <section id="monitoring" className="rounded-3xl border border-emerald-500/40 bg-emerald-500/10 p-8 shadow-xl">
          <h2 className="text-2xl font-semibold text-white">Monitor drift & performance</h2>
          <p className="mt-2 max-w-3xl text-sm text-emerald-100">
            Capture inference metrics and quality scores for each model version. Use these dashboards to detect drift, regressions, or SLA violations before customers notice.
          </p>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <SqlCodeBlock
              title="Record evaluation run"
              code={`INSERT INTO neurondb_model_evaluations (
  name,
  version,
  dataset,
  metric,
  value
) VALUES (
  'reranker-cross-encoder',
  '2.1.0',
  'support-search-holdout',
  'nDCG@10',
  0.942
);`}
            />
            <SqlCodeBlock
              title="Compare versions"
              code={`SELECT version,
       metric,
       AVG(value) AS avg_value
FROM   neurondb_model_evaluations
WHERE  name = 'reranker-cross-encoder'
GROUP  BY version, metric
ORDER  BY metric, version DESC;`}
            />
          </div>
        </section>

        <section id="automation" className="rounded-3xl border border-slate-700/60 bg-slate-950/70 p-8 shadow-xl">
          <h2 className="text-2xl font-semibold text-white">Automate retraining & key rotation</h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-300">
            Trigger retraining pipelines from inside the database and rotate provider keys safely. Combine background workers with CI/CD to keep models fresh.
          </p>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <BashCodeBlock
              title="Schedule retraining job"
              code={`SELECT neurondb_enqueue_job(
  queue       => 'ml-retrain',
  payload     => jsonb_build_object('model', 'reranker-cross-encoder'),
  priority    => 5,
  run_after   => now() + interval '1 day'
);`}
            />
            <SqlCodeBlock
              title="Rotate API key"
              code={`SELECT neurondb_rotate_provider_key(
  provider => 'openai',
  key_ref  => 'kms://arn:aws:kms:us-east-1:123456789012:key/abc'
);`}
            />
          </div>
        </section>

        <section id="governance" className="rounded-3xl border border-slate-700/60 bg-slate-900/80 p-8">
          <h2 className="text-2xl font-semibold text-white">Operational checklist</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            <li className="flex items-start gap-3"><ShieldCheck className="h-5 w-5 text-emerald-400" />Enable encryption-at-rest for the model registry table.</li>
            <li className="flex items-start gap-3"><ClipboardCheck className="h-5 w-5 text-emerald-400" />Document promotion policies and approval thresholds in configuration management.</li>
            <li className="flex items-start gap-3"><GitBranch className="h-5 w-5 text-emerald-400" />Tie versions to Git commits and dataset snapshots for reproducibility.</li>
            <li className="flex items-start gap-3"><RefreshCcw className="h-5 w-5 text-emerald-400" />Schedule periodic evaluation jobs to track drift using background workers.</li>
            <li className="flex items-start gap-3"><Key className="h-5 w-5 text-emerald-400" />Rotate API keys and provider secrets with KMS-backed helpers.</li>
          </ul>
        </section>
      </main>
    </div>
  )
}

export default ModelManagementPage
