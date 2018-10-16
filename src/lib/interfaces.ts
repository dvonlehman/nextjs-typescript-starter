export interface IStory {
  readonly id: string;
  readonly shortId: string;
  readonly version: number;
  readonly themeId: string;
  readonly coverSrc: string;
  readonly coverBg: string;
  readonly pageCount: number;
  readonly shareUrl: string;
  readonly landscapeShareImage: string;
  readonly pages: IStoryPage[];
  readonly title: string;
  readonly user: IUser;
  readonly snippet: {
    text: string;
    entities: {
      hashtags: Array<{
        hashtag: string;
        indices: number[];
      }>;
    };
  };
  collectionCount: number;
  commentCount: number;
  commentingEnabled: boolean;
  revision: number;
  coverSrc320x480: string;
  coverSrc160x240: string;
  likes: {
    count: number;
    currentUser: boolean;
  };
  createdAt: number;
  updatedAt: number;
  private: boolean;
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
  getStoryById: (storyId: string) => Promise<IStory>;
  getStoryByShortId: (storyId: string) => Promise<IStory>;
}

type LoggerMethod = (message: string, meta?: any) => void;

export interface ILogger {
  error: LoggerMethod;
  warn: LoggerMethod;
  info: LoggerMethod;
  debug: LoggerMethod;
}

export interface StellerAppPageProps extends Record<string, any> {
  deviceFamily: DeviceFamily;
}

export enum DeviceFamily {
  phone = "phone",
  tablet = "tablet",
  desktop = "desktop"
}
