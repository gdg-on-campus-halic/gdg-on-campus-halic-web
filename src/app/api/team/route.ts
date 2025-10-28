// src/app/api/team/route.ts
// Secure server-side route for fetching team members from Contentful
// Includes rate limiting and input validation

import { NextResponse } from 'next/server';
import { createClient } from 'contentful';
import { rateLimit, getClientIdentifier } from '@/lib/rate-limit';
import { validateVariant } from '@/lib/validation';

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

export async function GET(request: Request) {
  // Step 1: Apply rate limiting
  const identifier = getClientIdentifier(request);
  const rateLimitResponse = limiter(identifier);
  
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  try {
    // Step 2: Get and validate query parameters
    const { searchParams } = new URL(request.url);
    const variantParam = searchParams.get('variant');
    
    // Validate the variant parameter if provided
    const variant = validateVariant(variantParam);
    if (variant instanceof NextResponse) {
      return variant; // Return validation error
    }

    // Step 3: Build query options
    const queryOptions: any = {
      content_type: 'teamMember',
      order: ['fields.name'], // Sort alphabetically by name
    };

    // Filter by variant if provided
    if (variant) {
      queryOptions['fields.variant'] = variant;
    }

    // Step 4: Fetch team members from Contentful
    const response = await contentfulClient.getEntries(queryOptions);

    // Step 5: Return successful response
    return NextResponse.json({
      success: true,
      data: response.items,
    });
  } catch (error) {
    console.error('Error fetching team members:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch team members. Please try again later.' 
      },
      { status: 500 }
    );
  }
}