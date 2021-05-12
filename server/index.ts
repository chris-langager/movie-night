import express from 'express';
import { newServer } from './graphql';
import next from 'next';
import { Event, newEventStore } from './events';
import { newReadModel } from './state';

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';

const eventStore = newEventStore();
export const readModel = newReadModel(eventStore);
const gqlServer = newServer(eventStore, readModel);

const nextServer = next({ dev });
const handle = nextServer.getRequestHandler();

const expressServer = express();
gqlServer.applyMiddleware({ app: expressServer, path: '/graphql' });
expressServer.all('*', (req, res) => handle(req, res));

(async () => {
  try {
    await eventStore.loadEvents();
    await nextServer.prepare();

    expressServer
      .listen(port, () => {
        console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
      })
      .on('error', (err) => {
        throw err;
      });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
