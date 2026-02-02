import { useState, useEffect } from 'react';
import IntroAnimation from '@/components/IntroAnimation';
import FloatingHearts from '@/components/FloatingHearts';
import MusicPlayer from '@/components/MusicPlayer';
import HeroSection from '@/components/HeroSection';
import GalleryCarousel from '@/components/GalleryCarousel';
import LoveNoteSection from '@/components/LoveNoteSection';
import { useSiteSettings } from '@/hooks/useSiteSettings';

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [introComplete, setIntroComplete] = useState(false);
  
  const { settings } = useSiteSettings();

  useEffect(() => {
    // Auto-hide intro after 4 seconds
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const handleIntroComplete = () => {
    setIntroComplete(true);
  };

  return (
    <div className="min-h-screen bg-background scroll-smooth-sections">
      {/* Intro Animation */}
      <IntroAnimation isVisible={showIntro} onComplete={handleIntroComplete} />

      {/* Floating Hearts Background */}
      {introComplete && <FloatingHearts count={12} />}

      {/* Music Player */}
      {introComplete && <MusicPlayer />}

      {/* Main Content */}
      <main className={introComplete ? 'opacity-100' : 'opacity-0'}>
        {/* Hero Section */}
        <HeroSection
          title={settings.hero_title}
          subtitle={settings.hero_subtitle}
          date={settings.hero_date}
        />

        {/* Gallery Carousel */}
        <GalleryCarousel />

        {/* Love Note Section */}
        <LoveNoteSection note={settings.love_note} />

        {/* Footer */}
        <footer className="py-8 px-6 bg-card text-center">
          <p className="font-elegant text-muted-foreground italic">
            Made with ❤️ for you
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
