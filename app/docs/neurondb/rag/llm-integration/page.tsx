import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'LLM Integration | NeuronDB RAG',
  description: 'Hugging Face and OpenAI integration for LLM-powered features in NeuronDB.',
}

const tableOfContents: TocItem[] = [
  { id: 'overview', title: 'Overview' },
  { id: 'openai-integration', title: 'OpenAI Integration' },
  { id: 'hugging-face-integration', title: 'Hugging Face Integration' },
  { id: 'configure-providers', title: 'Configure Providers' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/rag',
  label: 'RAG Overview',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/rag/document-processing',
  label: 'Document Processing',
}

export default function LLMIntegrationPage() {
  return (
    <PostgresDocsLayout
      title="LLM Integration"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="overview">
        <h2>Overview</h2>
        <p>Hugging Face and OpenAI integration for LLM-powered features.</p>
      </section>

      <section id="openai-integration">
        <h2>OpenAI Integration</h2>
        <p>Use OpenAI models:</p>
        <SqlCodeBlock
          title="OpenAI completion"
          code={`-- OpenAI completion
SELECT openai_complete(
    'What is AI?',
    'gpt-4',
    '{"temperature": 0.7}'::jsonb
) AS response;`}
        />
      </section>

      <section id="hugging-face-integration">
        <h2>Hugging Face Integration</h2>
        <p>Use Hugging Face models:</p>
        <SqlCodeBlock
          title="Hugging Face inference"
          code={`-- Hugging Face inference
SELECT huggingface_inference(
    'What is machine learning?',
    'microsoft/DialoGPT-medium'
) AS response;`}
        />
      </section>

      <section id="configure-providers">
        <h2>Configure Providers</h2>
        <SqlCodeBlock
          title="Configure API keys and endpoints"
          code={`-- Set OpenAI API key
SET neurondb.openai_api_key = 'your-api-key';

-- Set Hugging Face endpoint
SET neurondb.huggingface_endpoint = 'https://api-inference.huggingface.co';`}
        />
      </section>

      <section>
        <h2>Learn More</h2>
        <p>
          For detailed documentation on LLM integration, provider configuration, model selection, and cost optimization, visit:{' '}
          <a href="https://www.pgelephant.com/docs/neurondb/llm" target="_blank" rel="noopener noreferrer">
            LLM Integration Documentation
          </a>
        </p>
      </section>

      <section>
        <h2>Related Topics</h2>
        <ul>
          <li><a href="/docs/neurondb/rag">RAG Overview</a> - RAG pipeline</li>
          <li><a href="/docs/neurondb/rag/document-processing">Document Processing</a> - Text processing</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}

