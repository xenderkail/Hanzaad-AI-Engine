export default async function handler(req: any, res: any) {
  const apiKey = process.env.GEMINI_API_KEY;
  return res.status(200).json({
    status: 'ready',
    hasApiKey: !!apiKey,
    models: [
      'gemini-3.8-flash',
      'gemini-flash-latest',
      'gemini-3.1-flash-lite',
      'gemini-2.5-flash'
    ],
    defaultModel: 'gemini-3.8-flash',
    platform: process.env.VERCEL ? 'vercel' : 'node'
  });
}
