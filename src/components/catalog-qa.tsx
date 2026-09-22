"use client";

import { FormEvent, useState } from "react";
import type { Listing } from "@/lib/listings";

interface AskResponse { answer?: string; error?: string; }

export function CatalogQa({ currentListing }: { currentListing: Listing }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isAsking, setIsAsking] = useState(false);
  const suggestions = [
    `What condition is the ${currentListing.title} in?`,
    "Compare the MacBook Air M1 and Lenovo ThinkPad T14.",
    "What's the cheapest camera in the catalogue?",
  ];

  // Assumption: this is single-turn Q&A; no conversation history is sent or retained.
  async function ask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion) { setError("Enter a question about the catalogue."); return; }
    setIsAsking(true); setError(null); setAnswer(null);
    try {
      const response = await fetch("/api/ask", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question: trimmedQuestion, currentListing }) });
      const payload = (await response.json()) as AskResponse;
      if (!response.ok || typeof payload.answer !== "string") throw new Error(payload.error ?? "Catalog Q&A could not be completed.");
      setAnswer(payload.answer);
    } catch (askError) {
      setError(askError instanceof Error ? askError.message : "Catalog Q&A could not be completed.");
    } finally { setIsAsking(false); }
  }

  return <section aria-labelledby="catalog-qa-heading" className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:mt-8 sm:p-6">
    <h2 id="catalog-qa-heading" className="text-xl font-bold text-slate-950">Ask about the catalogue</h2>
    <p className="mt-1 text-sm leading-5 text-slate-600">Ask about this item, compare listings, or explore the full catalogue.</p>
    <div className="mt-4 flex flex-wrap gap-2">{suggestions.map((suggestion) => <button key={suggestion} type="button" onClick={() => setQuestion(suggestion)} className="rounded-full border border-teal-200 bg-teal-50 px-3 py-2 text-left text-xs font-medium text-teal-800 hover:bg-teal-100">{suggestion}</button>)}</div>
    <form onSubmit={ask} className="mt-4 flex flex-col gap-3 sm:flex-row">
      <label className="sr-only" htmlFor="catalog-question">Ask a catalogue question</label>
      <input id="catalog-question" value={question} onChange={(event) => setQuestion(event.target.value)} maxLength={500} placeholder="Ask a question" className="min-h-11 flex-1 rounded-lg border border-slate-300 px-4 text-slate-950 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20" />
      <button type="submit" disabled={isAsking} className="min-h-11 rounded-lg bg-teal-700 px-5 font-semibold text-white hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-teal-500">{isAsking ? "Asking…" : "Ask"}</button>
    </form>
    {error && <p role="alert" className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}
    {answer && <div aria-live="polite" className="mt-4 rounded-lg bg-slate-50 p-4 text-sm leading-6 text-slate-700"><p className="font-semibold text-slate-950">Catalogue answer</p><p className="mt-1 whitespace-pre-wrap">{answer}</p></div>}
  </section>;
}
