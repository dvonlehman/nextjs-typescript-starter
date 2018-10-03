import React from "react";
import { Link } from "../routes";
import { WithRouterProps, withRouter } from "next/router";
import story from "devices/phone/pages/story";

interface IStoryPageQuery {
  readonly storyId: string;
}

interface IStoryProps extends WithRouterProps<IStoryPageQuery> {
  readonly storyId: string;
}

class StoryPage extends React.Component<IStoryProps> {
  // static getInitialProps() {
  //   return {};
  // }

  constructor(props: IStoryProps) {
    super(props);
  }

  // handling escape close
  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const storyId = this.props.router.query && this.props.router.query.storyId;
    return (
      <div className="main">
        <div>
          <Link to="/">
            <a>Back to home</a>
          </Link>
        </div>
        <h2>Story {storyId}</h2>
        <p>This is the text for story {storyId}</p>
      </div>
    );
  }
}

export default withRouter(StoryPage);
