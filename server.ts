import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

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

// Supported active models in Google AI Studio
const MODEL_CASCADE = [
  'gemini-3.8-flash',
  'gemini-flash-latest',
  'gemini-3.1-flash-lite',
  'gemini-2.5-flash'
];

/**
 * Builds a strictly alternating sequence of [user, model, user, ...] turns
 * required by the Gemini API, eliminating consecutive turns of the same role.
 */
function buildGeminiContents(prompt: string, history: any[], currentCode?: string) {
  const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];
  const rawTurns: Array<{ role: 'user' | 'model'; text: string }> = [];

  // Parse prior history if valid
  if (Array.isArray(history)) {
    for (const h of history) {
      if (h && typeof h.text === 'string' && h.text.trim().length > 0) {
        // Skip default initial welcome greeting
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

  // Format current user prompt with active canvas code context
  let userText = prompt.trim();
  if (currentCode && typeof currentCode === 'string' && currentCode.length > 50) {
    userText = `[CURRENT ACTIVE APPLICATION CODE IN CANVAS]:\n\`\`\`html\n${currentCode}\n\`\`\`\n\n[USER INSTRUCTION]:\n${prompt.trim()}`;
  }

  rawTurns.push({ role: 'user', text: userText });

  // Gemini API requires the first turn to be 'user'
  while (rawTurns.length > 0 && rawTurns[0].role !== 'user') {
    rawTurns.shift();
  }

  // Merge any consecutive turns of the same role
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

  // Guarantee at least one valid user turn
  if (contents.length === 0) {
    contents.push({
      role: 'user',
      parts: [{ text: userText }]
    });
  }

  return contents;
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '20mb' }));

  // Initialize Gemini Client using AI Studio in-built key
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = new GoogleGenAI({
    apiKey: apiKey || '',
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  // Health and in-built key status endpoint
  app.get('/api/status', (req: Request, res: Response) => {
    res.json({
      status: 'ready',
      hasApiKey: !!apiKey,
      models: MODEL_CASCADE,
      defaultModel: MODEL_CASCADE[0]
    });
  });

  // Generation endpoint using AI Studio in-built keys (or client-provided key)
  app.post('/api/generate', async (req: Request, res: Response) => {
    try {
      const { prompt, history, currentCode, apiKey: clientKey } = req.body;

      if (!prompt || typeof prompt !== 'string') {
        return res.status(400).json({ error: 'Prompt is required.' });
      }

      const effectiveKey = process.env.GEMINI_API_KEY || clientKey || (req.headers['x-gemini-api-key'] as string);

      if (!effectiveKey) {
        return res.status(400).json({
          error: 'GEMINI_API_KEY is not configured in the environment. Please add GEMINI_API_KEY to your environment variables or enter your key.'
        });
      }

      const client = new GoogleGenAI({
        apiKey: effectiveKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      // Build well-formed, alternating conversation turns
      const contents = buildGeminiContents(prompt, history, currentCode);

      // Execute with automatic model fallback cascade
      let lastError: Error | null = null;
      let responseText: string | null = null;
      let modelUsed: string = MODEL_CASCADE[0];

      for (const modelCandidate of MODEL_CASCADE) {
        try {
          modelUsed = modelCandidate;
          const response = await client.models.generateContent({
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
          console.warn(`[Hamzaad Server] Cascade on ${modelCandidate} failed: ${lastError.message}`);
          // Continue to next model in cascade
        }
      }

      if (!responseText) {
        throw lastError || new Error('Failed to generate response from Gemini models.');
      }

      res.json({
        response: responseText,
        modelUsed: modelUsed
      });

    } catch (error: unknown) {
      const err = error as Error;
      console.error('[Hamzaad Server] API Error:', err.message);
      res.status(500).json({
        error: err.message || 'An error occurred while generating the application.'
      });
    }
  });

  // Mount Vite middleware in development
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve('dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Hamzaad Server] Ready on http://0.0.0.0:${PORT} (In-built Key: ${apiKey ? 'Loaded' : 'Missing'})`);
  });
}

startServer().catch((err) => {
  console.error('[Hamzaad Server] Startup failed:', err);
});
