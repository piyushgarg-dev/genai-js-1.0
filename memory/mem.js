import 'dotenv/config';

import { Memory } from 'mem0ai/oss';

const mem = new Memory({
  version: 'v1.1',

  vectorStore: {
    provider: 'qdrant',
    config: {
      collectionName: 'memories',
      embeddingModelDims: 1536,
      host: 'localhost',
      port: 6333,
    },
  },
});
mem.add([{ role: 'user', content: 'My name is Piyush' }], {
  userId: 'piyush',
});
