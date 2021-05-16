import { ApolloServer } from 'apollo-server-express';
import { Event } from '../events';
import { EventStore } from '../eventStore';
import { ReadModel } from '../readModel';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';

export function newServer(eventStore: EventStore<Event>, readModel: ReadModel) {
  return new ApolloServer({
    typeDefs,
    //@ts-ignore - generated types and apollo-server-express types slightly out of sync
    resolvers,
    context: () => ({
      eventStore,
      readModel,
    }),
    introspection: true,
    playground: true,
  });
}
