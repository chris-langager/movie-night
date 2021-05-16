import EventEmitter from 'events';
import { promises as fs, existsSync } from 'fs';

export interface Event {
  type: string;
  payload: object;
}

export declare interface EventStore<T extends Event> {
  on(event: 'eventWritten', listener: (event: T) => void): this;
}

export class EventStore<T extends Event> extends EventEmitter {
  file: string;

  constructor(file = './events') {
    super();
    this.file = file;
  }

  async *getEventsGenerator() {
    console.log('loading events...');
    const start = new Date();
    if (!existsSync(this.file)) {
      return;
    }
    const data = await fs.readFile(this.file);
    const lines = data.toString().split('\n');

    for (let line of lines) {
      if (!line) {
        continue;
      }

      try {
        const { date, ...event } = JSON.parse(line);
        yield event as T;
      } catch (e) {
        console.warn(e);
        continue;
      }
    }

    console.log(
      `${lines.length} events loaded in ${new Date().getTime() - start.getTime()}ms`
    );
  }

  async writeEvent(event: T) {
    await fs.appendFile(
      this.file,
      `${JSON.stringify({ date: new Date().toISOString(), ...event })}\n`
    );
    this.emit('eventWritten', event);
  }
}
