import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'NeuronDB · Clustering (K-means, GMM, Hierarchical, DBSCAN)',
  description: 'Cluster large datasets directly in PostgreSQL using NeuronDB. Includes K-means, GMM, Mini-batch K-means, Hierarchical, and DBSCAN with training, evaluation, and deployment.',
}

const tableOfContents: TocItem[] = [
  { id: 'k-means', title: 'K-means Clustering' },
  { id: 'dbscan', title: 'DBSCAN' },
  { id: 'gmm', title: 'Gaussian Mixture Models' },
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
        <p>Group similar data points using unsupervised learning. NeuronDB supports K-means with k-means++ initialization.</p>

        <h3>Train K-means Model</h3>
        <SqlCodeBlock
          title="Train K-means"
          code={`-- Train K-means clustering model
SELECT neurondb_train_kmeans_project(
    'fraud_kmeans',      -- Project name
    'train_data',        -- Training table
    'features',          -- Feature column
    7,                   -- Number of clusters (K)
    50                   -- Maximum iterations
) AS kmeans_model_id;`}
        />

        <h3>View Clustering Results</h3>
        <SqlCodeBlock
          title="Analyze clusters"
          code={`-- Analyze cluster distribution
SELECT 
    cluster,
    COUNT(*) as transactions,
    SUM(CASE WHEN is_fraud THEN 1 ELSE 0 END) as frauds,
    ROUND(100.0 * SUM(CASE WHEN is_fraud THEN 1 ELSE 0 END) / COUNT(*), 2) as fraud_rate
FROM (
    SELECT transaction_id, is_fraud,
           cluster_kmeans('train_data', 'features', 7, 50) as cluster
    FROM train_data
) results
GROUP BY cluster
ORDER BY fraud_rate DESC;`}
        />
      </section>

      <section id="dbscan">
        <h2>DBSCAN</h2>
        <p>Density-based clustering for arbitrary shapes. Automatically detects noise while grouping dense regions.</p>
        <SqlCodeBlock
          title="DBSCAN clustering"
          code={`SELECT *
FROM cluster_dbscan(
  relation      => 'train_data',
  column_name   => 'features',
  eps           => 0.35,
  min_samples   => 12,
  distance      => 'cosine'
);`}
        />
      </section>

      <section id="gmm">
        <h2>Gaussian Mixture Models</h2>
        <p>Probabilistic clustering that models data as a mixture of Gaussian distributions.</p>
        <SqlCodeBlock
          title="GMM clustering"
          code={`SELECT *
FROM cluster_gmm(
  relation      => 'train_data',
  column_name   => 'features',
  n_components  => 5,
  max_iter      => 100
);`}
        />
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
