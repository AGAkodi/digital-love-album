import useSWR from 'swr';
import { supabase } from '@/integrations/supabase/client';

interface Highlight {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  display_order: number;
  created_at: string;
}

const fetchHighlights = async (): Promise<Highlight[]> => {
  const { data, error } = await supabase
    .from('highlights')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching highlights:', error);
    throw error;
  }

  return data || [];
};

export const useHighlights = () => {
  const { data, error, isLoading, mutate } = useSWR<Highlight[]>(
    'highlights',
    fetchHighlights,
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000,
    }
  );

  return {
    highlights: data || [],
    isLoading,
    error,
    refresh: mutate,
  };
};
