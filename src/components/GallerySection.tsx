import { motion } from 'framer-motion';
import { Play, Image as ImageIcon, Expand } from 'lucide-react';
import { useState } from 'react';
import GalleryModal from './GalleryModal';
import Slideshow from './Slideshow';

interface GalleryItem {
  id: string;
  media_url: string;
  media_type: 'image' | 'video';
  caption: string | null;
  display_order: number;
}

interface GallerySectionProps {
  items: GalleryItem[];
  isLoading: boolean;
}

const GallerySection = ({ items, isLoading }: GallerySectionProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isSlideshowActive, setIsSlideshowActive] = useState(false);

  const sortedItems = [...items].sort((a, b) => a.display_order - b.display_order);

  if (isLoading) {
    return (
      <section id="gallery" className="py-20 px-6 bg-romantic">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-romantic text-5xl md:text-6xl text-foreground mb-4">
              Our Memories
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-2xl bg-muted animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section id="gallery" className="py-20 px-6 bg-romantic">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-romantic text-5xl md:text-6xl text-foreground mb-4">
            Our Memories
          </h2>
          <p className="font-elegant text-xl text-muted-foreground italic mb-8">
            Your beautiful moments will appear here
          </p>
          <div className="flex items-center justify-center gap-3 text-muted-foreground">
            <ImageIcon className="h-12 w-12 opacity-30" />
            <span className="font-body text-sm">No photos uploaded yet</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="gallery" className="py-20 px-6 bg-romantic">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="font-romantic text-5xl md:text-6xl text-foreground mb-4">
              Our Memories
            </h2>
            <p className="font-elegant text-xl text-muted-foreground italic mb-8">
              Every picture tells our story
            </p>
            <button
              onClick={() => setIsSlideshowActive(true)}
              className="btn-romantic inline-flex items-center gap-2"
            >
              <Play className="h-5 w-5" />
              Start Slideshow
            </button>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sortedItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="gallery-card aspect-square cursor-pointer group"
                onClick={() => setSelectedIndex(index)}
              >
                {item.media_type === 'video' ? (
                  <div className="relative w-full h-full">
                    <video
                      src={item.media_url}
                      className="w-full h-full object-cover"
                      muted
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-foreground/20 group-hover:bg-foreground/30 transition-colors">
                      <Play className="h-12 w-12 text-primary-foreground drop-shadow-lg" />
                    </div>
                  </div>
                ) : (
                  <img
                    src={item.media_url}
                    alt={item.caption || 'Memory'}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Expand className="h-8 w-8 text-primary-foreground drop-shadow-lg" />
                </div>
                {item.caption && (
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-primary-foreground text-sm font-body truncate">
                      {item.caption}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <GalleryModal
        items={sortedItems}
        selectedIndex={selectedIndex}
        onClose={() => setSelectedIndex(null)}
        onNavigate={setSelectedIndex}
      />

      <Slideshow
        items={sortedItems}
        isActive={isSlideshowActive}
        onClose={() => setIsSlideshowActive(false)}
      />
    </>
  );
};

export default GallerySection;
