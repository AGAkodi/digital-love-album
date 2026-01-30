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
    <div className="flex flex-col md:flex-row justify-center items-stretch max-w-5xl mx-auto">
      {/* Left page - Message */}
      <motion.div 
        className="w-full md:w-[400px] aspect-[3/4] rounded-t-sm md:rounded-t-none md:rounded-l-sm relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, 
            hsl(40, 30%, 96%) 0%, 
            hsl(40, 25%, 93%) 50%,
            hsl(40, 20%, 90%) 100%
          )`,
          boxShadow: 'inset 8px 0 20px rgba(0,0,0,0.04)',
        }}
      >
        {/* Paper texture */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Page fold shadow */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-8 hidden md:block"
          style={{
            background: 'linear-gradient(to left, rgba(0,0,0,0.06), transparent)',
          }}
        />

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center p-8 md:p-12">
          {/* Decorative top element */}
          <div className="mb-6">
            <svg width="60" height="20" viewBox="0 0 60 20" className="opacity-30">
              <path 
                d="M0 10 Q15 0 30 10 Q45 20 60 10" 
                fill="none" 
                stroke="hsl(35, 30%, 50%)" 
                strokeWidth="1"
              />
            </svg>
          </div>

          {/* Cake icon */}
          <motion.div 
            className="text-5xl md:text-6xl mb-6"
            animate={{ 
              y: [0, -4, 0],
              rotate: [0, -2, 2, 0],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: 'easeInOut',
            }}
          >
            🎂
          </motion.div>

          {/* Message */}
          <h3 
            className="font-romantic text-4xl md:text-5xl text-center leading-tight mb-3"
            style={{ 
              color: 'hsl(35, 35%, 30%)',
            }}
          >
            Happy Birthday
          </h3>
          
          <motion.span 
            className="text-2xl md:text-3xl"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ❤️
          </motion.span>

          {/* Decorative divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="w-12 h-px" style={{ background: 'linear-gradient(to right, transparent, hsl(35, 30%, 60%))' }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'hsl(35, 30%, 60%)' }} />
            <div className="w-12 h-px" style={{ background: 'linear-gradient(to left, transparent, hsl(35, 30%, 60%))' }} />
          </div>

          {/* Page number */}
          <p 
            className="font-elegant italic text-sm md:text-base"
            style={{ color: 'hsl(35, 20%, 55%)' }}
          >
            Memory {currentPage + 1} of {totalPages}
          </p>

          {/* Decorative bottom element */}
          <div className="mt-6">
            <svg width="40" height="15" viewBox="0 0 40 15" className="opacity-30">
              <path 
                d="M0 7.5 Q10 0 20 7.5 Q30 15 40 7.5" 
                fill="none" 
                stroke="hsl(35, 30%, 50%)" 
                strokeWidth="1"
              />
            </svg>
          </div>
        </div>

        {/* Page corner curl effect */}
        <div 
          className="absolute bottom-0 left-0 w-8 h-8 hidden md:block"
          style={{
            background: 'linear-gradient(135deg, transparent 50%, hsl(40, 25%, 88%) 50%)',
            boxShadow: '2px -2px 4px rgba(0,0,0,0.05)',
          }}
        />
      </motion.div>

      {/* Center spine */}
      <div 
        className="hidden md:flex w-6 flex-col items-center justify-center"
        style={{
          background: 'linear-gradient(to right, hsl(35, 25%, 40%), hsl(35, 30%, 50%), hsl(35, 25%, 40%))',
          boxShadow: '0 0 15px rgba(0,0,0,0.3)',
        }}
      >
        {/* Spine stitching */}
        {[...Array(8)].map((_, i) => (
          <div 
            key={i} 
            className="w-1 h-1 rounded-full my-4"
            style={{ background: 'hsl(40, 30%, 70%)' }}
          />
        ))}
      </div>

      {/* Right page with media */}
      <motion.div 
        className="w-full md:w-[400px] aspect-[3/4] rounded-b-sm md:rounded-b-none md:rounded-r-sm relative overflow-hidden"
        style={{
          background: `linear-gradient(225deg, 
            hsl(40, 30%, 96%) 0%, 
            hsl(40, 25%, 93%) 50%,
            hsl(40, 20%, 90%) 100%
          )`,
          boxShadow: 'inset -8px 0 20px rgba(0,0,0,0.04), 6px 6px 20px rgba(0,0,0,0.1)',
          transformStyle: 'preserve-3d',
          transformOrigin: 'left center',
        }}
        animate={isFlipping ? {
          rotateY: flipDirection === 'next' ? [0, -180] : [0, 180],
        } : {}}
        transition={{ duration: 0.7, ease: [0.645, 0.045, 0.355, 1] }}
      >
        {/* Paper texture */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Page fold shadow */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-8 hidden md:block"
          style={{
            background: 'linear-gradient(to right, rgba(0,0,0,0.06), transparent)',
          }}
        />

        {/* Photo frame area */}
        <div className="relative h-full p-6 md:p-8">
          {/* Photo mount/mat */}
          <div 
            className="h-full rounded-lg relative overflow-hidden"
            style={{
              background: 'hsl(40, 15%, 98%)',
              boxShadow: `
                inset 0 0 0 4px hsl(40, 20%, 92%),
                inset 0 2px 8px rgba(0,0,0,0.08),
                0 4px 20px rgba(0,0,0,0.08)
              `,
              padding: '12px',
            }}
          >
            {/* Tape corners */}
            <TapeCorner position="top-left" />
            <TapeCorner position="top-right" />

            {/* Photo/Video */}
            <div className="h-full rounded overflow-hidden bg-foreground/5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, delay: isFlipping ? 0.35 : 0 }}
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
                      className="w-full h-full object-contain"
                      style={{ background: 'hsl(0, 0%, 8%)' }}
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
        </div>

        {/* Page corner curl effect */}
        <div 
          className="absolute bottom-0 right-0 w-10 h-10 hidden md:block"
          style={{
            background: 'linear-gradient(-135deg, transparent 50%, hsl(40, 25%, 88%) 50%)',
            boxShadow: '-2px -2px 4px rgba(0,0,0,0.05)',
          }}
        />
      </motion.div>
    </div>
  );
};

// Decorative tape corner
const TapeCorner = ({ position }: { position: 'top-left' | 'top-right' }) => {
  const isLeft = position === 'top-left';
  
  return (
    <div 
      className={`absolute ${isLeft ? '-left-1 -top-1 rotate-[-15deg]' : '-right-1 -top-1 rotate-[15deg]'} w-8 h-4 z-10`}
      style={{
        background: 'linear-gradient(to bottom, rgba(255,250,240,0.9), rgba(245,240,230,0.8))',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}
    />
  );
};

export default BookPage;
