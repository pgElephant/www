import { redirect } from 'next/navigation'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NeuronDB: PostgreSQL AI Vector Database Extension',
  description: 'NeuronDB adds vector search, ML inference, and RAG capabilities to PostgreSQL. Includes HNSW indexing, GPU acceleration, 10 distance metrics, and pgvector compatibility.',
  alternates: {
    canonical: 'https://neurondb.ai/blog/neurondb',
  },
}

export default function NeuronDBBlogRedirect() {
  redirect('https://neurondb.ai/blog/neurondb')
}

