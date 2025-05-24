'use client';

import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, MapPin, ArrowRight, Download } from 'lucide-react';
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
    'Full-Stack Web Developer', 
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
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 overflow-hidden opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(30, 64, 175) 1px, transparent 0)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto container-padding relative z-10">
          <div className="text-center content-spacing">
            {/* Professional greeting */}
            <div className={`${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              <div className="inline-flex items-center space-x-3 bg-slate-100 dark:bg-slate-800 px-6 py-3 rounded-full">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-slate-600 dark:text-slate-400 font-medium">Available for opportunities</span>
              </div>
            </div>

            {/* Profile section */}
            <div className={`${isVisible ? 'animate-scale-in delay-200' : 'opacity-0'}`}>
              <div className="relative inline-block mb-8">
                <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl">
                  <img
                    src={personalInfo.profileImage || '/api/placeholder/200/200'}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Professional status indicator */}
                <div className="absolute -bottom-2 -right-2 w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-full border-4 border-white dark:border-slate-800 flex items-center justify-center">
                  <div className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Name and title */}
            <div className={`content-spacing ${isVisible ? 'animate-slide-up delay-400' : 'opacity-0'}`}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-slate-100 leading-tight mb-6">
                I&apos;m{' '}
                <span className="gradient-text">
                  {personalInfo.name}
                </span>
              </h1>
              
              <div className="text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-600 dark:text-slate-400 h-16 flex items-center justify-center mb-6">
                <span className="mr-2">A</span>
                <span className="text-blue-600 dark:text-blue-400 border-r-2 border-blue-600 pr-1">
                  {typedText}
                </span>
              </div>

              <div className="flex items-center justify-center space-x-2 text-slate-500 dark:text-slate-500 mb-8">
                <MapPin size={20} />
                <span className="text-lg">{personalInfo.location}</span>
              </div>
            </div>

            {/* Bio */}
            <div className={`max-w-4xl mx-auto ${isVisible ? 'animate-fade-in delay-600' : 'opacity-0'}`}>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-12">
                {personalInfo.bio}
              </p>
            </div>

            {/* Action buttons */}
            <div className={`flex flex-col sm:flex-row justify-center gap-6 mb-12 ${isVisible ? 'animate-fade-in delay-800' : 'opacity-0'}`}>
              <Link
                href="/journey"
                className="btn-primary group"
              >
                <span className="flex items-center space-x-2">
                  <span>Discover My Journey</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              
              <a
                href="/resume.pdf"
                download
                className="btn-secondary group"
              >
                <Download size={20} className="mr-2" />
                <span>Download Resume</span>
              </a>
            </div>

            {/* Professional social links */}
            <div className={`flex justify-center space-x-6 ${isVisible ? 'animate-fade-in delay-800' : 'opacity-0'}`}>
              {[
                { href: personalInfo.github, icon: Github, label: 'GitHub' },
                { href: personalInfo.linkedin, icon: Linkedin, label: 'LinkedIn' },
                { href: `mailto:${personalInfo.email}`, icon: Mail, label: 'Email' }
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={label !== 'Email' ? '_blank' : undefined}
                  rel={label !== 'Email' ? 'noopener noreferrer' : undefined}
                  className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-600 hover:text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
                  aria-label={label}
                >
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Professional scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-slate-400 dark:border-slate-600 rounded-full flex justify-center opacity-60">
            <div className="w-1 h-3 bg-slate-400 dark:bg-slate-600 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="section-padding bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Technical Expertise
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              A comprehensive overview of my engineering capabilities and technical proficiency.
            </p>
          </div>

          {/* Engineering Skills */}
          <div className="mb-20">
            <SkillsRadarChart skills={engineeringSkills} />
          </div>

          {/* Tech Stack Slider */}
          <div>
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                Technology Stack
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
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