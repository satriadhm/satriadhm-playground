'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageSliderProps {
  images: string[];
  compact?: boolean;
}

interface ImageDimensions {
  width: number;
  height: number;
  aspectRatio: number;
  orientation: 'landscape' | 'portrait' | 'square';
}

export default function ImageSlider({ images, compact = false }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageDimensions, setImageDimensions] = useState<ImageDimensions[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load image dimensions
  useEffect(() => {
    const loadImageDimensions = async () => {
      const dimensions: ImageDimensions[] = [];
      
      for (const imageUrl of images) {
        try {
          const img = new window.Image();
          img.src = imageUrl;
          
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
          });
          
          const aspectRatio = img.naturalWidth / img.naturalHeight;
          const orientation = aspectRatio > 1.2 ? 'landscape' : aspectRatio < 0.8 ? 'portrait' : 'square';
          
          dimensions.push({
            width: img.naturalWidth,
            height: img.naturalHeight,
            aspectRatio,
            orientation
          });
        } catch {
          // Fallback for failed images
          dimensions.push({
            width: 1200,
            height: 800,
            aspectRatio: 1.5,
            orientation: 'landscape'
          });
        }
      }
      
      setImageDimensions(dimensions);
      setIsLoading(false);
    };

    if (images.length > 0) {
      loadImageDimensions();
    }
  }, [images]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  if (images.length === 0) return null;

  const currentImageDim = imageDimensions[currentIndex];
  const isPortrait = currentImageDim?.orientation === 'portrait';
  const isSquare = currentImageDim?.orientation === 'square';

  // Dynamic aspect ratio based on image orientation
  const getAspectRatioClass = () => {
    if (isLoading) return 'aspect-video';
    
    // For compact mode, use smart aspect ratios that fill the frame better
    if (compact) {
      if (isPortrait) return 'aspect-[3/4]'; // Taller for portrait images
      if (isSquare) return 'aspect-square';
      return 'aspect-video'; // 16:9 for landscape
    }
    
    // Standard mode - use actual ratios
    if (isPortrait) return 'aspect-[3/4]';
    if (isSquare) return 'aspect-square';
    return 'aspect-video';
  };

  // Compact size classes
  const getContainerClasses = () => {
    const baseClasses = "relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden group";
    if (compact) {
      // Responsive width with max constraint, let height be determined by aspect ratio
      return `${baseClasses} max-w-md w-full mx-auto`;
    }
    return baseClasses;
  };

  return (
    <div className="relative">
      {/* Main Image */}
      <div className={`${getContainerClasses()} ${getAspectRatioClass()}`}>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            <Image
              src={images[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              fill
              className="object-cover"
              sizes={compact ? "(max-width: 768px) 100vw, 448px" : "(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw"}
              quality={85}
            />
          </>
        )}
        
        {/* Navigation Arrows - Only show when multiple images */}
        {images.length > 1 && !isLoading && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
              aria-label="Previous image"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
              aria-label="Next image"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && !isLoading && (
          <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs font-medium">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Navigation - More compact */}
      {images.length > 1 && !isLoading && (
        <div className="flex space-x-2 mt-3 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((image, index) => {
            const thumbDim = imageDimensions[index];
            const thumbIsPortrait = thumbDim?.orientation === 'portrait';
            
            return (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`flex-shrink-0 ${thumbIsPortrait ? 'w-12 h-16' : 'w-16 h-12'} rounded-md overflow-hidden border-2 transition-all relative hover:scale-105 ${
                  index === currentIndex
                    ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                }`}
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </button>
            );
          })}
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