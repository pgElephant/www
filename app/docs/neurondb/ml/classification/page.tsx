import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'NeuronDB · Classification (Logistic, KNN, SVM, Trees, RF, Naive Bayes)',
  description: 'Binary and multi-class classification in PostgreSQL using NeuronDB. Train, evaluate, and deploy models entirely in SQL.',
}

const tableOfContents: TocItem[] = [
  { id: 'logistic-regression', title: 'Logistic Regression' },
  { id: 'random-forest', title: 'Random Forest' },
  { id: 'knn', title: 'K-Nearest Neighbors' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/ml/clustering',
  label: 'Clustering',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/ml/regression',
  label: 'Regression',
}

export default function Page() {
  return (
    <PostgresDocsLayout
      title="Classification Algorithms"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="logistic-regression">
        <h2>Logistic Regression</h2>
        <p>Binary classification using logistic regression with gradient descent.</p>

        <h3>Train Logistic Regression</h3>
        <SqlCodeBlock
          title="Train model"
          code={`-- Train with gradient descent
SELECT train_logistic_regression(
    'logistic_train',    -- Training table
    'features',          -- Feature column
    'label',             -- Target column
    500,                 -- Max iterations
    0.01,                -- Learning rate
    0.01                 -- Regularization (L2 penalty)
) AS coefficients;`}
        />

        <h3>Evaluate Model</h3>
        <SqlCodeBlock
          title="Evaluate on test data"
          code={`-- Evaluate on test data with threshold = 0.5
SELECT evaluate_logistic_regression(
    'logistic_test',     -- Test table
    'features',          -- Feature column
    'label',             -- Target column
    :coefficients,       -- Model coefficients
    0.5                  -- Classification threshold
) AS test_metrics;`}
        />
      </section>

      <section id="random-forest">
        <h2>Random Forest</h2>
        <p>Ensemble method using multiple decision trees for robust classification.</p>
        <SqlCodeBlock
          title="Train Random Forest"
          code={`SELECT train_random_forest_classifier(
    'training_data',     -- Training table
    'features',          -- Feature column
    'label',             -- Target column
    100,                 -- Number of trees
    10                   -- Max depth
) AS model_id;`}
        />
      </section>

      <section id="knn">
        <h2>K-Nearest Neighbors</h2>
        <p>Instance-based learning that classifies based on nearest neighbors.</p>
        <SqlCodeBlock
          title="KNN classification"
          code={`SELECT predict_knn(
    'training_data',     -- Training table
    'features',          -- Feature column
    'label',             -- Target column
    query_features,      -- Query vector
    5                    -- K neighbors
) AS predicted_label;`}
        />
      </section>

      <section>
        <h2>Next Steps</h2>
        <ul>
          <li><a href="/docs/neurondb/ml/regression">Regression</a> - Predict continuous values</li>
          <li><a href="/docs/neurondb/ml/svm">Support Vector Machines</a> - SVM classifiers</li>
          <li><a href="/docs/neurondb/ml/model-management">Model Management</a> - Deploy and version models</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}
