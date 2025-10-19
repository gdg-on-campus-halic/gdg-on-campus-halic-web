// src/components/join-our-club.tsx
"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getSiteConfiguration } from '@/lib/contentful-data';

const JoinOurClub: React.FC = () => {
  // State to hold the join link from Contentful
  const [joinLink, setJoinLink] = useState<string>('https://linktr.ee/GDGonCampusHalic');

  // Fetch join link from Contentful when component mounts
  useEffect(() => {
    async function loadJoinLink() {
      try {
        const config = await getSiteConfiguration();
        if (config && config.joinLink) {
          setJoinLink(config.joinLink);
        }
      } catch (error) {
        console.error('Error loading join link:', error);
        // Keep default value if fetch fails
      }
    }

    loadJoinLink();
  }, []);

  return (
    <Link 
      href={joinLink} 
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 px-6 py-4 bg-[#4285F4] text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:bg-[#357AE8] hover:scale-105 transition-all duration-300 z-50"
    >
      Join Our Club!
    </Link>
  );
};

export default JoinOurClub;