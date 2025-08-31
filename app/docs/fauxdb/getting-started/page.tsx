import React from 'react';

export default function FauxDBGettingStarted() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-blue-600 to-teal-600 py-16 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white/10 backdrop-blur-sm rounded-2xl p-10 border border-blue-400 shadow-lg flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4 text-white">FauxDB: Getting Started</h1>
        <p className="text-lg text-slate-200 mb-8 text-center">Learn how to install, configure, and use FauxDB for MongoDB-compatible document storage on PostgreSQL.</p>
        <ol className="list-decimal pl-6 text-slate-100 mb-8 space-y-2 w-full">
          <li>Install FauxDB using your package manager or download from GitHub.</li>
          <li>Configure FauxDB for your PostgreSQL backend.</li>
          <li>Start the FauxDB service and connect with MongoDB clients.</li>
          <li>Store and query documents using MongoDB syntax.</li>
        </ol>
        <a href="https://github.com/pgElephant/fauxdb" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 bg-blue-300/20 border border-blue-400 text-blue-300 font-semibold rounded-xl hover:bg-blue-300/30 hover:border-blue-400/50 transition-all duration-200">
          View FauxDB on GitHub
        </a>
      </div>
    </div>
  );
}
