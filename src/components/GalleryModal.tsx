import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useCallback } from 'react';

interface GalleryItem {
  id: string;
  media_url: string;
  media_type: 'image' | 'video';
  caption: string | null;
}

interface GalleryModalProps {
  items: GalleryItem[];
  selectedIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const GalleryModal = ({ items, selectedIndex, onClose, onNavigate }: GalleryModalProps) => {
  const currentItem = selectedIndex !== null ? items[selectedIndex] : null;

  const handlePrev = useCallback(() => {
    if (selectedIndex !== null && selectedIndex > 0) {
      onNavigate(selectedIndex - 1);
    }
  }, [selectedIndex, onNavigate]);

  const handleNext = useCallback(() => {
    if (selectedIndex !== null && selectedIndex < items.length - 1) {
      onNavigate(selectedIndex + 1);
    }
  }, [selectedIndex, items.length, onNavigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, onClose, handlePrev, handleNext]);

  // Handle touch swipe
  useEffect(() => {
    if (selectedIndex === null) return;

    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) handleNext();
        else handlePrev();
      }
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [selectedIndex, handleNext, handlePrev]);

  return (
    <AnimatePresence>
      {currentItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 backdrop-blur-md"
          onClick={onClose}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/20 text-primary-foreground hover:bg-background/30 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Navigation */}
          {selectedIndex !== null && selectedIndex > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-4 z-10 p-2 rounded-full bg-background/20 text-primary-foreground hover:bg-background/30 transition-colors"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
          )}

          {selectedIndex !== null && selectedIndex < items.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-4 z-10 p-2 rounded-full bg-background/20 text-primary-foreground hover:bg-background/30 transition-colors"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
          )}

          {/* Content */}
          <motion.div
            key={currentItem.id}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className="relative max-w-5xl max-h-[85vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {currentItem.media_type === 'video' ? (
              <video
                src={currentItem.media_url}
                controls
                autoPlay
                className="max-w-full max-h-[80vh] rounded-2xl shadow-glow"
              />
            ) : (
              <img
                src={currentItem.media_url}
                alt={currentItem.caption || 'Memory'}
                className="max-w-full max-h-[80vh] rounded-2xl shadow-glow object-contain"
              />
            )}

            {currentItem.caption && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-foreground/80 to-transparent rounded-b-2xl"
              >
                <p className="text-primary-foreground text-center font-elegant text-lg">
                  {currentItem.caption}
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-background/20 text-primary-foreground font-body text-sm">
            {(selectedIndex ?? 0) + 1} / {items.length}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GalleryModal;
