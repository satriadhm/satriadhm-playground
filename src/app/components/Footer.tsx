'use client';

import { Github, Linkedin, Mail, ArrowUp, Heart, Code2 } from 'lucide-react';
import Link from 'next/link';
import { personalInfo } from '@/constants/data';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-gray-100">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {personalInfo.name}
              </h3>
              <p className="text-gray-400 leading-relaxed max-w-md">
                Software Engineer passionate about building scalable applications and innovative solutions. 
                Always excited to collaborate on interesting projects and discuss technology.
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 bg-gray-800 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700 transition-all hover:scale-110 duration-300"
                aria-label="GitHub"
              >
                <Github size={20} className="group-hover:animate-pulse" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 bg-gray-800 rounded-lg text-gray-300 hover:text-white hover:bg-blue-600 transition-all hover:scale-110 duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} className="group-hover:animate-pulse" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="group p-3 bg-gray-800 rounded-lg text-gray-300 hover:text-white hover:bg-green-600 transition-all hover:scale-110 duration-300"
                aria-label="Email"
              >
                <Mail size={20} className="group-hover:animate-pulse" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-white">Quick Links</h4>
            <div className="space-y-3">
              {[
                { name: 'Home', href: '/' },
                { name: 'Experience', href: '/experience' },
                { name: 'Projects', href: '/projects' },
                { name: 'Blog & Certifications', href: '/blog' },
                { name: 'Life Journey', href: '/journey' }
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-white">Get In Touch</h4>
            <div className="space-y-4">
              <p className="text-gray-400 text-sm">
                Ready to start a conversation? I&apos;d love to hear from you.
              </p>
              <Link
                href="#contact"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all hover:scale-105 duration-300 shadow-lg hover:shadow-xl"
              >
                <Mail size={18} />
                <span>Contact Me</span>
              </Link>
              
              <div className="pt-4 border-t border-gray-700">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Usually responds within 24 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>© {currentYear} {personalInfo.name}</span>
              <span>•</span>
              <span>Built with</span>
              <Heart size={16} className="text-red-500 animate-pulse mx-1" />
              <span>using</span>
              <div className="flex items-center space-x-1">
                <Code2 size={16} className="text-blue-400" />
                <span>Next.js & TypeScript</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-sm text-gray-400">
                Professional Portfolio
              </div>
              
              <button
                onClick={scrollToTop}
                className="group p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-all hover:scale-110 duration-300"
                aria-label="Scroll to top"
              >
                <ArrowUp size={18} className="group-hover:animate-bounce" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}