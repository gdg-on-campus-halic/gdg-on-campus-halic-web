// components/TeamMemberCard.tsx
import Image from "next/image";
import React from "react";
import { StaticImageData } from "next/image"; // This is still needed to handle image type
import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa"; // Ensure this import is correct
import { Variant } from "@/lib/types"; // Importing types from the correct location

// Define color classes based on the variant
const colorVariants = {
  green: {
    bg: "bg-green-100",
    text: "text-green-700",
    border: "border-green-400",
  },
  blue: {
    bg: "bg-blue-100",
    text: "text-blue-700",
    border: "border-blue-400",
  },
  red: {
    bg: "bg-red-100",
    text: "text-red-700",
    border: "border-red-400",
  },
  yellow: {
    bg: "bg-yellow-100",
    text: "text-yellow-700",
    border: "border-yellow-400",
  },
};

interface TeamMemberProps {
  avatar: StaticImageData;
  name: string;
  surname: string;
  title: string;
  variant: Variant; // Use Variant from the types
  linkedinUrl?: string; // Add optional LinkedIn URL prop
  instagramUsername?: string; // Add optional Instagram URL prop
  githubUsername?: string; // Ensure this prop is correctly passed
}

const TeamMemberCard: React.FC<TeamMemberProps> = ({
  avatar,
  name,
  surname,
  title,
  variant,
  linkedinUrl,
  instagramUsername,
  githubUsername, // Ensure this prop is correctly passed
}) => {
  const colors = colorVariants[variant]; // Get the color styles based on the variant

  return (
    <div
      className={`w-64 h-72 rounded-lg shadow-lg p-6 text-center border ${colors.border} ${colors.bg}`}
    >
      {/* Avatar */}
      <div className="relative w-24 h-24 mx-auto mb-4">
        <Image
          src={avatar}
          alt={`${name} ${surname}`}
          layout="fill"
          objectFit="cover"
          className="rounded-full"
        />
      </div>
      {/* Name & Surname */}
      <h2 className={`text-xl font-semibold ${colors.text}`}>
        {name} {surname}
      </h2>
      {/* Title */}
      <p className={`text-sm mt-2 ${colors.text}`}>{title}</p>

      {/* Social Media Buttons */}
      <div className="flex justify-center space-x-2 mt-4">
        {/* LinkedIn Button */}
        {linkedinUrl && (
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-blue-600 flex justify-center items-center rounded hover:bg-blue-700 transition-colors"
          >
            <FaLinkedin className="text-white" />
          </a>
        )}

        {/* Instagram Button */}
        {instagramUsername && (
          <a
            href={`https://instagram.com/${instagramUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 flex justify-center items-center rounded hover:opacity-90 transition-opacity"
          >
            <FaInstagram className="text-white" />
          </a>
        )}

        {/* Github Button */}
        {githubUsername && (
          <a
            href={`https://github.com/${githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-gray-800 flex justify-center items-center rounded hover:bg-gray-900 transition-colors"
          >
            <FaGithub className="text-white" />
          </a>
        )}
      </div>
    </div>
  );
};

export default TeamMemberCard;
