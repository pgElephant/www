import React from 'react'

const ProductSchema = () => {
  const products = [
    {
      name: "pgraft",
      description: "Raft-based PostgreSQL extension for leader election and distributed consensus",
      category: "Database Extension",
      url: "https://www.pgelephant.com/pgraft/",
      image: "https://www.pgelephant.com/ico/pgsql_raft_leader_HD.ico",
      offers: {
        price: "0",
        priceCurrency: "USD",
        availability: "InStock"
      }
    },
    {
      name: "pgbalancer",
      description: "Connection pooling and load balancing solution for PostgreSQL",
      category: "Database Management Software",
      url: "https://www.pgelephant.com/pgbalancer/",
      image: "https://www.pgelephant.com/ico/pgbalancer_HD.ico",
      offers: {
        price: "0",
        priceCurrency: "USD",
        availability: "InStock"
      }
    },
    {
      name: "FauxDB",
      description: "MongoDB-compatible document database powered by Rust and PostgreSQL",
      category: "Database Management Software",
      url: "https://www.pgelephant.com/fauxdb/",
      image: "https://www.pgelephant.com/ico/FauxDB_HD.ico",
      offers: {
        price: "0",
        priceCurrency: "USD",
        availability: "InStock"
      }
    }
  ]

  const productSchemas = products.map((product, index) => ({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": product.name,
    "description": product.description,
    "url": product.url,
    "image": product.image,
    "applicationCategory": product.category,
    "operatingSystem": ["Linux", "macOS", "Windows", "Docker", "Kubernetes"],
    "offers": {
      "@type": "Offer",
      "price": product.offers.price,
      "priceCurrency": product.offers.priceCurrency,
      "availability": `https://schema.org/${product.offers.availability}`,
      "url": product.url
    },
    "creator": {
      "@type": "Organization",
      "name": "pgElephant Team",
      "url": "https://www.pgelephant.com"
    },
    "softwareVersion": "1.0.0",
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0],
    "downloadUrl": "https://www.pgelephant.com/download",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "ratingCount": "1",
      "bestRating": "5",
      "worstRating": "1"
    },
    "featureList": [
      "PostgreSQL High Availability",
      "Automatic Failover", 
      "Distributed Consensus",
      "Zero Downtime Operations",
      "Enterprise Security"
    ]
  }))

  return (
    <>
      {productSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema)
          }}
        />
      ))}
    </>
  )
}

export default ProductSchema