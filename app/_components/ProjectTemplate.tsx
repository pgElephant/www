import React from 'react';
import Link from 'next/link';
import HeroTemplate from '@/components/templates/HeroTemplate';
import SectionTemplate from '@/components/templates/SectionTemplate';

type SectionHeadingProps = {
  children: React.ReactNode;
  kicker?: string;
  className?: string;
};
function SectionHeading({ children, kicker, className = '' }: SectionHeadingProps) {
  return (
    <div className={`text-center mb-14 ${className}`}>
      {kicker && <div className="text-xs tracking-wider font-semibold text-indigo-500 uppercase mb-2">{kicker}</div>}
      <h2 className={`text-2xl md:text-3xl font-bold ${className === 'text-white' ? 'text-white' : 'text-slate-900'} mb-3`}>{children}</h2>
      <div className="mx-auto h-1 w-28 bg-slate-400 rounded" />
    </div>
  );
}

type FeatureCardProps = {
  title: string;
  desc: string;
};
function FeatureCard({ title, desc }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-200 p-6 flex flex-col">
      <h4 className="font-semibold text-lg mb-2 text-slate-900">{title}</h4>
      <p className="text-slate-600 text-sm leading-relaxed flex-1">{desc}</p>
    </div>
  );
}

type BadgeProps = {
  children: React.ReactNode;
};
function Badge({ children }: BadgeProps) {
  return <span className="inline-block bg-slate-100 text-slate-700 text-xs font-medium px-2.5 py-1 rounded-md border border-slate-200 mr-2 mb-2">{children}</span>;
}

type ProjectTemplateProps = {
  hero: {
    title: string | React.ReactNode;
    subtitle?: string;
    projectName: string;
    icon?: React.ReactNode;
  };
  badges?: string[];
  demo?: React.ReactNode;
  architecture?: React.ReactNode;
  featurePillars?: {
    kicker?: string;
    items: { title: string; desc: string }[];
  };
  features?: { icon: React.ReactNode; iconColor: string; title: string; desc: string }[];
  featureMatrix?: React.ReactNode;
  featureComparison?: React.ReactNode;
  docsLinks?: { href: string; title: string; desc: string }[];
  ctaSection?: {
    kicker?: string;
    title: string;
    description?: string;
    primaryCTA: { href: string; label: string; external?: boolean };
    secondaryCTA?: { href: string; label: string; external?: boolean };
  };
};

export default function ProjectTemplate({
  hero,
  badges,
  demo,
  architecture,
  featurePillars,
  features,
  featureMatrix,
  featureComparison,
  docsLinks,
  ctaSection
}: ProjectTemplateProps) {
  return (
    <div>
      {/* Hero */}
      <HeroTemplate
        backgroundImage="/hero-bg-technical.svg"
        overlay={true}
        className="py-16 text-white"
      >
                <div className="container-extra-wide pt-20 pb-16 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
              {/* Left side - Icon */}
              {hero.icon && (
                <div className="flex-shrink-0">
                  <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-2xl">
                    {hero.icon}
                  </div>
                </div>
              )}
              
              {/* Right side - Content */}
              <div className="flex-1 text-center lg:text-left">
                <div className="text-4xl lg:text-5xl font-bold tracking-tight mb-4 drop-shadow-lg">{hero.title}</div>
                {hero.subtitle && (
                  <div className="text-lg lg:text-xl font-semibold text-white/90 mb-8 leading-relaxed drop-shadow-lg">
                    {hero.subtitle}
                  </div>
                )}
                
                {demo && (
                  <div className="max-w-4xl mx-auto lg:mx-0">
                    {demo}
                  </div>
                )}
                
                <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-2">
                  {badges && badges.map((b: string, i: number) => <Badge key={i}>{b}</Badge>)}
                </div>
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
            <SectionHeading kicker={featurePillars.kicker} className="text-white">Why {hero.projectName}</SectionHeading>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featurePillars.items.map((f: { title: string; desc: string }, i: number) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6 flex flex-col">
                  <h4 className="font-semibold text-base mb-2 text-white">{f.title}</h4>
                  <p className="text-white/90 text-xs leading-relaxed flex-1">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </SectionTemplate>
      )}

      {/* Feature Matrix */}
      {featureMatrix && (
        <SectionTemplate background="hero" padding="xl" className="text-white relative overflow-hidden">
          <div className="container-wide relative z-10">
            <SectionHeading kicker="Depth" className="text-white">Feature Matrix</SectionHeading>
            <div className="overflow-x-auto">
              {featureMatrix}
            </div>
          </div>
        </SectionTemplate>
      )}

      {/* Feature Comparison */}
      {featureComparison && (
        <SectionTemplate background="hero" padding="xl" className="relative overflow-hidden">
          <div className="container-wide relative z-10">
            <SectionHeading kicker="Comparison" className="text-white">Feature Comparison</SectionHeading>
            <div className="overflow-x-auto">
              {featureComparison}
            </div>
          </div>
        </SectionTemplate>
      )}

      {/* Docs Links */}
      {docsLinks && (
        <SectionTemplate background="hero" padding="xl" className="relative overflow-hidden">
          <div className="container-wide">
            <SectionHeading kicker="Internals" className="text-white">Technical Documentation</SectionHeading>
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-white/90 mb-8">
                Dive deep into {hero.projectName}'s technical details, architecture, and internal workings with our comprehensive documentation.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                {docsLinks.map((doc: { href: string; title: string; desc: string }, i: number) => (
                  <Link key={i} href={doc.href} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:border-white/30 hover:bg-white/15 transition-all duration-300">
                    <h3 className="font-semibold text-base text-white mb-2">{doc.title}</h3>
                    <p className="text-xs text-white/80">{doc.desc}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </SectionTemplate>
      )}

      {/* CTA Section */}
      {ctaSection && (
        <SectionTemplate background="hero" padding="xl" className="relative overflow-hidden">
          <div className="container-wide relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {ctaSection.kicker && (
                <div className="text-sm tracking-wider font-semibold text-indigo-300 uppercase mb-4">{ctaSection.kicker}</div>
              )}
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {ctaSection.title}
              </h2>
              {ctaSection.description && (
                <p className="text-lg text-white/90 mb-8 leading-relaxed">
                  {ctaSection.description}
                </p>
              )}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href={ctaSection.primaryCTA.href}
                  {...(ctaSection.primaryCTA.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="inline-flex items-center px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-slate-500/50"
                >
                  {ctaSection.primaryCTA.label}
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                {ctaSection.secondaryCTA && (
                  <Link
                    href={ctaSection.secondaryCTA.href}
                    {...(ctaSection.secondaryCTA.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 hover:border-white/40 text-white font-semibold rounded-lg transition-all"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.840 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    {ctaSection.secondaryCTA.label}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </SectionTemplate>
      )}
    </div>
  );
}
