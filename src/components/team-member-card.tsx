// src/components/team-member-card.tsx
import Image from "next/image";
import React from "react";
import { StaticImageData } from "next/image";
import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import { Variant } from "@/lib/types";

// Updated color variants with Google-inspired colors
const colorVariants = {
  green: {
    bg: "from-green-400 to-green-600",
    text: "text-white",
    border: "border-green-400",
    iconBg: "bg-green-500",
  },
  blue: {
    bg: "from-blue-400 to-blue-600",
    text: "text-white",
    border: "border-blue-400",
    iconBg: "bg-blue-500",
  },
  red: {
    bg: "from-red-400 to-red-600",
    text: "text-white",
    border: "border-red-400",
    iconBg: "bg-red-500",
  },
  yellow: {
    bg: "from-yellow-400 to-orange-500",
    text: "text-white",
    border: "border-yellow-400",
    iconBg: "bg-yellow-500",
  },
};

interface TeamMemberProps {
  avatar: StaticImageData;
  name: string;
  surname: string;
  title: string;
  variant: Variant;
  linkedinUrl?: string;
  instagramUsername?: string;
  githubUsername?: string;
}

const TeamMemberCard: React.FC<TeamMemberProps> = ({
  avatar,
  name,
  surname,
  title,
  variant,
  linkedinUrl,
  instagramUsername,
  githubUsername,
}) => {
  const colors = colorVariants[variant];

  return (
    <div className="group relative w-40 h-52 transform transition-all duration-500 hover:-translate-y-1 hover:scale-105">
      {/* Card container with gradient background - even smaller */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} rounded-lg opacity-90 group-hover:opacity-100 transition-opacity duration-300`} />
      
      {/* Content container */}
      <div className="relative h-full p-3 flex flex-col items-center justify-center text-center">
        {/* Avatar with border effect - bigger photo relative to card */}
        <div className="relative mb-2 transform transition-transform duration-500 group-hover:scale-110">
          <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-white/30 shadow-lg">
            <Image
              src={avatar}
              alt={`${name} ${surname}`}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          {/* Glow effect on hover */}
          <div className="absolute inset-0 rounded-full bg-white/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        
        {/* Name and title - compact text */}
        <div className="mb-2">
          <h3 className={`text-sm font-bold ${colors.text} leading-tight transition-all duration-300`}>
            {name} {surname}
          </h3>
          <p className={`text-xs ${colors.text} opacity-90 mt-0.5`}>
            {title}
          </p>
        </div>
        
        {/* Social media buttons with glass effect - compact */}
        <div className="flex justify-center space-x-1 mt-auto">
          {linkedinUrl && (
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-6 h-6 bg-white/20 backdrop-blur-sm flex justify-center items-center rounded hover:bg-white/30 transition-all duration-300 transform hover:scale-110"
              aria-label={`${name} ${surname} LinkedIn`}
            >
              <FaLinkedin className="text-white text-xs" />
            </a>
          )}
          
          {instagramUsername && (
            <a
              href={`https://instagram.com/${instagramUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-6 h-6 bg-white/20 backdrop-blur-sm flex justify-center items-center rounded hover:bg-white/30 transition-all duration-300 transform hover:scale-110"
              aria-label={`${name} ${surname} Instagram`}
            >
              <FaInstagram className="text-white text-xs" />
            </a>
          )}
          
          {githubUsername && (
            <a
              href={`https://github.com/${githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-6 h-6 bg-white/20 backdrop-blur-sm flex justify-center items-center rounded hover:bg-white/30 transition-all duration-300 transform hover:scale-110"
              aria-label={`${name} ${surname} GitHub`}
            >
              <FaGithub className="text-white text-xs" />
            </a>
          )}
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -top-1 -right-1 w-4 h-4 bg-white/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-white/10 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};

export default TeamMemberCard;