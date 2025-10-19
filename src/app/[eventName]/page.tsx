// src/app/[eventName]/page.tsx
"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import Image from "next/image";
import { Event } from "@/lib/types";
import Title from "@/components/title";
import NotFoundPage from "../not-found";
import JoinOurClub from "@/components/join-our-club";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getEventBySlug } from "@/lib/contentful-data";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const EventPage: React.FC = () => {
  const { eventName } = useParams();
  const [event, setEvent] = useState<Event | null | undefined>(undefined);
  const [loading, setLoading] = useState(true);

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

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading event details...</p>
        </div>
      </div>
    );
  }

  // Event not found
  if (!event) {
    return <NotFoundPage />;
  }

  return (
    <motion.div
      className="container mx-auto my-8"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      {/* Back button */}
      <motion.div variants={fadeInUp} className="mb-6">
        <Link 
          href="/events" 
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium"
        >
          <FaArrowLeft className="text-sm" />
          Back to Events
        </Link>
      </motion.div>

      {/* Event title */}
      <motion.div variants={fadeInUp}>
        <Title className="text-center mb-2">{event.title}</Title>
      </motion.div>

      {/* Banner image */}
      <motion.div variants={fadeInUp}>
        <Image
          src={event.bannerImage.src}
          alt={event.title}
          width={800}
          height={450}
          className="w-2/3 md:w-1/2 h-auto mx-auto rounded-lg"
        />
      </motion.div>

      {/* Event metadata - date and location */}
      <motion.div variants={fadeInUp}>
        <Title size="small" className="text-center">
          {event.date} | {event.location}
        </Title>
      </motion.div>

      {/* Event description and text */}
      <motion.div variants={fadeInUp} className="text-center">
        <p className="text-gray-700 mt-2 text-left mx-auto max-w-2xl w-5/6 md:w-full">
          {event.description}
        </p>
        {event.text && (
          <p className="text-gray-600 mt-4 text-left mx-auto max-w-2xl w-5/6 md:w-full">
            {event.text}
          </p>
        )}
      </motion.div>

      {/* Gallery section title */}
      <motion.div variants={fadeInUp}>
        <Title size="medium" className="text-center my-10">
          Event Gallery
        </Title>
      </motion.div>

      {/* Image gallery */}
      <motion.div
        className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4 p-2"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {event.images.map((image, index) => (
          <motion.div key={index} variants={fadeInUp}>
            <Image
              src={image.src}
              alt={`Gallery image ${index + 1}`}
              width={400}
              height={300}
              className="w-full h-auto rounded"
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Join our club button */}
      <motion.div variants={fadeInUp}>
        <JoinOurClub />
      </motion.div>
    </motion.div>
  );
};

export default EventPage;