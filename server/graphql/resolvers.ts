import { Resolvers } from './generated/resolvers';
import { Context } from './context';

export const resolvers: Resolvers<Context> = {
  Query: {
    movieLists: () => {
      return [];
    },
  },
  Mutation: {},
};
