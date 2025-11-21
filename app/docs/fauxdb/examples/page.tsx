import { Metadata } from 'next'
import Link from 'next/link'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import BashCodeBlock from '../../../../components/BashCodeBlock'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'FauxDB Examples | Usage Patterns & Code Samples',
  description:
    'Example queries and usage patterns for FauxDB MongoDB and MySQL wire protocol support. CRUD operations, aggregation, and application integration examples.',
  alternates: {
    canonical: 'https://www.pgelephant.com/docs/fauxdb/examples',
  },
}

const tableOfContents: TocItem[] = [
  { id: 'mongodb-examples', title: 'MongoDB Protocol Examples' },
  { id: 'mysql-examples', title: 'MySQL Protocol Examples' },
  { id: 'application-integration', title: 'Application Integration' },
]

const prevLink: NavLink = {
  href: '/docs/fauxdb/monitoring',
  label: 'Monitoring',
}

const nextLink: NavLink = {
  href: '/docs/fauxdb/production',
  label: 'Production',
}

export default function FauxDBExamplesPage() {
  return (
    <PostgresDocsLayout
      title="FauxDB Examples"
      version="FauxDB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="mongodb-examples">
        <h2>MongoDB Protocol Examples</h2>
        <p>Practical examples using MongoDB wire protocol with FauxDB.</p>

        <h3>Connect with mongosh</h3>
        <BashCodeBlock
          title="Connection examples"
          code={`# Connect to FauxDB
mongosh mongodb://localhost:27017/mydb

# With authentication
mongosh "mongodb://username:password@localhost:27017/mydb?authSource=admin"`}
        />

        <h3>CRUD Operations</h3>
        <BashCodeBlock
          title="MongoDB CRUD"
          code={`// Insert documents
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
db.users.deleteMany({ age: { $gte: 40 } })`}
        />

        <h3>Aggregation Pipeline</h3>
        <BashCodeBlock
          title="Aggregation examples"
          code={`// Group by age and count
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
])`}
        />

        <h3>Indexes</h3>
        <BashCodeBlock
          title="Index management"
          code={`// Create indexes
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ name: 1, age: -1 })
db.users.createIndex({ location: "2dsphere" })

// List indexes
db.users.getIndexes()

// Drop index
db.users.dropIndex("email_1")`}
        />
      </section>

      <section id="mysql-examples">
        <h2>MySQL Protocol Examples</h2>
        <p>Practical examples using MySQL wire protocol with FauxDB.</p>

        <h3>Connect with MySQL Client</h3>
        <BashCodeBlock
          title="Connection examples"
          code={`# Connect to FauxDB
mysql -h localhost -P 3306 -u username -p mydb

# Connection string
mysql://username:password@localhost:3306/mydb`}
        />

        <h3>SQL Operations</h3>
        <SqlCodeBlock
          title="SQL CRUD operations"
          code={`-- Create table
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
DELETE FROM users WHERE age > 40;`}
        />

        <h3>Joins & Subqueries</h3>
        <SqlCodeBlock
          title="Advanced SQL queries"
          code={`-- Join tables
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
HAVING total_spent > 1000;`}
        />
      </section>

      <section id="application-integration">
        <h2>Application Integration</h2>
        <p>Code examples for integrating FauxDB with popular programming languages.</p>

        <h3>Python - MongoDB Driver</h3>
        <BashCodeBlock
          title="Python pymongo example"
          code={`from pymongo import MongoClient

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
    print(user)`}
        />

        <h3>Python - MySQL Driver</h3>
        <BashCodeBlock
          title="Python mysql-connector example"
          code={`import mysql.connector

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

conn.close()`}
        />

        <h3>Node.js - MongoDB Driver</h3>
        <BashCodeBlock
          title="Node.js mongodb example"
          code={`const { MongoClient } = require('mongodb');

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
  .toArray();`}
        />

        <h3>Node.js - MySQL Driver</h3>
        <BashCodeBlock
          title="Node.js mysql2 example"
          code={`const mysql = require('mysql2/promise');

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

console.log(rows);`}
        />
      </section>

      <section>
        <h2>Related Documentation</h2>
        <ul>
          <li><Link href="/docs/fauxdb/api">API Reference</Link></li>
          <li><Link href="/docs/fauxdb/configuration">Configuration Guide</Link></li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}
