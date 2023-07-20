import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>
          {
            "One stop solution for launching you online! Web3.0 | Complex UI | NFTs"
          }
        </title>
        <meta
          name="description"
          content="Best Software Consulting services online. Transform your vision into reality with our expert full-stack development services."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
        {/* Other custom meta tags, stylesheets, etc. */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
