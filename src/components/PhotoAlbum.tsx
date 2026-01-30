import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Play } from 'lucide-react';

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
  { id: 1, src: photo1, type: 'image', caption: 'Beautiful moment ❤️' },
  { id: 2, src: video1, type: 'video', caption: 'Our memories' },
  { id: 3, src: video2, type: 'video', caption: 'Special times' },
  { id: 4, src: video3, type: 'video', caption: 'Together forever' },
  { id: 5, src: video4, type: 'video', caption: 'Cherished moments' },
  { id: 6, src: video5, type: 'video', caption: 'Love story' },
  { id: 7, src: video6, type: 'video', caption: 'Our journey' },
  { id: 8, src: video7, type: 'video', caption: 'Sweet memories' },
  { id: 9, src: video8, type: 'video', caption: 'Forever yours' },
  { id: 10, src: video9, type: 'video', caption: 'My love' },
];

const PhotoAlbum = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : mediaItems.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < mediaItems.length - 1 ? prev + 1 : 0));
  };

  const currentItem = mediaItems[currentIndex];

  return (
    <section id="gallery" className="py-20 px-6 bg-romantic min-h-screen flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="font-romantic text-5xl md:text-6xl text-foreground mb-4">
          Our Memories
        </h2>
        <p className="font-elegant text-xl text-muted-foreground italic">
          Click the album to open our story
        </p>
      </motion.div>

      {/* Closed Album */}
      <AnimatePresence mode="wait">
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
            transition={{ duration: 0.6 }}
            onClick={() => setIsOpen(true)}
            className="cursor-pointer group perspective-1000"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="relative w-72 h-96 md:w-80 md:h-[28rem] bg-gradient-to-br from-rose-800 via-rose-700 to-rose-900 rounded-r-lg rounded-l-sm shadow-2xl overflow-hidden"
              style={{
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset -3px 0 10px rgba(0,0,0,0.3)',
              }}
            >
              {/* Album spine */}
              <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-rose-950 to-rose-800" />
              
              {/* Album decoration */}
              <div className="absolute inset-8 border-2 border-rose-300/30 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-6xl mb-4"
                  >
                    💕
                  </motion.div>
                  <h3 className="font-romantic text-2xl text-rose-100 mb-2">Our Love Story</h3>
                  <p className="font-elegant text-rose-200/80 text-sm">Tap to open</p>
                </div>
              </div>

              {/* Album corner decorations */}
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-rose-300/30 rounded-tr-lg" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-rose-300/30 rounded-br-lg" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Open Album */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/95 backdrop-blur-md p-4"
          >
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-20 p-3 rounded-full bg-background/20 text-primary-foreground hover:bg-background/30 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Album pages container */}
            <div className="relative w-full max-w-4xl aspect-[4/3] flex items-center justify-center">
              {/* Left navigation */}
              <button
                onClick={handlePrev}
                className="absolute left-2 md:left-4 z-20 p-3 md:p-4 rounded-full bg-background/20 text-primary-foreground hover:bg-background/40 transition-all hover:scale-110"
              >
                <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
              </button>

              {/* Album page */}
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, rotateY: 90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: -90 }}
                transition={{ duration: 0.5, type: 'spring', damping: 20 }}
                className="relative w-full max-w-2xl mx-16"
              >
                {/* Page with photo/video frame */}
                <div 
                  className="relative bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-4 md:p-8 shadow-2xl"
                  style={{
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                  }}
                >
                  {/* Decorative corners */}
                  <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-amber-700/30" />
                  <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-amber-700/30" />
                  <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-amber-700/30" />
                  <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-amber-700/30" />

                  {/* Photo/Video frame */}
                  <div className="relative bg-white p-2 md:p-4 rounded shadow-inner">
                    <div className="relative aspect-[4/3] bg-muted rounded overflow-hidden">
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
                          alt={currentItem.caption || 'Memory'}
                          className="w-full h-full object-contain"
                        />
                      )}
                    </div>
                  </div>

                  {/* Caption */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center mt-4 font-elegant text-lg md:text-xl text-amber-900 italic"
                  >
                    {currentItem.caption}
                  </motion.p>

                  {/* Page number */}
                  <p className="text-center mt-2 font-body text-sm text-amber-700/60">
                    {currentIndex + 1} / {mediaItems.length}
                  </p>
                </div>
              </motion.div>

              {/* Right navigation */}
              <button
                onClick={handleNext}
                className="absolute right-2 md:right-4 z-20 p-3 md:p-4 rounded-full bg-background/20 text-primary-foreground hover:bg-background/40 transition-all hover:scale-110"
              >
                <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
              </button>
            </div>

            {/* Thumbnail strip */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-full px-4 py-2">
              {mediaItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`relative flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-lg overflow-hidden transition-all ${
                    index === currentIndex
                      ? 'ring-2 ring-primary scale-110'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  {item.type === 'video' ? (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <Play className="h-4 w-4 text-muted-foreground" />
                    </div>
                  ) : (
                    <img
                      src={item.src}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PhotoAlbum;
