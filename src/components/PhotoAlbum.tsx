import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BookCover from './book/BookCover';
import BookPage from './book/BookPage';
import BookControls from './book/BookControls';
import { useBookNavigation } from '@/hooks/useBookNavigation';

// Import all gallery media
import photo1 from '@/assets/gallery/photo-1.jpg';
import video1 from '@/assets/gallery/video-1.mp4';
import video2 from '@/assets/gallery/video-2.mp4';
import video3 from '@/assets/gallery/video-3.mp4';
import video4 from '@/assets/gallery/video-4.mp4';
import video5 from '@/assets/gallery/video-5.mp4';
import video6 from '@/assets/gallery/video-6.mp4';
import video7 from '@/assets/gallery/video-1.mp4';
import video8 from '@/assets/gallery/video-8.mp4';
import video9 from '@/assets/gallery/video-9.mp4';

interface MediaItem {
  id: number;
  src: string;
  type: 'image' | 'video';
}

const mediaItems: MediaItem[] = [
  { id: 1, src: photo1, type: 'image' },
  { id: 2, src: video1, type: 'video' },
  { id: 3, src: video2, type: 'video' },
  { id: 4, src: video3, type: 'video' },
  { id: 5, src: video4, type: 'video' },
  { id: 6, src: video5, type: 'video' },
  { id: 7, src: video6, type: 'video' },
  { id: 8, src: video7, type: 'video' },
  { id: 9, src: video8, type: 'video' },
  { id: 10, src: video9, type: 'video' },
];

const PhotoAlbum = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSlideshow, setIsSlideshow] = useState(false);

  const {
    currentPage,
    isFlipping,
    flipDirection,
    containerRef,
    handleNextPage,
    handlePrevPage,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    resetPage,
  } = useBookNavigation({
    totalPages: mediaItems.length,
    isSlideshow,
    slideshowInterval: 5000,
  });

  const handleOpen = () => {
    setIsOpen(true);
    resetPage();
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsSlideshow(false);
    resetPage();
  };

  const handleToggleSlideshow = () => {
    setIsSlideshow((prev) => !prev);
  };

  const currentItem = mediaItems[currentPage];

  return (
    <section 
      id="gallery" 
      className="min-h-screen flex flex-col items-center justify-center overflow-hidden py-20 px-6"
      style={{
        background: `linear-gradient(180deg, 
          hsl(40, 20%, 97%) 0%, 
          hsl(40, 15%, 94%) 50%,
          hsl(40, 20%, 97%) 100%
        )`,
      }}
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-4"
        >
          <span className="text-4xl">📖</span>
        </motion.div>
        <h2 
          className="font-romantic text-5xl md:text-6xl mb-4"
          style={{ color: 'hsl(35, 30%, 25%)' }}
        >
          Your Memories
        </h2>
        <p 
          className="font-elegant text-xl italic"
          style={{ color: 'hsl(35, 20%, 50%)' }}
        >
          A collection of beautiful moments
        </p>
      </motion.div>

      {/* Closed Book */}
      <AnimatePresence mode="wait">
        {!isOpen && <BookCover onOpen={handleOpen} />}
      </AnimatePresence>

      {/* Open Book Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{
              background: `linear-gradient(180deg, 
                hsl(40, 15%, 92%) 0%, 
                hsl(40, 20%, 88%) 50%,
                hsl(40, 15%, 92%) 100%
              )`,
            }}
            ref={containerRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Ambient light effect */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at 50% 30%, rgba(255,245,230,0.4) 0%, transparent 60%)',
              }}
            />

            <BookControls
              currentPage={currentPage}
              totalPages={mediaItems.length}
              isFlipping={isFlipping}
              isSlideshow={isSlideshow}
              onPrev={handlePrevPage}
              onNext={handleNextPage}
              onClose={handleClose}
              onToggleSlideshow={handleToggleSlideshow}
            />

            {/* Book container */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-center w-full h-full"
              style={{ perspective: '2000px' }}
            >
              <BookPage
                currentItem={currentItem}
                currentPage={currentPage}
                totalPages={mediaItems.length}
                isFlipping={isFlipping}
                flipDirection={flipDirection}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PhotoAlbum;
