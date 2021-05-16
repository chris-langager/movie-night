import { MovieList, Movie, State } from '../readModel';
import { html } from './html';
import { layout } from './layout';

export function movieLists(state: State) {
  const movieLists = Object.values(state.movieLists);

  const content = html`
    <main className="main">
      <h1>Movie Night</h1>
      ${movieLists.map(MovieList).join('\n')}
    </main>
  `;
  return layout(content);
}

function MovieList(movieList: MovieList) {
  const { id, name, movies } = movieList;
  return html` <div class="movie-list">
    <h4>${name}</h4>
    <input type="text" value="" />
    <button>Add Movie</button>
    ${Movies(movies)}
  </div>`;
}

function Movies(movies: Movie[]) {
  return html`<ol>
    ${movies.map((movie) => html`<li key="${movie.id}">${movie.name}</li>`).join('\n')}
  </ol>`;
}
