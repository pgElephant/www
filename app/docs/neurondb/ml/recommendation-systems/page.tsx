import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'Recommendation Systems | NeuronDB ML Algorithms',
  description: 'Build recommendation systems using collaborative filtering and ranking in NeuronDB.',
}

const tableOfContents: TocItem[] = [
  { id: 'overview', title: 'Overview' },
  { id: 'collaborative-filtering', title: 'Collaborative Filtering' },
  { id: 'generate-recommendations', title: 'Generate Recommendations' },
  { id: 'evaluation', title: 'Model Evaluation' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/ml/time-series',
  label: 'Time Series',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/ml/embeddings',
  label: 'Embeddings',
}

export default function RecommendationSystemsPage() {
  return (
    <PostgresDocsLayout
      title="Recommendation Systems"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="overview">
        <h2>Overview</h2>
        <p>Build recommendation systems using collaborative filtering and ranking.</p>
      </section>

      <section id="collaborative-filtering">
        <h2>Collaborative Filtering</h2>
        <p>Collaborative filtering learns user preferences from historical ratings to predict ratings for unseen user-item pairs. NeuronDB implements Alternating Least Squares (ALS) for collaborative filtering.</p>
        
        <h3>Prepare Ratings Data</h3>
        <p>Your ratings table should have user_id, item_id, and rating columns:</p>
        <SqlCodeBlock
          title="Create ratings table"
          code={`-- Create ratings table
CREATE TABLE cf_ratings (
    user_id INTEGER,
    item_id INTEGER,
    rating FLOAT4  -- Rating value (e.g., 1.0 to 5.0)
);

-- Insert sample ratings data
INSERT INTO cf_ratings (user_id, item_id, rating)
SELECT
    (random() * 99 + 1)::INTEGER as user_id,
    (random() * 49 + 1)::INTEGER as item_id,
    (random() * 4 + 1)::FLOAT4 as rating
FROM generate_series(1, 1000);

-- View data summary
SELECT
    COUNT(DISTINCT user_id) as users,
    COUNT(DISTINCT item_id) as items,
    COUNT(*) as ratings,
    AVG(rating) as avg_rating
FROM cf_ratings;`}
        />

        <h3>Train Collaborative Filtering Model</h3>
        <SqlCodeBlock
          title="Train collaborative filtering model"
          code={`-- Train collaborative filtering model
-- Returns: model_id (integer)
CREATE TEMP TABLE cf_model AS
SELECT train_collaborative_filter(
    'cf_ratings',   -- ratings table name
    'user_id',      -- user ID column name
    'item_id',      -- item ID column name
    'rating'        -- rating column name
) AS model_id;

-- View model_id
SELECT model_id FROM cf_model;`}
        />
        <p><strong>Function Signature:</strong></p>
        <pre><code>train_collaborative_filter(
    table_name TEXT,    -- Ratings table name
    user_column TEXT,   -- User ID column name
    item_column TEXT,   -- Item ID column name
    rating_column TEXT  -- Rating column name
) RETURNS INTEGER      -- Returns model_id</code></pre>
      </section>

      <section id="generate-recommendations">
        <h2>Generate Recommendations</h2>
        <p>Use the trained model to predict ratings for user-item pairs. Higher predicted ratings indicate better recommendations.</p>
        <SqlCodeBlock
          title="Predict ratings and generate recommendations"
          code={`-- Predict ratings for existing user-item pairs
SELECT
    user_id,
    item_id,
    predict_collaborative_filter(
        (SELECT model_id FROM cf_model),
        user_id,
        item_id
    ) AS predicted_rating,
    rating AS actual_rating
FROM cf_ratings
ORDER BY predicted_rating DESC
LIMIT 10;

-- Generate top recommendations for a specific user
SELECT
    item_id,
    predict_collaborative_filter(
        (SELECT model_id FROM cf_model),
        42,  -- user_id
        item_id
    ) AS predicted_rating
FROM (SELECT DISTINCT item_id FROM cf_ratings) items
ORDER BY predicted_rating DESC
LIMIT 10;`}
        />
        <p><strong>Function Signature:</strong></p>
        <pre><code>predict_collaborative_filter(
    model_id INTEGER,  -- Model ID from train_collaborative_filter()
    user_id INTEGER,  -- User ID
    item_id INTEGER   -- Item ID
) RETURNS REAL        -- Predicted rating</code></pre>
      </section>

      <section id="evaluation">
        <h2>Model Evaluation</h2>
        <p>Evaluate your collaborative filtering model to measure prediction accuracy using metrics like MSE, MAE, and RMSE.</p>
        <SqlCodeBlock
          title="Evaluate collaborative filtering model"
          code={`-- Evaluate model on test data
CREATE TEMP TABLE cf_metrics AS
SELECT evaluate_collaborative_filter_by_model_id(
    (SELECT model_id FROM cf_model),
    'cf_ratings',   -- test ratings table
    'user_id',      -- user column
    'item_id',      -- item column
    'rating'        -- rating column
) AS metrics;

-- Display evaluation metrics
SELECT
    'MSE' AS metric, 
    ROUND((metrics->>'mse')::numeric, 6)::text AS value
FROM cf_metrics
UNION ALL
SELECT 'MAE', ROUND((metrics->>'mae')::numeric, 6)::text
FROM cf_metrics
UNION ALL
SELECT 'RMSE', ROUND((metrics->>'rmse')::numeric, 6)::text
FROM cf_metrics
ORDER BY metric;`}
        />
        <p><strong>Function Signature:</strong></p>
        <pre><code>evaluate_collaborative_filter_by_model_id(
    model_id INTEGER,
    table_name TEXT,
    user_column TEXT,
    item_column TEXT,
    rating_column TEXT
) RETURNS JSONB</code></pre>
        <p><em>Returns: mse, mae, rmse</em></p>
        <p><strong>Evaluation Metrics:</strong></p>
        <ul>
          <li><code>mse</code> (Mean Squared Error): Average squared difference between predicted and actual ratings. Lower is better.</li>
          <li><code>mae</code> (Mean Absolute Error): Average absolute difference. Lower is better.</li>
          <li><code>rmse</code> (Root Mean Squared Error): Square root of MSE. Lower is better.</li>
        </ul>
      </section>

      <section>
        <h2>Learn More</h2>
        <p>
          For detailed documentation on recommendation algorithms, evaluation metrics, cold start problems, and hybrid recommendation systems, visit:{' '}
          <a href="https://pgelephant.com/neurondb/ml/recommender/" target="_blank" rel="noopener noreferrer">
            Recommendation Systems Documentation
          </a>
        </p>
      </section>

      <section>
        <h2>Related Topics</h2>
        <ul>
          <li><a href="/docs/neurondb/indexing">Vector Search</a> - Similarity-based recommendations</li>
          <li><a href="/docs/neurondb/ml/quality-metrics">Quality Metrics</a> - Evaluate recommendation quality</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}

