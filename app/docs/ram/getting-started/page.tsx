import React from 'react';

export default function RamGettingStarted() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-700 via-green-600 to-teal-600 py-16 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white/10 backdrop-blur-sm rounded-2xl p-10 border border-green-400 shadow-lg flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4 text-white">RAM: Getting Started</h1>
        <p className="text-lg text-slate-200 mb-8 text-center">Learn how to install, configure, and use RAM for resource management and monitoring.</p>
        <ol className="list-decimal pl-6 text-slate-100 mb-8 space-y-2 w-full">
          <li>Install RAM using your package manager or download from GitHub.</li>
          <li>Configure RAM for your PostgreSQL cluster.</li>
          <li>Start the RAM service and connect to your cluster.</li>
          <li>Monitor resources and set up alerts.</li>
        </ol>
        <a href="https://github.com/pgElephant/ram" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 bg-green-300/20 border border-green-400 text-green-300 font-semibold rounded-xl hover:bg-green-300/30 hover:border-green-400/50 transition-all duration-200">
          View RAM on GitHub
        </a>
      </div>
    </div>
  );
}
