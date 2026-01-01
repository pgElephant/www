import { redirect } from 'next/navigation'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Semantic Search Over Text with NeuronDB',
  description: 'Implement semantic search over text using NeuronDB. Includes examples, SQL queries, and code. Guide to building document search systems, RAG pipelines, and hybrid search.',
  alternates: {
    canonical: 'https://neurondb.ai/blog/neurondb-semantic-search-guide',
  },
}

export default function NeuronDBSemanticSearchGuideRedirect() {
  redirect('https://neurondb.ai/blog/neurondb-semantic-search-guide')
}

