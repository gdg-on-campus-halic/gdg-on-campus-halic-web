// src/app/api/about/route.ts
// Secure server-side route for about sections from Contentful
// Includes rate limiting for API protection

import { NextResponse } from 'next/server';
import { createClient } from 'contentful';
import { rateLimit, getClientIdentifier } from '@/lib/rate-limit';

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
    // Step 2: Fetch about sections from Contentful
    // Sections are ordered by their 'order' field
    const response = await contentfulClient.getEntries({
      content_type: 'aboutSection',
      order: ['fields.order'], // Sort by the order field
    });

    // Step 3: Return successful response
    return NextResponse.json({
      success: true,
      data: response.items,
    });
  } catch (error) {
    console.error('Error fetching about sections:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch about sections. Please try again later.' 
      },
      { status: 500 }
    );
  }
}