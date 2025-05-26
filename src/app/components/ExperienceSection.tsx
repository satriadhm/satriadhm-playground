'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronRight, Building, Calendar, MapPin, Trophy, ExternalLink, Eye, X, Briefcase, GraduationCap, Clock } from 'lucide-react';
import { experiences } from '@/constants/data';
import { Experience } from '@/types';
import ImageSlider from './ImageSlider';

// Company logos mapping
const companyLogos: Record<string, string> = {
  'Formulatrix Indonesia': '/logos/formulatrix.png',
  'Bank Rakyat Indonesia (INDESC)': '/logos/bri.png',
  'Dinotis Official': '/logos/dinotis.png',
  'FPT Software Ltd.': '/logos/fpt.png',
  'KamarPelajar.id': '/logos/kamarpelajar.png',
  'Sagara Technology': '/logos/sagara.png',
};

export default function ExperienceSection() {
  const [selectedType, setSelectedType] = useState<'all' | 'fulltime' | 'parttime' | 'internship'>('all');
  const [expandedExperience, setExpandedExperience] = useState<string | null>(null);
  const [selectedExperienceModal, setSelectedExperienceModal] = useState<Experience | null>(null);
  const [imageExists, setImageExists] = useState<Record<string, boolean>>({});

  // Check if images exist for each experience
  useEffect(() => {
    const checkImages = async () => {
      const imageExistsMap: Record<string, boolean> = {};
      
      for (const experience of experiences) {
        if (experience.images && experience.images.length > 0) {
          // For demo purposes, assume images exist if they're defined in data
          // In production, you would do actual image validation
          imageExistsMap[experience.id] = true;
        } else {
          imageExistsMap[experience.id] = false;
        }
      }
      
      setImageExists(imageExistsMap);
    };

    checkImages();
  }, []);

  const getTypeIcon = (type: Experience['type']) => {
    switch (type) {
      case 'fulltime':
        return <Briefcase size={16} />;
      case 'parttime':
        return <Clock size={16} />;
      case 'internship':
        return <GraduationCap size={16} />;
      default:
        return <Briefcase size={16} />;
    }
  };

  const getTypeColor = (type: Experience['type']) => {
    switch (type) {
      case 'fulltime':
        return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-700';
      case 'parttime':
        return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-700';
      case 'internship':
        return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-700';
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-700';
    }
  };

  const getTypeLabel = (type: Experience['type']) => {
    switch (type) {
      case 'fulltime':
        return 'Full-time';
      case 'parttime':
        return 'Part-time';
      case 'internship':
        return 'Internship';
      default:
        return type;
    }
  };

  const filteredExperiences = selectedType === 'all' 
    ? experiences 
    : experiences.filter(exp => exp.type === selectedType);

  const groupedExperiences = {
    fulltime: experiences.filter(exp => exp.type === 'fulltime'),
    parttime: experiences.filter(exp => exp.type === 'parttime'),
    internship: experiences.filter(exp => exp.type === 'internship')
  };

  return (
    <section id="experience" className="section-padding bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Mobile Responsive */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-3 sm:mb-4">
            Professional Experience
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto px-4">
            My journey through various roles in software engineering, from internships to full-time positions, 
            building scalable systems and leading innovative projects.
          </p>
        </div>

        {/* Professional Filter Tabs - Mobile Responsive */}
        <div className="flex justify-center mb-8 sm:mb-12 px-4">
          <div className="w-full max-w-4xl">
            {/* Mobile: Stack buttons vertically on very small screens */}
            <div className="hidden xs:flex bg-white dark:bg-slate-800 rounded-lg p-1 shadow-sm border border-slate-200 dark:border-slate-700 overflow-x-auto">
              {(['all', 'fulltime', 'parttime', 'internship'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-6 py-2 sm:py-3 rounded-md text-xs sm:text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                    selectedType === type
                      ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                  }`}
                >
                  {type !== 'all' && getTypeIcon(type)}
                  <span>
                    {type === 'all' ? 'All Positions' : getTypeLabel(type)}
                  </span>
                  {type !== 'all' && (
                    <span className="text-xs bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-300 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                      {groupedExperiences[type].length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Mobile: Grid for very small screens */}
            <div className="grid grid-cols-2 gap-2 xs:hidden">
              {(['all', 'fulltime', 'parttime', 'internship'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`flex items-center justify-center space-x-1 px-3 py-3 rounded-lg text-xs font-medium transition-all ${
                    selectedType === type
                      ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {type !== 'all' && getTypeIcon(type)}
                  <span>
                    {type === 'all' ? 'All' : getTypeLabel(type)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Experience Timeline - Mobile Responsive */}
        <div className="space-y-6 sm:space-y-8">
          {filteredExperiences.map((experience, index) => (
            <div
              key={experience.id}
              className="relative group"
            >
              {/* Timeline line - Hide on mobile for cleaner look */}
              {index !== filteredExperiences.length - 1 && (
                <div className="absolute left-6 sm:left-8 top-16 sm:top-20 w-0.5 h-full bg-slate-200 dark:bg-slate-700 z-0 hidden sm:block" />
              )}

              <div className="relative z-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 sm:p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                  {/* Company Logo/Timeline dot - Mobile Responsive */}
                  <div className="flex-shrink-0 self-center sm:self-start">
                    {companyLogos[experience.company] ? (
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white dark:bg-slate-700 rounded-lg flex items-center justify-center shadow-sm border border-slate-200 dark:border-slate-600 relative overflow-hidden">
                        <Image
                          src={companyLogos[experience.company]}
                          alt={`${experience.company} logo`}
                          width={32}
                          height={32}
                          className="object-contain w-8 h-8 sm:w-12 sm:h-12"
                          onError={(e) => {
                            // Fallback to icon if image fails to load
                            e.currentTarget.style.display = 'none';
                            (e.currentTarget.parentNode!.querySelector('.fallback-icon') as HTMLElement)!.style.display = 'flex';
                          }}
                        />
                        <div className="fallback-icon w-8 h-8 sm:w-12 sm:h-12 bg-blue-600 rounded-lg hidden items-center justify-center absolute inset-0">
                          <Building className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                        </div>
                      </div>
                    ) : (
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                        <Building className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Content - Mobile Responsive */}
                  <div className="flex-grow">
                    <div className="flex flex-col space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                        <div className="space-y-2">
                          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100">
                            {experience.title}
                          </h3>
                          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-4 text-sm sm:text-base text-slate-600 dark:text-slate-400">
                            <div className="flex items-center space-x-2">
                              <Building size={14} className="flex-shrink-0" />
                              <span className="font-medium">{experience.company}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin size={14} className="flex-shrink-0" />
                              <span>{experience.location}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Calendar size={14} className="flex-shrink-0" />
                              <span>{experience.period}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                          <span className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium border ${getTypeColor(experience.type)}`}>
                            {getTypeIcon(experience.type)}
                            <span>{getTypeLabel(experience.type)}</span>
                          </span>
                          
                          {/* See More Button - Mobile Responsive */}
                          {(experience.achievements?.length || imageExists[experience.id] || experience.certificates?.length) && (
                            <button
                              onClick={() => setSelectedExperienceModal(experience)}
                              className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors group border border-blue-200 dark:border-blue-700 w-full sm:w-auto justify-center"
                            >
                              <Eye size={16} />
                              <span className="text-sm font-medium">Details</span>
                              <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Description - Mobile Responsive */}
                    <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                      {experience.description.slice(0, expandedExperience === experience.id ? undefined : 2).map((desc, descIndex) => (
                        <p key={descIndex} className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                          {desc}
                        </p>
                      ))}
                      
                      {experience.description.length > 2 && (
                        <button
                          onClick={() => setExpandedExperience(
                            expandedExperience === experience.id ? null : experience.id
                          )}
                          className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors text-sm"
                        >
                          <span>
                            {expandedExperience === experience.id ? 'Show less' : 'Show more'}
                          </span>
                          <ChevronRight 
                            size={14} 
                            className={`transition-transform ${
                              expandedExperience === experience.id ? 'rotate-90' : ''
                            }`} 
                          />
                        </button>
                      )}
                    </div>

                    {/* Technologies - Mobile Responsive */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
                        Technologies & Tools:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 sm:px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs sm:text-sm rounded-md border border-slate-200 dark:border-slate-600"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Quick Preview of Achievements - Mobile Responsive */}
                    {experience.achievements && experience.achievements.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2 flex items-center">
                          <Trophy size={16} className="mr-2 text-blue-600 dark:text-blue-400" />
                          Key Achievement
                        </h4>
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-700">
                          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                            {experience.achievements[0]}
                            {experience.achievements.length > 1 && (
                              <span className="text-slate-500 dark:text-slate-400"> and {experience.achievements.length - 1} more...</span>
                            )}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Detail Modal - Mobile Responsive */}
      {selectedExperienceModal && (
        <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-start sm:items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-5xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-700 my-2 sm:my-4">
            {/* Modal Header - Mobile Responsive */}
            <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4 sm:p-6 flex items-start sm:items-center justify-between z-10 rounded-t-2xl">
              <div className="flex items-start space-x-3 sm:space-x-4 flex-1 min-w-0">
                {companyLogos[selectedExperienceModal.company] ? (
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white dark:bg-slate-700 rounded-lg flex items-center justify-center shadow-md border border-slate-200 dark:border-slate-600 relative overflow-hidden flex-shrink-0">
                    <Image
                      src={companyLogos[selectedExperienceModal.company]}
                      alt={`${selectedExperienceModal.company} logo`}
                      width={24}
                      height={24}
                      className="object-contain w-6 h-6 sm:w-8 sm:h-8"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-slate-100 truncate">
                    {selectedExperienceModal.title}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium text-sm sm:text-base truncate">
                    {selectedExperienceModal.company}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedExperienceModal(null)}
                className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 flex-shrink-0 ml-2"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content - Mobile Responsive */}
            <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
              {/* Full Description */}
              <div>
                <h4 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3 sm:mb-4">
                  Role Description
                </h4>
                <div className="space-y-3 sm:space-y-4">
                  {selectedExperienceModal.description.map((desc, descIndex) => (
                    <p key={descIndex} className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                      {desc}
                    </p>
                  ))}
                </div>
              </div>

              {/* All Achievements */}
              {selectedExperienceModal.achievements && selectedExperienceModal.achievements.length > 0 && (
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3 sm:mb-4 flex items-center">
                    <Trophy size={18} className="mr-2 text-blue-600 dark:text-blue-400" />
                    Key Achievements
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {selectedExperienceModal.achievements.map((achievement, achIndex) => (
                      <div key={achIndex} className="bg-blue-50 dark:bg-blue-900/20 p-3 sm:p-4 rounded-lg border border-blue-200 dark:border-blue-700">
                        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                          {achievement}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technologies */}
              <div>
                <h4 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3 sm:mb-4">
                  Technologies & Tools
                </h4>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {selectedExperienceModal.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-600 font-medium text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Image Gallery - Mobile Responsive */}
              {imageExists[selectedExperienceModal.id] && selectedExperienceModal.images && selectedExperienceModal.images.length > 0 && (
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3 sm:mb-4">
                    Project Gallery
                  </h4>
                  <div className="bg-slate-50 dark:bg-slate-700/50 p-3 sm:p-4 rounded-lg">
                    <ImageSlider 
                      images={selectedExperienceModal.images} 
                      compact={true} 
                      modalMode={true}
                    />
                  </div>
                </div>
              )}

              {/* Certificates - Mobile Responsive */}
              {selectedExperienceModal.certificates && selectedExperienceModal.certificates.length > 0 && (
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3 sm:mb-4">
                    Certificates & Recognition
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {selectedExperienceModal.certificates.map((cert, certIndex) => (
                      <a
                        key={certIndex}
                        href={cert}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors group border border-blue-200 dark:border-blue-700"
                      >
                        <ExternalLink size={18} className="text-blue-500 group-hover:text-blue-700 dark:group-hover:text-blue-300 flex-shrink-0" />
                        <span className="text-sm sm:text-base text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-100 font-medium">
                          View Certificate #{certIndex + 1}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}