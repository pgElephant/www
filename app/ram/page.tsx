import React from 'react';

export default function RamPage() {
  return (
    <div className="container mx-auto py-16">
      <h1 className="text-4xl font-bold mb-4 text-teal-400">RAM</h1>
      <p className="text-lg text-slate-300 mb-8">RAM is a resource management and monitoring system for PostgreSQL clusters.</p>
      <ul className="list-disc pl-6 text-slate-200 mb-8">
        <li>Resource Monitoring</li>
        <li>Performance Metrics</li>
        <li>Health Checks</li>
        <li>Alerting</li>
      </ul>
      <div className="mb-8 text-slate-400">
        <strong>License:</strong> MIT<br />
        <strong>Stars:</strong> 0<br />
        <strong>Forks:</strong> 0<br />
        <strong>Languages:</strong> C (99.0%), Other (1.0%)<br />
        <strong>Last Updated:</strong> 2025
      </div>
      <a href="https://github.com/pgElephant/ram" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 bg-teal-600/20 border border-teal-400/30 text-teal-300 font-semibold rounded-xl hover:bg-teal-600/30 hover:border-teal-400/50 transition-all duration-200">
        View on GitHub
      </a>
    </div>
  );
}
