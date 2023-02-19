import React, { ReactNode } from 'react';
import Link from 'next/link';
import Head from 'next/head';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <div className="wrapper">
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link
        href="https://fonts.googleapis.com/css2?family=Lobster&display=swap"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Maven+Pro:wght@400;500;600;700;800;900&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined"
      />
    </Head>
    <header>
      <nav>
        <Link href="/">Home</Link> | <Link href="/history">history</Link>
      </nav>
    </header>
    <div>{children}</div>
    <footer>
      <p>
        Fiat currency exchange app with ssr and server caching api built with
        nextjs by <a href="https://twitter.com/benchaaben">@benchaaben</a>
        <br />
        Exchange rates are provided by{' '}
        <a href="https://api.exchangerate">https://api.exchangerate</a>
      </p>
    </footer>
  </div>
);

export default Layout;
