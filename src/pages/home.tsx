import { rehydrate } from "glamor";
import glamorous from "glamorous";
import * as React from "react";
import { Link } from "../lib/routes";

// Adds server generated styles to glamor cache.
// Has to run before any `style()` calls
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== "undefined") {
  rehydrate((window as any).__NEXT_DATA__.ids);
}

const Main = glamorous.div({
  padding: 50
});

export default class extends React.Component {
  // private static getInitialProps() {
  //   return {};
  // }

  constructor(props: any) {
    super(props);
  }

  // handling escape close
  public componentDidMount() {}

  public componentWillUnmount() {}

  public render() {
    return (
      <Main>
        <h2>Home page</h2>
        <ul>
          <li>
            <Link route="story" storyId="8hjMuPGmDVn">
              <a>Best Hotels in the World</a>
            </Link>
          </li>
          <li>
            <Link route="story" storyId="8a6vu9haZcn">
              <a>Time to reflect</a>
            </Link>
          </li>
        </ul>
      </Main>
    );
  }
}
