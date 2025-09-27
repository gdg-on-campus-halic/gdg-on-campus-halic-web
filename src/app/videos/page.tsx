// src/app/videos/page.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowLeft, FaYoutube } from "react-icons/fa";
import VideoGrid from "@/components/video-grid";
import { videos } from "@/data/video";
import SparklingBackground from "@/components/sparkling-background";

export default function VideosPage() {
  // Animation variants for smooth entrance
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Consistent sparkling background */}
      <SparklingBackground />
      
      <div className="relative z-10">
        {/* Header with navigation */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="bg-white shadow-md sticky top-0 z-20"
        >
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link
                  href="/"
                  className="flex items-center space-x-2 text-orange-500 hover:text-orange-600 transition-colors duration-300"
                >
                  <FaArrowLeft size={20} />
                  <span className="font-medium">Back to Home</span>
                </Link>
                <div className="h-6 w-px bg-gray-300" />
                <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  Video Gallery
                </h1>
              </div>
              
              {/* YouTube channel link */}
              <a
                href="https://www.youtube.com/@GDGonCampusHalic"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
              >
                <FaYoutube size={20} />
                <span className="hidden sm:inline">Subscribe</span>
              </a>
            </div>
          </div>
        </motion.header>

        {/* Main content */}
        <motion.main
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="container mx-auto px-4 py-12"
        >
          {/* Hero section */}
          <motion.div 
            variants={fadeIn}
            className="text-center mb-12 max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Learn from Our <span className="text-orange-500">Video Content</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Watch recordings of our workshops, tech talks, and tutorials. 
              Stay updated with the latest in technology and development practices.
            </p>
          </motion.div>

          {/* Video grid */}
          <motion.div 
            variants={fadeIn}
            className="mb-12"
          >
            <VideoGrid videos={videos} />
          </motion.div>

          {/* YouTube channel promotion */}
          <motion.div 
            variants={fadeIn}
            className="text-center py-12 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl"
          >
            <div className="flex justify-center mb-4">
              <FaYoutube size={48} className="text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Subscribe to Our YouTube Channel
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Don't miss out on our latest workshops, tutorials, and tech talks. 
              Subscribe to get notified when we upload new content!
            </p>
            <a
              href="https://www.youtube.com/@GDGonCampusHalic"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Subscribe Now
            </a>
          </motion.div>
        </motion.main>
      </div>
    </div>
  );
}