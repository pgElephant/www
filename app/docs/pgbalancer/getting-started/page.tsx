import React from 'react';

export const metadata = {
  title: 'Getting Started with pgbalancer',
  description: 'Quick start guide for installing and running pgbalancer.'
};

export default function PgBalancerGettingStarted() {
  return (
    <div className="prose dark:prose-invert max-w-3xl mx-auto py-12">
      <h1>Getting Started</h1>
      <p>This guide will help you install and launch <b>pgbalancer</b> for the first time.</p>
      <ol>
        <li>Download the latest release from <a href="https://github.com/pgElephant/pgbalancer">GitHub</a>.</li>
        <li>Edit <code>pgbalancer.yaml</code> to configure your pools and backends.</li>
        <li>Start pgbalancer:
          <pre className="bg-black text-green-400 p-2 rounded">$ pgbalancer -c pgbalancer.yaml</pre>
        </li>
        <li>Connect your application to <code>localhost:6432</code>.</li>
      </ol>
      <p>For more details, see the <a href="/docs/pgbalancer/configuration">Configuration</a> page.</p>
    </div>
  );
}
