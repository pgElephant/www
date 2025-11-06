export const metadata = {
  title: 'NeuronDB · Unified ML API (train, predict, deploy)',
  description: 'PostgresML-compatible unified interface: neurondb.train(), neurondb.predict(), neurondb.deploy().' 
}

import React from 'react'
import Link from 'next/link'
import { Merge, ArrowRight, Database, Activity, TrendingUp, Zap, BookOpen, Code } from 'lucide-react'

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <Link href="/docs/neurondb/ml" className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-200 transition-colors">
            <ArrowRight className="w-4 h-4 rotate-180" /> Back to Machine Learning
          </Link>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-transparent bg-clip-text flex items-center gap-3">
          <Merge className="w-10 h-10 text-cyan-400" /> Unified ML API
        </h1>
        
        <p className="text-lg text-gray-300 mb-8">
          The unified API provides a PostgresML-compatible training interface that works with all NeuronDB algorithms. This allows you to switch between different models and algorithms using a consistent API.
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Database className="w-6 h-6 text-purple-400" />
              Step 1: Create Training Dataset
            </h2>
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <p className="text-gray-300 mb-4">First, create a classification dataset with features and labels:</p>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Create training data: 10,000 transactions
DROP TABLE IF EXISTS unified_train_data CASCADE;
CREATE TEMP TABLE unified_train_data AS
SELECT 
    i as transaction_id,
    ARRAY[
        (random() * 100)::real,   -- Feature 1: Transaction amount
        (random() * 50)::real,    -- Feature 2: Account age
        (random() * 10)::real     -- Feature 3: Location risk score
    ]::real[] as features,
    CASE WHEN random() > 0.7 THEN 1 ELSE 0 END as is_fraud
FROM generate_series(1, 10000) i;`}</code>
              </pre>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Activity className="w-6 h-6 text-purple-400" />
              Step 2: Train Multiple Models with neurondb.train()
            </h2>
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <p className="text-gray-300 mb-4">Use the unified <code className="text-green-400">neurondb.train()</code> function to train different algorithms:</p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">Linear Regression</h3>
                  <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                    <code className="text-sm text-gray-300">{`SELECT neurondb.train(
    'fraud_detection',           -- Project name
    'linear_regression',         -- Algorithm
    'unified_train_data',        -- Training table
    'is_fraud'                   -- Target column
) as model_id;
-- Returns: model_id (e.g., 1)`}</code>
                  </pre>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-2">Logistic Regression</h3>
                  <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                    <code className="text-sm text-gray-300">{`SELECT neurondb.train(
    'fraud_detection',           -- Project name
    'logistic_regression',       -- Algorithm
    'unified_train_data',        -- Training table
    'is_fraud'                   -- Target column
) as model_id;
-- Returns: model_id (e.g., 2)`}</code>
                  </pre>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-green-400 mb-2">Random Forest with Hyperparameters</h3>
                  <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                    <code className="text-sm text-gray-300">{`SELECT neurondb.train(
    'fraud_detection',           -- Project name
    'random_forest',             -- Algorithm
    'unified_train_data',        -- Training table
    'is_fraud',                  -- Target column
    NULL,                        -- Feature columns (NULL = use all)
    '{
      "n_trees": 20, 
      "max_depth": 8, 
      "min_samples": 50
    }'::jsonb  -- Hyperparameters
) as model_id;
-- Returns: model_id (e.g., 3)`}</code>
                  </pre>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-orange-400 mb-2">K-Nearest Neighbors (KNN)</h3>
                  <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                    <code className="text-sm text-gray-300">{`SELECT neurondb.train(
    'fraud_detection',           -- Project name
    'knn',                       -- Algorithm
    'unified_train_data',        -- Training table
    'is_fraud',                  -- Target column
    NULL,                        -- Feature columns
    '{"k": 3}'::jsonb            -- Hyperparameters: 3 neighbors
) as model_id;
-- Returns: model_id (e.g., 4)`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-purple-400" />
              Step 3: Make Predictions with neurondb.predict()
            </h2>
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <p className="text-gray-300 mb-4">Use the same <code className="text-green-400">neurondb.predict()</code> function for all models:</p>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Test features
WITH test_features AS (
    SELECT ARRAY[75.5, 25.3, 5.2]::real[] as features
)
SELECT 
    'Linear Regression' as model_type,
    neurondb.predict(1, features) as prediction
FROM test_features

UNION ALL

SELECT 
    'Logistic Regression' as model_type,
    neurondb.predict(2, features) as prediction
FROM test_features

UNION ALL

SELECT 
    'Random Forest' as model_type,
    neurondb.predict(3, features) as prediction
FROM test_features;

-- Output:
--     model_type      | prediction
-- --------------------+------------
-- Linear Regression   |   0.6234
-- Logistic Regression |   0.7891
-- Random Forest       |   1.0000`}</code>
              </pre>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Zap className="w-6 h-6 text-purple-400" />
              Step 4: Deploy Models with neurondb.deploy()
            </h2>
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <p className="text-gray-300 mb-4">Deploy models with different strategies:</p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">Replace Strategy</h3>
                  <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                    <code className="text-sm text-gray-300">{`SELECT neurondb.deploy(1, 'replace') as deployment_id;
-- Immediately replaces existing deployment
-- Best for: Quick updates, low-risk changes`}</code>
                  </pre>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-green-400 mb-2">Blue-Green Strategy</h3>
                  <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                    <code className="text-sm text-gray-300">{`SELECT neurondb.deploy(2, 'blue_green') as deployment_id;
-- Runs both versions, switches after validation
-- Best for: Zero-downtime deployments, safe rollback`}</code>
                  </pre>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-2">Canary Strategy</h3>
                  <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                    <code className="text-sm text-gray-300">{`SELECT neurondb.deploy(3, 'canary') as deployment_id;
-- Gradually routes traffic to new version
-- Best for: Risk mitigation, A/B testing`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-purple-400" />
              Step 5: Monitor Models and Deployments
            </h2>
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">List All Trained Models</h3>
                  <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                    <code className="text-sm text-gray-300">{`SELECT 
    model_id,
    model_name,
    algorithm,
    status
FROM neurondb.ml_models
ORDER BY model_id;

-- Output:
-- model_id |    model_name     |     algorithm      | status
-- ---------+-------------------+--------------------+-----------
--        1 | fraud_detection_1 | linear_regression  | completed
--        2 | fraud_detection_2 | logistic_regression| completed
--        3 | fraud_detection_3 | random_forest      | completed
--        4 | fraud_detection_4 | knn                | completed`}</code>
                  </pre>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-green-400 mb-2">List All Deployments</h3>
                  <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                    <code className="text-sm text-gray-300">{`SELECT 
    deployment_id,
    model_id,
    deployment_name,
    strategy,
    status
FROM neurondb.ml_deployments
ORDER BY deployment_id;

-- Output:
-- deployment_id | model_id | deployment_name |  strategy  | status
-- --------------+----------+-----------------+------------+--------
--             1 |        1 | deploy_1        | replace    | active
--             2 |        2 | deploy_2        | blue_green | active
--             3 |        3 | deploy_3        | canary     | active`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Code className="w-6 h-6 text-purple-400" />
              Complete Demo SQL File
            </h2>
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <code className="text-green-400">/Users/pgedge/pge/NeurondB/demo/ML/sql/018_unified_api.sql</code>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
