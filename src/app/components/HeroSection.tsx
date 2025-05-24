'use client';

import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, MapPin, ArrowRight, Download, Sparkles, Code2, Zap } from 'lucide-react';
import Link from 'next/link';
import { personalInfo, techStack, engineeringSkills } from '@/constants/data';
import SkillsRadarChart from './SkillRadarChart';
import TechStackGrid from './TechStackGrid';

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [currentRole, setCurrentRole] = useState(0);
  
  const roles = [
    'Software Engineer',
    'Full-Stack Developer', 
    'Backend Specialist',
    'System Architect'
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Typing animation effect
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl animate-spin duration-slower"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-8">
            {/* Greeting */}
            <div className={`space-y-4 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              <div className="inline-flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-white/20 dark:border-gray-700/20">
                <Sparkles className="text-yellow-500 animate-pulse" size={20} />
                <span className="text-gray-600 dark:text-gray-400 font-medium">Hello World! 👋</span>
              </div>
            </div>

            {/* Profile Image */}
            <div className={`relative ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}>
              <div className="w-32 h-32 md:w-48 md:h-48 mx-auto rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl">
                <img
                  src={personalInfo.profileImage || '/api/placeholder/200/200'}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 md:w-12 md:h-12 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center animate-pulse">
                <div className="w-3 h-3 md:w-4 md:h-4 bg-white rounded-full"></div>
              </div>
              {/* Floating icons */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center animate-bounce">
                <Code2 size={16} className="text-white" />
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center animate-bounce delay-300">
                <Zap size={16} className="text-white" />
              </div>
            </div>

            {/* Name and Dynamic Title */}
            <div className={`space-y-6 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
                I&apos;m{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 animate-gradient">
                  {personalInfo.name}
                </span>
              </h1>
              
              <div className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-600 dark:text-gray-400 h-16 flex items-center justify-center">
                <span className="mr-2">A</span>
                <span className="text-blue-600 dark:text-blue-400 border-r-2 border-blue-600 pr-1 animate-pulse">
                  {typedText}
                </span>
              </div>

              <div className="flex items-center justify-center space-x-2 text-gray-500 dark:text-gray-500">
                <MapPin size={20} />
                <span className="text-lg">{personalInfo.location}</span>
              </div>
            </div>

            {/* Bio */}
            <div className={`max-w-3xl mx-auto ${isVisible ? 'animate-fade-in delay-300' : 'opacity-0'}`}>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                {personalInfo.bio}
              </p>
            </div>

            {/* Action Buttons */}
            <div className={`flex flex-wrap justify-center gap-6 ${isVisible ? 'animate-fade-in delay-500' : 'opacity-0'}`}>
              <Link
                href="/journey"
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Discover My Journey</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </Link>
              
              <a
                href="/resume.pdf"
                download
                className="bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-full font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 shadow-lg"
              >
                <Download size={20} />
                <span>Download Resume</span>
              </a>
            </div>

            {/* Social Links */}
            <div className={`flex justify-center space-x-6 ${isVisible ? 'animate-fade-in delay-700' : 'opacity-0'}`}>
              {[
                { href: personalInfo.github, icon: Github, label: 'GitHub', color: 'hover:bg-gray-900' },
                { href: personalInfo.linkedin, icon: Linkedin, label: 'LinkedIn', color: 'hover:bg-blue-600' },
                { href: `mailto:${personalInfo.email}`, icon: Mail, label: 'Email', color: 'hover:bg-red-500' }
              ].map(({ href, icon: Icon, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target={label !== 'Email' ? '_blank' : undefined}
                  rel={label !== 'Email' ? 'noopener noreferrer' : undefined}
                  className={`p-4 rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 ${color}`}
                  aria-label={label}
                >
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              My Technical Arsenal
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              A comprehensive view of my engineering capabilities and the technologies I work with daily.
            </p>
          </div>

          {/* Engineering Skills */}
          <div className="mb-20">
            <SkillsRadarChart skills={engineeringSkills} />
          </div>

          {/* Tech Stack */}
          <div>
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Tech Stack & Tools
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Technologies I use to bring ideas to life
              </p>
            </div>
            <TechStackGrid techStack={techStack} />
          </div>
        </div>
      </section>
    </div>
  );
}