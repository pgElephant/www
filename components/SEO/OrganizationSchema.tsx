import React from 'react'

const OrganizationSchema = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "pgElephant",
    "alternateName": "PostgreSQL Elephant",
    "url": "https://www.pgelephant.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.pgelephant.com/favicons/favicon-512.png",
      "width": 512,
      "height": 512
    },
    "description": "Enterprise PostgreSQL high availability platform with automatic failover, MongoDB-compatible document database, and distributed consensus",
    "foundingDate": "2024",
    "sameAs": [
      "https://github.com/pgElephant"
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "Technical Support",
        "url": "https://www.pgelephant.com/contact"
      },
      {
        "@type": "ContactPoint",
        "contactType": "Customer Service",
        "url": "https://www.pgelephant.com/contact"
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "knowsAbout": [
      "PostgreSQL",
      "Database High Availability",
      "Distributed Systems",
      "MongoDB",
      "Database Clustering",
      "Raft Consensus",
      "Database Management",
      "Database Replication",
      "Leader Election",
      "Automatic Failover"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "pgElephant Products",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "SoftwareApplication",
            "name": "RAM",
            "description": "Resilient Adaptive Manager for PostgreSQL clustering"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "SoftwareApplication",
            "name": "RALE",
            "description": "Resilient Adaptive Leader Election for distributed consensus"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "SoftwareApplication",
            "name": "pgraft",
            "description": "Raft-based PostgreSQL extension for leader election"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "SoftwareApplication",
            "name": "pgbalancer",
            "description": "Connection pooling and load balancing for PostgreSQL"
          }
        },
      ]
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(organizationSchema)
      }}
    />
  )
}

export default OrganizationSchema