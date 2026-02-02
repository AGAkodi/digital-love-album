import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
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
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || !emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [isPlaying, emblaApi]);

  return (
    <section
      id="gallery"
      className="min-h-screen flex flex-col items-center justify-center py-20 px-4 md:px-6"
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
        className="text-center mb-12"
      >
        <h2
          className="font-romantic text-5xl md:text-6xl mb-4"
          style={{ color: 'hsl(35, 25%, 25%)' }}
        >
          Our Memories
        </h2>
        <p
          className="font-elegant text-xl italic mb-6"
          style={{ color: 'hsl(35, 15%, 50%)' }}
        >
          A collection of beautiful moments
        </p>

        {/* Slideshow Toggle */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300"
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
              <Pause className="w-5 h-5" />
              <span className="font-body text-sm font-medium">Pause Slideshow</span>
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              <span className="font-body text-sm font-medium">Play Slideshow</span>
            </>
          )}
        </button>
      </motion.div>

      {/* Carousel Container */}
      <div className="w-full max-w-5xl relative">
        {/* Navigation Buttons */}
        <button
          onClick={scrollPrev}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
          style={{
            background: 'linear-gradient(135deg, hsl(40, 20%, 98%), hsl(40, 15%, 92%))',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          }}
        >
          <ChevronLeft className="w-6 h-6" style={{ color: 'hsl(35, 25%, 30%)' }} />
        </button>

        <button
          onClick={scrollNext}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
          style={{
            background: 'linear-gradient(135deg, hsl(40, 20%, 98%), hsl(40, 15%, 92%))',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          }}
        >
          <ChevronRight className="w-6 h-6" style={{ color: 'hsl(35, 25%, 30%)' }} />
        </button>

        {/* Embla Carousel */}
        <div className="overflow-hidden rounded-3xl" ref={emblaRef}>
          <div className="flex">
            {mediaItems.map((item, index) => (
              <div
                key={item.id}
                className="flex-[0_0_85%] md:flex-[0_0_70%] min-w-0 px-2 md:px-4"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{
                    opacity: selectedIndex === index ? 1 : 0.5,
                    scale: selectedIndex === index ? 1 : 0.9,
                  }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="relative rounded-2xl overflow-hidden"
                  style={{
                    boxShadow:
                      selectedIndex === index
                        ? '0 25px 60px rgba(0,0,0,0.2)'
                        : '0 10px 30px rgba(0,0,0,0.1)',
                  }}
                >
                  {/* Frame Border */}
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none z-10"
                    style={{
                      border: '8px solid',
                      borderColor: 'hsl(40, 20%, 95%)',
                      boxShadow: 'inset 0 0 20px rgba(0,0,0,0.05)',
                    }}
                  />

                  {/* Media Content */}
                  <div className="aspect-[4/3] bg-muted">
                    {item.type === 'video' ? (
                      <video
                        src={item.src}
                        className="w-full h-full object-cover"
                        autoPlay={selectedIndex === index}
                        muted
                        loop
                        playsInline
                      />
                    ) : (
                      <img
                        src={item.src}
                        alt={item.caption || `Memory ${item.id}`}
                        className="w-full h-full object-cover"
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
                        className="absolute bottom-0 left-0 right-0 p-6"
                        style={{
                          background:
                            'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
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
        <div className="flex justify-center gap-2 mt-8">
          {mediaItems.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className="transition-all duration-300"
            >
              <motion.div
                animate={{
                  width: selectedIndex === index ? 32 : 10,
                  opacity: selectedIndex === index ? 1 : 0.4,
                }}
                className="h-2.5 rounded-full"
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
        <div className="text-center mt-6">
          <span
            className="font-body text-sm tracking-wider"
            style={{ color: 'hsl(35, 15%, 50%)' }}
          >
            {selectedIndex + 1} / {mediaItems.length}
          </span>
        </div>
      </div>
    </section>
  );
};

export default GalleryCarousel;
