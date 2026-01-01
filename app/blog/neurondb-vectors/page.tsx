import { redirect } from 'next/navigation'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vectors in PostgreSQL',
  description: 'Vector operations, indexing, and similarity search in PostgreSQL with NeuronDB. Guide with SQL queries and results. Learn HNSW indexing, distance metrics, quantization, and performance optimization.',
  alternates: {
    canonical: 'https://neurondb.ai/blog/neurondb-vectors',
  },
}

export default function NeuronDBVectorsRedirect() {
  redirect('https://neurondb.ai/blog/neurondb-vectors')
}

