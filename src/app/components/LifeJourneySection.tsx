'use client';

import { useState } from 'react';
import { Play, Info, Star, Calendar, MapPin, Camera, Music, Heart, ChevronLeft, ChevronRight, X, Plane, Mountain, Camera as PhotoIcon } from 'lucide-react';
import Image from 'next/image';

interface LifeEvent {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  location: string;
  type: 'travel' | 'cultural' | 'adventure' | 'music' | 'lifestyle';
  images: string[];
  rating: number;
  duration: string;
  category: string;
  highlight?: boolean;
  trailer?: string;
}

const lifeEvents: LifeEvent[] = [
  {
    id: 'granada-life-2024',
    year: '2024',
    title: 'Granada Chronicles',
    subtitle: 'Living the Andalusian Dream as an Exchange Student',
    description: 'An immersive documentary series following my daily life in the enchanting city of Granada, Spain. From morning coffee at local cafés to evening strolls through the historic Albaicín, experience the authentic Spanish lifestyle through the eyes of an international student discovering flamenco, tapas culture, and lifelong friendships.',
    location: 'Granada, Spain',
    type: 'lifestyle',
    images: [
      '/images/journey/granada-life-hero.jpg',
      '/images/journey/granada-morning-coffee.jpg',
      '/images/journey/granada-alhambra-sunset.jpg',
      '/images/journey/granada-tapas-night.jpg',
      '/images/journey/granada-flamenco-show.jpg',
      '/images/journey/granada-friends-plaza.jpg',
      '/images/journey/granada-university-life.jpg',
      '/images/journey/granada-albaicin-walk.jpg'
    ],
    rating: 9.8,
    duration: '5 months',
    category: 'Spanish Chronicles',
    highlight: true
  },
  {
    id: 'culturise-granada-2024',
    year: '2024',
    title: 'Culturise: St.Cruz Stories',
    subtitle: 'Cultural Fusion at Granada\'s International Dormitory',
    description: 'A vibrant cultural celebration series documenting the incredible Culturise event at St.Cruz dormitory. Watch as students from around the world unite to share their heritage through food, music, dance, and traditions. This heartwarming series captures the magic of international friendship and cultural exchange.',
    location: 'St.Cruz Dorm, Granada',
    type: 'cultural',
    images: [
      '/images/journey/culturise-hero.jpg',
      '/images/journey/culturise-preparation.jpg',
      '/images/journey/culturise-indonesian-booth.jpg',
      '/images/journey/culturise-international-food.jpg',
      '/images/journey/culturise-traditional-dance.jpg',
      '/images/journey/culturise-group-photo.jpg',
      '/images/journey/culturise-night-celebration.jpg'
    ],
    rating: 9.5,
    duration: '3 days event',
    category: 'Cultural Moments',
    highlight: true
  },
  {
    id: 'asean-night-2024',
    year: '2024',
    title: 'ASEAN Night: The Performance',
    subtitle: 'Rocking the Stage with My Band in Granada',
    description: 'A concert documentary capturing an unforgettable night where music transcended borders. Follow the behind-the-scenes preparation, nervous energy, and electrifying performance as my band takes the stage at ASEAN Night, bringing Indonesian rhythms to Spanish audiences and creating magical cross-cultural moments.',
    location: 'Granada, Spain',
    type: 'music',
    images: [
      '/images/journey/asean-night-hero.jpg',
      '/images/journey/asean-night-rehearsal.jpg',
      '/images/journey/asean-night-backstage.jpg',
      '/images/journey/asean-night-performance.jpg',
      '/images/journey/asean-night-crowd.jpg',
      '/images/journey/asean-night-band-photo.jpg',
      '/images/journey/asean-night-celebration.jpg'
    ],
    rating: 9.7,
    duration: '1 epic night',
    category: 'Musical Performances',
    highlight: true
  },
  {
    id: 'paris-adventure-2024',
    year: '2024',
    title: 'Paris in One Day',
    subtitle: 'The Ultimate Parisian Adventure from Dawn to Dusk',
    description: 'An ambitious travel documentary following an incredible 24-hour journey through the City of Light. From sunrise at the Eiffel Tower to midnight along the Seine, experience the whirlwind adventure of seeing Paris\' greatest treasures, tasting authentic French cuisine, and falling in love with the city\'s timeless charm in just one perfect day.',
    location: 'Paris, France',
    type: 'travel',
    images: [
      '/images/journey/paris-hero.jpg',
      '/images/journey/paris-eiffel-sunrise.jpg',
      '/images/journey/paris-louvre-museum.jpg',
      '/images/journey/paris-notre-dame.jpg',
      '/images/journey/paris-cafe-breakfast.jpg',
      '/images/journey/paris-seine-sunset.jpg',
      '/images/journey/paris-montmartre.jpg'
    ],
    rating: 9.4,
    duration: '24 hours',
    category: 'Euro Adventures',
    highlight: true
  },
  {
    id: 'austria-adventure-2024',
    year: '2024',
    title: 'Austrian Alpine Magic',
    subtitle: 'One Day in Austria\'s Breathtaking Landscapes',
    description: 'A stunning visual journey through Austria\'s magnificent alpine scenery and charming villages. This travel special captures the essence of Austrian culture, from traditional coffee houses in Salzburg to panoramic mountain views, showcasing why Austria remains one of Europe\'s most enchanting destinations.',
    location: 'Austria',
    type: 'adventure',
    images: [
      '/images/journey/austria-hero.jpg',
      '/images/journey/austria-salzburg-old-town.jpg',
      '/images/journey/austria-alpine-views.jpg',
      '/images/journey/austria-traditional-cafe.jpg',
      '/images/journey/austria-mountain-lake.jpg',
      '/images/journey/austria-village-charm.jpg'
    ],
    rating: 9.2,
    duration: '1 day',
    category: 'Euro Adventures'
  },
  {
    id: 'interlaken-adventure-2024',
    year: '2024',
    title: 'Swiss Paradise: Interlaken',
    subtitle: 'Adventure Capital of Switzerland in 24 Hours',
    description: 'An adrenaline-pumping adventure series set in the heart of the Swiss Alps. Experience the thrill of paragliding over turquoise lakes, exploring charming mountain villages, and witnessing some of the most spectacular alpine scenery on Earth. This high-octane travel special captures the essence of Swiss adventure tourism.',
    location: 'Interlaken, Switzerland',
    type: 'adventure',
    images: [
      '/images/journey/interlaken-hero.jpg',
      '/images/journey/interlaken-paragliding.jpg',
      '/images/journey/interlaken-lake-view.jpg',
      '/images/journey/interlaken-jungfrau.jpg',
      '/images/journey/interlaken-village.jpg',
      '/images/journey/interlaken-adventure-sports.jpg'
    ],
    rating: 9.6,
    duration: '1 action-packed day',
    category: 'Euro Adventures',
    highlight: true
  },
  {
    id: 'munich-adventure-2024',
    year: '2024',
    title: 'Munich Memories',
    subtitle: 'Bavarian Culture and City Charm in One Day',
    description: 'A delightful cultural exploration of Munich\'s rich Bavarian heritage. From traditional beer gardens and historic architecture to modern city life, this travel documentary showcases the perfect blend of old and new that makes Munich uniquely charming. Experience authentic German culture, delicious cuisine, and warm Bavarian hospitality.',
    location: 'Munich, Germany',
    type: 'cultural',
    images: [
      '/images/journey/munich-hero.jpg',
      '/images/journey/munich-marienplatz.jpg',
      '/images/journey/munich-beer-garden.jpg',
      '/images/journey/munich-neuschwanstein.jpg',
      '/images/journey/munich-old-town.jpg',
      '/images/journey/munich-traditional-food.jpg'
    ],
    rating: 8.9,
    duration: '1 cultural day',
    category: 'Euro Adventures'
  },
  {
    id: 'milan-summer-2024',
    year: '2024',
    title: 'Milan Summer Vibes',
    subtitle: 'Fashion Capital Adventures Under the Italian Sun',
    description: 'A stylish summer adventure through Milan\'s fashion districts, hidden gems, and vibrant neighborhoods. This travel series captures the essence of Italian summer living, from morning espresso rituals to evening aperitivo culture, showcasing Milan beyond its reputation as just a fashion capital.',
    location: 'Milan, Italy',
    type: 'lifestyle',
    images: [
      '/images/journey/milan-hero.jpg',
      '/images/journey/milan-duomo-cathedral.jpg',
      '/images/journey/milan-fashion-district.jpg',
      '/images/journey/milan-aperitivo-time.jpg',
      '/images/journey/milan-brera-district.jpg',
      '/images/journey/milan-summer-streets.jpg'
    ],
    rating: 9.1,
    duration: '3 summer days',
    category: 'Summer Escapes',
    highlight: true
  },
  {
    id: 'lake-como-summer-2024',
    year: '2024',
    title: 'Lake Como Dreams',
    subtitle: 'Italian Riviera Paradise and Luxury Living',
    description: 'A breathtaking summer escape to one of Italy\'s most romantic destinations. This luxury travel series showcases the stunning beauty of Lake Como, from villa gardens and boat rides to lakeside dining and sunset views that inspired countless films and captured hearts worldwide.',
    location: 'Lake Como, Italy',
    type: 'travel',
    images: [
      '/images/journey/como-hero.jpg',
      '/images/journey/como-boat-ride.jpg',
      '/images/journey/como-villa-gardens.jpg',
      '/images/journey/como-bellagio-town.jpg',
      '/images/journey/como-sunset-dinner.jpg',
      '/images/journey/como-mountain-views.jpg',
      '/images/journey/como-luxury-hotels.jpg'
    ],
    rating: 9.8,
    duration: '2 dream days',
    category: 'Summer Escapes',
    highlight: true
  }
];

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
  const [isPlaying, setIsPlaying] = useState(false);

  // Hero event (most recent/highlighted)
  const heroEvent = lifeEvents.find(event => event.id === 'granada-life-2024') || lifeEvents[0];

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

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Netflix Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/90 to-transparent backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 md:px-8 py-4">
          <div className="flex items-center space-x-4 md:space-x-8">
            <h1 className="text-red-600 text-2xl md:text-3xl font-bold">SATRIAFLIX</h1>
            <nav className="hidden lg:flex space-x-6">
              <span className="text-white font-medium">My Journey</span>
              <span className="text-gray-300 hover:text-white transition-colors cursor-pointer">Professional</span>
              <span className="text-gray-300 hover:text-white transition-colors cursor-pointer">Education</span>
              <span className="text-gray-300 hover:text-white transition-colors cursor-pointer">Achievements</span>
            </nav>
          </div>
          <div className="hidden md:block text-xs md:text-sm text-gray-300">
            🧙‍♂️ &quot;There and Back Again: A Software Engineer&apos;s Tale&quot;
          </div>
          <button className="md:hidden text-white p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        {/* Hero Background */}
        <div className="absolute inset-0">
          <Image
            src={heroEvent.images[0]}
            alt={heroEvent.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-6xl mx-auto px-4 md:px-8 py-20">
            <div className="space-y-4 md:space-y-6 max-w-3xl">
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
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                {heroEvent.title}
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-red-400 font-medium">
                {heroEvent.subtitle}
              </p>

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-4 text-gray-300 text-sm md:text-base">
                <div className="flex items-center space-x-2">
                  <Star className="text-yellow-400 fill-current" size={16} />
                  <span className="text-white font-semibold">{formatRating(heroEvent.rating)}</span>
                </div>
                <span>{heroEvent.duration}</span>
                <div className="flex items-center space-x-2">
                  <MapPin size={14} />
                  <span>{heroEvent.location}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-base md:text-lg text-gray-200 leading-relaxed line-clamp-3 md:line-clamp-none">
                {heroEvent.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-4">
                <button
                  onClick={() => {
                    setSelectedEvent(heroEvent);
                    setCurrentImageIndex(0);
                    setIsPlaying(true);
                  }}
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
                      onClick={() => {
                        setSelectedEvent(event);
                        setCurrentImageIndex(0);
                      }}
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
                        <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm px-2 py-1 rounded text-xs md:text-sm font-bold transform translate-y-0 group-hover:-translate-y-1 transition-transform duration-300">
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

                        {/* Bottom Gradient Info */}
                        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-gradient-to-t from-black/90 to-transparent">
                          <h3 className="text-white font-bold text-sm md:text-lg leading-tight group-hover:text-red-400 transition-colors mb-1">
                            {event.title}
                          </h3>
                          <div className="flex items-center space-x-2 text-gray-300 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span>{event.duration}</span>
                            <span>•</span>
                            <div className="flex items-center space-x-1">
                              {getTypeIcon(event.type)}
                              <span className="hidden sm:inline">{event.category}</span>
                            </div>
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
          <div className="bg-gray-900 rounded-lg max-w-6xl w-full max-h-[95vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="relative">
              <div className="relative h-48 md:h-96 overflow-hidden rounded-t-lg">
                <Image
                  src={selectedEvent.images[currentImageIndex]}
                  alt={selectedEvent.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 1200px"
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

            {/* Modal Content */}
            <div className="p-4 md:p-8 space-y-4 md:space-y-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="space-y-3 md:space-y-4 flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-white">{selectedEvent.title}</h2>
                  <p className="text-lg md:text-xl text-gray-300">{selectedEvent.subtitle}</p>
                  
                  <div className="flex flex-wrap items-center gap-3 md:gap-6 text-gray-400 text-sm md:text-base">
                    <div className="flex items-center space-x-2">
                      <Star className="text-yellow-400 fill-current" size={16} />
                      <span className="text-white font-semibold">{formatRating(selectedEvent.rating)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar size={14} />
                      <span>{selectedEvent.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin size={14} />
                      <span>{selectedEvent.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(selectedEvent.type)}
                      <span>{selectedEvent.category}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 lg:flex-col">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="flex items-center justify-center space-x-2 bg-white text-black px-4 py-2 rounded font-bold hover:bg-gray-200 transition-colors"
                  >
                    <Play size={16} fill="currentColor" />
                    <span>Play</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 bg-gray-700 text-white px-4 py-2 rounded font-bold hover:bg-gray-600 transition-colors">
                    <Heart size={16} />
                    <span>Like</span>
                  </button>
                </div>
              </div>

              <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                {selectedEvent.description}
              </p>

              {/* Image Gallery */}
              {selectedEvent.images.length > 1 && (
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-4">Behind the Scenes</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                    {selectedEvent.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative aspect-video overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 ${
                          index === currentImageIndex ? 'ring-2 ring-red-500' : ''
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`${selectedEvent.title} ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 150px, 200px"
                        />
                        {index === currentImageIndex && (
                          <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                            <Play size={20} className="text-white fill-current" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* More Details */}
              <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-gray-700">
                <div>
                  <h4 className="text-white font-bold mb-2">Details</h4>
                  <div className="space-y-2 text-sm text-gray-400">
                    <div><span className="text-gray-500">Year:</span> {selectedEvent.year}</div>
                    <div><span className="text-gray-500">Duration:</span> {selectedEvent.duration}</div>
                    <div><span className="text-gray-500">Location:</span> {selectedEvent.location}</div>
                    <div><span className="text-gray-500">Type:</span> {selectedEvent.category}</div>
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2">Rating</h4>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        className={`${
                          star <= Math.floor(selectedEvent.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                    <span className="text-white font-semibold ml-2">{formatRating(selectedEvent.rating)}</span>
                  </div>
                </div>
              </div>
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