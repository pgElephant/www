import { baseSEO } from '@/config/seo'

/** Site-wide Person + WebSite JSON-LD for the personal brand. */
export default function PersonSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Person',
              '@id': `${baseSEO.siteUrl}/#person`,
              name: 'Dr. Ibrar Ahmed',
              url: baseSEO.siteUrl,
              image: `${baseSEO.siteUrl}${baseSEO.profileImage}`,
              jobTitle: 'Principal Engineer',
              worksFor: {
                '@type': 'Organization',
                name: 'pgEdge',
              },
              description: baseSEO.defaultDescription,
              sameAs: baseSEO.sameAs,
              knowsAbout: [
                'PostgreSQL',
                'Artificial Intelligence',
                'Cybersecurity',
                'Distributed Systems',
                'High Availability',
                'Database Performance',
              ],
            },
            {
              '@type': 'WebSite',
              '@id': `${baseSEO.siteUrl}/#website`,
              name: baseSEO.siteName,
              url: baseSEO.siteUrl,
              description: baseSEO.defaultDescription,
              inLanguage: 'en-US',
              publisher: { '@id': `${baseSEO.siteUrl}/#person` },
              author: { '@id': `${baseSEO.siteUrl}/#person` },
            },
          ],
        }),
      }}
    />
  )
}
