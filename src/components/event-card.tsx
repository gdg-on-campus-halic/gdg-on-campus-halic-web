// src/components/event-card.tsx
import Image, { StaticImageData } from 'next/image';
import React from 'react';
import Link from 'next/link';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

interface EventCardProps {
  bannerImage: StaticImageData;
  title: string;
  slug: string;
  description: string;
  date?: string;
  location?: string;
  isUpcoming?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ 
  bannerImage, 
  title, 
  slug, 
  description, 
  date,
  location,
  isUpcoming = false
}) => {
  return (
    <Link 
      href={`/${slug}`} 
      className="block max-w-sm w-full transform transition-all duration-300 hover:-translate-y-2 hover:scale-105 group"
    >
      <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl bg-white border border-gray-100 transition-all duration-300">
        {/* Image container with overlay effect */}
        <div className="relative h-48 w-full overflow-hidden">
          <Image 
            src={bannerImage} 
            alt={title} 
            layout="fill" 
            objectFit="cover" 
            className="w-full h-full transition-transform duration-500 group-hover:scale-110"
          />
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Status badge */}
          {isUpcoming ? (
            <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-[#34A853] to-[#4285F4] text-white rounded-full text-xs font-semibold animate-pulse shadow-lg">
              Upcoming Event
            </div>
          ) : date ? (
            <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-700 shadow-md">
              Past Event
            </div>
          ) : null}
        </div>
        
        {/* Content section */}
        <div className="p-5">
          {/* Title with gradient on hover - triggers on card hover */}
          <h2 className="text-xl font-bold text-gray-900 mb-2 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-[#4285F4] group-hover:via-[#34A853] group-hover:to-[#EA4335] group-hover:bg-clip-text group-hover:text-transparent">
            {title}
          </h2>
          
          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
            {description}
          </p>
          
          {/* Event details */}
          <div className="space-y-2 text-xs text-gray-500">
            {date && (
              <div className="flex items-center space-x-2">
                <FaCalendarAlt className="text-[#FBBC04]" />
                <span>{date}</span>
              </div>
            )}
            {location && (
              <div className="flex items-center space-x-2">
                <FaMapMarkerAlt className="text-[#EA4335]" />
                <span className="truncate">{location}</span>
              </div>
            )}
          </div>
          
          {/* Call to action - now animates on card hover */}
          <div className="mt-4 flex items-center font-semibold text-sm overflow-hidden">
            <span className="bg-gradient-to-r from-[#4285F4] to-[#34A853] bg-clip-text text-transparent group-hover:from-[#EA4335] group-hover:to-[#FBBC04] transition-all duration-300">
              View Details
            </span>
            <span className="ml-1 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 text-[#4285F4]">
              &rarr;
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;