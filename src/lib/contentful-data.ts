// src/lib/contentful-data.ts
// Unified data layer - combines API calls with data transformation
// This is the main file you'll import in your components

import {
  fetchEvents,
  fetchEventBySlug,
  fetchEventTerms,
  fetchTeamMembers,
  fetchTeamMembersByVariant,
  fetchVideos,
  fetchSiteConfiguration,
  fetchAboutSections,
} from './contentful-api';

import {
  transformContentfulEvents,
  transformContentfulEvent,
  transformContentfulTeamMembers,
  getFromCache,
  setCache,
} from './contentful-helpers';

import { Event, TeamMember, Video, SiteConfiguration, AboutSection } from './types';

// ============================================
// EVENTS
// ============================================

/**
 * Gets all events, optionally filtered by term
 * Includes caching to improve performance
 */
export async function getEvents(term?: string): Promise<Event[]> {
  const cacheKey = `events-${term || 'all'}`;
  
  // Check cache first
  const cached = getFromCache(cacheKey);
  if (cached) {
    return cached;
  }

  // Fetch from Contentful
  const entries = await fetchEvents(term);
  const events = transformContentfulEvents(entries);
  
  // Store in cache
  setCache(cacheKey, events);
  
  return events;
}

/**
 * Gets a single event by slug
 */
export async function getEventBySlug(slug: string): Promise<Event | null> {
  const cacheKey = `event-${slug}`;
  
  const cached = getFromCache(cacheKey);
  if (cached) {
    return cached;
  }

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
// TEAM MEMBERS
// ============================================

/**
 * Gets all team members, optionally filtered by variant
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
 * Returns an object with keys: yellow, green, red, blue
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
// VIDEOS
// ============================================

/**
 * Gets all videos
 */
export async function getVideos(): Promise<Video[]> {
  const cacheKey = 'videos';
  
  const cached = getFromCache(cacheKey);
  if (cached) {
    return cached;
  }

  const entries = await fetchVideos();
  
  // Videos don't need transformation - they're already in the right format
  const videos = entries.map(entry => ({
    url: entry.fields.url,
    title: entry.fields.title,
  }));
  
  setCache(cacheKey, videos);
  
  return videos;
}

// ============================================
// SITE CONFIGURATION
// ============================================

/**
 * Gets site configuration (social links, campus name, etc.)
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
    campusName: entry.fields.campusName,
    joinLink: entry.fields.joinLink,
    instagramUrl: entry.fields.instagramUrl,
    linkedinUrl: entry.fields.linkedinUrl,
    githubUrl: entry.fields.githubUrl,
    discordUrl: entry.fields.discordUrl,
  };
  
  setCache(cacheKey, config);
  
  return config;
}

// ============================================
// ABOUT SECTIONS
// ============================================

/**
 * Gets all about sections, sorted by order
 */
export async function getAboutSections(): Promise<AboutSection[]> {
  const cacheKey = 'about-sections';
  
  const cached = getFromCache(cacheKey);
  if (cached) {
    return cached;
  }

  const entries = await fetchAboutSections();
  
  const sections = entries.map(entry => ({
    sectionTitle: entry.fields.sectionTitle,
    content: entry.fields.content,
    iconName: entry.fields.iconName,
    order: entry.fields.order,
  }));
  
  setCache(cacheKey, sections);
  
  return sections;
}