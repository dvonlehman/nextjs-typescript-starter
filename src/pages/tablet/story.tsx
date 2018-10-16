import Link from "components/link";
import api from "lib/api";
import { IStoryProps } from "lib/routing";
import Head from "next/head";
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
        <Head>
          <title key="title">Story {this.props.storyId} - steller.co</title>
          <link
            rel="canonical"
            key="canonical"
            href={`https://steller.co/s/${this.props.storyId}`}
          />
        </Head>
        <div>
          <Link href="/home" as="/">
            <a>Back to home</a>
          </Link>
        </div>
        <h2>Tablet Story {this.props.storyId}</h2>
        <p>This is the text for story {this.props.storyId}</p>
      </div>
    );
  }
}

export default withRouter(StoryPage);
