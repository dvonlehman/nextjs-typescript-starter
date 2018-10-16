import HomePageHead from "components/home-page-head";
import Link from "components/link";
import glamorous from "glamorous";
import { StellerAppPageProps } from "lib/interfaces";
import * as React from "react";

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
        <HomePageHead />
        <h2>Desktop Home page</h2>
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
