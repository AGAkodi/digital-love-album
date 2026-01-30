import useSWR from 'swr';
import { supabase } from '@/integrations/supabase/client';

interface SiteSetting {
  setting_key: string;
  setting_value: string;
}

interface SiteSettings {
  hero_title: string;
  hero_subtitle: string;
  hero_date: string;
  love_note: string;
  background_music_url: string;
}

const defaultSettings: SiteSettings = {
  hero_title: 'Happy Birthday Aniii',
  hero_subtitle: 'Every moment with you is a gift I treasure',
  hero_date: '3rd February, 2026',
  love_note: 'From the moment I met you, my life became a beautiful love story. You are my sunshine, my forever, my everything. Happy Birthday to the most amazing person in my world. I love you more than words could ever express.',
  background_music_url: '',
};

const fetchSiteSettings = async (): Promise<SiteSettings> => {
  const { data, error } = await supabase
    .from('site_settings')
    .select('setting_key, setting_value');

  if (error) {
    console.error('Error fetching site settings:', error);
    throw error;
  }

  if (!data || data.length === 0) {
    return defaultSettings;
  }

  const settings: SiteSettings = { ...defaultSettings };
  
  data.forEach((item: SiteSetting) => {
    const key = item.setting_key as keyof SiteSettings;
    if (key in settings) {
      settings[key] = item.setting_value;
    }
  });

  return settings;
};

export const useSiteSettings = () => {
  const { data, error, isLoading, mutate } = useSWR<SiteSettings>(
    'site_settings',
    fetchSiteSettings,
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000,
      fallbackData: defaultSettings,
    }
  );

  return {
    settings: data || defaultSettings,
    isLoading,
    error,
    refresh: mutate,
  };
};
