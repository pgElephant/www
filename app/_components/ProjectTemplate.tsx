import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

type SectionHeadingProps = {
  children: React.ReactNode;
  kicker?: string;
  className?: string;
};
function SectionHeading({ children, kicker, className = '' }: SectionHeadingProps) {
  return (
    <div className={`text-center mb-14 ${className}`}>
      {kicker && <div className="text-xs tracking-wider font-thin text-indigo-500 uppercase mb-2">{kicker}</div>}
      <h2 className={`text-3xl md:text-4xl font-thin ${className === 'text-white' ? 'text-white' : 'text-slate-900'} mb-3`}>{children}</h2>
      <div className="mx-auto h-1 w-28 bg-gradient-to-r from-indigo-500 to-sky-500 rounded" />
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
      <h4 className="font-thin text-lg mb-2 text-slate-900">{title}</h4>
      <p className="text-slate-600 text-sm leading-relaxed flex-1">{desc}</p>
    </div>
  );
}

type BadgeProps = {
  children: React.ReactNode;
};
function Badge({ children }: BadgeProps) {
  return <span className="inline-block bg-slate-100 text-slate-700 text-xs font-thin px-2.5 py-1 rounded-md border border-slate-200 mr-2 mb-2">{children}</span>;
}

type ProjectTemplateProps = {
  hero: {
    title: string;
    subtitle?: string;
    projectName: string;
    icon?: string;
  };
  badges?: string[];
  demo?: React.ReactNode;
  featurePillars?: {
    kicker?: string;
    items: { title: string; desc: string }[];
  };
  features?: { icon: React.ReactNode; iconColor: string; title: string; desc: string }[];
  featureMatrix?: React.ReactNode;
  docsLinks?: { href: string; title: string; desc: string }[];
};

export default function ProjectTemplate({
  hero,
  badges,
  demo,
  featurePillars,
  features,
  featureMatrix,
  docsLinks
}: ProjectTemplateProps) {
  return (
    <div className="pb-24">
      {/* Hero */}
      <section className="py-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_30%,rgba(56,189,248,0.25),transparent_60%)]" />
        <div className="container-wide relative z-10 text-center">
          <div className="flex flex-col items-center justify-center mb-5">
            {hero.icon && (
              <div className="mb-4">
                <Image src={hero.icon} alt={`${hero.projectName} icon`} width={64} height={64} className="inline-block align-middle" />
              </div>
            )}
            <h1 className="text-5xl font-thin mb-5 tracking-tight">{hero.title}</h1>
          </div>
          {hero.subtitle && <div className="text-center mb-8"><h3 className="text-2xl font-thin text-white mb-4">{hero.subtitle}</h3></div>}
          {demo && <div className="max-w-4xl mx-auto">{demo}</div>}
          <div className="mt-8 flex flex-wrap justify-center">
            {badges && badges.map((b: string, i: number) => <Badge key={i}>{b}</Badge>)}
          </div>
        </div>
      </section>

      {/* High-Level Feature Pillars */}
      {featurePillars && (
        <section className="py-20 bg-slate-50">
          <div className="container-wide">
            <SectionHeading kicker={featurePillars.kicker}>Why {hero.projectName}</SectionHeading>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featurePillars.items.map((f: { title: string; desc: string }, i: number) => <FeatureCard key={i} title={f.title} desc={f.desc} />)}
            </div>
          </div>
        </section>
      )}

      {/* Detailed Features List */}
      {features && (
        <section className="py-16 bg-slate-50 border-t border-b">
          <div className="container-wide">
            <SectionHeading kicker="Features">Detailed Features List</SectionHeading>
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-3">
                {features.map((f: { icon: React.ReactNode; iconColor: string; title: string; desc: string }, i: number) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-white hover:shadow-sm transition-all border-l-3 border-transparent hover:border-indigo-400">
                    <span className={`${f.iconColor} mt-0.5 flex-shrink-0`}>{f.icon}</span>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-thin text-base mb-1 text-slate-900 leading-tight">{f.title}</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Feature Matrix */}
      {featureMatrix && (
        <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_30%,rgba(56,189,248,0.25),transparent_60%)]" />
          <div className="container-wide relative z-10">
            <SectionHeading kicker="Depth" className="text-white">Feature Matrix</SectionHeading>
            <div className="overflow-x-auto">
              {featureMatrix}
            </div>
          </div>
        </section>
      )}

      {/* Docs Links */}
      {docsLinks && (
        <section className="py-20 bg-slate-50">
          <div className="container-wide">
            <SectionHeading kicker="Internals">Technical Documentation</SectionHeading>
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-slate-600 mb-8">
                Dive deep into {hero.projectName}'s technical details, architecture, and internal workings with our comprehensive documentation.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                {docsLinks.map((doc: { href: string; title: string; desc: string }, i: number) => (
                  <Link key={i} href={doc.href} className="bg-white p-6 rounded-xl border border-slate-200 hover:border-indigo-300 transition-colors">
                    <h3 className="font-thin text-lg text-slate-900 mb-2">{doc.title}</h3>
                    <p className="text-sm text-slate-600">{doc.desc}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
