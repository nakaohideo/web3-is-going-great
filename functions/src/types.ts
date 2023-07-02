type Filter = {
  theme: string[];
  tech?: string[];
  blockchain?: string[];
  sort?: string;
};

type Image = {
  src: string;
  alt: string;
  caption?: string;
  link?: string;
  class?: string;
  isLogo: boolean;
};

type Link = {
  linkText: string;
  href: string;
  extraText?: string;
};

export type ScamAmountDetails = {
  total: number; // Amount used in the grift counter
  lowerBound?: number; // Lower estimate, if there is a range
  upperBound?: number; // Upper estimate, if there is a range
  recovered?: number; // Amount recovered (returned by hacker, etc.), if any
  textOverride?: string; // Text override (used in leaderboard)
};

export type SocialNetwork = "twitter" | "mastodon" | "bluesky";

export type SocialPostGroup = {
  [network in SocialNetwork]?: string;
};

export type Entry = {
  id: string;
  readableId: string;
  title: string;
  shortTitle: string;
  body: string;
  date: string;
  filters: Filter;
  links?: Link[];
  image?: Image;
  color?: string;
  faicon?: string;
  icon?: string;
  scamAmountDetails?: ScamAmountDetails;
  dateString?: string;
  tweetId?: string;
  socialPostIds: SocialPostGroup;
  collection?: string[];
};

export interface RssEntry extends Entry {
  createdAt: string | null;
  updatedAt: string | null;
}

export interface AlgoliaEntry extends Entry {
  objectID: string;
}

export type ResizeResult = {
  size: number;
  success: boolean;
};
