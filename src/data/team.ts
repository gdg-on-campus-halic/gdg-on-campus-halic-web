import { TeamMember } from '@/lib/types';
import furkanunsalan from '@/images/team/furkanunsalan.png'; // Replace with actual paths
import eliforsun from '@/images/team/eliforsun.jpeg';
import gamzesefer from '@/images/team/gamzesefer.jpg';
import gizemorhan from '@/images/team/gizemorhan.jpg';
import mertparlak from '@/images/team/mertparlak.png';
import mustafaeftekin from '@/images/team/mustafaeftekin.jpeg';
import osmangurel from '@/images/team/osmangurel.jpg';
import pelinuyanik from '@/images/team/pelinuyanik.jpeg';
import serhanergul from '@/images/team/serhanergul.jpg';
import gorkem from "@/images/team/Görkem Karyol.jpeg"
import olivia from "@/images/team/Olivia Üzümcü.jpeg"
import abdullah from "@/images/team/abdullah-eraslan.jpeg"
import burcu from "@/images/team/burcu-aydin.jpeg"
import elifk from "@/images/team/elif-karamehmet.jpeg"
import elifb from "@/images/team/elif-o-bektas.jpeg"
import hacer from "@/images/team/hacer-guney.jpeg"
import irmak from "@/images/team/irmak-celik.jpeg"
import melike from "@/images/team/melike-tekirdag.jpeg"
import ömer from "@/images/team/ömer-savci.jpeg"
import yahya from "@/images/team/yahya-sebti.jpeg"

export const teamMembers: TeamMember[] = [
    {
        avatar: serhanergul, // Added avatar
        name: "Serhan",
        surname: 'Ergül',
        title: 'Organiser',
        variant: 'red'
    },
    {
        avatar: furkanunsalan,
        name: 'Furkan',
        surname: 'Ünsalan',
        title: 'Vice President',
        variant: 'red',
        linkedinUrl: 'https://www.linkedin.com/in/furkanunsalan/',
        instagramUsername: "furkanunsalan"
    },
    // Organization Team (Green Variant)
    {
        avatar: pelinuyanik,
        name: "Pelin",
        surname: "Uyanık",
        title: "Organization Team Lead",
        variant: "green",
    },
    {
        avatar: mertparlak,
        name: 'Mert',
        surname: 'Parlak',
        title: 'Organization Team',
        variant: 'green'
    },
    {
        avatar: gamzesefer,
        name: "Gamze",
        surname: "Sefer",
        title: "Organization Team",
        variant: "green",
    },
    {
        avatar: gizemorhan,
        name: "Gizem Selin",
        surname: "Orhan",
        title: "Organization Team",
        variant: "green",
    },
    
    {
        avatar: yahya,
        name: "Yahya",
        surname: "Sebti",
        title: "Organization Team",
        variant: "green",
    },
    {
        avatar: ömer,
        name: "Ömer",
        surname: "Faruk",
        title: "Organization Team",
        variant: "green",
    },
    {
        avatar: elifb,
        name: "Elif Özge",
        surname: "Bektaş",
        title: "Organization Team",
        variant: "green",
    },
    {
        avatar: elifk,
        name: "Elif",
        surname: "Karamehmet",
        title: "Organization Team",
        variant: "green",
    },
    {
        avatar: abdullah,
        name: "Abdullah Eraslan",
        surname: "Bektaş",
        title: "Organization Team",
        variant: "green",
    },
    {
        avatar: hacer,
        name: "Hacer Güney",
        surname: "Bektaş",
        title: "Organization Team",
        variant: "green",
    },

    // Project Team (Blue Variant)
    {
        avatar: mustafaeftekin,
        name: "Mustafa",
        surname: "Eftekin",
        title: "Project Team Lead",
        variant: "blue",
    },
    {
        avatar: osmangurel,
        name: "Osman Şener",
        surname: "Gürel",
        title: "Project Team",
        variant: "blue",
    },
    {
        avatar: gorkem,
        name: "Görkem",
        surname: "Karyol",
        title: "Project Team",
        variant: "blue",
    },
    {
        avatar: eliforsun,
        name: "Elif Nas",
        surname: "Örsün",
        title: "Organization Team",
        variant: "blue",
    },
  
    // Social Media and Design Team (Yellow Variant)
    {
        avatar: irmak,
        name: "Irmak",
        surname: "Çelik",
        title: "Social Media Manager",
        variant: "yellow",
    },
    {
        avatar: melike,
        name: "Melike",
        surname: "Tekirdağ",
        title: "Social Media and Design Team",
        variant: "yellow",
    },
    {
        avatar: burcu,
        name: "Burcu",
        surname: "Aydın",
        title: "Social Media and Design Team",
        variant: "yellow",
    },
    {
        name: "Beyzanur",
        surname: "Elçi",
        title: "Social Media and Design Team",
        variant: "yellow",
    },
    {
        avatar: olivia,
        name: "Olivia",
        surname: "Üzümcü",
        title: "Social Media and Design Team",
        variant: "yellow",
    },
];
