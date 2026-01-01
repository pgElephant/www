import { redirect } from 'next/navigation'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RAG: Retrieval-Augmented Generation With PostgreSQL',
  description: 'RAG (Retrieval-Augmented Generation) guide with examples, SQL queries, and implementation patterns. Learn how to build RAG systems with document retrieval, context building, LLM integration, and response generation.',
  alternates: {
    canonical: 'https://neurondb.ai/blog/rag-complete-guide',
  },
}

export default function RAGCompleteGuideRedirect() {
  redirect('https://neurondb.ai/blog/rag-complete-guide')
}

