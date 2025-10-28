// src/lib/secure-api.ts
// Client-side functions that call our secure Next.js API routes
// This replaces direct Contentful calls with secure server-side requests
// API keys never leave the server this way!

import { Entry } from 'contentful';
import { 
  EventFields,
  TeamMemberFields,
  VideoFields,
  SiteConfigurationFields,
  AboutSectionFields
} from './contentful';

// Type aliases for responses
export type EventEntry = Entry<EventFields, 'WITHOUT_UNRESOLVABLE_LINKS', string>;
export type TeamMemberEntry = Entry<TeamMemberFields, 'WITHOUT_UNRESOLVABLE_LINKS', string>;
export type VideoEntry = Entry<VideoFields, 'WITHOUT_UNRESOLVABLE_LINKS', string>;
export type SiteConfigurationEntry = Entry<SiteConfigurationFields, 'WITHOUT_UNRESOLVABLE_LINKS', string>;
export type AboutSectionEntry = Entry<AboutSectionFields, 'WITHOUT_UNRESOLVABLE_LINKS', string>;

// Base URL for API routes
const API_BASE = '/api';

// ============================================
// EVENTS API - Secure Client-Side Calls
// ============================================

/**
 * Fetches all events via secure API route
 * API keys stay on the server - much safer!
 */
export async function fetchEvents(term?: string): Promise<EventEntry[]> {
  try {
    // Build URL with optional term parameter
    const url = term ? `${API_BASE}/events?term=${term}` : `${API_BASE}/events`;
    
    const response = await fetch(url);
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch events');
    }
    
    return result.data as EventEntry[];
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

/**
 * Fetches a single event by slug via secure API route
 */
export async function fetchEventBySlug(slug: string): Promise<EventEntry | null> {
  try {
    const response = await fetch(`${API_BASE}/events/${slug}`);
    const result = await response.json();
    
    if (!result.success) {
      return null;
    }
    
    return result.data as EventEntry;
  } catch (error) {
    console.error(`Error fetching event ${slug}:`, error);
    return null;
  }
}

/**
 * Fetches all unique event terms
 */
export async function fetchEventTerms(): Promise<string[]> {
  try {
    // Fetch all events and extract unique terms client-side
    const events = await fetchEvents();
    
    const terms = new Set<string>();
    events.forEach(event => {
      if (event.fields.term) {
        terms.add(event.fields.term);
      }
    });
    
    return Array.from(terms).sort((a, b) => b.localeCompare(a));
  } catch (error) {
    console.error('Error fetching event terms:', error);
    return [];
  }
}

// ============================================
// TEAM MEMBERS API - Secure Client-Side Calls
// ============================================

/**
 * Fetches all team members via secure API route
 */
export async function fetchTeamMembers(variant?: string): Promise<TeamMemberEntry[]> {
  try {
    const url = variant 
      ? `${API_BASE}/team?variant=${variant}` 
      : `${API_BASE}/team`;
    
    const response = await fetch(url);
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch team members');
    }
    
    return result.data as TeamMemberEntry[];
  } catch (error) {
    console.error('Error fetching team members:', error);
    return [];
  }
}

/**
 * Fetches team members grouped by variant
 */
export async function fetchTeamMembersByVariant(): Promise<Record<string, TeamMemberEntry[]>> {
  try {
    const response = await fetch(`${API_BASE}/team`);
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch team members');
    }
    
    // Group members by variant client-side
    const grouped: Record<string, TeamMemberEntry[]> = {
      yellow: [],
      green: [],
      red: [],
      blue: [],
    };
    
    const members = result.data as TeamMemberEntry[];
    members.forEach(member => {
      const variant = member.fields.variant;
      if (variant && grouped[variant]) {
        grouped[variant].push(member);
      }
    });
    
    return grouped;
  } catch (error) {
    console.error('Error fetching team members by variant:', error);
    return { yellow: [], green: [], red: [], blue: [] };
  }
}

// ============================================
// VIDEOS API - Secure Client-Side Calls
// ============================================

/**
 * Fetches all videos via secure API route
 */
export async function fetchVideos(): Promise<VideoEntry[]> {
  try {
    const response = await fetch(`${API_BASE}/videos`);
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch videos');
    }
    
    return result.data as VideoEntry[];
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
}

// ============================================
// SITE CONFIGURATION API - Secure Client-Side Calls
// ============================================

/**
 * Fetches site configuration via secure API route
 */
export async function fetchSiteConfiguration(): Promise<SiteConfigurationEntry | null> {
  try {
    const response = await fetch(`${API_BASE}/config`);
    const result = await response.json();
    
    if (!result.success) {
      return null;
    }
    
    return result.data as SiteConfigurationEntry;
  } catch (error) {
    console.error('Error fetching site configuration:', error);
    return null;
  }
}

// ============================================
// ABOUT SECTIONS API - Secure Client-Side Calls
// ============================================

/**
 * Fetches all about sections via secure API route
 */
export async function fetchAboutSections(): Promise<AboutSectionEntry[]> {
  try {
    const response = await fetch(`${API_BASE}/about`);
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch about sections');
    }
    
    return result.data as AboutSectionEntry[];
  } catch (error) {
    console.error('Error fetching about sections:', error);
    return [];
  }
}