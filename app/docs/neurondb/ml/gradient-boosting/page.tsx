import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'Gradient Boosting in AI PostgreSQL | XGBoost, LightGBM, CatBoost in NeurondB',
  description: 'Complete guide to gradient boosting in NeurondB (AI PostgreSQL extension): XGBoost, LightGBM, and CatBoost algorithms. Alternative to PostgreSQL.ai and pgml for gradient boosting. Learn how to train, predict, and evaluate models in PostgreSQL with SQL examples and GPU acceleration.',
  keywords: [
    'XGBoost NeurondB',
    'AI PostgreSQL XGBoost',
    'PostgreSQL.ai XGBoost',
    'pgml XGBoost',
    'LightGBM PostgreSQL',
    'CatBoost SQL',
    'gradient boosting',
    'boosting algorithms',
    'XGBoost training',
    'LightGBM hyperparameters',
    'CatBoost classification',
    'ensemble learning',
    'GPU gradient boosting',
    'machine learning SQL',
    'PostgreSQL AI ML'
  ].join(', '),
  alternates: {
    canonical: 'https://www.pgelephant.com/docs/neurondb/ml/gradient-boosting',
  },
  openGraph: {
    title: 'Gradient Boosting in NeurondB | XGBoost, LightGBM, CatBoost',
    description: 'Train XGBoost, LightGBM, and CatBoost models in PostgreSQL with NeurondB. Complete guide with SQL examples and GPU support.',
    type: 'article',
    url: 'https://www.pgelephant.com/docs/neurondb/ml/gradient-boosting',
  },
}

