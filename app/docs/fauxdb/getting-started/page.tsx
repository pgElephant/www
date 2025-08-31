import React from 'react';

export default function FauxDBGettingStarted() {
  return (
    <div className="container mx-auto py-16">
      <h1 className="text-4xl font-bold mb-4 text-teal-400">FauxDB: Getting Started</h1>
      <p className="text-lg text-slate-300 mb-8">Learn how to install, configure, and use FauxDB for MongoDB-compatible document storage on PostgreSQL.</p>
      <ol className="list-decimal pl-6 text-slate-200 mb-8 space-y-2">
        <li>Install FauxDB using your package manager or download from GitHub.</li>
        <li>Configure FauxDB for your PostgreSQL backend.</li>
        <li>Start the FauxDB service and connect with MongoDB clients.</li>
        <li>Store and query documents using MongoDB syntax.</li>
      </ol>
      <a href="https://github.com/pgElephant/fauxdb" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 bg-teal-600/20 border border-teal-400/30 text-teal-300 font-semibold rounded-xl hover:bg-teal-600/30 hover:border-teal-400/50 transition-all duration-200">
        View FauxDB on GitHub
      </a>
    </div>
  );
}
