import Divider from "@/components/divider";
import Image from "next/image";
import logo from "@/images/gdglogo.png";
import blueDivider from "@/images/dividers/blue-banner.png";
import greenDivider from "@/images/dividers/green-banner.png";
import TextContainer from "@/components/text-container";
import JoinOurClub from "@/components/join-our-club";
import EventCard from "@/components/event-card";
import { Event } from "@/lib/types"; // Import the Event type from your types file
import { events } from "@/data/events";
import TeamMemberCard from "@/components/team-member-card";
import { teamMembers } from "@/data/team";
import placeholderAvatar from "@/images/team/placeholderAvatar.png";
import Title from "@/components/title";
import { socials, campus } from "@/data/socials";
import { icons } from "@/lib/bg-icons";
import { FaInstagram, FaLinkedin, FaGithub, FaDiscord } from "react-icons/fa";

// Generate unique positions based on a grid
const generateUniquePositions = (count: number) => {
  const positions: { left: number; top: number }[] = [];
  const size = 5; // Grid cell size in vw
  const maxRows = Math.floor(100 / size); // Maximum number of rows
  const maxCols = Math.floor(100 / size); // Maximum number of columns

  while (positions.length < count) {
    const row = Math.floor(Math.random() * maxRows);
    const col = Math.floor(Math.random() * maxCols);
    const leftPosition = col * size; // Calculate left position based on column
    const topPosition = row * size; // Calculate top position based on row

    // Check for collision
    const collision = positions.some(
      (pos) => pos.left === leftPosition && pos.top === topPosition
    );

    if (!collision) {
      positions.push({ left: leftPosition, top: topPosition });
    }
  }

  return positions;
};

export default function Home() {
  const renderIcons = () => {
    const positions = generateUniquePositions(50);
    return positions.map((pos, index) => {
      const Icon = icons[Math.floor(Math.random() * icons.length)];
      const size = Math.random() * 30 + 20; // Random size between 20 and 50px
      const rotation = Math.random() * 90 - 45; // Random rotation between -45 and +45 degrees

      return (
        <Icon
          key={index}
          className="absolute opacity-10 pointer-events-none"
          style={{
            left: `${pos.left}vw`,
            top: `${pos.top}vh`,
            fontSize: `${size}px`,
            transform: `rotate(${rotation}deg)`,
          }}
        />
      );
    });
  };

  const chunkArray = (array: any[], chunkSize: number): any[][] => {
    const result: any[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  const rows: Event[][] = chunkArray(events, 3); // Group events into rows of 3

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none hidden md:block">
        {renderIcons()}
      </div>
      <div className="relative z-10">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 my-20">
          <div className="m-auto w-[80%] md:w-[70%] lg:w-[60%] h-auto my-auto">
            <Image width={350} src={logo} alt="gdg-banner" className="mx-auto" />
            <div className="flex justify-center mt-4 space-x-4">
              <a
                href={socials.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-700 hover:text-blue-800"
              >
                <FaInstagram size={48} />
              </a>
              <a
                href={socials.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-900"
              >
                <FaLinkedin size={48} />
              </a>
              <a
                href={socials.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-gray-600"
              >
                <FaGithub size={48} />
              </a>
              <a
                href={socials.discord.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                <FaDiscord size={48} />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:m-auto lg:m-auto md:grid-cols-2 gap-4 w-full md:w-5/6 mt-10">
            <TextContainer title="Who are we?" variant="red">
              Welcome to Google Developer Groups on Campus {campus}. As part of
              the global Google Developer Groups initiative, we are a vibrant
              and inclusive community of students passionate about technology,
              innovation, and collaboration.
            </TextContainer>

            <TextContainer title="Our Mission" variant="blue">
              At Google Developer Groups on Campus {campus}, our mission is to foster a thriving
              environment where students from all fields-whether they&apos;re
              seasoned developers or complete beginners-can come together to
              learn, build, and grow.
            </TextContainer>

            <TextContainer title="What We Do" variant="green">
              We are committed to empowering students by providing opportunities
              to develop technical skills through hands-on projects, workshops,
              and events led by industry professionals and peers.
            </TextContainer>

            <TextContainer title="Join Us" variant="yellow">
              Join us in our journey to make technology accessible, share
              knowledge, and create impactful solutions to real-world problems,
              all while building lifelong connections within the tech community.
            </TextContainer>
          </div>
        </div>
        <Divider image={blueDivider} altText="Blue Divider" />
        <Title id="events" className="bg-gray-100 text-center">
          Our Events
        </Title>
        <div className="py-8 bg-gray-100">
          {rows.map((row: Event[], rowIndex: number) => (
            <div key={rowIndex} className="flex justify-center">
              <div className="flex flex-wrap space-x-4 justify-center w-full">
                {row.map((event: Event, index: number) => (
                  <EventCard
                    key={index}
                    bannerImage={event.bannerImage}
                    title={event.title}
                    slug={event.slug}
                    description={event.description}
                    date={event.date}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <Divider image={greenDivider} altText="Green Divider" />
        <Title id="team" className="bg-gray-100 text-center">
          Our Team
        </Title>
        <div className="flex flex-wrap justify-center items-start py-8 bg-gray-100">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex-none w-[240px] mx-4 mb-8">
              <TeamMemberCard
                avatar={member.avatar ? member.avatar : placeholderAvatar}
                name={member.name}
                surname={member.surname}
                title={member.title}
                variant={member.variant}
                linkedinUrl={member.linkedinUrl ?? undefined}
                instagramUsername={member.instagramUsername ?? undefined}
              />
            </div>
          ))}
        </div>

        <JoinOurClub />
      </div>
    </div>
  );
}
