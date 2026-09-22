"use client";

import Link from "next/link";

export default function ListingError() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-8 text-slate-600 sm:px-6">
      <p>We couldn’t load this listing. Please try again.</p>
      <Link href="/" className="mt-4 inline-block font-semibold text-teal-700">Back to browse</Link>
    </main>
  );
}
