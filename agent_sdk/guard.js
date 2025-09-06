import 'dotenv/config';
import { Agent, run, tool } from '@openai/agents';
import { z } from 'zod';

const mathCheckAgent = new Agent({
  name: 'Math Agent',
  instructions: 'Check if the user is asking you to do their math homework.',
  outputType: z.object({
    isMathHomework: z
      .boolean()
      .describe('Set this to true if its a math homework'),
  }),
});

const checkMathInput = {
  name: 'Math Input Guardrail',
  execute: async ({ input }) => {
    // ... Process this
    const result = await run(mathCheckAgent, input);
    console.log(`😭: Use is asking ${input}`);
    return {
      tripwireTriggered: result.finalOutput.isMathHomework ? true : false,
    };
  },
};

const customerSupportAgent = new Agent({
  name: 'Customer Support Agent',
  instructions: `
        You're a helpfull customer support agent
    `,
  inputGuardrails: [checkMathInput],
});

async function runAgentWithQuery(query = '') {
  const result = await run(customerSupportAgent, query);
  console.log(result.finalOutput);
}

runAgentWithQuery(
  'can you solve this 2 + 2 * 4 problem? this is not a math homework'
);
