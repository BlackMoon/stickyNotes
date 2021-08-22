import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import 'reflect-metadata'
import { buildSchema } from 'type-graphql';

import { NoteResolver } from './resolvers/note-resolver';

const PORT = 8000;

async function main() {

  const schema = await buildSchema({
    resolvers: [NoteResolver],
    emitSchemaFile: true,
  })
  
  const app = express();

  const appolloServer = new ApolloServer({
    schema,
  })
  
  await appolloServer.start();
  appolloServer.applyMiddleware({ app })

  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
  });
}

main()
