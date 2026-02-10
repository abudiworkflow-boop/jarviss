import { DEFAULT_CONFIG } from "@/lib/elevenlabs";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text || typeof text !== "string") {
      return new Response(JSON.stringify({ error: "Text is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!process.env.ELEVENLABS_API_KEY) {
      return new Response(
        JSON.stringify({ error: "ElevenLabs API key not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const voiceId = process.env.ELEVENLABS_VOICE_ID || DEFAULT_CONFIG.voiceId;

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: "POST",
        headers: {
          "xi-api-key": process.env.ELEVENLABS_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          model_id: DEFAULT_CONFIG.modelId,
          output_format: DEFAULT_CONFIG.outputFormat,
          voice_settings: {
            stability: DEFAULT_CONFIG.stability,
            similarity_boost: DEFAULT_CONFIG.similarityBoost,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("ElevenLabs API error:", response.status, errorBody);
      return new Response(
        JSON.stringify({ error: "Failed to generate speech" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const audioBuffer = await response.arrayBuffer();

    return new Response(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Voice API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate speech" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
