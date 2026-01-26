// src/lib/contentful-api.ts
// This file contains all functions to fetch data from Contentful
// Each function is responsible for fetching a specific content type

import { Entry } from 'contentful';
import { 
  contentfulClient,
  EventFields,
  TeamMemberFields,
  VideoFields,
  SiteConfigurationFields,
  AboutSectionFields
} from './contentful';

// Type aliases for cleaner code
export type EventEntry = Entry<EventFields, 'WITHOUT_UNRESOLVABLE_LINKS', string>;
export type TeamMemberEntry = Entry<TeamMemberFields, 'WITHOUT_UNRESOLVABLE_LINKS', string>;
export type VideoEntry = Entry<VideoFields, 'WITHOUT_UNRESOLVABLE_LINKS', string>;
export type SiteConfigurationEntry = Entry<SiteConfigurationFields, 'WITHOUT_UNRESOLVABLE_LINKS', string>;
export type AboutSectionEntry = Entry<AboutSectionFields, 'WITHOUT_UNRESOLVABLE_LINKS', string>;

// ============================================
// EVENTS API
// ============================================

/**
 * Fetches all events from Contentful
 * @param term - Optional filter by academic term (e.g., "2024-2025")
 * @returns Array of events
 */
export async function fetchEvents(term?: string): Promise<EventEntry[]> {
  try {
    const queryOptions: any = {
      content_type: 'event',
      order: ['-fields.date'], // Sort by date, newest first
    };

    // If a term is provided, filter by that term
    if (term) {
      queryOptions['fields.term'] = term;
    }

    const response = await contentfulClient.getEntries<EventFields>({
      ...queryOptions,
    });
    
    return response.items as EventEntry[];
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

/**
 * Fetches a single event by its slug
 * @param slug - The event slug (URL-friendly identifier)
 * @returns Single event or null if not found
 */
export async function fetchEventBySlug(slug: string): Promise<EventEntry | null> {
  try {
    const response = await contentfulClient.getEntries<EventFields>({
      content_type: 'event',
      'fields.slug': slug,
      limit: 1,
    });

    if (response.items.length > 0) {
      return response.items[0] as EventEntry;
    }
    
    return null;
  } catch (error) {
    console.error(`Error fetching event with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Fetches all unique terms (academic years) from events
 * Useful for populating term filter dropdowns
 * @returns Array of unique term strings
 */
export async function fetchEventTerms(): Promise<string[]> {
  try {
    const response = await contentfulClient.getEntries<EventFields>({
      content_type: 'event',
      select: ['fields.term'], // Only fetch the term field to save bandwidth
    });

    // Extract unique terms from the response
    const terms = new Set<string>();
    response.items.forEach(item => {
      if (typeof item.fields.term === 'string') {
        terms.add(item.fields.term);
      }
    });

    // Convert Set to Array and sort in descending order (newest first)
    return Array.from(terms).sort((a, b) => b.localeCompare(a));
  } catch (error) {
    console.error('Error fetching event terms:', error);
    return [];
  }
}

// ============================================
// TEAM MEMBERS API
// ============================================

/**
 * Fetches all team members from Contentful
 * @param variant - Optional filter by team variant/color (green, blue, red, yellow)
 * @returns Array of team members
 */
export async function fetchTeamMembers(variant?: string): Promise<TeamMemberEntry[]> {
  try {
    const queryOptions: any = {
      content_type: 'teamMember',
      order: ['fields.name'], // Sort alphabetically by first name
    };

    // If a variant is provided, filter by that variant
    if (variant) {
      queryOptions['fields.variant'] = variant;
    }

    const response = await contentfulClient.getEntries<TeamMemberFields>({
      ...queryOptions,
    });
    
    return response.items as TeamMemberEntry[];
  } catch (error) {
    console.error('Error fetching team members:', error);
    return [];
  }
}

/**
 * Fetches team members grouped by their variant
 * This is useful for displaying teams in separate sections
 * @returns Object with variants as keys and arrays of team members as values
 */
export async function fetchTeamMembersByVariant(): Promise<Record<string, TeamMemberEntry[]>> {
  try {
    const response = await contentfulClient.getEntries<TeamMemberFields>({
      content_type: 'teamMember',
      order: ['fields.name'],
    });

    // Group team members by their variant
    const grouped: Record<string, TeamMemberEntry[]> = {
      yellow: [],
      green: [],
      red: [],
      blue: [],
    };

    response.items.forEach(member => {
      const variant = typeof member.fields.variant === 'string' ? member.fields.variant : undefined;
      if (variant && grouped[variant]) {
        grouped[variant].push(member as TeamMemberEntry);
      }
    });

    return grouped;
  } catch (error) {
    console.error('Error fetching team members by variant:', error);
    return { yellow: [], green: [], red: [], blue: [] };
  }
}

// ============================================
// VIDEOS API
// ============================================

/**
 * Fetches all videos from Contentful
 * @returns Array of videos
 */
export async function fetchVideos(): Promise<VideoEntry[]> {
  try {
    const response = await contentfulClient.getEntries<VideoFields>({
      content_type: 'video',
      order: ['-sys.createdAt'], // Sort by creation date, newest first
    });
    
    return response.items as VideoEntry[];
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
}

// ============================================
// SITE CONFIGURATION API
// ============================================

/**
 * Fetches the site configuration (social links, campus name, etc.)
 * There should only be ONE site configuration entry
 * @returns Site configuration object or null
 */
export async function fetchSiteConfiguration(): Promise<SiteConfigurationEntry | null> {
  try {
    const response = await contentfulClient.getEntries<SiteConfigurationFields>({
      content_type: 'siteConfiguration',
      limit: 1,
    });

    if (response.items.length > 0) {
      return response.items[0] as SiteConfigurationEntry;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching site configuration:', error);
    return null;
  }
}

// ============================================
// ABOUT SECTIONS API
// ============================================

/**
 * Fetches all about sections, sorted by order
 * @returns Array of about sections
 */
export async function fetchAboutSections(): Promise<AboutSectionEntry[]> {
  try {
    const response = await contentfulClient.getEntries<AboutSectionFields>({
      content_type: 'aboutSection',
      order: ['fields.order'], // Sort by the order field
    });
    
    return response.items as AboutSectionEntry[];
  } catch (error) {
    console.error('Error fetching about sections:', error);
    return [];
  }
}