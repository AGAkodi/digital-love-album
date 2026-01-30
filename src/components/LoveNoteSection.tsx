import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X } from 'lucide-react';

interface LoveNoteSectionProps {
  note: string;
}

const LoveNoteSection = ({ note }: LoveNoteSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  // Split note into paragraphs for better formatting
  const paragraphs = note.split('\n\n').filter(p => p.trim());

  return (
    <section className="relative py-24 px-6 bg-romantic overflow-hidden min-h-[80vh] flex flex-col items-center justify-center">
      {/* Decorative background hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-primary/10"
            style={{
              left: `${10 + i * 10}%`,
              top: `${15 + (i % 3) * 30}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            <Heart size={25 + i * 4} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="font-romantic text-5xl md:text-6xl text-foreground mb-4">
          A Note For You
        </h2>
        <p className="font-elegant text-xl text-muted-foreground italic">
          Tap the envelope to open
        </p>
      </motion.div>

      {/* Closed Envelope */}
      <AnimatePresence mode="wait">
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: -50 }}
            transition={{ duration: 0.5 }}
            onClick={handleOpen}
            className="cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <div 
              className="relative w-72 h-48 md:w-96 md:h-64"
              style={{ perspective: '1000px' }}
            >
              {/* Envelope body */}
              <div 
                className="absolute inset-0 rounded-lg overflow-hidden"
                style={{
                  background: 'linear-gradient(145deg, #f5e6d3 0%, #e8d4be 50%, #dcc5a8 100%)',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.2), inset 0 -5px 20px rgba(0,0,0,0.05)',
                }}
              >
                {/* Envelope flap (triangular top) */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1/2"
                  style={{
                    background: 'linear-gradient(180deg, #eddcc6 0%, #e2cdb5 100%)',
                    clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                  }}
                />

                {/* Inner shadow for depth */}
                <div 
                  className="absolute top-[25%] left-[10%] right-[10%] bottom-[10%] rounded"
                  style={{
                    background: 'linear-gradient(180deg, rgba(139,69,19,0.1) 0%, transparent 30%)',
                  }}
                />

                {/* Wax seal */}
                <motion.div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center z-10"
                  style={{
                    background: 'radial-gradient(circle at 30% 30%, #c62828 0%, #8b1a1a 70%, #5d1212 100%)',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.3), inset 0 2px 5px rgba(255,255,255,0.2)',
                  }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Heart className="h-8 w-8 md:h-10 md:w-10 text-red-200" fill="currentColor" />
                </motion.div>

                {/* Address label */}
                <div 
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded"
                  style={{
                    background: 'rgba(255,255,255,0.7)',
                  }}
                >
                  <p 
                    className="font-romantic text-2xl md:text-3xl text-amber-900"
                    style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}
                  >
                    To: Anita
                  </p>
                </div>

                {/* Decorative border lines */}
                <div className="absolute bottom-3 left-3 right-3 h-px bg-amber-700/20" />
                <div className="absolute bottom-5 left-6 right-6 h-px bg-amber-700/10" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Open Envelope / Letter Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/80 backdrop-blur-md p-4 overflow-y-auto"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-30 p-3 rounded-full bg-background/20 text-primary-foreground hover:bg-background/30 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Letter */}
            <motion.div
              initial={{ opacity: 0, y: 100, rotateX: -30 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto my-8"
              style={{ perspective: '1000px' }}
            >
              {/* Letter paper */}
              <div 
                className="rounded-lg p-6 md:p-10"
                style={{
                  background: 'linear-gradient(180deg, #fffef9 0%, #f9f5eb 50%, #f5f0e4 100%)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.3), inset 0 0 30px rgba(0,0,0,0.02)',
                }}
              >
                {/* Decorative header */}
                <div className="text-center mb-6 pb-6 border-b border-amber-200/50">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="inline-block mb-3"
                  >
                    <Heart className="h-10 w-10 text-primary" fill="currentColor" />
                  </motion.div>
                  <h3 
                    className="font-romantic text-3xl md:text-4xl text-amber-800"
                    style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}
                  >
                    My Dearest Anita
                  </h3>
                </div>

                {/* Letter content */}
                <div className="space-y-4 md:space-y-5">
                  {paragraphs.map((paragraph, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                      className="font-elegant text-base md:text-lg leading-relaxed text-amber-900/90"
                      style={{ textIndent: '1.5em' }}
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>

                {/* Signature */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-8 pt-6 border-t border-amber-200/50 text-right"
                >
                  <p className="font-romantic text-2xl md:text-3xl text-primary">
                    Forever Yours
                  </p>
                  <div className="flex justify-end gap-2 mt-3">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                      >
                        <Heart className="h-5 w-5 text-primary" fill="currentColor" />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Paper texture lines */}
                <div className="absolute inset-x-6 top-6 bottom-6 pointer-events-none opacity-30">
                  {[...Array(20)].map((_, i) => (
                    <div 
                      key={i}
                      className="h-px bg-blue-200/30"
                      style={{ marginTop: `${(i + 1) * 1.5}em` }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default LoveNoteSection;
