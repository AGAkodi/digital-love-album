import { motion } from 'framer-motion';
import { Heart, Sparkles, Star, Camera } from 'lucide-react';

interface Highlight {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  display_order: number;
}

interface HighlightsSectionProps {
  highlights: Highlight[];
  isLoading: boolean;
}

const defaultHighlights = [
  { icon: Heart, title: 'The Day I Met You', description: 'The moment that changed everything' },
  { icon: Sparkles, title: 'Your Smile', description: 'The light that brightens my world' },
  { icon: Camera, title: 'Our Memories', description: 'Every moment is a treasure' },
  { icon: Star, title: 'My Favorite Person', description: 'You are my everything' },
];

const HighlightsSection = ({ highlights, isLoading }: HighlightsSectionProps) => {
  const sortedHighlights = [...highlights].sort((a, b) => a.display_order - b.display_order);
  const displayHighlights = sortedHighlights.length > 0 ? sortedHighlights : null;

  return (
    <section className="py-20 px-6 bg-hero-gradient">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-romantic text-5xl md:text-6xl text-foreground mb-4">
            Special Moments
          </h2>
          <p className="font-elegant text-xl text-muted-foreground italic">
            The little things that mean the most
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="highlight-card animate-pulse">
                <div className="h-32 bg-muted rounded-2xl mb-4" />
                <div className="h-6 bg-muted rounded w-3/4 mb-2" />
                <div className="h-4 bg-muted rounded w-full" />
              </div>
            ))
          ) : displayHighlights ? (
            displayHighlights.map((highlight, index) => (
              <motion.div
                key={highlight.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="highlight-card text-center"
              >
                {highlight.image_url ? (
                  <div className="w-full h-40 rounded-2xl overflow-hidden mb-4">
                    <img
                      src={highlight.image_url}
                      alt={highlight.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
                    <Heart className="h-8 w-8 text-primary" />
                  </div>
                )}
                <h3 className="font-romantic text-3xl text-foreground mb-2">
                  {highlight.title}
                </h3>
                {highlight.description && (
                  <p className="font-elegant text-muted-foreground italic">
                    {highlight.description}
                  </p>
                )}
              </motion.div>
            ))
          ) : (
            defaultHighlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="highlight-card text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-romantic text-3xl text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="font-elegant text-muted-foreground italic">
                  {item.description}
                </p>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default HighlightsSection;
