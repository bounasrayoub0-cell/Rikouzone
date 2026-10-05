import { handleHealthCheck } from '../../src/server/rikouAiService';

export async function onRequestGet() {
  return handleHealthCheck();
}
