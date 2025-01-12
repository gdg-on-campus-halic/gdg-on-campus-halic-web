// data/events.ts
import { Event } from '@/lib/types';

// Function to dynamically import images based on event number
const importImages = (eventNumber: number) => {
  const images = [];
  const extensions = ['.png', '.jpg', '.jpeg', '.JPG', '.heic']; // Desteklenen uzantılar

  for (let i = 1; i <= 6; i++) {
    let imageLoaded = false; 

    for (const ext of extensions) {
      if (imageLoaded) break;

      try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const image = require(`@/images/events/event-${eventNumber}/${i}${ext}`);
        images.push(image);
        imageLoaded = true;
      } catch (error) {
        // Hata durumunda hiçbir işlem yapma, diğer uzantıyı dene
      }
    }

    if (!imageLoaded) {
      console.error(`Error loading image for event-${eventNumber}, image ${i}: No valid extensions found.`);
    }
  }

  return images;
};


// Define events with dynamic image imports
export const events: Event[] = [
  {
    bannerImage: importImages(8)[0], 
    images: importImages(8),
    title: 'AI Conference',
    slug: "ai-conference",
    description: "",
    text: "",
    date: 'December 4, 2024',
    term: "2024-2025",
    location: "Haliç University, Middle Garden"
  },
  {
    bannerImage: importImages(7)[5], 
    images: importImages(7),
    title: 'Github 101',
    slug: "github-101",
    description: "",
    text: "",
    date: 'November 29, 2024',
    term: "2024-2025",
    location: "Haliç University, Event Hall"
  },
  {
    bannerImage: importImages(6)[0], 
    images: importImages(6),
    title: 'Coffee Talks-1',
    slug: "coffee-talks-1",
    description: "",
    text: "",
    date: 'November 27, 2024',
    term: "2024-2025",
    location: "Haliç University, Terrace Cafe"
  },
  {
    bannerImage: importImages(5)[0], 
    images: importImages(5),
    title: 'Python Crash Course',
    slug: "python-crash-course",
    description: "",
    text: "",
    date: 'October 30, 2024',
    term: "2024-2025",
    location: "Haliç University, Event Hall"
  },
  {
    bannerImage: importImages(4)[0], 
    images: importImages(4),
    title: 'Project 101',
    slug: "project-101",
    description: "",
    text: "",
    date: 'October 14, 2024',
    term: "2024-2025",
    location: "Haliç University, Event Hall"
  },
  {
    bannerImage: importImages(3)[0], 
    images: importImages(3),
    title: 'Welcome Fest',
    slug: "welcome-fest",
    description: "",
    text: "",
    date: 'October 11, 2024',
    term: "2024-2025",
    location: "Haliç University, Middle Garden"
  },
  {
    bannerImage: importImages(2)[1], 
    images: importImages(2),
    title: 'Info Session',
    slug: "info-session",
    description: "Our members, both new and returning, gathered to discuss Google technologies, share exciting future projects, play fun games, and enjoy a memorable start to the new semester!",
    text: "At this introductory event, new and existing members came together to explore the world of Google technologies through inspiring conversations. The session included insightful discussions on cutting-edge innovations, practical applications, and future trends in the tech world. In addition to the tech talk, we engaged in interactive games and icebreakers, fostering a lively and welcoming atmosphere. It was a great opportunity for attendees to connect, share ideas, and learn more about the GDG on Campus community and its mission. We also gave participants an exclusive sneak peek into our upcoming projects and events for the semester. Whether it's hackathons, workshops, or collaborative coding sessions, there's a lot to look forward to this year! 🎯Overall, it was an evening filled with knowledge, fun, and a strong sense of community. We are excited for the journey ahead and look forward to growing together as a team. Stay tuned for more amazing events and opportunities to dive deeper into Google technologies! 🌟",
    date: 'September 27, 2024',
    term: "2024-2025",
    location: "Haliç University, Café Street"
  },
  {
    bannerImage: importImages(1)[0], 
    images: importImages(1),
    title: 'Orientation Days',
    slug: "orientation-days",
    description: "The promotional and orientation days are events where we set up stands in the school's café street to meet new students and invite them to join our school life and clubs.",
    text: "Promotional and orientation days are significant events held in our school's café street, where each club has its own stand. During these days, we aim to connect with new students and introduce them to school life and the opportunities our clubs offer. At each club's stand, we engage in one-on-one interactions with new students, answering their questions and providing information about clubs that match their interests. This way, students find an environment where they can express themselves more freely within our school. We also aim to gather new members at our stand and foster connections with others. Promotional and orientation days play a crucial role in strengthening school spirit and helping new students expand their social networks. By providing an enjoyable experience for both new and current students, we help them ease into school life. Through these events, we aim to build a stronger school community and create a dynamic atmosphere that everyone can participate in.",
    date: 'September 16, 2024',
    term: "2024-2025",
    location: "Haliç University, Café Street"
  }
];
