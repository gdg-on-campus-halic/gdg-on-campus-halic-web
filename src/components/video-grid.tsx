"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from 'next/image'

const getYouTubeVideoId = (url: string): string | null => {
  const patterns = [
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&?/]+)/,
    /^([^&?/]+)$/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
};

interface Video {
  url: string;
  title: string;
}

interface VideoGridProps {
  videos: Video[];
}

const VideoGrid: React.FC<VideoGridProps> = ({ videos }) => {
  return (
    <div className="flex flex-wrap justify-center items-start py-4">
      <style jsx global>{`
        @keyframes gradient-rotate {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .border-animation {
          background: linear-gradient(
            90deg,
            #4285f4,
            #db4437,
            #f4b400,
            #0f9d58,
            #4285f4
          );
          background-size: 300% 100%;
          animation: gradient-rotate 3s linear infinite;
        }
      `}</style>

      {videos.map((video, index) => {
        const videoId = getYouTubeVideoId(video.url);
        const thumbnailUrl = videoId
          ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
          : "/api/placeholder/320/180";

        return (
          <div
            key={index}
            className="flex-none w-[300px] md:w-[400px] mx-4 mb-8 relative group "
          >
            <div className="absolute -inset-0.5 rounded-lg blur opacity-30 transition duration-1000 group-hover:opacity-100 border-animation" />
            <Card className="relative bg-white overflow-hidden hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-0">
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="aspect-video relative">
                    <Image
                        src={thumbnailUrl}
                        alt={video.title}
                        width={320}  
                        height={180} 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 transition-opacity" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-sm line-clamp-2">
                      {video.title}
                    </h3>
                  </div>
                </a>
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default VideoGrid;
