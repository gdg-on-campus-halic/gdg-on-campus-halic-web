"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu"; // Updated imports for ShadCN dropdown
import EventCard from "@/components/event-card";
import { Event } from "@/lib/types"; // Import the Event type from your types file
import { FaChevronDown } from "react-icons/fa"; // Import Chevron Down icon from react-icons/fa

const EventSection = ({ events }: { events: Event[] }) => {
  const [selectedTerm, setSelectedTerm] = useState<string>("2024-2025"); // Default to '2024-2025'
  const filteredEvents = events.filter((event) => event.term === selectedTerm);

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
      <div className="flex justify-center py-4 bg-gray-100">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex w-48 items-center bg-white text-gray-800 p-2 rounded-md shadow-sm cursor-pointer hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <span className="mr-2">{selectedTerm}</span>
            <FaChevronDown className="ml-auto" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white shadow-lg rounded-md w-48 mt-2">
            <DropdownMenuItem onClick={() => setSelectedTerm("2024-2025")}>
              2024-2025
            </DropdownMenuItem>
            {/* Future terms can be added here */}
            {/* <DropdownMenuItem onClick={() => setSelectedTerm('2025-2026')}>2025-2026</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="py-8 bg-gray-100">
        <div className="flex justify-center">
          <div className="flex flex-wrap space-x-4 justify-center w-full">
            {rows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="flex w-full justify-center space-x-4"
              >
                {row.map((event: Event, eventIndex: number) => (
                  <EventCard
                    key={eventIndex}
                    bannerImage={event.bannerImage}
                    title={event.title}
                    slug={event.slug}
                    description={event.description}
                    date={event.date}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventSection;
