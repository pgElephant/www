import { redirect } from 'next/navigation'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Agentic AI: Guide to Autonomous AI Agents',
  description: 'Agentic AI systems guide. Explains agent architecture, planning, tool use, memory systems, and autonomous task execution. Includes implementation using NeuronDB and NeuronAgent with code examples.',
  alternates: {
    canonical: 'https://neurondb.ai/blog/agentic-ai',
  },
}

export default function AgenticAIRedirect() {
  redirect('https://neurondb.ai/blog/agentic-ai')
}

