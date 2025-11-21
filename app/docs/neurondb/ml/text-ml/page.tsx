import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'NeuronDB · Text ML (Classification, Sentiment, NER, Summarization)',
  description: 'Run classic text ML tasks in SQL using NeuronDB utilities and pipelines.',
}

const tableOfContents: TocItem[] = [
  { id: 'text-classification', title: 'Text Classification' },
  { id: 'sentiment-analysis', title: 'Sentiment Analysis' },
  { id: 'ner', title: 'Named Entity Recognition' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/ml/gpu',
  label: 'GPU Acceleration',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/ml/outlier-detection',
  label: 'Outlier Detection',
}

export default function Page() {
  return (
    <PostgresDocsLayout
      title="Text ML"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="text-classification">
        <h2>Text Classification</h2>
        <p>Categorize text into predefined classes using trained classification models.</p>
        <SqlCodeBlock
          title="Classify text"
          code={`WITH text_samples AS (
    SELECT 'This product is amazing! Best purchase ever.' as text, 1 as sample_id
    UNION ALL
    SELECT 'Terrible experience, would not recommend.' as text, 2 as sample_id
)
SELECT 
    sample_id,
    text,
    neurondb.text_classify(
        text,
        'sentiment_classifier'  -- Model name
    ) as category
FROM text_samples;`}
        />
      </section>

      <section id="sentiment-analysis">
        <h2>Sentiment Analysis</h2>
        <p>Detect positive, negative, or neutral sentiment in text with confidence scores.</p>
        <SqlCodeBlock
          title="Analyze sentiment"
          code={`WITH reviews AS (
    SELECT 'I love this product! It exceeded all my expectations.' as review, 1 as review_id
    UNION ALL
    SELECT 'This is the worst purchase I have ever made.' as review, 2 as review_id
)
SELECT 
    review_id,
    review,
    neurondb.sentiment_analyze(
        review,
        'sentiment_model'
    ) as sentiment
FROM reviews;`}
        />
      </section>

      <section id="ner">
        <h2>Named Entity Recognition</h2>
        <p>Extract named entities (people, organizations, locations) from text.</p>
        <SqlCodeBlock
          title="Extract entities"
          code={`SELECT neurondb.extract_entities(
    'Apple Inc. is located in Cupertino, California.',
    'ner_model'
) as entities;`}
        />
      </section>

      <section>
        <h2>Next Steps</h2>
        <ul>
          <li><a href="/docs/neurondb/ml/outlier-detection">Outlier Detection</a> - Detect anomalies</li>
          <li><a href="/docs/neurondb/ml/svm">Support Vector Machines</a> - SVM classifiers</li>
          <li><a href="/docs/neurondb/ml/embeddings">Embeddings</a> - Generate text embeddings</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}
