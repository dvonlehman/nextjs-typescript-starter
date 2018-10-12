import { NextContext } from "next";
import Head from "next/head";
import { DefaultQuery, withRouter, WithRouterProps } from "next/router";
import * as React from "react";
import api from "../lib/api";
import { IStory } from "../lib/interfaces";
import { Link } from "../lib/routes";

interface IStoryPageQuery extends DefaultQuery {
  readonly storyId: string;
}

interface IStoryProps extends WithRouterProps<IStoryPageQuery> {
  readonly storyId: string;
  story: IStory;
}

class StoryPage extends React.Component<IStoryProps> {
  static async getInitialProps(
    context: NextContext<IStoryPageQuery>
  ): Promise<Partial<IStoryProps>> {
    // This is defined on the server only
    return {
      story: await api.getStoryByShortId(context.query.storyId)
    };
  }

  constructor(props: IStoryProps) {
    super(props);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const storyId = this.props.router.query && this.props.router.query.storyId;
    return (
      <div className="main">
        <Head>
          <title key="title">Story {storyId} - steller.co</title>
          <link
            rel="canonical"
            key="canonical"
            href={`https://steller.co/s/${storyId}`}
          />
        </Head>
        <div>
          <Link route="home">
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
