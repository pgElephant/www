export const metadata = {
  title: 'NeuronDB · Support Vector Machines (SVM)',
  description: 'Train SVM classifiers with maximum margin hyperplanes using SMO algorithm in SQL.'
}

import React from 'react'
import Link from 'next/link'
import { Boxes, ArrowRight, Database, Activity, TrendingUp, Code } from 'lucide-react'

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <Link href="/docs/neurondb/ml" className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-200 transition-colors">
            <ArrowRight className="w-4 h-4 rotate-180" /> Back to Machine Learning
          </Link>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text flex items-center gap-3">
          <Boxes className="w-10 h-10 text-indigo-400" /> Support Vector Machines
        </h1>
        
        <p className="text-lg text-gray-300 mb-8">
          Train powerful SVM classifiers that find maximum margin hyperplanes for robust binary classification.
        </p>

        {/* DATASET PREPARATION */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-indigo-400">Prepare Classification Dataset</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 mb-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Database className="w-5 h-5 text-indigo-400" />
                Create SVM Training Data
              </h3>
              <p className="text-gray-300 mb-4">
                SVM works best with smaller, well-balanced datasets. We limit to 20,000 samples for computational efficiency.
              </p>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Prepare classification dataset for SVM
CREATE TEMP TABLE svm_data AS
SELECT 
    transaction_id,
    features,
    CASE WHEN is_fraud THEN 1 ELSE 0 END as label  -- Binary labels: 0 or 1
FROM transactions
WHERE features IS NOT NULL
LIMIT 20000;  -- Smaller dataset for SVM (computationally expensive)

-- Check class distribution (important for SVM)
SELECT 
    label::int as class,
    COUNT(*) as count,
    ROUND(100.0 * COUNT(*) / SUM(COUNT(*)) OVER(), 2) as percentage
FROM svm_data
GROUP BY label
ORDER BY label;

-- Example Output:
-- class | count | percentage
-- ------+-------+------------
--     0 | 18453 |      92.27
--     1 |  1547 |       7.73

-- Note: Imbalanced classes - may need resampling for optimal SVM`}</code>
              </pre>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-4">Train/Test Split</h3>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Split into train (80%) and test (20%)
CREATE TEMP TABLE svm_train AS 
SELECT * FROM svm_data LIMIT 16000;

CREATE TEMP TABLE svm_test AS 
SELECT * FROM svm_data OFFSET 16000;

-- Created 16k train, 4k test samples`}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* TRAIN SVM */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-purple-400">Train Linear SVM Classifier</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 mb-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-purple-400" />
                Sequential Minimal Optimization (SMO)
              </h3>
              <p className="text-gray-300 mb-4">
                Train SVM using SMO algorithm. Returns support vectors (alpha coefficients) that define the maximum margin hyperplane.
              </p>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Train linear SVM classifier
-- Parameters:
--   C = 1.0         Regularization parameter (higher = less regularization)
--   max_iters = 1000 Maximum SMO iterations

SELECT train_svm_classifier(
    'svm_train',     -- Training table
    'features',      -- Feature column
    'label',         -- Label column (0 or 1)
    1.0,             -- C (regularization)
    1000             -- Max iterations
) AS svm_alphas;

-- Returns: Array of alpha coefficients (support vectors)
-- Example: {0.234, 0.0, 0.456, 0.0, 0.123, ...}
-- Non-zero alphas indicate support vectors

-- Count support vectors
SELECT array_length(svm_alphas::float8[], 1) as total_vectors,
       (SELECT COUNT(*) FROM unnest(svm_alphas::float8[]) a WHERE a > 1e-5) as support_vectors;

