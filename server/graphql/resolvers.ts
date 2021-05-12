import { Resolvers } from './generated/resolvers';
import { EventStore } from '../events';
import { ReadModel } from '../state';

export const resolvers: Resolvers<{ eventStore: EventStore; readModel: ReadModel }> = {
  Query: {
    movieLists: (_, __, { readModel }) => {
      return Object.values(readModel.getState().movieLists);
    },
  },
  Mutation: {
    createList: (_, input, { eventStore }) => {
      eventStore.writeEvent({
        type: 'MovieListCreated',
        payload: {
          id: input.id,
          name: input.name,
        },
      });
      return true;
    },
    renameList: (_, input, { eventStore }) => {
      eventStore.writeEvent({
        type: 'MovieListRenamed',
        payload: {
          id: input.id,
          name: input.name,
        },
      });
      return true;
    },
    deleteList: (_, input, { eventStore }) => {
      eventStore.writeEvent({
        type: 'MovieListDeleted',
        payload: {
          id: input.id,
        },
      });
      return true;
    },
    addMovieToList: (_, input, { eventStore, readModel }) => {
      const { movieListId, movieId, movieName } = input;

      if (
        readModel
          .getState()
          .movieLists[movieListId]?.movies.some((movie) => movie.id === movieId)
      ) {
        throw new Error('movie id already exists');
      }

      eventStore.writeEvent({
        type: 'MovieAddedToList',
        payload: {
          movieList: {
            id: movieListId,
          },
          movie: {
            id: movieId,
            name: movieName,
          },
        },
      });
      return true;
    },
    removeMovieFromList: (_, input, { eventStore }) => {
      eventStore.writeEvent({
        type: 'MovieRemovedFromList',
        payload: {
          movieList: {
            id: input.movieListId,
          },
          movie: {
            id: input.movieId,
          },
        },
      });
      return true;
    },
  },
};
