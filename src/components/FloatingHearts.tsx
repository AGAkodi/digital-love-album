import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

interface HeartParticle {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
}

interface FloatingHeartsProps {
  count?: number;
  active?: boolean;
}

const FloatingHearts = ({ count = 15, active = true }: FloatingHeartsProps) => {
  const [hearts, setHearts] = useState<HeartParticle[]>([]);

  useEffect(() => {
    if (!active) return;
    
    const newHearts: HeartParticle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 8 + Math.random() * 6,
      size: 12 + Math.random() * 16,
    }));
    setHearts(newHearts);
  }, [count, active]);

  if (!active) return null;

  return (
    <div className="hearts-container">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-beige/40"
          style={{ left: `${heart.x}%` }}
          initial={{ y: '110vh', opacity: 0, rotate: 0, scale: 0.5 }}
          animate={{
            y: '-20vh',
            opacity: [0, 0.8, 0.8, 0],
            rotate: 360,
            scale: 1,
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Heart size={heart.size} fill="currentColor" />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
