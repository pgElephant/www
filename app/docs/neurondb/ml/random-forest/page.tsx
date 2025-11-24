import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'Random Forest in NeurondB | AI PostgreSQL ML Classification & Regression',
  description: 'Train Random Forest models in NeurondB (AI PostgreSQL extension) for classification and regression. Complete guide with SQL examples, hyperparameters, prediction, and evaluation. Alternative to pgml and PostgreSQL.ai for machine learning in PostgreSQL.',
  keywords: [
    'Random Forest NeurondB',
    'PostgreSQL machine learning',
    'AI PostgreSQL ML',
    'PostgreSQL.ai ML',
    'pgml Random Forest',
    'Random Forest classification',
    'Random Forest regression',
    'ensemble learning PostgreSQL',
    'ML in SQL',
    'NeurondB train function',
    'NeurondB predict',
    'decision trees PostgreSQL',
    'GPU machine learning',
    'PostgreSQL AI ML',
    'Postgres machine learning'
  ].join(', '),
  alternates: {
    canonical: 'https://www.pgelephant.com/docs/neurondb/ml/random-forest',
  },
  openGraph: {
    title: 'Random Forest in NeurondB | ML Classification & Regression',
    description: 'Train Random Forest models in PostgreSQL with NeurondB. Complete guide with SQL examples and GPU acceleration.',
    type: 'article',
    url: 'https://www.pgelephant.com/docs/neurondb/ml/random-forest',
  },
}

