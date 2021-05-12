import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { sdk } from '../graphql/sdk';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const MovieList: React.FC<Props['movieLists'][number]> = (props) => {
  const { name, movies } = props;
  return (
    <div>
      <h4>{name}</h4>
      <ol>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.name}</li>
        ))}
      </ol>
    </div>
  );
};

const Home: React.FC<Props> = (props) => {
  return (
    <>
      <div>
        <Head>
          <title>Movie Night</title>
          <meta name="description" content="Movie Night" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="main">
          Movie Night
          {props.movieLists.map((movieList) => (
            <MovieList {...movieList} />
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
