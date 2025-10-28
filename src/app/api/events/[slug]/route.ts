// src/app/api/events/[slug]/route.ts
// Fetches a single event by its slug with security measures
// Includes rate limiting and input validation

import { NextResponse } from 'next/server';
import { createClient } from 'contentful';
import { rateLimit, getClientIdentifier } from '@/lib/rate-limit';
import { validateSlug } from '@/lib/validation';

// Create Contentful client with server-side credentials
const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

// Rate limiter: 100 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  maxRequests: 100,
});

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  // Step 1: Apply rate limiting
  const identifier = getClientIdentifier(request);
  const rateLimitResponse = limiter(identifier);
  
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  try {
    // Step 2: Get and validate the slug parameter
    const { slug } = params;
    
    // Validate slug format
    const validatedSlug = validateSlug(slug);
    if (validatedSlug instanceof NextResponse) {
      return validatedSlug; // Return validation error
    }

    // Step 3: Query Contentful for the specific event
    const response = await contentfulClient.getEntries({
      content_type: 'event',
      'fields.slug': validatedSlug,
      limit: 1, // We only need one result
    });

    // Step 4: Check if event was found
    if (response.items.length === 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Event with slug "${validatedSlug}" not found` 
        },
        { status: 404 }
      );
    }

    // Step 5: Return the event data
    return NextResponse.json({
      success: true,
      data: response.items[0],
    });
  } catch (error) {
    console.error(`Error fetching event with slug ${params.slug}:`, error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch event. Please try again later.' 
      },
      { status: 500 }
    );
  }
}