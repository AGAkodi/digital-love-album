import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Play, Pause } from 'lucide-react';

interface BookControlsProps {
  currentPage: number;
  totalPages: number;
  isFlipping: boolean;
  isSlideshow: boolean;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
  onToggleSlideshow: () => void;
}

const BookControls = ({
  currentPage,
  totalPages,
  isFlipping,
  isSlideshow,
  onPrev,
  onNext,
  onClose,
  onToggleSlideshow,
}: BookControlsProps) => {
  return (
    <>
      {/* Close button */}
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onClick={onClose}
        className="absolute top-4 right-4 z-30 p-3 rounded-full transition-all hover:scale-110"
        style={{
          background: 'hsl(40, 20%, 95%)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          color: 'hsl(35, 25%, 35%)',
        }}
      >
        <X className="h-5 w-5" />
      </motion.button>

      {/* Slideshow toggle */}
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        onClick={onToggleSlideshow}
        className="absolute top-4 left-4 z-30 p-3 rounded-full flex items-center gap-2 transition-all hover:scale-105"
        style={{
          background: isSlideshow ? 'hsl(35, 30%, 45%)' : 'hsl(40, 20%, 95%)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          color: isSlideshow ? 'hsl(40, 30%, 95%)' : 'hsl(35, 25%, 35%)',
        }}
      >
        {isSlideshow ? (
          <>
            <Pause className="h-4 w-4" />
            <span className="hidden md:inline text-sm font-elegant">Pause</span>
          </>
        ) : (
          <>
            <Play className="h-4 w-4" />
            <span className="hidden md:inline text-sm font-elegant">Play Memories</span>
          </>
        )}
      </motion.button>

      {/* Navigation buttons */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        onClick={onPrev}
        disabled={currentPage === 0 || isFlipping}
        className={`absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-30 p-3 md:p-4 rounded-full transition-all ${
          currentPage === 0 || isFlipping
            ? 'opacity-30 cursor-not-allowed'
            : 'hover:scale-110'
        }`}
        style={{
          background: 'hsl(40, 20%, 95%)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          color: 'hsl(35, 25%, 35%)',
        }}
      >
        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
      </motion.button>

      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        onClick={onNext}
        disabled={currentPage === totalPages - 1 || isFlipping}
        className={`absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-30 p-3 md:p-4 rounded-full transition-all ${
          currentPage === totalPages - 1 || isFlipping
            ? 'opacity-30 cursor-not-allowed'
            : 'hover:scale-110'
        }`}
        style={{
          background: 'hsl(40, 20%, 95%)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          color: 'hsl(35, 25%, 35%)',
        }}
      >
        <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
      </motion.button>

      {/* Page indicator - elegant dots */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-4 py-2 rounded-full"
        style={{
          background: 'hsl(40, 20%, 95%)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        {Array.from({ length: totalPages }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scale: i === currentPage ? 1 : 0.8,
              opacity: i === currentPage ? 1 : 0.4,
            }}
            className="transition-all"
            style={{
              width: i === currentPage ? '20px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: i === currentPage 
                ? 'hsl(35, 30%, 45%)' 
                : 'hsl(35, 20%, 65%)',
            }}
          />
        ))}
      </motion.div>
    </>
  );
};

export default BookControls;
