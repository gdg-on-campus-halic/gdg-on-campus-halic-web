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
}

const EventCard: React.FC<EventCardProps> = ({ 
  bannerImage, 
  title, 
  slug, 
  description, 
  date,
  location 
}) => {
  return (
    <Link 
      href={`/${slug}`} 
      className="block max-w-sm w-full transform transition-all duration-300 hover:-translate-y-2 hover:scale-105"
    >
      <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl bg-white border border-gray-100 transition-all duration-300">
        {/* Image container with overlay effect */}
        <div className="relative h-48 w-full overflow-hidden">
          <Image 
            src={bannerImage} 
            alt={title} 
            layout="fill" 
            objectFit="cover" 
            className="w-full h-full transition-transform duration-500 hover:scale-110"
          />
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
          
          {/* Status badge */}
          {date ? (
            <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-700">
              Past Event
            </div>
          ) : (
            <div className="absolute top-4 right-4 px-3 py-1 bg-orange-500 text-white rounded-full text-xs font-semibold animate-pulse">
              Upcoming
            </div>
          )}
        </div>
        
        {/* Content section */}
        <div className="p-5">
          {/* Title with gradient on hover */}
          <h2 className="text-xl font-bold text-gray-900 mb-2 transition-all duration-300 hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 hover:bg-clip-text hover:text-transparent">
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
                <FaCalendarAlt className="text-orange-500" />
                <span>{date}</span>
              </div>
            )}
            {location && (
              <div className="flex items-center space-x-2">
                <FaMapMarkerAlt className="text-orange-500" />
                <span className="truncate">{location}</span>
              </div>
            )}
          </div>
          
          {/* Call to action */}
          <div className="mt-4 flex items-center text-orange-500 font-semibold text-sm group">
            <span className="group-hover:mr-2 transition-all duration-300">View Details</span>
            <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 ml-1">&rarr;</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;