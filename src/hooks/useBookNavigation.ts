import { useState, useCallback, useEffect, useRef } from 'react';

interface UseBookNavigationProps {
  totalPages: number;
  isSlideshow: boolean;
  slideshowInterval?: number;
}

export const useBookNavigation = ({ 
  totalPages, 
  isSlideshow, 
  slideshowInterval = 5000 
}: UseBookNavigationProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const handleNextPage = useCallback(() => {
    if (isFlipping || currentPage >= totalPages - 1) return;
    setFlipDirection('next');
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentPage((prev) => prev + 1);
      setIsFlipping(false);
    }, 600);
  }, [currentPage, isFlipping, totalPages]);

  const handlePrevPage = useCallback(() => {
    if (isFlipping || currentPage <= 0) return;
    setFlipDirection('prev');
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentPage((prev) => prev - 1);
      setIsFlipping(false);
    }, 600);
  }, [currentPage, isFlipping]);

  // Slideshow auto-advance
  useEffect(() => {
    if (!isSlideshow) return;
    
    const interval = setInterval(() => {
      if (currentPage >= totalPages - 1) {
        // Loop back to first page
        setFlipDirection('next');
        setIsFlipping(true);
        setTimeout(() => {
          setCurrentPage(0);
          setIsFlipping(false);
        }, 600);
      } else {
        handleNextPage();
      }
    }, slideshowInterval);

    return () => clearInterval(interval);
  }, [isSlideshow, currentPage, totalPages, slideshowInterval, handleNextPage]);

  // Touch/Swipe handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const swipeDistance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (swipeDistance > minSwipeDistance) {
      handleNextPage();
    } else if (swipeDistance < -minSwipeDistance) {
      handlePrevPage();
    }
  }, [handleNextPage, handlePrevPage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNextPage();
      if (e.key === 'ArrowLeft') handlePrevPage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNextPage, handlePrevPage]);

  const resetPage = useCallback(() => {
    setCurrentPage(0);
  }, []);

  return {
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
  };
};
