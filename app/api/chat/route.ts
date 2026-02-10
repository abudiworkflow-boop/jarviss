export const maxDuration = 60;

const N8N_WEBHOOK_URL =
  process.env.N8N_WEBHOOK_URL || "https://abudii.app.n8n.cloud/webhook/jarvis-chat";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("n8n webhook error:", response.status, text);
      return new Response(
        JSON.stringify({ error: "Failed to get response from Jarvis" }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate response" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
