// src/app/[eventName]/page.tsx
"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft, FaCalendarAlt, FaMapMarkerAlt, FaExpand } from "react-icons/fa";
import Image from "next/image";
import { Event } from "@/lib/types";
import NotFoundPage from "../not-found";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getEventBySlug } from "@/lib/contentful-data";
import SparklingBackground from "@/components/sparkling-background";
import ImageModal from "@/components/image-modal";

const EventPage: React.FC = () => {
  const { eventName } = useParams();
  const [event, setEvent] = useState<Event | null | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  
  // Modal state for image viewer
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    async function loadEvent() {
      // Check if eventName exists and is a string
      if (!eventName || typeof eventName !== 'string') {
        setEvent(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const fetchedEvent = await getEventBySlug(eventName);
        setEvent(fetchedEvent);
      } catch (error) {
        console.error('Error loading event:', error);
        setEvent(null);
      } finally {
        setLoading(false);
      }
    }

    loadEvent();
  }, [eventName]);

  // Animation variants
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
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  // Modal handlers
  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const goToNextImage = () => {
    if (event && currentImageIndex < event.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const goToPreviousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <SparklingBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading event details...</p>
          </div>
        </div>
      </div>
    );
  }

  // Event not found
  if (!event) {
    return <NotFoundPage />;
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <SparklingBackground />
      
      <div className="relative z-10">
        {/* Navigation bar */}
        <div className="container mx-auto px-4 pt-4">
          <div className="flex justify-center items-center mb-6">
            <Link
              href="/events"
              className="group relative px-6 py-3 bg-white text-gray-900 font-semibold rounded-xl shadow-md transition-all duration-300 text-sm overflow-hidden border border-gray-100 flex items-center"
            >
              <FaArrowLeft className="mr-2" size={14} />
              <span className="relative z-10">Back to Events</span>
              <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />
            </Link>
          </div>
        </div>

        {/* Main content */}
        <motion.main
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="container mx-auto px-4 py-8 max-w-5xl"
        >
          {/* Event header section */}
          <motion.div variants={fadeIn} className="mb-8 flex flex-col items-center">
            {/* Event title in container - width fits content */}
            <div className="bg-white rounded-2xl shadow-md px-8 py-6 mb-4 max-w-[90%] md:max-w-fit">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
                {event.title}
              </h1>
            </div>

            {/* Event metadata */}
            <div className="flex flex-wrap justify-center gap-4">
              {event.date && (
                <div className="flex items-center space-x-2 px-4 py-2 bg-white rounded-full shadow-md">
                  <FaCalendarAlt className="text-[#4285F4]" size={16} />
                  <span className="text-sm font-medium text-gray-700">{event.date}</span>
                </div>
              )}
              {event.location && (
                <div className="flex items-center space-x-2 px-4 py-2 bg-white rounded-full shadow-md">
                  <FaMapMarkerAlt className="text-[#EA4335]" size={16} />
                  <span className="text-sm font-medium text-gray-700">{event.location}</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Banner image */}
          <motion.div variants={fadeIn} className="mb-8">
            <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-xl bg-white">
              <Image
                src={event.bannerImage.src}
                alt={event.title}
                layout="fill"
                objectFit="cover"
                className="w-full h-full"
              />
            </div>
          </motion.div>

          {/* Event description */}
          <motion.div variants={fadeIn} className="mb-8">
            <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Event</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                {event.description}
              </p>
              {event.text && (
                <p className="text-gray-600 leading-relaxed">
                  {event.text}
                </p>
              )}
            </div>
          </motion.div>

          {/* Gallery section */}
          {event.images && event.images.length > 0 && (
            <motion.div variants={fadeIn}>
              <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Gallery</h2>
                
                {/* Image grid - responsive and clickable */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {event.images.map((image, index) => (
                    <motion.div
                      key={index}
                      variants={fadeIn}
                      className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 shadow-md cursor-pointer group"
                      onClick={() => openModal(index)}
                    >
                      <Image
                        src={image.src}
                        alt={`Gallery image ${index + 1}`}
                        layout="fill"
                        objectFit="cover"
                        className="w-full h-full transition-transform duration-300"
                      />
                      {/* Hover overlay with expand icon */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                        <FaExpand className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={24} />
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Helper text */}
                <p className="text-sm text-gray-500 text-center mt-4">
                  Click on any image to view in full size
                </p>
              </div>
            </motion.div>
          )}
        </motion.main>

        {/* Image Modal */}
        {event && event.images && (
          <ImageModal
            images={event.images}
            currentIndex={currentImageIndex}
            isOpen={isModalOpen}
            onClose={closeModal}
            onNext={goToNextImage}
            onPrevious={goToPreviousImage}
          />
        )}
      </div>
    </div>
  );
};

export default EventPage;