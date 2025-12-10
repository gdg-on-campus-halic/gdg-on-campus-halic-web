// src/lib/contentful-data.ts
// Updated data layer that uses secure API routes instead of direct Contentful calls
// Simply replace the import in this file and your entire app becomes secure!
// This is the magic layer that makes the security upgrade seamless

import {
  fetchEvents,
  fetchEventBySlug,
  fetchEventTerms,
  fetchTeamMembers,
  fetchTeamMembersByVariant,
  fetchVideos,
  fetchSiteConfiguration,
  fetchAboutSections,
} from './secure-api'; // ← Changed from './contentful-api' to './secure-api'

import {
  transformContentfulEvents,
  transformContentfulEvent,
  transformContentfulTeamMembers,
  getFromCache,
  setCache,
} from './contentful-helpers';

import { Event, TeamMember, Video, SiteConfiguration, AboutSection } from './types';

// ============================================
// EVENTS - Now Secure!
// ============================================

/**
 * Gets all events, optionally filtered by term
 * Now fetches through secure API routes
 */
export async function getEvents(term?: string): Promise<Event[]> {
  const cacheKey = `events-${term || 'all'}`;
  
  // Check cache first to reduce API calls
  const cached = getFromCache(cacheKey);
  if (cached) {
    return cached;
  }

  // Fetch through secure API route
  const entries = await fetchEvents(term);
  const events = transformContentfulEvents(entries);
  
  // Store in cache
  setCache(cacheKey, events);
  
  return events;
}

/**
 * Gets a single event by slug
 * Now fetches through secure API routes
 */
export async function getEventBySlug(slug: string): Promise<Event | null> {
  const cacheKey = `event-${slug}`;
  
  const cached = getFromCache(cacheKey);
  if (cached) {
    return cached;
  }

  // Fetch through secure API route
  const entry = await fetchEventBySlug(slug);
  
  if (!entry) {
    return null;
  }
  
  const event = transformContentfulEvent(entry);
  setCache(cacheKey, event);
  
  return event;
}

/**
 * Gets all available event terms (academic years)
 * Now fetches through secure API routes
 */
export async function getEventTerms(): Promise<string[]> {
  const cacheKey = 'event-terms';
  
  const cached = getFromCache(cacheKey);
  if (cached) {
    return cached;
  }

  const terms = await fetchEventTerms();
  setCache(cacheKey, terms);
  
  return terms;
}

// ============================================
// TEAM MEMBERS - Now Secure!
// ============================================

/**
 * Gets all team members, optionally filtered by variant
 * Now fetches through secure API routes
 */
export async function getTeamMembers(variant?: string): Promise<TeamMember[]> {
  const cacheKey = `team-members-${variant || 'all'}`;
  
  const cached = getFromCache(cacheKey);
  if (cached) {
    return cached;
  }

  const entries = await fetchTeamMembers(variant);
  const members = transformContentfulTeamMembers(entries);
  
  setCache(cacheKey, members);
  
  return members;
}

/**
 * Gets team members grouped by variant (color/team)
 * Now fetches through secure API routes
 */
export async function getTeamMembersByVariant(): Promise<Record<string, TeamMember[]>> {
  const cacheKey = 'team-members-grouped';
  
  const cached = getFromCache(cacheKey);
  if (cached) {
    return cached;
  }

  const grouped = await fetchTeamMembersByVariant();
  
  // Transform each group
  const result: Record<string, TeamMember[]> = {
    yellow: transformContentfulTeamMembers(grouped.yellow),
    green: transformContentfulTeamMembers(grouped.green),
    red: transformContentfulTeamMembers(grouped.red),
    blue: transformContentfulTeamMembers(grouped.blue),
  };
  
  setCache(cacheKey, result);
  
  return result;
}

// ============================================
// VIDEOS - Now Secure!
// ============================================

/**
 * Gets all videos
 * Now fetches through secure API routes
 */
export async function getVideos(): Promise<Video[]> {
  const cacheKey = 'videos';
  
  const cached = getFromCache(cacheKey);
  if (cached) {
    return cached;
  }

  const entries = await fetchVideos();
  
  // Transform to our Video type
  const videos = entries.map(entry => ({
    url: typeof entry.fields.url === 'string' ? entry.fields.url : '',
    title: typeof entry.fields.title === 'string' ? entry.fields.title : '',
  }));
  
  setCache(cacheKey, videos);
  
  return videos;
}

// ============================================
// SITE CONFIGURATION - Now Secure!
// ============================================

/**
 * Gets site configuration (social links, campus name, etc.)
 * Now fetches through secure API routes
 */
export async function getSiteConfiguration(): Promise<SiteConfiguration | null> {
  const cacheKey = 'site-config';
  
  const cached = getFromCache(cacheKey);
  if (cached) {
    return cached;
  }

  const entry = await fetchSiteConfiguration();
  
  if (!entry) {
    return null;
  }

  const config: SiteConfiguration = {
    campusName: typeof entry.fields.campusName === 'string' ? entry.fields.campusName : '',
    joinLink: typeof entry.fields.joinLink === 'string' ? entry.fields.joinLink : '',
    instagramUrl: typeof entry.fields.instagramUrl === 'string' ? entry.fields.instagramUrl : '',
    linkedinUrl: typeof entry.fields.linkedinUrl === 'string' ? entry.fields.linkedinUrl : '',
    githubUrl: typeof entry.fields.githubUrl === 'string' ? entry.fields.githubUrl : '',
    discordUrl: typeof entry.fields.discordUrl === 'string' ? entry.fields.discordUrl : '',
  };
  
  setCache(cacheKey, config);
  
  return config;
}

// ============================================
// ABOUT SECTIONS - Now Secure!
// ============================================

/**
 * Gets all about sections, sorted by order
 * Now fetches through secure API routes
 */
export async function getAboutSections(): Promise<AboutSection[]> {
  const cacheKey = 'about-sections';
  
  const cached = getFromCache(cacheKey);
  if (cached) {
    return cached;
  }

  const entries = await fetchAboutSections();
  
  const sections = entries.map(entry => ({
    sectionTitle: typeof entry.fields.sectionTitle === 'string' ? entry.fields.sectionTitle : '',
    content: typeof entry.fields.content === 'string' ? entry.fields.content : '',
    iconName: typeof entry.fields.iconName === 'string' ? entry.fields.iconName : undefined,
    order: typeof entry.fields.order === 'number' ? entry.fields.order : 0,
  }));
  
  setCache(cacheKey, sections);
  
  return sections;
}