// src/lib/validation.ts
// Input validation helpers for API routes
// Protects against malicious input and ensures data integrity

import { NextResponse } from 'next/server';

/**
 * Validates academic term format (YYYY-YYYY)
 * Example valid term: "2024-2025"
 * Returns the validated term string or a NextResponse with error
 */
export function validateTerm(term: string | null): string | NextResponse {
  // If term is not provided, return empty string (it's optional)
  if (!term) return '';
  
  // Check format: four digits, hyphen, four digits
  const termPattern = /^\d{4}-\d{4}$/;
  if (!termPattern.test(term)) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Invalid term format. Expected format: YYYY-YYYY (e.g., 2024-2025)' 
      },
      { status: 400 }
    );
  }
  
  // Additional validation: check that years make sense
  const [startYear, endYear] = term.split('-').map(Number);
  if (endYear !== startYear + 1) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Invalid term. End year must be start year + 1 (e.g., 2024-2025)' 
      },
      { status: 400 }
    );
  }
  
  // Check that years are reasonable (not too far in past or future)
  const currentYear = new Date().getFullYear();
  if (startYear < 2020 || startYear > currentYear + 5) {
    return NextResponse.json(
      { 
        success: false, 
        error: `Invalid term year. Must be between 2020 and ${currentYear + 5}` 
      },
      { status: 400 }
    );
  }
  
  return term;
}

/**
 * Validates team variant (color)
 * Valid values: yellow, green, red, blue
 * Returns the validated variant string or a NextResponse with error
 */
export function validateVariant(variant: string | null): string | NextResponse {
  // If variant is not provided, return empty string (it's optional)
  if (!variant) return '';
  
  const validVariants = ['yellow', 'green', 'red', 'blue'];
  const normalizedVariant = variant.toLowerCase().trim();
  
  if (!validVariants.includes(normalizedVariant)) {
    return NextResponse.json(
      { 
        success: false, 
        error: `Invalid variant. Must be one of: ${validVariants.join(', ')}` 
      },
      { status: 400 }
    );
  }
  
  return normalizedVariant;
}

/**
 * Validates slug format (URL-safe string)
 * Slugs should be lowercase, alphanumeric with hyphens only
 * Example valid slug: "intro-to-react-workshop"
 * Returns the validated slug string or a NextResponse with error
 */
export function validateSlug(slug: string): string | NextResponse {
  if (!slug || typeof slug !== 'string') {
    return NextResponse.json(
      { success: false, error: 'Slug is required' },
      { status: 400 }
    );
  }
  
  const trimmedSlug = slug.trim();
  
  // Check if empty after trimming
  if (!trimmedSlug) {
    return NextResponse.json(
      { success: false, error: 'Slug cannot be empty' },
      { status: 400 }
    );
  }
  
  // Slug should be lowercase, alphanumeric with hyphens only
  const slugPattern = /^[a-z0-9-]+$/;
  if (!slugPattern.test(trimmedSlug)) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Invalid slug format. Must be lowercase letters, numbers, and hyphens only' 
      },
      { status: 400 }
    );
  }
  
  // Check length constraints
  if (trimmedSlug.length > 100) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Slug too long. Maximum length is 100 characters' 
      },
      { status: 400 }
    );
  }
  
  // Check for consecutive hyphens or leading/trailing hyphens
  if (trimmedSlug.startsWith('-') || trimmedSlug.endsWith('-') || trimmedSlug.includes('--')) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Invalid slug format. No leading/trailing hyphens or consecutive hyphens allowed' 
      },
      { status: 400 }
    );
  }
  
  return trimmedSlug;
}

/**
 * General sanitization for text fields
 * Removes potentially dangerous characters while preserving normal text
 * Use this for any user-provided text that will be logged or displayed
 */
export function sanitizeString(input: string, maxLength: number = 200): string {
  if (!input || typeof input !== 'string') {
    return '';
  }
  
  return input
    .trim() // Remove leading/trailing whitespace
    .slice(0, maxLength) // Enforce max length
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/[^\x20-\x7E\u00A0-\uFFFF]/g, ''); // Remove non-printable characters but keep unicode
}

/**
 * Validates pagination parameters (limit, offset)
 * Ensures they are positive integers within reasonable bounds
 */
export function validatePagination(
  limit: string | null, 
  offset: string | null
): { limit: number; offset: number } | NextResponse {
  // Default values
  let parsedLimit = 20;
  let parsedOffset = 0;
  
  // Validate limit
  if (limit !== null) {
    const limitNum = parseInt(limit, 10);
    if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid limit. Must be between 1 and 100' 
        },
        { status: 400 }
      );
    }
    parsedLimit = limitNum;
  }
  
  // Validate offset
  if (offset !== null) {
    const offsetNum = parseInt(offset, 10);
    if (isNaN(offsetNum) || offsetNum < 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid offset. Must be a non-negative integer' 
        },
        { status: 400 }
      );
    }
    parsedOffset = offsetNum;
  }
  
  return { limit: parsedLimit, offset: parsedOffset };
}

/**
 * Validates email format
 * Uses a simple but effective regex pattern
 */
export function validateEmail(email: string | null): string | NextResponse {
  if (!email) {
    return NextResponse.json(
      { success: false, error: 'Email is required' },
      { status: 400 }
    );
  }
  
  const trimmedEmail = email.trim().toLowerCase();
  
  // Simple email validation regex
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(trimmedEmail)) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Invalid email format' 
      },
      { status: 400 }
    );
  }
  
  if (trimmedEmail.length > 254) { // RFC 5321
    return NextResponse.json(
      { 
        success: false, 
        error: 'Email too long' 
      },
      { status: 400 }
    );
  }
  
  return trimmedEmail;
}

/**
 * Type guard to check if a value is a NextResponse (error response)
 * Useful for checking validation results
 */
export function isErrorResponse(value: any): value is NextResponse {
  return value instanceof NextResponse;
}