import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'NeuronDB · Unified ML API (train, predict, deploy)',
  description: 'PostgresML-compatible unified interface: neurondb.train(), neurondb.predict(), neurondb.deploy().',
}

const tableOfContents: TocItem[] = [
  { id: 'create-dataset', title: 'Create Training Dataset' },
  { id: 'train', title: 'Train Multiple Models' },
  { id: 'predict', title: 'Make Predictions' },
  { id: 'deploy', title: 'Deploy Models' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/ml/svm',
  label: 'Support Vector Machines',
}

const nextLink: NavLink | undefined = undefined

export default function Page() {
  return (
    <PostgresDocsLayout
      title="Unified ML API"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="create-dataset">
        <h2>Create Training Dataset</h2>
        <p>First, create a classification dataset with features and labels:</p>
        <SqlCodeBlock
          title="Create training data"
          code={`-- Create training data: 10,000 transactions
CREATE TEMP TABLE unified_train_data AS
SELECT 
    i as transaction_id,
    ARRAY[
        (random() * 100)::real,   -- Feature 1: Transaction amount
        (random() * 50)::real,    -- Feature 2: Account age
        (random() * 10)::real     -- Feature 3: Location risk score
    ]::real[] as features,
    CASE WHEN random() > 0.7 THEN 1 ELSE 0 END as is_fraud
FROM generate_series(1, 10000) i;`}
        />
      </section>

      <section id="train">
        <h2>Train Multiple Models</h2>
        <p>Use the unified <code>neurondb.train()</code> function to train different algorithms:</p>

        <h3>Linear Regression</h3>
        <SqlCodeBlock
          title="Train linear regression"
          code={`SELECT neurondb.train(
    'fraud_detection',           -- Project name
    'linear_regression',         -- Algorithm
    'unified_train_data',        -- Training table
    'is_fraud'                   -- Target column
) as model_id;`}
        />

        <h3>Logistic Regression</h3>
        <SqlCodeBlock
          title="Train logistic regression"
          code={`SELECT neurondb.train(
    'fraud_detection',           -- Project name
    'logistic_regression',       -- Algorithm
    'unified_train_data',        -- Training table
    'is_fraud'                   -- Target column
) as model_id;`}
        />

        <h3>Random Forest with Hyperparameters</h3>
        <SqlCodeBlock
          title="Train random forest"
          code={`SELECT neurondb.train(
    'fraud_detection',           -- Project name
    'random_forest',             -- Algorithm
    'unified_train_data',        -- Training table
    'is_fraud',                  -- Target column
    NULL,                        -- Feature columns (NULL = use all)
    '{
      "n_trees": 20, 
      "max_depth": 8, 
      "min_samples": 50
    }'::jsonb                    -- Hyperparameters
) as model_id;`}
        />
      </section>

      <section id="predict">
        <h2>Make Predictions</h2>
        <p>Use <code>neurondb.predict()</code> to make predictions with trained models:</p>
        <SqlCodeBlock
          title="Make predictions"
          code={`SELECT neurondb.predict(
    'fraud_detection',           -- Project name
    'random_forest',             -- Algorithm
    features                     -- Input features
) as prediction
FROM test_data;`}
        />
      </section>

      <section id="deploy">
        <h2>Deploy Models</h2>
        <p>Deploy models for production use:</p>
        <SqlCodeBlock
          title="Deploy model"
          code={`SELECT neurondb.deploy(
    'fraud_detection',           -- Project name
    'random_forest',             -- Algorithm
    'production'                 -- Environment
) as deployment_id;`}
        />
      </section>

      <section>
        <h2>Next Steps</h2>
        <ul>
          <li><a href="/docs/neurondb/ml/model-management">Model Management</a> - Version and deploy models</li>
          <li><a href="/docs/neurondb/ml/hyperparameter-tuning">Hyperparameter Tuning</a> - Optimize model parameters</li>
          <li><a href="/docs/neurondb/ml">ML Overview</a> - Complete ML documentation</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}
