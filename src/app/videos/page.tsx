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
        {/* Header with navigation - Enhanced glass-morphism design */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="backdrop-blur-xl bg-white/90 shadow-[0_8px_32px_rgba(0,0,0,0.12)] sticky top-0 z-20 border-b border-white/20"
        >
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <Link
                  href="/"
                  className="group flex items-center space-x-3 px-4 py-2 bg-white/60 backdrop-blur-sm text-black hover:text-white hover:bg-gradient-to-r hover:from-gray-800 hover:to-black transition-all duration-500 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 border border-gray-200/50"
                >
                  <FaArrowLeft size={18} className="transition-transform duration-300 group-hover:-translate-x-1" />
                  <span className="font-semibold">Back to Home</span>
                </Link>
                <div className="h-8 w-px bg-gradient-to-b from-gray-300 to-gray-400 opacity-60" />
                <motion.h1 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-4xl font-bold bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text text-transparent drop-shadow-sm"
                >
                  Video Gallery
                </motion.h1>
              </div>
              
              {/* Enhanced YouTube channel link - Hidden on mobile */}
              <motion.a
                href="https://www.youtube.com/@GDGonCampusHalic"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="hidden sm:flex group relative items-center justify-center space-x-3 px-6 py-3 bg-red-600 text-white hover:bg-red-700 transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 border border-red-500/50 min-w-[140px]"
              >
                <FaYoutube size={20} className="transition-colors duration-300" />
                <span className="font-semibold">Subscribe</span>
              </motion.a>
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
              Learn from Our{" "}
              <span className="text-4xl font-bold">
                <span className="text-[#4285F4]">V</span>
                <span className="text-[#EA4335]">i</span>
                <span className="text-[#FBBC05]">d</span>
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
            className="text-center py-12 backdrop-blur-xl bg-white/90 shadow-[0_8px_32px_rgba(0,0,0,0.12)] rounded-2xl border border-white/20"
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
              className="group relative px-8 py-3 bg-white text-gray-900 font-semibold rounded-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.5),_0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.7),_0_15px_40px_rgba(0,0,0,0.3)] hover:scale-105 hover:-translate-y-1 transition-all duration-300 border border-white overflow-hidden inline-block"
            >
              <span className="relative z-10">Subscribe Now</span>
              <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />
            </a>
          </motion.div>
        </motion.main>
      </div>
    </div>
  );
}