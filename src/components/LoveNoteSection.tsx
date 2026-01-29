import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface LoveNoteSectionProps {
  note: string;
}

const LoveNoteSection = ({ note }: LoveNoteSectionProps) => {
  return (
    <section className="relative py-24 px-6 bg-romantic overflow-hidden">
      {/* Decorative background hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-primary/10"
            style={{
              left: `${5 + i * 8}%`,
              top: `${10 + (i % 4) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, 0],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 5 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          >
            <Heart size={30 + i * 5} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="mb-8 flex justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Heart className="h-16 w-16 text-primary" fill="currentColor" />
          </motion.div>

          <h2 className="font-romantic text-5xl md:text-6xl text-foreground mb-8">
            A Note For You
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="p-8 md:p-12 rounded-3xl bg-card/80 backdrop-blur-sm shadow-card border border-border/50"
          >
            <p className="font-elegant text-xl md:text-2xl leading-relaxed text-foreground/90 italic">
              "{note}"
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 font-romantic text-4xl text-primary"
          >
            With all my love, forever yours
          </motion.p>

          <motion.div
            className="mt-8 flex justify-center gap-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              >
                <Heart className="h-6 w-6 text-primary" fill="currentColor" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default LoveNoteSection;
