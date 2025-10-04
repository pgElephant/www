import React from 'react';

export const metadata = {
  title: 'pgbalancer Metrics & Observability',
  description: 'Prometheus metrics and monitoring for pgbalancer.'
};

export default function PgBalancerMetricsDocs() {
  return (
    <div className="prose dark:prose-invert max-w-3xl mx-auto py-12">
      <h1>Metrics & Observability</h1>
      <p>pgbalancer exposes a Prometheus-compatible metrics endpoint at <code>/metrics</code> by default.</p>
      <ul>
        <li>Pool stats: active clients, waiting clients, backend usage</li>
        <li>Backend health: up/down, lag, errors</li>
        <li>Query stats: throughput, errors, latency</li>
      </ul>
      <p>Integrate with Prometheus and Grafana for dashboards and alerting.</p>
    </div>
  );
}
