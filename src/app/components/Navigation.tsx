'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, Moon, Sun } from 'lucide-react';

const navigationItems = [
  { name: 'Home', href: '/' },
  { name: 'Experience', href: '/experience' },
  { name: 'Blog & Certifications', href: '/blog' },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' }
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleTheme = () => {
    const newIsDarkMode = !isDarkMode;
    setIsDarkMode(newIsDarkMode);
    
    if (newIsDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const isActiveRoute = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    if (href.startsWith('#')) {
      // Handle anchor links
      return false;
    }
    return pathname.startsWith(href);
  };

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    
    // Handle anchor links
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo - Mobile Responsive with Journey Link on Hover */}
            <div className="flex-shrink-0 relative group">
              <Link 
                href="/" 
                className="font-bold text-lg sm:text-xl text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Satria.
              </Link>
              
              {/* Journey Link - Appears on Hover */}
              <div className="absolute top-full left-0 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto z-50">
                <Link 
                  href="/journey"
                  className="block bg-amber-900/95 backdrop-blur-sm text-amber-100 px-3 py-2 rounded-lg text-xs font-medium shadow-2xl border border-amber-700/50 whitespace-nowrap hover:bg-amber-800/95 transition-all"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-400">🧙‍♂️</span>
                    <span>My Journey</span>
                  </div>
                  {/* Tooltip arrow */}
                  <div className="absolute bottom-full left-6 -mb-1 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-amber-900/95"></div>
                </Link>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-6 lg:space-x-8">
                {navigationItems.map((item) => {
                  if (item.href.startsWith('#')) {
                    return (
                      <button
                        key={item.name}
                        onClick={() => handleNavClick(item.href)}
                        className="transition-colors duration-200 font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm lg:text-base"
                      >
                        {item.name}
                      </button>
                    );
                  }
                  
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`transition-colors duration-200 font-medium text-sm lg:text-base ${
                        isActiveRoute(item.href)
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Theme Toggle and Mobile Menu Button - Mobile Responsive */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Toggle menu"
                  aria-expanded={isOpen}
                >
                  {isOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay - Full Screen */}
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Mobile Navigation Panel */}
          <div className="fixed top-16 left-0 right-0 bottom-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 overflow-y-auto">
            <div className="p-4 sm:p-6">
              {/* Navigation Items */}
              <div className="space-y-1">
                {navigationItems.map((item) => {
                  if (item.href.startsWith('#')) {
                    return (
                      <button
                        key={item.name}
                        onClick={() => handleNavClick(item.href)}
                        className="w-full text-left px-4 py-4 rounded-xl text-lg font-medium transition-all duration-200 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 active:scale-95"
                      >
                        {item.name}
                      </button>
                    );
                  }
                  
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`block px-4 py-4 rounded-xl text-lg font-medium transition-all duration-200 active:scale-95 ${
                        isActiveRoute(item.href)
                          ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                          : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  );
                })}
                
                {/* Journey Link in Mobile Menu */}
                <Link
                  href="/journey"
                  className="block px-4 py-4 rounded-xl text-lg font-medium transition-all duration-200 active:scale-95 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-amber-500">🧙‍♂️</span>
                    <span>My Journey</span>
                  </div>
                </Link>
              </div>

              {/* Mobile Footer Info */}
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
                <div className="text-center space-y-4">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Software Engineer & Full-Stack Developer
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}