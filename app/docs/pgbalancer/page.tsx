import React from 'react';

export const metadata = {
  title: 'pgbalancer Documentation',
  description: 'Official documentation for pgbalancer: connection pooling and load balancing for PostgreSQL.'
};

export default function PgBalancerDocsPage() {
  return (
    <div className="prose dark:prose-invert max-w-3xl mx-auto py-12">
      <h1>pgbalancer Documentation</h1>
      <p>
        Welcome to the official documentation for <b>pgbalancer</b>.
        Use the navigation to explore guides, configuration, metrics, and internals.
      </p>
      <ul>
        <li><a href="/docs/pgbalancer/getting-started">Getting Started</a></li>
        <li><a href="/docs/pgbalancer/configuration">Configuration</a></li>
        <li><a href="/docs/pgbalancer/metrics">Metrics & Observability</a></li>
        <li><a href="/docs/pgbalancer/internals">Architecture & Internals</a></li>
      </ul>
    </div>
  );
}
