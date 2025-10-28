// src/lib/contentful.ts
// This file sets up the Contentful client for SERVER-SIDE use only
// ⚠️ IMPORTANT: This file should ONLY be imported in API routes (app/api/**/route.ts)
// ⚠️ NEVER import this file in client components - use the API routes instead!

import { createClient, EntryFieldTypes } from 'contentful';

// Check if environment variables are set
// Note: We removed NEXT_PUBLIC_ prefix to keep credentials server-side only
if (!process.env.CONTENTFUL_SPACE_ID) {
  throw new Error('CONTENTFUL_SPACE_ID is not set in environment variables');
}

if (!process.env.CONTENTFUL_ACCESS_TOKEN) {
  throw new Error('CONTENTFUL_ACCESS_TOKEN is not set in environment variables');
}

// Define the skeleton types for Contentful entries
// These types help TypeScript understand the structure of data coming from Contentful

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
// ⚠️ This client can ONLY be used in API routes (server-side)
// The credentials are NOT exposed to the browser
export const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

// Optional: Create a preview client for draft content
// Only initialize if preview token is provided
export const previewClient = process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
  ? createClient({
      space: process.env.CONTENTFUL_SPACE_ID!,
      accessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN!,
      host: 'preview.contentful.com',
    })
  : null;

/**
 * Helper function to choose between preview and production client
 * Useful for implementing preview mode in your application
 */
export function getContentfulClient(preview: boolean = false) {
  if (preview && previewClient) {
    return previewClient;
  }
  return contentfulClient;
}