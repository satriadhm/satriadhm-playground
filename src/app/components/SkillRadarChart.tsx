import { SkillsRadarChartProps, Skill } from '@/types';
import { useEffect, useState } from 'react';

function SkillsRadarChart({ skills }: SkillsRadarChartProps) {
  const [animatedValues, setAnimatedValues] = useState<number[]>([]);
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Mobile responsive sizing - dikurangi agar lebih kompak
  const mobileSize = 280;
  const desktopSize = 420;
  const size = isMobile ? mobileSize : desktopSize;
  const center = size / 2;
  const maxRadius = isMobile ? 100 : 120; // Dikurangi dari 80/120 ke 70/100
  const levels = 5;

  // Use exactly 5 skills for pentagon
  const chartSkills = skills.slice(0, 5);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
      
      // Label position
      const labelRadius = maxRadius + (isMobile ? 14 : 18);
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

  const skillDescriptions = [
    "I've tried this once",
    "I understand the basics", 
    "I can do this independently",
    "I have deep experience",
    "I'm an expert / can mentor others"
  ];

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Title */}
      <div className="text-center mb-6 sm:mb-8">
        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Engineering Skills
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base px-4">
          My capabilities across the software development lifecycle
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8">
        {/* Pentagon Chart */}
        <div className="relative flex justify-center items-center flex-shrink-0" style={{ 
          width: size + 40,
          height: size + 40
        }}>
          <svg 
            width={size + 40} 
            height={size + 40} 
            className="overflow-visible"
            viewBox={`-20 -20 ${size + 40} ${size + 40}`}
          >
            {/* Grid lines (concentric pentagons) */}
            {gridLines.map((grid, index) => (
              <polygon
                key={`grid-${index}`}
                points={grid.points}
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="1"
                className="dark:stroke-slate-600"
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
                stroke="#cbd5e1"
                strokeWidth="1"
                className="dark:stroke-slate-600"
              />
            ))}

            {/* Skill area (filled pentagon) */}
            {skillAreaPath && (
              <path
                d={skillAreaPath}
                fill="rgba(30, 64, 175, 0.15)"
                stroke="#1e40af"
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
                r={hoveredSkill === index ? (isMobile ? "4" : "5") : (isMobile ? "3" : "4")}
                fill="#1e40af"
                stroke="white"
                strokeWidth="2"
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
              
              if (point.labelX > center + 10) {
                textAnchor = 'start';
                dx = isMobile ? '5' : '6';
              } else if (point.labelX < center - 10) {
                textAnchor = 'end';
                dx = isMobile ? '-5' : '-6';
              }
              
              if (point.labelY < center - 10) {
                dy = '-0.8em';
              } else if (point.labelY > center + 10) {
                dy = '1.5em';
              }

              return (
                <text
                  key={`label-${index}`}
                  x={point.labelX}
                  y={point.labelY}
                  textAnchor={textAnchor}
                  dy={dy}
                  dx={dx}
                  fontSize={isMobile ? "10" : "12"}
                  fontWeight="500"
                  fill="currentColor"
                  className={`transition-all duration-300 cursor-pointer select-none ${
                    hoveredSkill === index 
                      ? 'text-blue-700 dark:text-blue-400 font-bold' 
                      : 'text-slate-700 dark:text-slate-300'
                  }`}
                  style={{
                    transitionDelay: `${index * 150}ms`
                  }}
                  onMouseEnter={() => setHoveredSkill(index)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  {point.skill.name}
                </text>
              );
            })}

            {/* Level numbers on grid */}
            {gridLines.map((grid, index) => (
              <text
                key={`level-${index}`}
                x={center + (isMobile ? 4 : 5)}
                y={center - grid.radius + (isMobile ? 2 : 3)}
                fontSize={isMobile ? "8" : "10"}
                fill="currentColor"
                opacity={0.6}
                className="text-slate-500 dark:text-slate-400 select-none"
              >
                {grid.level}
              </text>
            ))}
          </svg>

          {/* Hover tooltip - Desktop only */}
          {hoveredSkill !== null && !isMobile && (
            <div className="absolute top-2 left-2 bg-white dark:bg-slate-800 p-3 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 z-10 max-w-xs">
              <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {chartSkills[hoveredSkill]?.name}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Level {chartSkills[hoveredSkill]?.level || 0}/5
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                {skillDescriptions[(chartSkills[hoveredSkill]?.level || 1) - 1]}
              </div>
            </div>
          )}
        </div>

        {/* Skill Levels Legend */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 w-full max-w-sm flex-shrink-0">
          <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
            Skill Levels
          </h4>
          <div className="space-y-2">
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
                  flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold
                  ${index + 1 <= 2 ? 'bg-slate-500' : 
                    index + 1 <= 4 ? 'bg-blue-600' : 'bg-blue-700'}
                `}>
                  {index + 1}
                </div>
                <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Touch Info */}
      {isMobile && (
        <div className="text-center mt-4 text-xs text-slate-500 dark:text-slate-400">
          Tap on skill points to see details
        </div>
      )}
    </div>
  );
}

// Main component with your skill data
export default function App() {
  const skills: Skill[] = [
    {
      name: 'Requirements', level: 3,
      category: 'technical'
    },
    {
      name: 'Design', level: 3,
      category: 'technical'
    },
    {
      name: 'Construction', level: 5,
      category: 'technical'
    },
    {
      name: 'Testing', level: 4,
      category: 'technical'
    },
    {
      name: 'Maintenance', level: 3,
      category: 'technical'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 sm:p-8">
      <SkillsRadarChart skills={skills} />
    </div>
  );
}
