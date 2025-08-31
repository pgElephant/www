import React from 'react';

export default function FauxDBPage() {
  return (
    <div className="container mx-auto py-16">
      <h1 className="text-4xl font-bold mb-4 text-teal-400">FauxDB</h1>
      <p className="text-lg text-slate-300 mb-8">FauxDB is a high-performance, modern MongoDB to PostgreSQL proxy server built with cutting-edge C++24 features, Boost libraries, and the latest C++ libraries.</p>
      <ul className="list-disc pl-6 text-slate-200 mb-8">
        <li>C++24 Standard: Coroutines, ranges, std::expected</li>
        <li>Boost Integration: ASIO, Beast, JSON, Coroutines</li>
        <li>Async I/O: Non-blocking, event-driven architecture</li>
        <li>Multi-threaded: Hardware-concurrency aware worker thread pool</li>
        <li>MongoDB Wire Protocol: Full MongoDB 6.0+ protocol support</li>
        <li>PostgreSQL Backend: Efficient PostgreSQL connection pooling</li>
      </ul>
      <div className="mb-8 text-slate-400">
        <strong>License:</strong> MIT<br />
        <strong>Stars:</strong> 0<br />
        <strong>Forks:</strong> 0<br />
        <strong>Languages:</strong> Makefile (79.8%), C++ (11.7%), C (4.6%), CMake (2.0%), Shell (1.3%), JavaScript (0.6%)<br />
        <strong>Last Updated:</strong> 2025
      </div>
      <a href="https://github.com/pgElephant/fauxdb" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 bg-teal-600/20 border border-teal-400/30 text-teal-300 font-semibold rounded-xl hover:bg-teal-600/30 hover:border-teal-400/50 transition-all duration-200">
        View on GitHub
      </a>
    </div>
  );
}
