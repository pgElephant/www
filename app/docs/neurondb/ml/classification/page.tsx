export const metadata = {
  title: 'NeuronDB · Classification (Logistic, KNN, SVM, Trees, RF, Naive Bayes)',
  description: 'Binary and multi-class classification in PostgreSQL using NeuronDB. Train, evaluate, and deploy models entirely in SQL.'
}

import React from 'react'
import Link from 'next/link'
import { Target, ArrowRight, Database, Activity, TrendingUp, Code } from 'lucide-react'

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <Link href="/docs/neurondb/ml" className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-200 transition-colors">
            <ArrowRight className="w-4 h-4 rotate-180" /> Back to Machine Learning
          </Link>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 text-transparent bg-clip-text flex items-center gap-3">
          <Target className="w-10 h-10 text-rose-400" /> Classification Algorithms
        </h1>
        
        <p className="text-lg text-gray-300 mb-8">
          Predict categorical outcomes using supervised learning. Train fraud detectors, spam filters, and more with NeuronDB classification algorithms.
        </p>

        {/* LOGISTIC REGRESSION */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-rose-400">Logistic Regression</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 mb-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Database className="w-5 h-5 text-rose-400" />
                Step 1: Prepare Dataset
              </h3>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Create binary classification dataset
CREATE TEMP TABLE classification_data AS
SELECT 
    transaction_id,
    features,
    CASE WHEN is_fraud THEN 1 ELSE 0 END as label
FROM transactions
WHERE features IS NOT NULL AND is_fraud IS NOT NULL
LIMIT 100000;

-- Check class distribution
SELECT 
    label::int as class,
    COUNT(*) as count,
    ROUND(100.0 * COUNT(*) / SUM(COUNT(*)) OVER(), 2) as percentage
FROM classification_data
GROUP BY label
ORDER BY label;

-- Split into train (80%) and test (20%)
CREATE TEMP TABLE logistic_train AS 
SELECT * FROM classification_data LIMIT 80000;
CREATE TEMP TABLE logistic_test AS 
SELECT * FROM classification_data OFFSET 80000;`}</code>
              </pre>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 mb-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-rose-400" />
                Step 2: Train Logistic Regression
              </h3>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Train with gradient descent
SELECT train_logistic_regression(
    'logistic_train',    -- Training table
    'features',          -- Feature column
    'label',             -- Target column
    500,                 -- Max iterations
    0.01,                -- Learning rate
    0.01                 -- Regularization (L2 penalty)
) AS coefficients;

-- Returns: Array of coefficients [bias, weight1, weight2, ...]`}</code>
              </pre>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 mb-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-rose-400" />
                Step 3: Evaluate Model
              </h3>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Evaluate on test data with threshold = 0.5
SELECT evaluate_logistic_regression(
    'logistic_test',     -- Test table
    'features',          -- Feature column
    'label',             -- Target column
    :coefficients,       -- Model coefficients
    0.5                  -- Classification threshold
) AS test_metrics;

-- Returns array: [Accuracy, Precision, Recall, F1-Score, Log Loss]

-- Example output:
-- Accuracy:  0.8542
-- Precision: 0.7891
-- Recall:    0.8123
-- F1-Score:  0.8005
-- Log Loss:  0.3421`}</code>
              </pre>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-4">Step 4: Threshold Tuning</h3>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Test different classification thresholds
SELECT 
    threshold,
    ROUND((metrics[1])::numeric, 4) as accuracy,
    ROUND((metrics[2])::numeric, 4) as precision,
    ROUND((metrics[3])::numeric, 4) as recall,
    ROUND((metrics[4])::numeric, 4) as f1_score
FROM (
    SELECT 
        t as threshold,
        evaluate_logistic_regression(
            'logistic_test', 'features', 'label', 
            :coefficients, t
        ) as metrics
    FROM generate_series(0.3, 0.7, 0.1) t
) thresholds
ORDER BY threshold;

-- Adjust threshold based on your precision/recall requirements`}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* K-NEAREST NEIGHBORS */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-blue-400">K-Nearest Neighbors (KNN)</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 mb-6">
              <p className="text-gray-300 mb-4">
                <strong>KNN</strong> is a non-parametric algorithm that classifies based on the k closest training examples. 
                No training phase required, but slower at prediction time.
              </p>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Classify using 5 nearest neighbors
