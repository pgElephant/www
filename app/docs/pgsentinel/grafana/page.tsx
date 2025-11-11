import React from 'react'
import DocsContentLayout from '../../../../components/DocsContentLayout'
import BashCodeBlock from '../../../../components/BashCodeBlock'
import { PgSentinelIcon } from '../../../../components/ProductIcons'

export const metadata = {
  title: 'pgSentinel Grafana Integration',
  description: 'Import pgSentinel dashboards and connect Prometheus data sources in Grafana.',
}

const datasource = `apiVersion: 1
datasources:
  - name: Prometheus
    type: prometheus
    access: proxy
    url: http://prometheus:9090
    editable: false`;

const dashboardProvisioning = `apiVersion: 1
dashboards:
  - name: pgSentinel
    orgId: 1
    folder: PostgreSQL
    options:
      path: /var/lib/grafana/dashboards/pgsentinel`;

const importDashboard = `curl -L https://raw.githubusercontent.com/pgElephant/pgsentinel/main/grafana/pgsentinel.json \
  -o /var/lib/grafana/dashboards/pgsentinel/pgsentinel.json
chown grafana:grafana /var/lib/grafana/dashboards/pgsentinel/pgsentinel.json`; 

const PgSentinelGrafanaPage = () => {
  return (
    <DocsContentLayout
      hero={{
        badgeLabel: 'pgSentinel',
        badgeIcon: <PgSentinelIcon size={20} />, 
        badgeTone: 'emerald',
        title: 'Grafana Integration',
        description:
          'Provision Prometheus data sources, import the pgSentinel dashboard, and customise panels for pgBouncer observability.',
      }}
      contentWidth="wide"
    >
      <div className="space-y-12">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">1. Configure Prometheus Data Source</h2>
          <p className="text-muted-foreground">
            Provision Grafana with a Prometheus data source pointing to the pgSentinel scrape endpoint.
          </p>
          <BashCodeBlock title="datasource.yaml" code={datasource} />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">2. Provision Dashboards</h2>
          <p className="text-muted-foreground">
            Enable automatic dashboard loading on Grafana restart.
          </p>
          <BashCodeBlock title="dashboard.yaml" code={dashboardProvisioning} />
          <BashCodeBlock title="Download dashboard" code={importDashboard} />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">3. Customise Panels</h2>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>Clone the default dashboard and adjust pool filters to focus on production vs staging.</li>
            <li>Add annotations for deploy events by connecting to your CI system’s webhook.</li>
            <li>Pin the <em>Wait Queue</em> panel to the home dashboard for at-a-glance saturation monitoring.</li>
          </ul>
        </section>
      </div>
    </DocsContentLayout>
  )
}

export default PgSentinelGrafanaPage
