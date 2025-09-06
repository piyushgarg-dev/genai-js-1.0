import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

import { z } from 'zod';

const server = new McpServer({
  name: 'chaicode-server',
  version: '1.0.0',
});

server.registerTool(
  'addTwoNumbers',
  {
    title: 'Add Two Number',
    description: 'This tool adds two numbers together',
    inputSchema: {
      num1: z.number().describe('This is the first number'),
      num2: z.number().describe('This is the second number'),
    },
  },
  async ({ num1, num2 }) => {
    return { content: [{ type: 'text', text: `${num1 + num2}` }] };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
