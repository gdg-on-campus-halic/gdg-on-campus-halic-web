import blueDivider from "@/images/dividers/blue-banner.png";
import greenDivider from "@/images/dividers/green-banner.png";
import placeholderAvatar from "@/images/team/placeholderAvatar.png";
import Title from "@/components/title";
import { events } from "@/data/events";
import { videos } from "@/data/video";
import { teamMembers } from "@/data/team";
import renderIcons from "@/lib/render-icons";
import Introduction from "@/components/introduction";
import EventSection from "@/components/events-section";
import VideoGrid from "@/components/video-grid";
import TeamMemberCard from "@/components/team-member-card";
import JoinOurClub from "@/components/join-our-club";
import Divider from "@/components/divider";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none hidden md:block opacity-10">
        {renderIcons()}
      </div>
      <div className="relative z-10">
        <Introduction/>

        <Divider image={greenDivider} altText="Blue Divider" />
        <Title id="events" className="bg-gray-100 text-center">
          Our Events
        </Title>
        <EventSection events={events} />
        
        <Divider image={blueDivider} altText="Blue Divider" />
        <Title id="events" className="text-center">
          Videos
        </Title>
        <div className="container mx-auto">
          <VideoGrid videos={videos} />
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
                githubUsername={member.githubUsername ?? undefined}
              />
            </div>
          ))}
        </div>

        <JoinOurClub />
      </div>
    </div>
  );
}
