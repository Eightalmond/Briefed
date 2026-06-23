import Anthropic from "@anthropic-ai/sdk";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.writeHead(204, corsHeaders);
    return res.end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "ANTHROPIC_API_KEY is not configured" });
  }

  const { story, question } = req.body || {};

  if (!story || !story.title || !story.summary) {
    return res.status(400).json({ error: "Request body must include story with title and summary" });
  }

  if (!question || typeof question !== "string") {
    return res.status(400).json({ error: "Request body must include a question string" });
  }

  try {
    const client = new Anthropic({ apiKey });

    const response = await client.messages.create({
      model: "claude-sonnet-4-6-20250514",
      max_tokens: 1024,
      system: `You explain news stories to people who are curious but new to tech. Rules:
- No jargon whatsoever
- Conversational tone, like talking to a friend
- Use analogies to explain complex concepts
- Keep it concise (2-4 short paragraphs max)
- If something is genuinely uncertain, say so`,
      messages: [
        {
          role: "user",
          content: `Here's a news story:

Title: ${story.title}
Summary: ${story.summary}

My question: ${question}`,
        },
      ],
    });

    let explanation = "";
    for (const block of response.content) {
      if (block.type === "text") {
        explanation += block.text;
      }
    }

    return res.status(200).json({ explanation });
  } catch (error) {
    console.error("Error generating explanation:", error);
    return res.status(500).json({
      error: "Failed to generate explanation",
      message: error.message,
    });
  }
}
