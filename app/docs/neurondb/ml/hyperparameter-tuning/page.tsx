import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'NeuronDB · Hyperparameter Tuning',
  description: 'Compare grid search, random search, and Bayesian optimization strategies in-database.',
}

const tableOfContents: TocItem[] = [
  { id: 'grid-search', title: 'Grid Search' },
  { id: 'random-search', title: 'Random Search' },
  { id: 'bayesian-optimization', title: 'Bayesian Optimization' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/ml/feature-store',
  label: 'Feature Store',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/ml/gpu',
  label: 'GPU Acceleration',
}

export default function Page() {
  return (
    <PostgresDocsLayout
      title="Hyperparameter Tuning"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="grid-search">
        <h2>Grid Search</h2>
        <p>Grid search tests <strong>all combinations</strong> of specified parameter values. Best for small parameter spaces.</p>
        <SqlCodeBlock
          title="Grid search example"
          code={`-- Grid search for Random Forest
-- Parameter grid: n_trees × max_depth
SELECT neurondb.grid_search(
    'random_forest',
    'training_data',
    'features',
    'label',
    jsonb_build_object(
        'n_trees', ARRAY[10, 20, 50],
        'max_depth', ARRAY[5, 10, 15]
    )
) as best_params;

-- Tests 9 combinations (3 × 3)`}
        />
      </section>

      <section id="random-search">
        <h2>Random Search</h2>
        <p>Random search samples parameter values from distributions. More efficient for large parameter spaces.</p>
        <SqlCodeBlock
          title="Random search example"
          code={`-- Random search for SVM
SELECT neurondb.random_search(
    'svm',
    'training_data',
    'features',
    'label',
    jsonb_build_object(
        'C', jsonb_build_object('type', 'uniform', 'low', 0.1, 'high', 10.0),
        'gamma', jsonb_build_object('type', 'log_uniform', 'low', 0.001, 'high', 1.0)
    ),
    10  -- Number of trials
) as best_params;`}
        />
      </section>

      <section id="bayesian-optimization">
        <h2>Bayesian Optimization</h2>
        <p>Uses probabilistic models to guide search toward promising parameter regions.</p>
        <SqlCodeBlock
          title="Bayesian optimization"
          code={`SELECT neurondb.bayesian_optimization(
    'random_forest',
    'training_data',
    'features',
    'label',
    jsonb_build_object(
        'n_trees', jsonb_build_object('low', 10, 'high', 100),
        'max_depth', jsonb_build_object('low', 5, 'high', 20)
    ),
    20  -- Number of iterations
) as best_params;`}
        />
      </section>

      <section>
        <h2>Next Steps</h2>
        <ul>
          <li><a href="/docs/neurondb/ml/gpu">GPU Acceleration</a> - Speed up training</li>
          <li><a href="/docs/neurondb/ml/unified-api">Unified ML API</a> - Consistent training interface</li>
          <li><a href="/docs/neurondb/performance">Performance</a> - Optimize model performance</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}
