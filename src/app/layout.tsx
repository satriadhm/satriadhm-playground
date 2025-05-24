import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: 'swap',
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
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Glorious Satria - Software Engineer",
    description: "Software Engineer | Backend & Full-Stack Developer",
    creator: "@satriadhm",
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
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300`}
      >
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}