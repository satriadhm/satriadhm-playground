'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Download, MapPin } from 'lucide-react';
import Link from 'next/link';
import { personalInfo, techStack, engineeringSkills } from '@/constants/data';
import SkillsRadarChart from './SkillRadarChart';
import TechStackSlider from './TechStackSlider';

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [currentRole, setCurrentRole] = useState(0);
  
  const roles = [
    'Software Engineer',
    'Full-Stack Developer',
    'Backend Specialist'
  ];

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-gray-950 dark:to-blue-950 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(59, 130, 246) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}></div>
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative z-10 py-20">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
          <div className="text-center space-y-12">
            
            {/* Status Badge */}
            <div className={`inline-flex items-center space-x-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50 px-8 py-4 rounded-full ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-blue-700 dark:text-blue-300 font-medium">Available for opportunities</span>
            </div>

            {/* Main Content */}
            <div className={`space-y-12 ${isVisible ? 'animate-fade-in delay-200' : 'opacity-0'}`}>
              {/* Main Heading */}
              <div className="space-y-8">
                <h1 className="text-5xl lg:text-7xl xl:text-8xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
                  <span className="block mb-4">Hi, I&apos;m</span>
                  <span className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
                    {personalInfo.name}
                  </span>
                </h1>
                
                <div className="text-2xl lg:text-3xl xl:text-4xl font-light text-slate-600 dark:text-slate-400 h-20 flex items-center justify-center">
                  <span className="mr-3">A</span>
                  <span className="text-slate-900 dark:text-slate-100 font-medium border-r-2 border-blue-500 dark:border-blue-400 pr-3 min-w-[320px] text-left">
                    {typedText}
                  </span>
                </div>

                <div className="flex items-center justify-center space-x-3 text-slate-500 dark:text-slate-400 text-lg">
                  <MapPin size={20} className="text-blue-500" />
                  <span>{personalInfo.location}</span>
                </div>
              </div>

              {/* Bio */}
              <div className="max-w-3xl mx-auto px-4">
                <p className="text-xl lg:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                  {personalInfo.bio}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4">
                <Link
                  href="/experience"
                  className="group bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-10 py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-3"
                >
                  <span>View My Work</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <a
                  href="/resume.pdf"
                  download
                  className="group border-2 border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-700 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/30 px-10 py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 flex items-center space-x-3"
                >
                  <Download size={18} className="group-hover:translate-y-0.5 transition-transform" />
                  <span>Download Resume</span>
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-12 pt-12 max-w-lg mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">3+</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">15+</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">5+</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Technologies</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">
              Technical Expertise
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              A comprehensive overview of my engineering capabilities and technical proficiency.
            </p>
          </div>

          {/* Engineering Skills */}
          <div className="mb-24">
            <SkillsRadarChart skills={engineeringSkills} />
          </div>

          {/* Tech Stack Slider */}
          <div>
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                Technology Stack
              </h3>
              <p className="text-lg text-slate-600 dark:text-slate-400">
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