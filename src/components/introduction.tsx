import Image from "next/image";
import logo from "@/images/gdglogo.png";
import TextContainer from "@/components/text-container";
import { socials, campus } from "@/data/socials";
import { FaInstagram, FaLinkedin, FaGithub, FaDiscord } from "react-icons/fa";

export default function Introduction() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 my-20">
      <div className="m-auto w-[80%] md:w-[70%] lg:w-[60%] h-auto my-auto mt-12">
        <Image width={350} src={logo} alt="gdg-banner" className="mx-auto" />
        <div className="flex justify-center mt-4 space-x-4">
          <a
            href={socials.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-700 hover:text-orange-600"
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
          Welcome to Google Developer Groups on Campus {campus}. As part of the
          global Google Developer Groups initiative, we are a vibrant and
          inclusive community of students passionate about technology,
          innovation, and collaboration.
        </TextContainer>

        <TextContainer title="Our Mission" variant="blue">
          At Google Developer Groups on Campus {campus}, our mission is to
          foster a thriving environment where students from all fields-whether
          they&apos;re seasoned developers or complete beginners-can come
          together to learn, build, and grow.
        </TextContainer>

        <TextContainer title="What We Do" variant="green">
          We are committed to empowering students by providing opportunities to
          develop technical skills through hands-on projects, workshops, and
          events led by industry professionals and peers.
        </TextContainer>

        <TextContainer title="Join Us" variant="yellow">
          Join us in our journey to make technology accessible, share knowledge,
          and create impactful solutions to real-world problems, all while
          building lifelong connections within the tech community.
        </TextContainer>
      </div>
    </div>
  );
}
