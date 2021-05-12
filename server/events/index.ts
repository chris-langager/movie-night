import EventEmitter from 'events';
import { promises as fs, existsSync } from 'fs';

export interface MovieListCreated {
  type: 'MovieListCreated';
  payload: {
    id: string;
    name: string;
  };
}

export interface MovieListRenamed {
  type: 'MovieListRenamed';
  payload: {
    id: string;
    name: string;
  };
}

export interface MovieListDeleted {
  type: 'MovieListDeleted';
  payload: {
    id: string;
  };
}

export interface MovieAddedToList {
  type: 'MovieAddedToList';
  payload: {
    movieList: {
      id: string;
    };
    movie: {
      id: string;
      name: string;
    };
  };
}

export interface MovieRemovedFromList {
  type: 'MovieRemovedFromList';
  payload: {
    movieList: {
      id: string;
    };
    movie: {
      id: string;
    };
  };
}

export type Event =
  | MovieListCreated
  | MovieListRenamed
  | MovieListDeleted
  | MovieAddedToList
  | MovieRemovedFromList;

export type EventStore = ReturnType<typeof newEventStore>;

export function newEventStore(file = './events') {
  const events: Event[] = [];
  let index = 0;
  const emitter = new EventEmitter();

  const writeEvent = async (newEvent: Event, writeToDisk = true) => {
    index++;
    const event = {
      date: new Date().toISOString(),
      ...newEvent,
    };
    if (writeToDisk) {
      await fs.appendFile(file, `${JSON.stringify(event)}\n`);
    }
    events.push(event);
    emitter.emit('newEvent', event);
  };

  return {
    emitter,
    loadEvents: async () => {
      console.log('loading events...');
      const start = new Date();
      if (!existsSync(file)) {
        return;
      }
      const data = await fs.readFile(file);
      const lines = data.toString().split('\n');

      for (let line of lines) {
        if (!line) {
          continue;
        }

        try {
          const { date, ...event } = JSON.parse(line);
          writeEvent(event, false);
        } catch (e) {
          console.warn(e);
          continue;
        }
      }

      console.log(
        `${lines.length} events loaded in ${new Date().getTime() - start.getTime()}ms`
      );
    },
    listEvents: () => events,
    writeEvent,
  };
}
