import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'NeuronDB · Regression (Linear, Ridge, Lasso)',
  description: 'Train and evaluate regression models in PostgreSQL using NeuronDB: Linear Regression and regularized (Ridge/Lasso) variants.',
}

const tableOfContents: TocItem[] = [
  { id: 'linear-regression', title: 'Linear Regression' },
  { id: 'ridge-regression', title: 'Ridge Regression' },
  { id: 'lasso-regression', title: 'Lasso Regression' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/ml/classification',
  label: 'Classification',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/ml/rag',
  label: 'RAG Pipeline',
}

export default function Page() {
  return (
    <PostgresDocsLayout
      title="Regression Algorithms"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="linear-regression">
        <h2>Linear Regression</h2>
        <p>Predict continuous values using supervised learning. Evaluate with R², MSE, MAE, and RMSE metrics.</p>

        <h3>Train Linear Regression</h3>
        <SqlCodeBlock
          title="Train model"
          code={`-- Train linear regression model
SELECT train_linear_regression(
    'linear_train',      -- Training table
    'features',          -- Feature column
    'amount'             -- Target column (continuous)
) AS coefficients;`}
        />

        <h3>Evaluate Model</h3>
        <SqlCodeBlock
          title="Evaluate on test data"
          code={`-- Evaluate on test data
SELECT evaluate_linear_regression(
    'linear_test',       -- Test table
    'features',          -- Feature column
    'amount',            -- Target column
    :coefficients        -- Model coefficients
) AS test_metrics;

-- Returns array: [R², MSE, MAE, RMSE]`}
        />
      </section>

      <section id="ridge-regression">
        <h2>Ridge Regression</h2>
        <p>Linear regression with L2 regularization to prevent overfitting.</p>
        <SqlCodeBlock
          title="Ridge regression"
          code={`SELECT train_ridge_regression(
    'training_data',
    'features',
    'target',
    0.1  -- Alpha (regularization strength)
) AS coefficients;`}
        />
      </section>

      <section id="lasso-regression">
        <h2>Lasso Regression</h2>
        <p>Linear regression with L1 regularization for feature selection.</p>
        <SqlCodeBlock
          title="Lasso regression"
          code={`SELECT train_lasso_regression(
    'training_data',
    'features',
    'target',
    0.1  -- Alpha (regularization strength)
) AS coefficients;`}
        />
      </section>

      <section>
        <h2>Next Steps</h2>
        <ul>
          <li><a href="/docs/neurondb/ml/rag">RAG Pipeline</a> - Build RAG applications</li>
          <li><a href="/docs/neurondb/ml/hyperparameter-tuning">Hyperparameter Tuning</a> - Optimize model parameters</li>
          <li><a href="/docs/neurondb/ml/model-management">Model Management</a> - Deploy models</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}
