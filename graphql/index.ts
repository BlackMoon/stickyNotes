import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
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
  app.use(cors());
  app.get('/', (req, resp) => resp.send('use /graphql endpoint'))

  const appolloServer = new ApolloServer({
    schema,
  })
  
  await appolloServer.start();
  appolloServer.applyMiddleware({ app })

  app
    .listen(PORT, () => {
      console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
    })
  .on('error', (err: any) => {
    console.error(err.message);
    throw err;
  })
}

main()
