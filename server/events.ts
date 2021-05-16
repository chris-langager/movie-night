export interface MovieListCreated {
  type: 'MovieListCreated';
  payload: {
    id: string;
    name: string;
  };
}

export interface MovieListRenamed {
  type: 'MovieListRenamed';
  payload: {
    id: string;
    name: string;
  };
}

export interface MovieListDeleted {
  type: 'MovieListDeleted';
  payload: {
    id: string;
  };
}

export interface MovieAddedToList {
  type: 'MovieAddedToList';
  payload: {
    movieList: {
      id: string;
    };
    movie: {
      id: string;
      name: string;
    };
  };
}

export interface MovieRemovedFromList {
  type: 'MovieRemovedFromList';
  payload: {
    movieList: {
      id: string;
    };
    movie: {
      id: string;
    };
  };
}

export type Event =
  | MovieListCreated
  | MovieListRenamed
  | MovieListDeleted
  | MovieAddedToList
  | MovieRemovedFromList;
