import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="description" content="Get your daily fortune cookie with unique, whimsical predictions" />
        <meta property="og:title" content="Fortune Keeper" />
        <meta property="og:description" content="Get your daily fortune cookie with unique, whimsical predictions" />
        <meta property="og:type" content="website" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
} 