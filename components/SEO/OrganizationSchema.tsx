import { baseSEO } from '@/config/seo'

/**
 * @deprecated Prefer PersonSchema — kept for any legacy imports.
 * Emits Person (not Organization) for the personal site.
 */
const OrganizationSchema = () => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
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
        }),
      }}
    />
  )
}

export default OrganizationSchema
