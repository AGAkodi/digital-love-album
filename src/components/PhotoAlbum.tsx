import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

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
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');

  const handleOpen = () => {
    setIsOpen(true);
    setCurrentPage(0);
  };

  const handleClose = () => {
    setIsOpen(false);
    setCurrentPage(0);
  };

  const handleNextPage = useCallback(() => {
    if (isFlipping || currentPage >= mediaItems.length - 1) return;
    setFlipDirection('next');
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentPage((prev) => prev + 1);
      setIsFlipping(false);
    }, 600);
  }, [currentPage, isFlipping]);

  const handlePrevPage = useCallback(() => {
    if (isFlipping || currentPage <= 0) return;
    setFlipDirection('prev');
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentPage((prev) => prev - 1);
      setIsFlipping(false);
    }, 600);
  }, [currentPage, isFlipping]);

  const currentItem = mediaItems[currentPage];

  return (
    <section id="gallery" className="py-20 px-6 bg-romantic min-h-screen flex flex-col items-center justify-center overflow-hidden">
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
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, rotateY: -30, x: -100 }}
            transition={{ duration: 0.5 }}
            onClick={handleOpen}
            className="cursor-pointer perspective-1000"
            style={{ perspective: '1500px' }}
          >
            <motion.div
              whileHover={{ rotateY: -15, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative preserve-3d"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Book spine shadow */}
              <div 
                className="absolute -left-2 top-4 bottom-4 w-8 bg-gradient-to-r from-black/40 to-transparent blur-sm"
                style={{ transform: 'translateZ(-10px)' }}
              />
              
              {/* Book cover */}
              <div 
                className="relative w-64 h-80 md:w-72 md:h-96 rounded-r-lg rounded-l-sm overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #8B4513 0%, #654321 50%, #4a2c17 100%)',
                  boxShadow: '5px 5px 20px rgba(0,0,0,0.4), inset -5px 0 15px rgba(0,0,0,0.3)',
                }}
              >
                {/* Book spine */}
                <div 
                  className="absolute left-0 top-0 bottom-0 w-5 md:w-6"
                  style={{
                    background: 'linear-gradient(to right, #3d1f0d, #5a3520, #4a2c17)',
                    boxShadow: 'inset -2px 0 5px rgba(0,0,0,0.5)',
                  }}
                />

                {/* Decorative border */}
                <div className="absolute inset-6 md:inset-8 border-2 border-amber-200/40 rounded-lg" />
                
                {/* Corner decorations */}
                <div className="absolute top-4 left-8 md:left-10 w-6 h-6 border-t-2 border-l-2 border-amber-200/50 rounded-tl-lg" />
                <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-amber-200/50 rounded-tr-lg" />
                <div className="absolute bottom-4 left-8 md:left-10 w-6 h-6 border-b-2 border-l-2 border-amber-200/50 rounded-bl-lg" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-amber-200/50 rounded-br-lg" />

                {/* Title */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pl-4">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-4xl md:text-5xl mb-4"
                  >
                    💕
                  </motion.div>
                  <h3 
                    className="font-romantic text-2xl md:text-3xl text-amber-100 text-center px-4 leading-tight"
                    style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
                  >
                    Memories from 20
                  </h3>
                  <p className="font-elegant text-amber-200/70 text-sm mt-4 italic">
                    Tap to open
                  </p>
                </div>

                {/* Page edges visible on the right */}
                <div 
                  className="absolute right-0 top-2 bottom-2 w-1.5"
                  style={{
                    background: 'repeating-linear-gradient(to bottom, #f5f0e6 0px, #f5f0e6 2px, #e8e0d0 2px, #e8e0d0 4px)',
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Open Book Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 backdrop-blur-md p-4"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-30 p-3 rounded-full bg-background/20 text-primary-foreground hover:bg-background/30 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Navigation buttons */}
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 0 || isFlipping}
              className={`absolute left-2 md:left-8 z-30 p-3 md:p-4 rounded-full transition-all ${
                currentPage === 0 || isFlipping
                  ? 'opacity-30 cursor-not-allowed'
                  : 'bg-background/20 text-primary-foreground hover:bg-background/40 hover:scale-110'
              }`}
            >
              <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
            </button>

            <button
              onClick={handleNextPage}
              disabled={currentPage === mediaItems.length - 1 || isFlipping}
              className={`absolute right-2 md:right-8 z-30 p-3 md:p-4 rounded-full transition-all ${
                currentPage === mediaItems.length - 1 || isFlipping
                  ? 'opacity-30 cursor-not-allowed'
                  : 'bg-background/20 text-primary-foreground hover:bg-background/40 hover:scale-110'
              }`}
            >
              <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
            </button>

            {/* Book container - centered */}
            <div 
              className="flex items-center justify-center w-full h-full"
              style={{ perspective: '2000px' }}
            >
              {/* Open book base - centered */}
              <div className="flex justify-center items-center max-w-3xl mx-auto">
                {/* Left page - Happy Birthday */}
                <div 
                  className="w-[45%] aspect-[3/4] rounded-l-lg hidden md:block"
                  style={{
                    background: 'linear-gradient(to right, #f5f0e6 0%, #ece5d8 100%)',
                    boxShadow: 'inset 5px 0 20px rgba(0,0,0,0.1)',
                  }}
                >
                  <div className="h-full flex flex-col items-center justify-center p-8">
                    <motion.div 
                      className="text-7xl mb-8"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      🎂
                    </motion.div>
                    <h3 
                      className="font-romantic text-4xl lg:text-5xl text-amber-700 text-center leading-tight"
                      style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}
                    >
                      Happy Birthday
                    </h3>
                    <div className="w-24 h-0.5 bg-amber-600/40 my-6" />
                    <p className="font-elegant text-amber-700/60 text-center italic text-base">
                      Memory {currentPage + 1} of {mediaItems.length}
                    </p>
                  </div>
                </div>

                {/* Center spine */}
                <div 
                  className="hidden md:block w-4 bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900"
                  style={{
                    boxShadow: '0 0 20px rgba(0,0,0,0.5)',
                  }}
                />

                {/* Right page with content */}
                <motion.div 
                  className="w-full md:w-[45%] aspect-[3/4] rounded-r-lg md:rounded-l-none rounded-lg overflow-hidden"
                  style={{
                    background: 'linear-gradient(to left, #f5f0e6 0%, #ece5d8 100%)',
                    boxShadow: 'inset -5px 0 20px rgba(0,0,0,0.1), 5px 5px 20px rgba(0,0,0,0.2)',
                    transformStyle: 'preserve-3d',
                    transformOrigin: 'left center',
                  }}
                  animate={isFlipping ? {
                    rotateY: flipDirection === 'next' ? [0, -180] : [0, 180],
                  } : {}}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
                  <div className="h-full p-3 md:p-6">
                    {/* Photo/Video frame */}
                    <div 
                      className="h-full bg-white rounded shadow-lg overflow-hidden flex items-center justify-center"
                      style={{
                        boxShadow: '0 4px 15px rgba(0,0,0,0.15), inset 0 0 10px rgba(0,0,0,0.05)',
                      }}
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentPage}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3, delay: isFlipping ? 0.3 : 0 }}
                          className="w-full h-full"
                        >
                          {currentItem.type === 'video' ? (
                            <video
                              key={currentItem.id}
                              src={currentItem.src}
                              controls
                              autoPlay
                              playsInline
                              className="w-full h-full object-contain bg-black"
                            />
                          ) : (
                            <img
                              src={currentItem.src}
                              alt={`Memory ${currentPage + 1}`}
                              className="w-full h-full object-contain"
                            />
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Page number indicator */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mt-6"
              >
                <p className="font-elegant text-primary-foreground/80 text-lg">
                  Memory {currentPage + 1} of {mediaItems.length}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PhotoAlbum;
