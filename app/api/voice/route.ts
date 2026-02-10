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

    const { ElevenLabsClient } = await import("@elevenlabs/elevenlabs-js");
    const client = new ElevenLabsClient({
      apiKey: process.env.ELEVENLABS_API_KEY,
    });

    const voiceId = process.env.ELEVENLABS_VOICE_ID || DEFAULT_CONFIG.voiceId;

    const audioStream = await client.textToSpeech.convert(voiceId, {
      text,
      modelId: DEFAULT_CONFIG.modelId,
      outputFormat: DEFAULT_CONFIG.outputFormat as "mp3_44100_128",
    });

    // Convert the async iterable to a ReadableStream
    const chunks: Uint8Array[] = [];
    for await (const chunk of audioStream as unknown as AsyncIterable<Uint8Array>) {
      chunks.push(chunk);
    }
    const combined = new Uint8Array(
      chunks.reduce((acc, c) => acc + c.length, 0)
    );
    let offset = 0;
    for (const chunk of chunks) {
      combined.set(chunk, offset);
      offset += chunk.length;
    }

    return new Response(combined, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Transfer-Encoding": "chunked",
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
