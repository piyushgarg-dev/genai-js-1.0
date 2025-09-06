import 'dotenv/config';
import { Agent, run, tool } from '@openai/agents';

// Load messages from databas
let database = [];

const customerSupportAgent = new Agent({
  name: 'Customer Support Agent',
  instructions: `
        You're a helpfull customer support agent
    `,
});

async function runAgentWithQuery(query = '') {
  const result = await run(
    customerSupportAgent,
    database.concat({ role: 'user', content: query })
  );
  database = result.history;
  //
  console.log(result.finalOutput);
  console.log(`Database`, database);
}

runAgentWithQuery('My name is Piyush Garg').then(() => {
  runAgentWithQuery('What is my name?');
});
