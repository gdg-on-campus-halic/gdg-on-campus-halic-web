// src/app/page.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaLinkedin, FaGithub, FaDiscord } from "react-icons/fa";
import SparklingBackground from "@/components/sparkling-background";
import gdgLogo from "@/images/gdglogo.png";
import bannerImg from "@/images/banner.png";
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

  // Enhanced button styles with better design - white raised buttons
  const buttonBaseStyle = "group relative px-12 py-6 bg-white text-gray-900 font-bold rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.5),_0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.7),_0_15px_40px_rgba(0,0,0,0.3)] hover:scale-105 hover:-translate-y-1 transition-all duration-300 text-2xl min-w-[240px] text-center overflow-hidden border border-white";
  
  // Google colors gradient for join button - clean and modern approach
  const joinButtonStyle = "px-14 py-6 font-bold rounded-full shadow-2xl text-2xl text-white";
  const googleGradient = "bg-gradient-to-r from-blue-500 via-red-500 to-yellow-400";
  const googleGradientAlt = "bg-gradient-to-r from-yellow-400 via-green-500 to-blue-500";

  return (
    <div className="relative h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      <style jsx global>{`
        @keyframes gradient-rotate {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .join-button-border {
          background: linear-gradient(
            90deg,
            rgba(66, 133, 244, 0.6),
            rgba(219, 68, 55, 0.6),
            rgba(244, 180, 0, 0.6),
            rgba(15, 157, 88, 0.6),
            rgba(66, 133, 244, 0.6)
          );
          background-size: 300% 100%;
          animation: gradient-rotate 3s linear infinite;
          filter: blur(3px);
        }
      `}</style>
      {/* Sparkling background animation layer */}
      <SparklingBackground />
      
      {/* Main content container */}
      <div className="relative z-10 h-screen flex flex-col justify-center p-2 md:p-4">
        
        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center justify-center h-full">
          <div className="max-w-6xl w-full relative h-[600px] flex flex-col justify-center">
            
            {/* Top row: Events (left) and Team (right) */}
            <div className="absolute w-full z-20" style={{ top: '35%' }}>
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
                    <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
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
                    <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
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
                className="mb-4"
              >
                <Image
                  src={gdgLogo}
                  alt="GDG on Campus"
                  width={320}
                  height={320}
                  className="drop-shadow-2xl hover:drop-shadow-3xl transition-all duration-300"
                  priority
                />
              </motion.div>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ delay: 1.6 }}
                className="relative group"
              >
                <div className="absolute -top-1 -left-1 -right-1 -bottom-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 join-button-border" />
                <a
                  href={joinLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative px-14 py-6 bg-white text-gray-900 font-bold rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.5),_0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.7),_0_15px_40px_rgba(0,0,0,0.3)] transition-all duration-300 text-2xl min-w-[240px] text-center overflow-hidden inline-block border border-white"
                >
                  <span className="relative z-10">Join Our Community</span>
                  <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
                </a>
              </motion.div>
            </div>

            {/* Bottom row: Videos (left) and About (right) */}
            <div className="absolute w-full z-20" style={{ bottom: '25%' }}>
              <div className="flex justify-between items-center px-24">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeInLeft}
                  custom={1.2}
                  transition={{ delay: 1.2 }}
                >
                  <Link href="/videos" className={buttonBaseStyle}>
                    <span className="relative z-10">Videos</span>
                    <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
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
                    <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Tablet Layout (md to lg) */}
        <div className="hidden md:flex lg:hidden items-center justify-center h-full">
          <div className="max-w-2xl w-full">
            {/* Logo at top */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={logoAnimation}
              className="mb-4 text-center"
            >
              <Image
                src={gdgLogo}
                alt="GDG on Campus"
                width={240}
                height={240}
                className="mx-auto drop-shadow-2xl"
                priority
              />
            </motion.div>

            {/* 2x2 Grid for buttons */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInLeft}
                transition={{ delay: 0.8 }}
              >
                <Link href="/events" className="group relative px-8 py-5 bg-white text-gray-900 font-bold rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.5),_0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.7),_0_15px_40px_rgba(0,0,0,0.3)] hover:scale-105 hover:-translate-y-1 transition-all duration-300 text-xl text-center block overflow-hidden border border-white">
                  <span className="relative z-10">Events</span>
                  <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
                </Link>
              </motion.div>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInRight}
                transition={{ delay: 0.8 }}
              >
                <Link href="/team" className="group relative px-8 py-5 bg-white text-gray-900 font-bold rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.5),_0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.7),_0_15px_40px_rgba(0,0,0,0.3)] hover:scale-105 hover:-translate-y-1 transition-all duration-300 text-xl text-center block overflow-hidden border border-white">
                  <span className="relative z-10">Team</span>
                  <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
                </Link>
              </motion.div>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInLeft}
                transition={{ delay: 1.2 }}
              >
                <Link href="/videos" className="group relative px-8 py-5 bg-white text-gray-900 font-bold rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.5),_0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.7),_0_15px_40px_rgba(0,0,0,0.3)] hover:scale-105 hover:-translate-y-1 transition-all duration-300 text-xl text-center block overflow-hidden border border-white">
                  <span className="relative z-10">Videos</span>
                  <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
                </Link>
              </motion.div>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInRight}
                transition={{ delay: 1.2 }}
              >
                <Link href="/about" className="group relative px-8 py-5 bg-white text-gray-900 font-bold rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.5),_0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.7),_0_15px_40px_rgba(0,0,0,0.3)] hover:scale-105 hover:-translate-y-1 transition-all duration-300 text-xl text-center block overflow-hidden border border-white">
                  <span className="relative z-10">About</span>
                  <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
                </Link>
              </motion.div>
            </div>

            {/* Join button */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ delay: 1.6 }}
              className="text-center relative group"
            >
              <div className="absolute -top-1 -left-1 -right-1 -bottom-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 join-button-border" />
              <a
                href={joinLink}
                target="_blank"
                rel="noopener noreferrer"
                className="relative px-12 py-5 bg-white text-gray-900 font-bold rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.5),_0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.7),_0_15px_40px_rgba(0,0,0,0.3)] transition-all duration-300 text-xl text-center overflow-hidden inline-block border border-white"
              >
                <span className="relative z-10">Join Our Community</span>
                <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="flex md:hidden items-center justify-center h-full">
          <div className="w-full max-w-sm">
            {/* Logo */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={logoAnimation}
              className="mb-4 text-center"
            >
              <Image
                src={gdgLogo}
                alt="GDG on Campus"
                width={200}
                height={200}
                className="mx-auto drop-shadow-2xl"
                priority
              />
            </motion.div>

            {/* Navigation buttons in vertical stack */}
            <motion.div 
              className="space-y-3 mb-4"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ delay: 0.8 }}
            >
              <Link href="/events" className="group relative px-10 py-5 bg-white text-gray-900 font-bold rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.5),_0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.7),_0_15px_40px_rgba(0,0,0,0.3)] hover:scale-105 hover:-translate-y-1 transition-all duration-300 text-xl text-center block w-full overflow-hidden border border-white">
                <span className="relative z-10">Events</span>
                <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
              </Link>
              <Link href="/team" className="group relative px-10 py-5 bg-white text-gray-900 font-bold rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.5),_0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.7),_0_15px_40px_rgba(0,0,0,0.3)] hover:scale-105 hover:-translate-y-1 transition-all duration-300 text-xl text-center block w-full overflow-hidden border border-white">
                <span className="relative z-10">Team</span>
                <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
              </Link>
              <Link href="/videos" className="group relative px-10 py-5 bg-white text-gray-900 font-bold rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.5),_0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.7),_0_15px_40px_rgba(0,0,0,0.3)] hover:scale-105 hover:-translate-y-1 transition-all duration-300 text-xl text-center block w-full overflow-hidden border border-white">
                <span className="relative z-10">Videos</span>
                <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
              </Link>
              <Link href="/about" className="group relative px-10 py-5 bg-white text-gray-900 font-bold rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.5),_0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.7),_0_15px_40px_rgba(0,0,0,0.3)] hover:scale-105 hover:-translate-y-1 transition-all duration-300 text-xl text-center block w-full overflow-hidden border border-white">
                <span className="relative z-10">About</span>
                <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
              </Link>
            </motion.div>

            {/* Join button */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ delay: 1.6 }}
              className="relative group"
            >
              <div className="absolute -top-1 -left-1 -right-1 -bottom-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 join-button-border" />
              <a
                href={joinLink}
                target="_blank"
                rel="noopener noreferrer"
                className="relative px-12 py-5 bg-white text-gray-900 font-bold rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.5),_0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.7),_0_15px_40px_rgba(0,0,0,0.3)] transition-all duration-300 text-lg text-center block w-full overflow-hidden border border-white"
              >
                <span className="relative z-10">Join Our Community</span>
                <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Bottom section: Social links and Banner - Desktop/Tablet only */}
        <div className="hidden md:block absolute bottom-6 left-4 right-4 z-30">
          <div className="flex justify-between items-end">
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
              aria-label="Visit our Instagram page"
              className="text-orange-600 hover:text-orange-700 transition-all duration-300 transform hover:scale-110"
            >
              <FaInstagram size={36} />
            </a>
            <a
              href={socials.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our LinkedIn page"
              className="text-blue-600 hover:text-blue-700 transition-all duration-300 transform hover:scale-110"
            >
              <FaLinkedin size={36} />
            </a>
            <a
              href={socials.github.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our GitHub page"
              className="text-gray-700 hover:text-gray-900 transition-all duration-300 transform hover:scale-110"
            >
              <FaGithub size={36} />
            </a>
            <a
              href={socials.discord.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Join our Discord server"
              className="text-purple-600 hover:text-purple-700 transition-all duration-300 transform hover:scale-110"
            >
              <FaDiscord size={36} />
            </a>
            </motion.div>

            {/* Banner image */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ delay: 2.0 }}
            >
              <Image
                src={bannerImg}
                alt="GDG Banner"
                width={150}
                height={60}
                className="object-contain"
              />
            </motion.div>
          </div>
        </div>

        {/* Mobile Social Links - Centered at bottom */}
        <div className="flex md:hidden justify-center absolute bottom-6 left-0 right-0 z-30">
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
              aria-label="Visit our Instagram page"
              className="text-orange-600"
            >
              <FaInstagram size={32} />
            </a>
            <a
              href={socials.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our LinkedIn page"
              className="text-blue-600"
            >
              <FaLinkedin size={32} />
            </a>
            <a
              href={socials.github.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our GitHub page"
              className="text-gray-700"
            >
              <FaGithub size={32} />
            </a>
            <a
              href={socials.discord.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Join our Discord server"
              className="text-purple-600"
            >
              <FaDiscord size={32} />
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}