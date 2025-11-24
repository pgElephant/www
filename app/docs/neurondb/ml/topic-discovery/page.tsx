import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'Topic Discovery | NeuronDB ML Algorithms',
  description: 'Discover hidden topics in text collections using topic modeling with LDA (Latent Dirichlet Allocation) in NeuronDB.',
}

const tableOfContents: TocItem[] = [
  { id: 'overview', title: 'Overview' },
  { id: 'lda', title: 'LDA (Latent Dirichlet Allocation)' },
  { id: 'topic-assignment', title: 'Topic Assignment' },
  { id: 'topic-keywords', title: 'Topic Keywords' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/ml/drift-detection',
  label: 'Drift Detection',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/ml/time-series',
  label: 'Time Series',
}

export default function TopicDiscoveryPage() {
  return (
    <PostgresDocsLayout
      title="Topic Discovery"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="overview">
        <h2>Overview</h2>
        <p>Discover hidden topics in text collections using topic modeling.</p>
      </section>

      <section id="lda">
        <h2>LDA (Latent Dirichlet Allocation)</h2>
        <p>Extract topics from documents:</p>
        <SqlCodeBlock
          title="LDA topic modeling"
          code={`-- LDA topic modeling
SELECT lda_topic_discovery(
    'documents_table',
    'text_column',
    10,  -- number of topics
    '{}'::jsonb
);`}
        />
      </section>

      <section id="topic-assignment">
        <h2>Topic Assignment</h2>
        <p>Assign topics to documents:</p>
        <SqlCodeBlock
          title="Get topic for each document"
          code={`-- Get topic for each document
SELECT id, text,
       lda_get_topic(text, 'lda_model') AS topic_id,
       lda_get_topic_distribution(text, 'lda_model') AS topic_probs
FROM documents;`}
        />
      </section>

      <section id="topic-keywords">
        <h2>Topic Keywords</h2>
        <p>Get keywords for each topic:</p>
        <SqlCodeBlock
          title="Get top keywords per topic"
          code={`-- Get top keywords per topic
SELECT topic_id,
       lda_get_topic_keywords('lda_model', topic_id, 10) AS keywords
FROM generate_series(0, 9) AS topic_id;`}
        />
      </section>

      <section>
        <h2>Learn More</h2>
        <p>
          For detailed documentation on topic modeling, choosing number of topics, topic interpretation, and visualization, visit:{' '}
          <a href="https://pgelephant.com/neurondb/analytics/topics/" target="_blank" rel="noopener noreferrer">
            Topic Discovery Documentation
          </a>
        </p>
      </section>

      <section>
        <h2>Related Topics</h2>
        <ul>
          <li><a href="/docs/neurondb/ml/embeddings">Embedding Generation</a> - Generate embeddings from text</li>
          <li><a href="/docs/neurondb/ml/clustering">Clustering</a> - Cluster documents by similarity</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}

