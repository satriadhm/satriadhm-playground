'use client';

import { useState, useEffect } from 'react';
import { TechStack } from '@/types';
// Simple‑Icons via react-icons gives us pixel‑perfect brand marks without hand‑rolling SVG paths
import {
  SiGo,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNestjs,
  SiNodedotjs,
  SiPython,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiDotnet,
  SiSpringboot,
  SiAmazonwebservices as SiAmazonaws,
  SiGraphql,
} from 'react-icons/si';

interface TechStackSliderProps {
  techStack: TechStack[];
}

// Map the display name coming from props → brand icon component
const TechIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Go: SiGo,
  TypeScript: SiTypescript,
  React: SiReact,
  'Next.js': SiNextdotjs,
  NestJS: SiNestjs,
  'Node.js': SiNodedotjs,
  Python: SiPython,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  Docker: SiDocker,
  Dotnet: SiDotnet,
  Springboot: SiSpringboot,
  AWS: SiAmazonaws,
  GraphQL: SiGraphql,
};

// Utility helpers -----------------------------------------------------------
const getProficiencyLevel = (p: number) =>
  p <= 2 ? 'Beginner' : p === 3 ? 'Intermediate' : p === 4 ? 'Advanced' : 'Expert';

const colorScale = {
  1: {
    text: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-100 dark:bg-orange-900/20',
    bar: 'bg-orange-500',
  },
  2: {
    text: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-100 dark:bg-orange-900/20',
    bar: 'bg-orange-500',
  },
  3: {
    text: 'text-yellow-600 dark:text-yellow-400',
    bg: 'bg-yellow-100 dark:bg-yellow-900/20',
    bar: 'bg-yellow-500',
  },
  4: {
    text: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-100 dark:bg-blue-900/20',
    bar: 'bg-blue-500',
  },
  5: {
    text: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-100 dark:bg-green-900/20',
    bar: 'bg-green-500',
  },
} as const;

