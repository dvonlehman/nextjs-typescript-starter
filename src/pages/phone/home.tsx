import HomePageHead from "components/home-page-head";
import Link from "components/link";
import glamorous from "glamorous";
import api from "lib/api";
import { StellerAppPageProps } from "lib/interfaces";
import * as React from "react";

const Main = glamorous.div({
  padding: 50
});

export default class extends React.Component<StellerAppPageProps> {
  static async getInitialProps() {
    return {
      featuredStories: await api.getFeaturedStories()
    };
  }

  constructor(props: StellerAppPageProps) {
    super(props);
  }

  public render() {
    return (
      <Main>
        <HomePageHead />
        <h2>Phone Home page</h2>
        {this.props.featuredStories && (
          <ul>
            {this.props.featuredStories.map(story => (
              <li key={story.id}>
                <Link
                  href={`/story?storyId=${story.shortId}`}
                  as={`/s/${story.shortId}`}
                >
                  <a>{story.title}</a>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Main>
    );
  }
}
