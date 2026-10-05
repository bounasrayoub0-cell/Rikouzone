import express from 'express';
import type { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { processRikouAIChat } from './src/server/rikouAiService';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json({ limit: '10mb' }));

  // Server-side AI endpoint for Rikou AI unified conversational assistant
  app.post('/api/rikou-ai/chat', async (req: Request, res: Response) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      const result = await processRikouAIChat(req.body, apiKey);
      return res.json(result);
    } catch (error: any) {
      console.error('Rikou AI Chat error:', error);
      const status = error.status && typeof error.status === 'number' ? error.status : 500;
      return res.status(status).json({
        error: error.message || 'Internal server error while processing AI request',
      });
    }
  });

  // Health check endpoint
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', name: 'RikouZone Server' });
  });

  // Dev server with Vite middlewares, or static serving in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`RikouZone Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
