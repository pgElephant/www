export const metadata = {
  title: 'NeuronDB · Regression (Linear, Ridge, Lasso)',
  description: 'Train and evaluate regression models in PostgreSQL using NeuronDB: Linear Regression and regularized (Ridge/Lasso) variants.'
}

import React from 'react'
import Link from 'next/link'
import { TrendingUp, ArrowRight, Database, Activity, Code } from 'lucide-react'

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <Link href="/docs/neurondb/ml" className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-200 transition-colors">
            <ArrowRight className="w-4 h-4 rotate-180" /> Back to Machine Learning
          </Link>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 text-transparent bg-clip-text flex items-center gap-3">
          <TrendingUp className="w-10 h-10 text-green-400" /> Regression Algorithms
        </h1>
        
        <p className="text-lg text-gray-300 mb-8">
          Predict continuous values using supervised learning. Evaluate with R², MSE, MAE, and RMSE metrics.
        </p>

        {/* LINEAR REGRESSION */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-green-400">Linear Regression</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 mb-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Database className="w-5 h-5 text-green-400" />
                Step 1: Create Regression Dataset
              </h3>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Create regression dataset (predicting transaction amount)
CREATE TEMP TABLE regression_data AS
SELECT 
    transaction_id,
    features,
    random() * 1000.0 as amount  -- Target: continuous value
FROM transactions
WHERE features IS NOT NULL
LIMIT 100000;

-- Split into train (80%) and test (20%)
CREATE TEMP TABLE linear_train AS 
SELECT * FROM regression_data LIMIT 80000;
CREATE TEMP TABLE linear_test AS 
SELECT * FROM regression_data OFFSET 80000;`}</code>
              </pre>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 mb-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-400" />
                Step 2: Train Linear Regression
              </h3>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Train linear regression model
SELECT train_linear_regression(
    'linear_train',      -- Training table
    'features',          -- Feature column
    'amount'             -- Target column (continuous)
) AS coefficients;

-- Returns: Array of coefficients [intercept, weight1, weight2, ...]`}</code>
              </pre>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 mb-6">
              <h3 className="text-xl font-semibold mb-4">Step 3: Evaluate Model</h3>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Evaluate on test data
SELECT evaluate_linear_regression(
    'linear_test',       -- Test table
    'features',          -- Feature column
    'amount',            -- Target column
    :coefficients        -- Model coefficients
) AS test_metrics;

-- Returns array: [R², MSE, MAE, RMSE]

-- Metrics explained:
-- R²:   Coefficient of determination (0-1, higher is better)
-- MSE:  Mean Squared Error (lower is better)
-- MAE:  Mean Absolute Error (lower is better)
-- RMSE: Root Mean Squared Error (lower is better)`}</code>
              </pre>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-4">Step 4: Make Predictions</h3>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Sample predictions with error analysis
SELECT 
    transaction_id,
    ROUND(amount::numeric, 2) as actual,
    ROUND(predict_linear_regression(:coefficients, features)::numeric, 2) as predicted,
    ROUND(ABS(amount - predict_linear_regression(:coefficients, features))::numeric, 2) as error
FROM linear_test
LIMIT 10;`}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* REGULARIZED REGRESSION */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-purple-400">Ridge & Lasso (Regularized Regression)</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 mb-6">
              <h3 className="text-xl font-semibold mb-4">Ridge Regression (L2 Regularization)</h3>
              <p className="text-gray-300 mb-4">
                Ridge regression shrinks coefficients to reduce overfitting. Higher lambda = more regularization.
              </p>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Train Ridge regression with different lambda values
-- Weak regularization (λ=0.1)
SELECT train_ridge_regression('reg_train', 'features', 'target', 0.1) AS ridge_weak;

-- Moderate regularization (λ=1.0)
SELECT train_ridge_regression('reg_train', 'features', 'target', 1.0) AS ridge_moderate;

-- Strong regularization (λ=10.0)
SELECT train_ridge_regression('reg_train', 'features', 'target', 10.0) AS ridge_strong;

-- As lambda increases, coefficients shrink toward zero (preventing overfitting)`}</code>
              </pre>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 mb-6">
              <h3 className="text-xl font-semibold mb-4">Lasso Regression (L1 Regularization)</h3>
              <p className="text-gray-300 mb-4">
                Lasso performs <strong>feature selection</strong> by setting some coefficients to exactly zero.
              </p>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Train Lasso regression
SELECT train_lasso_regression(
    'reg_train',         -- Training table
    'features',          -- Feature column
    'target',            -- Target column
    1.0,                 -- lambda: Regularization strength
    1000                 -- max_iters: Maximum iterations
) AS lasso_moderate;

-- Count non-zero features
SELECT COUNT(*) as non_zero_features 
FROM (SELECT unnest(:lasso_moderate::float8[]) as coef OFFSET 1) sub 
WHERE ABS(coef) > 1e-6;

-- Lasso creates sparse models (many coefficients = 0)
-- Useful for high-dimensional data with feature selection`}</code>
              </pre>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-4">Elastic Net (L1 + L2)</h3>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Train Elastic Net (combines Ridge and Lasso)
SELECT train_elastic_net(
    'reg_train',         -- Training table
    'features',          -- Feature column
    'target',            -- Target column
    1.0,                 -- alpha: Overall regularization strength
    0.5                  -- l1_ratio: 0=Ridge only, 1=Lasso only, 0.5=equal mix
) AS elastic_net;

-- Use Cases:
-- • Ridge: When all features are important, prevent overfitting
-- • Lasso: When feature selection is needed, high-dimensional data
-- • Elastic Net: When you need both regularization and feature selection`}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* COMPLETE DEMO FILES */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Code className="w-6 h-6 text-purple-400" />
            Complete Demo SQL Files
          </h2>
          <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
            <ul className="space-y-2 text-gray-300">
              <li><a href="https://github.com/pgElephant/NeurondB/tree/main/demo/ML/sql/008_linear_regression.sql" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 hover:underline">📄 demo/ML/sql/008_linear_regression.sql</a></li>
              <li><a href="https://github.com/pgElephant/NeurondB/tree/main/demo/ML/sql/014_ridge_lasso.sql" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 hover:underline">📄 demo/ML/sql/014_ridge_lasso.sql</a></li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}
