'use client';

import { useState, useEffect } from 'react';
import { MapPin, Calendar, Heart, Star, Plane, GraduationCap, Briefcase, Award, Coffee, Code2 } from 'lucide-react';

interface LifeEvent {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  location: string;
  type: 'education' | 'work' | 'achievement' | 'personal' | 'travel';
  image?: string;
  highlight?: boolean;
}

const lifeEvents: LifeEvent[] = [
  {
    id: 'birth',
    year: '2003',
    title: 'Born in Indonesia',
    subtitle: 'The Beginning of My Journey',
    description: 'Started my life journey in the beautiful archipelago of Indonesia, where my passion for technology first sparked.',
    location: 'Indonesia',
    type: 'personal',
    highlight: true
  },
  {
    id: 'telkom-start',
    year: '2021',
    title: 'Started Bachelor\'s in Software Engineering',
    subtitle: 'Telkom University',
    description: 'Began my formal journey in software engineering with a focus on building scalable systems and innovative solutions.',
    location: 'Bandung, Indonesia',
    type: 'education',
    highlight: true
  },
  {
    id: 'first-internship',
    year: '2022',
    title: 'First Tech Internship',
    subtitle: 'Sagara Technology',
    description: 'My first hands-on experience in the tech industry, working with Django and building microservices architecture.',
    location: 'Indonesia',
    type: 'work'
  },
  {
    id: 'lab-assistant',
    year: '2022',
    title: 'Became Laboratory Assistant',
    subtitle: 'Teaching & Mentoring',
    description: 'Started mentoring fellow students in programming and software engineering concepts, discovering my passion for sharing knowledge.',
    location: 'Telkom University',
    type: 'work'
  },
  {
    id: 'kamarpelajar',
    year: '2023',
    title: 'Remote Work Experience',
    subtitle: 'KamarPelajar.id - Stockholm, Sweden',
    description: 'First remote international experience, working with a Swedish startup while being based in Indonesia.',
    location: 'Stockholm, Sweden (Remote)',
    type: 'work',
    highlight: true
  },
  {
    id: 'fpt-vietnam',
    year: '2023',
    title: 'International Internship',
    subtitle: 'FPT Software - Vietnam',
    description: 'Lived and worked in Hanoi, Vietnam, experiencing different culture while building enterprise-level applications.',
    location: 'Hanoi, Vietnam',
    type: 'work',
    highlight: true
  },
  {
    id: 'codefest-winner',
    year: '2023',
    title: 'Codefest Indonesia Winner',
    subtitle: 'First Runner-up among 400+ developers',
    description: 'Led team to victory in national coding competition with blockchain-based property transaction platform.',
    location: 'Indonesia',
    type: 'achievement',
    highlight: true
  },
  {
    id: 'spain-exchange',
    year: '2024',
    title: 'International Student Exchange',
    subtitle: 'Universidad de Granada, Spain',
    description: 'Studied International Marketing and Management in beautiful Granada, Spain, broadening my global perspective.',
    location: 'Granada, Spain',
    type: 'education',
    highlight: true
  },
  {
    id: 'bri-indesc',
    year: '2024',
    title: 'Software Engineer at BRI',
    subtitle: 'INDESC Program',
    description: 'Developed banking microservices achieving 100% compliance with strict quality assessments.',
    location: 'Indonesia',
    type: 'work'
  },
  {
    id: 'formulatrix-rnd',
    year: '2025',
    title: 'R&D Software Engineer',
    subtitle: 'Formulatrix Indonesia',
    description: 'Currently leading innovative projects in research and development, working on cutting-edge laboratory automation systems.',
    location: 'Indonesia',
    type: 'work',
    highlight: true
  }
];

const getTypeIcon = (type: LifeEvent['type']) => {
  switch (type) {
    case 'education':
      return <GraduationCap size={20} />;
    case 'work':
      return <Briefcase size={20} />;
    case 'achievement':
      return <Award size={20} />;
    case 'travel':
      return <Plane size={20} />;
    case 'personal':
      return <Heart size={20} />;
    default:
      return <Star size={20} />;
  }
};

const getTypeColor = (type: LifeEvent['type']) => {
  switch (type) {
    case 'education':
      return 'bg-blue-500';
    case 'work':
      return 'bg-green-500';
    case 'achievement':
      return 'bg-yellow-500';
    case 'travel':
      return 'bg-purple-500';
    case 'personal':
      return 'bg-pink-500';
    default:
      return 'bg-gray-500';
  }
};

