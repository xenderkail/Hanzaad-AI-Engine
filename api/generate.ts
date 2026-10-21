import { GoogleGenAI } from '@google/genai';

const SYSTEM_INSTRUCTION = `You are Hamzaad, an elite Autonomous AI Application Engine & Full-Stack Architect.
Your mission is to synthesize complete, high-performance, single-file HTML applications that run natively in an iframe sandbox.

MANDATORY RULES:
1. Always start your response with a concise, polite conversational overview (1-2 sentences) explaining what you designed, built, or updated.
2. IMMEDIATELY follow with EXACTLY ONE complete single-file HTML application enclosed strictly in a \`\`\`html ... \`\`\` markdown code block.
   - If the user sends a greeting or general inquiry (e.g. "hello", "hi", "help"), synthesize an engaging, interactive "Hamzaad Interactive Welcome & Feature Showcase" app with live cards, charts, and interactive demo buttons.
   - If the user asks for a specific app or modification, synthesize the complete, fully-functional single-file HTML application.
3. The generated HTML application MUST be 100% self-contained and ready to execute immediately:
   - Must include <!DOCTYPE html>, <html lang="en">, <head>, and <body>.
   - Include Tailwind CSS CDN: <script src="https://cdn.tailwindcss.com"></script>
   - Include Chart.js CDN when charts, statistics, or analytics are relevant: <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
   - Include Lucide Icons CDN when icons are needed: <script src="https://unpkg.com/lucide@latest"></script> followed by lucide.createIcons() call.
   - Include complete interactive JavaScript logic (event listeners, state handling, realistic mockup data, calculations).
   - NEVER output placeholder comments like "<!-- rest of code here -->" or "// TODO". All features, views, and modals must be fully implemented.
   - UI must be exceptionally polished: dark/light theme, modern cards, borders, rounded corners, clean micro-interactions, responsive layout.
4. Output no other code blocks after the html block.`;

const MODEL_CASCADE = [
  'gemini-3.8-flash',
  'gemini-flash-latest',
  'gemini-3.1-flash-lite',
  'gemini-2.5-flash'
];

function buildGeminiContents(prompt: string, history: any[], currentCode?: string) {
  const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];
  const rawTurns: Array<{ role: 'user' | 'model'; text: string }> = [];

  if (Array.isArray(history)) {
    for (const h of history) {
      if (h && typeof h.text === 'string' && h.text.trim().length > 0) {
        if (h.id === 'welcome' || h.text.startsWith('Welcome to **Hamzaad**')) {
          continue;
        }
        rawTurns.push({
          role: h.role === 'assistant' || h.role === 'model' ? 'model' : 'user',
          text: h.text.trim()
        });
      }
    }
  }

  let userText = prompt.trim();
  if (currentCode && typeof currentCode === 'string' && currentCode.length > 50) {
    userText = `[CURRENT ACTIVE APPLICATION CODE IN CANVAS]:\n\`\`\`html\n${currentCode}\n\`\`\`\n\n[USER INSTRUCTION]:\n${prompt.trim()}`;
  }

  rawTurns.push({ role: 'user', text: userText });

  while (rawTurns.length > 0 && rawTurns[0].role !== 'user') {
    rawTurns.shift();
  }

  for (const turn of rawTurns) {
    if (contents.length > 0 && contents[contents.length - 1].role === turn.role) {
      contents[contents.length - 1].parts[0].text += `\n\n${turn.text}`;
    } else {
      contents.push({
        role: turn.role,
        parts: [{ text: turn.text }]
      });
    }
  }

  if (contents.length === 0) {
    contents.push({
      role: 'user',
      parts: [{ text: userText }]
    });
  }

  return contents;
}

export default async function handler(req: any, res: any) {
  // Support CORS for cross-origin or local test requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-gemini-api-key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const { prompt, history, currentCode, apiKey: clientKey } = body;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Prompt is required.' });
    }

    // Resolve API key from environment (AI Studio / Vercel secrets) or request
    const effectiveKey = process.env.GEMINI_API_KEY || clientKey || req.headers['x-gemini-api-key'];

    if (!effectiveKey) {
      return res.status(400).json({
        error: 'No GEMINI_API_KEY detected. Please configure GEMINI_API_KEY in your Vercel Project Settings > Environment Variables, or enter your API key in the studio toolbar.'
      });
    }

    const ai = new GoogleGenAI({
      apiKey: effectiveKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const contents = buildGeminiContents(prompt, history, currentCode);

    let lastError: Error | null = null;
    let responseText: string | null = null;
    let modelUsed: string = MODEL_CASCADE[0];

    for (const modelCandidate of MODEL_CASCADE) {
      try {
        modelUsed = modelCandidate;
        const response = await ai.models.generateContent({
          model: modelCandidate,
          contents: contents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
            topP: 0.95,
          },
        });

        if (response && response.text) {
          responseText = response.text;
          break;
        }
      } catch (err: unknown) {
        lastError = err as Error;
        console.warn(`[Vercel Serverless] Cascade on ${modelCandidate} failed: ${lastError.message}`);
      }
    }

    if (!responseText) {
      throw lastError || new Error('Failed to generate response from Gemini models.');
    }

    return res.status(200).json({
      response: responseText,
      modelUsed: modelUsed
    });

  } catch (error: unknown) {
    const err = error as Error;
    console.error('[Vercel Serverless] API Error:', err.message);
    return res.status(500).json({
      error: err.message || 'An error occurred while generating the application.'
    });
  }
}
