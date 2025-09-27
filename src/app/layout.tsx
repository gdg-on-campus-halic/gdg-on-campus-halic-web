// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GDG on Campus Haliç",
  description: "Google Developer Groups on Campus Haliç - Building a vibrant tech community through workshops, events, and collaboration.",
  keywords: "GDG, Google Developer Groups, Haliç University, technology, programming, workshops",
  openGraph: {
    title: "GDG on Campus Haliç",
    description: "Join our vibrant tech community at Haliç University",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Adding Inter font from Google Fonts for a clean, modern look */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="font-inter antialiased">
        {children}
      </body>
    </html>
  );
}