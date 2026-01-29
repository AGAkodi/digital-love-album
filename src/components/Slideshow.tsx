import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';
import { useState, useEffect, useCallback, useRef } from 'react';
import FloatingHearts from './FloatingHearts';

interface GalleryItem {
  id: string;
  media_url: string;
  media_type: 'image' | 'video';
  caption: string | null;
}

interface SlideshowProps {
  items: GalleryItem[];
  isActive: boolean;
  onClose: () => void;
}

const Slideshow = ({ items, isActive, onClose }: SlideshowProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentItem = items[currentIndex];

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  // Auto-advance for images
  useEffect(() => {
    if (!isActive || !isPlaying) return;
    if (currentItem?.media_type === 'video') return; // Let video handle its own duration

    const timer = setTimeout(goToNext, 5000);
    return () => clearTimeout(timer);
  }, [isActive, isPlaying, currentIndex, currentItem, goToNext]);

  // Handle video end
  const handleVideoEnd = () => {
    if (isPlaying) goToNext();
  };

  // Keyboard controls
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, onClose, goToNext, goToPrev]);

  if (!isActive || items.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-foreground"
    >
      <FloatingHearts count={20} active={true} />

      {/* Controls */}
      <div className="absolute top-4 left-0 right-0 z-20 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying((p) => !p)}
            className="p-2 rounded-full bg-background/20 text-primary-foreground hover:bg-background/30 transition-colors"
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </button>
          <button
            onClick={() => setIsMuted((m) => !m)}
            className="p-2 rounded-full bg-background/20 text-primary-foreground hover:bg-background/30 transition-colors"
          >
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-background/20 text-primary-foreground hover:bg-background/30 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-background/20 text-primary-foreground hover:bg-background/30 transition-colors"
      >
        <ChevronLeft className="h-8 w-8" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-background/20 text-primary-foreground hover:bg-background/30 transition-colors"
      >
        <ChevronRight className="h-8 w-8" />
      </button>

      {/* Media display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentItem.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {currentItem.media_type === 'video' ? (
            <video
              ref={videoRef}
              src={currentItem.media_url}
              autoPlay
              muted={isMuted}
              onEnded={handleVideoEnd}
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <img
              src={currentItem.media_url}
              alt={currentItem.caption || 'Memory'}
              className="max-w-full max-h-full object-contain"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Caption */}
      {currentItem.caption && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-24 left-0 right-0 text-center px-8"
        >
          <p className="font-elegant text-2xl text-primary-foreground italic drop-shadow-lg">
            {currentItem.caption}
          </p>
        </motion.div>
      )}

      {/* Progress indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-primary w-8'
                : 'bg-primary-foreground/50 hover:bg-primary-foreground/80'
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Slideshow;
