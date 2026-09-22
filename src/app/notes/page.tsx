export default function NotesPage() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">ImpactSG</p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Notes</h1>

        <section className="mt-9">
          <h2 className="text-xl font-bold tracking-tight text-slate-950">What I built, and who it&apos;s for</h2>
          <p className="mt-3 leading-7 text-slate-700">ImpactSG is a second-hand electronics marketplace for buyers and sellers in Singapore, letting anyone browse and search listings across phones, computers, audio gear, cameras, gaming, and accessories without creating an account.</p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold tracking-tight text-slate-950">What&apos;s seeded, simulated, or limited</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-slate-700">
            <li>Listings: 24 seeded items across 6 categories (Phones, Computers, Audio, Cameras, Gaming, and Accessories), each with a title, price, category, description, and condition note simulating a real seller&apos;s disclosure.</li>
            <li>Payments: not implemented — out of scope per the brief; all transactions are simulated.</li>
            <li>Authentication: not implemented — browsing and all core flows are anonymous by design.</li>
            <li>Sellers are not modeled as real users — listings are static seed data rather than tied to individual seller accounts.</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold tracking-tight text-slate-950">AI tools and models</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-slate-700">
            <li>Built with: Codex CLI (via CognitioLabs&apos; gateway)</li>
            <li>Search powered by: openai/gpt-4o-mini — sends the user&apos;s query along with the full catalogue to the model, which returns a ranked list of matching listing IDs that the frontend then renders using the existing listing cards.</li>
            <li>Catalogue Q&amp;A powered by: openai/gpt-4o-mini — grounded in catalogue data via a system prompt that instructs the model to answer only from the listings provided and explicitly say when information isn&apos;t available, rather than guessing.</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold tracking-tight text-slate-950">What I chose not to build, and why</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-slate-700">
            <li>Vector/embedding-based search — the catalogue is small enough (24 listings) that sending the full set to the model on each query was simpler and performed well within the time available.</li>
            <li>Multi-turn conversation memory for Q&amp;A — each question is handled independently to keep the implementation reliable and reduce complexity given the timeframe.</li>
            <li>User accounts, saved listings, and buyer-seller messaging — out of scope per the brief, which does not expect authentication or logistics integrations.</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold tracking-tight text-slate-950">Known issues and unfinished parts</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-slate-700">
            <li>Search relevance depends on how directly the query maps to listing text (title or description); very indirect or oblique phrasing can miss relevant items.</li>
            <li>No pagination — all 24 listings load on a single page, which works at this catalogue size but would not scale to a larger one.</li>
            <li>Product images are placeholders from placehold.co, not real seller-submitted photos.</li>
          </ul>
        </section>
      </article>
    </main>
  );
}
