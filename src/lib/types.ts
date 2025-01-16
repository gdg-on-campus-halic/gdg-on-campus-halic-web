import { StaticImageData } from "next/image";

export interface Event {
  bannerImage: StaticImageData;
  images: StaticImageData[];
  title: string;
  slug: string;
  description: string;
  text: string;
  date: string;
  term: string;
  location: string;
}

export type Variant = "green" | "blue" | "red" | "yellow";

export interface TeamMember {
  avatar?: StaticImageData;
  name: string;
  surname: string;
  title: string;
  variant: Variant;
  linkedinUrl?: string;
  instagramUsername?: string;
  githubUsername?: string;
}

export interface Video {
  url: string;
  title: string;
}
