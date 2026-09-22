import { NextResponse } from "next/server";
import { requestCatalogueCompletion } from "@/lib/ai-gateway";
import { getListingById, listings, type Listing } from "@/lib/listings";
import { CATALOG_QA_SYSTEM_PROMPT } from "@/lib/prompts";

interface AskRequestBody { question?: unknown; currentListing?: unknown; }

type QuestionContext = "item-specific" | "catalogue-wide" | "comparison";

function getQuestionContext(question: string): QuestionContext {
  if (/\b(compare|comparison|versus|vs\.?)\b/i.test(question)) return "comparison";
  if (/\b(catalogue|catalog|cheapest|lowest price|all listings|what do you have)\b/i.test(question)) return "catalogue-wide";
  return "item-specific";
}

function isMatchingListing(value: unknown, listing: Listing): boolean {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Record<string, unknown>;
  return candidate.id === listing.id && candidate.title === listing.title && candidate.price === listing.price && candidate.category === listing.category && candidate.description === listing.description && candidate.condition === listing.condition && candidate.notes === listing.notes && candidate.sellerName === listing.sellerName && candidate.image === listing.image;
}

export async function POST(request: Request) {
  try {
    const body: AskRequestBody = await request.json();
    const question = typeof body.question === "string" ? body.question.trim() : "";
    // Assumption: questions are capped to keep model requests bounded for this small demo catalog.
    if (!question || question.length > 500) return NextResponse.json({ error: "Enter a question of up to 500 characters." }, { status: 400 });
    let suppliedId = "";
    if (typeof body.currentListing === "object" && body.currentListing !== null) {
      const candidateId = (body.currentListing as Record<string, unknown>).id;
      if (typeof candidateId === "string") suppliedId = candidateId;
    }
    const currentListing = getListingById(suppliedId);
    if (!currentListing || !isMatchingListing(body.currentListing, currentListing)) {
      return NextResponse.json({ error: "The current listing context is invalid." }, { status: 400 });
    }

    const context = getQuestionContext(question);
    console.log("Catalog Q&A model context:", { listingId: currentListing.id, context, question });
    const catalogueData = context === "item-specific" ? "Not provided for item-specific questions; use only the CURRENT LISTING." : JSON.stringify(listings);
    const answer = await requestCatalogueCompletion(
      CATALOG_QA_SYSTEM_PROMPT,
      `QUESTION CONTEXT: ${context}\n\nCURRENT LISTING (full details, primary subject for item-specific questions):\n${JSON.stringify(currentListing)}\n\nQUESTION:\n${question}\n\nFULL CATALOG:\n${catalogueData}`,
    );
    return NextResponse.json({ answer });
  } catch (error) {
    console.error("Catalog Q&A failed:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "Catalog Q&A is temporarily unavailable. Please try again." }, { status: 502 });
  }
}
