/**
 * Product Page Template
 * 
 * Unified product page template using theme configuration.
 * Replaces ProjectTemplate with theme-aware components.
 */

import React from 'react'
import Link from 'next/link'
import HeroTemplate from '@/components/templates/HeroTemplate'
import SectionTemplate from '@/components/templates/SectionTemplate'
import { getProductTheme, type ProductId } from '@/config/theme'
import { getProduct } from '@/config/products'
import { FeatureCard, DocCard, CardGrid } from '@/components/ui/cards'
import { PrimaryButtonLink, SecondaryButtonLink } from '@/components/ui/buttons'
import { getProductIcon } from '@/components/ProductIcons'

// ============================================================================
// TYPES
// ============================================================================

export interface ProductPageTemplateProps {
  productId: ProductId
  hero: {
    title?: string | React.ReactNode
    subtitle?: string
    icon?: React.ReactNode
    customContent?: React.ReactNode
  }
  badges?: string[]
  demo?: React.ReactNode
  componentCards?: Array<{
    title: string
    description: string[]
    href: string
    icon?: React.ReactNode
  }>
  architecture?: React.ReactNode | {
    title?: string
    subtitle?: string
    content: React.ReactNode
  }
  featurePillars?: {
    kicker?: string
    items: Array<{ title: string; desc: string }>
  }
  features?: Array<{
    icon?: React.ReactNode
    iconColor?: string
    title: string
    desc: string
  }>
  featureMatrix?: React.ReactNode | {
    title?: string
    subtitle?: string
    content: React.ReactNode
  }
  featureComparison?: React.ReactNode | {
    title?: string
    subtitle?: string
    content: React.ReactNode
  }
  docsLinks?: Array<{ href: string; title: string; desc: string; external?: boolean }>
  ctaSection?: {
    kicker?: string
    title: string
    description?: string
    primaryCTA: { href: string; label: string; external?: boolean }
    secondaryCTA?: { href: string; label: string; external?: boolean }
  }
}

// ============================================================================
// COMPONENT
// ============================================================================

