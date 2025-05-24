'use client';

import { useEffect, useState } from 'react';
import { Skill } from '@/types';

interface SkillsRadarChartProps {
  skills: Skill[];
}

export default function SkillsRadarChart({ skills }: SkillsRadarChartProps) {
  const [animatedValues, setAnimatedValues] = useState<number[]>([]);
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
  
  const size = 400;
  const center = size / 2;
  const maxRadius = 120;
  const levels = 5;

  // Use exactly 5 skills for pentagon
  const chartSkills = skills.slice(0, 5);

  useEffect(() => {
    // Animate the values from 0 to actual values
    const timer = setTimeout(() => {
      setAnimatedValues(chartSkills.map(skill => skill.level));
    }, 800);

    return () => clearTimeout(timer);
  }, [chartSkills]);

  // Calculate positions for each skill point in pentagon formation
  const getSkillPoints = () => {
    return chartSkills.map((skill, index) => {
      // Pentagon: start from top and go clockwise
      const angle = (index * 2 * Math.PI) / 5 - Math.PI / 2;
      const value = animatedValues[index] || 0;
      const radius = (value / 5) * maxRadius;
      
      const x = center + Math.cos(angle) * radius;
      const y = center + Math.sin(angle) * radius;
      
      // Label position - further out from the chart
      const labelRadius = maxRadius + 40;
      const labelX = center + Math.cos(angle) * labelRadius;
      const labelY = center + Math.sin(angle) * labelRadius;
      
      return {
        x,
        y,
        labelX,
        labelY,
        skill,
        angle: (angle * 180 / Math.PI),
        index
      };
    });
  };

  // Generate grid lines (concentric pentagons)
  const getGridLines = () => {
    return Array.from({ length: levels }, (_, levelIndex) => {
      const radius = ((levelIndex + 1) / levels) * maxRadius;
      const points = Array.from({ length: 5 }, (_, pointIndex) => {
        const angle = (pointIndex * 2 * Math.PI) / 5 - Math.PI / 2;
        const x = center + Math.cos(angle) * radius;
        const y = center + Math.sin(angle) * radius;
        return `${x},${y}`;
      }).join(' ');
      
      return { points, radius, level: levelIndex + 1 };
    });
  };

  // Generate axis lines for pentagon
  const getAxisLines = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const angle = (index * 2 * Math.PI) / 5 - Math.PI / 2;
      return {
        x1: center,
        y1: center,
        x2: center + Math.cos(angle) * maxRadius,
        y2: center + Math.sin(angle) * maxRadius
      };
    });
  };

  const skillPoints = getSkillPoints();
  const gridLines = getGridLines();
  const axisLines = getAxisLines();

  // Create the skill area path
  const skillAreaPath = skillPoints.length === 5 
    ? `M ${skillPoints.map(p => `${p.x},${p.y}`).join(' L ')} Z`
    : '';

  // Simplified skill names
  const skillLabels = [
    'Requirement Analysis',
    'Design', 
    'Construction',
    'Testing',
    'Maintenance'
  ];

  const skillDescriptions = [
    "I've tried this once",
    "I understand the basics", 
    "I can do this independently",
    "I have deep experience",
    "I'm an expert / can mentor others"
  ];

  return (
    <div className="w-full">
      {/* Title */}
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Engineering Skills
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          My capabilities across the software development lifecycle
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
        {/* Pentagon Chart */}
        <div className="relative" style={{ width: size, height: size }}>
          <svg width={size} height={size} className="overflow-visible">
            {/* Grid lines (concentric pentagons) */}
            {gridLines.map((grid, index) => (
              <polygon
                key={`grid-${index}`}
                points={grid.points}
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="1"
                className="dark:stroke-gray-600"
              />
            ))}

            {/* Axis lines */}
            {axisLines.map((axis, index) => (
              <line
                key={`axis-${index}`}
                x1={axis.x1}
                y1={axis.y1}
                x2={axis.x2}
                y2={axis.y2}
                stroke="#e5e7eb"
                strokeWidth="1"
                className="dark:stroke-gray-600"
              />
            ))}

            {/* Skill area (filled pentagon) */}
            {skillAreaPath && (
              <path
                d={skillAreaPath}
                fill="rgba(59, 130, 246, 0.3)"
                stroke="#3b82f6"
                strokeWidth="2"
                className={`transition-all duration-1000 ease-out ${
                  hoveredSkill !== null ? 'opacity-70' : ''
                }`}
              />
            )}

            {/* Skill points */}
            {skillPoints.map((point, index) => (
              <circle
                key={`point-${index}`}
                cx={point.x}
                cy={point.y}
                r={hoveredSkill === index ? "8" : "6"}
                fill="#3b82f6"
                stroke="white"
                strokeWidth="3"
                className="transition-all duration-300 cursor-pointer drop-shadow-lg hover:drop-shadow-xl"
                style={{
                  transitionDelay: `${index * 150}ms`
                }}
                onMouseEnter={() => setHoveredSkill(index)}
                onMouseLeave={() => setHoveredSkill(null)}
              />
            ))}

            {/* Skill labels */}
            {skillPoints.map((point, index) => {
              // Calculate label positioning
              let textAnchor = 'middle';
              let dy = '0.3em';
              let dx = '0';
              
              if (point.labelX > center + 20) {
                textAnchor = 'start';
                dx = '10';
              } else if (point.labelX < center - 20) {
                textAnchor = 'end';
                dx = '-10';
              }
              
              if (point.labelY < center - 20) {
                dy = '-0.5em';
              } else if (point.labelY > center + 20) {
                dy = '1.2em';
              }

              return (
                <text
                  key={`label-${index}`}
                  x={point.labelX}
                  y={point.labelY}
                  textAnchor={textAnchor}
                  dy={dy}
                  dx={dx}
                  fontSize="14"
                  fontWeight="500"
                  fill="currentColor"
                  className={`transition-all duration-300 cursor-pointer select-none ${
                    hoveredSkill === index 
                      ? 'text-blue-600 dark:text-blue-400 font-bold' 
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                  style={{
                    transitionDelay: `${index * 150}ms`
                  }}
                  onMouseEnter={() => setHoveredSkill(index)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  {skillLabels[index]}
                </text>
              );
            })}

            {/* Level numbers on grid */}
            {gridLines.map((grid, index) => (
              <text
                key={`level-${index}`}
                x={center + 8}
                y={center - grid.radius + 5}
                fontSize="12"
                fill="currentColor"
                opacity={0.6}
                className="text-gray-500 dark:text-gray-400 select-none"
              >
                {grid.level}
              </text>
            ))}
          </svg>

          {/* Hover tooltip */}
          {hoveredSkill !== null && (
            <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
              <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {skillLabels[hoveredSkill]}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Level {chartSkills[hoveredSkill]?.level || 0}/5
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                {skillDescriptions[(chartSkills[hoveredSkill]?.level || 1) - 1]}
              </div>
            </div>
          )}
        </div>

        {/* Skill Levels Legend */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 max-w-sm">
          <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Skill Levels
          </h4>
          <div className="space-y-3">
            {skillDescriptions.map((description, index) => (
              <div 
                key={index}
                className={`flex items-start space-x-3 p-2 rounded-lg transition-colors ${
                  hoveredSkill !== null && chartSkills[hoveredSkill]?.level === index + 1
                    ? 'bg-blue-50 dark:bg-blue-900/20'
                    : ''
                }`}
              >
                <div className={`
                  flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold
                  ${index + 1 <= 2 ? 'bg-blue-500' : 
                    index + 1 <= 4 ? 'bg-green-500' : 'bg-purple-500'}
                `}>
                  {index + 1}
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  {description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}