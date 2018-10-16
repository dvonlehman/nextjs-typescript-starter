import Head from "next/head";
import * as React from "react";

function HomePageHead(): JSX.Element {
  return (
    <Head>
      <title key="title">steller.co</title>
      <link rel="canonical" key="canonical" href="https://steller.co" />
    </Head>
  );
}

export default HomePageHead;