-- Example Output:
-- total_vectors | support_vectors
-- --------------+-----------------
--         16000 |            3245
-- 
-- ~20% of training points are support vectors (typical for complex boundaries)`}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* SVM CHARACTERISTICS */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-pink-400">SVM Characteristics</h2>
            
            <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-lg p-6 mb-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-purple-300 mb-2">Maximum Margin Hyperplane</h3>
                  <p className="text-gray-300">SVM finds the decision boundary that maximizes the margin (distance) between classes. This provides better generalization than simple linear classifiers.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-pink-300 mb-2">Support Vectors</h3>
                  <p className="text-gray-300">Only data points near the boundary (support vectors) influence the model. Most training points can be ignored, making SVM memory-efficient.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-indigo-300 mb-2">Kernel Trick (Extensible)</h3>
                  <p className="text-gray-300">Linear SVM can be extended to non-linear boundaries using kernel functions: RBF (Gaussian), polynomial, sigmoid, etc.</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-cyan-400" />
                Key SVM Parameters
              </h3>
              <div className="space-y-3 text-gray-300">
                <div className="flex justify-between items-center p-3 bg-black/30 rounded">
                  <span className="font-semibold text-purple-300">C (Regularization)</span>
                  <span>Higher = less regularization, may overfit. Lower = more regularization, simpler boundary.</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-black/30 rounded">
                  <span className="font-semibold text-pink-300">Kernel Type</span>
                  <span>Linear (simple), RBF (flexible), Polynomial (complex patterns).</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-black/30 rounded">
                  <span className="font-semibold text-indigo-300">Max Iterations</span>
                  <span>SMO algorithm iterations. More = better convergence but slower training.</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* RECORD MODEL */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-cyan-400">Record Model in ML Project</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Create ML project for SVM
SELECT neurondb_create_ml_project(
    'svm_demo',         -- Project name
    'classification',   -- Task type
    'SVM demo'          -- Description
) AS proj_id;

-- Record trained SVM model
INSERT INTO neurondb.ml_models (
    project_id, 
    version, 
    algorithm, 
    status, 
    training_table, 
    training_column, 
    parameters, 
    num_samples, 
    completed_at
)
SELECT 
    p.project_id, 
    1,                  -- Version 1
    'custom',           -- Algorithm type
    'completed',        -- Status
    'svm_train',        -- Training table
    'features',         -- Feature column
    jsonb_build_object(
        'algorithm', 'linear_svm',
        'C', 1.0,
        'max_iters', 1000,
        'kernel', 'linear'
    ),
    16000,              -- Number of samples
    now()               -- Completion timestamp
FROM neurondb.ml_projects p 
WHERE p.project_name = 'svm_demo'
RETURNING model_id AS svm_model_id;

-- Model recorded with ID returned`}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* PLATFORM NOTES */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-yellow-400">Platform Implementation Notes</h2>
            
            <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-500/30 rounded-lg p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-yellow-300 mb-2">🐧 Linux: Full C Implementation</h3>
                  <p className="text-gray-300">Complete SMO algorithm with proper kernel support, accurate support vector calculation, and production-ready performance.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-orange-300 mb-2">🍎 macOS: PL/pgSQL Implementation</h3>
                  <p className="text-gray-300">Returns demonstration results. For production SVM on macOS, consider using external ML libraries or deploying on Linux.</p>
                </div>
                <div className="mt-4 p-4 bg-blue-900/20 rounded">
                  <p className="text-blue-300"><strong>Recommendation:</strong> For critical SVM workloads, deploy NeuronDB on Linux for full C-based SMO implementation.</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* USE CASES */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-green-400">When to Use SVM</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-900/50 rounded-lg p-6 border border-green-700">
                <h3 className="text-xl font-semibold mb-3 text-green-400">✅ Best For:</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• High-dimensional data (many features)</li>
                  <li>• Clear margin between classes</li>
                  <li>• Small to medium datasets (&lt;100k rows)</li>
                  <li>• Binary classification tasks</li>
                  <li>• When interpretability matters (linear kernel)</li>
                </ul>
              </div>
              
              <div className="bg-gray-900/50 rounded-lg p-6 border border-red-700">
                <h3 className="text-xl font-semibold mb-3 text-red-400">⚠️ Limitations:</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Computationally expensive (O(n²) to O(n³))</li>
                  <li>• Slow on large datasets (&gt;100k rows)</li>
                  <li>• Sensitive to class imbalance</li>
                  <li>• Requires careful parameter tuning</li>
                  <li>• Not probabilistic (hard decisions only)</li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* COMPLETE DEMO FILES */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Code className="w-6 h-6 text-purple-400" />
            Complete Demo SQL File
          </h2>
          <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
            <code className="text-green-400">/Users/pgedge/pge/NeurondB/demo/ML/sql/013_svm.sql</code>
          </div>
        </section>
      </div>
    </div>
  )
}
