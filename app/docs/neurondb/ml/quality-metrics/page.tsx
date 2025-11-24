import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'Quality Metrics | NeuronDB ML Algorithms',
  description: 'Evaluate model and search quality using various metrics including Recall@K, Precision@K, F1@K, MRR, and Davies-Bouldin Index.',
}

const tableOfContents: TocItem[] = [
  { id: 'overview', title: 'Overview' },
  { id: 'recall-at-k', title: 'Recall@K' },
  { id: 'precision-at-k', title: 'Precision@K' },
  { id: 'f1-at-k', title: 'F1@K' },
  { id: 'mrr', title: 'MRR (Mean Reciprocal Rank)' },
  { id: 'davies-bouldin', title: 'Davies-Bouldin Index' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/ml/dimensionality-reduction',
  label: 'Dimensionality Reduction',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/ml/drift-detection',
  label: 'Drift Detection',
}

export default function QualityMetricsPage() {
  return (
    <PostgresDocsLayout
      title="Quality Metrics"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="overview">
        <h2>Overview</h2>
        <p>Evaluate model and search quality using various metrics.</p>
      </section>

      <section id="recall-at-k">
        <h2>Recall@K</h2>
        <p>Fraction of relevant items in top K results:</p>
        <SqlCodeBlock
          title="Calculate Recall@K"
          code={`-- Calculate Recall@K
SELECT recall_at_k(
    ARRAY[1, 2, 3],      -- retrieved items
    ARRAY[1, 2, 5, 6],   -- relevant items
    5                    -- K
);`}
        />
      </section>

      <section id="precision-at-k">
        <h2>Precision@K</h2>
        <p>Fraction of retrieved items that are relevant:</p>
        <SqlCodeBlock
          title="Calculate Precision@K"
          code={`-- Calculate Precision@K
SELECT precision_at_k(
    ARRAY[1, 2, 3],
    ARRAY[1, 2, 5],
    5
);`}
        />
      </section>

      <section id="f1-at-k">
        <h2>F1@K</h2>
        <p>Harmonic mean of Precision@K and Recall@K:</p>
        <SqlCodeBlock
          title="Calculate F1@K"
          code={`-- Calculate F1@K
SELECT f1_at_k(
    ARRAY[1, 2, 3],
    ARRAY[1, 2, 5],
    5
);`}
        />
      </section>

      <section id="mrr">
        <h2>MRR (Mean Reciprocal Rank)</h2>
        <p>Average reciprocal rank of first relevant result:</p>
        <SqlCodeBlock
          title="Calculate MRR"
          code={`-- Calculate MRR
SELECT mean_reciprocal_rank(
    ARRAY[
        ARRAY[1, 2, 3],
        ARRAY[5, 1, 2]
    ],
    ARRAY[1, 1]  -- relevant items per query
);`}
        />
      </section>

      <section id="davies-bouldin">
        <h2>Davies-Bouldin Index</h2>
        <p>Clustering quality metric (lower is better):</p>
        <SqlCodeBlock
          title="Calculate Davies-Bouldin Index"
          code={`-- Calculate Davies-Bouldin Index
SELECT davies_bouldin_index(
    'data_table',
    'features',
    'cluster_label'
);`}
        />
      </section>

      <section>
        <h2>Learn More</h2>
        <p>
          For detailed documentation on all quality metrics, choosing appropriate metrics, benchmarking, and interpretation, visit:{' '}
          <a href="https://www.pgelephant.com/docs/neurondb/ml/quality-metrics" target="_blank" rel="noopener noreferrer">
            Quality Metrics Documentation
          </a>
        </p>
      </section>

      <section>
        <h2>Related Topics</h2>
        <ul>
          <li><a href="/docs/neurondb/ml/clustering">Clustering</a> - Evaluate clustering quality</li>
          <li><a href="/docs/neurondb/indexing">Vector Search</a> - Evaluate search quality</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}

