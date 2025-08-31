import React from 'react';

export default function RamGettingStarted() {
  return (
    <div className="container mx-auto py-16">
      <h1 className="text-4xl font-bold mb-4 text-teal-400">RAM: Getting Started</h1>
      <p className="text-lg text-slate-300 mb-8">Learn how to install, configure, and use RAM for resource management and monitoring.</p>
      <ol className="list-decimal pl-6 text-slate-200 mb-8 space-y-2">
        <li>Install RAM using your package manager or download from GitHub.</li>
        <li>Configure RAM for your PostgreSQL cluster.</li>
        <li>Start the RAM service and connect to your cluster.</li>
        <li>Monitor resources and set up alerts.</li>
      </ol>
      <a href="https://github.com/pgElephant/ram" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 bg-teal-600/20 border border-teal-400/30 text-teal-300 font-semibold rounded-xl hover:bg-teal-600/30 hover:border-teal-400/50 transition-all duration-200">
        View RAM on GitHub
      </a>
    </div>
  );
}
