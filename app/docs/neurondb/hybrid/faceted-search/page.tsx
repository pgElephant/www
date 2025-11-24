import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'Faceted Search | NeuronDB Hybrid Search',
  description: 'Category-aware retrieval with filtering using faceted search in NeuronDB.',
}

const tableOfContents: TocItem[] = [
  { id: 'overview', title: 'Overview' },
  { id: 'faceted-search-query', title: 'Faceted Search Query' },
  { id: 'multiple-facets', title: 'Multiple Facets' },
  { id: 'facet-aggregation', title: 'Facet Aggregation' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/hybrid/multi-vector',
  label: 'Multi-Vector',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/hybrid/temporal-search',
  label: 'Temporal Search',
}

export default function FacetedSearchPage() {
  return (
    <PostgresDocsLayout
      title="Faceted Search"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="overview">
        <h2>Overview</h2>
        <p>Category-aware retrieval with filtering.</p>
      </section>

      <section id="faceted-search-query">
        <h2>Faceted Search Query</h2>
        <SqlCodeBlock
          title="Faceted search with category filtering"
          code={`-- Faceted search with category filtering
SELECT * FROM faceted_search(
    'documents',
    embed_text('query'),
    '{"category": "AI", "language": "en"}'::jsonb,
    10
);`}
        />
      </section>

      <section id="multiple-facets">
        <h2>Multiple Facets</h2>
        <p>Filter by multiple categories:</p>
        <SqlCodeBlock
          title="Multi-facet search"
          code={`-- Multi-facet search
SELECT * FROM faceted_search(
    'documents',
    embed_text('machine learning'),
    '{
        "category": ["AI", "ML"],
        "year": [2023, 2024],
        "status": "published"
    }'::jsonb,
    20
);`}
        />
      </section>

      <section id="facet-aggregation">
        <h2>Facet Aggregation</h2>
        <p>Get facet counts:</p>
        <SqlCodeBlock
          title="Get facet distribution"
          code={`-- Get facet distribution
SELECT facet_counts(
    'documents',
    '{"category": "AI"}'::jsonb,
    ARRAY['year', 'language']
) AS facet_stats;`}
        />
      </section>

      <section>
        <h2>Learn More</h2>
        <p>
          For detailed documentation on faceted search, facet hierarchies, filtering strategies, and performance optimization, visit:{' '}
          <a href="https://www.pgelephant.com/docs/neurondb/hybrid/faceted-search" target="_blank" rel="noopener noreferrer">
            Faceted Search Documentation
          </a>
        </p>
      </section>

      <section>
        <h2>Related Topics</h2>
        <ul>
          <li><a href="/docs/neurondb/hybrid/overview">Hybrid Search</a> - Combined search strategies</li>
          <li><a href="/docs/neurondb/hybrid/temporal-search">Temporal Search</a> - Time-based filtering</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}

