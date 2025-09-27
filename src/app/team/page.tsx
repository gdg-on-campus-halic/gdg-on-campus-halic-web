// src/app/team/page.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import TeamMemberCard from "@/components/team-member-card";
import { teamMembers } from "@/data/team";
import SparklingBackground from "@/components/sparkling-background";
import placeholderAvatar from "@/images/team/placeholderAvatar.png";

export default function TeamPage() {
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
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    }
  };

  // Group team members by their role/team
  const organizers = teamMembers.filter(m => 
    m.title.toLowerCase().includes('organiser') || 
    m.title.toLowerCase().includes('president')
  );
  const organizationTeam = teamMembers.filter(m => 
    m.variant === 'green' && 
    !m.title.toLowerCase().includes('organiser') && 
    !m.title.toLowerCase().includes('president')
  );
  const projectTeam = teamMembers.filter(m => m.variant === 'red');
  const socialMediaTeam = teamMembers.filter(m => m.variant === 'blue');

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sparkling background */}
      <SparklingBackground />
      
      <div className="relative z-10">
        {/* Header - Enhanced glass-morphism design */}
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
                  Our Team
                </motion.h1>
              </div>
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

          {/* Leadership section */}
          <motion.section variants={fadeIn} className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">
              Leadership
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {organizers.map((member, index) => (
                <motion.div key={index} variants={fadeIn}>
                  <TeamMemberCard
                    avatar={member.avatar || placeholderAvatar}
                    name={member.name}
                    surname={member.surname}
                    title={member.title}
                    variant="yellow"
                    linkedinUrl={member.linkedinUrl}
                    instagramUsername={member.instagramUsername}
                    githubUsername={member.githubUsername}
                  />
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Three column layout for teams - responsive */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8">
            
            {/* Project Team Column */}
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

            {/* Organization Team Column */}
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

            {/* Social Media & Design Team Column */}
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
          </div>

          {/* Join the team CTA */}
          <motion.div 
            variants={fadeIn}
            className="text-center py-12 backdrop-blur-xl bg-white/90 shadow-[0_8px_32px_rgba(0,0,0,0.12)] rounded-2xl mt-16 border border-white/20"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Want to Join Our Team?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto px-4">
              We're always looking for passionate individuals to join our community. 
              Whether you're interested in organizing events, building projects, or creating content, there's a place for you!
            </p>
            <a
              href="https://linktr.ee/GDGonCampusHalic"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-3 bg-white text-gray-900 font-semibold rounded-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.5),_0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.7),_0_15px_40px_rgba(0,0,0,0.3)] hover:scale-105 hover:-translate-y-1 transition-all duration-300 border border-white overflow-hidden inline-block"
            >
              <span className="relative z-10">Apply Now</span>
              <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />
            </a>
          </motion.div>
        </motion.main>
      </div>
    </div>
  );
}