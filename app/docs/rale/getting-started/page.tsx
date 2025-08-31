import React from 'react';

export default function RaleGettingStarted() {
  return (
    <div className="container mx-auto py-16">
      <h1 className="text-4xl font-bold mb-4 text-teal-400">RALE: Getting Started</h1>
      <p className="text-lg text-slate-300 mb-8">Learn how to install, configure, and run RALE for distributed consensus and leader election.</p>
      <ol className="list-decimal pl-6 text-slate-200 mb-8 space-y-2">
        <li>Install RALE using your package manager or download from GitHub.</li>
        <li>Configure your cluster nodes in the configuration file.</li>
        <li>Start the RALE daemon on each node.</li>
        <li>Verify cluster status and leader election.</li>
      </ol>
      <a href="https://github.com/pgElephant/rale" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 bg-teal-600/20 border border-teal-400/30 text-teal-300 font-semibold rounded-xl hover:bg-teal-600/30 hover:border-teal-400/50 transition-all duration-200">
        View RALE on GitHub
      </a>
    </div>
  );
}
