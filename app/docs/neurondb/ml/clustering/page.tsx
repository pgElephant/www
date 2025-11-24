import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'Clustering in AI PostgreSQL | K-means, DBSCAN, GMM in NeurondB',
  description: 'Complete guide to clustering algorithms in NeurondB (AI PostgreSQL extension): K-means, DBSCAN, Gaussian Mixture Models (GMM), Mini-batch K-means, and Hierarchical clustering. Alternative to PostgreSQL.ai and pgml for ML clustering in PostgreSQL.',
  keywords: [
    'K-means clustering NeurondB',
    'AI PostgreSQL clustering',
    'PostgreSQL.ai clustering',
    'pgml clustering',
    'DBSCAN PostgreSQL',
    'GMM clustering',
    'hierarchical clustering',
    'vector clustering',
    'unsupervised learning PostgreSQL',
    'cluster analysis SQL',
    'K-means SQL',
    'density-based clustering',
    'Gaussian mixture model',
    'Davies-Bouldin index',
    'cluster quality metrics',
    'PostgreSQL ML clustering'
  ].join(', '),
  alternates: {
    canonical: 'https://www.pgelephant.com/docs/neurondb/ml/clustering',
  },
  openGraph: {
    title: 'Clustering Algorithms in NeurondB | K-means, DBSCAN, GMM',
    description: 'Cluster vectors directly in PostgreSQL with NeurondB. Complete guide to K-means, DBSCAN, GMM, and hierarchical clustering.',
    type: 'article',
    url: 'https://www.pgelephant.com/docs/neurondb/ml/clustering',
  },
}

