import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'Document Processing | NeuronDB RAG',
  description: 'Text processing and NLP capabilities for document processing in NeuronDB.',
}

const tableOfContents: TocItem[] = [
  { id: 'overview', title: 'Overview' },
  { id: 'text-processing', title: 'Text Processing' },
  { id: 'chunking', title: 'Chunking' },
  { id: 'tokenization', title: 'Tokenization' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/rag/llm-integration',
  label: 'LLM Integration',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/background-workers',
  label: 'Background Workers',
}

export default function DocumentProcessingPage() {
  return (
    <PostgresDocsLayout
      title="Document Processing"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="overview">
        <h2>Overview</h2>
        <p>Text processing and NLP capabilities.</p>
      </section>

      <section id="text-processing">
        <h2>Text Processing</h2>
        <p>Process and clean text:</p>
        <SqlCodeBlock
          title="Clean and normalize text"
          code={`-- Clean and normalize text
SELECT process_text(
    'Raw text with   multiple   spaces',
    '{"lowercase": true, "remove_extra_spaces": true}'::jsonb
) AS processed_text;`}
        />
      </section>

      <section id="chunking">
        <h2>Chunking</h2>
        <p>Split documents into chunks:</p>
        <SqlCodeBlock
          title="Chunk text"
          code={`-- Chunk text
SELECT chunk_text(
    'long document text...',
    500,  -- chunk size
    50    -- overlap
) AS chunks;`}
        />
      </section>

      <section id="tokenization">
        <h2>Tokenization</h2>
        <SqlCodeBlock
          title="Tokenize text"
          code={`-- Tokenize text
SELECT tokenize_text('Hello world', 'whitespace') AS tokens;`}
        />
      </section>

      <section>
        <h2>Learn More</h2>
        <p>
          For detailed documentation on document processing, chunking strategies, tokenization, and NLP features, visit:{' '}
          <a href="https://pgelephant.com/neurondb/nlp/" target="_blank" rel="noopener noreferrer">
            Document Processing Documentation
          </a>
        </p>
      </section>

      <section>
        <h2>Related Topics</h2>
        <ul>
          <li><a href="/docs/neurondb/rag">RAG Overview</a> - RAG pipeline</li>
          <li><a href="/docs/neurondb/ml/embeddings">Embedding Generation</a> - Generate embeddings</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}

