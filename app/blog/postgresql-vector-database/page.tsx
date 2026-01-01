import { redirect } from 'next/navigation'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PostgreSQL as a Vector Database',
  description: 'Guide to using PostgreSQL as a vector database. Learn how PostgreSQL with NeuronDB extension works as a vector database with HNSW indexing, similarity search, and production capabilities.',
  alternates: {
    canonical: 'https://neurondb.ai/blog/postgresql-vector-database',
  },
}

export default function PostgreSQLVectorDatabaseRedirect() {
  redirect('https://neurondb.ai/blog/postgresql-vector-database')
}

