import OpenAI from 'openai';
import redis from './redis';

const apiKey = process.env.OPENROUTER_API_KEY;

const openai = apiKey ? new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: apiKey,
  defaultHeaders: {
    'HTTP-Referer': process.env.NEXTAUTH_URL || 'http://localhost:3000',
    'X-Title': 'Cybersecurity Portfolio',
  },
}) : null;

export interface Summary {
  short: string;
  expanded: string;
}

export async function summarizeReadme(repoName: string, readme: string): Promise<Summary> {
  const cacheKey = `summary:${repoName}`;

  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (error) {
    console.error('Redis error:', error);
  }

  if (!readme || readme.length < 50) {
    return {
      short: 'No description available.',
      expanded: 'No detailed description available for this project.',
    };
  }

  // Truncate README to avoid token limits (approx 4000 chars)
  const truncatedReadme = readme.slice(0, 4000);

  const prompt = `
    Analyze the following GitHub README and provide two summaries:
    1. "short": A 1-2 line summary (max 30 words).
    2. "expanded": A detailed summary (150-300 words) including features, tech stack, and purpose.
    
    Return ONLY valid JSON in this format:
    {
      "short": "...",
      "expanded": "..."
    }

    README:
    ${truncatedReadme}
  `;

  try {
    if (!openai) {
      console.warn('OpenRouter API Key not found. Skipping summarization.');
      return {
        short: 'Summary unavailable (API Key missing).',
        expanded: 'Please set the OPENROUTER_API_KEY environment variable to generate summaries.',
      };
    }

    const completion = await openai.chat.completions.create({
      model: 'meta-llama/llama-3.1-70b-instruct:free', // Use a capable free/cheap model
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
    });

    const content = completion.choices[0].message.content;
    if (!content) throw new Error('No content from LLM');

    const summary: Summary = JSON.parse(content);

    try {
      await redis.set(cacheKey, JSON.stringify(summary), { EX: 86400 * 7 }); // Cache for 7 days
    } catch (error) {
      console.error('Redis set error:', error);
    }

    return summary;
  } catch (error) {
    console.error('Error generating summary:', error);
    return {
      short: 'Summary generation failed.',
      expanded: 'Could not generate summary at this time.',
    };
  }
}
