import { useEffect } from 'react';
import type { WeddingData } from '../types/wedding';

/**
 * Dynamically updates the document <title> and Open Graph meta tags
 * based on the wedding data. This helps with:
 * - Browser tab titles showing correct names
 * - Some social media crawlers that execute JS (limited)
 */
export function useOgMeta(data: WeddingData | null) {
  useEffect(() => {
    if (!data) return;

    const bride = data.bride_name || 'Mempelai Wanita';
    const groom = data.groom_name || 'Mempelai Pria';
    const title = `Undangan Pernikahan ${bride} & ${groom}`;
    const description = `Anda diundang ke pernikahan ${bride} & ${groom}. ${data.akad_date_text || ''}${data.akad_location ? ' di ' + data.akad_location : ''}. Buka undangan digital ini untuk info lengkap.`;

    // Update document title
    document.title = title;

    // Helper to update or create a meta tag
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);

    // Cleanup: restore default on unmount
    return () => {
      document.title = 'Undangan Pernikahan Digital';
    };
  }, [data]);
}
