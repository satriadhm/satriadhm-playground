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