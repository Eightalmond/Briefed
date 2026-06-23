import Anthropic from "@anthropic-ai/sdk";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.writeHead(204, corsHeaders);
    return res.end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "ANTHROPIC_API_KEY is not configured" });
  }

  try {
    const client = new Anthropic({ apiKey });

    const response = await client.messages.create({
      model: "claude-sonnet-4-6-20250514",
      max_tokens: 4096,
      tools: [
        {
          type: "web_search_20250305",
          name: "web_search",
          max_uses: 10,
        },
      ],
      messages: [
        {
          role: "user",
          content: `Search the web and find the top 6 news stories from the last 24 hours across three categories: AI, Tech, and Geopolitics (2 stories per category).

Return ONLY a valid JSON array with no markdown formatting, no code fences, no extra text. Each object in the array must have exactly these fields:

- "id": a unique string identifier (use a slug based on the headline)
- "title": a punchy, clear headline
- "teaser": one sentence, maximum 15 words
- "summary": 3-4 sentences in plain English, no jargon
- "topic": exactly one of "AI", "Tech", or "Geopolitics"
- "source": the publication name where the story was found
- "fetchedAt": the current ISO timestamp

Return ONLY the JSON array. No other text.`,
        },
      ],
    });

    let jsonText = "";
    for (const block of response.content) {
      if (block.type === "text") {
        jsonText += block.text;
      }
    }

    jsonText = jsonText.trim();
    if (jsonText.startsWith("```")) {
      jsonText = jsonText.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
    }

    const stories = JSON.parse(jsonText);

    return res.status(200).json(stories);
  } catch (error) {
    console.error("Error fetching news:", error);

    if (error instanceof SyntaxError) {
      return res.status(502).json({ error: "Failed to parse response from AI" });
    }

    return res.status(500).json({
      error: "Failed to fetch news",
      message: error.message,
    });
  }
}
