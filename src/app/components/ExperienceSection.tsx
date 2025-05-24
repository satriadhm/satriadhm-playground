'use client';

import { useState } from 'react';
import { ChevronRight, Building, Calendar, MapPin, Trophy, ExternalLink } from 'lucide-react';
import { experiences } from '@/constants/data';
import { Experience } from '@/types';
import ImageSlider from './ImageSlider';

export default function ExperienceSection() {
  const [selectedType, setSelectedType] = useState<'all' | 'fulltime' | 'parttime' | 'internship'>('all');
  const [expandedExperience, setExpandedExperience] = useState<string | null>(null);

  const getTypeColor = (type: Experience['type']) => {
    switch (type) {
      case 'fulltime':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'parttime':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'internship':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
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
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Professional Experience
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            My journey through various roles in software engineering, from internships to full-time positions, 
            building scalable systems and leading innovative projects.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm border border-gray-200 dark:border-gray-700">
            {(['all', 'fulltime', 'parttime', 'internship'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  selectedType === type
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                {type === 'all' ? 'All' : getTypeLabel(type)}
                {type !== 'all' && (
                  <span className="ml-2 text-xs bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded-full">
                    {groupedExperiences[type].length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-8">
          {filteredExperiences.map((experience, index) => (
            <div
              key={experience.id}
              className="relative group"
            >
              {/* Timeline line */}
              {index !== filteredExperiences.length - 1 && (
                <div className="absolute left-8 top-20 w-0.5 h-full bg-gray-200 dark:bg-gray-700 z-0" />
              )}

              <div className="relative z-10 card p-6 md:p-8 card-hover">
                <div className="flex items-start space-x-6">
                  {/* Timeline dot */}
                  <div className="flex-shrink-0 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                    <Building className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div className="space-y-2">
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
                          {experience.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400">
                          <div className="flex items-center space-x-2">
                            <Building size={16} />
                            <span className="font-medium">{experience.company}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin size={16} />
                            <span>{experience.location}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar size={16} />
                            <span>{experience.period}</span>
                          </div>
                        </div>
                      </div>
                      
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(experience.type)}`}>
                        {getTypeLabel(experience.type)}
                      </span>
                    </div>

                    {/* Description */}
                    <div className="space-y-4 mb-6">
                      {experience.description.slice(0, expandedExperience === experience.id ? undefined : 2).map((desc, descIndex) => (
                        <p key={descIndex} className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {desc}
                        </p>
                      ))}
                      
                      {experience.description.length > 2 && (
                        <button
                          onClick={() => setExpandedExperience(
                            expandedExperience === experience.id ? null : experience.id
                          )}
                          className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                        >
                          <span>
                            {expandedExperience === experience.id ? 'Show less' : 'Show more'}
                          </span>
                          <ChevronRight 
                            size={16} 
                            className={`transition-transform ${
                              expandedExperience === experience.id ? 'rotate-90' : ''
                            }`} 
                          />
                        </button>
                      )}
                    </div>

                    {/* Achievements */}
                    {experience.achievements && experience.achievements.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center">
                          <Trophy size={20} className="mr-2 text-yellow-500" />
                          Key Achievements
                        </h4>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {experience.achievements.map((achievement, achIndex) => (
                            <div key={achIndex} className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
                              <p className="text-sm text-green-800 dark:text-green-300 font-medium">
                                {achievement}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Technologies */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
                        Technologies Used:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm rounded-full border border-blue-200 dark:border-blue-800"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Image Slider */}
                    {experience.images && experience.images.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                          Project Gallery
                        </h4>
                        <ImageSlider images={experience.images} />
                      </div>
                    )}

                    {/* Certificates */}
                    {experience.certificates && experience.certificates.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                          Certificates & Recognition
                        </h4>
                        <div className="grid sm:grid-cols-2 gap-4">
                          {experience.certificates.map((cert, certIndex) => (
                            <a
                              key={certIndex}
                              href={cert}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                            >
                              <ExternalLink size={16} className="text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                              <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                View Certificate
                              </span>
                            </a>
                          ))}
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
    </section>
  );
}