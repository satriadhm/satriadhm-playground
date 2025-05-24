'use client';

import { useState } from 'react';
import { TechStack } from '@/types';

interface TechStackGridProps {
  techStack: TechStack[];
}

export default function TechStackGrid({ techStack }: TechStackGridProps) {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const getProficiencyColor = (proficiency: number) => {
    if (proficiency <= 2) return 'from-red-400 to-red-600';
    if (proficiency === 3) return 'from-yellow-400 to-yellow-600';
    if (proficiency === 4) return 'from-blue-400 to-blue-600';
    return 'from-green-400 to-green-600';
  };

  const getProficiencyText = (proficiency: number) => {
    if (proficiency <= 2) return 'Learning';
    if (proficiency === 3) return 'Intermediate';
    if (proficiency === 4) return 'Advanced';
    return 'Expert';
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {techStack.map((tech, index) => (
        <div
          key={tech.name}
          className="relative group cursor-pointer"
          onMouseEnter={() => setHoveredTech(tech.name)}
          onMouseLeave={() => setHoveredTech(null)}
        >
          <div className="card p-4 text-center hover:scale-105 transition-all duration-300">
            {/* Tech Name */}
            <div className="font-medium text-gray-900 dark:text-gray-100 mb-2">
              {tech.name}
            </div>
            
            {/* Proficiency Bar */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
              <div
                className={`h-2 rounded-full bg-gradient-to-r ${getProficiencyColor(tech.proficiency)} transition-all duration-500`}
                style={{
                  width: `${(tech.proficiency / 5) * 100}%`,
                  transitionDelay: `${index * 50}ms`
                }}
              />
            </div>
            
            {/* Proficiency Level */}
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {tech.proficiency}/5
            </div>
          </div>

          {/* Tooltip */}
          {hoveredTech === tech.name && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded-lg shadow-lg z-10 whitespace-nowrap">
              <div className="font-medium">{tech.name}</div>
              <div className="text-gray-300 dark:text-gray-600">
                {getProficiencyText(tech.proficiency)}
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-100" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}