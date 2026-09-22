import "server-only";

const AI_GATEWAY_URL = "https://174.138.16.223/openrouter/v1/chat/completions";
const AI_MODEL = "openai/gpt-4o-mini";

interface ChatCompletionResponse {
  choices?: Array<{ message?: { content?: unknown } }>;
}

export async function requestCatalogueCompletion(systemPrompt: string, userPrompt: string): Promise<string> {
  const apiKey = process.env.CLASSGW_KEY;
  if (!apiKey) throw new Error("AI service is not configured.");

  const response = await fetch(AI_GATEWAY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: AI_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0,
    }),
  });

  if (!response.ok) throw new Error(`AI gateway returned status ${response.status}.`);

  const completion = (await response.json()) as ChatCompletionResponse;
  const content = completion.choices?.[0]?.message?.content;
  if (typeof content !== "string" || !content.trim()) throw new Error("AI response did not include text content.");
  return content.trim();
}
