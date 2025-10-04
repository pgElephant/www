import React from 'react';

export const metadata = {
  title: 'pgbalancer Architecture & Internals',
  description: 'Learn about pgbalancer internals and architecture.'
};

export default function PgBalancerInternalsDocs() {
  return (
    <div className="prose dark:prose-invert max-w-3xl mx-auto py-12">
      <h1>Architecture & Internals</h1>
      <p>pgbalancer is built for performance and reliability:</p>
      <ul>
        <li>Written in Go for concurrency and efficiency</li>
        <li>Event-driven, non-blocking I/O</li>
        <li>Pluggable modules for pooling, routing, and metrics</li>
        <li>Designed for cloud and container environments</li>
      </ul>
      <p>See the <a href="/docs/pgbalancer/configuration">Configuration</a> page for YAML options.</p>
    </div>
  );
}
