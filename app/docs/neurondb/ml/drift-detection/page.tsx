import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'Drift Detection | NeuronDB ML Algorithms',
  description: 'Monitor data distribution changes over time to detect concept drift using centroid drift, distribution divergence, and temporal monitoring.',
}

const tableOfContents: TocItem[] = [
  { id: 'overview', title: 'Overview' },
  { id: 'centroid-drift', title: 'Centroid Drift' },
  { id: 'distribution-divergence', title: 'Distribution Divergence' },
  { id: 'temporal-monitoring', title: 'Temporal Monitoring' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/ml/quality-metrics',
  label: 'Quality Metrics',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/ml/topic-discovery',
  label: 'Topic Discovery',
}

export default function DriftDetectionPage() {
  return (
    <PostgresDocsLayout
      title="Drift Detection"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="overview">
        <h2>Overview</h2>
        <p>Monitor data distribution changes over time to detect concept drift.</p>
      </section>

      <section id="centroid-drift">
        <h2>Centroid Drift</h2>
        <p>Detect changes in data center:</p>
        <SqlCodeBlock
          title="Detect centroid drift"
          code={`-- Detect centroid drift
SELECT centroid_drift_detection(
    'reference_table',
    'current_table',
    'features',
    0.1  -- threshold
);`}
        />
      </section>

      <section id="distribution-divergence">
        <h2>Distribution Divergence</h2>
        <p>Measure distribution differences:</p>
        <SqlCodeBlock
          title="KL divergence detection"
          code={`-- KL divergence detection
SELECT distribution_divergence(
    'reference_table',
    'current_table',
    'features',
    'kl'  -- divergence type
);`}
        />
      </section>

      <section id="temporal-monitoring">
        <h2>Temporal Monitoring</h2>
        <p>Track drift over time:</p>
        <SqlCodeBlock
          title="Monitor drift over time windows"
          code={`-- Monitor drift over time windows
SELECT temporal_drift_monitor(
    'time_series_table',
    'features',
    'timestamp_column',
    INTERVAL '1 day'  -- window size
);`}
        />
      </section>

      <section>
        <h2>Learn More</h2>
        <p>
          For detailed documentation on drift detection methods, setting thresholds, alerting, and model retraining strategies, visit:{' '}
          <a href="https://pgelephant.com/neurondb/analytics/drift/" target="_blank" rel="noopener noreferrer">
            Drift Detection Documentation
          </a>
        </p>
      </section>

      <section>
        <h2>Related Topics</h2>
        <ul>
          <li><a href="/docs/neurondb/ml/outlier-detection">Outlier Detection</a> - Detect anomalies</li>
          <li><a href="/docs/neurondb/ml/quality-metrics">Quality Metrics</a> - Monitor data quality</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}

