import express from 'express';

import { Event } from './events';
import { EventStore } from './eventStore';
import { newReadModel } from './readModel';
import { movieLists } from './html/movies';

const port = parseInt(process.env.PORT, 10) || 3000;

const eventStore = new EventStore<Event>();
export const readModel = newReadModel(eventStore);

const expressServer = express();
expressServer.get('*', (req, res) => {
  const html = movieLists(readModel.getState());
  res.send(html);
});

(async () => {
  try {
    await readModel.prime(eventStore.getEventsGenerator());

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
