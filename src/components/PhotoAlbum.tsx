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
import video7 from '@/assets/gallery/video-7.mp4';
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
      className="py-20 px-6 bg-muted/30 min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="font-romantic text-5xl md:text-6xl text-foreground mb-4">
          Your Memories
        </h2>
        <p className="font-elegant text-xl text-muted-foreground italic">
          A look at your memories from 20
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm p-4"
            ref={containerRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
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
            <div 
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PhotoAlbum;