export default function LifeJourneySection() {
  const [visibleEvents, setVisibleEvents] = useState<Set<string>>(new Set());
  const [selectedEvent, setSelectedEvent] = useState<LifeEvent | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleEvents(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.3 }
    );

    const eventElements = document.querySelectorAll('.timeline-event');
    eventElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const currentYear = new Date().getFullYear();
  const totalYears = currentYear - 2003;

  return (
    <section id="life-journey" className="py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg mb-6">
            <Coffee className="text-amber-500" size={20} />
            <span className="text-gray-600 dark:text-gray-400 font-medium">Grab a coffee and explore my journey</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            My Life Journey
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            From a curious kid in Indonesia to a software engineer working on international projects. 
            Here&apos;s the story of my {totalYears}-year journey through code, cultures, and countless cups of coffee.
          </p>
        </div>

        {/* Fun Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/20">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {totalYears}
            </div>
            <div className="text-gray-600 dark:text-gray-400 font-medium">Years of Life</div>
          </div>
          <div className="text-center p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/20">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              6+
            </div>
            <div className="text-gray-600 dark:text-gray-400 font-medium">Work Experiences</div>
          </div>
          <div className="text-center p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/20">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              3
            </div>
            <div className="text-gray-600 dark:text-gray-400 font-medium">Countries Lived</div>
          </div>
          <div className="text-center p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/20">
            <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
              ∞
            </div>
            <div className="text-gray-600 dark:text-gray-400 font-medium">Lines of Code</div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 transform md:-translate-x-1/2"></div>

          {/* Timeline Events */}
          <div className="space-y-12">
            {lifeEvents.map((event, index) => (
              <div
                key={event.id}
                id={event.id}
                className={`timeline-event relative ${
                  index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                }`}
              >
                <div className={`flex items-center ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'
                } flex-row`}>
                  {/* Content Card */}
                  <div className={`flex-1 ${
                    index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                  } pl-20 md:pl-0`}>
                    <div className={`
                      bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/20
                      transform transition-all duration-700 hover:scale-105 cursor-pointer
                      ${visibleEvents.has(event.id) ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
                      ${event.highlight ? 'ring-2 ring-blue-500/20 shadow-blue-500/10' : ''}
                    `}
                      onClick={() => setSelectedEvent(event)}
                    >
                      {event.highlight && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
                          <Star size={12} className="text-white" />
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-3 mb-3">
                        <div className={`w-10 h-10 rounded-full ${getTypeColor(event.type)} flex items-center justify-center text-white shadow-lg`}>
                          {getTypeIcon(event.type)}
                        </div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                          {event.year}
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                        {event.title}
                      </h3>
                      <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                        {event.subtitle}
                      </p>
                      
                      <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 mb-3">
                        <MapPin size={14} />
                        <span className="text-sm">{event.location}</span>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {event.description}
                      </p>
                      
                      <div className="mt-4 text-blue-600 dark:text-blue-400 text-sm font-medium">
                        Click to learn more →
                      </div>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center">
                    <div className={`
                      w-6 h-6 rounded-full border-4 border-white dark:border-gray-900 shadow-lg transition-all duration-500
                      ${visibleEvents.has(event.id) ? getTypeColor(event.type) : 'bg-gray-300 dark:bg-gray-600'}
                      ${event.highlight ? 'w-8 h-8 ring-4 ring-yellow-300/50' : ''}
                    `}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fun Footer */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full shadow-lg">
            <Code2 size={20} />
            <span className="font-medium">The journey continues... 🚀</span>
          </div>
        </div>
      </div>

      {/* Modal for Event Details */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-2xl max-h-[80vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-full ${getTypeColor(selectedEvent.type)} flex items-center justify-center text-white shadow-lg`}>
                  {getTypeIcon(selectedEvent.type)}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {selectedEvent.title}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">
                    {selectedEvent.subtitle}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <Calendar size={16} />
                  <span>{selectedEvent.year}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin size={16} />
                  <span>{selectedEvent.location}</span>
                </div>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                {selectedEvent.description}
              </p>
              
              {selectedEvent.highlight && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-yellow-800 dark:text-yellow-300">
                    <Star size={16} />
                    <span className="font-medium">Highlighted Milestone</span>
                  </div>
                  <p className="text-yellow-700 dark:text-yellow-400 text-sm mt-1">
                    This was a significant turning point in my journey that shaped who I am today.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}