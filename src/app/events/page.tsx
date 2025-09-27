// src/app/events/page.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import EventSection from "@/components/events-section";
import { events } from "@/data/events";
import SparklingBackground from "@/components/sparkling-background";

export default function EventsPage() {
  // Animation variants
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
      {/* Sparkling background for consistency */}
      <SparklingBackground />
      
      {/* Main content */}
      <div className="relative z-10">
        {/* Header with back navigation */}
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
                  Our Events
                </h1>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Page content */}
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
              Discover Our <span className="text-orange-500">Community Events</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Join us for workshops, hackathons, tech talks, and networking sessions. 
              Learn from industry experts, collaborate with peers, and build amazing projects together.
            </p>
          </motion.div>

          {/* Events grid section */}
          <motion.div variants={fadeIn}>
            <EventSection events={events} />
          </motion.div>

          {/* Call to action */}
          <motion.div 
            variants={fadeIn}
            className="text-center mt-16 py-12 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-2xl"
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
              className="inline-block px-8 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Contact Us
            </a>
          </motion.div>
        </motion.main>
      </div>
    </div>
  );
}