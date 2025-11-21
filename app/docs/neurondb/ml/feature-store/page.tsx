import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'NeuronDB · Feature Store',
  description: 'Manage features, definitions, and serving within PostgreSQL using NeuronDB feature store primitives.',
}

const tableOfContents: TocItem[] = [
  { id: 'create-store', title: 'Create Feature Store' },
  { id: 'register-features', title: 'Register Features' },
  { id: 'serve-features', title: 'Serve Features' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/ml/model-management',
  label: 'Model Management',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/ml/hyperparameter-tuning',
  label: 'Hyperparameter Tuning',
}

export default function Page() {
  return (
    <PostgresDocsLayout
      title="Feature Store"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="create-store">
        <h2>Create Feature Store</h2>
        <p>Register features, apply transformations, and serve consistent features for training and inference.</p>

        <h3>Initialize Feature Store</h3>
        <SqlCodeBlock
          title="Create feature store"
          code={`-- Create feature store for user features
SELECT neurondb.create_feature_store(
    'user_features',     -- Store name
    'users',             -- Entity table
    'user_id'            -- Entity key column
) as store_id;`}
        />
      </section>

      <section id="register-features">
        <h2>Register Features</h2>
        <p>Register feature definitions including raw features and engineered features.</p>
        <SqlCodeBlock
          title="Register features"
          code={`-- Register raw features
SELECT neurondb.register_feature(
    1,                   -- store_id
    'total_spent',       -- feature name
    'numeric',           -- data type
    'total_spent'        -- SQL expression
) as feature_id;

-- Register engineered features
SELECT neurondb.register_feature(
    1,
    'avg_transaction_value',
    'numeric',
    'total_spent / NULLIF(num_transactions, 0)'
) as feature_id;`}
        />
      </section>

      <section id="serve-features">
        <h2>Serve Features</h2>
        <p>Retrieve features for training or inference.</p>
        <SqlCodeBlock
          title="Serve features"
          code={`SELECT neurondb.serve_features(
    'user_features',     -- Store name
    ARRAY[1, 2, 3],      -- Entity IDs
    ARRAY['total_spent', 'avg_transaction_value']  -- Feature names
) as features;`}
        />
      </section>

      <section>
        <h2>Next Steps</h2>
        <ul>
          <li><a href="/docs/neurondb/ml/hyperparameter-tuning">Hyperparameter Tuning</a> - Optimize model parameters</li>
          <li><a href="/docs/neurondb/ml/unified-api">Unified ML API</a> - Consistent training interface</li>
          <li><a href="/docs/neurondb/ml/model-management">Model Management</a> - Deploy models</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}
