// src/app/events/page.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import EventSection from "@/components/events-section";
import SparklingBackground from "@/components/sparkling-background";
import { useEffect, useState } from "react";
import { Event } from "@/lib/types";
import { getEvents } from "@/lib/contentful-data";

export default function EventsPage() {
  // State to hold events fetched from Contentful
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch events when component mounts
  useEffect(() => {
    async function loadEvents() {
      try {
        setLoading(true);
        const fetchedEvents = await getEvents();
        setEvents(fetchedEvents);
        setError(null);
      } catch (err) {
        console.error('Error loading events:', err);
        setError('Failed to load events. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
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
      <SparklingBackground />
      
      <div className="relative z-10">
        {/* Navigation bar */}
        <div className="container mx-auto px-4 pt-4">
          {/* Desktop Navigation */}
          <div className="hidden md:flex justify-center items-center mb-6">
            <div className="flex gap-2 p-2">
              <Link
                href="/"
                className="group relative px-6 py-3 bg-white text-gray-900 font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm overflow-hidden border border-gray-100"
              >
                <span className="relative z-10 flex items-center">
                  <FaArrowLeft className="mr-2" size={14} />
                  Home
                </span>
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
                href="/videos"
                className="group relative px-6 py-3 bg-white text-gray-900 font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm overflow-hidden border border-gray-100"
              >
                <span className="relative z-10">Videos</span>
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
                  className="group relative px-4 py-2 bg-white text-gray-900 font-semibold rounded-lg shadow-md text-xs overflow-hidden border border-gray-100 whitespace-nowrap"
                >
                  <span className="relative z-10 flex items-center">
                    <FaArrowLeft className="mr-1.5" size={12} />
                    Home
                  </span>
                </Link>

                <Link
                  href="/team"
                  className="group relative px-4 py-2 bg-white text-gray-900 font-semibold rounded-lg shadow-md text-xs overflow-hidden border border-gray-100 whitespace-nowrap"
                >
                  <span className="relative z-10">Team</span>
                </Link>

                <Link
                  href="/videos"
                  className="group relative px-4 py-2 bg-white text-gray-900 font-semibold rounded-lg shadow-md text-xs overflow-hidden border border-gray-100 whitespace-nowrap"
                >
                  <span className="relative z-10">Videos</span>
                </Link>

                <Link
                  href="/about"
                  className="group relative px-4 py-2 bg-white text-gray-900 font-semibold rounded-lg shadow-md text-xs overflow-hidden border border-gray-100 whitespace-nowrap"
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
              Discover Our{" "}
              <span className="text-4xl font-bold">
                <span className="text-[#4285F4]">E</span>
                <span className="text-[#EA4335]">v</span>
                <span className="text-[#FBBC04]">e</span>
                <span className="text-[#4285F4]">n</span>
                <span className="text-[#34A853]">t</span>
                <span className="text-[#EA4335]">s</span>
              </span>
            </h2>
            <p className="text-gray-600 text-lg">
              Join us for workshops, hackathons, tech talks, and networking sessions. 
              Learn from industry experts, collaborate with peers, and build amazing projects together.
            </p>
          </motion.div>

          {/* Loading state */}
          {loading && (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading events from Contentful...</p>
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

          {/* Events grid section */}
          {!loading && !error && (
            <motion.div variants={fadeIn}>
              <EventSection events={events} />
            </motion.div>
          )}

          {/* Call to action */}
          <motion.div 
            variants={fadeIn}
            className="text-center mt-16 py-12 backdrop-blur-xl bg-white/90 shadow-[0_8px_32px_rgba(0,0,0,0.12)] rounded-2xl border border-white/20"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Want to organize an event with us?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We're always looking for passionate individuals to help organize and host events. 
              Get in touch with our team to learn more!
            </p>
            <a
              href="mailto:gdg@halic.edu.tr"
              className="group relative px-8 py-3 bg-white text-gray-900 font-semibold rounded-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.5),_0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.7),_0_15px_40px_rgba(0,0,0,0.3)] hover:scale-105 hover:-translate-y-1 transition-all duration-300 border border-white overflow-hidden inline-block"
            >
              <span className="relative z-10">Contact Us</span>
              <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />
            </a>
          </motion.div>
        </motion.main>
      </div>
    </div>
  );
}