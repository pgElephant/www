import React from 'react';

export default function RaleGettingStarted() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-700 via-teal-600 to-cyan-600 py-16 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white/10 backdrop-blur-sm rounded-2xl p-10 border border-teal-400 shadow-lg flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4 text-white">RALE: Getting Started</h1>
        <p className="text-lg text-slate-200 mb-8 text-center">Learn how to install, configure, and run RALE for distributed consensus and leader election.</p>
        <ol className="list-decimal pl-6 text-slate-100 mb-8 space-y-2 w-full">
          <li>Install RALE using your package manager or download from GitHub.</li>
          <li>Configure your cluster nodes in the configuration file.</li>
          <li>Start the RALE daemon on each node.</li>
          <li>Verify cluster status and leader election.</li>
        </ol>
        <a href="https://github.com/pgElephant/rale" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 bg-yellow-300/20 border border-yellow-400 text-yellow-300 font-semibold rounded-xl hover:bg-yellow-300/30 hover:border-yellow-400/50 transition-all duration-200">
          View RALE on GitHub
        </a>
      </div>
    </div>
  );
}
