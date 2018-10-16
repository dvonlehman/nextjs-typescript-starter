import Link from "components/link";
import { rehydrate } from "glamor";
import glamorous from "glamorous";
import { StellerAppPageProps } from "lib/interfaces";
import Head from "next/head";
import * as React from "react";

// Adds server generated styles to glamor cache.
// Has to run before any `style()` calls
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== "undefined") {
  rehydrate((window as any).__NEXT_DATA__.ids);
}

const Main = glamorous.div({
  padding: 50
});

export default class extends React.Component<StellerAppPageProps> {
  // private static getInitialProps() {
  //   return {};
  // }

  constructor(props: StellerAppPageProps) {
    super(props);
  }

  public render() {
    return (
      <Main>
        <Head>
          <title key="title">steller.co</title>
          <link rel="canonical" key="canonical" href="https://steller.co" />
        </Head>
        <h2>Dekstop Home page</h2>
        <ul>
          <li>
            <Link href="/story?storyId=8hjMuPGmDVn" as="/s/8hjMuPGmDVn">
              <a>Best Hotels in the World</a>
            </Link>
          </li>
          <li>
            <Link href="/story?storyId=8a6vu9haZcn" as="/s/8a6vu9haZcn">
              <a>Time to reflect</a>
            </Link>
          </li>
        </ul>
      </Main>
    );
  }
}