const tableOfContents: TocItem[] = [
  { id: 'k-means', title: 'K-means Clustering' },
  { id: 'dbscan', title: 'DBSCAN' },
  { id: 'gmm', title: 'Gaussian Mixture Models' },
  { id: 'mini-batch-kmeans', title: 'Mini-batch K-means' },
  { id: 'hierarchical', title: 'Hierarchical Clustering' },
  { id: 'quality-metrics', title: 'Clustering Quality Metrics' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/ml/embeddings',
  label: 'Embeddings',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/ml/classification',
  label: 'Classification',
}

export default function Page() {
  return (
    <PostgresDocsLayout
      title="Clustering Algorithms"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="k-means">
        <h2>K-means Clustering</h2>
        <p>Group similar data points using unsupervised learning. NeuronDB supports K-means with k-means++ initialization. K-means partitions data into k clusters by minimizing within-cluster variance.</p>

        <h3>Method 1: Direct Clustering (Returns Table with Cluster Assignments)</h3>
        <p>Use <code>neurondb.cluster_kmeans</code> to directly get cluster assignments for all rows. This returns a table with <code>id</code> and <code>cluster_id</code> columns.</p>
        <SqlCodeBlock
          title="K-means clustering - direct method"
          code={`-- Cluster data and get assignments
-- Returns: table with columns (id, cluster_id)
SELECT 
    cluster_id, 
    COUNT(*) as cluster_size
FROM neurondb.cluster_kmeans(
    'test_data',    -- table name (text)
    'features',     -- vector column name (text)
    3,              -- number of clusters k (integer)
    100             -- max iterations (integer)
)
GROUP BY cluster_id
ORDER BY cluster_id;

-- Get cluster assignments with original data
WITH clusters AS (
    SELECT * FROM neurondb.cluster_kmeans('test_data', 'features', 3, 100)
)
SELECT 
    t.id,
    t.features,
    c.cluster_id
FROM test_data t
JOIN clusters c ON t.id = c.id
ORDER BY c.cluster_id, t.id;`}
        />
        <p><strong>Function Signature:</strong></p>
        <pre><code>neurondb.cluster_kmeans(
    table_name TEXT,    -- Source table name
    column_name TEXT,   -- Vector column name
    k INTEGER,          -- Number of clusters
    max_iter INTEGER    -- Maximum iterations
) RETURNS TABLE (
    id INTEGER,         -- Row ID from source table
    cluster_id INTEGER  -- Assigned cluster (0 to k-1)
)</code></pre>

        <h3>Method 2: Train Model and Evaluate</h3>
        <p>Train a K-means model and save it for later use, then evaluate clustering quality.</p>
        <SqlCodeBlock
          title="Train K-means model"
          code={`-- Train K-means model and get model_id
CREATE TEMP TABLE kmeans_model AS
SELECT train_kmeans_model_id(
    'test_data',    -- table name
    'features',     -- vector column
    3,              -- number of clusters k
    100             -- max iterations
) AS model_id;

-- View model_id
SELECT model_id FROM kmeans_model;

-- Evaluate model quality
CREATE TEMP TABLE kmeans_metrics AS
SELECT evaluate_kmeans_by_model_id(
    (SELECT model_id FROM kmeans_model),
    'test_data',    -- test table
    'features'      -- vector column
) AS metrics;

-- View evaluation metrics
SELECT
    'Inertia' AS metric, 
    ROUND((metrics->>'inertia')::numeric, 6)::text AS value
FROM kmeans_metrics
UNION ALL
SELECT 'N_Clusters', (metrics->>'n_clusters')::text
FROM kmeans_metrics
UNION ALL
SELECT 'N_Iterations', (metrics->>'n_iterations')::text
FROM kmeans_metrics
ORDER BY metric;`}
        />
        <p><strong>Function Signatures:</strong></p>
        <pre><code>train_kmeans_model_id(
    table_name TEXT,
    column_name TEXT,
    k INTEGER,
    max_iter INTEGER
) RETURNS INTEGER  -- Returns model_id

evaluate_kmeans_by_model_id(
    model_id INTEGER,
    table_name TEXT,
    column_name TEXT
) RETURNS JSONB     -- Returns metrics: inertia, n_clusters, n_iterations</code></pre>
      </section>

      <section id="dbscan">
        <h2>DBSCAN</h2>
        <p>Density-based clustering for arbitrary shapes. Automatically detects noise (outliers) while grouping dense regions. Points not assigned to any cluster get <code>cluster_id = -1</code> (noise).</p>
        <SqlCodeBlock
          title="DBSCAN clustering"
          code={`-- DBSCAN clustering
-- Returns: table with columns (id, cluster_id)
-- cluster_id = -1 indicates noise/outlier points
SELECT 
    cluster_id, 
    COUNT(*) as cluster_size
FROM neurondb.cluster_dbscan(
    'test_data',    -- table name
    'features',     -- vector column
    1.0,            -- eps: maximum distance for neighbors
    2               -- min_pts: minimum points to form cluster
)
GROUP BY cluster_id
ORDER BY cluster_id;

-- Example: Tight eps creates more noise points
SELECT 
    cluster_id, 
    COUNT(*) as cluster_size
FROM neurondb.cluster_dbscan('test_data', 'features', 0.3, 2)
GROUP BY cluster_id
ORDER BY cluster_id;

-- Example: Larger eps groups more points
SELECT 
    cluster_id, 
    COUNT(*) as cluster_size
FROM neurondb.cluster_dbscan('test_data', 'features', 3.0, 2)
GROUP BY cluster_id
ORDER BY cluster_id;`}
        />
        <p><strong>Function Signature:</strong></p>
        <pre><code>neurondb.cluster_dbscan(
    table_name TEXT,    -- Source table name
    column_name TEXT,   -- Vector column name
    eps REAL,           -- Maximum distance for neighbors
    min_pts INTEGER      -- Minimum points to form cluster
) RETURNS TABLE (
    id INTEGER,         -- Row ID from source table
    cluster_id INTEGER  -- Cluster ID (-1 for noise/outliers)
)</code></pre>
        <p><strong>Parameters:</strong></p>
        <ul>
          <li><code>eps</code>: Maximum distance between two points to be considered neighbors. Smaller values = tighter clusters, more noise points.</li>
          <li><code>min_pts</code>: Minimum number of points required to form a dense region (cluster). Higher values = fewer clusters, more noise.</li>
        </ul>
      </section>

      <section id="gmm">
        <h2>Gaussian Mixture Models</h2>
        <p>Probabilistic clustering that models data as a mixture of Gaussian distributions. Each cluster is represented by a Gaussian distribution with mean and covariance.</p>
        <SqlCodeBlock
          title="GMM clustering"
          code={`-- Gaussian Mixture Model clustering
SELECT 
    cluster_id, 
    COUNT(*) as cluster_size
FROM neurondb.cluster_gmm(
    'test_data',    -- table name
    'features',     -- vector column
    3,              -- n_components: number of Gaussian components
    50              -- max_iter: maximum EM iterations
)
GROUP BY cluster_id
ORDER BY cluster_id;`}
        />
        <p><strong>Function Signature:</strong></p>
        <pre><code>neurondb.cluster_gmm(
    table_name TEXT,    -- Source table name
    column_name TEXT,   -- Vector column name
    n_components INTEGER, -- Number of Gaussian components
    max_iter INTEGER    -- Maximum EM algorithm iterations
) RETURNS TABLE (
    id INTEGER,         -- Row ID from source table
    cluster_id INTEGER  -- Assigned cluster (0 to n_components-1)
)</code></pre>
      </section>

      <section id="mini-batch-kmeans">
        <h2>Mini-batch K-means</h2>
        <p>Faster variant of K-means that uses random mini-batches instead of the full dataset. Suitable for very large datasets.</p>
        <SqlCodeBlock
          title="Mini-batch K-means"
          code={`-- Mini-batch K-means clustering
SELECT 
    cluster_id, 
    COUNT(*) as cluster_size
FROM neurondb.cluster_minibatch_kmeans(
    'test_data',    -- table name
    'features',     -- vector column
    3,              -- number of clusters k
    3,              -- batch_size: samples per batch
    50              -- max_iter: maximum iterations
)
GROUP BY cluster_id
ORDER BY cluster_id;`}
        />
        <p><strong>Function Signature:</strong></p>
        <pre><code>neurondb.cluster_minibatch_kmeans(
    table_name TEXT,
    column_name TEXT,
    k INTEGER,
    batch_size INTEGER,  -- Number of samples per mini-batch
    max_iter INTEGER
) RETURNS TABLE (id INTEGER, cluster_id INTEGER)</code></pre>
      </section>

      <section id="hierarchical">
        <h2>Hierarchical Clustering</h2>
        <p>Builds a hierarchy of clusters using different linkage criteria (single, complete, average).</p>
        <SqlCodeBlock
          title="Hierarchical clustering"
          code={`-- Hierarchical clustering with single linkage
SELECT 
    cluster_id, 
    COUNT(*) as cluster_size
FROM neurondb.cluster_hierarchical(
    'test_data',    -- table name
    'features',     -- vector column
    3,              -- number of clusters
    'single'        -- linkage: 'single', 'complete', or 'average'
)
GROUP BY cluster_id
ORDER BY cluster_id;

-- Complete linkage
SELECT 
    cluster_id, 
    COUNT(*) as cluster_size
FROM neurondb.cluster_hierarchical('test_data', 'features', 2, 'complete')
GROUP BY cluster_id
ORDER BY cluster_id;

-- Average linkage
SELECT 
    cluster_id, 
    COUNT(*) as cluster_size
FROM neurondb.cluster_hierarchical('test_data', 'features', 3, 'average')
GROUP BY cluster_id
ORDER BY cluster_id;`}
        />
        <p><strong>Function Signature:</strong></p>
        <pre><code>neurondb.cluster_hierarchical(
    table_name TEXT,
    column_name TEXT,
    n_clusters INTEGER,
    linkage TEXT  -- 'single', 'complete', or 'average'
) RETURNS TABLE (id INTEGER, cluster_id INTEGER)</code></pre>
      </section>

      <section id="quality-metrics">
        <h2>Clustering Quality Metrics</h2>
        <p>Evaluate clustering quality using the Davies-Bouldin Index. Lower values indicate better clustering.</p>
        <SqlCodeBlock
          title="Evaluate clustering quality"
          code={`-- Calculate Davies-Bouldin Index for K-means results
WITH kmeans_results AS (
    SELECT * FROM neurondb.cluster_kmeans('test_data', 'features', 3, 100)
)
SELECT 
    neurondb.davies_bouldin_index(
        'test_data',           -- data table
        'features',            -- vector column
        'kmeans_results',      -- clustering results table
        'cluster_id'           -- cluster ID column
    ) AS db_index;  -- Lower is better`}
        />
        <p><strong>Function Signature:</strong></p>
        <pre><code>neurondb.davies_bouldin_index(
    data_table TEXT,        -- Original data table
    vector_column TEXT,     -- Vector column name
    cluster_table TEXT,      -- Clustering results table
    cluster_column TEXT     -- Cluster ID column name
) RETURNS REAL  -- Davies-Bouldin Index (lower = better)</code></pre>
      </section>

      <section>
        <h2>Next Steps</h2>
        <ul>
          <li><a href="/docs/neurondb/ml/classification">Classification</a> - Supervised learning algorithms</li>
          <li><a href="/docs/neurondb/analytics">Analytics Suite</a> - Complete ML analytics</li>
          <li><a href="/docs/neurondb/performance">Performance</a> - Optimize clustering performance</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}
