import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

interface IntroAnimationProps {
  isVisible: boolean;
  onComplete: () => void;
}

const IntroAnimation = ({ isVisible, onComplete }: IntroAnimationProps) => {
  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        >
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(20px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 2, ease: 'easeOut' }}
          >
            <motion.div
              className="mb-6 flex justify-center"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: 2, ease: 'easeInOut' }}
            >
              <Heart className="h-20 w-20 text-primary" fill="currentColor" />
            </motion.div>
            <motion.h1
              className="font-romantic text-5xl md:text-7xl text-foreground mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              A Love Story
            </motion.h1>
            <motion.p
              className="font-elegant text-xl text-muted-foreground italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              for you...
            </motion.p>
          </motion.div>

          {/* Floating hearts during intro */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-primary/40"
              style={{
                left: `${10 + i * 12}%`,
                top: '50%',
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.6, 0],
                scale: [0.5, 1.2, 0.5],
                y: [-50, -150],
                x: [0, (i % 2 === 0 ? 30 : -30)],
              }}
              transition={{
                duration: 3,
                delay: 0.5 + i * 0.2,
                ease: 'easeOut',
              }}
            >
              <Heart size={20 + i * 4} fill="currentColor" />
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroAnimation;
