// src/components/events-section.tsx
"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import EventCard from "@/components/event-card";
import { Event } from "@/lib/types";
import { FaChevronDown } from "react-icons/fa";

const EventSection = ({ events }: { events: Event[] }) => {
  // Start with 2025-2026 to show upcoming events by default
  const [selectedTerm, setSelectedTerm] = useState<string>("2025-2026");
  
  // Filter events based on selected term
  const filteredEvents = events.filter((event) => event.term === selectedTerm);

  // Helper function to chunk array into rows
  const chunkArray = (array: any[], chunkSize: number): any[][] => {
    const result: any[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  const rows: Event[][] = chunkArray(filteredEvents, 3);

  return (
    <div>
      {/* Term selector dropdown */}
      <div className="flex justify-center py-6">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex w-48 items-center bg-white text-gray-800 px-4 py-3 rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium">
            <span className="mr-2">{selectedTerm}</span>
            <FaChevronDown className="ml-auto text-gray-500" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white shadow-xl rounded-xl w-48 mt-2 border border-gray-100">
            <DropdownMenuItem 
              onClick={() => setSelectedTerm("2025-2026")}
              className="hover:bg-gray-50 transition-colors duration-200 font-medium"
            >
              2025-2026
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => setSelectedTerm("2024-2025")}
              className="hover:bg-gray-50 transition-colors duration-200 font-medium"
            >
              2024-2025
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Events grid with increased vertical spacing */}
      <div className="py-8">
        {filteredEvents.length === 0 ? (
          // Message when no events are available for the selected term
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              Exciting Events Coming Soon!
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              We're working on amazing workshops and events for {selectedTerm}. 
              Stay tuned for updates!
            </p>
          </div>
        ) : (
          // Display events in rows with increased spacing
          <div className="space-y-8">
            {rows.map((row: Event[], rowIndex: number) => (
              <div key={rowIndex} className="flex justify-center">
                <div className="flex flex-wrap gap-6 justify-center w-full max-w-7xl">
                  {row.map((event: Event, index: number) => (
                    <EventCard
                      key={index}
                      bannerImage={event.bannerImage}
                      title={event.title}
                      slug={event.slug}
                      description={event.description}
                      date={event.date}
                      location={event.location}
                      isUpcoming={!event.date} // If no date, it's upcoming
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventSection;