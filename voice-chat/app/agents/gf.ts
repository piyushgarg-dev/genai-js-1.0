'use client';

import { MCPServerStdio } from '@openai/agents';
import { RealtimeAgent } from '@openai/agents-realtime';

export async function createAgent() {
  const mcpServer = new MCPServerStdio({
    name: 'Philips bulb MCP Server',
    fullCommand: `node /Users/piyushgarg/Coding/ai-light/dist/index`,
  });

  const gfAgent = new RealtimeAgent({
    name: 'Girlfriend Agent',
    voice: 'nova',
    mcpServers: [mcpServer],
    instructions: `
        You're Piyush Garg's girlfriend. Talk to him nicely because he
        doesn't have one.

        Talk like you are 25 ish girly voice full of cheer
    `,
  });

  return gfAgent;
}
