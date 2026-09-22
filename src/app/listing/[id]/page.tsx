import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPrice, getListingById } from "@/lib/listings";
import { CatalogQa } from "@/components/catalog-qa";

interface ListingPageProps {
  params: Promise<{ id: string }>;
}

export default async function ListingPage({ params }: ListingPageProps) {
  const { id } = await params;
  const listing = getListingById(id);

  if (!listing) notFound();

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
      <Link href="/" className="inline-flex min-h-11 items-center text-sm font-semibold text-teal-700 hover:text-teal-900 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2">
        ← Back to browse
      </Link>

      <article className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:mt-7 sm:grid sm:grid-cols-2">
        <img src={listing.image} alt={listing.title} className="aspect-[4/3] h-full w-full bg-slate-200 object-cover" />
        <div className="p-5 sm:p-8">
          <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-teal-700">
            <span>{listing.category}</span><span aria-hidden="true">•</span><span>{listing.condition}</span>
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">{listing.title}</h1>
          <p className="mt-4 text-2xl font-bold text-slate-950">{formatPrice(listing.price)}</p>

          <dl className="mt-7 space-y-5 border-t border-slate-200 pt-6 text-sm leading-6">
            <div>
              <dt className="font-semibold text-slate-950">Description</dt>
              <dd className="mt-1 text-slate-600">{listing.description}</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-950">Notes</dt>
              <dd className="mt-1 text-slate-600">{listing.notes}</dd>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><dt className="font-semibold text-slate-950">Seller</dt><dd className="mt-1 text-slate-600">{listing.sellerName}</dd></div>
              <div><dt className="font-semibold text-slate-950">Condition</dt><dd className="mt-1 text-slate-600">{listing.condition}</dd></div>
            </div>
          </dl>
        </div>
      </article>
      <CatalogQa currentListingTitle={listing.title} />
    </main>
  );
}
