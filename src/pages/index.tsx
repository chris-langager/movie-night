import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { sdk } from '../graphql/sdk';
import * as uuid from 'uuid';
import { useState } from 'react';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const MovieList: React.FC<Props['movieLists'][number]> = (props) => {
  const { id, name } = props;
  const [movies, setMovies] = useState(props.movies);
  const [newMovieName, setNewMovieName] = useState('');
  const addMovie = () => {
    if (!newMovieName) {
      return;
    }
    const movie = { id: uuid.v4(), name: newMovieName };
    sdk.addMovieToList({
      movieListId: id,
      movieId: movie.id,
      movieName: movie.name,
    });
    setMovies([...movies, movie]);
    setNewMovieName('');
  };
  return (
    <div>
      <h4>{name}</h4>
      <input
        type="text"
        value={newMovieName}
        onChange={(e) => setNewMovieName(e.currentTarget.value)}
        onKeyDown={(e) => e.key === 'Enter' && addMovie()}
      />
      <button onClick={addMovie}>Add Movie</button>
      <ol>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.name}</li>
        ))}
      </ol>
    </div>
  );
};

const Home: React.FC<Props> = (props) => {
  const { movieLists } = props;
  return (
    <>
      <div>
        <Head>
          <title>Movie Night</title>
          <meta name="description" content="Movie Night" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="main">
          <h1>Movie Night</h1>
          {movieLists.map((movieList) => (
            <MovieList key={movieList.id} {...movieList} />
          ))}
        </main>
      </div>

      <style jsx>
        {`
          .main {
            padding: 5rem 0;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
        `}
      </style>
    </>
  );
};

export const getServerSideProps = async () => {
  const { movieLists } = await sdk.listMovieLists();
  return {
    props: {
      movieLists,
    },
  };
};

export default Home;
