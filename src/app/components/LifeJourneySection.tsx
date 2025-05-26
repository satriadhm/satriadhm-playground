'use client';

import { useState } from 'react';
import { Play, Info, Star, Plane, Mountain, Camera, Music, Heart, Camera as PhotoIcon } from 'lucide-react';
import Image from 'next/image';
import { categories, lifeEvents } from '@/constants/data';
import { LifeEvent } from '@/types';
import LifeJourneyModal from './LifeJourneyModal';



export default function LifeJourneySection() {
  const [selectedEvent, setSelectedEvent] = useState<LifeEvent | null>(null);
  const [heroEvent, setHeroEvent] = useState<LifeEvent>(lifeEvents[0]);
  const [clickCount, setClickCount] = useState(0);

  const getEventsByCategory = (category: string) => {
    if (category === 'Trending Now') {
      return lifeEvents.filter(event => event.highlight).slice(0, 6);
    }
    return lifeEvents.filter(event => event.category === category);
  };

  const getTypeIcon = (type: LifeEvent['type']) => {
    switch (type) {
      case 'travel':
        return <Plane size={16} />;
      case 'cultural':
        return <Heart size={16} />;
      case 'adventure':
        return <Mountain size={16} />;
      case 'music':
        return <Music size={16} />;
      case 'lifestyle':
        return <Camera size={16} />;
      default:
        return <PhotoIcon size={16} />;
    }
  };

  const formatRating = (rating: number) => {
    return `${rating}/10`;
  };

  const handleEventClick = (event: LifeEvent) => {
    if (heroEvent.id === event.id) {
      setClickCount(prev => prev + 1);
      if (clickCount >= 1) {
        setSelectedEvent(event);
        setClickCount(0);
      }
    } else {
      setHeroEvent(event);
      setClickCount(0);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white" style={{ zIndex: 1 }}>
      {/* Header - Mobile Responsive */}
      <div className="relative z-10">
        <div className="flex items-center justify-center px-4 py-4 sm:py-6">
          <h1 className="text-red-600 text-xl sm:text-2xl md:text-3xl font-bold">SATRIAFLIX</h1>
        </div>
      </div>

      {/* Hero Section - Mobile Responsive */}
      <div className="relative h-[70vh] sm:h-screen overflow-hidden" style={{ marginTop: '-60px' }}>
        <div className="absolute inset-0">
          <Image
            src={heroEvent.images[0]}
            alt={heroEvent.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
        </div>

        {/* Hero Content - Mobile Responsive */}
        <div className="relative z-10 h-full flex items-end sm:items-center">
          <div className="max-w-2xl mx-auto px-4 sm:px-8 py-12 sm:py-20 ml-4 sm:ml-8">
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              {/* Category Badges - Mobile Responsive */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="bg-red-600 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-bold">
                  SATRIAFLIX SERIES
                </span>
                <div className="flex items-center space-x-1 sm:space-x-2 text-gray-300">
                  {getTypeIcon(heroEvent.type)}
                  <span className="text-xs sm:text-sm">{heroEvent.category}</span>
                </div>
                {heroEvent.highlight && (
                  <span className="bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">
                    TRENDING
                  </span>
                )}
              </div>

              {/* Title - Mobile Responsive */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                {heroEvent.title}
              </h1>

              {/* Subtitle - Mobile Responsive */}
              <p className="text-base sm:text-lg md:text-xl text-red-400 font-medium">
                {heroEvent.subtitle}
              </p>

              {/* Rating - Mobile Responsive */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-gray-300 text-sm sm:text-base">
                <div className="flex items-center space-x-2">
                  <Star className="text-yellow-400 fill-current" size={16} />
                  <span className="text-white font-semibold">{formatRating(heroEvent.rating)}</span>
                </div>
                <span>{heroEvent.location}</span>
              </div>

              {/* Description - Mobile Responsive */}
              <p className="text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed line-clamp-2 sm:line-clamp-3">
                {heroEvent.description}
              </p>

              {/* Action Buttons - Mobile Responsive */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-2 sm:pt-4">
                <button
                  onClick={() => handleEventClick(heroEvent)}
                  className="flex items-center justify-center space-x-2 sm:space-x-3 bg-white text-black px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded font-bold hover:bg-gray-200 transition-all duration-300 hover:scale-105 w-full sm:w-auto text-sm sm:text-base"
                >
                  <Play size={16} fill="currentColor" />
                  <span>Watch Now</span>
                </button>
                <button
                  onClick={() => setSelectedEvent(heroEvent)}
                  className="flex items-center justify-center space-x-2 sm:space-x-3 bg-gray-700/80 text-white px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded font-bold hover:bg-gray-600 transition-all duration-300 hover:scale-105 backdrop-blur-sm w-full sm:w-auto text-sm sm:text-base"
                >
                  <Info size={16} />
                  <span>More Info</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Categories - Mobile Responsive */}
      <div className="relative z-20 -mt-16 sm:-mt-32 pb-12 sm:pb-20">
        {categories.map((category) => {
          const categoryEvents = getEventsByCategory(category);
          if (categoryEvents.length === 0) return null;

          return (
            <div key={category} className="mb-8 sm:mb-16">
              <div className="px-4 sm:px-8 mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">{category}</h2>
              </div>
              
              <div className="px-4 sm:px-8">
                <div className="flex space-x-2 sm:space-x-3 md:space-x-4 overflow-x-auto scrollbar-hide pb-4">
                  {categoryEvents.map((event, index) => (
                    <div
                      key={event.id}
                      className="flex-shrink-0 w-48 sm:w-64 md:w-80 cursor-pointer group transform hover:scale-105 transition-all duration-300"
                      onClick={() => handleEventClick(event)}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                        <div className="relative aspect-video">
                          <Image
                            src={event.images[0]}
                            alt={event.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                            sizes="(max-width: 640px) 192px, (max-width: 768px) 256px, 320px"
                          />
                        </div>
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                        
                        {/* Rating Badge - Mobile Responsive */}
                        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-black/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold">
                          <div className="flex items-center space-x-1">
                            <Star className="text-yellow-400 fill-current" size={10} />
                            <span>{formatRating(event.rating)}</span>
                          </div>
                        </div>

                        {/* Year Badge - Mobile Responsive */}
                        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                          {event.year}
                        </div>

                        {/* Play Button Overlay - Mobile Responsive */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 sm:p-3 md:p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                            <Play size={20} className="text-white fill-current sm:w-6 sm:h-6 md:w-8 md:h-8" />
                          </div>
                        </div>

                        {/* Bottom Info - Mobile Responsive */}
                        <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 bg-gradient-to-t from-black/90 to-transparent">
                          <h3 className="text-white font-bold text-sm sm:text-base md:text-lg leading-tight group-hover:text-red-400 transition-colors mb-1">
                            {event.title}
                          </h3>
                          <div className="flex items-center space-x-2 text-gray-300 text-xs">
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Component */}
      <LifeJourneyModal
        selectedEvent={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        getTypeIcon={getTypeIcon}
        formatRating={formatRating}
      />

      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}