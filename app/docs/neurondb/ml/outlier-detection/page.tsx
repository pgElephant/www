import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'NeuronDB · Outlier Detection (Z-score, Isolation Forest)',
  description: 'Detect anomalies and outliers in your data using statistical methods like Z-score analysis.',
}

const tableOfContents: TocItem[] = [
  { id: 'z-score', title: 'Z-score Outlier Detection' },
  { id: 'isolation-forest', title: 'Isolation Forest' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/ml/text-ml',
  label: 'Text ML',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/ml/svm',
  label: 'Support Vector Machines',
}

export default function Page() {
  return (
    <PostgresDocsLayout
      title="Outlier Detection"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="z-score">
        <h2>Z-score Outlier Detection</h2>
        <p>Z-score identifies outliers by measuring how many standard deviations a data point is from the mean. Threshold of 3.0 means flag values more than 3 standard deviations away.</p>
        <SqlCodeBlock
          title="Detect outliers"
          code={`-- Detect outliers using Z-score method
SELECT detect_outliers_zscore(
    'train_data',        -- Table name
    'features',          -- Column with feature vectors
    3.0,                 -- Threshold (standard deviations)
    'zscore'             -- Method
) as outliers;`}
        />
      </section>

      <section id="isolation-forest">
        <h2>Isolation Forest</h2>
        <p>Isolation Forest detects outliers by isolating anomalies in random subspaces.</p>
        <SqlCodeBlock
          title="Isolation forest"
          code={`SELECT detect_outliers_isolation_forest(
    'train_data',
    'features',
    100  -- n_estimators
) as outliers;`}
        />
      </section>

      <section>
        <h2>Next Steps</h2>
        <ul>
          <li><a href="/docs/neurondb/ml/svm">Support Vector Machines</a> - SVM classifiers</li>
          <li><a href="/docs/neurondb/ml/unified-api">Unified ML API</a> - Consistent training interface</li>
          <li><a href="/docs/neurondb/analytics">Analytics Suite</a> - Complete ML analytics</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}
