'use client';

import { useState } from 'react';
import { TechStack } from '@/types';

interface TechStackGridProps {
  techStack: TechStack[];
}

export default function TechStackGrid({ techStack }: TechStackGridProps) {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const getProficiencyWidth = (proficiency: number) => {
    return `${(proficiency / 5) * 100}%`;
  };

  const getProficiencyColor = (proficiency: number) => {
    if (proficiency <= 2) return 'bg-red-500';
    if (proficiency === 3) return 'bg-yellow-500';
    if (proficiency === 4) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getProficiencyText = (proficiency: number) => {
    if (proficiency <= 2) return 'Learning';
    if (proficiency === 3) return 'Intermediate';
    if (proficiency === 4) return 'Advanced';
    return 'Expert';
  };

  // Group technologies by category
  const groupedTech = {
    'Languages': techStack.filter(tech => ['Go', 'Java', 'TypeScript', 'Python'].includes(tech.name)),
    'Frontend': techStack.filter(tech => ['React', 'Next.js'].includes(tech.name)),
    'Backend': techStack.filter(tech => ['Node.js', 'GraphQL'].includes(tech.name)),
    'Database': techStack.filter(tech => ['PostgreSQL', 'MongoDB'].includes(tech.name)),
    'Tools': techStack.filter(tech => ['Docker', 'AWS'].includes(tech.name))
  };

  return (
    <div className="space-y-12">
      {Object.entries(groupedTech).map(([category, techs]) => (
        <div key={category} className="space-y-6">
          <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
            {category}
          </h4>
          
          <div className="grid gap-6">
            {techs.map((tech, index) => (
              <div
                key={tech.name}
                className="group cursor-pointer"
                onMouseEnter={() => setHoveredTech(tech.name)}
                onMouseLeave={() => setHoveredTech(null)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {tech.name}
                  </span>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {getProficiencyText(tech.proficiency)}
                    </span>
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                      {tech.proficiency}/5
                    </span>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full transition-all duration-700 ease-out ${getProficiencyColor(tech.proficiency)} ${
                      hoveredTech === tech.name ? 'animate-pulse' : ''
                    }`}
                    style={{
                      width: getProficiencyWidth(tech.proficiency),
                      transitionDelay: `${index * 100}ms`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Overall Stats */}
      <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-2">
            <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">
              {techStack.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Technologies</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400">
              {techStack.filter(t => t.proficiency >= 4).length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Advanced+</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl md:text-3xl font-bold text-purple-600 dark:text-purple-400">
              {Math.round(techStack.reduce((sum, t) => sum + t.proficiency, 0) / techStack.length * 10) / 10}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Avg Score</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl md:text-3xl font-bold text-yellow-600 dark:text-yellow-400">
              3+
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Years Exp</div>
          </div>
        </div>
      </div>
    </div>
  );
}