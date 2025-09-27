// src/app/page.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaLinkedin, FaGithub, FaLink } from "react-icons/fa";
import SparklingBackground from "@/components/sparkling-background";
import gdgLogo from "@/images/gdglogo.png";
import { socials, joinLink } from "@/data/socials";

export default function Home() {
  // Animation variants for staggered entrance
  const fadeInUp = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const fadeInLeft = {
    hidden: { 
      opacity: 0, 
      x: -30 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const fadeInRight = {
    hidden: { 
      opacity: 0, 
      x: 30 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const logoAnimation = {
    hidden: { 
      opacity: 0
    },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.3
      }
    }
  };

  // Enhanced button styles with better design
  const buttonBaseStyle = "group relative px-12 py-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-2xl min-w-[240px] text-center overflow-hidden";
  
  // Google colors gradient for join button with all colors clearly visible
  const joinButtonStyle = "group relative px-14 py-6 font-bold rounded-full shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 text-2xl text-white overflow-hidden";
  const googleGradient = "bg-gradient-to-r from-blue-500 via-green-500 via-yellow-500 via-red-500 to-blue-500";

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sparkling background animation layer */}
      <SparklingBackground />
      
      {/* Main content container */}
      <div className="relative z-10 min-h-screen flex flex-col justify-between p-4 md:p-8">
        
        {/* Desktop Layout */}
        <div className="hidden lg:flex flex-1 items-center justify-center">
          <div className="max-w-7xl w-full relative h-[700px] flex flex-col justify-center">
            
            {/* Top row: Events (left) and Team (right) */}
            <div className="absolute w-full z-20" style={{ top: '38%' }}>
              <div className="flex justify-between items-center">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeInLeft}
                  custom={0.8}
                  transition={{ delay: 0.8 }}
                >
                  <Link href="/events" className={buttonBaseStyle}>
                    <span className="relative z-10">Events</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                  </Link>
                </motion.div>

                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeInRight}
                  custom={0.8}
                  transition={{ delay: 0.8 }}
                >
                  <Link href="/team" className={buttonBaseStyle}>
                    <span className="relative z-10">Team</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* Center: Logo and Join Us button */}
            <div className="flex flex-col items-center z-10">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={logoAnimation}
                className="mb-8"
              >
                <Image
                  src={gdgLogo}
                  alt="GDG on Campus"
                  width={400}
                  height={400}
                  className="drop-shadow-2xl hover:drop-shadow-3xl transition-all duration-300"
                  priority
                />
              </motion.div>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ delay: 1.6 }}
              >
                <a
                  href={joinLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${joinButtonStyle} ${googleGradient} bg-[length:200%_100%] hover:bg-[length:100%_100%]`}
                >
                  <span className="relative z-10">Join Our Community</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                </a>
              </motion.div>
            </div>

            {/* Bottom row: Videos (left) and About (right) */}
            <div className="absolute w-full z-20" style={{ bottom: '15%' }}>
              <div className="flex justify-between items-center px-32">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeInLeft}
                  custom={1.2}
                  transition={{ delay: 1.2 }}
                >
                  <Link href="/videos" className={buttonBaseStyle}>
                    <span className="relative z-10">Videos</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                  </Link>
                </motion.div>

                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeInRight}
                  custom={1.2}
                  transition={{ delay: 1.2 }}
                >
                  <Link href="/about" className={buttonBaseStyle}>
                    <span className="relative z-10">About</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Tablet Layout (md to lg) */}
        <div className="hidden md:flex lg:hidden flex-1 items-center justify-center">
          <div className="max-w-2xl w-full">
            {/* Logo at top */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={logoAnimation}
              className="mb-8 text-center"
            >
              <Image
                src={gdgLogo}
                alt="GDG on Campus"
                width={300}
                height={300}
                className="mx-auto drop-shadow-2xl"
                priority
              />
            </motion.div>

            {/* 2x2 Grid for buttons */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInLeft}
                transition={{ delay: 0.8 }}
              >
                <Link href="/events" className="group relative px-8 py-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-xl text-center block overflow-hidden">
                  <span className="relative z-10">Events</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                </Link>
              </motion.div>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInRight}
                transition={{ delay: 0.8 }}
              >
                <Link href="/team" className="group relative px-8 py-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-xl text-center block overflow-hidden">
                  <span className="relative z-10">Team</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                </Link>
              </motion.div>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInLeft}
                transition={{ delay: 1.2 }}
              >
                <Link href="/videos" className="group relative px-8 py-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-xl text-center block overflow-hidden">
                  <span className="relative z-10">Videos</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                </Link>
              </motion.div>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInRight}
                transition={{ delay: 1.2 }}
              >
                <Link href="/about" className="group relative px-8 py-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-xl text-center block overflow-hidden">
                  <span className="relative z-10">About</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                </Link>
              </motion.div>
            </div>

            {/* Join button */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ delay: 1.6 }}
              className="text-center"
            >
              <a
                href={joinLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group px-12 py-5 font-bold rounded-full shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 text-xl text-white bg-gradient-to-r from-blue-500 via-green-500 via-yellow-500 via-red-500 to-blue-500 bg-[length:200%_100%] hover:bg-[length:100%_100%] inline-block overflow-hidden relative"
              >
                <span className="relative z-10">Join Our Community</span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="flex md:hidden flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            {/* Logo */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={logoAnimation}
              className="mb-8 text-center"
            >
              <Image
                src={gdgLogo}
                alt="GDG on Campus"
                width={250}
                height={250}
                className="mx-auto drop-shadow-2xl"
                priority
              />
            </motion.div>

            {/* Navigation buttons in vertical stack */}
            <motion.div 
              className="space-y-4 mb-6"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ delay: 0.8 }}
            >
              <Link href="/events" className="group relative px-10 py-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-xl text-center block w-full overflow-hidden">
                <span className="relative z-10">Events</span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              </Link>
              <Link href="/team" className="group relative px-10 py-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-xl text-center block w-full overflow-hidden">
                <span className="relative z-10">Team</span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              </Link>
              <Link href="/videos" className="group relative px-10 py-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-xl text-center block w-full overflow-hidden">
                <span className="relative z-10">Videos</span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              </Link>
              <Link href="/about" className="group relative px-10 py-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-xl text-center block w-full overflow-hidden">
                <span className="relative z-10">About</span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              </Link>
            </motion.div>

            {/* Join button */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ delay: 1.6 }}
            >
              <a
                href={joinLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group px-12 py-5 font-bold rounded-full shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 text-xl text-white bg-gradient-to-r from-blue-500 via-green-500 via-yellow-500 via-red-500 to-blue-500 bg-[length:200%_100%] hover:bg-[length:100%_100%] block text-center w-full overflow-hidden relative"
              >
                <span className="relative z-10">Join Our Community</span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Bottom section: Social links and All Links - Desktop/Tablet only */}
        <div className="hidden md:flex justify-between items-end mt-8">
          {/* Social media icons */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 2.0 }}
            className="flex space-x-6"
          >
            <a
              href={socials.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 hover:text-orange-700 transition-all duration-300 transform hover:scale-110"
            >
              <FaInstagram size={36} />
            </a>
            <a
              href={socials.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 transition-all duration-300 transform hover:scale-110"
            >
              <FaLinkedin size={36} />
            </a>
            <a
              href={socials.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-gray-900 transition-all duration-300 transform hover:scale-110"
            >
              <FaGithub size={36} />
            </a>
          </motion.div>

          {/* All Links button */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 2.0 }}
          >
            <a
              href={joinLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 px-8 py-4 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl text-lg font-medium"
            >
              <FaLink size={24} />
              <span>All Links</span>
            </a>
          </motion.div>
        </div>

        {/* Mobile Social Links - Centered at bottom */}
        <div className="flex md:hidden justify-center mt-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 2.0 }}
            className="flex space-x-8"
          >
            <a
              href={socials.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600"
            >
              <FaInstagram size={32} />
            </a>
            <a
              href={socials.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600"
            >
              <FaLinkedin size={32} />
            </a>
            <a
              href={socials.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700"
            >
              <FaGithub size={32} />
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}