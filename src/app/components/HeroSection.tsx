'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Download, MapPin, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { personalInfo, techStack } from '@/constants/data';
import SkillsRadarChart from './SkillRadarChart';
import TechStackSlider from './TechStackSlider';
import { roles } from '@/constants/data';

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [currentRole, setCurrentRole] = useState(0);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const role = roles[currentRole];
    let index = 0;
    let isDeleting = false;
    
    const typeInterval = setInterval(() => {
      if (!isDeleting) {
        setTypedText(role.substring(0, index + 1));
        index++;
        if (index === role.length) {
          setTimeout(() => {
            isDeleting = true;
          }, 2000);
        }
      } else {
        setTypedText(role.substring(0, index));
        index--;
        if (index === 0) {
          isDeleting = false;
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearInterval(typeInterval);
  }, [currentRole]);

  const scrollToSkills = () => {
    const skillsSection = document.getElementById('skills-section');
    skillsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-gray-950 dark:to-blue-950 relative overflow-x-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(59, 130, 246) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}></div>
      </div>

      {/* Status Badge - Responsive positioning */}
      <div className="absolute top-20 right-4 sm:right-8 z-20">
        <div className={`inline-flex items-center space-x-2 sm:space-x-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50 px-3 sm:px-6 py-2 sm:py-3 rounded-full backdrop-blur-sm text-xs sm:text-sm ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-blue-700 dark:text-blue-300 font-medium">Available for opportunities</span>
        </div>
      </div>

      {/* Hero Section - Mobile optimized */}
      <section className="min-h-screen flex items-center justify-center relative z-10 px-4 sm:px-6 lg:px-12 pt-16">
        <div className="max-w-4xl mx-auto w-full">
          <div className="text-center space-y-4 sm:space-y-6">

            {/* Main Content */}
            <div className={`space-y-4 sm:space-y-6 ${isVisible ? 'animate-fade-in delay-200' : 'opacity-0'}`}>
              {/* Main Heading - Mobile optimized */}
              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
                  <span className="block mb-1 sm:mb-2">Hi, I&apos;m</span>
                  <span className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
                    {personalInfo.name}
                  </span>
                </h1>
                
                {/* Typing animation - Mobile responsive */}
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-slate-600 dark:text-slate-400 h-12 sm:h-16 flex items-center justify-center px-4">
                  <span className="mr-2">A</span>
                  <div className="text-slate-900 dark:text-slate-100 font-medium text-center flex items-center justify-center flex-wrap">
                    <span className="min-w-0 break-words">{typedText}</span>
                    <span className="w-0.5 h-6 sm:h-8 bg-blue-500 dark:bg-blue-400 ml-1 animate-pulse flex-shrink-0"></span>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-2 sm:space-x-3 text-slate-500 dark:text-slate-400 text-sm sm:text-base">
                  <MapPin size={16} className="text-blue-500 flex-shrink-0" />
                  <span>{personalInfo.location}</span>
                </div>
              </div>

              {/* Bio - Mobile optimized */}
              <div className="max-w-2xl mx-auto px-2 sm:px-4">
                <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                  {personalInfo.bio}
                </p>
              </div>

              {/* Action Buttons - Mobile stack */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-2 px-4 sm:px-0">
                <Link
                  href="/experience"
                  className="group bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto justify-center"
                >
                  <span>Explore my Experience</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <a
                  href="/resume.pdf"
                  download
                  className="group border-2 border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-700 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/30 px-6 sm:px-8 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto justify-center"
                >
                  <Download size={16} className="group-hover:translate-y-0.5 transition-transform" />
                  <span>Download Resume</span>
                </a>
              </div>

              {/* Stats - Mobile optimized grid */}
              <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-4 max-w-sm sm:max-w-md mx-auto px-4">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">2+</div>
                  <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">7+</div>
                  <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Achievements</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">12+</div>
                  <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Technologies</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Mobile responsive */}
        <div className="absolute bottom-8 left-4 sm:left-8 hidden sm:flex items-center space-x-3">
          <button
            onClick={scrollToSkills}
            className="group flex items-center space-x-3 text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50"
            aria-label="Scroll to skills section"
          >
            <div className="flex flex-col items-center space-y-0.5">
              <ChevronDown 
                size={20} 
                className="animate-bounce group-hover:animate-pulse" 
              />
              <ChevronDown 
                size={16} 
                className="animate-bounce group-hover:animate-pulse opacity-60" 
                style={{ animationDelay: '0.1s' }}
              />
            </div>
            <span className="text-slate-500 dark:text-slate-400 text-sm font-medium group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
              Scroll to explore
            </span>
          </button>
        </div>

        {/* Easter Egg Button - Mobile Responsive */}
        <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8">
          <Link
            href="/journey"
            className="group relative transition-all duration-500 transform hover:scale-110 active:scale-95"
            title="My Unexpected Journey"
          >
            <div className="relative">
              {/* Hobbit Door - Mobile Responsive */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-br from-green-800 to-green-900 rounded-full relative shadow-lg border-2 sm:border-4 border-amber-600 group-hover:shadow-2xl transition-all duration-300 opacity-60 sm:opacity-70 group-hover:opacity-100">
                {/* Door handle - Mobile Responsive */}
                <div className="absolute right-1 sm:right-1.5 md:right-2 top-1/2 transform -translate-y-1/2 w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-amber-400 rounded-full shadow-inner"></div>
                {/* Door lines - Mobile Responsive */}
                <div className="absolute inset-1.5 sm:inset-2 border border-amber-700/30 rounded-full"></div>
                <div className="absolute inset-2 sm:inset-3 border border-amber-700/20 rounded-full"></div>
                
                {/* Always visible subtle glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent rounded-full"></div>
                {/* Enhanced glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/30 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              {/* Breathing animation ring - Mobile Responsive */}
              <div className="absolute inset-0 rounded-full border border-amber-400/20 sm:border-2 sm:border-amber-400/30 animate-ping"></div>
              <div className="absolute inset-0 rounded-full border border-yellow-400/15 sm:border border-yellow-400/20 animate-pulse"></div>
              
              {/* Desktop Tooltip */}
              <div className="hidden md:block absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 pointer-events-none z-50">
                <div className="relative">
                  <div className="bg-amber-900/95 backdrop-blur-sm text-amber-100 px-3 py-2 rounded-lg text-xs font-medium shadow-2xl border border-amber-700/50 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-400">🧙‍♂️</span>
                      <div className="text-center">
                        <div className="font-bold text-amber-200">&quot;There and Back Again:</div>
                        <div className="text-amber-300">A Software Engineer&apos;s Tale&quot;</div>
                      </div>
                    </div>
                  </div>
                  {/* Tooltip arrow */}
                  <div className="absolute top-full right-6 -mt-1 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-amber-900/95"></div>
                </div>
              </div>
              
              {/* Mobile Tooltip - Simple and smaller */}
              <div className="md:hidden absolute bottom-full right-0 mb-2 opacity-0 group-active:opacity-100 transition-all duration-300 pointer-events-none z-50">
                <div className="bg-amber-900/90 text-amber-100 px-2 py-1 rounded text-xs font-medium shadow-lg border border-amber-700/50 whitespace-nowrap">
                  🧙‍♂️ My Journey
                  {/* Mobile tooltip arrow */}
                  <div className="absolute top-full right-3 -mt-1 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-amber-900/90"></div>
                </div>
              </div>
              
              {/* Enhanced magic sparkles - Mobile Responsive */}
              <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 bg-yellow-400 rounded-full opacity-40 sm:opacity-50 group-hover:opacity-100 animate-ping transition-opacity duration-300"></div>
              <div className="absolute -bottom-0.5 -left-0.5 sm:-bottom-1 sm:-left-1 w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-blue-400 rounded-full opacity-40 sm:opacity-50 group-hover:opacity-100 animate-ping transition-opacity duration-300" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute top-0.5 left-0.5 sm:top-1 sm:left-1 w-0.5 h-0.5 sm:w-1 sm:h-1 bg-green-400 rounded-full opacity-20 sm:opacity-30 group-hover:opacity-100 animate-ping transition-opacity duration-300" style={{ animationDelay: '1s' }}></div>
            </div>
            
            {/* Bottom indicator - Mobile Responsive */}
            <div className="absolute -bottom-1 sm:-bottom-2 left-1/2 transform -translate-x-1/2 opacity-50 sm:opacity-60 group-hover:opacity-100 transition-opacity duration-300">
              <div className="text-xs sm:text-xs text-amber-400 font-medium text-center">
                <span className="sm:hidden">Journey</span>
                <span className="hidden sm:inline">My Unexpected Journey</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Skills Section - Mobile optimized */}
      <section id="skills-section" className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-12 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4 sm:mb-6">
              Technical Expertise
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed px-4">
              A comprehensive overview of my engineering capabilities and technical proficiency.
            </p>
          </div>

          {/* Engineering Skills - Mobile responsive */}
          <div className="mb-16 sm:mb-24">
            <SkillsRadarChart />
          </div>

          {/* Tech Stack Slider - Mobile optimized */}
          <div>
            <div className="text-center mb-8 sm:mb-12">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-3 sm:mb-4">
                Technology Stack
              </h3>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 px-4">
                Tools and technologies I work with daily
              </p>
            </div>
            <TechStackSlider techStack={techStack} />
          </div>
        </div>
      </section>
    </div>
  );
}
