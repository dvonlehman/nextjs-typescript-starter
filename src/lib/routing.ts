import { IStory } from "lib/interfaces";
import { DefaultQuery, WithRouterProps } from "next/router";

export interface IStoryPageQuery extends DefaultQuery {
  readonly storyId: string;
}

export interface IStoryProps extends WithRouterProps<IStoryPageQuery> {
  readonly storyId: string;
  story: IStory;
}
