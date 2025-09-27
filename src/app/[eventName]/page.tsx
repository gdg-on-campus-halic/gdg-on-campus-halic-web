"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { events } from "@/data/events";
import Image from "next/image";
import { Event } from "@/lib/types";
import Title from "@/components/title";
import NotFoundPage from "../not-found";
import JoinOurClub from "@/components/join-our-club";
import { motion } from "framer-motion";

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

  const getEventByName = (name: string | undefined): Event | null => {
    if (!name) return null;
    return (
      events.find(
        (event) => event.slug.replace(/\s+/g, "-").toLowerCase() === name
      ) || null
    );
  };

  const event: Event | null = getEventByName(eventName as string | undefined);

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
      <motion.div variants={fadeInUp} className="mb-6">
        <Link 
          href="/events" 
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium"
        >
          <FaArrowLeft className="text-sm" />
          Back to Events
        </Link>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <Title className="text-center mb-2">{event.title}</Title>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <Image
          src={event.bannerImage}
          alt={event.title}
          className="w-2/3 md:w-1/2 h-auto mx-auto rounded-lg"
        />
      </motion.div>

      <motion.div variants={fadeInUp}>
        <Title size="small" className="text-center">
          {event.date} | {event.location}
        </Title>
      </motion.div>

      <motion.div variants={fadeInUp} className="text-center">
        <p className="text-gray-700 mt-2 text-left mx-auto max-w-2xl w-5/6 md:w-full">
          {event.description}
        </p>
        <p className="text-gray-600 mt-4 text-left mx-auto max-w-2xl w-5/6 md:w-full">
          {event.text}
        </p>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <Title size="medium" className="text-center my-10">
          Event Gallery
        </Title>
      </motion.div>

      <motion.div
        className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4 p-2"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {event.images.map((image, index) => (
          <motion.div key={index} variants={fadeInUp}>
            <Image
              key={index}
              src={image}
              alt={`Gallery image ${index + 1}`}
              className="w-full h-auto rounded"
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={fadeInUp}>
        <JoinOurClub />
      </motion.div>
    </motion.div>
  );
};

export default EventPage;
