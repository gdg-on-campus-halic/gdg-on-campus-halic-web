// src/lib/rate-limit.ts
// Simple rate limiting using in-memory store
// Protects API routes from abuse and excessive Contentful API calls
// For production with multiple servers, consider using Redis

import { NextResponse } from 'next/server';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

// In-memory store for tracking requests
// This resets when the server restarts, which is acceptable for basic protection
const store: RateLimitStore = {};

export interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
}

// Default configuration: 100 requests per 15 minutes
// This prevents abuse while allowing legitimate usage
const defaultConfig: RateLimitConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100,
};

/**
 * Creates a rate limiter with the specified configuration
 * Usage: const limiter = rateLimit({ windowMs: 60000, maxRequests: 10 });
 */
export function rateLimit(config: RateLimitConfig = defaultConfig) {
  return function checkRateLimit(identifier: string): NextResponse | null {
    const now = Date.now();
    const key = identifier;

    // Clean up expired entries to prevent memory leaks
    if (store[key] && store[key].resetTime < now) {
      delete store[key];
    }

    // Initialize tracking for new identifier
    if (!store[key]) {
      store[key] = {
        count: 1,
        resetTime: now + config.windowMs,
      };
      return null; // Allow request
    }

    // Check if rate limit has been exceeded
    if (store[key].count >= config.maxRequests) {
      const retryAfterSeconds = Math.ceil((store[key].resetTime - now) / 1000);
      
      return NextResponse.json(
        {
          success: false,
          error: 'Rate limit exceeded. Please try again later.',
          retryAfter: retryAfterSeconds,
        },
        {
          status: 429, // Too Many Requests
          headers: {
            'Retry-After': String(retryAfterSeconds),
            'X-RateLimit-Limit': String(config.maxRequests),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(store[key].resetTime).toISOString(),
          },
        }
      );
    }

    // Increment request counter
    store[key].count++;
    
    // Allow request
    return null;
  };
}

/**
 * Extracts a client identifier from the request
 * Tries to get the real IP address from various headers
 * Falls back to 'anonymous' if no IP can be determined
 */
export function getClientIdentifier(request: Request): string {
  // Try to get real IP from common proxy headers
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cfConnectingIp = request.headers.get('cf-connecting-ip'); // Cloudflare
  
  // x-forwarded-for can contain multiple IPs, take the first one
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIp) {
    return realIp;
  }
  
  if (cfConnectingIp) {
    return cfConnectingIp;
  }
  
  // Fallback if no IP can be determined
  return 'anonymous';
}

/**
 * Clears all rate limit data from the store
 * Useful for testing or manual reset
 */
export function clearRateLimitStore(): void {
  Object.keys(store).forEach(key => delete store[key]);
}

/**
 * Gets current rate limit stats for an identifier
 * Useful for debugging or monitoring
 */
export function getRateLimitStats(identifier: string): {
  count: number;
  remaining: number;
  resetTime: Date | null;
} | null {
  const entry = store[identifier];
  
  if (!entry) {
    return null;
  }
  
  // Check if expired
  if (Date.now() > entry.resetTime) {
    delete store[identifier];
    return null;
  }
  
  return {
    count: entry.count,
    remaining: Math.max(0, defaultConfig.maxRequests - entry.count),
    resetTime: new Date(entry.resetTime),
  };
}