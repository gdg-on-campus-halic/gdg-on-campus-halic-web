// src/app/api/videos/route.ts
// Secure server-side route for fetching videos from Contentful
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
    // Step 2: Fetch videos from Contentful
    const response = await contentfulClient.getEntries({
      content_type: 'video',
      order: ['-sys.createdAt'], // Most recent videos first
    });

    // Step 3: Return successful response
    return NextResponse.json({
      success: true,
      data: response.items,
    });
  } catch (error) {
    console.error('Error fetching videos:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch videos. Please try again later.' 
      },
      { status: 500 }
    );
  }
}