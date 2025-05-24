'use client';

import { useState } from 'react';
import { TechStack } from '@/types';

interface TechStackSliderProps {
  techStack: TechStack[];
}

export default function TechStackSlider({ techStack }: TechStackSliderProps) {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const getProficiencyLevel = (proficiency: number) => {
    if (proficiency <= 2) return 'Beginner';
    if (proficiency === 3) return 'Intermediate';
    if (proficiency === 4) return 'Advanced';
    return 'Expert';
  };

  const getProficiencyColor = (proficiency: number) => {
    if (proficiency <= 2) return 'text-orange-600 dark:text-orange-400';
    if (proficiency === 3) return 'text-yellow-600 dark:text-yellow-400';
    if (proficiency === 4) return 'text-blue-600 dark:text-blue-400';
    return 'text-green-600 dark:text-green-400';
  };

  const getProficiencyBg = (proficiency: number) => {
    if (proficiency <= 2) return 'bg-orange-100 dark:bg-orange-900/20';
    if (proficiency === 3) return 'bg-yellow-100 dark:bg-yellow-900/20';
    if (proficiency === 4) return 'bg-blue-100 dark:bg-blue-900/20';
    return 'bg-green-100 dark:bg-green-900/20';
  };

  // Duplicate techStack for seamless infinite scroll
  const duplicatedTechStack = [...techStack, ...techStack];

  return (
    <div className="relative overflow-hidden">
      {/* Slider container */}
      <div className="flex animate-slide-infinite hover:pause-animation">
        {duplicatedTechStack.map((tech, index) => (
          <div
            key={`${tech.name}-${index}`}
            className="flex-shrink-0 mx-4"
            onMouseEnter={() => setHoveredTech(tech.name)}
            onMouseLeave={() => setHoveredTech(null)}
          >
            <div className="relative group">
              {/* Tech card */}
              <div className="w-40 h-32 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center p-4 cursor-pointer group-hover:scale-105">
                <div className="w-12 h-12 mb-3 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                  <span className="text-2xl font-bold text-slate-700 dark:text-slate-300">
                    {tech.name.charAt(0)}
                  </span>
                </div>
                <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-center text-sm">
                  {tech.name}
                </h4>
              </div>

              {/* Hover tooltip */}
              {hoveredTech === tech.name && (
                <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 z-20 w-48">
                  <div className="bg-slate-900 dark:bg-slate-800 text-white p-4 rounded-lg shadow-xl border border-slate-700">
                    <div className="text-center">
                      <h5 className="font-bold text-white mb-2">{tech.name}</h5>
                      
                      {/* Proficiency level */}
                      <div className="mb-3">
                        <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getProficiencyBg(tech.proficiency)} ${getProficiencyColor(tech.proficiency)}`}>
                          {getProficiencyLevel(tech.proficiency)}
                        </div>
                      </div>

                      {/* Proficiency bar */}
                      <div className="mb-2">
                        <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                          <span>Proficiency</span>
                          <span>{tech.proficiency}/5</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(tech.proficiency / 5) * 100}%` }}
                          />
                        </div>
                      </div>

                      {/* Proficiency stars */}
                      <div className="flex justify-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <div
                            key={star}
                            className={`w-3 h-3 rounded-full ${
                              star <= tech.proficiency
                                ? 'bg-blue-500'
                                : 'bg-slate-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                      <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900 dark:border-t-slate-800"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-slate-50 dark:from-slate-900/50 to-transparent pointer-events-none z-10"></div>
      <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-slate-50 dark:from-slate-900/50 to-transparent pointer-events-none z-10"></div>

      {/* Stats section */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div className="space-y-2">
          <div className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100">
            {techStack.length}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">Technologies</div>
        </div>
        <div className="space-y-2">
          <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">
            {techStack.filter(t => t.proficiency >= 4).length}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">Advanced+</div>
        </div>
        <div className="space-y-2">
          <div className="text-2xl md:text-3xl font-bold text-slate-700 dark:text-slate-300">
            {Math.round(techStack.reduce((sum, t) => sum + t.proficiency, 0) / techStack.length * 10) / 10}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">Avg Score</div>
        </div>
        <div className="space-y-2">
          <div className="text-2xl md:text-3xl font-bold text-slate-700 dark:text-slate-300">
            3+
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">Years Exp</div>
        </div>
      </div>
    </div>
  );
}