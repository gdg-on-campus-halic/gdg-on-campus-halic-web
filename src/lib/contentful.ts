// src/lib/contentful.ts
// This file sets up the Contentful client to fetch data from our CMS

import { createClient, EntryFieldTypes } from 'contentful';

// Check if environment variables are set
if (!process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID) {
  throw new Error('NEXT_PUBLIC_CONTENTFUL_SPACE_ID is not set');
}

if (!process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN) {
  throw new Error('NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN is not set');
}

// Define the skeleton types for Contentful entries
// This helps TypeScript understand the structure of data coming from Contentful

export interface EventFields {
  title: EntryFieldTypes.Text;
  slug: EntryFieldTypes.Text;
  description: EntryFieldTypes.Text;
  text: EntryFieldTypes.Text;
  date: EntryFieldTypes.Date;
  term: EntryFieldTypes.Text;
  location: EntryFieldTypes.Text;
  bannerImage: EntryFieldTypes.AssetLink;
  galleryImages: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
}

export interface TeamMemberFields {
  name: EntryFieldTypes.Text;
  surname: EntryFieldTypes.Text;
  title: EntryFieldTypes.Text;
  variant: EntryFieldTypes.Text;
  avatar?: EntryFieldTypes.AssetLink;
  linkedinUrl?: EntryFieldTypes.Text;
  instagramUsername?: EntryFieldTypes.Text;
  githubUsername?: EntryFieldTypes.Text;
}

export interface VideoFields {
  title: EntryFieldTypes.Text;
  url: EntryFieldTypes.Text;
}

export interface SiteConfigurationFields {
  campusName: EntryFieldTypes.Text;
  joinLink: EntryFieldTypes.Text;
  instagramUrl: EntryFieldTypes.Text;
  linkedinUrl: EntryFieldTypes.Text;
  githubUrl: EntryFieldTypes.Text;
  discordUrl: EntryFieldTypes.Text;
}

export interface AboutSectionFields {
  sectionTitle: EntryFieldTypes.Text;
  content: EntryFieldTypes.Text;
  iconName?: EntryFieldTypes.Text;
  order: EntryFieldTypes.Integer;
}

// Create and export the Contentful client
// This client will be used throughout the app to fetch data
export const contentfulClient = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

// Optional: Create a preview client for draft content
export const previewClient = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN || '',
  host: 'preview.contentful.com',
});