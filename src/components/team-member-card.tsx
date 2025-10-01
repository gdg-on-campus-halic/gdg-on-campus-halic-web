// src/components/team-member-card.tsx
import Image from "next/image";
import React from "react";
import { StaticImageData } from "next/image";
import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import { Variant } from "@/lib/types";

// Solid Google color variants for team roles
const colorVariants = {
  green: {
    bg: "bg-[#34A853]",
    text: "text-white",
    border: "border-[#34A853]",
  },
  blue: {
    bg: "bg-[#4285F4]",
    text: "text-white",
    border: "border-[#4285F4]",
  },
  red: {
    bg: "bg-[#EA4335]",
    text: "text-white",
    border: "border-[#EA4335]",
  },
  yellow: {
    bg: "bg-[#FBBC04]",
    text: "text-white",
    border: "border-[#FBBC04]",
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
    <div className="relative w-44 h-56">
      {/* Card container with solid background color - no hover effects */}
      <div className={`absolute inset-0 ${colors.bg} rounded-lg shadow-md`} />
      
      {/* Content container */}
      <div className="relative h-full p-3 flex flex-col items-center justify-center text-center">
        {/* Bigger rounded avatar - no animations */}
        <div className="mb-3">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/40 shadow-lg">
            <Image
              src={avatar}
              alt={`${name} ${surname}`}
              width={96}
              height={96}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        
        {/* Name and title */}
        <div className="mb-3">
          <h3 className={`text-sm font-bold ${colors.text} leading-tight`}>
            {name} {surname}
          </h3>
          <p className={`text-xs ${colors.text} opacity-90 mt-0.5`}>
            {title}
          </p>
        </div>
        
        {/* Social media buttons - static, no hover animations */}
        <div className="flex justify-center space-x-1.5 mt-auto">
          {linkedinUrl && (
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 bg-white/20 backdrop-blur-sm flex justify-center items-center rounded hover:bg-white/30"
              aria-label={`${name} ${surname} LinkedIn`}
            >
              <FaLinkedin className="text-white text-sm" />
            </a>
          )}
          
          {instagramUsername && (
            <a
              href={`https://instagram.com/${instagramUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 bg-white/20 backdrop-blur-sm flex justify-center items-center rounded hover:bg-white/30"
              aria-label={`${name} ${surname} Instagram`}
            >
              <FaInstagram className="text-white text-sm" />
            </a>
          )}
          
          {githubUsername && (
            <a
              href={`https://github.com/${githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 bg-white/20 backdrop-blur-sm flex justify-center items-center rounded hover:bg-white/30"
              aria-label={`${name} ${surname} GitHub`}
            >
              <FaGithub className="text-white text-sm" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;