import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Movie = {
  __typename?: 'Movie';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type MovieList = {
  __typename?: 'MovieList';
  id: Scalars['ID'];
  name: Scalars['String'];
  movies: Array<Movie>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createList?: Maybe<Scalars['Boolean']>;
  deleteList?: Maybe<Scalars['Boolean']>;
  renameList?: Maybe<Scalars['Boolean']>;
  addMovieToList?: Maybe<Scalars['Boolean']>;
  removeMovieFromList?: Maybe<Scalars['Boolean']>;
};


export type MutationCreateListArgs = {
  id: Scalars['String'];
  name: Scalars['String'];
};


export type MutationDeleteListArgs = {
  id: Scalars['String'];
};


export type MutationRenameListArgs = {
  id: Scalars['String'];
  name: Scalars['String'];
};


export type MutationAddMovieToListArgs = {
  movieListId: Scalars['String'];
  movieId: Scalars['String'];
  movieName: Scalars['String'];
};


export type MutationRemoveMovieFromListArgs = {
  movieListId: Scalars['String'];
  movieId: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  movieLists: Array<MovieList>;
};

export type AddMovieToListMutationVariables = Exact<{
  movieListId: Scalars['String'];
  movieId: Scalars['String'];
  movieName: Scalars['String'];
}>;


export type AddMovieToListMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addMovieToList'>
);

export type ListMovieListsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListMovieListsQuery = (
  { __typename?: 'Query' }
  & { movieLists: Array<(
    { __typename?: 'MovieList' }
    & Pick<MovieList, 'id' | 'name'>
    & { movies: Array<(
      { __typename?: 'Movie' }
      & Pick<Movie, 'id' | 'name'>
    )> }
  )> }
);


export const AddMovieToListDocument = gql`
    mutation addMovieToList($movieListId: String!, $movieId: String!, $movieName: String!) {
  addMovieToList(
    movieListId: $movieListId
    movieId: $movieId
    movieName: $movieName
  )
}
    `;
export const ListMovieListsDocument = gql`
    query listMovieLists {
  movieLists {
    id
    name
    movies {
      id
      name
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = sdkFunction => sdkFunction();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    addMovieToList(variables: AddMovieToListMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AddMovieToListMutation> {
      return withWrapper(() => client.request<AddMovieToListMutation>(AddMovieToListDocument, variables, requestHeaders));
    },
    listMovieLists(variables?: ListMovieListsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ListMovieListsQuery> {
      return withWrapper(() => client.request<ListMovieListsQuery>(ListMovieListsDocument, variables, requestHeaders));
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;