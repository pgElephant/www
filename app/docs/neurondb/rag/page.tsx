import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'RAG with PostgreSQL | NeuronDB Retrieval Augmented Generation',
  description: 'Build production RAG (Retrieval Augmented Generation) applications with NeuronDB and PostgreSQL. Combine vector search + full-text search for AI chatbots, document Q&A, and knowledge bases.',
  alternates: {
    canonical: 'https://www.pgelephant.com/docs/neurondb/rag',
  },
}

const tableOfContents: TocItem[] = [
  { id: 'what-is-rag', title: 'What is RAG?' },
  { id: 'rag-workflow', title: 'RAG Workflow' },
  { id: 'implementation', title: 'Implementation' },
  { id: 'hybrid-search', title: 'Hybrid Search' },
  { id: 'reranking', title: 'Reranking' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/analytics',
  label: 'Analytics',
}

const nextLink: NavLink | undefined = undefined

export default function NeuronDBRAGPage() {
  return (
    <PostgresDocsLayout
      title="RAG Pipeline"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="what-is-rag">
        <h2>What is RAG?</h2>
        <p><strong>Retrieval Augmented Generation (RAG)</strong> enhances LLM responses by retrieving relevant context from your database before generating answers. This grounds LLM outputs in your actual data, reducing hallucinations and improving accuracy.</p>
      </section>

      <section id="rag-workflow">
        <h2>RAG Workflow</h2>
        <ol>
          <li><strong>User Question:</strong> "What is PostgreSQL replication?"</li>
          <li><strong>Retrieve:</strong> Find relevant documents using hybrid search</li>
          <li><strong>Rerank:</strong> Score and sort results by relevance</li>
          <li><strong>Generate:</strong> LLM creates answer using retrieved context</li>
          <li><strong>Response:</strong> Return answer with source citations</li>
        </ol>
      </section>

      <section id="implementation">
        <h2>Implementation</h2>

        <h3>1. Document Ingestion</h3>
        <SqlCodeBlock
          title="Ingest documents"
          code={`CREATE TABLE documents (
  id SERIAL PRIMARY KEY,
  content TEXT,
  embedding vector(1536),
  metadata JSONB
);

-- Generate embeddings during insert
INSERT INTO documents (content, embedding, metadata)
SELECT 
  content,
  neurondb_embed(content, 'text-embedding-ada-002'),
  jsonb_build_object('source', 'docs', 'timestamp', now())
FROM source_documents;`}
        />

        <h3>2. Retrieval</h3>
        <SqlCodeBlock
          title="Retrieve relevant documents"
          code={`-- Vector similarity search
SELECT id, content, metadata,
       embedding <=> neurondb_embed('What is PostgreSQL?', 'text-embedding-ada-002') AS distance
FROM documents
ORDER BY distance
LIMIT 10;`}
        />

        <h3>3. Generation</h3>
        <SqlCodeBlock
          title="Generate answer with context"
          code={`-- Combine retrieved context with LLM
WITH retrieved AS (
  SELECT content
  FROM documents
  ORDER BY embedding <=> neurondb_embed('What is PostgreSQL?', 'text-embedding-ada-002')
  LIMIT 5
)
SELECT neurondb_llm_generate(
  'gpt-4',
  'Answer the question using only the provided context: ' || 
  string_agg(content, '\n\n') || 
  '\n\nQuestion: What is PostgreSQL?'
) AS answer;`}
        />
      </section>

      <section id="hybrid-search">
        <h2>Hybrid Search</h2>
        <p>Combine vector search with full-text search for better results.</p>
        <SqlCodeBlock
          title="Hybrid search"
          code={`-- Combine vector and full-text search
SELECT id, content,
       (embedding <=> query_vec) * 0.7 + 
       (1.0 - ts_rank(to_tsvector('english', content), query_fts) / 10) * 0.3 AS score
FROM documents,
     (SELECT neurondb_embed('PostgreSQL replication', 'text-embedding-ada-002') AS query_vec,
             to_tsquery('english', 'PostgreSQL & replication') AS query_fts) q
WHERE to_tsvector('english', content) @@ query_fts
ORDER BY score
LIMIT 10;`}
        />
      </section>

      <section id="reranking">
        <h2>Reranking</h2>
        <p>Use cross-encoder models to rerank initial results for better relevance.</p>
        <SqlCodeBlock
          title="Reranking"
          code={`-- Rerank with cross-encoder
SELECT id, content,
       neurondb_rerank(
         'cross-encoder/ms-marco-MiniLM-L-6-v2',
         content,
         'What is PostgreSQL replication?'
       ) AS relevance_score
FROM (
  SELECT id, content
  FROM documents
  ORDER BY embedding <=> neurondb_embed('What is PostgreSQL replication?', 'text-embedding-ada-002')
  LIMIT 20
) candidates
ORDER BY relevance_score DESC
LIMIT 5;`}
        />
      </section>

      <section>
        <h2>RAG Components</h2>
        <ul>
          <li><a href="/docs/neurondb/rag/llm-integration">LLM Integration</a> - Hugging Face and OpenAI integration</li>
          <li><a href="/docs/neurondb/rag/document-processing">Document Processing</a> - Text processing and NLP</li>
        </ul>
      </section>

      <section>
        <h2>Next Steps</h2>
        <ul>
          <li><a href="/docs/neurondb/hybrid">Hybrid Search</a> - Advanced hybrid search techniques</li>
          <li><a href="/docs/neurondb/reranking/overview">Reranking</a> - Cross-encoder reranking guide</li>
          <li><a href="/docs/neurondb/ml/inference">ML Inference</a> - ONNX model deployment</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}
