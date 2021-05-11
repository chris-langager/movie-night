import Head from "next/head";

export default function Home() {
  return (
    <>
      <div>
        <Head>
          <title>Movie Night</title>
          <meta name="description" content="Movie Night" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="main">something</main>
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
}
