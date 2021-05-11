import { EventStore, Event } from './events';

interface State {
  movieLists: Record<string, MovieList>;
}

interface MovieList {
  id: string;
  name: string;
  movies: Movie[];
}

interface Movie {
  id: string;
  name: string;
}

function reducer(state: State, event: Event): State {
  switch (event.type) {
    case 'MovieListCreated':
      return {
        movieLists: {
          ...state.movieLists,
          [event.payload.id]: {
            ...event.payload,
            movies: [],
          },
        },
      };
    case 'MovieListDeleted':
      const { [event.payload.id]: _, ...movieLists } = state.movieLists;
      return {
        movieLists,
      };
    default:
      return state;
  }
}

export type ReadModel = ReturnType<typeof newReadModel>;
export function newReadModel(eventStore: EventStore) {
  let state: State = {
    movieLists: {},
  };
  eventStore.emitter.on('newEvent', (event: Event) => {
    state = reducer(state, event);
  });

  return { getState: () => state };
}
