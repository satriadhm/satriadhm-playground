'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageSliderProps {
  images: string[];
  compact?: boolean;
  modalMode?: boolean; // New prop for modal usage
}

interface ImageDimensions {
  width: number;
  height: number;
  aspectRatio: number;
  orientation: 'landscape' | 'portrait' | 'square';
}

export default function ImageSlider({ images, compact = false, modalMode = false }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageDimensions, setImageDimensions] = useState<ImageDimensions[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [validImages, setValidImages] = useState<string[]>([]);

  // Check if images exist and filter valid ones
  useEffect(() => {
    const checkImages = async () => {
      // For development/demo purposes, assume all provided images are valid
      // In production, you might want to actually check the files
      setValidImages(images);
    };

    if (images.length > 0) {
      checkImages();
    }
  }, [images]);

  // Load image dimensions for valid images
  useEffect(() => {
    const loadImageDimensions = async () => {
      if (validImages.length === 0) {
        setIsLoading(false);
        return;
      }

      const dimensions: ImageDimensions[] = [];
      
      for (const imageUrl of validImages) {
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

    loadImageDimensions();
  }, [validImages]);

  const nextImage = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentIndex((prev) => (prev + 1) % validImages.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
  };

  const goToImage = (index: number, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentIndex(index);
  };

  // Don't render if no valid images
  if (validImages.length === 0) return null;

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

  // Container classes with modal-specific styling
  const getContainerClasses = () => {
    const baseClasses = "relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden group";
    
    if (modalMode) {
      // Modal mode - full width with constrained height
      return `${baseClasses} w-full max-h-96`;
    }
    
    if (compact) {
      // Responsive width with max constraint, let height be determined by aspect ratio
      return `${baseClasses} max-w-md w-full mx-auto`;
    }
    return baseClasses;
  };

  // Handle click events differently in modal mode
  const handleImageClick = (e: React.MouseEvent) => {
    if (modalMode) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div className={modalMode ? "relative" : "relative"} onClick={handleImageClick}>
      {/* Main Image */}
      <div className={`${getContainerClasses()} ${!modalMode ? getAspectRatioClass() : ''}`}>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            <Image
              src={validImages[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              fill
              className="object-cover"
              sizes={
                modalMode 
                  ? "100vw" 
                  : compact 
                    ? "(max-width: 768px) 100vw, 448px" 
                    : "(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw"
              }
              quality={85}
              priority={currentIndex === 0}
            />
          </>
        )}
        
        {/* Navigation Arrows - Only show when multiple images */}
        {validImages.length > 1 && !isLoading && (
          <>
            <button
              onClick={prevImage}
              className={`absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 hover:scale-110 ${
                modalMode ? 'z-10' : ''
              }`}
              aria-label="Previous image"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextImage}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 hover:scale-110 ${
                modalMode ? 'z-10' : ''
              }`}
              aria-label="Next image"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {/* Image Counter */}
        {validImages.length > 1 && !isLoading && (
          <div className={`absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs font-medium ${
            modalMode ? 'z-10' : ''
          }`}>
            {currentIndex + 1} / {validImages.length}
          </div>
        )}
      </div>

      {/* Thumbnail Navigation - More compact and modal-aware */}
      {validImages.length > 1 && !modalMode && (
        <div className="flex space-x-2 mt-3 overflow-x-auto pb-2 scrollbar-hide">
          {validImages.map((image, index) => {
            const thumbDim = imageDimensions[index];
            const thumbIsPortrait = thumbDim?.orientation === 'portrait';
            
            return (
              <button
                key={index}
                onClick={(e) => goToImage(index, e)}
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

      {modalMode && validImages.length > 1 && (
        <div className="flex justify-center space-x-2 mt-4">
          {validImages.map((_, index) => (
            <button
              key={index}
              onClick={(e) => goToImage(index, e)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex
                  ? 'bg-blue-500'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
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