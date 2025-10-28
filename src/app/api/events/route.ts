// src/app/api/events/route.ts
// Secure server-side route for fetching events from Contentful
// Now includes rate limiting and input validation for better security

import { NextResponse } from 'next/server';
import { createClient } from 'contentful';
import { rateLimit, getClientIdentifier } from '@/lib/rate-limit';
import { validateTerm } from '@/lib/validation';

// Create Contentful client with server-side environment variables
// These credentials are NEVER exposed to the browser
const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

// Create rate limiter: 100 requests per 15 minutes per IP
// This prevents API abuse while allowing legitimate usage
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100,
});

export async function GET(request: Request) {
  // Step 1: Apply rate limiting
  const identifier = getClientIdentifier(request);
  const rateLimitResponse = limiter(identifier);
  
  if (rateLimitResponse) {
    return rateLimitResponse; // Rate limit exceeded, return 429
  }

  try {
    // Step 2: Get and validate query parameters
    const { searchParams } = new URL(request.url);
    const termParam = searchParams.get('term');
    
    // Validate the term parameter if provided
    const term = validateTerm(termParam);
    if (term instanceof NextResponse) {
      return term; // Return validation error response
    }

    // Step 3: Build query options for Contentful
    const queryOptions: any = {
      content_type: 'event',
      order: ['-fields.date'], // Most recent events first
    };

    // Add term filter if provided
    if (term) {
      queryOptions['fields.term'] = term;
    }

    // Step 4: Fetch events from Contentful
    const response = await contentfulClient.getEntries(queryOptions);

    // Step 5: Return successful response
    return NextResponse.json({
      success: true,
      data: response.items,
    });
  } catch (error) {
    // Log error for debugging (in production, send to error tracking service)
    console.error('Error fetching events:', error);
    
    // Return generic error to avoid exposing internal details
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch events. Please try again later.' 
      },
      { status: 500 }
    );
  }
}