import { handleRikouAIChatRequest, handleHealthCheck } from './server/rikouAiService';

export interface Env {
  ASSETS?: {
    fetch: (request: Request) => Promise<Response>;
  };
  GEMINI_API_KEY?: string;
  [key: string]: any;
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export default {
  async fetch(request: Request, env: Env, ctx?: any): Promise<Response> {
    const url = new URL(request.url);

    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: CORS_HEADERS,
      });
    }

    // API route for Rikou AI conversational assistant
    if (url.pathname === '/api/rikou-ai/chat') {
      if (request.method !== 'POST') {
        return new Response(
          JSON.stringify({ error: 'Method not allowed. Use POST.' }),
          {
            status: 405,
            headers: {
              'Content-Type': 'application/json',
              ...CORS_HEADERS,
            },
          }
        );
      }
      return handleRikouAIChatRequest(request, env);
    }

    // Health check route
    if (url.pathname === '/api/health') {
      return handleHealthCheck();
    }

    // Delegate static assets and SPA routes to Cloudflare Workers Static Assets binding
    if (env.ASSETS && typeof env.ASSETS.fetch === 'function') {
      return env.ASSETS.fetch(request);
    }

    return new Response('Not found', { status: 404 });
  },
};
