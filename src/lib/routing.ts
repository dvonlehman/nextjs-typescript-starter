import { DefaultQuery, WithRouterProps } from "next/router";
import { IStory } from "./interfaces";

export interface IStoryPageQuery extends DefaultQuery {
  readonly storyId: string;
}

export interface IStoryProps extends WithRouterProps<IStoryPageQuery> {
  readonly storyId: string;
  story: IStory;
}
