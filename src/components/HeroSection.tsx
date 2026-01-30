import { motion } from 'framer-motion';
import { Heart, ChevronDown } from 'lucide-react';
import heroVideo from '@/assets/hero-video.mp4';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  date: string;
}

const HeroSection = ({ title, subtitle, date }: HeroSectionProps) => {
  const scrollToGallery = () => {
    document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover brightness-[0.15]"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background" />
      </div>

      {/* Decorative glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-glow opacity-60" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-card/90 backdrop-blur-md text-foreground font-elegant text-lg md:text-xl tracking-wider shadow-lg border border-border/50">
            <Heart className="h-5 w-5 text-primary" fill="currentColor" />
            <span className="font-semibold">{date}</span>
            <Heart className="h-5 w-5 text-primary" fill="currentColor" />
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="font-romantic text-6xl md:text-8xl lg:text-9xl text-white mb-6 leading-tight drop-shadow-[0_4px_20px_rgba(255,255,255,0.4)]"
          style={{ textShadow: '0 0 40px rgba(255,255,255,0.5), 0 0 80px rgba(255,255,255,0.3)' }}
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="font-elegant text-xl md:text-2xl text-muted-foreground italic max-w-2xl mx-auto mb-12"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex justify-center gap-4"
        >
          <button onClick={scrollToGallery} className="btn-romantic">
            View Your Memories
          </button>
        </motion.div>

        {/* Floating hearts around title */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-primary/30"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            <Heart size={12 + i * 4} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <motion.button
          onClick={scrollToGallery}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="font-elegant text-sm mb-2">Scroll Down</span>
          <ChevronDown className="h-6 w-6" />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
