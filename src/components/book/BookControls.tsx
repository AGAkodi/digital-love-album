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
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-30 p-3 rounded-full bg-background/20 text-foreground hover:bg-background/40 transition-colors"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Slideshow toggle */}
      <button
        onClick={onToggleSlideshow}
        className="absolute top-4 left-4 z-30 p-3 rounded-full bg-background/20 text-foreground hover:bg-background/40 transition-colors flex items-center gap-2"
      >
        {isSlideshow ? (
          <>
            <Pause className="h-5 w-5" />
            <span className="hidden md:inline text-sm font-elegant">Pause</span>
          </>
        ) : (
          <>
            <Play className="h-5 w-5" />
            <span className="hidden md:inline text-sm font-elegant">Play Memories</span>
          </>
        )}
      </button>

      {/* Navigation buttons */}
      <button
        onClick={onPrev}
        disabled={currentPage === 0 || isFlipping}
        className={`absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-30 p-3 md:p-4 rounded-full transition-all ${
          currentPage === 0 || isFlipping
            ? 'opacity-30 cursor-not-allowed'
            : 'bg-background/20 text-foreground hover:bg-background/40 hover:scale-110'
        }`}
      >
        <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
      </button>

      <button
        onClick={onNext}
        disabled={currentPage === totalPages - 1 || isFlipping}
        className={`absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-30 p-3 md:p-4 rounded-full transition-all ${
          currentPage === totalPages - 1 || isFlipping
            ? 'opacity-30 cursor-not-allowed'
            : 'bg-background/20 text-foreground hover:bg-background/40 hover:scale-110'
        }`}
      >
        <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
      </button>

      {/* Page indicator dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all ${
              i === currentPage 
                ? 'bg-foreground w-4' 
                : 'bg-foreground/30 hover:bg-foreground/50'
            }`}
          />
        ))}
      </div>
    </>
  );
};

export default BookControls;
