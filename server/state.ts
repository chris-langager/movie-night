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
export function newReadModel(eventStore: EventStore) {
  let state: State = {
    movieLists: {},
  };
  eventStore.emitter.on('newEvent', (event: Event) => onEvent(state, event));

  return { getState: () => state };
}
