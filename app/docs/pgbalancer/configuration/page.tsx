import React from 'react';

export const metadata = {
  title: 'pgbalancer Configuration',
  description: 'YAML configuration and advanced options for pgbalancer.'
};

export default function PgBalancerConfigDocs() {
  return (
    <div className="prose dark:prose-invert max-w-3xl mx-auto py-12">
      <h1>Configuration</h1>
      <p>pgbalancer is configured using a YAML file. Example:</p>
      <pre className="bg-black text-cyan-200 p-2 rounded">
{`listen: 0.0.0.0:6432
pools:
  - database: appdb
    user: appuser
    pool_mode: session
    max_clients: 100
    max_backends: 10
backends:
  - host: db1.internal
    port: 5432
    role: primary
  - host: db2.internal
    port: 5432
    role: replica
`}
      </pre>
      <p>See the <a href="/docs/pgbalancer/metrics">Metrics</a> and <a href="/docs/pgbalancer/internals">Internals</a> pages for more advanced topics.</p>
    </div>
  );
}
