const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;

export async function searchWeb(query: string): Promise<{
  answer: string;
  citations: string[];
}> {
  if (!PERPLEXITY_API_KEY) {
    throw new Error("PERPLEXITY_API_KEY not configured");
  }

  const res = await fetch("https://api.perplexity.ai/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${PERPLEXITY_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "sonar",
      messages: [
        {
          role: "system",
          content:
            "You are a research assistant. Provide concise, factual answers with relevant details. Focus on the most recent and accurate information available.",
        },
        { role: "user", content: query },
      ],
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Perplexity API ${res.status}: ${body}`);
  }

  const data = await res.json();
  const answer = data.choices?.[0]?.message?.content || "No results found.";
  const citations: string[] = data.citations || [];

  return { answer, citations };
}
