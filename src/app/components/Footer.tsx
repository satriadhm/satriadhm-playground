// src/app/components/Footer.tsx (Updated)
'use client';

import { Github, Linkedin, Mail, ArrowUp, Heart, Code2 } from 'lucide-react';
import Link from 'next/link';
import { personalInfo } from '@/constants/data';
import FooterVisitorCounter from './VisitorCounter';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      {/* Main Footer Content - Mobile Responsive */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
          
          {/* Brand Section - Mobile Responsive */}
          <div className="space-y-4 sm:space-y-6 text-center sm:text-left">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2 sm:mb-3">
                {personalInfo.name}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                Software Engineer passionate about building scalable applications and innovative solutions.
              </p>
            </div>
            
            {/* Social Links - Mobile Responsive */}
            <div className="flex justify-center sm:justify-start space-x-3">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all duration-200"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="p-2.5 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all duration-200"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links - Mobile Responsive */}
          <div className="space-y-4 text-center sm:text-left">
            <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Quick Links</h4>
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-2">
              {[
                { name: 'Home', href: '/' },
                { name: 'Experience', href: '/experience' },
                { name: 'Projects', href: '/projects' },
                { name: 'Blog', href: '/blog' },
                { name: 'Contact', href: '/contact' }
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors duration-200 text-sm py-1"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info - Mobile Responsive */}
          <div className="space-y-4 text-center sm:text-left lg:col-span-1 sm:col-span-2 lg:col-span-1">
            <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Get In Touch</h4>
            <div className="space-y-3">
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Ready to collaborate on something amazing?
              </div>
              <a
                href={`mailto:${personalInfo.email}`}
                className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors text-sm font-medium"
              >
                <Mail size={16} />
                <span>Send me a message</span>
              </a>
              
              <div className="pt-2 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center justify-center sm:justify-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Usually responds within 24 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Visitor Counter Section - Mobile Responsive */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="text-center sm:text-left">
              <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Portfolio Analytics
              </h4>
              <FooterVisitorCounter />
            </div>
            
            <div className="text-center sm:text-right">
              <div className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                Thank you for visiting!
              </div>
              <div className="text-xs text-slate-400 dark:text-slate-500">
                Data refreshes automatically
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Mobile Responsive */}
      <div className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            
            {/* Copyright - Mobile Responsive */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 text-slate-500 dark:text-slate-400 text-sm text-center sm:text-left">
              <div className="flex items-center space-x-2">
                <span>© {currentYear} {personalInfo.name}</span>
                <span className="hidden sm:inline">•</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>Made with</span>
                <Heart size={14} className="text-red-500 mx-1" />
                <span>using</span>
                <div className="flex items-center space-x-1">
                  <Code2 size={14} className="text-blue-500" />
                  <span>Next.js</span>
                </div>
              </div>
            </div>
            
            {/* Right Side - Mobile Responsive */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Professional Portfolio
              </span>
              
              <button
                onClick={scrollToTop}
                className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-all duration-200 group"
                aria-label="Scroll to top"
              >
                <ArrowUp size={16} className="group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}