import { promises as fs, existsSync } from 'fs';

export interface Event {
  index: number;
  date: string;
  type: string;
  aggregateType: string;
  aggregateId: string;
  actor: string;
  payload: object;
}

export interface NewEvent {
  type: string;
  aggregateType: string;
  aggregateId: string;
  actor: string;
  payload: object;
}

export function newEventStore(file = './events') {
  const events: Event[] = [];
  let index = 0;

  return {
    loadEvents: async () => {
      if (!existsSync(file)) {
        return;
      }
      const data = await fs.readFile(file);
      data
        .toString()
        .split('\n')
        .filter((line) => !!line)
        .forEach((line) => {
          try {
            events.push(JSON.parse(line));
          } catch (e) {
            console.warn(e);
          }
        });
    },
    listEvents: () => events,
    writeEvent: async (newEvent: NewEvent) => {
      index++;
      const event = {
        index,
        date: new Date().toISOString(),
        ...newEvent,
      };
      await fs.appendFile(file, `${JSON.stringify(event)}\n`);
      events.push(event);
    },
  };
}
