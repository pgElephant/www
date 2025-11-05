import React from 'react'
import { Code, Database, ArrowRight, Copy } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'FauxDB Examples | Documentation',
  description: 'Example queries and usage patterns for FauxDB MongoDB and MySQL wire protocol support',
}

const FauxDBExamplesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-6 py-16 max-w-6xl">
        <div className="mb-12">
          <Link 
            href="/docs/fauxdb" 
            className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 mb-6 transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to FauxDB Documentation
          </Link>
          
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-400">
            FauxDB Examples
          </h1>
          <p className="text-xl text-slate-300">
            Practical examples using MongoDB and MySQL wire protocols with FauxDB
          </p>
        </div>

        {/* MongoDB Examples */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Database className="w-8 h-8 text-emerald-400" />
            MongoDB Protocol Examples
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-emerald-400/30">
              <h3 className="text-xl font-bold text-emerald-300 mb-4">Connect with mongosh</h3>
              <div className="bg-slate-900/50 rounded-lg p-4">
                <pre className="text-sm overflow-x-auto"><code className="text-green-400">{`# Connect to FauxDB
mongosh mongodb://localhost:27017/mydb

# With authentication
mongosh "mongodb://username:password@localhost:27017/mydb?authSource=admin"`}</code></pre>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-emerald-400/30">
              <h3 className="text-xl font-bold text-emerald-300 mb-4">CRUD Operations</h3>
              <div className="bg-slate-900/50 rounded-lg p-4">
                  <pre className="text-sm overflow-x-auto"><code className="text-green-400">{`// Insert documents
db.users.insertOne({ 
  name: "John Doe", 
  email: "john@example.com",
  age: 30,
  created: new Date()
})

db.users.insertMany([
  { name: "Jane Smith", email: "jane@example.com", age: 25 },
  { name: "Bob Wilson", email: "bob@example.com", age: 35 }
])

// Find documents
db.users.find({ age: { $gte: 25 } })
db.users.findOne({ email: "john@example.com" })

// Update documents
db.users.updateOne(
  { email: "john@example.com" },
  { $set: { age: 31, updated: new Date() } }
)

db.users.updateMany(
  { age: { $lt: 30 } },
  { $inc: { age: 1 } }
)

// Delete documents
db.users.deleteOne({ email: "john@example.com" })
db.users.deleteMany({ age: { $gte: 40 } })`}</code></pre>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-emerald-400/30">
              <h3 className="text-xl font-bold text-emerald-300 mb-4">Aggregation Pipeline</h3>
              <div className="bg-slate-900/50 rounded-lg p-4">
                  <pre className="text-sm overflow-x-auto"><code className="text-green-400">{`// Group by age and count
db.users.aggregate([
  { $group: { _id: "$age", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
])

// Complex aggregation
db.orders.aggregate([
  { $match: { status: "completed" } },
  { $group: {
      _id: "$customer_id",
      total: { $sum: "$amount" },
      count: { $sum: 1 },
      avg: { $avg: "$amount" }
    }
  },
  { $sort: { total: -1 } },
  { $limit: 10 }
])`}</code></pre>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-emerald-400/30">
              <h3 className="text-xl font-bold text-emerald-300 mb-4">Indexes</h3>
              <div className="bg-slate-900/50 rounded-lg p-4">
                  <pre className="text-sm overflow-x-auto"><code className="text-green-400">{`// Create indexes
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ name: 1, age: -1 })
db.users.createIndex({ location: "2dsphere" })

// List indexes
db.users.getIndexes()

// Drop index
db.users.dropIndex("email_1")`}</code></pre>
              </div>
            </div>
          </div>
        </section>

        {/* MySQL Examples */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Code className="w-8 h-8 text-blue-400" />
            MySQL Protocol Examples
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-blue-400/30">
              <h3 className="text-xl font-bold text-blue-300 mb-4">Connect with MySQL Client</h3>
              <div className="bg-slate-900/50 rounded-lg p-4">
                  <pre className="text-sm overflow-x-auto"><code className="text-green-400">{`# Connect to FauxDB
mysql -h localhost -P 3306 -u username -p mydb

# Connection string
mysql://username:password@localhost:3306/mydb`}</code></pre>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-blue-400/30">
              <h3 className="text-xl font-bold text-blue-300 mb-4">SQL Operations</h3>
              <div className="bg-slate-900/50 rounded-lg p-4">
                  <pre className="text-sm overflow-x-auto"><code className="text-green-400">{`-- Create table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  age INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert data
INSERT INTO users (name, email, age) 
VALUES ('John Doe', 'john@example.com', 30);

INSERT INTO users (name, email, age) VALUES
  ('Jane Smith', 'jane@example.com', 25),
  ('Bob Wilson', 'bob@example.com', 35);

-- Query data
SELECT * FROM users WHERE age >= 25;
SELECT name, email FROM users ORDER BY age DESC;

-- Update data
UPDATE users SET age = 31 WHERE email = 'john@example.com';

-- Delete data
DELETE FROM users WHERE age > 40;`}</code></pre>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-blue-400/30">
              <h3 className="text-xl font-bold text-blue-300 mb-4">Joins & Subqueries</h3>
              <div className="bg-slate-900/50 rounded-lg p-4">
                  <pre className="text-sm overflow-x-auto"><code className="text-green-400">{`-- Join tables
SELECT u.name, o.order_id, o.amount
FROM users u
JOIN orders o ON u.id = o.user_id
WHERE o.status = 'completed';

-- Subquery
SELECT name, email
FROM users
WHERE id IN (
  SELECT user_id FROM orders 
  WHERE amount > 100
);

-- Aggregation
SELECT 
  u.name,
  COUNT(o.id) as order_count,
  SUM(o.amount) as total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name
HAVING total_spent > 1000;`}</code></pre>
              </div>
            </div>
          </div>
        </section>

        {/* Python Examples */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Application Integration</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30">
              <h3 className="text-lg font-bold text-purple-300 mb-4">Python - MongoDB Driver</h3>
              <div className="bg-slate-900/50 rounded-lg p-4">
                  <pre className="text-sm overflow-x-auto"><code className="text-green-400">{`from pymongo import MongoClient

# Connect to FauxDB
client = MongoClient('mongodb://localhost:27017/')
db = client['mydb']
collection = db['users']

# Insert
collection.insert_one({
    'name': 'John',
    'email': 'john@example.com'
})

# Query
users = collection.find({'age': {'$gte': 25}})
for user in users:
    print(user)`}</code></pre>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30">
              <h3 className="text-lg font-bold text-purple-300 mb-4">Python - MySQL Driver</h3>
              <div className="bg-slate-900/50 rounded-lg p-4">
                  <pre className="text-sm overflow-x-auto"><code className="text-green-400">{`import mysql.connector

# Connect to FauxDB
conn = mysql.connector.connect(
    host='localhost',
    port=3306,
    user='username',
    password='password',
    database='mydb'
)

cursor = conn.cursor()

# Query
cursor.execute(
    "SELECT * FROM users WHERE age >= %s", 
    (25,)
)

for row in cursor.fetchall():
    print(row)

conn.close()`}</code></pre>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30">
              <h3 className="text-lg font-bold text-purple-300 mb-4">Node.js - MongoDB Driver</h3>
              <div className="bg-slate-900/50 rounded-lg p-4">
                  <pre className="text-sm overflow-x-auto"><code className="text-green-400">{`const { MongoClient } = require('mongodb');

const client = new MongoClient(
  'mongodb://localhost:27017'
);

await client.connect();
const db = client.db('mydb');
const collection = db.collection('users');

// Insert
await collection.insertOne({
  name: 'John',
  email: 'john@example.com'
});

// Query
const users = await collection
  .find({ age: { $gte: 25 } })
  .toArray();`}</code></pre>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30">
              <h3 className="text-lg font-bold text-purple-300 mb-4">Node.js - MySQL Driver</h3>
              <div className="bg-slate-900/50 rounded-lg p-4">
                  <pre className="text-sm overflow-x-auto"><code className="text-green-400">{`const mysql = require('mysql2/promise');

const connection = await mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'username',
  password: 'password',
  database: 'mydb'
});

// Query
const [rows] = await connection.execute(
  'SELECT * FROM users WHERE age >= ?',
  [25]
);

console.log(rows);`}</code></pre>
              </div>
            </div>
          </div>
        </section>

        {/* Related Documentation */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Related Documentation</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/docs/fauxdb/api"
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-emerald-400/50 transition-all group"
            >
              <span className="font-semibold">API Reference</span>
              <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="/docs/fauxdb/configuration"
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-emerald-400/50 transition-all group"
            >
              <span className="font-semibold">Configuration Guide</span>
              <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

export default FauxDBExamplesPage
