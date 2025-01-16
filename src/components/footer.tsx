import { campus, socials } from "@/data/socials";
import { FaInstagram, FaLinkedin, FaGithub, FaDiscord } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 w-2/3">
          <h3 className="text-lg font-bold text-center md:text-left mb-2">
            About Us
          </h3>
          <p className="text-sm text-justify">
            We are Google Developer Groups on Campus {campus}, a vibrant
            community driven by technology, innovation, and collaboration. Our
            goal is to empower students through knowledge sharing and hands-on
            experiences in tech. Join us in building a better future together!
            Feel free to contribute to our project on{" "}
            <a
              href="https://github.com/gdg-on-campus-halic/gdg-on-campus-halic-web"
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            .
          </p>
        </div>

        <div className="mb-4 md:mb-0">
          <h3 className="text-lg font-bold text-center xl:text-left mb-2">
            Quick Links
          </h3>
          <ul className="text-center xl:text-left text-sm space-y-1">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/#events" className="hover:underline">
                Events
              </a>
            </li>
            <li>
              <a href="/#team" className="hover:underline">
                Our Team
              </a>
            </li>
          </ul>
        </div>

        <div className="mb-4 md:mb-0">
          <h3 className="text-lg font-bold text-center">Follow Us</h3>
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
              className="text-white hover:text-gray-600"
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
      </div>
      <div className="text-center mt-4 border-t border-gray-700 pt-4">
        <p className="text-sm">
          Made by{" "}
          <a href="https://furkanunsalan.dev" className="underline">
            Furkan Ünsalan
          </a>{" "}
          &copy; {new Date().getFullYear()} GDG on Campus {campus}. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
