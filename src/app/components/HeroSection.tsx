'use client';

import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, MapPin, ArrowRight, Download } from 'lucide-react';
import { personalInfo, techStack, engineeringSkills } from '@/constants/data';
import SkillsRadarChart from './SkillRadarChart';
import TechStackGrid from './TechStackGrid';

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleLifeJourneyClick = () => {
    const element = document.querySelector('#life-journey');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen pt-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Personal Info */}
          <div className={`space-y-8 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            {/* Profile Image */}
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl">
                <img
                  src={personalInfo.profileImage || '/api/placeholder/160/160'}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>

            {/* Name and Title */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
                Hello, I&apos;m{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  {personalInfo.name}
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-medium">
                {personalInfo.title}
              </p>
              <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-500">
                <MapPin size={16} />
                <span>{personalInfo.location}</span>
              </div>
            </div>

            {/* Bio */}
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl">
              {personalInfo.bio}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleLifeJourneyClick}
                className="btn-primary flex items-center space-x-2 group"
              >
                <span>Discover My Journey</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <a
                href="/resume.pdf"
                download
                className="btn-secondary flex items-center space-x-2"
              >
                <Download size={18} />
                <span>Download Resume</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex space-x-6">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-110 transition-all duration-200"
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-110 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-110 transition-all duration-200"
                aria-label="Email"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>

          {/* Right Column - Skills and Tech Stack */}
          <div className={`space-y-12 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
            {/* Engineering Skills Radar Chart */}
            <div className="card p-8">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 text-center">
                Engineering Skills
              </h3>
              <div className="flex justify-center">
                <SkillsRadarChart skills={engineeringSkills} />
              </div>
              <div className="mt-6 text-center">
                <div className="flex justify-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>1-2: Learning</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>3-4: Proficient</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span>5: Expert</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="card p-8">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 text-center">
                Tech Stack & Tools
              </h3>
              <TechStackGrid techStack={techStack} />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-16">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}