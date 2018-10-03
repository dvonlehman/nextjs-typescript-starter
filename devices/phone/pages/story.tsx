import React from "react";

// import Photo from '../components/frame'

// export interface IStoryPageProps {
//   storyId: string
// };

export interface IStoryPageProps {
  url: {
    query: { storyId: string };
  };
}

export default (props: IStoryPageProps) => (
  <div>Viewing story {props.url.query.storyId}</div>
);
