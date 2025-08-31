import React from 'react';

export default function RalePage() {
  return (
    <div className="container mx-auto py-16">
      <h1 className="text-4xl font-bold mb-4 text-teal-400">RALE</h1>
      <p className="text-lg text-slate-300 mb-8">RALE is a high-performance distributed consensus and key-value store system written in C. It provides reliable distributed coordination and persistent storage for distributed applications with strong consistency guarantees.</p>
      <ul className="list-disc pl-6 text-slate-200 mb-8">
        <li>Consensus Algorithm: Reliable leader election and log replication</li>
        <li>Distributed Store: High-performance replicated key-value storage</li>
        <li>Thread Safety: Full multi-threading support</li>
        <li>Network Layer: TCP/UDP communication with automatic failover</li>
        <li>Memory Safety: Safe allocation/deallocation with leak prevention</li>
        <li>Clean Logging: Professional logging</li>
      </ul>
      <div className="mb-8 text-slate-400">
        <strong>License:</strong> MIT<br />
        <strong>Stars:</strong> 0<br />
        <strong>Forks:</strong> 0<br />
        <strong>Languages:</strong> C (99.3%), Other (0.7%)<br />
        <strong>Last Updated:</strong> 2025
      </div>
      <a href="https://github.com/pgElephant/rale" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 bg-teal-600/20 border border-teal-400/30 text-teal-300 font-semibold rounded-xl hover:bg-teal-600/30 hover:border-teal-400/50 transition-all duration-200">
        View on GitHub
      </a>
    </div>
  );
}
