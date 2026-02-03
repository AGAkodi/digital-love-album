import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, X, Maximize2 } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

// Import all gallery media
import photo1 from '@/assets/gallery/photo-1.jpg';
import video1 from '@/assets/gallery/video-1.mp4';
import video2 from '@/assets/gallery/video-2.mp4';
import video3 from '@/assets/gallery/video-3.mp4';
import video4 from '@/assets/gallery/video-4.mp4';
import video5 from '@/assets/gallery/video-5.mp4';
import video6 from '@/assets/gallery/video-6.mp4';
import video7 from '@/assets/gallery/video-7.mp4';
import video8 from '@/assets/gallery/video-8.mp4';
import video9 from '@/assets/gallery/video-9.mp4';

interface MediaItem {
  id: number;
  src: string;
  type: 'image' | 'video';
  caption?: string;
}

const mediaItems: MediaItem[] = [
  { id: 1, src: photo1, type: 'image', caption: 'A beautiful memory' },
  { id: 2, src: video1, type: 'video', caption: 'Cherished moment' },
  { id: 3, src: video2, type: 'video', caption: 'Together forever' },
  { id: 4, src: video3, type: 'video', caption: 'Precious times' },
  { id: 5, src: video4, type: 'video', caption: 'Sweet memories' },
  { id: 6, src: video5, type: 'video', caption: 'Love and laughter' },
  { id: 7, src: video6, type: 'video', caption: 'Special moments' },
  { id: 8, src: video7, type: 'video', caption: 'Forever grateful' },
  { id: 9, src: video8, type: 'video', caption: 'Unforgettable' },
  { id: 10, src: video9, type: 'video', caption: 'Always together' },
];

const GalleryCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: 'center',
    dragFree: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const fullscreenVideoRef = useRef<HTMLVideoElement | null>(null);

  // Touch/swipe state
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  // Play video at current index
  const playCurrentVideo = useCallback(() => {
    const currentItem = mediaItems[selectedIndex];
    if (currentItem?.type === 'video') {
      const video = videoRefs.current[selectedIndex];
      if (video) {
        video.currentTime = 0;
        video.play().catch(() => {});
      }
    }
  }, [selectedIndex]);

  // Pause all videos except current
  const pauseOtherVideos = useCallback(() => {
    videoRefs.current.forEach((video, index) => {
      if (video && index !== selectedIndex) {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [selectedIndex]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const newIndex = emblaApi.selectedScrollSnap();
    setSelectedIndex(newIndex);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Handle video playback when slide changes
  useEffect(() => {
    pauseOtherVideos();
    playCurrentVideo();
  }, [selectedIndex, pauseOtherVideos, playCurrentVideo]);

  // Auto-play slideshow
  useEffect(() => {
    if (!isPlaying || !emblaApi) return;
    
    const currentItem = mediaItems[selectedIndex];
    const video = videoRefs.current[selectedIndex];
    
    if (currentItem?.type === 'video' && video) {
      const handleEnded = () => {
        emblaApi.scrollNext();
      };
      video.addEventListener('ended', handleEnded);
      return () => video.removeEventListener('ended', handleEnded);
    } else {
      const interval = setTimeout(() => {
        emblaApi.scrollNext();
      }, 4000);
      return () => clearTimeout(interval);
    }
  }, [isPlaying, emblaApi, selectedIndex]);

  // Fullscreen handlers
  const openFullscreen = (index: number) => {
    setIsFullscreen(true);
    setSelectedIndex(index);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    if (fullscreenVideoRef.current) {
      fullscreenVideoRef.current.pause();
    }
  };

  // Fullscreen touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (swipeDistance > minSwipeDistance) {
      // Swipe left - next
      setSelectedIndex((prev) => (prev + 1) % mediaItems.length);
    } else if (swipeDistance < -minSwipeDistance) {
      // Swipe right - prev
      setSelectedIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
    }
  };

  // Keyboard navigation for fullscreen
  useEffect(() => {
    if (!isFullscreen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeFullscreen();
      if (e.key === 'ArrowRight') setSelectedIndex((prev) => (prev + 1) % mediaItems.length);
      if (e.key === 'ArrowLeft') setSelectedIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  // Play fullscreen video when index changes
  useEffect(() => {
    if (isFullscreen && mediaItems[selectedIndex]?.type === 'video' && fullscreenVideoRef.current) {
      fullscreenVideoRef.current.currentTime = 0;
      fullscreenVideoRef.current.play().catch(() => {});
    }
  }, [isFullscreen, selectedIndex]);

  const currentItem = mediaItems[selectedIndex];

  return (
    <>
      <section
        id="gallery"
        className="flex flex-col items-center justify-center py-8 px-4 md:px-6"
        style={{
          background: `linear-gradient(180deg, 
            hsl(40, 15%, 96%) 0%, 
            hsl(40, 12%, 92%) 50%,
            hsl(40, 15%, 96%) 100%
          )`,
        }}
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h2
            className="font-romantic text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4"
            style={{ color: 'hsl(35, 25%, 25%)' }}
          >
            Your Memories
          </h2>
          <p
            className="font-elegant text-lg sm:text-xl italic mb-4 sm:mb-6 px-4"
            style={{ color: 'hsl(35, 15%, 50%)' }}
          >
            A collection of some of your memories from 20
          </p>

          {/* Slideshow Toggle */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-all duration-300"
            style={{
              background: isPlaying
                ? 'linear-gradient(135deg, hsl(35, 30%, 40%), hsl(35, 25%, 35%))'
                : 'linear-gradient(135deg, hsl(35, 25%, 85%), hsl(35, 20%, 80%))',
              color: isPlaying ? 'hsl(40, 20%, 95%)' : 'hsl(35, 25%, 30%)',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            }}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-body text-xs sm:text-sm font-medium">Pause Slideshow</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-body text-xs sm:text-sm font-medium">Play Slideshow</span>
              </>
            )}
          </button>
        </motion.div>

        {/* Carousel Container */}
        <div className="w-full max-w-4xl relative px-2 sm:px-0">
          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute -left-2 sm:left-0 md:-left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            style={{
              background: 'linear-gradient(135deg, hsl(40, 20%, 98%), hsl(40, 15%, 92%))',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            }}
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: 'hsl(35, 25%, 30%)' }} />
          </button>

          <button
            onClick={scrollNext}
            className="absolute -right-2 sm:right-0 md:-right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            style={{
              background: 'linear-gradient(135deg, hsl(40, 20%, 98%), hsl(40, 15%, 92%))',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            }}
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: 'hsl(35, 25%, 30%)' }} />
          </button>

          {/* Embla Carousel */}
          <div className="overflow-hidden rounded-xl sm:rounded-2xl mx-10 sm:mx-12 md:mx-0" ref={emblaRef}>
            <div className="flex touch-pan-y">
              {mediaItems.map((item, index) => (
                <div
                  key={item.id}
                  className="flex-[0_0_100%] min-w-0 px-2"
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: selectedIndex === index ? 1 : 0.3,
                    }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="relative rounded-2xl overflow-hidden cursor-pointer group"
                    style={{
                      boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
                    }}
                    onClick={() => openFullscreen(index)}
                  >
                    {/* Frame Border */}
                    <div
                      className="absolute inset-0 rounded-2xl pointer-events-none z-10"
                      style={{
                        border: '6px solid hsl(40, 20%, 95%)',
                        boxShadow: 'inset 0 0 20px rgba(0,0,0,0.05)',
                      }}
                    />

                    {/* Fullscreen hint */}
                    <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{
                          background: 'rgba(0,0,0,0.5)',
                          backdropFilter: 'blur(4px)',
                        }}
                      >
                        <Maximize2 className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    {/* Media Content */}
                    <div className="aspect-[16/14] md:aspect-[16/12] bg-black">
                      {item.type === 'video' ? (
                        <video
                          ref={(el) => { videoRefs.current[index] = el; }}
                          src={item.src}
                          className="w-full h-full object-contain bg-black"
                          muted
                          playsInline
                          loop={!isPlaying}
                        />
                      ) : (
                        <img
                          src={item.src}
                          alt={item.caption || `Memory ${item.id}`}
                          className="w-full h-full object-contain bg-black"
                        />
                      )}
                    </div>

                    {/* Caption Overlay */}
                    <AnimatePresence>
                      {selectedIndex === index && item.caption && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                          className="absolute bottom-0 left-0 right-0 p-4 md:p-6"
                          style={{
                            background:
                              'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                          }}
                        >
                          <p className="text-white font-elegant text-lg italic text-center">
                            {item.caption}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6 flex-wrap px-4">
            {mediaItems.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className="transition-all duration-300"
              >
                <motion.div
                  animate={{
                    width: selectedIndex === index ? 20 : 6,
                    opacity: selectedIndex === index ? 1 : 0.4,
                  }}
                  className="h-1.5 sm:h-2 rounded-full"
                  style={{
                    background:
                      selectedIndex === index
                        ? 'linear-gradient(90deg, hsl(35, 30%, 45%), hsl(35, 25%, 55%))'
                        : 'hsl(35, 15%, 70%)',
                  }}
                />
              </button>
            ))}
          </div>

          {/* Counter */}
          <div className="text-center mt-3 sm:mt-4">
            <span
              className="font-body text-xs sm:text-sm tracking-wider"
              style={{ color: 'hsl(35, 15%, 50%)' }}
            >
              {selectedIndex + 1} / {mediaItems.length}
            </span>
          </div>
        </div>
      </section>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Close button */}
            <button
              onClick={closeFullscreen}
              className="absolute top-4 right-4 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Navigation */}
            <button
              onClick={() => setSelectedIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={() => setSelectedIndex((prev) => (prev + 1) % mediaItems.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Media */}
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full flex items-center justify-center p-4 md:p-12"
            >
              {currentItem.type === 'video' ? (
                <video
                  ref={fullscreenVideoRef}
                  src={currentItem.src}
                  className="max-w-full max-h-full object-contain rounded-lg"
                  controls
                  autoPlay
                  muted
                  playsInline
                />
              ) : (
                <img
                  src={currentItem.src}
                  alt={currentItem.caption || `Memory ${currentItem.id}`}
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              )}
            </motion.div>

            {/* Caption */}
            {currentItem.caption && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-8 left-0 right-0 text-center"
              >
                <p className="text-white font-elegant text-xl italic">
                  {currentItem.caption}
                </p>
                <p className="text-white/60 font-body text-sm mt-2">
                  {selectedIndex + 1} / {mediaItems.length}
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GalleryCarousel;
