import React from 'react'

interface ProductSchemaProps {
  name: string
  description: string
  version?: string
  category?: string
  operatingSystem?: string[]
  price?: string
  currency?: string
  downloadUrl?: string
  author?: string
  datePublished?: string
  dateModified?: string
  keywords?: string[]
  features?: string[]
  requirements?: string[]
  license?: string
  rating?: {
    value: number
    count: number
    bestRating?: number
    worstRating?: number
  }
}

const ProductSchema: React.FC<ProductSchemaProps> = ({
  name,
  description,
  version = 'latest',
  category = 'DatabaseApplication',
  operatingSystem = ['Linux', 'macOS', 'Windows'],
  price = '0',
  currency = 'USD',
  downloadUrl,
  author = 'pgElephant',
  datePublished,
  dateModified,
  keywords = [],
  features = [],
  requirements = [],
  license = 'Open Source',
  rating
}) => {
  const baseUrl = 'https://www.pgelephant.com'
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    softwareVersion: version,
    applicationCategory: category,
    applicationSubCategory: 'Database Management System',
    operatingSystem: operatingSystem.join(', '),
    url: baseUrl,
    downloadUrl: downloadUrl || `${baseUrl}/download`,
    screenshot: `${baseUrl}/og-image.jpg`,
    image: [
      `${baseUrl}/og-image.jpg`,
      `${baseUrl}/logo.png`
    ],
    author: {
      '@type': 'Organization',
      name: author,
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`
      }
    },
    publisher: {
      '@type': 'Organization',
      name: 'pgElephant',
      url: baseUrl
    },
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: currency,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      url: downloadUrl || `${baseUrl}/download`,
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'US',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 30,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn'
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: 'USD'
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'US'
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 0,
            unitCode: 'DAY'
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 0,
            unitCode: 'DAY'
          }
        }
      }
    },
    datePublished,
    dateModified: dateModified || datePublished,
    keywords: keywords.join(', '),
    featureList: features,
    softwareRequirements: requirements,
    license,
    ...(rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: rating.value,
        reviewCount: rating.count,
        bestRating: rating.bestRating || 5,
        worstRating: rating.worstRating || 1
      }
    }),
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Programming Language',
        value: name === 'FauxDB' ? 'Rust' : 'C, Go'
      },
      {
        '@type': 'PropertyValue',
        name: 'Database Type',
        value: name === 'FauxDB' ? 'Document Database' : 'Relational Database'
      },
      {
        '@type': 'PropertyValue',
        name: 'License Type',
        value: 'Open Source'
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData, null, 2) }}
    />
  )
}

export default ProductSchema