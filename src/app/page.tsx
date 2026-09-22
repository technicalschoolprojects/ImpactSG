import { ListingBrowser } from "@/components/listing-browser";
import { listings } from "@/lib/listings";

export default function BrowsePage() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <header className="mb-8 border-b border-slate-200 pb-7 sm:mb-10">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">ImpactSG</p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Second-hand electronics</h1>
        <p className="mt-3 max-w-2xl text-base leading-6 text-slate-600">Browse well-loved devices ready for their next chapter.</p>
      </header>

      <ListingBrowser initialListings={listings} />
    </main>
  );
}
