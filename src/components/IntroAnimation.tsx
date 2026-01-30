import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

const confettiColors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];
const confettiShapes = ['●', '■', '▲', '★', '♦'];

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  shape: string;
  delay: number;
  duration: number;
  rotation: number;
}

interface IntroAnimationProps {
  isVisible: boolean;
  onComplete: () => void;
}

const IntroAnimation = ({ isVisible, onComplete }: IntroAnimationProps) => {
  // Generate confetti pieces
  const confettiPieces: ConfettiPiece[] = [...Array(50)].map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
    shape: confettiShapes[Math.floor(Math.random() * confettiShapes.length)],
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 2,
    rotation: Math.random() * 360,
  }));

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
              className="mb-6 flex justify-center text-7xl md:text-9xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: 2, ease: 'easeInOut' }}
            >
              🎂
            </motion.div>
            <motion.h1
              className="font-romantic text-7xl md:text-9xl text-foreground mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              21
            </motion.h1>
            <motion.p
              className="font-elegant text-2xl md:text-3xl text-muted-foreground italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              Happy Birthday!
            </motion.p>
          </motion.div>

          {/* Confetti Animation */}
          {confettiPieces.map((piece) => (
            <motion.div
              key={`confetti-${piece.id}`}
              className="absolute text-2xl pointer-events-none"
              style={{
                left: `${piece.x}%`,
                top: '-5%',
                color: piece.color,
              }}
              initial={{ y: 0, opacity: 0, rotate: 0, scale: 0 }}
              animate={{
                y: '120vh',
                opacity: [0, 1, 1, 0.8, 0],
                rotate: piece.rotation + 720,
                scale: [0, 1, 1, 0.8],
              }}
              transition={{
                duration: piece.duration,
                delay: piece.delay,
                ease: 'easeOut',
              }}
            >
              {piece.shape}
            </motion.div>
          ))}

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
