import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;700&family=Nunito:wght@800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="bg-zinc-200 text-zinc-800">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
