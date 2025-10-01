import React from 'react'

const OrganizationSchema: React.FC = () => {
  const baseUrl = 'https://www.pgelephant.com'
  
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'pgElephant',
    alternateName: 'pgElephant Team',
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/logo.png`,
      width: 200,
      height: 200
    },
    image: {
      '@type': 'ImageObject',
      url: `${baseUrl}/og-image.jpg`,
      width: 1200,
      height: 630
    },
    description: 'pgElephant provides enterprise-grade PostgreSQL solutions including RAM clustering, RALE distributed consensus, pgraft Raft extension, and FauxDB MongoDB-compatible document database.',
    foundingDate: '2024',
    founder: {
      '@type': 'Person',
      name: 'pgElephant Team'
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        url: `${baseUrl}/contact`,
        availableLanguage: 'English'
      },
      {
        '@type': 'ContactPoint',
        contactType: 'technical support',
        url: 'https://github.com/pgElephant',
        availableLanguage: 'English'
      }
    ],
    sameAs: [
      'https://github.com/pgElephant',
      'https://twitter.com/pgElephant',
      'https://linkedin.com/company/pgelephant'
    ],
    knowsAbout: [
      'PostgreSQL',
      'Database Management',
      'High Availability',
      'Distributed Systems',
      'Raft Consensus',
      'MongoDB Compatibility',
      'Database Clustering',
      'Failover Systems',
      'Document Databases',
      'Relational Databases'
    ],
    areaServed: 'Worldwide',
    serviceType: 'Database Software Development',
    makesOffer: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'SoftwareApplication',
          name: 'RAM',
          description: 'PostgreSQL clustering solution with automatic failover'
        },
        price: '0',
        priceCurrency: 'USD'
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'SoftwareApplication',
          name: 'RALE',
          description: 'Distributed consensus and leader election system'
        },
        price: '0',
        priceCurrency: 'USD'
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'SoftwareApplication',
          name: 'pgraft',
          description: 'PostgreSQL extension implementing Raft consensus protocol'
        },
        price: '0',
        priceCurrency: 'USD'
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'SoftwareApplication',
          name: 'FauxDB',
          description: 'MongoDB-compatible document database built in Rust'
        },
        price: '0',
        priceCurrency: 'USD'
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData, null, 2) }}
    />
  )
}

export default OrganizationSchema