export default function ProductPageTemplate({
  productId,
  hero,
  badges,
  demo,
  componentCards,
  architecture,
  featurePillars,
  features,
  featureMatrix,
  featureComparison,
  docsLinks,
  ctaSection,
}: ProductPageTemplateProps) {
  const product = getProduct(productId)
  if (!product) {
    throw new Error(`Product ${productId} not found`)
  }
  const theme = getProductTheme(productId)
  const ProductIcon = getProductIcon(productId)

  // Default hero title if not provided
  const heroTitle = hero.title || (
    <>
      {product.displayName}: {product.tagline}
    </>
  )

  // Default hero icon if not provided
  const heroIcon = hero.icon || (ProductIcon ? <ProductIcon size={80} /> : null)

  return (
    <div>
      {/* Hero Section */}
      <HeroTemplate
        overlay={false}
        className="text-white text-center"
        height="product"
      >
        <div className="container-extra-wide relative z-10 w-full">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
              {heroTitle}
            </h1>
            {hero.subtitle && (
              <p className="text-lg md:text-xl font-normal text-white mb-6 max-w-2xl mx-auto drop-shadow-lg">
                {hero.subtitle}
              </p>
            )}
          </div>
        </div>
      </HeroTemplate>

      {/* Demo Section */}
      {demo && (
        <SectionTemplate background="page" padding="xl">
          <div className="container-wide">
            <div className="max-w-4xl mx-auto">
              {demo}
            </div>
          </div>
        </SectionTemplate>
      )}

      {/* Component Cards Section */}
      {componentCards && componentCards.length > 0 && (
        <SectionTemplate background="page" padding="xl">
          <div className="container-wide">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                NeuronDB Ecosystem
              </h2>
              <p className="text-lg text-white/90 max-w-3xl mx-auto mb-4">
                Complete AI database platform with core engine and runtime components
              </p>
              <div className="mx-auto h-1 w-28 bg-slate-400 rounded" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {componentCards.map((card, index) => (
                <Link
                  key={index}
                  href={card.href}
                  className="group bg-slate-800/60 border border-slate-700 rounded-xl p-6 hover:bg-slate-800/80 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1"
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-start gap-4 mb-4">
                      {card.icon && (
                        <div className="flex-shrink-0">
                          {card.icon}
                        </div>
                      )}
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {card.title}
                      </h3>
                    </div>
                    <ul className="flex-1 space-y-2 mb-4">
                      {card.description.map((line, i) => (
                        <li key={i} className="text-slate-300 text-sm leading-relaxed flex items-start">
                          <span className="text-cyan-400 mr-2 flex-shrink-0">•</span>
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto text-cyan-400 text-sm font-semibold group-hover:text-cyan-300 transition-colors">
                      Learn more →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </SectionTemplate>
      )}

      {/* Architecture Diagram */}
      {architecture && (
        <SectionTemplate background="page" padding="xl">
          <div className="container-wide">
            {typeof architecture === 'object' && 'content' in architecture ? (
              <>
                {(architecture.title || architecture.subtitle) && (
                  <div className="text-center mb-14">
                    {architecture.title && (
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                        {architecture.title}
                      </h2>
                    )}
                    {architecture.subtitle && (
                      <p className="text-lg text-white/90 max-w-3xl mx-auto mb-4">
                        {architecture.subtitle}
                      </p>
                    )}
                    <div className="mx-auto h-1 w-28 bg-slate-400 rounded" />
                  </div>
                )}
                {architecture.content}
              </>
            ) : (
              architecture
            )}
          </div>
        </SectionTemplate>
      )}

      {/* High-Level Feature Pillars */}
      {featurePillars && (
        <SectionTemplate background="page" padding="xl" className="relative overflow-hidden">
          <div className="container-wide">
            <div className="text-center mb-14">
              {featurePillars.kicker && (
                <div className={`text-xs tracking-wider font-semibold text-${theme.primaryColor} uppercase mb-2`}>
                  {featurePillars.kicker}
                </div>
              )}
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Why {product.displayName}
              </h2>
              <div className="mx-auto h-1 w-28 bg-slate-400 rounded" />
            </div>
            <CardGrid columns={3} gap="md">
              {featurePillars.items.map((item, i) => (
                <FeatureCard
                  key={i}
                  title={item.title}
                  description={item.desc}
                  productId={productId}
                />
              ))}
            </CardGrid>
          </div>
        </SectionTemplate>
      )}

      {/* Feature Matrix */}
      {featureMatrix && (
        <SectionTemplate background="page" padding="xl">
          <div className="container-wide">
            {typeof featureMatrix === 'object' && 'content' in featureMatrix ? (
              <>
                {(featureMatrix.title || featureMatrix.subtitle) && (
                  <div className="text-center mb-14">
                    {featureMatrix.title && (
                      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                        {featureMatrix.title}
                      </h2>
                    )}
                    {featureMatrix.subtitle && (
                      <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-4">
                        {featureMatrix.subtitle}
                      </p>
                    )}
                    <div className="mx-auto h-1 w-28 bg-slate-400 rounded" />
                  </div>
                )}
                {featureMatrix.content}
              </>
            ) : (
              featureMatrix
            )}
          </div>
        </SectionTemplate>
      )}

      {/* Feature Comparison */}
      {featureComparison && (
        <SectionTemplate background="page" padding="xl">
          <div className="container-wide">
            {typeof featureComparison === 'object' && 'content' in featureComparison ? (
              <>
                {(featureComparison.title || featureComparison.subtitle) && (
                  <div className="text-center mb-14">
                    {featureComparison.title && (
                      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                        {featureComparison.title}
                      </h2>
                    )}
                    {featureComparison.subtitle && (
                      <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-4">
                        {featureComparison.subtitle}
                      </p>
                    )}
                    <div className="mx-auto h-1 w-28 bg-slate-400 rounded" />
                  </div>
                )}
                {featureComparison.content}
              </>
            ) : (
              featureComparison
            )}
          </div>
        </SectionTemplate>
      )}

      {/* Features Grid */}
      {features && features.length > 0 && (
        <SectionTemplate background="page" padding="xl">
          <div className="container-wide">
            <div className="text-center mb-14">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                Key Features
              </h2>
              <div className="mx-auto h-1 w-28 bg-slate-400 rounded" />
            </div>
            <CardGrid columns={3} gap="md">
              {features.map((feature, i) => (
                <FeatureCard
                  key={i}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.desc}
                  productId={productId}
                />
              ))}
            </CardGrid>
          </div>
        </SectionTemplate>
      )}

      {/* Documentation Links */}
      {docsLinks && docsLinks.length > 0 && (
        <SectionTemplate background="page" padding="xl">
          <div className="container-wide">
            <div className="text-center mb-14">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                Documentation
              </h2>
              <div className="mx-auto h-1 w-28 bg-slate-400 rounded" />
            </div>
            <CardGrid columns={3} gap="md">
              {docsLinks.map((link, i) => (
                <DocCard
                  key={i}
                  title={link.title}
                  description={link.desc}
                  href={link.href}
                  external={link.external}
                  productId={productId}
                />
              ))}
            </CardGrid>
          </div>
        </SectionTemplate>
      )}

      {/* CTA Section */}
      {ctaSection && (
        <SectionTemplate background="page" padding="xl">
          <div className="container-wide">
            <div className="max-w-4xl mx-auto text-center">
              {ctaSection.kicker && (
                <div className={`text-xs tracking-wider font-semibold text-${theme.primaryColor} uppercase mb-2`}>
                  {ctaSection.kicker}
                </div>
              )}
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {ctaSection.title}
              </h2>
              {ctaSection.description && (
                <p className="text-lg text-white/90 mb-8">
                  {ctaSection.description}
                </p>
              )}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <PrimaryButtonLink
                  href={ctaSection.primaryCTA.href}
                  external={ctaSection.primaryCTA.external}
                  size="lg"
                >
                  {ctaSection.primaryCTA.label}
                </PrimaryButtonLink>
                {ctaSection.secondaryCTA && (
                  <SecondaryButtonLink
                    href={ctaSection.secondaryCTA.href}
                    external={ctaSection.secondaryCTA.external}
                    size="lg"
                  >
                    {ctaSection.secondaryCTA.label}
                  </SecondaryButtonLink>
                )}
              </div>
            </div>
          </div>
        </SectionTemplate>
      )}
    </div>
  )
}

