import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Music } from 'lucide-react';

interface MusicPlayerProps {
  musicUrl?: string;
}

const MusicPlayer = ({ musicUrl }: MusicPlayerProps) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current && musicUrl) {
      audioRef.current.volume = 0.3;
    }
  }, [musicUrl]);

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          setIsMuted(false);
        }).catch(() => {
          // Autoplay blocked
        });
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
        setIsMuted(true);
      }
    }
  };

  if (!musicUrl) {
    return (
      <motion.button
        className="music-btn opacity-50 cursor-not-allowed"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.5 }}
        transition={{ delay: 2, type: 'spring' }}
        title="No music configured"
      >
        <Music className="h-5 w-5" />
      </motion.button>
    );
  }

  return (
    <>
      <audio ref={audioRef} src={musicUrl} loop preload="auto" />
      <motion.button
        className="music-btn"
        onClick={toggleMute}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: 'spring' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title={isMuted ? 'Play music' : 'Mute music'}
      >
        {isMuted ? (
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
