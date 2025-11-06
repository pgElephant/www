export const metadata = {
  title: 'NeuronDB · Hyperparameter Tuning',
  description: 'Compare grid search, random search, and Bayesian optimization strategies in-database.'
}

import React from 'react'
import Link from 'next/link'
import { SlidersHorizontal, ArrowRight, Database, Activity, Code } from 'lucide-react'

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <Link href="/docs/neurondb/ml" className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-200 transition-colors">
            <ArrowRight className="w-4 h-4 rotate-180" /> Back to Machine Learning
          </Link>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-fuchsia-400 via-pink-400 to-rose-400 text-transparent bg-clip-text flex items-center gap-3">
          <SlidersHorizontal className="w-10 h-10 text-fuchsia-400" /> Hyperparameter Tuning
        </h1>
        
        <p className="text-lg text-gray-300 mb-8">
          Optimize model performance using grid search, random search, and Bayesian optimization.
        </p>

        {/* GRID SEARCH */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-fuchsia-400">Grid Search</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 mb-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Database className="w-5 h-5 text-fuchsia-400" />
                Exhaustive Parameter Search
              </h3>
              <p className="text-gray-300 mb-4">
                Grid search tests <strong>all combinations</strong> of specified parameter values. Best for small parameter spaces.
              </p>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Example: Grid search for Random Forest
-- Parameter grid: n_trees × max_depth
SELECT 
    'Grid Search for Random Forest' as search_type,
    '{
      "n_trees": [10, 20, 50], 
      "max_depth": [5, 10, 15]
    }'::jsonb as param_grid,
    'Would search 9 combinations (3 × 3)' as note;

-- Grid search will test:
-- (10, 5), (10, 10), (10, 15)
-- (20, 5), (20, 10), (20, 15)
-- (50, 5), (50, 10), (50, 15)

-- Pros: Guaranteed to find best combination in grid
-- Cons: Exponential growth (3 params with 5 values = 125 combinations)`}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* RANDOM SEARCH */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-pink-400">Random Search</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 mb-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-pink-400" />
                Random Sampling of Parameters
              </h3>
              <p className="text-gray-300 mb-4">
                Random search samples parameter values from distributions. More efficient for large parameter spaces.
              </p>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Example: Random search for SVM
SELECT 
    'Random Search for SVM' as search_type,
    '{
      "C": {
        "type": "uniform", 
        "low": 0.1, 
        "high": 10.0
      }, 
      "gamma": {
        "type": "log_uniform", 
        "low": 0.001, 
        "high": 1.0
      }
    }'::jsonb as param_distributions,
    'Would sample 10 random combinations' as note;

-- Random search samples from continuous distributions
-- Pros: Efficient for high-dimensional spaces
-- Cons: No guarantee of finding global optimum`}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* BAYESIAN OPTIMIZATION */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-rose-400">Bayesian Optimization</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 mb-6">
              <p className="text-gray-300 mb-4">
                <strong>Bayesian optimization</strong> uses Gaussian Process to model the objective function and intelligently select next parameter values to test.
              </p>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Example: Bayesian optimization for Logistic Regression
SELECT 
    'Bayesian Optimization' as search_type,
    '{
      "learning_rate": {
        "type": "real", 
        "low": 0.001, 
        "high": 0.1
      }, 
      "max_iter": {
        "type": "integer", 
        "low": 100, 
        "high": 2000
      }
    }'::jsonb as param_space,
    'Would intelligently sample 20 parameter sets' as note;

-- Bayesian optimization:
-- 1. Builds probabilistic model of objective function
-- 2. Uses acquisition function to select promising parameters
-- 3. Updates model with each evaluation
-- 4. Converges faster than grid/random search

-- Pros: Most efficient for expensive evaluations
-- Cons: More complex, needs tuning of acquisition function`}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* COMPARISON */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-purple-400">Strategy Comparison</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`SELECT 
    strategy,
    trials,
    coverage,
    efficiency,
    best_use_case
FROM (VALUES
    ('Grid Search', 
     'All combinations', 
     'Complete', 
     'Low for large spaces', 
     'Small parameter spaces'),
    
    ('Random Search', 
     'Random samples', 
     'Probabilistic', 
     'Medium', 
     'Large parameter spaces'),
    
    ('Bayesian Optimization', 
     'Sequential adaptive', 
     'Focused', 
     'High', 
     'Expensive evaluations')
) as strategies(strategy, trials, coverage, efficiency, best_use_case);`}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* SAVE RESULTS */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-cyan-400">Save Hyperparameter Results</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 mb-6">
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Save tuning results to database
INSERT INTO neurondb.hyperparameter_results 
    (project_id, algorithm, parameters, score, cv_scores, training_time_ms)
VALUES 
    (1, 'random_forest', 
     '{"n_trees": 50, "max_depth": 10}'::jsonb, 
     0.95, 
     ARRAY[0.94, 0.96, 0.95, 0.94, 0.96], 
     1250),
    (1, 'random_forest', 
     '{"n_trees": 20, "max_depth": 15}'::jsonb, 
     0.93, 
     ARRAY[0.92, 0.94, 0.93, 0.92, 0.94], 
     850),
    (1, 'random_forest', 
     '{"n_trees": 100, "max_depth": 5}'::jsonb, 
     0.91, 
     ARRAY[0.90, 0.92, 0.91, 0.90, 0.92], 
     2100);`}</code>
              </pre>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-4">Find Best Hyperparameters</h3>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Retrieve best hyperparameter combination
SELECT 
    algorithm,
    parameters,
    score,
    cv_scores,
    training_time_ms
FROM neurondb.hyperparameter_results
ORDER BY score DESC
LIMIT 1;

-- Output:
-- algorithm     | parameters                          | score | cv_scores                       | training_time_ms
-- --------------+-------------------------------------+-------+---------------------------------+------------------
-- random_forest | {"n_trees": 50, "max_depth": 10}   | 0.95  | {0.94, 0.96, 0.95, 0.94, 0.96} | 1250`}</code>
              </pre>
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
            <a href="https://github.com/pgElephant/NeurondB/tree/main/demo/ML/sql/021_hyperparameter_tuning.sql" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 hover:underline">
              📄 View complete demo on GitHub: demo/ML/sql/021_hyperparameter_tuning.sql
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
