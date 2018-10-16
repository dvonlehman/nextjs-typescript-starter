import Link from "components/link";
import StoryPageHead from "components/story-page-head";
import api from "lib/api";
import { IStoryProps } from "lib/routing";
import { withRouter } from "next/router";
import * as React from "react";

class StoryPage extends React.Component<IStoryProps> {
  static async getInitialProps(context): Promise<Partial<IStoryProps>> {
    return {
      storyId: context.query.storyId,
      story: await api.getStoryByShortId(context.query.storyId)
    };
  }

  constructor(props: IStoryProps) {
    super(props);
  }

  render() {
    return (
      <div className="main">
        <StoryPageHead story={this.props.story} />
        <div>
          <Link href="/home" as="/">
            <a>Back to home</a>
          </Link>
        </div>
        <h2>Desktop Story {this.props.storyId}</h2>
        <p>This is the text for story {this.props.storyId}</p>
      </div>
    );
  }
}

export default withRouter(StoryPage);
