// src/lib/types.ts
import { StaticImageData } from "next/image";

// Event interface - used by components
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

// Variant type for team member roles
export type Variant = "green" | "blue" | "red" | "yellow";

// TeamMember interface - used by components
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

// Video interface
export interface Video {
  url: string;
  title: string;
}

// Site Configuration interface
export interface SiteConfiguration {
  campusName: string;
  joinLink: string;
  instagramUrl: string;
  linkedinUrl: string;
  githubUrl: string;
  discordUrl: string;
}

// About Section interface
export interface AboutSection {
  sectionTitle: string;
  content: string;
  iconName?: string;
  order: number;
}