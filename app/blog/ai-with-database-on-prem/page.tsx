import { redirect } from 'next/navigation'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI With Data On-Premises',
  description: 'Guide to deploying AI workloads with databases on-premises. Learn about on-premises AI infrastructure, data sovereignty, security, performance, and implementation with NeuronDB.',
  alternates: {
    canonical: 'https://neurondb.ai/blog/ai-with-database-on-prem',
  },
}

export default function AIWithDatabaseOnPremRedirect() {
  redirect('https://neurondb.ai/blog/ai-with-database-on-prem')
}

