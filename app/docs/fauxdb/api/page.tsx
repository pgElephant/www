import { Metadata } from 'next'
import Link from 'next/link'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import BashCodeBlock from '../../../../components/BashCodeBlock'

export const metadata: Metadata = {
  title: 'FauxDB API Reference | MongoDB-Compatible API Documentation',
  description:
    'Complete API reference for FauxDB MongoDB-compatible interface and REST endpoints. CRUD operations, aggregation pipelines, and transactions.',
  alternates: {
    canonical: 'https://www.pgelephant.com/docs/fauxdb/api',
  },
}

const tableOfContents: TocItem[] = [
  { id: 'mongodb-compatibility', title: 'MongoDB Compatibility' },
  { id: 'api-endpoints', title: 'API Endpoints' },
  { id: 'crud-operations', title: 'CRUD Operations' },
  { id: 'aggregation', title: 'Aggregation Pipelines' },
  { id: 'transactions', title: 'Transactions' },
]

const prevLink: NavLink = {
  href: '/docs/fauxdb/getting-started',
  label: 'Getting Started',
}

const nextLink: NavLink = {
  href: '/docs/fauxdb/docker',
  label: 'Docker',
}

export default function FauxDBApiPage() {
  return (
    <PostgresDocsLayout
      title="FauxDB API Reference"
      version="FauxDB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="mongodb-compatibility">
        <h2>MongoDB Wire Protocol Compatibility</h2>
        <p>
          FauxDB implements the MongoDB wire protocol, ensuring compatibility with existing MongoDB drivers, tools, and applications.
        </p>

        <h3>Supported Operations</h3>
        <div>
          <h4>CRUD Operations</h4>
          <ul>
            <li>insertOne, insertMany</li>
            <li>findOne, find</li>
            <li>updateOne, updateMany</li>
            <li>deleteOne, deleteMany</li>
          </ul>
        </div>
        <div>
          <h4>Advanced Features</h4>
          <ul>
            <li>Aggregation pipelines</li>
            <li>Geospatial queries</li>
            <li>ACID transactions</li>
            <li>Indexing support</li>
          </ul>
        </div>
      </section>

      <section id="api-endpoints">
        <h2>API Endpoints</h2>
        <p>FauxDB provides RESTful API endpoints for programmatic access.</p>

        <h3>Database Management</h3>
        <BashCodeBlock
          title="List databases"
          code={`GET /api/v1/databases`}
        />

        <BashCodeBlock
          title="Create database"
          code={`POST /api/v1/databases
Content-Type: application/json

{"name": "mydb"}`}
        />

        <h3>Collection Management</h3>
        <BashCodeBlock
          title="List collections"
          code={`GET /api/v1/databases/{db}/collections`}
        />

        <BashCodeBlock
          title="Create collection"
          code={`POST /api/v1/databases/{db}/collections
Content-Type: application/json

{"name": "users"}`}
        />

        <h3>Document Operations</h3>
        <BashCodeBlock
          title="Query documents"
          code={`GET /api/v1/databases/{db}/collections/{collection}/documents`}
        />

        <BashCodeBlock
          title="Insert document"
          code={`POST /api/v1/databases/{db}/collections/{collection}/documents
Content-Type: application/json

{"name": "John", "email": "john@example.com"}`}
        />
      </section>

      <section id="crud-operations">
        <h2>CRUD Operations</h2>
        <p>Basic create, read, update, and delete operations using MongoDB protocol.</p>

        <BashCodeBlock
          title="MongoDB CRUD examples"
          code={`# Connect with mongosh
mongosh mongodb://localhost:27018/mydb

# Insert documents
db.users.insertOne({ 
  name: "John Doe", 
  email: "john@example.com",
  age: 30
})

db.users.insertMany([
  { name: "Jane Smith", email: "jane@example.com", age: 25 },
  { name: "Bob Wilson", email: "bob@example.com", age: 35 }
])

# Find documents
db.users.find({ age: { $gte: 25 } })
db.users.findOne({ email: "john@example.com" })

# Update documents
db.users.updateOne(
  { email: "john@example.com" },
  { $set: { age: 31 } }
)

db.users.updateMany(
  { age: { $lt: 30 } },
  { $inc: { age: 1 } }
)

# Delete documents
db.users.deleteOne({ email: "john@example.com" })
db.users.deleteMany({ age: { $gte: 40 } })`}
        />
      </section>

      <section id="aggregation">
        <h2>Aggregation Pipelines</h2>
        <p>Complex data processing using MongoDB aggregation framework.</p>

        <BashCodeBlock
          title="Aggregation examples"
          code={`# Group by age and count
db.users.aggregate([
  { $group: { _id: "$age", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
])

# Complex aggregation
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
      </section>

      <section id="transactions">
        <h2>Transactions</h2>
        <p>Multi-document ACID transactions with PostgreSQL backend.</p>

        <BashCodeBlock
          title="Transaction example"
          code={`# Start a transaction session
session = db.getMongo().startSession()
session.startTransaction()

# Perform operations within transaction
db.users.insertOne({name: "Alice"}, {session: session})
db.profiles.insertOne({userId: "123"}, {session: session})

# Commit transaction
session.commitTransaction()`}
        />
      </section>

      <section>
        <h2>Related Documentation</h2>
        <ul>
          <li><Link href="/docs/fauxdb/examples">Examples</Link> - See practical usage examples</li>
          <li><Link href="/docs/fauxdb/configuration">Configuration</Link> - Configure API endpoints and protocols</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}
