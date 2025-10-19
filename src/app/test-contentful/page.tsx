// Create a test file: src/app/test-contentful/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { getEvents } from '@/lib/contentful-data';

export default function TestContentful() {
  const [status, setStatus] = useState('Testing...');

  useEffect(() => {
    async function test() {
      try {
        const events = await getEvents();
        setStatus(`✅ Success! Found ${events.length} events`);
        console.log('Events:', events);
      } catch (error) {
        setStatus(`❌ Error: ${error}`);
        console.error(error);
      }
    }
    test();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Contentful Connection Test</h1>
      <p>{status}</p>
    </div>
  );
}