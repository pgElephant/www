import { redirect } from 'next/navigation'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RAG Architectures AI Builders Should Understand',
  description: 'Practical guide to the core RAG architecture patterns: basic, conversational, filtered, adaptive, hypothesis-driven, agent-driven, and graph-based RAG. Learn when to use each and what trade-offs matter in production.',
  alternates: {
    canonical: 'https://neurondb.ai/blog/rag-architectures-ai-builders-should-understand',
  },
}

export default function RAGArchitecturesAIBuildersShouldUnderstandRedirect() {
  redirect('https://neurondb.ai/blog/rag-architectures-ai-builders-should-understand')
}

