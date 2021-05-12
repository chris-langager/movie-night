import { GraphQLClient } from 'graphql-request';
import { getSdk } from './generated/sdk';

const url =
  typeof window === 'undefined'
    ? `http://localhost:${process.env.PORT || 3000}/graphql`
    : '/graphql';

export function newSdk() {
  const client = new GraphQLClient(url, {
    credentials: 'include',
  });
  return getSdk(client);
}

export const sdk = newSdk();
