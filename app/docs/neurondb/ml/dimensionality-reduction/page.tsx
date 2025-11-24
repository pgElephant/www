import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'Dimensionality Reduction | NeuronDB ML Algorithms',
  description: 'Reduce vector dimensions while preserving important information using PCA and whitening in NeuronDB.',
}

const tableOfContents: TocItem[] = [
  { id: 'overview', title: 'Overview' },
  { id: 'pca', title: 'PCA (Principal Component Analysis)' },
  { id: 'pca-whitening', title: 'PCA Whitening' },
  { id: 'benefits', title: 'Benefits' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/ml/gradient-boosting',
  label: 'Gradient Boosting',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/ml/quality-metrics',
  label: 'Quality Metrics',
}

export default function DimensionalityReductionPage() {
  return (
    <PostgresDocsLayout
      title="Dimensionality Reduction"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="overview">
        <h2>Overview</h2>
        <p>Reduce vector dimensions while preserving important information using PCA and whitening.</p>
      </section>

      <section id="pca">
        <h2>PCA (Principal Component Analysis)</h2>
        <p>Reduce dimensions while preserving variance:</p>
        <SqlCodeBlock
          title="PCA transformation"
          code={`-- PCA transformation
SELECT pca_transform(
    'data_table',
    'features',
    128,  -- target dimensions
    'pca_model'
);

-- Apply PCA to new data
SELECT pca_apply(features, 'pca_model') AS reduced_features
FROM test_table;`}
        />
      </section>

      <section id="pca-whitening">
        <h2>PCA Whitening</h2>
        <p>Standardize variance across components:</p>
        <SqlCodeBlock
          title="PCA with whitening"
          code={`-- PCA with whitening
SELECT pca_whiten(
    'data_table',
    'features',
    128,
    'pca_whitened_model'
);`}
        />
      </section>

      <section id="benefits">
        <h2>Benefits</h2>
        <ul>
          <li>Reduce storage requirements</li>
          <li>Speed up training and inference</li>
          <li>Remove noise and redundant information</li>
          <li>Visualize high-dimensional data</li>
        </ul>
      </section>

      <section>
        <h2>Learn More</h2>
        <p>
          For detailed documentation on PCA, whitening, choosing dimensions, and inverse transformation, visit:{' '}
          <a href="https://www.pgelephant.com/docs/neurondb/ml/dimensionality-reduction" target="_blank" rel="noopener noreferrer">
            Dimensionality Reduction Documentation
          </a>
        </p>
      </section>

      <section>
        <h2>Related Topics</h2>
        <ul>
          <li><a href="/docs/neurondb/ml/clustering">Clustering</a> - Apply clustering after reduction</li>
          <li><a href="/docs/neurondb/ml/quality-metrics">Quality Metrics</a> - Evaluate reduction quality</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}

