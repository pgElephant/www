'use client'

import { useState } from 'react'
import ProjectTemplate from '../_components/ProjectTemplate'
import { Play, Terminal, Monitor, CheckCircle, Users, Star, Clock, BarChart3 } from 'lucide-react'

const fauxdbConfig = {
  hero: {
    title: 'FauxDB: MongoDB wire-protocol proxy with PostgreSQL storage',
    subtitle: 'MongoDB wire protocol proxy, Rust-powered, PostgreSQL backend',
    projectName: 'fauxdb',
  },
  badges: [
    'MongoDB Compatible',
    'Query Translator',
    'Rust Engine',
    'PostgreSQL Backend',
    'ACID Transactions',
    'Geospatial',
  ],
  demo: (
    <div className="max-w-7xl mx-auto mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top Row: MongoDB Client & FauxDB Proxy */}
        <div className="space-y-4">
          {/* mongosh terminal */}
          <div className="bg-gray-900 rounded-xl p-4 text-white font-mono text-xs shadow-lg border border-gray-800">
            <div className="flex items-center mb-3">
              <div className="flex gap-1 mr-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-green-300">mongosh</span>
            </div>
            <pre className="whitespace-pre-line text-green-300">{`> db.users.insertOne({ name: "Alice", age: 27 })
{ acknowledged: true, insertedId: ObjectId("64f1c2e1a1b2c3d4e5f6a7b8") }

> db.users.find({ age: { $gt: 20 } })
[
  { _id: ObjectId("64f1c2e1a1b2c3d4e5f6a7b8"), name: "Alice", age: 27 }
]

> db.stats()
{ collections: 1, objects: 1, avgObjSize: 32, storageSize: 4096 }
`}</pre>
          </div>
          
          {/* FauxDB Proxy Terminal */}
          <div className="bg-gray-900 rounded-xl p-4 text-white font-mono text-xs shadow-lg border border-gray-800">
            <div className="flex items-center mb-3">
              <div className="flex gap-1 mr-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-cyan-300">fauxdb-proxy</span>
            </div>
            <pre className="whitespace-pre-line text-cyan-200">{`[INFO] MongoDB wire protocol request received
[TRANSLATE] insertOne() → INSERT INTO users (name, age) VALUES ('Alice', 27)
[TRANSLATE] find({age: {$gt: 20}}) → SELECT * FROM users WHERE age > 20
[TRANSLATE] stats() → SELECT COUNT(*) FROM users; SELECT pg_total_relation_size('users')

[INFO] Query translation completed
[INFO] Forwarding to PostgreSQL backend
[INFO] Response received from PostgreSQL
[INFO] Converting PostgreSQL response to MongoDB format
[INFO] Sending response to MongoDB client
`}</pre>
          </div>
        </div>
        
        {/* Bottom Row: PostgreSQL & PostgreSQL Logs */}
        <div className="space-y-4">
          {/* PostgreSQL Terminal */}
          <div className="bg-gray-900 rounded-xl p-4 text-white font-mono text-xs shadow-lg border border-gray-800">
            <div className="flex items-center mb-3">
              <div className="flex gap-1 mr-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-yellow-200">postgresql</span>
            </div>
            <pre className="whitespace-pre-line text-yellow-100">{`> psql -d fauxdb -c "INSERT INTO users (name, age) VALUES ('Alice', 27);"
INSERT 0 1

> psql -d fauxdb -c "SELECT * FROM users WHERE age > 20;"
id |  name  | age
----+--------+-----
 1  | Alice  | 27
(1 row)

> psql -d fauxdb -c "SELECT COUNT(*) FROM users;"
 count
-------
     1
(1 row)

> psql -d fauxdb -c "SELECT pg_total_relation_size('users');"
 pg_total_relation_size
------------------------
                  4096
(1 row)
`}</pre>
          </div>
          
          {/* PostgreSQL Logs */}
          <div className="bg-gray-900 rounded-xl p-4 text-white font-mono text-xs shadow-lg border border-gray-800">
            <div className="flex items-center mb-3">
              <div className="flex gap-1 mr-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-purple-300">postgresql.log</span>
            </div>
            <pre className="whitespace-pre-line text-purple-200">{`2025-10-01 10:30:15.123 UTC [1234] LOG:  connection received: host=127.0.0.1 port=5432
2025-10-01 10:30:15.124 UTC [1234] LOG:  connection authorized: user=fauxdb database=fauxdb
2025-10-01 10:30:15.125 UTC [1234] LOG:  statement: INSERT INTO users (name, age) VALUES ('Alice', 27);
2025-10-01 10:30:15.126 UTC [1234] LOG:  statement: SELECT * FROM users WHERE age > 20;
2025-10-01 10:30:15.127 UTC [1234] LOG:  statement: SELECT COUNT(*) FROM users;
2025-10-01 10:30:15.128 UTC [1234] LOG:  statement: SELECT pg_total_relation_size('users');
2025-10-01 10:30:15.129 UTC [1234] LOG:  disconnection: session time: 0:00:00.006
`}</pre>
          </div>
        </div>
      </div>
    </div>
  ),
  featurePillars: {
    kicker: 'Overview',
    items: [
      { title: 'MongoDB Wire Protocol', desc: 'Full MongoDB wire protocol proxy for seamless compatibility.' },
      { title: 'Query Translation', desc: 'Real-time MongoDB queries translated to PostgreSQL SQL.' },
      { title: 'Rust-Powered Engine', desc: 'High-performance, safe, and modern proxy engine.' },
      { title: 'PostgreSQL Backend', desc: 'Reliable, battle-tested PostgreSQL storage backend.' },
    ],
  },
  docsLinks: [
    { href: '/docs/fauxdb/api', title: 'API Reference', desc: 'Explore the FauxDB API.' },
    { href: '/docs/fauxdb/query-translation', title: 'Query Translation', desc: 'Learn how MongoDB queries are translated.' },
  ],
};

export default function FauxDbPage() {
  return <ProjectTemplate {...fauxdbConfig} />;
}