export default function TechStackSlider({ techStack }: TechStackSliderProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Track mouse position for tooltip
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    if (!isMobile) {
      document.addEventListener('mousemove', handleMouseMove);
      return () => document.removeEventListener('mousemove', handleMouseMove);
    }
  }, [isMobile]);

  const duplicated = [...techStack, ...techStack]; // infinite marquee

  return (
    <>
      {/* Main Slider Container - Mobile Responsive */}
      <div className="relative w-full" style={{ minHeight: isMobile ? '140px' : '200px' }}>
        {/* Slider dengan overflow hidden HANYA pada sumbu X */}
        <div style={{ overflowX: 'hidden', overflowY: 'visible' }}>
          <div className={`flex ${isMobile ? 'animate-slide-infinite' : 'animate-slide-infinite hover:pause-animation'}`}>
            {duplicated.map((tech, i) => {
              const Icon = TechIcons[tech.name];

              return (
                <div
                  key={`${tech.name}-${i}`}
                  className="flex-shrink-0 mx-2 sm:mx-4"
                  style={{ position: 'relative', zIndex: hovered === tech.name ? 9999 : 1 }}
                  onMouseEnter={() => !isMobile && setHovered(tech.name)}
                  onMouseLeave={() => !isMobile && setHovered(null)}
                  onClick={() => isMobile && setHovered(hovered === tech.name ? null : tech.name)}
                >
                  {/* CARD - Mobile Responsive */}
                  <div className={`${isMobile ? 'w-28 h-20' : 'w-40 h-32'} bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-sm border border-white/20 dark:border-gray-700/20 hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center p-3 sm:p-4 cursor-pointer hover:scale-105 hover:border-blue-300 dark:hover:border-blue-600`}>
                    <div className={`${isMobile ? 'w-8 h-8 mb-2' : 'w-12 h-12 mb-3'} flex items-center justify-center hover:scale-110 transition-transform`}>
                      {Icon ? (
                        <Icon className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'}`} />
                      ) : (
                        <span className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold`}>{tech.name.charAt(0)}</span>
                      )}
                    </div>
                    <h4 className={`font-semibold text-gray-900 dark:text-gray-100 text-center ${isMobile ? 'text-xs' : 'text-sm'} hover:text-blue-600 dark:hover:text-blue-400 transition-colors leading-tight`}>
                      {tech.name}
                    </h4>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FADE GRADIENTS - Mobile Responsive */}
        <div className={`absolute inset-y-0 left-0 ${isMobile ? 'w-12' : 'w-20'} bg-gradient-to-r from-slate-50 dark:from-slate-900 to-transparent pointer-events-none z-10`} />
        <div className={`absolute inset-y-0 right-0 ${isMobile ? 'w-12' : 'w-20'} bg-gradient-to-l from-slate-50 dark:from-slate-900 to-transparent pointer-events-none z-10`} />
      </div>

      {/* Mobile Tooltip Panel */}
      {isMobile && hovered && (
        <div className="mt-4 mx-4">
          <TooltipContentMobile 
            tech={techStack.find(t => t.name === hovered)!} 
            Icon={TechIcons[hovered]}
            onClose={() => setHovered(null)}
          />
        </div>
      )}

      {/* Desktop Tooltip Portal */}
      {!isMobile && hovered && (
        <div 
          className="fixed inset-0 pointer-events-none z-50"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <TooltipContentDesktop 
            tech={techStack.find(t => t.name === hovered)!} 
            Icon={TechIcons[hovered]}
            mousePosition={mousePosition}
          />
        </div>
      )}

      {/* STATS - Mobile Responsive */}
      <div className="mt-8 sm:mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-center">
        <StatsBlock label="Technologies" value={techStack.length} />
        <StatsBlock label="Advanced+" value={techStack.filter((t) => t.proficiency >= 4).length} highlight />
        <StatsBlock label="Avg Score" value={Math.round((techStack.reduce((s, t) => s + t.proficiency, 0) / techStack.length) * 10) / 10} />
        <StatsBlock label="Years Exp" value="2+" />
      </div>
    </>
  );
}

// Mobile Tooltip Component
function TooltipContentMobile({ tech, Icon, onClose }: { 
  tech: TechStack, 
  Icon?: React.ComponentType<{ className?: string }>,
  onClose: () => void
}) {
  const { text, bg, bar } = colorScale[tech.proficiency as keyof typeof colorScale];

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-xl shadow-xl backdrop-blur-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          {Icon && <Icon className="w-5 h-5" />}
          <h5 className="font-bold text-gray-900 dark:text-gray-100">{tech.name}</h5>
        </div>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1"
        >
          ✕
        </button>
      </div>

      <div className="space-y-3">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${bg} ${text}`}>
          {getProficiencyLevel(tech.proficiency)}
        </span>

        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
            <span>Proficiency</span>
            <span>{tech.proficiency}/5</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div style={{ width: `${(tech.proficiency / 5) * 100}%` }} className={`h-2 rounded-full ${bar}`} />
          </div>
        </div>

        <div className="flex justify-center space-x-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <span key={s} className={`w-2 h-2 rounded-full ${s <= tech.proficiency ? bar : 'bg-gray-300 dark:bg-gray-600'}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Desktop Tooltip Component
function TooltipContentDesktop({ tech, Icon, mousePosition }: { 
  tech: TechStack, 
  Icon?: React.ComponentType<{ className?: string }>,
  mousePosition: { x: number, y: number }
}) {
  const { text, bg, bar } = colorScale[tech.proficiency as keyof typeof colorScale];

  return (
    <div 
      className="absolute w-56 pointer-events-none"
      style={{
        left: `${mousePosition.x - 112}px`, // Center tooltip on cursor
        top: `${mousePosition.y - 150}px`,  // Position above cursor
        zIndex: 10000
      }}
    >
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-xl shadow-2xl backdrop-blur-sm">
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center space-x-2">
            {Icon && <Icon className="w-6 h-6" />}
            <h5 className="font-bold text-gray-900 dark:text-gray-100">{tech.name}</h5>
          </div>

          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${bg} ${text}`}>
            {getProficiencyLevel(tech.proficiency)}
          </span>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
              <span>Proficiency</span>
              <span>{tech.proficiency}/5</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div style={{ width: `${(tech.proficiency / 5) * 100}%` }} className={`h-2 rounded-full ${bar}`} />
            </div>
          </div>

          <div className="flex justify-center space-x-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <span key={s} className={`w-3 h-3 rounded-full ${s <= tech.proficiency ? bar : 'bg-gray-300 dark:bg-gray-600'}`} />
            ))}
          </div>
        </div>
        {/* Arrow */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-full -mt-1 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white dark:border-t-gray-800" />
      </div>
    </div>
  );
}

// Small helper component for the bottom stats - Mobile Responsive
function StatsBlock({ value, label, highlight = false }: { value: number | string; label: string; highlight?: boolean }) {
  return (
    <div className="space-y-1 sm:space-y-2 group cursor-pointer">
      <div
        className={`text-xl sm:text-2xl md:text-3xl font-bold transition-colors duration-300 group-hover:scale-110 transform ${
          highlight ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400'
        }`}
      >
        {value}
      </div>
      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{label}</div>
    </div>
  );
}