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
        {/* Header */}
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
                  Our Team
                </h1>
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
              Meet Our <span className="text-orange-500">Amazing Team</span>
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
            className="text-center py-12 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl mt-16"
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
              className="inline-block px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:shadow-xl transition-all duration-300 shadow-lg hover:scale-105"
            >
              Apply Now
            </a>
          </motion.div>
        </motion.main>
      </div>
    </div>
  );
}