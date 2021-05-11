import express from 'express';
import { server as gqlServer } from './graphql';
import next from 'next';
import { newEventStore } from './events';

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';

const expressServer = express();

const nextServer = next({ dev });
const handle = nextServer.getRequestHandler();

(async () => {
  try {
    const eventStore = newEventStore();
    await eventStore.loadEvents();
    await eventStore.writeEvent({
      type: 'test',
      actor: '',
      aggregateId: '123',
      aggregateType: 'nothing',
      payload: { id: '123' },
    });
    await eventStore.writeEvent({
      type: 'test',
      actor: '',
      aggregateId: '123',
      aggregateType: 'nothing',
      payload: { id: '123' },
    });

    console.log(eventStore.listEvents());
    await nextServer.prepare();

    gqlServer.applyMiddleware({ app: expressServer, path: '/graphql' });

    expressServer.all('*', (req, res) => handle(req, res));

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
