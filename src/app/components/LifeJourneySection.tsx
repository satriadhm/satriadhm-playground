'use client';

import { useState } from 'react';
import { Play, Info, Star, ChevronLeft, ChevronRight, X, Plane, Mountain, Camera, Music, Heart, Camera as PhotoIcon } from 'lucide-react';
import Image from 'next/image';
import { lifeEvents } from '@/constants/data';
import { LifeEvent } from '@/types';


const categories = [
  'Trending Now',
  'Spanish Chronicles',
  'Euro Adventures', 
  'Summer Escapes',
  'Cultural Moments',
  'Musical Performances'
];

export default function LifeJourneySection() {
  const [selectedEvent, setSelectedEvent] = useState<LifeEvent | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [heroEvent, setHeroEvent] = useState<LifeEvent>(lifeEvents[0]);
  const [clickCount, setClickCount] = useState(0);

  const getEventsByCategory = (category: string) => {
    if (category === 'Trending Now') {
      return lifeEvents.filter(event => event.highlight).slice(0, 6);
    }
    return lifeEvents.filter(event => event.category === category);
  };

  const nextImage = () => {
    if (selectedEvent) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedEvent.images.length);
    }
  };

  const prevImage = () => {
    if (selectedEvent) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedEvent.images.length) % selectedEvent.images.length);
    }
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
        setCurrentImageIndex(0);
        setClickCount(0);
      }
    } else {
      setHeroEvent(event);
      setClickCount(0);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white" style={{ zIndex: 1 }}>
      <div className="relative z-10  ">
        <div className="flex items-center justify-center px-4 py-6">
          <h1 className="text-red-600 text-2xl md:text-3xl font-bold">SATRIAFLIX</h1>
        </div>
      </div>

      <div className="relative h-screen overflow-hidden" style={{ marginTop: '-80px' }}>
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

        {/* Hero Content - Positioned to the left */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-2xl mx-auto px-4 md:px-8 py-20 ml-8">
            <div className="space-y-4 md:space-y-6">
              {/* Category Badge */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-red-600 text-white px-3 py-1 rounded text-xs md:text-sm font-bold">
                  SATRIAFLIX SERIES
                </span>
                <div className="flex items-center space-x-2 text-gray-300">
                  {getTypeIcon(heroEvent.type)}
                  <span className="text-xs md:text-sm">{heroEvent.category}</span>
                </div>
                {heroEvent.highlight && (
                  <span className="bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">
                    TRENDING
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                {heroEvent.title}
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-red-400 font-medium">
                {heroEvent.subtitle}
              </p>

              {/* Rating */}
              <div className="flex items-center space-x-2 text-gray-300 text-sm md:text-base">
                <div className="flex items-center space-x-2">
                  <Star className="text-yellow-400 fill-current" size={16} />
                  <span className="text-white font-semibold">{formatRating(heroEvent.rating)}</span>
                </div>
                <span>{heroEvent.location}</span>
              </div>

              {/* Description - Shortened */}
              <p className="text-base md:text-lg text-gray-200 leading-relaxed line-clamp-2">
                {heroEvent.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-4">
                <button
                  onClick={() => handleEventClick(heroEvent)}
                  className="flex items-center justify-center space-x-3 bg-white text-black px-6 md:px-8 py-3 rounded font-bold hover:bg-gray-200 transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                >
                  <Play size={18} fill="currentColor" />
                  <span>Watch Now</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedEvent(heroEvent);
                    setCurrentImageIndex(0);
                  }}
                  className="flex items-center justify-center space-x-3 bg-gray-700/80 text-white px-6 md:px-8 py-3 rounded font-bold hover:bg-gray-600 transition-all duration-300 hover:scale-105 backdrop-blur-sm w-full sm:w-auto"
                >
                  <Info size={18} />
                  <span>More Info</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Rows */}
      <div className="relative z-20 -mt-32 pb-20">
        {categories.map((category) => {
          const categoryEvents = getEventsByCategory(category);
          if (categoryEvents.length === 0) return null;

          return (
            <div key={category} className="mb-16">
              <div className="px-4 md:px-8 mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-white">{category}</h2>
              </div>
              
              <div className="px-4 md:px-8">
                <div className="flex space-x-3 md:space-x-4 overflow-x-auto scrollbar-hide pb-4">
                  {categoryEvents.map((event, index) => (
                    <div
                      key={event.id}
                      className="flex-shrink-0 w-64 md:w-80 cursor-pointer group transform hover:scale-105 transition-all duration-300"
                      onClick={() => handleEventClick(event)}
                      style={{
                        animationDelay: `${index * 0.1}s`
                      }}
                    >
                      <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                        <div className="relative aspect-video">
                          <Image
                            src={event.images[0]}
                            alt={event.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                            sizes="(max-width: 768px) 256px, 320px"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                        
                        {/* Rating Badge */}
                        <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm px-2 py-1 rounded text-xs md:text-sm font-bold">
                          <div className="flex items-center space-x-1">
                            <Star className="text-yellow-400 fill-current" size={12} />
                            <span>{formatRating(event.rating)}</span>
                          </div>
                        </div>

                        {/* Year Badge */}
                        <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                          {event.year}
                        </div>

                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 md:p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                            <Play size={24} className="text-white fill-current md:w-8 md:h-8" />
                          </div>
                        </div>

                        {/* Bottom Info */}
                        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-gradient-to-t from-black/90 to-transparent">
                          <h3 className="text-white font-bold text-sm md:text-lg leading-tight group-hover:text-red-400 transition-colors mb-1">
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

      {/* Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-2 md:p-4">
          <div className="bg-gray-900 rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="relative">
              <div className="relative h-48 md:h-80 overflow-hidden rounded-t-lg">
                <Image
                  src={selectedEvent.images[currentImageIndex]}
                  alt={selectedEvent.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 1000px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                
                {/* Image Navigation */}
                {selectedEvent.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-colors"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-colors"
                    >
                      <ChevronRight size={20} />
                    </button>
                    
                    {/* Image Indicators */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {selectedEvent.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-2 md:top-4 right-2 md:right-4 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content - Simplified */}
            <div className="p-4 md:p-6 space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="space-y-3 flex-1">
                  <h2 className="text-xl md:text-2xl font-bold text-white">{selectedEvent.title}</h2>
                  <div className="flex items-center space-x-4 text-gray-400 text-sm">
                    <div className="flex items-center space-x-1">
                      <Star className="text-yellow-400 fill-current" size={14} />
                      <span className="text-white font-semibold">{formatRating(selectedEvent.rating)}</span>
                    </div>
                    <span>{selectedEvent.location}</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                {selectedEvent.description}
              </p>

              {/* Image Gallery */}
              {selectedEvent.images.length > 1 && (
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">Gallery</h3>
                  <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                    {selectedEvent.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative aspect-video overflow-hidden rounded transition-all duration-300 hover:scale-105 ${
                          index === currentImageIndex ? 'ring-2 ring-red-500' : ''
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`${selectedEvent.title} ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="120px"
                        />
                        {index === currentImageIndex && (
                          <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                            <Play size={16} className="text-white fill-current" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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