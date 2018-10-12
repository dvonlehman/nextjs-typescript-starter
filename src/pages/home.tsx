import * as React from "react";
import { Link } from "../lib/routes";

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
      <div className="main">
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
        <style jsx>{`
          .main {
            padding: 50px;
          }
        `}</style>
      </div>
    );
  }
}
