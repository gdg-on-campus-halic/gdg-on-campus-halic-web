// src/app/team/page.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import TeamMemberCard from "@/components/team-member-card";
import SparklingBackground from "@/components/sparkling-background";
import placeholderAvatar from "@/images/team/placeholderAvatar.png";
import { useEffect, useState } from "react";
import { TeamMember } from "@/lib/types";
import { getTeamMembersByVariant } from "@/lib/contentful-data";

export default function TeamPage() {
  // State to hold team members grouped by variant
  const [teamGroups, setTeamGroups] = useState<Record<string, TeamMember[]>>({
    yellow: [],
    green: [],
    red: [],
    blue: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch team members when component mounts
  useEffect(() => {
    async function loadTeamMembers() {
      try {
        setLoading(true);
        const grouped = await getTeamMembersByVariant();
        setTeamGroups(grouped);
        setError(null);
      } catch (err) {
        console.error('Error loading team members:', err);
        setError('Failed to load team members. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    loadTeamMembers();
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
        staggerChildren: 0.03,
        delayChildren: 0.1
      }
    }
  };

  // Extract team groups for easier access
  const leadership = teamGroups.yellow || [];
  const organizationTeam = teamGroups.green || [];
  const projectTeam = teamGroups.red || [];
  const socialMediaTeam = teamGroups.blue || [];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sparkling background */}
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
                  href="/videos"
                  className="group relative px-5 py-3 bg-white text-gray-900 font-semibold rounded-lg shadow-md text-xs overflow-hidden border border-gray-100 whitespace-nowrap"
                >
                  <span className="relative z-10">Videos</span>
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
              Meet Our{" "}
              <span className="text-4xl font-bold">
                <span className="text-[#4285F4]">T</span>
                <span className="text-[#EA4335]">e</span>
                <span className="text-[#FBBC05]">a</span>
                <span className="text-[#34A853]">m</span>
              </span>
            </h2>
            <p className="text-gray-600 text-lg">
              Passionate students working together to build a vibrant tech community. 
              Get to know the people behind GDG on Campus Haliç.
            </p>
          </motion.div>

          {/* Loading state */}
          {loading && (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading team members from Contentful...</p>
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

          {/* Team sections */}
          {!loading && !error && (
            <>
              {/* Leadership section */}
              {leadership.length > 0 && (
                <section className="mb-16">
                  <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">
                    Leadership
                  </h3>
                  <div className="flex flex-wrap justify-center gap-3">
                    {leadership.map((member, index) => (
                      <TeamMemberCard
                        key={index}
                        avatar={member.avatar || placeholderAvatar}
                        name={member.name}
                        surname={member.surname}
                        title={member.title}
                        variant={member.variant}
                        linkedinUrl={member.linkedinUrl}
                        instagramUsername={member.instagramUsername}
                        githubUsername={member.githubUsername}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* Three column layout for teams - responsive */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8">
                
                {/* Project Team Column */}
                {projectTeam.length > 0 && (
                  <motion.section variants={fadeIn} className="w-full">
                    <h3 className="text-xl font-bold text-center mb-6 text-gray-800 border-b-2 border-red-400 pb-2">
                      Project Team
                    </h3>
                    <div className="grid grid-cols-2 gap-3 justify-items-center">
                      {projectTeam.map((member, index) => (
                        <motion.div key={index} variants={fadeIn}>
                          <TeamMemberCard
                            avatar={member.avatar || placeholderAvatar}
                            name={member.name}
                            surname={member.surname}
                            title={member.title}
                            variant={member.variant}
                            linkedinUrl={member.linkedinUrl}
                            instagramUsername={member.instagramUsername}
                            githubUsername={member.githubUsername}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </motion.section>
                )}

                {/* Organization Team Column */}
                {organizationTeam.length > 0 && (
                  <motion.section variants={fadeIn} className="w-full">
                    <h3 className="text-xl font-bold text-center mb-6 text-gray-800 border-b-2 border-green-400 pb-2">
                      Organization Team
                    </h3>
                    <div className="grid grid-cols-2 gap-3 justify-items-center">
                      {organizationTeam.map((member, index) => (
                        <motion.div key={index} variants={fadeIn}>
                          <TeamMemberCard
                            avatar={member.avatar || placeholderAvatar}
                            name={member.name}
                            surname={member.surname}
                            title={member.title}
                            variant={member.variant}
                            linkedinUrl={member.linkedinUrl}
                            instagramUsername={member.instagramUsername}
                            githubUsername={member.githubUsername}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </motion.section>
                )}

                {/* Social Media & Design Team Column */}
                {socialMediaTeam.length > 0 && (
                  <motion.section variants={fadeIn} className="w-full md:col-span-2 xl:col-span-1">
                    <h3 className="text-xl font-bold text-center mb-6 text-gray-800 border-b-2 border-blue-400 pb-2">
                      Social Media & Design
                    </h3>
                    <div className="grid grid-cols-2 gap-3 justify-items-center">
                      {socialMediaTeam.map((member, index) => (
                        <motion.div key={index} variants={fadeIn}>
                          <TeamMemberCard
                            avatar={member.avatar || placeholderAvatar}
                            name={member.name}
                            surname={member.surname}
                            title={member.title}
                            variant={member.variant}
                            linkedinUrl={member.linkedinUrl}
                            instagramUsername={member.instagramUsername}
                            githubUsername={member.githubUsername}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </motion.section>
                )}
              </div>

              {/* Join the team CTA - Updated with blue color */}
              <motion.div 
                variants={fadeIn}
                className="text-center py-12 backdrop-blur-xl bg-white/90 shadow-[0_8px_32px_rgba(0,0,0,0.12)] rounded-2xl mt-16 border border-white/20"
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Want to Join Our Team?
                </h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto px-4">
                  We&apos;re always looking for passionate individuals to join our community. 
                  Whether you&apos;re interested in organizing events, building projects, or creating content, there&apos;s a place for you!
                </p>
                <a
                  href="https://linktr.ee/GDGonCampusHalic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3 bg-[#4285F4] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 hover:bg-[#357AE8]"
                >
                  Apply Now
                </a>
              </motion.div>
            </>
          )}
        </motion.main>
      </div>
    </div>
  );
}