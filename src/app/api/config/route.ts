// src/app/api/config/route.ts
// Secure server-side route for site configuration from Contentful
// Includes rate limiting and caching considerations

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
    // Step 2: Fetch site configuration from Contentful
    // There should only be ONE configuration entry
    const response = await contentfulClient.getEntries({
      content_type: 'siteConfiguration',
      limit: 1,
    });

    // Step 3: Check if configuration exists
    if (response.items.length === 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Site configuration not found in Contentful' 
        },
        { status: 404 }
      );
    }

    // Step 4: Return configuration data
    return NextResponse.json({
      success: true,
      data: response.items[0],
    });
  } catch (error) {
    console.error('Error fetching site configuration:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch site configuration. Please try again later.' 
      },
      { status: 500 }
    );
  }
}