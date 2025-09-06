import 'dotenv/config';
import { StateGraph, MessagesAnnotation } from '@langchain/langgraph';
import { ChatOpenAI } from '@langchain/openai';
import { z } from 'zod';
import { HumanMessage, AIMessage } from '@langchain/core/messages';

const llm = new ChatOpenAI({
  model: 'gpt-4o-mini', // Fixed model name
});

// Create the graph annotation

async function callOpenAI(state) {
  console.log(`Inside callOpenAI`, state);

  const response = await llm.invoke(state.messages);

  // Return the new messages to be added to state
  return {
    messages: [response],
  };
}

// Create workflow with proper annotation
const workflow = new StateGraph(MessagesAnnotation)
  .addNode('callOpenAI', callOpenAI)
  .addEdge('__start__', 'callOpenAI')
  .addEdge('callOpenAI', '__end__');

const graph = workflow.compile();

async function runGraph() {
  const userQuery = 'Hey, what is 2 + 2';

  const updatedState = await graph.invoke({
    messages: [new HumanMessage(userQuery)],
  });
  console.log(updatedState);
}

// Export for use
runGraph();
