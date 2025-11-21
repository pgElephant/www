import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'NeuronDB · Support Vector Machines (SVM)',
  description: 'Train SVM classifiers with maximum margin hyperplanes using SMO algorithm in SQL.',
}

const tableOfContents: TocItem[] = [
  { id: 'prepare-data', title: 'Prepare Classification Dataset' },
  { id: 'train-svm', title: 'Train Linear SVM Classifier' },
  { id: 'evaluate', title: 'Evaluate Model' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/ml/outlier-detection',
  label: 'Outlier Detection',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/ml/unified-api',
  label: 'Unified ML API',
}

export default function Page() {
  return (
    <PostgresDocsLayout
      title="Support Vector Machines"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="prepare-data">
        <h2>Prepare Classification Dataset</h2>
        <p>SVM works best with smaller, well-balanced datasets. We limit to 20,000 samples for computational efficiency.</p>
        <SqlCodeBlock
          title="Create SVM training data"
          code={`-- Prepare classification dataset for SVM
CREATE TEMP TABLE svm_data AS
SELECT 
    transaction_id,
    features,
    CASE WHEN is_fraud THEN 1 ELSE 0 END as label  -- Binary labels: 0 or 1
FROM transactions
WHERE features IS NOT NULL
LIMIT 20000;  -- Smaller dataset for SVM`}
        />
      </section>

      <section id="train-svm">
        <h2>Train Linear SVM Classifier</h2>
        <p>Train SVM using SMO algorithm. Returns support vectors (alpha coefficients) that define the maximum margin hyperplane.</p>
        <SqlCodeBlock
          title="Train SVM"
          code={`SELECT train_svm(
    'svm_train',         -- Training table
    'features',          -- Feature column
    'label',             -- Target column
    0.1,                 -- C (regularization parameter)
    1000                 -- Max iterations
) AS support_vectors;`}
        />
      </section>

      <section id="evaluate">
        <h2>Evaluate Model</h2>
        <p>Evaluate SVM performance on test data.</p>
        <SqlCodeBlock
          title="Evaluate SVM"
          code={`SELECT evaluate_svm(
    'svm_test',
    'features',
    'label',
    :support_vectors
) AS metrics;`}
        />
      </section>

      <section>
        <h2>Next Steps</h2>
        <ul>
          <li><a href="/docs/neurondb/ml/unified-api">Unified ML API</a> - Consistent training interface</li>
          <li><a href="/docs/neurondb/ml/classification">Classification</a> - Other classification algorithms</li>
          <li><a href="/docs/neurondb/ml/model-management">Model Management</a> - Deploy SVM models</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}
