import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'Time Series | NeuronDB ML Algorithms',
  description: 'Forecast and analyze time series data using ARIMA, moving averages, exponential smoothing, and trend detection in NeuronDB.',
}

const tableOfContents: TocItem[] = [
  { id: 'overview', title: 'Overview' },
  { id: 'forecasting', title: 'Time Series Forecasting' },
  { id: 'moving-average', title: 'Moving Average' },
  { id: 'exponential-smoothing', title: 'Exponential Smoothing' },
  { id: 'trend-detection', title: 'Trend Detection' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/ml/topic-discovery',
  label: 'Topic Discovery',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/ml/recommendation-systems',
  label: 'Recommendation Systems',
}

export default function TimeSeriesPage() {
  return (
    <PostgresDocsLayout
      title="Time Series"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="overview">
        <h2>Overview</h2>
        <p>Forecast and analyze time series data.</p>
      </section>

      <section id="forecasting">
        <h2>Time Series Forecasting</h2>
        <p>Predict future values:</p>
        <SqlCodeBlock
          title="ARIMA forecasting"
          code={`-- ARIMA forecasting
SELECT arima_forecast(
    'time_series_table',
    'value_column',
    'timestamp_column',
    10  -- forecast horizon
);`}
        />
      </section>

      <section id="moving-average">
        <h2>Moving Average</h2>
        <p>Calculate moving averages:</p>
        <SqlCodeBlock
          title="Simple moving average"
          code={`-- Simple moving average
SELECT timestamp,
       value,
       moving_average(value, 7) OVER (ORDER BY timestamp) AS ma_7
FROM time_series;`}
        />
      </section>

      <section id="exponential-smoothing">
        <h2>Exponential Smoothing</h2>
        <SqlCodeBlock
          title="Exponential smoothing forecast"
          code={`-- Exponential smoothing forecast
SELECT exponential_smoothing_forecast(
    'time_series_table',
    'value',
    'timestamp',
    10,
    0.3  -- alpha (smoothing factor)
);`}
        />
      </section>

      <section id="trend-detection">
        <h2>Trend Detection</h2>
        <SqlCodeBlock
          title="Detect trends"
          code={`-- Detect trends
SELECT detect_trend(
    'time_series_table',
    'value',
    'timestamp'
) AS trend_direction;  -- 'up', 'down', 'stable'`}
        />
      </section>

      <section>
        <h2>Learn More</h2>
        <p>
          For detailed documentation on time series analysis, forecasting models, seasonality detection, and anomaly detection in time series, visit:{' '}
          <a href="https://www.pgelephant.com/docs/neurondb/ml/time-series" target="_blank" rel="noopener noreferrer">
            Time Series Documentation
          </a>
        </p>
      </section>

      <section>
        <h2>Related Topics</h2>
        <ul>
          <li><a href="/docs/neurondb/ml/outlier-detection">Outlier Detection</a> - Detect anomalies in time series</li>
          <li><a href="/docs/neurondb/ml/drift-detection">Drift Detection</a> - Detect distribution changes</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}

