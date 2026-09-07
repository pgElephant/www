import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'Privacy information for the personal website of Dr. Ibrar Ahmed.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
      <header className="border-b border-stone-800 pb-8">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-stone-500">
          Personal website
        </p>
        <h1 className="mt-3 font-serif text-4xl text-stone-50 sm:text-5xl">Privacy</h1>
        <p className="mt-4 max-w-2xl leading-7 text-stone-400">
          This site publishes my writing, teaching, and open-source work. It does not sell products
          or collect payment information.
        </p>
      </header>

      <div className="space-y-10 py-10 text-[1.02rem] leading-8 text-stone-300">
        <section>
          <h2 className="font-serif text-2xl text-stone-100">Information</h2>
          <p className="mt-3">
            Basic, aggregated visit data may be recorded to understand which pages are useful and to
            keep the site reliable. I do not operate user accounts, mailing lists, advertising
            profiles, or checkout services on this website.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-stone-100">External links</h2>
          <p className="mt-3">
            Articles link to YouTube, GitHub, LinkedIn, and technical documentation. Those services
            apply their own privacy policies when you visit them.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-stone-100">Your data</h2>
          <p className="mt-3">
            I do not sell personal information. If you contact me through an external profile, I use
            the information only to respond to that conversation.
          </p>
        </section>

        <p className="border-t border-stone-800 pt-8 text-sm text-stone-500">
          Last updated September 2026.
        </p>
      </div>
    </main>
  );
}
