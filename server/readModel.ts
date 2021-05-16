import { Event } from './events';
import { EventStore } from './eventStore';

export interface State {
  movieLists: Record<string, MovieList>;
}

export interface MovieList {
  id: string;
  name: string;
  movies: Movie[];
}

export interface Movie {
  id: string;
  name: string;
}

function onEvent(state: State, event: Event) {
  const { movieLists } = state;
  switch (event.type) {
    case 'MovieListCreated':
      movieLists[event.payload.id] = { ...event.payload, movies: [] };
      return;
    case 'MovieListRenamed':
      if (!movieLists[event.payload.id]) return;
      movieLists[event.payload.id].name = event.payload.name;
      return;
    case 'MovieListDeleted':
      delete movieLists[event.payload.id];
      return;
    case 'MovieAddedToList': {
      const { movieList, movie } = event.payload;
      if (!movieLists[movieList.id]) return;
      movieLists[movieList.id].movies.push(movie);
      return;
    }
    case 'MovieRemovedFromList': {
      const { movieList, movie } = event.payload;
      if (!movieLists[movieList.id]) return;
      movieLists[movieList.id].movies = movieLists[movieList.id].movies.filter(
        ({ id }) => id !== movie.id
      );
      return;
    }
    default:
      return;
  }
}

export type ReadModel = ReturnType<typeof newReadModel>;
export function newReadModel(eventStore: EventStore<Event>) {
  let state: State = {
    movieLists: {},
  };
  eventStore.on('eventWritten', (event) => onEvent(state, event));

  return {
    prime: async (eventGenerator: AsyncGenerator<Event>) => {
      for await (const event of eventGenerator) {
        onEvent(state, event);
      }
    },
    getState: () => state,
  };
}
