import useSWR from 'swr';
import { supabase } from '@/integrations/supabase/client';

interface GalleryItem {
  id: string;
  media_url: string;
  media_type: 'image' | 'video';
  caption: string | null;
  display_order: number;
  created_at: string;
}

const fetchGalleryItems = async (): Promise<GalleryItem[]> => {
  const { data, error } = await supabase
    .from('gallery_items')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching gallery items:', error);
    throw error;
  }

  return (data || []).map(item => ({
    ...item,
    media_type: item.media_type as 'image' | 'video'
  }));
};

export const useGallery = () => {
  const { data, error, isLoading, mutate } = useSWR<GalleryItem[]>(
    'gallery_items',
    fetchGalleryItems,
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000,
    }
  );

  return {
    items: data || [],
    isLoading,
    error,
    refresh: mutate,
  };
};
