import { NextResponse } from "next/server";
import { requestCatalogueCompletion } from "@/lib/ai-gateway";
import { listings } from "@/lib/listings";
import { CATALOG_QA_SYSTEM_PROMPT } from "@/lib/prompts";

interface AskRequestBody { question?: unknown; }

export async function POST(request: Request) {
  try {
    const body: AskRequestBody = await request.json();
    const question = typeof body.question === "string" ? body.question.trim() : "";
    // Assumption: questions are capped to keep model requests bounded for this small demo catalog.
    if (!question || question.length > 500) return NextResponse.json({ error: "Enter a question of up to 500 characters." }, { status: 400 });
    const answer = await requestCatalogueCompletion(CATALOG_QA_SYSTEM_PROMPT, `Question: ${question}\n\nCatalog:\n${JSON.stringify(listings)}`);
    return NextResponse.json({ answer });
  } catch (error) {
    console.error("Catalog Q&A failed:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "Catalog Q&A is temporarily unavailable. Please try again." }, { status: 502 });
  }
}
