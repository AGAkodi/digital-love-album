import { motion } from 'framer-motion';

interface BookCoverProps {
  onOpen: () => void;
}

const BookCover = ({ onOpen }: BookCoverProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateX: 10 }}
      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
      exit={{ opacity: 0, rotateY: -45, x: -50 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onClick={onOpen}
      className="cursor-pointer group"
      style={{ perspective: '1500px' }}
    >
      <motion.div
        whileHover={{ rotateY: -8, rotateX: 2, scale: 1.02 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="relative"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Book shadow */}
        <div 
          className="absolute -bottom-4 left-4 right-4 h-8 bg-foreground/20 blur-xl rounded-full"
          style={{ transform: 'translateZ(-20px)' }}
        />
        
        {/* Book cover - Linen texture */}
        <div 
          className="relative w-72 h-96 md:w-80 md:h-[28rem] rounded-r-md rounded-l-sm overflow-hidden"
          style={{
            background: `
              linear-gradient(135deg, 
                hsl(35, 25%, 88%) 0%, 
                hsl(35, 20%, 82%) 50%, 
                hsl(35, 25%, 78%) 100%
              )
            `,
            boxShadow: `
              8px 8px 24px rgba(0,0,0,0.15),
              inset -3px 0 8px rgba(0,0,0,0.08),
              inset 0 0 60px rgba(255,255,255,0.1)
            `,
          }}
        >
          {/* Linen texture overlay */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Book spine - leather effect */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-6 md:w-7"
            style={{
              background: 'linear-gradient(to right, hsl(35, 30%, 35%), hsl(35, 25%, 45%), hsl(35, 30%, 40%))',
              boxShadow: 'inset -3px 0 8px rgba(0,0,0,0.3), 2px 0 4px rgba(0,0,0,0.1)',
            }}
          >
            {/* Spine ridges */}
            <div className="absolute top-8 left-1 right-1 h-px bg-gradient-to-r from-transparent via-amber-200/30 to-transparent" />
            <div className="absolute top-12 left-1 right-1 h-px bg-gradient-to-r from-transparent via-amber-200/20 to-transparent" />
            <div className="absolute bottom-8 left-1 right-1 h-px bg-gradient-to-r from-transparent via-amber-200/30 to-transparent" />
            <div className="absolute bottom-12 left-1 right-1 h-px bg-gradient-to-r from-transparent via-amber-200/20 to-transparent" />
          </div>

          {/* Gold embossed frame */}
          <div 
            className="absolute inset-8 md:inset-10 ml-10 md:ml-12 border rounded"
            style={{
              borderColor: 'hsl(40, 50%, 65%)',
              boxShadow: 'inset 0 0 0 1px hsl(40, 30%, 75%), 0 0 0 1px hsl(35, 20%, 60%)',
            }}
          />

          {/* Corner flourishes */}
          <CornerFlourish position="top-left" />
          <CornerFlourish position="top-right" />
          <CornerFlourish position="bottom-left" />
          <CornerFlourish position="bottom-right" />

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pl-6">
            {/* Decorative emblem */}
            <motion.div
              animate={{ 
                opacity: [0.8, 1, 0.8],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="mb-6"
            >
              <div 
                className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, hsl(40, 45%, 70%) 0%, hsl(40, 40%, 60%) 100%)',
                  boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.3), 0 2px 8px rgba(0,0,0,0.15)',
                }}
              >
                <span className="text-3xl md:text-4xl">💕</span>
              </div>
            </motion.div>

            {/* Title */}
            <h3 
              className="font-romantic text-3xl md:text-4xl text-center px-6 leading-tight mb-2"
              style={{ 
                color: 'hsl(35, 30%, 30%)',
                textShadow: '1px 1px 0 rgba(255,255,255,0.5)',
              }}
            >
              Memories
            </h3>
            <p 
              className="font-elegant text-lg md:text-xl italic"
              style={{ color: 'hsl(35, 25%, 40%)' }}
            >
              from 20
            </p>

            {/* Decorative line */}
            <div 
              className="w-24 h-px mt-6 mb-4"
              style={{
                background: 'linear-gradient(to right, transparent, hsl(40, 45%, 60%), transparent)',
              }}
            />

            {/* Tap hint */}
            <motion.p 
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="font-elegant text-sm italic mt-2"
              style={{ color: 'hsl(35, 20%, 50%)' }}
            >
              tap to open
            </motion.p>
          </div>

          {/* Page edges */}
          <div 
            className="absolute right-0 top-3 bottom-3 w-2"
            style={{
              background: `repeating-linear-gradient(
                to bottom,
                hsl(40, 20%, 95%) 0px,
                hsl(40, 20%, 95%) 1px,
                hsl(40, 15%, 88%) 1px,
                hsl(40, 15%, 88%) 3px
              )`,
              boxShadow: 'inset 2px 0 4px rgba(0,0,0,0.05)',
            }}
          />

          {/* Ribbon bookmark */}
          <div 
            className="absolute top-0 right-8 w-4 h-24"
            style={{
              background: 'linear-gradient(to bottom, hsl(0, 45%, 45%), hsl(0, 40%, 40%))',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)',
            }}
          />
        </div>

        {/* Hover glow effect */}
        <motion.div
          className="absolute inset-0 rounded-r-md rounded-l-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255,220,180,0.15) 0%, transparent 70%)',
          }}
        />
      </motion.div>
    </motion.div>
  );
};

// Corner flourish component
const CornerFlourish = ({ position }: { position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) => {
  const positionClasses = {
    'top-left': 'top-6 left-12 md:left-14',
    'top-right': 'top-6 right-6',
    'bottom-left': 'bottom-6 left-12 md:left-14 rotate-[-90deg]',
    'bottom-right': 'bottom-6 right-6 rotate-180',
  };

  const rotation = {
    'top-left': 'rotate-0',
    'top-right': 'rotate-90',
    'bottom-left': 'rotate-[-90deg]',
    'bottom-right': 'rotate-180',
  };

  return (
    <div className={`absolute w-8 h-8 ${positionClasses[position]} ${rotation[position]}`}>
      <svg viewBox="0 0 32 32" className="w-full h-full" style={{ color: 'hsl(40, 45%, 60%)' }}>
        <path
          d="M4 4 Q4 16 16 16 Q4 16 4 28"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="8" cy="8" r="2" fill="currentColor" opacity="0.6" />
      </svg>
    </div>
  );
};

export default BookCover;