const tableOfContents: TocItem[] = [
  { id: 'overview', title: 'Overview' },
  { id: 'xgboost', title: 'XGBoost' },
  { id: 'lightgbm', title: 'LightGBM' },
  { id: 'catboost', title: 'CatBoost' },
  { id: 'prediction', title: 'Prediction' },
  { id: 'evaluation', title: 'Model Evaluation' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/ml/random-forest',
  label: 'Random Forest',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/ml/dimensionality-reduction',
  label: 'Dimensionality Reduction',
}

export default function GradientBoostingPage() {
  return (
    <PostgresDocsLayout
      title="Gradient Boosting"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="overview">
        <h2>Overview</h2>
        <p>NeuronDB supports XGBoost, LightGBM, and CatBoost for gradient boosting.</p>
      </section>

      <section id="xgboost">
        <h2>XGBoost</h2>
        <p>XGBoost (Extreme Gradient Boosting) is a powerful gradient boosting framework. NeuronDB uses the unified ML API for XGBoost training and prediction.</p>
        
        <h3>Train XGBoost Model</h3>
        <SqlCodeBlock
          title="Train XGBoost classifier"
          code={`-- Train XGBoost classifier using unified API
CREATE TEMP TABLE xgb_model AS
SELECT neurondb.train(
    'default',              -- project name
    'xgboost',              -- algorithm
    'training_table',       -- source table
    'label',                -- target column (integer for classification)
    ARRAY['features'],      -- feature columns
    '{"max_depth": 6, "n_estimators": 100}'::jsonb  -- hyperparameters
)::integer AS model_id;

-- For regression, use numeric target column
CREATE TEMP TABLE xgb_reg_model AS
SELECT neurondb.train(
    'default',
    'xgboost',
    'training_table',
    'target',               -- numeric target column
    ARRAY['features'],
    '{}'::jsonb             -- use default hyperparameters
)::integer AS model_id;`}
        />
        <p><strong>Function Signature:</strong></p>
        <pre><code>neurondb.train(
    project TEXT,
    algorithm TEXT,        -- 'xgboost'
    table_name TEXT,
    target_column TEXT,
    feature_columns TEXT[],
    hyperparameters JSONB
) RETURNS INTEGER         -- Returns model_id</code></pre>
        <p><strong>Common XGBoost Hyperparameters:</strong></p>
        <ul>
          <li><code>max_depth</code> (integer): Maximum tree depth. Default: 6. Range: 1-20.</li>
          <li><code>n_estimators</code> (integer): Number of boosting rounds. Default: 100.</li>
          <li><code>learning_rate</code> (float): Step size shrinkage. Default: 0.1. Range: 0.01-1.0.</li>
          <li><code>subsample</code> (float): Fraction of samples per tree. Default: 1.0. Range: 0.1-1.0.</li>
          <li><code>colsample_bytree</code> (float): Fraction of features per tree. Default: 1.0.</li>
        </ul>
      </section>

      <section id="lightgbm">
        <h2>LightGBM</h2>
        <p>LightGBM is a fast, distributed gradient boosting framework optimized for efficiency and accuracy.</p>
        <SqlCodeBlock
          title="Train LightGBM model"
          code={`-- Train LightGBM classifier
CREATE TEMP TABLE lgbm_model AS
SELECT neurondb.train(
    'default',
    'lightgbm',            -- algorithm
    'training_table',
    'label',
    ARRAY['features'],
    '{"num_leaves": 31, "learning_rate": 0.1}'::jsonb
)::integer AS model_id;`}
        />
        <p><strong>Common LightGBM Hyperparameters:</strong></p>
        <ul>
          <li><code>num_leaves</code> (integer): Maximum tree leaves. Default: 31.</li>
          <li><code>learning_rate</code> (float): Boosting learning rate. Default: 0.1.</li>
          <li><code>feature_fraction</code> (float): Random feature subset ratio. Default: 1.0.</li>
          <li><code>bagging_fraction</code> (float): Random data subset ratio. Default: 1.0.</li>
        </ul>
      </section>

      <section id="catboost">
        <h2>CatBoost</h2>
        <p>CatBoost handles categorical features automatically and is robust to overfitting.</p>
        <SqlCodeBlock
          title="Train CatBoost model"
          code={`-- Train CatBoost classifier
CREATE TEMP TABLE catboost_model AS
SELECT neurondb.train(
    'default',
    'catboost',            -- algorithm
    'training_table',
    'label',
    ARRAY['features'],
    '{}'::jsonb            -- use defaults
)::integer AS model_id;`}
        />
      </section>

      <section id="prediction">
        <h2>Prediction</h2>
        <p>Use the unified <code>neurondb.predict</code> function for all gradient boosting models:</p>
        <SqlCodeBlock
          title="Make predictions"
          code={`-- Predict with trained XGBoost model
SELECT 
    id,
    neurondb.predict(
        (SELECT model_id FROM xgb_model),
        features
    ) AS prediction
FROM test_table
LIMIT 10;

-- Get model from catalog if needed
SELECT 
    id,
    neurondb.predict(
        (SELECT model_id FROM neurondb.ml_models 
         WHERE algorithm = 'xgboost' 
         ORDER BY model_id DESC LIMIT 1),
        features
    ) AS prediction
FROM test_table;`}
        />
        <p><strong>Function Signature:</strong></p>
        <pre><code>neurondb.predict(
    model_id INTEGER,  -- Model ID from neurondb.train()
    features VECTOR    -- Feature vector
) RETURNS NUMERIC      -- Prediction value</code></pre>
      </section>

      <section id="evaluation">
        <h2>Model Evaluation</h2>
        <p>Evaluate gradient boosting models using the unified evaluation API:</p>
        <SqlCodeBlock
          title="Evaluate model"
          code={`-- Evaluate XGBoost model
DO $$
DECLARE
    mid integer;
    metrics_result jsonb;
BEGIN
    -- Get model_id
    SELECT model_id INTO mid FROM xgb_model LIMIT 1;
    
    -- Evaluate
    metrics_result := neurondb.evaluate(
        mid,
        'test_table',
        'features',
        'label'
    );
    
    -- Display metrics
    RAISE NOTICE 'Accuracy: %', metrics_result->>'accuracy';
    RAISE NOTICE 'Precision: %', metrics_result->>'precision';
    RAISE NOTICE 'Recall: %', metrics_result->>'recall';
    RAISE NOTICE 'F1 Score: %', metrics_result->>'f1_score';
END $$;`}
        />
      </section>

      <section>
        <h2>Learn More</h2>
        <p>
          For detailed documentation on gradient boosting algorithms, hyperparameter tuning, feature importance, and model comparison, visit:{' '}
          <a href="https://www.pgelephant.com/docs/neurondb/ml/gradient-boosting" target="_blank" rel="noopener noreferrer">
            Gradient Boosting Documentation
          </a>
        </p>
      </section>

      <section>
        <h2>Related Topics</h2>
        <ul>
          <li><a href="/docs/neurondb/ml/random-forest">Random Forest</a> - Ensemble methods</li>
          <li><a href="/docs/neurondb/ml/classification">Classification</a> - Classification algorithms</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}