WITH predictions AS (
    SELECT 
        t.label::int as actual,
        knn_classify(
            'knn_train',     -- Training table
            'features',      -- Feature column
            'label',         -- Label column
            t.features,      -- Test features
            5                -- k (number of neighbors)
        ) as predicted
    FROM knn_test t
    LIMIT 1000
)
SELECT 
    COUNT(*) as total,
    SUM(CASE WHEN actual = predicted THEN 1 ELSE 0 END) as correct,
    ROUND(
        (100.0 * SUM(CASE WHEN actual = predicted THEN 1 ELSE 0 END) / COUNT(*))::numeric, 
        2
    ) as accuracy_pct
FROM predictions;`}</code>
              </pre>
            </div>

            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6">
              <p className="text-blue-200">
                <strong>Best for:</strong> Small-medium datasets (&lt;100k samples). 
                <strong>Advantages:</strong> Simple, no training, works well with local patterns. 
                <strong>Limitations:</strong> Slow on large datasets, sensitive to feature scaling.
              </p>
            </div>
          </section>
        </div>

        {/* DECISION TREES */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-green-400">Decision Trees</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Train decision tree classifier using CART algorithm
SELECT train_decision_tree_classifier(
    'tree_train',        -- Training table
    'features',          -- Feature column
    'label',             -- Target column
    10,                  -- max_depth
    2                    -- min_samples_split
) AS tree_depth;

-- Decision trees are interpretable and handle non-linear relationships
-- No feature scaling required`}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* RANDOM FOREST */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-purple-400">Random Forest (Ensemble)</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 mb-6">
              <p className="text-gray-300 mb-4">
                <strong>Random Forest</strong> combines multiple decision trees to reduce overfitting and improve accuracy.
              </p>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Train Random Forest with 10 trees
SELECT train_random_forest_classifier(
    'rf_train',          -- Training table
    'features',          -- Feature column
    'label',             -- Target column
    10,                  -- n_trees: Number of trees in forest
    10,                  -- max_depth: Maximum depth per tree
    100                  -- min_samples_split
) as model_id;

-- Make predictions
SELECT 
    t.id,
    t.label as actual,
    predict_random_forest(
        model_id,
        t.features
    ) as predicted
FROM rf_test t
LIMIT 100;

-- Random Forest advantages:
-- • Reduces overfitting vs single decision tree
-- • Handles non-linear relationships
-- • Robust to outliers
-- • Provides feature importance
-- • No feature scaling needed`}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* NAIVE BAYES */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-orange-400">Naive Bayes</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Train Gaussian Naive Bayes classifier
SELECT train_naive_bayes_classifier(
    'nb_train',          -- Training table
    'features',          -- Feature column
    'label'              -- Target column
) AS nb_params;

-- Assumes:
-- • Features are independent (naive assumption)
-- • Features follow Gaussian distribution within each class

-- Best for:
-- • Text classification
-- • Fast training and prediction
-- • Works well with high-dimensional data`}</code>
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
              <li><code className="text-green-400">/Users/pgedge/pge/NeurondB/demo/ML/sql/009_logistic_regression.sql</code></li>
              <li><code className="text-green-400">/Users/pgedge/pge/NeurondB/demo/ML/sql/010_knn.sql</code></li>
              <li><code className="text-green-400">/Users/pgedge/pge/NeurondB/demo/ML/sql/011_decision_tree.sql</code></li>
              <li><code className="text-green-400">/Users/pgedge/pge/NeurondB/demo/ML/sql/016_random_forest.sql</code></li>
              <li><code className="text-green-400">/Users/pgedge/pge/NeurondB/demo/ML/sql/012_naive_bayes.sql</code></li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}
