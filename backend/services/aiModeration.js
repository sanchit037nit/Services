import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const moderatePost = async ({
  doubt,
  code,
  language,
    platform,
  link,
}) => {
  try {
    const prompt = `
You are an AI content moderator for a coding platform.

Analyze the following post.

Return ONLY valid JSON.

Schema:
{
  "riskScore": number,
  "verdict": "Safe" | "Review" | "Blocked",
  "spam": number,
  "fraud": number,
  "toxicity": number,
  "advertisement": number,
  "malware": number,
  "duplicate": number,
  "reason": string
}

Rules:
- riskScore must be between 0 and 100.
- Safe = legitimate coding question.
- Review = suspicious but uncertain.
- Blocked = obvious spam, scams, malware, offensive content, advertisements, phishing, or dangerous links.
-Check link also if it open to proper coding websites or not

Platform:
${platform}

Language:
${language}

Description:
${doubt}

Code:
${code}

Link:
${link}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0,
      response_format: {
        type: "json_object",
      },
      messages: [
        {
          role: "system",
          content:
            "You are a strict content moderation assistant. Always return JSON only.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return JSON.parse(completion.choices[0].message.content);

  } catch (err) {
    console.error(err);

    return {
      riskScore: 0,
      verdict: "Safe",
      spam: 0,
      fraud: 0,
      toxicity: 0,
      advertisement: 0,
      malware: 0,
      duplicate: 0,
      reason: "AI moderation unavailable",
    };
  }
};