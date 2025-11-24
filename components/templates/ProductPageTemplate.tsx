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
  architecture?: React.ReactNode
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
  featureMatrix?: React.ReactNode
  featureComparison?: React.ReactNode
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
  architecture,
  featurePillars,
  features,
  featureMatrix,
  featureComparison,
  docsLinks,
  ctaSection,
}: ProductPageTemplateProps) {
  const product = getProduct(productId)
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
        backgroundImage="/hero-bg-technical.svg"
        overlay={true}
        className="py-16 text-white"
      >
        <div className="container-extra-wide pt-20 pb-16 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
              {/* Left side - Icon */}
              {heroIcon && (
                <div className="flex-shrink-0">
                  <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-2xl">
                    {heroIcon}
                  </div>
                </div>
              )}

              {/* Right side - Content */}
              <div className="flex-1 text-center lg:text-left">
                <div className="text-4xl lg:text-5xl font-bold tracking-tight mb-4 drop-shadow-lg">
                  {heroTitle}
                </div>
                {hero.subtitle && (
                  <div className="text-lg lg:text-xl font-semibold text-white/90 mb-8 leading-relaxed drop-shadow-lg">
                    {hero.subtitle}
                  </div>
                )}

                {hero.customContent}

                {demo && (
                  <div className="max-w-4xl mx-auto lg:mx-0">
                    {demo}
                  </div>
                )}

                {/* Badges */}
                {badges && badges.length > 0 && (
                  <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-2">
                    {badges.map((badge, i) => (
                      <span
                        key={i}
                        className={`inline-block bg-gradient-to-r ${theme.badgeGradient} text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/20 shadow-sm`}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </HeroTemplate>

      {/* Architecture Diagram */}
      {architecture && (
        <SectionTemplate background="hero" padding="xl">
          <div className="container-wide">
            {architecture}
          </div>
        </SectionTemplate>
      )}

      {/* High-Level Feature Pillars */}
      {featurePillars && (
        <SectionTemplate background="hero" padding="xl" className="relative overflow-hidden">
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
            {featureMatrix}
          </div>
        </SectionTemplate>
      )}

      {/* Feature Comparison */}
      {featureComparison && (
        <SectionTemplate background="page" padding="xl">
          <div className="container-wide">
            {featureComparison}
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
        <SectionTemplate background="hero" padding="xl">
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

