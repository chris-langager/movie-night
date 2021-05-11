import EventEmitter from 'events';
import { promises as fs, existsSync } from 'fs';

export interface MovieListCreated {
  type: 'MovieListCreated';
  payload: {
    id: string;
    name: string;
  };
}

export interface MovieListUpdated {
  type: 'MovieListUpdated';
  payload: {
    name: string;
  };
}

export interface MovieListDeleted {
  type: 'MovieListDeleted';
  payload: {
    id: string;
  };
}

export type Event = MovieListCreated | MovieListUpdated | MovieListDeleted;

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
      if (!existsSync(file)) {
        return;
      }
      const data = await fs.readFile(file);
      data
        .toString()
        .split('\n')
        .filter((line) => !!line)
        .map((line) => {
          try {
            return JSON.parse(line);
          } catch (e) {
            console.warn(e);
          }
        })
        .filter((line) => !!line)
        .forEach((event) => writeEvent(event, false));
    },
    listEvents: () => events,
    writeEvent,
  };
}
