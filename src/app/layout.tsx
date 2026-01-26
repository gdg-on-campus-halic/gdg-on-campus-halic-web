// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";

// Configure Inter font using next/font/google for optimal performance
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    template: '%s | GDG on Campus Haliç',
    default: 'GDG on Campus Haliç',
  },
  description: "Google Developer Groups on Campus Haliç - Building a vibrant tech community through workshops, events, and collaboration.",
  keywords: "GDG, Google Developer Groups, Haliç University, technology, programming, workshops",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  ),
  openGraph: {
    title: "GDG on Campus Haliç",
    description: "Join our vibrant tech community at Haliç University",
    type: "website",
    locale: 'en_US',
    siteName: 'GDG on Campus Haliç',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GDG on Campus Haliç',
    description: 'Join our vibrant tech community at Haliç University',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}