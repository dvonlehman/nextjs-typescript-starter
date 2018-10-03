import React from "react";
import { Link } from "../routes";

export default class extends React.Component {
  static getInitialProps() {
    return {};
  }

  constructor(props: any) {
    super(props);
  }

  // handling escape close
  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className="main">
        <h2>Home page</h2>
        <ul>
          <li>
            <Link route="story" params={{ storyId: "1" }}>
              <a>Story 1</a>
            </Link>
          </li>
          <li>
            <Link route="story" params={{ storyId: "2" }}>
              <a>Story 2</a>
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
