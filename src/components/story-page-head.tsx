import { IFullStory } from "lib/interfaces";
import Head from "next/head";
import * as React from "react";

export interface StoryPageHeadProps {
  story: IFullStory;
}

function StoryPageHead(props: StoryPageHeadProps): JSX.Element {
  return (
    <Head>
      <title key="title">Story {props.story.shortId} - steller.co</title>
      <link
        rel="canonical"
        key="canonical"
        href={`https://steller.co/s/${props.story.shortId}`}
      />
    </Head>
  );
}

export default StoryPageHead;
