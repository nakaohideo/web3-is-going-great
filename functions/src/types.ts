export type EntryQuery = {
  limit?: number;
  cursor?: string;
  startAtId?: string;
  theme: string[];
  tech?: string[];
  blockchain?: string[];
  sort?: string;
};

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
};

type Link = {
  linkText: string;
  href: string;
  extraText?: string;
};

export type Entry = {
  id: string;
  title: string;
  body: string;
  date: string;
  filters: Filter;
  links?: Link[];
  image?: Image;
  color?: string;
  faicon?: string;
  icon?: string;
  scamTotal?: number;
  dateString?: string;
};

export interface RssEntry extends Entry {
  createdAt: string | null;
  updatedAt: string | null;
}

export type AttributionEntry = {
  href: string;
  text: string;
};
