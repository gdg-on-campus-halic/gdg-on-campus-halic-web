// src/app/about/page.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft, FaRocket, FaUsers, FaLightbulb, FaHeart } from "react-icons/fa";
import SparklingBackground from "@/components/sparkling-background";
import GoogleText from "@/components/google-text";
import gdgLogo from "@/images/gdglogo.png";
import { useEffect, useState } from "react";
import { SiteConfiguration, AboutSection } from "@/lib/types";
import { getSiteConfiguration, getAboutSections } from "@/lib/contentful-data";

export default function AboutPage() {
  // State to hold site configuration and about sections from Contentful
  const [config, setConfig] = useState<SiteConfiguration | null>(null);
  const [aboutSections, setAboutSections] = useState<AboutSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data when component mounts
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [fetchedConfig, fetchedSections] = await Promise.all([
          getSiteConfiguration(),
          getAboutSections()
        ]);
        setConfig(fetchedConfig);
        setAboutSections(fetchedSections);
        setError(null);
      } catch (err) {
        console.error('Error loading about page data:', err);
        setError('Failed to load content. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    loadData();
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
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  // Map icon names to actual icon components
  const iconMap: Record<string, any> = {
    FaRocket,
    FaUsers,
    FaLightbulb,
    FaHeart,
  };

  // Color variants for info cards
  const colorVariants = [
    "from-blue-500 to-blue-600",
    "from-green-500 to-green-600",
    "from-yellow-500 to-orange-500",
    "from-red-500 to-pink-500",
  ];

  // Info card component for clean, modular design
  const InfoCard = ({ icon: Icon, title, content, color }: any) => (
    <motion.div 
      variants={fadeIn}
      className={`p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br ${color}`}
    >
      <div className="flex items-center mb-4">
        <Icon className="text-3xl mr-3 text-white" />
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      <p className="text-white/90 leading-relaxed">{content}</p>
    </motion.div>
  );

  // Default campus name in case config is not loaded
  const campusName = config?.campusName || "Haliç University";

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sparkling background for consistency */}
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
                href="/videos"
                className="group relative px-6 py-3 bg-white text-gray-900 font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm overflow-hidden border border-gray-100"
              >
                <span className="relative z-10">Videos</span>
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
                  href="/videos"
                  className="group relative px-5 py-3 bg-white text-gray-900 font-semibold rounded-lg shadow-md text-xs overflow-hidden border border-gray-100 whitespace-nowrap"
                >
                  <span className="relative z-10">Videos</span>
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
          {/* Hero section with logo */}
          <motion.div 
            variants={fadeIn}
            className="text-center mb-12"
          >
            <div className="mb-6">
              <Image
                src={gdgLogo}
                alt="GDG on Campus"
                width={200}
                height={200}
                className="mx-auto drop-shadow-xl"
                priority
              />
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              <GoogleText /> Developer Groups on Campus
            </h2>
            <div className="relative inline-block">
              {/* Multiple layered blurred ellipses to create splash effect that covers full text */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-6 bg-indigo-950/45 rounded-full blur-2xl -z-10"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-5 bg-indigo-900/55 rounded-full blur-xl -z-10"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-4 bg-indigo-800/65 rounded-full blur-lg -z-10"></div>
              <p className="relative text-2xl text-white font-semibold tracking-wide drop-shadow-xl px-3 py-1">
                {campusName}
              </p>
            </div>
          </motion.div>

          {/* Loading state */}
          {loading && (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading content from Contentful...</p>
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

          {/* Content sections */}
          {!loading && !error && (
            <>
              {/* Introduction section */}
              <motion.div 
                variants={fadeIn}
                className="max-w-4xl mx-auto mb-16 text-center"
              >
                <p className="text-lg text-gray-700 leading-relaxed">
                  Welcome to <GoogleText /> Developer Groups on Campus {campusName}. As part of the global <GoogleText /> Developer Groups initiative, 
                  we are a vibrant and inclusive community of students passionate about technology, innovation, and collaboration. 
                  Our community brings together developers, designers, and tech enthusiasts from all backgrounds.
                </p>
              </motion.div>

              {/* Dynamic about sections from Contentful */}
              {aboutSections.length > 0 ? (
                <motion.div 
                  variants={fadeIn}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 max-w-5xl mx-auto"
                >
                  {aboutSections.map((section, index) => {
                    const IconComponent = section.iconName && iconMap[section.iconName] 
                      ? iconMap[section.iconName] 
                      : FaLightbulb;
                    const colorClass = colorVariants[index % colorVariants.length];
                    
                    return (
                      <InfoCard
                        key={section.order || index}
                        icon={IconComponent}
                        title={section.sectionTitle}
                        content={section.content}
                        color={colorClass}
                      />
                    );
                  })}
                </motion.div>
              ) : (
                // Fallback content if no sections in Contentful
                <motion.div 
                  variants={fadeIn}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 max-w-5xl mx-auto"
                >
                  <InfoCard
                    icon={FaRocket}
                    title="Our Mission"
                    content={`At GDG on Campus ${campusName}, our mission is to foster a thriving environment where students from all fields—whether they're seasoned developers or complete beginners—can come together to learn, build, and grow.`}
                    color="from-blue-500 to-blue-600"
                  />
                  
                  <InfoCard
                    icon={FaLightbulb}
                    title="What We Do"
                    content="We are committed to empowering students by providing opportunities to develop technical skills through hands-on projects, workshops, and events led by industry professionals and peers."
                    color="from-green-500 to-green-600"
                  />
                  
                  <InfoCard
                    icon={FaUsers}
                    title="Our Community"
                    content="Join us in our journey to make technology accessible, share knowledge, and create impactful solutions to real-world problems, all while building lifelong connections within the tech community."
                    color="from-yellow-500 to-orange-500"
                  />
                  
                  <InfoCard
                    icon={FaHeart}
                    title="Join Us"
                    content="Whether you're interested in web development, mobile apps, cloud computing, AI/ML, or any other tech field, there's a place for you in our community. Let's build the future together!"
                    color="from-red-500 to-pink-500"
                  />
                </motion.div>
              )}

              {/* Statistics section */}
              <motion.div 
                variants={fadeIn}
                className="bg-white rounded-2xl shadow-xl p-8 mb-16 max-w-4xl mx-auto"
              >
                <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">
                  Our Impact in Numbers
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  <div>
                    <p className="text-3xl font-bold text-[#FBBC04]">50+</p>
                    <p className="text-gray-600">Active Members</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-[#4285F4]">20+</p>
                    <p className="text-gray-600">Events Organized</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-[#34A853]">100+</p>
                    <p className="text-gray-600">Workshop Hours</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-[#EA4335]">500+</p>
                    <p className="text-gray-600">Students Reached</p>
                  </div>
                </div>
              </motion.div>

              {/* Credits section */}
              <motion.div 
                variants={fadeIn}
                className="text-center py-8 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl"
              >
                <p className="text-sm text-gray-600">
                  This website was developed by{" "}
                  <a 
                    href="https://furkanunsalan.dev" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
                  >
                    Furkan Ünsalan
                  </a>
                  {" & "}
                  <a 
                    href="https://sarpowsky.github.io" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
                  >
                    Sarp Can Karaman
                  </a>
                </p>
              </motion.div>
            </>
          )}
        </motion.main>
      </div>
    </div>
  );
}