// src/app/about/page.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft, FaRocket, FaUsers, FaLightbulb, FaHeart } from "react-icons/fa";
import SparklingBackground from "@/components/sparkling-background";
import GoogleText from "@/components/google-text";
import gdgLogo from "@/images/gdglogo.png";
import { campus } from "@/data/socials";

export default function AboutPage() {
  // Animation variants for smooth transitions
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
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

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

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sparkling background for consistency */}
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
                  About Us
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
            <p className="text-2xl text-orange-500 font-semibold">
              {campus}
            </p>
          </motion.div>

          {/* Introduction section */}
          <motion.div 
            variants={fadeIn}
            className="max-w-4xl mx-auto mb-16 text-center"
          >
            <p className="text-lg text-gray-700 leading-relaxed">
              Welcome to <GoogleText /> Developer Groups on Campus {campus}. As part of the global <GoogleText /> Developer Groups initiative, 
              we are a vibrant and inclusive community of students passionate about technology, innovation, and collaboration. 
              Our community brings together developers, designers, and tech enthusiasts from all backgrounds.
            </p>
          </motion.div>

          {/* Mission and values cards */}
          <motion.div 
            variants={fadeIn}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 max-w-5xl mx-auto"
          >
            <InfoCard
              icon={FaRocket}
              title="Our Mission"
              content={`At GDG on Campus ${campus}, our mission is to foster a thriving environment where students from all fields—whether they're seasoned developers or complete beginners—can come together to learn, build, and grow.`}
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
                <p className="text-3xl font-bold text-orange-500">50+</p>
                <p className="text-gray-600">Active Members</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-500">20+</p>
                <p className="text-gray-600">Events Organized</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-green-500">100+</p>
                <p className="text-gray-600">Workshop Hours</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-red-500">500+</p>
                <p className="text-gray-600">Students Reached</p>
              </div>
            </div>
          </motion.div>

          {/* Technologies section */}
          <motion.div 
            variants={fadeIn}
            className="text-center py-12 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Technologies We Explore
            </h3>
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {['Android', 'Web', 'Cloud', 'AI/ML', 'Flutter', 'Firebase', 'TensorFlow', 'Kubernetes', 'React', 'Node.js'].map((tech) => (
                <span 
                  key={tech}
                  className="px-4 py-2 bg-white rounded-full shadow-md text-gray-700 font-medium hover:shadow-lg transition-shadow duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.main>
      </div>
    </div>
  );
}