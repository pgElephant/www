'use client'

import React from 'react'
import { ArrowLeft, Calendar, Clock, User, Tag, ArrowRight, FileText, Database, Zap, Shield, Globe, Code } from 'lucide-react'
import Link from 'next/link'

const FauxdbBlogPage = () => {
  return (
    <div className="pt-16 bg-gradient-to-br from-slate-600 via-slate-700 to-teal-700">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-600 via-slate-700 to-teal-700 text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-blue-300/15 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-blue-500/20 to-blue-400/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-blue-300/15 to-blue-200/10 rounded-full blur-2xl" />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #3b82f6 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Glassmorphism Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-600/30 via-slate-700/20 to-teal-700/30 backdrop-blur-sm" />

        <div className="container-custom py-16 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Link href="/blog" className="inline-flex items-center text-blue-300 hover:text-blue-200 mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
            
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-blue-400/20 rounded-2xl flex items-center justify-center mr-4 border border-blue-400/30">
                <FileText className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-blue-200 mb-2">
                  FauxDB - MongoDB Compatible Document Database
                </h1>
                <p className="text-xl text-slate-300">
                  PostgreSQL-based document database with MongoDB API compatibility
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                <span>pgElephant Team</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>January 10, 2024</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>7 min read</span>
              </div>
              <div className="flex items-center">
                <Tag className="w-4 h-4 mr-2" />
                <span>Document Database, MongoDB, PostgreSQL</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-400/30">
            <div className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-white mb-6">What is FauxDB?</h2>
              <p className="text-slate-300 mb-6 text-lg leading-relaxed">
                FauxDB is a PostgreSQL-based document database that provides MongoDB API compatibility. It combines the reliability and ACID properties of PostgreSQL with the flexibility and ease of use of document databases, making it perfect for modern applications.
              </p>

              <h2 className="text-2xl font-bold text-white mb-6 mt-12">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-slate-100/10 rounded-xl p-6 border border-slate-400/30">
                  <div className="flex items-center mb-3">
                    <Database className="w-6 h-6 text-blue-400 mr-3" />
                    <h3 className="text-lg font-semibold text-white">MongoDB API Compatible</h3>
                  </div>
                  <p className="text-slate-300 text-sm">Drop-in replacement for MongoDB with familiar API</p>
                </div>
                <div className="bg-slate-100/10 rounded-xl p-6 border border-slate-400/30">
                  <div className="flex items-center mb-3">
                    <Shield className="w-6 h-6 text-blue-400 mr-3" />
                    <h3 className="text-lg font-semibold text-white">ACID Compliance</h3>
                  </div>
                  <p className="text-slate-300 text-sm">Full ACID transactions with PostgreSQL reliability</p>
                </div>
                <div className="bg-slate-100/10 rounded-xl p-6 border border-slate-400/30">
                  <div className="flex items-center mb-3">
                    <Zap className="w-6 h-6 text-blue-400 mr-3" />
                    <h3 className="text-lg font-semibold text-white">High Performance</h3>
                  </div>
                  <p className="text-slate-300 text-sm">Optimized for both document and relational queries</p>
                </div>
                <div className="bg-slate-100/10 rounded-xl p-6 border border-slate-400/30">
                  <div className="flex items-center mb-3">
                    <Globe className="w-6 h-6 text-blue-400 mr-3" />
                    <h3 className="text-lg font-semibold text-white">Flexible Schema</h3>
                  </div>
                  <p className="text-slate-300 text-sm">Schema-less documents with optional validation</p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white mb-6 mt-12">Why FauxDB?</h2>
              <p className="text-slate-300 mb-6 text-lg leading-relaxed">
                FauxDB bridges the gap between document databases and relational databases, offering the best of both worlds. You get MongoDB's flexibility with PostgreSQL's reliability and ecosystem.
              </p>

              <div className="bg-slate-100/10 rounded-xl p-6 border border-slate-400/30 mb-8">
                <h3 className="text-lg font-semibold text-white mb-4">Benefits Over Traditional MongoDB</h3>
                <ul className="text-slate-300 space-y-2">
                  <li className="flex items-start">
                    <span className="bg-blue-400 text-slate-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">•</span>
                    <span><strong>ACID Transactions:</strong> Full transaction support across documents</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-400 text-slate-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">•</span>
                    <span><strong>SQL Queries:</strong> Query documents using familiar SQL syntax</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-400 text-slate-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">•</span>
                    <span><strong>Mature Ecosystem:</strong> Leverage PostgreSQL's extensive tooling</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-400 text-slate-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">•</span>
                    <span><strong>Better Backup:</strong> PostgreSQL's proven backup and recovery</span>
                  </li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-white mb-6 mt-12">Getting Started</h2>
              <p className="text-slate-300 mb-6 text-lg leading-relaxed">
                FauxDB is designed to be a drop-in replacement for MongoDB. Simply change your connection string and start using it with your existing MongoDB applications.
              </p>

              <div className="bg-slate-900 rounded-xl p-6 border border-slate-400/30 mb-8">
                <h3 className="text-lg font-semibold text-white mb-4">Quick Start</h3>
                <pre className="text-slate-300 text-sm overflow-x-auto">
{`# Install FauxDB
npm install fauxdb

# Connect to FauxDB
const { MongoClient } = require('fauxdb');
const client = new MongoClient('mongodb://localhost:27017');

# Use like MongoDB
const db = client.db('mydb');
const collection = db.collection('users');

# Insert document
await collection.insertOne({
  name: 'John Doe',
  email: 'john@example.com',
  age: 30
});`}
                </pre>
              </div>

              <h2 className="text-2xl font-bold text-white mb-6 mt-12">Use Cases</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-slate-100/10 rounded-xl p-6 border border-slate-400/30">
                  <h3 className="text-lg font-semibold text-white mb-3">Web Applications</h3>
                  <p className="text-slate-300 text-sm">Perfect for modern web apps that need both document flexibility and relational integrity</p>
                </div>
                <div className="bg-slate-100/10 rounded-xl p-6 border border-slate-400/30">
                  <h3 className="text-lg font-semibold text-white mb-3">Microservices</h3>
                  <p className="text-slate-300 text-sm">Ideal for microservices that need document storage with transaction support</p>
                </div>
                <div className="bg-slate-100/10 rounded-xl p-6 border border-slate-400/30">
                  <h3 className="text-lg font-semibold text-white mb-3">Data Migration</h3>
                  <p className="text-slate-300 text-sm">Easily migrate from MongoDB to PostgreSQL without changing your application code</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-12">
                <Link
                  href="/fauxdb"
                  className="inline-flex items-center px-6 py-3 bg-blue-400/20 text-blue-300 border border-blue-400/30 rounded-lg hover:bg-blue-400/30 transition-colors"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Learn More About FauxDB
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link
                  href="/docs/fauxdb/getting-started"
                  className="inline-flex items-center px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors"
                >
                  <Database className="w-5 h-5 mr-2" />
                  View Documentation
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FauxdbBlogPage
