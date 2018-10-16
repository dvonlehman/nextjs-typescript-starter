import { UrlLike } from "next/router";

export interface IStory {
  readonly id: string;
  readonly shortId: string;
  readonly version: number;
  readonly user: IUser;
  readonly themeId: string;
  readonly revision: number;
  readonly coverSrc: string;
  readonly coverBg: string;
  readonly shareUrl: string;
  readonly landscapeShareImage: string;
  readonly pageCount: number;
  readonly title: string;
  readonly collectionCount: number;
  readonly commentCount: number;
  readonly coverSrc320x480: string;
  readonly coverSrc160x240: string;
  readonly likes: {
    readonly count: number;
    readonly currentUser: boolean;
  };
  readonly private: boolean;

  readonly snippet: {
    text: string;
    entities: {
      hashtags: Array<{
        hashtag: string;
        indices: number[];
      }>;
    };
  };
}

export interface ICompactStory extends IStory {
  readonly attribution: {
    readonly collection: {
      readonly id: string;
      readonly revision: number;
      readonly user: IUser;
      readonly name: string;
      readonly webName: string;
      readonly headerImageUrl: UrlLike;
      readonly headerImageBg: string;
      readonly followers: number;
      readonly explicitlyFollowed: boolean;
      readonly implicityFollowed: boolean;
      readonly stories: number;
    };
  };
}

export interface IFullStory extends IStory {
  readonly pages: IStoryPage[];
  readonly createdAt: number;
  readonly updatedAt: number;
}

export interface IUser {
  id: string;
  revision: number;
  displayName: string;
  avatarImageUrl: string;
  avatarImageBg: string;
  headerImageBg: string;
  followers: number;
  following: number;
  explicitlyFollowed: boolean;
  implicitlyFollowed: boolean;
  followsYou: boolean;
  blocked: boolean;
  stories: number;
  followRequestSent: boolean;
  followRequestReceived: boolean;
  _username: string;
  private: boolean;
}

export interface IStoryPage {
  readonly templateId: string;
  readonly templateRev: number;
  readonly layers: IStoryLayer[];
}

// export IPictureLayer extends IStoryLayer {

// }
export interface ITextColor {
  color: string;
  background: string;
}

export interface IParagraphLayer extends IStoryLayer {
  text: string;
  textSize: number;
  textSizes: ReadonlyArray<number>;
  textFont: string;
  textFonts: ReadonlyArray<string>;
  textAlign: "center" | "left" | "right";
  color: ITextColor;
  colors: ReadonlyArray<ITextColor>;
  lineBreaks: ReadonlyArray<number>;
  lineHeight: number;
  lineHeightMultiplier: number;
  verticalAlignment: "top" | "middle" | "bottom";
  borderTop: number;
  borderBottom: number;
  borderLeft: number;
  borderRight: number;
  borderTopColor: string;
  borderBottomColor: string;
  borderLeftColor: string;
  borderRightColor: string;
  editable: number;
  movable: number;
  autoShrink: number;
}

export interface IGroupLayer extends IStoryLayer {
  layers: IStoryLayer[];
}

export interface IStoryLayer {
  id: number;
  type: "picture" | "paragraph" | "group" | "video" | "form";
  classes: ReadonlyArray<string>;
  x: number;
  y: number;
  width: number;
  height: number;
  editOrder: number;
}

export interface IApi {
  getStoryById: (storyId: string) => Promise<IFullStory>;
  getStoryByShortId: (storyId: string) => Promise<IFullStory>;
  getFeaturedStories: () => Promise<ICompactStory[]>;
}

type LoggerMethod = (message: string, meta?: any) => void;

export interface ILogger {
  error: LoggerMethod;
  warn: LoggerMethod;
  info: LoggerMethod;
  debug: LoggerMethod;
}

export interface StellerAppPageProps extends Record<string, any> {
  featuredStories: ICompactStory[];
}

export enum DeviceFamily {
  phone = "phone",
  tablet = "tablet",
  desktop = "desktop"
}
