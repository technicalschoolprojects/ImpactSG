import { NextResponse } from "next/server";
import { listings } from "@/lib/listings";
import { SEARCH_SYSTEM_PROMPT } from "@/lib/prompts";
import { requestCatalogueCompletion } from "@/lib/ai-gateway";

interface SearchRequestBody { query?: unknown; }
function parseMatchingIds(content: unknown): string[] {
  if (typeof content !== "string") throw new Error("The AI response did not include text content.");
  let parsed: unknown;
  try { parsed = JSON.parse(content); } catch { throw new Error("The AI response was not valid JSON."); }
  if (!Array.isArray(parsed) || !parsed.every((id) => typeof id === "string")) {
    throw new Error("The AI response was not an array of listing IDs.");
  }
  return parsed;
}

export async function POST(request: Request) {
  try {
    const body: SearchRequestBody = await request.json();
    const query = typeof body.query === "string" ? body.query.trim() : "";
    // Assumption: cap query length to keep model requests bounded for this small demo catalog.
    if (!query || query.length > 500) {
      return NextResponse.json({ error: "Enter a search query of up to 500 characters." }, { status: 400 });
    }

    const content = await requestCatalogueCompletion(SEARCH_SYSTEM_PROMPT, `Query: ${query}\n\nCatalog:\n${JSON.stringify(listings)}`);
    const ids = parseMatchingIds(content);
    const listingsById = new Map(listings.map((listing) => [listing.id, listing]));
    const matchingListings = ids.flatMap((id) => {
      const listing = listingsById.get(id);
      if (!listing) { console.warn(`AI search returned unknown listing ID: ${id}`); return []; }
      return [listing];
    });
    return NextResponse.json({ listings: matchingListings });
  } catch (error) {
    console.error("AI search failed:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "AI search returned an invalid response. Please try again." }, { status: 502 });
  }
}
