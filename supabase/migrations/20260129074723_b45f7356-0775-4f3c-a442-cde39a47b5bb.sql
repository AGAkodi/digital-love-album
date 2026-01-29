-- Create gallery items table for photos and videos
CREATE TABLE public.gallery_items (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    media_url TEXT NOT NULL,
    media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video')),
    caption TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create highlight moments table
CREATE TABLE public.highlights (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create site settings table for customizable content
CREATE TABLE public.site_settings (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    setting_key TEXT NOT NULL UNIQUE,
    setting_value TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default settings
INSERT INTO public.site_settings (setting_key, setting_value) VALUES
    ('hero_title', 'Happy Birthday, My Love'),
    ('hero_subtitle', 'Every moment with you is a gift I treasure'),
    ('hero_date', 'February 14, 2026'),
    ('love_note', 'From the moment I met you, my life became a beautiful love story. You are my sunshine, my forever, my everything. Happy Birthday to the most amazing person in my world. I love you more than words could ever express.'),
    ('background_music_url', '');

-- Enable Row Level Security (public read for viewers)
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.highlights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (no auth required for viewers)
CREATE POLICY "Anyone can view gallery items"
    ON public.gallery_items FOR SELECT
    USING (true);

CREATE POLICY "Anyone can view highlights"
    ON public.highlights FOR SELECT
    USING (true);

CREATE POLICY "Anyone can view site settings"
    ON public.site_settings FOR SELECT
    USING (true);

-- Create storage bucket for media files
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true);

-- Create storage policy for public access
CREATE POLICY "Anyone can view media"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'media');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_gallery_items_updated_at
    BEFORE UPDATE ON public.gallery_items
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
    BEFORE UPDATE ON public.site_settings
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();