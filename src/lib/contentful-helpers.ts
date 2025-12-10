// src/lib/contentful-helpers.ts
// Helper functions to transform Contentful data into formats our components expect

import { Asset, AssetFile, AssetDetails } from 'contentful';
import { Event, TeamMember } from './types';
import { EventEntry, TeamMemberEntry } from './contentful-api';

// ============================================
// IMAGE HELPERS
// ============================================

/**
 * Extracts the URL from a Contentful Asset
 * Contentful assets have a complex structure, this simplifies it
 * @param asset - Contentful Asset object
 * @returns Image URL string or empty string if not found
 */
export function getImageUrl(asset: Asset | undefined): string {
  if (!asset || !asset.fields || !asset.fields.file) {
    return '';
  }
  
  // Contentful URLs don't include the protocol, so we add https:
  const url = asset.fields.file.url;
  if (typeof url === 'string') {
    return url.startsWith('//') ? `https:${url}` : url;
  }
  return '';
}

/**
 * Gets multiple image URLs from an array of Contentful Assets
 * @param assets - Array of Contentful Asset objects
 * @returns Array of image URL strings
 */
export function getImageUrls(assets: Asset[] | undefined): string[] {
  if (!assets || !Array.isArray(assets)) {
    return [];
  }
  
  return assets.map(asset => getImageUrl(asset)).filter(url => url !== '');
}

/**
 * Creates an image object from a Contentful Asset with proper dimensions
 * This extracts real width/height from the asset metadata
 * @param asset - Contentful Asset object
 * @returns Object with src, width, height properties
 */
export function createImageObject(asset: Asset | undefined) {
  if (!asset || !asset.fields || !asset.fields.file) {
    // Return a placeholder with default dimensions
    return {
      src: '/placeholder.png',
      height: 400,
      width: 600,
      blurDataURL: '/placeholder.png',
    };
  }

  const url = asset.fields.file.url;
  const imageUrl = typeof url === 'string' ? (url.startsWith('//') ? `https:${url}` : url) : '/placeholder.png';
  
  // Extract dimensions from the asset details
  const details = asset.fields.file.details;
  const image = details && 'image' in details ? details.image : undefined;
  
  return {
    src: imageUrl,
    height: image?.height || 400,
    width: image?.width || 600,
    blurDataURL: imageUrl,
  };
}

// ============================================
// EVENT HELPERS
// ============================================

/**
 * Transforms a Contentful Event Entry into the Event format our components expect
 * This bridges the gap between Contentful's data structure and our existing code
 * @param entry - Contentful Event Entry
 * @returns Event object compatible with our components
 */
export function transformContentfulEvent(entry: EventEntry): Event {
  const fields = entry.fields;
  
  return {
    title: typeof fields.title === 'string' ? fields.title : '',
    slug: typeof fields.slug === 'string' ? fields.slug : '',
    description: typeof fields.description === 'string' ? fields.description : '',
    text: typeof fields.text === 'string' ? fields.text : '',
    date: typeof fields.date === 'string' ? fields.date : '',
    term: typeof fields.term === 'string' ? fields.term : '',
    location: typeof fields.location === 'string' ? fields.location : '',
    // Pass the entire Asset object to extract dimensions properly
    bannerImage: createImageObject(fields.bannerImage as Asset),
    images: ((fields.galleryImages as Asset[]) || []).map(asset => 
      createImageObject(asset)
    ),
  };
}

/**
 * Transforms multiple Contentful Event Entries
 * @param entries - Array of Contentful Event Entries
 * @returns Array of Event objects
 */
export function transformContentfulEvents(entries: EventEntry[]): Event[] {
  return entries.map(entry => transformContentfulEvent(entry));
}

// ============================================
// TEAM MEMBER HELPERS
// ============================================

/**
 * Transforms a Contentful TeamMember Entry into the TeamMember format our components expect
 * @param entry - Contentful TeamMember Entry
 * @returns TeamMember object compatible with our components
 */
export function transformContentfulTeamMember(entry: TeamMemberEntry): TeamMember {
  const fields = entry.fields;
  
  return {
    name: typeof fields.name === 'string' ? fields.name : '',
    surname: typeof fields.surname === 'string' ? fields.surname : '',
    title: typeof fields.title === 'string' ? fields.title : '',
    variant: (typeof fields.variant === 'string' ? fields.variant : 'blue') as 'green' | 'blue' | 'red' | 'yellow',
    // Pass the entire Asset object to extract dimensions properly
    avatar: fields.avatar ? createImageObject(fields.avatar as Asset) : undefined,
    linkedinUrl: typeof fields.linkedinUrl === 'string' ? fields.linkedinUrl : undefined,
    instagramUsername: typeof fields.instagramUsername === 'string' ? fields.instagramUsername : undefined,
    githubUsername: typeof fields.githubUsername === 'string' ? fields.githubUsername : undefined,
  };
}

/**
 * Transforms multiple Contentful TeamMember Entries
 * @param entries - Array of Contentful TeamMember Entries
 * @returns Array of TeamMember objects
 */
export function transformContentfulTeamMembers(entries: TeamMemberEntry[]): TeamMember[] {
  return entries.map(entry => transformContentfulTeamMember(entry));
}

// ============================================
// DATE HELPERS
// ============================================

/**
 * Formats a date string for display
 * @param dateString - ISO date string from Contentful
 * @returns Formatted date string (e.g., "April 9, 2025")
 */
export function formatDate(dateString: string): string {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
}

// ============================================
// CACHE HELPERS (Optional but recommended)
// ============================================

/**
 * Simple in-memory cache to reduce API calls
 * This can significantly improve performance
 */
const cache: Record<string, { data: any; timestamp: number }> = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Gets data from cache if it exists and is not expired
 * @param key - Cache key
 * @returns Cached data or null
 */
export function getFromCache(key: string): any | null {
  const cached = cache[key];
  
  if (!cached) return null;
  
  const now = Date.now();
  const isExpired = now - cached.timestamp > CACHE_DURATION;
  
  if (isExpired) {
    delete cache[key];
    return null;
  }
  
  return cached.data;
}

/**
 * Stores data in cache
 * @param key - Cache key
 * @param data - Data to cache
 */
export function setCache(key: string, data: any): void {
  cache[key] = {
    data,
    timestamp: Date.now(),
  };
}

/**
 * Clears all cached data
 * Useful for testing or when you need fresh data
 */
export function clearCache(): void {
  Object.keys(cache).forEach(key => delete cache[key]);
}