const tableOfContents: TocItem[] = [
  { id: 'overview', title: 'Overview' },
  { id: 'classification', title: 'Classification' },
  { id: 'regression', title: 'Regression' },
  { id: 'prediction', title: 'Prediction' },
  { id: 'evaluation', title: 'Model Evaluation' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/ml/classification',
  label: 'Classification',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/ml/gradient-boosting',
  label: 'Gradient Boosting',
}

export default function RandomForestPage() {
  return (
    <PostgresDocsLayout
      title="Random Forest"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="overview">
        <h2>Overview</h2>
        <p>
          Random Forest is an ensemble learning method for classification and regression with GPU acceleration support.
        </p>
      </section>

      <section id="classification">
        <h2>Classification</h2>
        <p>Train a Random Forest classifier using the unified ML API. The function returns a model_id that you can use for predictions and evaluation.</p>
        <SqlCodeBlock
          title="Train Random Forest classifier"
          code={`-- Train Random Forest classifier
-- Returns: model_id (integer)
CREATE TEMP TABLE rf_model AS
SELECT neurondb.train(
    'default',              -- project name
    'random_forest',        -- algorithm
    'training_table',       -- source table name
    'label',                -- target column name
    ARRAY['features'],      -- feature column names
    '{"n_trees": 3}'::jsonb -- hyperparameters
)::integer AS model_id;

-- View the model_id
SELECT model_id FROM rf_model;`}
        />
        <p><strong>Function Signature:</strong></p>
        <pre><code>neurondb.train(
    project TEXT,           -- ML project name (e.g., 'default')
    algorithm TEXT,         -- Algorithm name: 'random_forest'
    table_name TEXT,        -- Training data table name
    target_column TEXT,    -- Target/label column name
    feature_columns TEXT[], -- Array of feature column names
    hyperparameters JSONB  -- Algorithm-specific parameters
) RETURNS INTEGER          -- Returns model_id</code></pre>
        <p><strong>Hyperparameters:</strong></p>
        <ul>
          <li><code>n_trees</code> (integer): Number of trees in the forest. Default: 100. More trees = better accuracy but slower training.</li>
          <li><code>max_depth</code> (integer): Maximum depth of each tree. Default: unlimited. Prevents overfitting.</li>
          <li><code>min_samples_split</code> (integer): Minimum samples required to split a node. Default: 2.</li>
          <li><code>min_samples_leaf</code> (integer): Minimum samples required in a leaf node. Default: 1.</li>
        </ul>
      </section>

      <section id="regression">
        <h2>Regression</h2>
        <p>Random Forest automatically detects regression vs classification based on the target column data type. For regression, use a numeric target column.</p>
        <SqlCodeBlock
          title="Train Random Forest regressor"
          code={`-- Train Random Forest regressor (target column is numeric)
CREATE TEMP TABLE rf_model AS
SELECT neurondb.train(
    'default',
    'random_forest',
    'training_table',
    'target',               -- Numeric target column
    ARRAY['features'],
    '{"n_trees": 3}'::jsonb
)::integer AS model_id;`}
        />
      </section>

      <section id="prediction">
        <h2>Prediction</h2>
        <p>Use the trained model for predictions. The <code>neurondb.predict</code> function takes a model_id and feature vector, returning a prediction value.</p>
        <SqlCodeBlock
          title="Make predictions"
          code={`-- Single prediction
SELECT neurondb.predict(
    (SELECT model_id FROM rf_model),
    features  -- vector type feature column
) AS prediction
FROM test_table;

-- Batch predictions with model lookup
SELECT 
    id,
    features,
    neurondb.predict(
        (SELECT model_id FROM rf_model),
        features
    ) AS predicted_label
FROM test_table
LIMIT 100;`}
        />
        <p><strong>Function Signature:</strong></p>
        <pre><code>neurondb.predict(
    model_id INTEGER,  -- Model ID from neurondb.train()
    features VECTOR    -- Feature vector for prediction
) RETURNS NUMERIC      -- Prediction value (class or regression)</code></pre>
      </section>

      <section id="evaluation">
        <h2>Model Evaluation</h2>
        <p>Evaluate your trained model on test data to get accuracy, precision, recall, and F1 score metrics.</p>
        <SqlCodeBlock
          title="Evaluate model"
          code={`-- Evaluate model and get metrics
DROP TABLE IF EXISTS rf_metrics_temp;
CREATE TEMP TABLE rf_metrics_temp (metrics jsonb);

DO $$
DECLARE
    mid integer;
    metrics_result jsonb;
BEGIN
    -- Get model_id
    SELECT model_id INTO mid FROM rf_model LIMIT 1;
    
    -- Evaluate model
    metrics_result := neurondb.evaluate(
        mid,                -- model_id
        'test_table',       -- test data table
        'features',         -- feature column
        'label'             -- target column
    );
    
    INSERT INTO rf_metrics_temp VALUES (metrics_result);
END $$;

-- Display metrics
SELECT
    format('%-15s', 'Accuracy') AS metric,
    CASE WHEN (m.metrics::jsonb ? 'accuracy')
        THEN ROUND((m.metrics::jsonb ->> 'accuracy')::numeric, 4)
        ELSE NULL END AS value
FROM rf_metrics_temp m
UNION ALL
SELECT format('%-15s', 'Precision'),
    CASE WHEN (m.metrics::jsonb ? 'precision')
        THEN ROUND((m.metrics::jsonb ->> 'precision')::numeric, 4)
        ELSE NULL END
FROM rf_metrics_temp m
UNION ALL
SELECT format('%-15s', 'Recall'),
    CASE WHEN (m.metrics::jsonb ? 'recall')
        THEN ROUND((m.metrics::jsonb ->> 'recall')::numeric, 4)
        ELSE NULL END
FROM rf_metrics_temp m
UNION ALL
SELECT format('%-15s', 'F1 Score'),
    CASE WHEN (m.metrics::jsonb ? 'f1_score')
        THEN ROUND((m.metrics::jsonb ->> 'f1_score')::numeric, 4)
        ELSE NULL END
FROM rf_metrics_temp m;`}
        />
        <p><strong>Function Signature:</strong></p>
        <pre><code>neurondb.evaluate(
    model_id INTEGER,      -- Model ID from neurondb.train()
    table_name TEXT,       -- Test data table name
    feature_column TEXT,   -- Feature column name
    target_column TEXT    -- Target column name
) RETURNS JSONB           -- Returns metrics as JSONB</code></pre>
        <p><strong>Returned Metrics (JSONB):</strong></p>
        <ul>
          <li><code>accuracy</code>: Overall classification accuracy (0-1)</li>
          <li><code>precision</code>: Precision score (0-1)</li>
          <li><code>recall</code>: Recall score (0-1)</li>
          <li><code>f1_score</code>: F1 harmonic mean (0-1)</li>
          <li>For regression: <code>mse</code>, <code>mae</code>, <code>rmse</code></li>
        </ul>
      </section>

      <section>
        <h2>Learn More</h2>
        <p>
          For detailed documentation on Random Forest parameters, hyperparameter tuning, feature importance, and GPU optimization, visit:{' '}
          <a href="https://www.pgelephant.com/docs/neurondb/ml/random-forest" target="_blank" rel="noopener noreferrer">
            Random Forest Documentation
          </a>
        </p>
      </section>

      <section>
        <h2>Related Topics</h2>
        <ul>
          <li><a href="/docs/neurondb/ml/classification">Classification</a> - Other classification algorithms</li>
          <li><a href="/docs/neurondb/ml/model-management">Model Management</a> - Managing trained models</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}

