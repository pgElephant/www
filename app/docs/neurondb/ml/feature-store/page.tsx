export const metadata = {
  title: 'NeuronDB · Feature Store',
  description: 'Manage features, definitions, and serving within PostgreSQL using NeuronDB feature store primitives.'
}

import React from 'react'
import Link from 'next/link'
import { Boxes, ArrowRight, Database, Activity, Code } from 'lucide-react'

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <Link href="/docs/neurondb/ml" className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-200 transition-colors">
            <ArrowRight className="w-4 h-4 rotate-180" /> Back to Machine Learning
          </Link>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 text-transparent bg-clip-text flex items-center gap-3">
          <Boxes className="w-10 h-10 text-amber-400" /> Feature Store
        </h1>
        
        <p className="text-lg text-gray-300 mb-8">
          Register features, apply transformations, and serve consistent features for training and inference.
        </p>

        {/* CREATE FEATURE STORE */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-amber-400">neurondb.create_feature_store()</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 mb-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Database className="w-5 h-5 text-amber-400" />
                Step 1: Create Entity Data
              </h3>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Create entity table (users)
DROP TABLE IF EXISTS users CASCADE;
CREATE TEMP TABLE users AS
SELECT 
    i as user_id,
    'user_' || i as username,
    (random() * 1000)::numeric(10,2) as total_spent,
    (random() * 100)::integer as num_transactions,
    (random() * 5)::numeric(3,2) as avg_rating
FROM generate_series(1, 1000) i;

-- Entity data: 1,000 users with transaction metrics`}</code>
              </pre>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 mb-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-amber-400" />
                Step 2: Initialize Feature Store
              </h3>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Create feature store for user features
SELECT neurondb.create_feature_store(
    'user_features',     -- Store name
    'users',             -- Entity table
    'user_id'            -- Entity key column
) as store_id;

-- Returns: store_id (e.g., 1)`}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* REGISTER FEATURES */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-orange-400">neurondb.register_feature()</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <p className="text-gray-300 mb-4">
                Register feature definitions including raw features and engineered features.
              </p>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Register raw features
SELECT 
    'Total Spent' as feature_name,
    neurondb.register_feature(
        1,                   -- store_id
        'total_spent',       -- feature name
        'numeric',           -- data type
        'total_spent'        -- SQL expression
    ) as feature_id

UNION ALL

SELECT 
    'Transaction Count' as feature_name,
    neurondb.register_feature(
        1,
        'num_transactions',
        'numeric',
        'num_transactions'
    ) as feature_id

UNION ALL

SELECT 
    'Average Rating' as feature_name,
    neurondb.register_feature(
        1,
        'avg_rating',
        'numeric',
        'avg_rating'
    ) as feature_id

UNION ALL

-- Register engineered feature
SELECT 
    'Spending per Transaction' as feature_name,
    neurondb.register_feature(
        1,
        'spending_per_txn',
        'numeric',
        'CASE WHEN num_transactions > 0 THEN total_spent / num_transactions ELSE 0 END'
    ) as feature_id;

-- Feature engineering expression evaluated at query time`}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* FEATURE ENGINEERING */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-red-400">neurondb.feature_engineering()</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 mb-6">
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Apply feature engineering transformations
SELECT neurondb.feature_engineering(
    1,                   -- store_id
    '{}'::jsonb,         -- options
    'users'              -- target table
) as features_generated;`}</code>
              </pre>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-4">Verify Feature Store Schema</h3>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- List feature stores
SELECT * FROM neurondb.feature_stores;

-- List feature definitions
SELECT * FROM neurondb.features ORDER BY feature_id;

-- Output:
-- feature_id | store_id |     feature_name      | data_type |             expression
-- -----------+----------+-----------------------+-----------+------------------------------------
--          1 |        1 | total_spent           | numeric   | total_spent
--          2 |        1 | num_transactions      | numeric   | num_transactions
--          3 |        1 | avg_rating            | numeric   | avg_rating
--          4 |        1 | spending_per_txn      | numeric   | CASE WHEN num_transactions > 0...`}</code>
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
            <a href="https://github.com/pgElephant/NeurondB/tree/main/demo/ML/sql/020_feature_store.sql" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 hover:underline">
              📄 View complete demo on GitHub: demo/ML/sql/020_feature_store.sql
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
