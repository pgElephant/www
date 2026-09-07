import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms',
  description: 'Terms for using the personal website and educational material of Dr. Ibrar Ahmed.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
      <header className="border-b border-stone-800 pb-8">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-stone-500">
          Personal website
        </p>
        <h1 className="mt-3 font-serif text-4xl text-stone-50 sm:text-5xl">Terms</h1>
        <p className="mt-4 max-w-2xl leading-7 text-stone-400">
          These terms cover the articles, videos, diagrams, and code examples published on this
          website.
        </p>
      </header>

      <div className="space-y-10 py-10 text-[1.02rem] leading-8 text-stone-300">
        <section>
          <h2 className="font-serif text-2xl text-stone-100">Educational material</h2>
          <p className="mt-3">
            The material reflects my experience and judgment at the time of publication. It is
            provided for education and should be tested against your own requirements before use in
            a live system.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-stone-100">Code examples</h2>
          <p className="mt-3">
            Examples are illustrative and provided without warranty. Review security, compatibility,
            backups, and operational impact before applying any command or configuration.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-stone-100">Open-source projects</h2>
          <p className="mt-3">
            Repositories linked from this site are governed by the license in each repository. This
            website does not replace those license terms.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-stone-100">Attribution</h2>
          <p className="mt-3">
            You may link to published pages. Republishing substantial portions of an article,
            diagram, or recording requires permission unless its page states a separate license.
          </p>
        </section>

        <p className="border-t border-stone-800 pt-8 text-sm text-stone-500">
          Last updated September 2026.
        </p>
      </div>
    </main>
  );
}
