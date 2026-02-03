import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import backgroundMusic from '@/assets/background-music.mp3';

const MusicPlayer = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const hasTriedAutoplay = useRef(false);

  // Attempt to play music
  const attemptPlay = async () => {
    if (!audioRef.current || isPlaying) return;
    
    try {
      await audioRef.current.play();
      setIsPlaying(true);
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.15;
    }
  }, []);

  // Initial autoplay attempt
  useEffect(() => {
    if (hasTriedAutoplay.current) return;
    hasTriedAutoplay.current = true;
    
    // Try immediate autoplay
    attemptPlay();
  }, []);

  // Listen for any user interaction to start music (browser autoplay policy)
  useEffect(() => {
    if (isPlaying) return;

    const startOnInteraction = () => {
      attemptPlay();
    };

    // Listen for various user interactions
    const events = ['click', 'touchstart', 'keydown', 'scroll'];
    events.forEach(event => {
      document.addEventListener(event, startOnInteraction, { once: true, passive: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, startOnInteraction);
      });
    };
  }, [isPlaying]);

  const toggleMute = () => {
    if (!audioRef.current) return;

    if (!isPlaying) {
      attemptPlay();
    } else if (isMuted) {
      audioRef.current.muted = false;
      setIsMuted(false);
    } else {
      audioRef.current.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={backgroundMusic} loop preload="auto" />
      <motion.button
        className="fixed bottom-4 right-4 z-50 p-3 sm:p-4 rounded-full bg-primary/90 text-primary-foreground shadow-glow backdrop-blur-sm transition-all duration-300 hover:scale-110"
        onClick={toggleMute}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title={!isPlaying ? 'Click to play music' : (isMuted ? 'Unmute' : 'Mute')}
      >
        {isMuted || !isPlaying ? (
          <VolumeX className="h-4 w-4 sm:h-5 sm:w-5" />
        ) : (
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Volume2 className="h-4 w-4 sm:h-5 sm:w-5" />
          </motion.div>
        )}
      </motion.button>
    </>
  );
};

export default MusicPlayer;
