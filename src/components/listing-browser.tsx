"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { formatPrice, type Listing } from "@/lib/listings";

interface SearchResponse { listings?: Listing[]; error?: string; }

export function ListingBrowser({ initialListings }: { initialListings: Listing[] }) {
  const [query, setQuery] = useState("");
  const [visibleListings, setVisibleListings] = useState(initialListings);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  async function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedQuery = query.trim();
    if (!trimmedQuery) { setError("Enter a search query to find listings."); return; }
    setIsSearching(true); setError(null);
    try {
      const response = await fetch("/api/search", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query: trimmedQuery }) });
      const payload = (await response.json()) as SearchResponse;
      if (!response.ok || !Array.isArray(payload.listings)) throw new Error(payload.error ?? "AI search could not be completed.");
      setVisibleListings(payload.listings); setHasSearched(true);
    } catch (searchError) {
      setError(searchError instanceof Error ? searchError.message : "AI search could not be completed.");
    } finally { setIsSearching(false); }
  }

  function clearSearch() { setQuery(""); setVisibleListings(initialListings); setError(null); setHasSearched(false); }

  return <>
    <form onSubmit={handleSearch} className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row" role="search">
      <label className="sr-only" htmlFor="listing-search">Search listings</label>
      <input id="listing-search" value={query} onChange={(event) => setQuery(event.target.value)} maxLength={500} placeholder="Try “cheap laptop under $200”" className="min-h-11 flex-1 rounded-lg border border-slate-300 bg-white px-4 text-slate-950 shadow-sm outline-none placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20" />
      <div className="flex gap-2"><button type="submit" disabled={isSearching} className="min-h-11 flex-1 rounded-lg bg-teal-700 px-5 font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-teal-500 sm:flex-none">{isSearching ? "Searching…" : "Search"}</button>{hasSearched && <button type="button" onClick={clearSearch} className="min-h-11 rounded-lg border border-slate-300 px-4 font-semibold text-slate-700 hover:bg-slate-100">Clear</button>}</div>
    </form>
    {error && <p role="alert" className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}
    {visibleListings.length === 0 ? <section className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center"><h2 className="text-lg font-semibold">{hasSearched ? "No matching listings" : "No listings yet"}</h2><p className="mt-2 text-slate-600">{hasSearched ? "Try a different description or budget." : "Please check back soon."}</p></section> : <section aria-label="Electronics listings" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{visibleListings.map((listing) => <ListingCard key={listing.id} listing={listing} />)}</section>}
  </>;
}

function ListingCard({ listing }: { listing: Listing }) {
  return <Link href={`/listing/${listing.id}`} className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"><img src={listing.image} alt="" className="aspect-[4/3] w-full bg-slate-200 object-cover" /><div className="p-4"><div className="flex items-start justify-between gap-3"><h2 className="line-clamp-2 text-base font-semibold leading-6 text-slate-950 group-hover:text-teal-700">{listing.title}</h2><p className="shrink-0 text-base font-bold text-slate-950">{formatPrice(listing.price)}</p></div><p className="mt-2 text-sm font-medium text-teal-700">{listing.category}</p><p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-600">{listing.description}</p><p className="mt-3 line-clamp-1 text-xs text-slate-500">Note: {listing.notes}</p></div></Link>;
}
