import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Glorious Satria - Software Engineer",
  description: "Software Engineer | Backend & Full-Stack Developer specializing in microservices, AI integration, and modern web architectures.",
  keywords: "software engineer, full-stack developer, backend developer, microservices, React, Node.js, Go, Java",
  authors: [{ name: "Glorious Satria" }],
  creator: "Glorious Satria",
  openGraph: {
    title: "Glorious Satria - Software Engineer",
    description: "Software Engineer | Backend & Full-Stack Developer",
    url: "https://satriadhm.vercel.app",
    siteName: "Glorious Satria Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Glorious Satria - Software Engineer",
    description: "Software Engineer | Backend & Full-Stack Developer",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300`}
      >
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}