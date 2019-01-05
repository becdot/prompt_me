import React from 'react';
import Head from 'next/head';

export default () => (
  <div>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
    </Head>
    <style jsx global>
      {`
        body {
          background: rgb(205, 69, 69);;
          font-family: "Courier";
        }
      `}
    </style>
  </div>
);
