import { motion, AnimatePresence } from 'framer-motion';

interface MediaItem {
  id: number;
  src: string;
  type: 'image' | 'video';
}

interface BookPageProps {
  currentItem: MediaItem;
  currentPage: number;
  totalPages: number;
  isFlipping: boolean;
  flipDirection: 'next' | 'prev';
}

const BookPage = ({ currentItem, currentPage, totalPages, isFlipping, flipDirection }: BookPageProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center max-w-4xl mx-auto">
      {/* Left page - Happy Birthday */}
      <div 
        className="w-full md:w-[45%] aspect-[4/3] md:aspect-[3/4] rounded-t-lg md:rounded-t-none md:rounded-l-lg"
        style={{
          background: 'linear-gradient(to right, hsl(var(--background)) 0%, hsl(var(--muted)) 100%)',
          boxShadow: 'inset 5px 0 20px rgba(0,0,0,0.05)',
        }}
      >
        <div className="h-full flex flex-col items-center justify-center p-6 md:p-8">
          <motion.div 
            className="text-5xl md:text-7xl mb-4 md:mb-6"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            🎂
          </motion.div>
          <h3 
            className="font-romantic text-3xl md:text-4xl lg:text-5xl text-foreground text-center leading-tight"
          >
            Happy Birthday
          </h3>
          <span className="text-2xl mt-2">❤️</span>
          <div className="w-16 md:w-24 h-px bg-muted-foreground/30 my-4 md:my-6" />
          <p className="font-elegant text-muted-foreground text-center italic text-sm md:text-base">
            Memory {currentPage + 1} of {totalPages}
          </p>
        </div>
      </div>

      {/* Center spine */}
      <div 
        className="hidden md:block w-3 h-full"
        style={{
          background: 'linear-gradient(to right, hsl(var(--muted-foreground) / 0.2), hsl(var(--muted-foreground) / 0.3), hsl(var(--muted-foreground) / 0.2))',
          boxShadow: '0 0 10px rgba(0,0,0,0.2)',
        }}
      />

      {/* Right page with content */}
      <motion.div 
        className="w-full md:w-[45%] aspect-[3/4] rounded-b-lg md:rounded-b-none md:rounded-r-lg overflow-hidden"
        style={{
          background: 'linear-gradient(to left, hsl(var(--background)) 0%, hsl(var(--muted)) 100%)',
          boxShadow: 'inset -5px 0 20px rgba(0,0,0,0.05), 5px 5px 20px rgba(0,0,0,0.1)',
          transformStyle: 'preserve-3d',
          transformOrigin: 'left center',
        }}
        animate={isFlipping ? {
          rotateY: flipDirection === 'next' ? [0, -180] : [0, 180],
        } : {}}
        transition={{ duration: 0.6, ease: [0.645, 0.045, 0.355, 1] }}
      >
        <div className="h-full p-4 md:p-6">
          {/* Photo/Video frame */}
          <div 
            className="h-full bg-background rounded-lg shadow-md overflow-hidden flex items-center justify-center"
            style={{
              boxShadow: '0 4px 15px rgba(0,0,0,0.1), inset 0 0 10px rgba(0,0,0,0.02)',
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
                    muted
                    playsInline
                    className="w-full h-full object-contain bg-foreground/5"
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
  );
};

export default BookPage;
