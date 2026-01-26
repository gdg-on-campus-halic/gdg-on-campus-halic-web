// src/app/videos/page.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowLeft, FaYoutube } from "react-icons/fa";
import VideoGrid from "@/components/video-grid";
import SparklingBackground from "@/components/sparkling-background";
import { useEffect, useState } from "react";
import { Video } from "@/lib/types";
import { getVideos } from "@/lib/contentful-data";

export default function VideosPage() {
  // State to hold videos fetched from Contentful
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch videos when component mounts
  useEffect(() => {
    async function loadVideos() {
      try {
        setLoading(true);
        const fetchedVideos = await getVideos();
        setVideos(fetchedVideos);
        setError(null);
      } catch (err) {
        console.error('Error loading videos:', err);
        setError('Failed to load videos. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    loadVideos();
  }, []);

  // Animation variants with faster transitions
  const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Consistent sparkling background */}
      <SparklingBackground />
      
      <div className="relative z-10">
        {/* Navigation bar */}
        <div className="container mx-auto px-4 pt-4">
          {/* Desktop Navigation */}
          <div className="hidden md:flex justify-center items-center mb-6">
            <div className="flex gap-2 p-2">
              <Link
                href="/"
                className="group relative px-4 py-3 bg-white text-gray-900 font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm overflow-hidden border border-gray-100 flex items-center justify-center"
              >
                <span className="relative z-10 flex items-center">
                  <FaArrowLeft size={14} />
                </span>
                <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />
              </Link>

              <Link
                href="/events"
                className="group relative px-6 py-3 bg-white text-gray-900 font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm overflow-hidden border border-gray-100"
              >
                <span className="relative z-10">Events</span>
                <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />
              </Link>

              <Link
                href="/team"
                className="group relative px-6 py-3 bg-white text-gray-900 font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm overflow-hidden border border-gray-100"
              >
                <span className="relative z-10">Team</span>
                <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />
              </Link>

              <Link
                href="/about"
                className="group relative px-6 py-3 bg-white text-gray-900 font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm overflow-hidden border border-gray-100"
              >
                <span className="relative z-10">About</span>
                <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />
              </Link>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex justify-center items-center mb-6">
            <div className="overflow-x-auto max-w-full">
              <div className="flex gap-2 px-2">
                <Link
                  href="/"
                  className="group relative px-5 py-3 bg-white text-gray-900 font-semibold rounded-lg shadow-md text-xs overflow-hidden border border-gray-100 whitespace-nowrap flex items-center justify-center"
                >
                  <span className="relative z-10 flex items-center">
                    <FaArrowLeft size={12} />
                  </span>
                </Link>

                <Link
                  href="/events"
                  className="group relative px-5 py-3 bg-white text-gray-900 font-semibold rounded-lg shadow-md text-xs overflow-hidden border border-gray-100 whitespace-nowrap"
                >
                  <span className="relative z-10">Events</span>
                </Link>

                <Link
                  href="/team"
                  className="group relative px-5 py-3 bg-white text-gray-900 font-semibold rounded-lg shadow-md text-xs overflow-hidden border border-gray-100 whitespace-nowrap"
                >
                  <span className="relative z-10">Team</span>
                </Link>

                <Link
                  href="/about"
                  className="group relative px-5 py-3 bg-white text-gray-900 font-semibold rounded-lg shadow-md text-xs overflow-hidden border border-gray-100 whitespace-nowrap"
                >
                  <span className="relative z-10">About</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <motion.main
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="container mx-auto px-4 py-8"
        >
          {/* Hero section */}
          <motion.div 
            variants={fadeIn}
            className="text-center mb-12 max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Learn from Our{" "}
              <span className="text-4xl font-bold">
                <span className="text-[#4285F4]">V</span>
                <span className="text-[#EA4335]">i</span>
                <span className="text-[#FBBC04]">d</span>
                <span className="text-[#4285F4]">e</span>
                <span className="text-[#34A853]">o</span>
                <span className="text-[#EA4335]">s</span>
              </span>
            </h2>
            <p className="text-gray-600 text-lg">
              Watch recordings of our workshops, tech talks, and tutorials. 
              Stay updated with the latest in technology and development practices.
            </p>
          </motion.div>

          {/* Loading state */}
          {loading && (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading videos from Contentful...</p>
            </div>
          )}

          {/* Error state */}
          {error && !loading && (
            <div className="text-center py-16">
              <div className="text-red-600 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-800 font-semibold mb-2">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {/* Video grid */}
          {!loading && !error && (
            <>
              <motion.div 
                variants={fadeIn}
                className="mb-12"
              >
                <VideoGrid videos={videos} />
              </motion.div>

              {/* YouTube channel promotion - Updated with red color */}
              <motion.div 
                variants={fadeIn}
                className="text-center py-12 backdrop-blur-xl bg-white/90 shadow-[0_8px_32px_rgba(0,0,0,0.12)] rounded-2xl border border-white/20"
              >
                <div className="flex justify-center mb-4">
                  <FaYoutube size={48} className="text-[#EA4335]" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Subscribe to Our YouTube Channel
                </h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Don&apos;t miss out on our latest workshops, tutorials, and tech talks. 
                  Subscribe to get notified when we upload new content!
                </p>
                <a
                  href="https://www.youtube.com/@GDGonCampusHalic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3 bg-[#EA4335] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 hover:bg-[#D93025]"
                >
                  Subscribe Now
                </a>
              </motion.div>
            </>
          )}
        </motion.main>
      </div>
    </div>
  );
}