import { openai } from "@ai-sdk/openai";
import { streamText, stepCountIs } from "ai";
import { SYSTEM_PROMPT, MODEL_ID } from "@/lib/claude";
import { allTools } from "@/lib/tools";

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: openai(MODEL_ID),
      system: SYSTEM_PROMPT,
      messages,
      tools: allTools,
      stopWhen: stepCountIs(5),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);

    if (error instanceof Error && error.message.includes("API key")) {
      return new Response(
        JSON.stringify({ error: "OpenAI API key not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ error: "Failed to generate response" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
