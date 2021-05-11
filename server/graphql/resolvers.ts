import { Resolvers } from './generated/resolvers';
import { EventStore } from '../events';
import { ReadModel } from '../readModel';

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
    deleteList: (_, input, { eventStore }) => {
      eventStore.writeEvent({
        type: 'MovieListDeleted',
        payload: {
          id: input.id,
        },
      });
      return true;
    },
  },
};
