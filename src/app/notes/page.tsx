export default function NotesPage() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">ImpactSG</p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Notes</h1>

        <section className="mt-9">
          <h2 className="text-xl font-bold tracking-tight text-slate-950">What I built, and who it&apos;s for</h2>
          <p className="mt-3 whitespace-pre-line leading-7 text-slate-700">[1-2 sentences: your marketplace concept + target audience — e.g.
&quot;A second-hand marketplace for [X], letting [audience] browse and search
listings for [categories] without needing to create an account.&quot;]</p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold tracking-tight text-slate-950">What&apos;s seeded, simulated, or limited</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-slate-700">
            <li>Listings: [X] seeded items across [Y] categories, generated via [seed script/JSON].</li>
            <li>Payments: not implemented — out of scope per the brief.</li>
            <li>Authentication: not implemented — browsing and all core flows are anonymous by design.</li>
            <li>[Anything else you simplified — e.g. images are placeholders, no real sellers, etc.]</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold tracking-tight text-slate-950">AI tools and models</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-slate-700">
            <li>Built with: Codex CLI (via CognitioLabs&apos; gateway)</li>
            <li className="whitespace-pre-line">Search powered by: [model name] — [1 sentence on approach, e.g. &quot;sends
the query and full catalogue to the model, which returns ranked matching
listing IDs&quot;]</li>
            <li className="whitespace-pre-line">Catalogue Q&amp;A powered by: [model name] — [1 sentence on approach, e.g.
&quot;grounded in catalogue data via system prompt; instructed to state when
information isn&apos;t available rather than guess&quot;]</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold tracking-tight text-slate-950">What I chose not to build, and why</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-slate-700">
            <li className="whitespace-pre-line">[e.g. &quot;Vector/embedding-based search — the catalogue is small enough
(X listings) that sending the full set to the model each query was
simpler and worked well within the time available.&quot;]</li>
            <li className="whitespace-pre-line">[e.g. &quot;Multi-turn conversation memory for Q&amp;A — kept each question
independent to reduce complexity given the timeframe.&quot;]</li>
            <li>[Anything else you deliberately skipped or simplified — be honest here, this is a graded criterion, not a confession.]</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold tracking-tight text-slate-950">Known issues and unfinished parts</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-slate-700">
            <li className="whitespace-pre-line">[e.g. &quot;Search occasionally misses items when queries use very indirect
phrasing.&quot;]</li>
            <li className="whitespace-pre-line">[e.g. &quot;No pagination — all listings load on one page; fine at this
catalogue size but wouldn&apos;t scale.&quot;]</li>
            <li>[Anything you know is rough, incomplete, or a hack. List it — the brief explicitly rewards honesty here over pretending everything&apos;s polished.]</li>
          </ul>
        </section>
      </article>
    </main>
  );
}
