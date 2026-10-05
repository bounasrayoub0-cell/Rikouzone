import { handleRikouAIChatRequest } from '../../../src/server/rikouAiService';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function onRequestPost(context: { request: Request; env: any }) {
  return handleRikouAIChatRequest(context.request, context.env);
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}
