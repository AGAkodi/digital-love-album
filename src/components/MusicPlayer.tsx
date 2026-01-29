import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import backgroundMusic from '@/assets/background-music.mp3';

const MusicPlayer = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.15; // Low volume (15%)
      
      // Attempt autoplay
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Autoplay blocked by browser - user needs to interact
            setAutoplayBlocked(true);
          });
      }
    }
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      if (autoplayBlocked && !isPlaying) {
        // First click after autoplay was blocked - start playing
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          setAutoplayBlocked(false);
          setIsMuted(false);
        }).catch(() => {});
      } else if (isMuted) {
        audioRef.current.muted = false;
        setIsMuted(false);
      } else {
        audioRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };

  return (
    <>
      <audio ref={audioRef} src={backgroundMusic} loop preload="auto" />
      <motion.button
        className="music-btn"
        onClick={toggleMute}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: 'spring' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title={autoplayBlocked ? 'Click to play music' : (isMuted ? 'Unmute' : 'Mute')}
      >
        {isMuted || autoplayBlocked ? (
          <VolumeX className="h-5 w-5" />
        ) : (
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Volume2 className="h-5 w-5" />
          </motion.div>
        )}
      </motion.button>
    </>
  );
};

export default MusicPlayer;
