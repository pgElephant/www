import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'ML Analytics Suite | NeuronDB',
  description: 'Comprehensive machine learning algorithms for clustering, dimensionality reduction, outlier detection, and embedding quality assessment, all in SQL.',
}

const tableOfContents: TocItem[] = [
  { id: 'clustering', title: 'Clustering Algorithms' },
  { id: 'outlier-detection', title: 'Outlier Detection' },
  { id: 'dimensionality-reduction', title: 'Dimensionality Reduction' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/performance',
  label: 'Performance',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/ml',
  label: 'ML Functions',
}

export default function NeuronDBAnalyticsPage() {
  return (
    <PostgresDocsLayout
      title="ML Analytics Suite"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="clustering">
        <h2>Clustering Algorithms</h2>

        <h3>K-Means Clustering</h3>
        <p>Lloyd's K-Means with k-means++ initialization for finding customer segments, topic clusters, and data grouping.</p>
        <SqlCodeBlock
          title="K-Means clustering"
          code={`-- K-Means clustering
SELECT cluster_kmeans(
  'train_data',   -- table with vectors
  'features',     -- vector column
  7,              -- K clusters
  50              -- max iterations
);

-- Project-based training and versioning
SELECT neurondb_train_kmeans_project(
  'fraud_kmeans',   -- project name
  'train_data',
  'features',
  7,
  50
) AS model_id;

-- List models for a project
SELECT version, algorithm, parameters, is_deployed
FROM neurondb_list_project_models('fraud_kmeans')
ORDER BY version;`}
        />
        <ul>
          <li><strong>Time Complexity:</strong> O(n·k·i·d)</li>
          <li><strong>Initialization:</strong> k-means++</li>
          <li><strong>Project Models:</strong> Versioned training runs</li>
        </ul>

        <h3>DBSCAN</h3>
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
        <ul>
          <li>No need to specify cluster count. DBSCAN finds density-based groupings</li>
          <li>Handles noise and outliers automatically</li>
          <li>Works well with non-spherical clusters</li>
        </ul>
      </section>

      <section id="outlier-detection">
        <h2>Outlier Detection</h2>

        <h3>Z-Score Outlier Detection</h3>
        <SqlCodeBlock
          title="Z-score outliers"
          code={`SELECT *
FROM detect_outliers_zscore(
  (SELECT embedding FROM documents),
  2.5  -- threshold
);`}
        />

        <h3>Isolation Forest</h3>
        <SqlCodeBlock
          title="Isolation forest"
          code={`SELECT *
FROM detect_outliers_isolation_forest(
  (SELECT embedding FROM documents),
  100  -- n_estimators
);`}
        />
      </section>

      <section id="dimensionality-reduction">
        <h2>Dimensionality Reduction</h2>

        <h3>PCA (Principal Component Analysis)</h3>
        <SqlCodeBlock
          title="PCA"
          code={`SELECT *
FROM reduce_pca(
  (SELECT embedding FROM documents),
  50  -- target dimensions
);`}
        />
      </section>

      <section>
        <h2>Next Steps</h2>
        <ul>
          <li><a href="/docs/neurondb/ml">ML Functions</a> - Complete ML API reference</li>
          <li><a href="/docs/neurondb/ml/clustering">Clustering Guide</a> - Detailed clustering documentation</li>
          <li><a href="/docs/neurondb/performance">Performance</a> - Optimize ML operations</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}
