// src/components/event-card.tsx
import Image, { StaticImageData } from 'next/image';
import React from 'react';
import Link from 'next/link';
import { FaCalendarAlt, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';

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
      className="block max-w-sm w-full active:scale-95 transition-transform duration-150"
    >
      <div className="rounded-xl overflow-hidden bg-white border border-gray-100 shadow-md transition-shadow duration-300 active:shadow-sm">
        
        {/* Image container - no hover effects */}
        <div className="relative h-48 w-full overflow-hidden bg-gray-100">
          <Image 
            src={bannerImage} 
            alt={title} 
            layout="fill" 
            objectFit="cover" 
            className="w-full h-full"
          />
          
          {/* Simple status badge - top right corner */}
          {isUpcoming ? (
            <div className="absolute top-3 right-3 px-3 py-1 bg-[#34A853] text-white rounded-full text-xs font-semibold shadow-md">
              Upcoming
            </div>
          ) : date ? (
            <div className="absolute top-3 right-3 px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-700 shadow-md">
              Past Event
            </div>
          ) : null}
        </div>
        
        {/* Content section - clean and organized */}
        <div className="p-5">
          {/* Title - no hover effect */}
          <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
            {title}
          </h2>
          
          {/* Description - clean and readable */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
            {description}
          </p>
          
          {/* Event details - organized with icons */}
          {(date || location) && (
            <div className="space-y-2 mb-4 pb-4 border-b border-gray-100">
              {date && (
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <FaCalendarAlt className="text-[#4285F4] flex-shrink-0" size={12} />
                  <span>{date}</span>
                </div>
              )}
              {location && (
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <FaMapMarkerAlt className="text-[#EA4335] flex-shrink-0" size={12} />
                  <span className="truncate">{location}</span>
                </div>
              )}
            </div>
          )}
          
          {/* Call to action - simple and clean, no hover effects */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-[#4285F4]">
              View Details
            </span>
            <FaArrowRight className="text-[#4285F4]" size={14} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;