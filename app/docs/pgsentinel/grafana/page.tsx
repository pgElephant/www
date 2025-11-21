import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import BashCodeBlock from '../../../../components/BashCodeBlock'

export const metadata: Metadata = {
  title: 'pgSentinel Grafana Integration',
  description: 'Import pgSentinel dashboards and connect Prometheus data sources in Grafana.',
}

const tableOfContents: TocItem[] = [
  { id: 'configure-datasource', title: 'Configure Prometheus Data Source' },
  { id: 'provision-dashboards', title: 'Provision Dashboards' },
  { id: 'customise-panels', title: 'Customise Panels' },
]

const prevLink: NavLink = {
  href: '/docs/pgsentinel/dashboard',
  label: 'Dashboard',
}

const nextLink: NavLink = {
  href: '/docs/pgsentinel/troubleshooting',
  label: 'Troubleshooting',
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

const importDashboard = `curl -L https://raw.githubusercontent.com/pgElephant/pgsentinel/main/grafana/pgsentinel.json \\
  -o /var/lib/grafana/dashboards/pgsentinel/pgsentinel.json
chown grafana:grafana /var/lib/grafana/dashboards/pgsentinel/pgsentinel.json`; 

const PgSentinelGrafanaPage = () => {
  return (
    <PostgresDocsLayout
      title="Grafana Integration"
      version="pgSentinel Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="configure-datasource">
        <h2>Configure Prometheus Data Source</h2>
        <p>
          Provision Grafana with a Prometheus data source pointing to the pgSentinel scrape endpoint.
        </p>
        <BashCodeBlock title="datasource.yaml" code={datasource} />
      </section>

      <section id="provision-dashboards">
        <h2>Provision Dashboards</h2>
        <p>
          Enable automatic dashboard loading on Grafana restart.
        </p>
        <BashCodeBlock title="dashboard.yaml" code={dashboardProvisioning} />
        <BashCodeBlock title="Download dashboard" code={importDashboard} />
      </section>

      <section id="customise-panels">
        <h2>Customise Panels</h2>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Clone the default dashboard and adjust pool filters to focus on production vs staging.</li>
          <li>Add annotations for deploy events by connecting to your CI system's webhook.</li>
          <li>Pin the <em>Wait Queue</em> panel to the home dashboard for at-a-glance saturation monitoring.</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}

export default PgSentinelGrafanaPage
