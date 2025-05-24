'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Download, MapPin, Code2, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { personalInfo, techStack, engineeringSkills } from '@/constants/data';
import SkillsRadarChart from './SkillRadarChart';
import TechStackSlider from './TechStackSlider';

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [currentRole, setCurrentRole] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
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

  // Mouse tracking for interactive elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50 dark:from-gray-950 dark:via-blue-950/30 dark:to-indigo-950/50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200/20 dark:bg-blue-800/20 rounded-full animate-bounce-slow"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200/20 dark:bg-purple-800/20 rounded-lg rotate-45 animate-pulse-slow"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-indigo-200/20 dark:bg-indigo-800/20 rounded-full animate-bounce-slow" style={{ animationDelay: '1s' }}></div>
        
        {/* Interactive mouse follower */}
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl transition-transform duration-1000 ease-out pointer-events-none"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Side - Text Content */}
            <div className={`space-y-8 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              {/* Status Badge */}
              <div className="inline-flex items-center space-x-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-white/20 dark:border-gray-700/20 hover:scale-105 transition-transform cursor-pointer">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-600 dark:text-gray-400 font-medium">Available for opportunities</span>
                <Sparkles className="w-4 h-4 text-yellow-500" />
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
                  Hi, I&apos;m{' '}
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent animate-pulse">
                    {personalInfo.name.split(' ')[0]}
                  </span>
                </h1>
                
                <div className="text-xl lg:text-2xl xl:text-3xl font-semibold text-gray-600 dark:text-gray-400 h-12 flex items-center">
                  <span className="mr-2">A passionate</span>
                  <span className="text-blue-600 dark:text-blue-400 border-r-2 border-blue-600 dark:border-blue-400 pr-1 min-w-[200px]">
                    {typedText}
                  </span>
                </div>

                <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-500">
                  <MapPin size={18} />
                  <span className="text-lg">{personalInfo.location}</span>
                </div>
              </div>

              {/* Bio */}
              <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
                {personalInfo.bio}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/experience"
                  onMouseEnter={() => setHoveredButton('experience')}
                  onMouseLeave={() => setHoveredButton(null)}
                  className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                  <span className="relative flex items-center space-x-2">
                    <span>Discover My Journey</span>
                    <ArrowRight 
                      size={20} 
                      className={`transition-transform duration-300 ${
                        hoveredButton === 'experience' ? 'translate-x-1' : ''
                      }`} 
                    />
                  </span>
                </Link>
                
                <a
                  href="/resume.pdf"
                  download
                  onMouseEnter={() => setHoveredButton('resume')}
                  onMouseLeave={() => setHoveredButton(null)}
                  className="group relative overflow-hidden bg-transparent border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                >
                  <span className="flex items-center space-x-2">
                    <Download 
                      size={20} 
                      className={`transition-transform duration-300 ${
                        hoveredButton === 'resume' ? 'translate-y-1' : ''
                      }`} 
                    />
                    <span>Download Resume</span>
                  </span>
                </a>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="text-center group cursor-pointer">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                    3+
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-500">Years Experience</div>
                </div>
                <div className="text-center group cursor-pointer">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform">
                    15+
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-500">Projects Completed</div>
                </div>
                <div className="text-center group cursor-pointer">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                    5+
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-500">Technologies Mastered</div>
                </div>
              </div>
            </div>

            {/* Right Side - Visual Elements */}
            <div className={`relative ${isVisible ? 'animate-scale-in delay-400' : 'opacity-0'}`}>
              {/* Main Profile Card */}
              <div className="relative">
                {/* Floating Profile Image */}
                <div className="relative z-10 mx-auto w-80 h-80 lg:w-96 lg:h-96">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 rounded-3xl rotate-6 animate-pulse-slow"></div>
                  <div className="absolute inset-2 bg-white dark:bg-gray-800 rounded-3xl overflow-hidden">
                    <img
                      src={personalInfo.profileImage || '/api/placeholder/400/400'}
                      alt={personalInfo.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Floating Tech Icons */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg animate-bounce-slow">
                    <Code2 className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg animate-bounce-slow" style={{ animationDelay: '0.5s' }}>
                    <span className="text-white font-bold">JS</span>
                  </div>
                  
                  <div className="absolute top-1/4 -left-8 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-bounce-slow" style={{ animationDelay: '1s' }}>
                    <span className="text-white font-bold text-sm">Go</span>
                  </div>
                </div>

                {/* Background Decorations */}
                <div className="absolute top-10 right-10 w-20 h-20 bg-blue-200/30 dark:bg-blue-800/30 rounded-full animate-pulse-slow"></div>
                <div className="absolute bottom-10 left-10 w-16 h-16 bg-purple-200/30 dark:bg-purple-800/30 rounded-lg rotate-45 animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
              </div>

              {/* Contact CTA Card */}
              <div className="absolute -bottom-8 -right-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 hover:scale-105 transition-transform cursor-pointer group">
                <Link href="#contact" className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-gray-100">Let&apos;s Connect</div>
                    <div className="text-sm text-gray-500 dark:text-gray-500">Get in touch</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Technical Expertise
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              A comprehensive overview of my engineering capabilities and technical proficiency.
            </p>
          </div>

          {/* Engineering Skills */}
          <div className="mb-16">
            <SkillsRadarChart skills={engineeringSkills} />
          </div>

          {/* Tech Stack Slider */}
          <div>
            <div className="text-center mb-8">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Technology Stack
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
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