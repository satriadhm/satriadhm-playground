'use client';

import { useState, useCallback, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';
import { LifeEvent } from '@/types';

interface LifeJourneyModalProps {
  selectedEvent: LifeEvent | null;
  onClose: () => void;
  getTypeIcon: (type: LifeEvent['type']) => JSX.Element;
  formatRating: (rating: number) => string;
}

export default function LifeJourneyModal({
  selectedEvent,
  onClose,
  getTypeIcon,
  formatRating
}: LifeJourneyModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(false);

  const nextImage = useCallback(() => {
    if (selectedEvent) {
      setImageLoading(true);
      setCurrentImageIndex((prev) => (prev + 1) % selectedEvent.images.length);
    }
  }, [selectedEvent]);

  const prevImage = useCallback(() => {
    if (selectedEvent) {
      setImageLoading(true);
      setCurrentImageIndex((prev) => (prev - 1 + selectedEvent.images.length) % selectedEvent.images.length);
    }
  }, [selectedEvent]);

  const jumpToImage = useCallback((index: number) => {
    if (selectedEvent) {
      setImageLoading(true);
      setCurrentImageIndex(index);
    }
  }, [selectedEvent]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!selectedEvent) return;

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          prevImage();
          break;
        case 'ArrowRight':
          event.preventDefault();
          nextImage();
          break;
        case 'Escape':
          event.preventDefault();
          onClose();
          break;
        case 'Home':
          event.preventDefault();
          setCurrentImageIndex(0);
          break;
        case 'End':
          event.preventDefault();
          if (selectedEvent) {
            setCurrentImageIndex(selectedEvent.images.length - 1);
          }
          break;
      }
    };

    if (selectedEvent) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedEvent, prevImage, nextImage, onClose]);

  // Reset image index when modal opens
  useEffect(() => {
    if (selectedEvent) {
      setCurrentImageIndex(0);
    }
  }, [selectedEvent?.id]);

  if (!selectedEvent) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-2 md:p-4">
      <div className="bg-gray-900 rounded-lg max-w-7xl w-full max-h-[95vh] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white">{selectedEvent.title}</h2>
            <div className="flex items-center space-x-4 text-gray-400 text-sm mt-1">
              <div className="flex items-center space-x-1">
                <Star className="text-yellow-400 fill-current" size={14} />
                <span className="text-white font-semibold">{formatRating(selectedEvent.rating)}</span>
              </div>
              <span>{selectedEvent.location}</span>
              <span>{selectedEvent.year}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid lg:grid-cols-3 gap-6 p-6">
            {/* Main Image Display */}
            <div className="lg:col-span-2 space-y-4">
              {/* Current Image */}
              <div className="relative bg-black rounded-lg overflow-hidden">
                <div className="relative h-64 md:h-96">
                  {/* Loading overlay */}
                  {imageLoading && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                      <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent"></div>
                    </div>
                  )}
                  
                  <Image
                    src={selectedEvent.images[currentImageIndex]}
                    alt={`${selectedEvent.title} - Image ${currentImageIndex + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 66vw"
                    priority
                    onLoadingComplete={() => setImageLoading(false)}
                    onLoad={() => setImageLoading(false)}
                  />
                  
                  {/* Navigation Arrows */}
                  {selectedEvent.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
                        disabled={imageLoading}
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
                        disabled={imageLoading}
                      >
                        <ChevronRight size={24} />
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  <div className="absolute top-2 right-2 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {currentImageIndex + 1} / {selectedEvent.images.length}
                  </div>
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white">Gallery ({selectedEvent.images.length} photos)</h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 max-h-40 overflow-y-auto rounded-lg bg-gray-800/30 p-2">
                  {selectedEvent.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => jumpToImage(index)}
                      disabled={imageLoading}
                      className={`relative aspect-square overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50 ${
                        index === currentImageIndex 
                          ? 'ring-3 ring-red-500 opacity-100 scale-105' 
                          : 'opacity-70 hover:opacity-100'
                      } ${imageLoading ? 'pointer-events-none' : ''}`}
                    >
                      <Image
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 25vw, (max-width: 768px) 20vw, 10vw"
                      />
                      {index === currentImageIndex && (
                        <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                          <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg"></div>
                        </div>
                      )}
                      
                      {/* Thumbnail number */}
                      <div className="absolute top-1 left-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                        {index + 1}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Event Details Sidebar */}
            <div className="space-y-6">
              {/* Event Info */}
              <div className="bg-gray-800/50 p-4 rounded-lg space-y-3">
                <div className="flex items-center space-x-2 text-gray-300">
                  {getTypeIcon(selectedEvent.type)}
                  <span className="text-sm">{selectedEvent.category}</span>
                </div>
                
                <h4 className="font-semibold text-white text-lg">{selectedEvent.subtitle}</h4>
                
                {selectedEvent.highlight && (
                  <span className="inline-block bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">
                    ✨ TRENDING
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="space-y-3">
                <h4 className="text-lg font-bold text-white">About This Experience</h4>
                <div className="bg-gray-800/30 p-4 rounded-lg">
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {selectedEvent.description}
                  </p>
                </div>
              </div>

              {/* Quick Navigation */}
              <div className="space-y-3">
                <h4 className="text-lg font-bold text-white">Quick Navigation</h4>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setCurrentImageIndex(0)}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded text-xs transition-colors"
                  >
                    First
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex(Math.floor(selectedEvent.images.length / 2))}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded text-xs transition-colors"
                  >
                    Middle
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex(selectedEvent.images.length - 1)}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded text-xs transition-colors"
                  >
                    Last
                  </button>
                </div>
              </div>

              {/* Current Image Info */}
              <div className="bg-gray-800/30 p-4 rounded-lg">
                <h5 className="font-semibold text-white mb-2">Current Image</h5>
                <div className="text-sm text-gray-400 space-y-1">
                  <div>Photo {currentImageIndex + 1} of {selectedEvent.images.length}</div>
                  <div className="text-xs opacity-75">
                    Use arrow keys or click thumbnails to navigate
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t border-gray-700 p-4 bg-gray-800/50">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
              <span className="flex items-center space-x-1">
                <span className="bg-gray-700 px-2 py-1 rounded">←</span>
                <span className="bg-gray-700 px-2 py-1 rounded">→</span>
                <span>Navigate</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="bg-gray-700 px-2 py-1 rounded">ESC</span>
                <span>Close</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="bg-gray-700 px-2 py-1 rounded">Home</span>
                <span>/</span>
                <span className="bg-gray-700 px-2 py-1 rounded">End</span>
                <span>First/Last</span>
              </span>
            </div>
            <button
              onClick={onClose}
              className="bg-red-600/80 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium backdrop-blur-sm"
            >
              Close Gallery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}