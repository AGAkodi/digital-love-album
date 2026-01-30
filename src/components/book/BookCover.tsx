import { motion } from 'framer-motion';

interface BookCoverProps {
  onOpen: () => void;
}

const BookCover = ({ onOpen }: BookCoverProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, rotateY: -30, x: -100 }}
      transition={{ duration: 0.5 }}
      onClick={onOpen}
      className="cursor-pointer"
      style={{ perspective: '1500px' }}
    >
      <motion.div
        whileHover={{ rotateY: -15, scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="relative"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Book spine shadow */}
        <div 
          className="absolute -left-2 top-4 bottom-4 w-8 bg-gradient-to-r from-foreground/40 to-transparent blur-sm"
          style={{ transform: 'translateZ(-10px)' }}
        />
        
        {/* Book cover */}
        <div 
          className="relative w-64 h-80 md:w-72 md:h-96 rounded-r-lg rounded-l-sm overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--muted)) 0%, hsl(var(--accent)) 50%, hsl(var(--muted)) 100%)',
            boxShadow: '5px 5px 20px rgba(0,0,0,0.2), inset -5px 0 15px rgba(0,0,0,0.1)',
          }}
        >
          {/* Book spine */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-5 md:w-6"
            style={{
              background: 'linear-gradient(to right, hsl(var(--muted-foreground) / 0.3), hsl(var(--muted-foreground) / 0.1), hsl(var(--muted-foreground) / 0.2))',
              boxShadow: 'inset -2px 0 5px rgba(0,0,0,0.2)',
            }}
          />

          {/* Decorative border */}
          <div className="absolute inset-6 md:inset-8 border border-muted-foreground/20 rounded-lg" />
          
          {/* Corner decorations */}
          <div className="absolute top-4 left-8 md:left-10 w-6 h-6 border-t border-l border-muted-foreground/30 rounded-tl-lg" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-muted-foreground/30 rounded-tr-lg" />
          <div className="absolute bottom-4 left-8 md:left-10 w-6 h-6 border-b border-l border-muted-foreground/30 rounded-bl-lg" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-muted-foreground/30 rounded-br-lg" />

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
              className="font-romantic text-2xl md:text-3xl text-foreground text-center px-4 leading-tight"
              style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}
            >
              Memories from 20
            </h3>
            <p className="font-elegant text-muted-foreground text-sm mt-4 italic">
              Tap to open
            </p>
          </div>

          {/* Page edges visible on the right */}
          <div 
            className="absolute right-0 top-2 bottom-2 w-1.5"
            style={{
              background: 'repeating-linear-gradient(to bottom, hsl(var(--background)) 0px, hsl(var(--background)) 2px, hsl(var(--muted)) 2px, hsl(var(--muted)) 4px)',
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BookCover;
