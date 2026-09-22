import Link from "next/link";

export default function ListingNotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-4 py-8 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-700">Listing unavailable</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">We couldn’t find that item.</h1>
      <p className="mt-3 text-slate-600">It may have been removed, or the link may be incorrect.</p>
      <Link href="/" className="mt-6 inline-flex min-h-11 items-center font-semibold text-teal-700 hover:text-teal-900">← Back to browse</Link>
    </main>
  );
}
