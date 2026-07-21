import { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';

export interface WishItem {
  id: string;
  nama: string;
  pesan: string;
  created_at?: string;
  wedding_id?: string; // Support filtering by wedding in the future
}

export function useGuestBook(weddingId?: string) {
  const [wishes, setWishes] = useState<WishItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWishes = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('ucapan')
        .select('*')
        .order('created_at', { ascending: false });

      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (weddingId && uuidRegex.test(weddingId)) {
        query = query.eq('wedding_id', weddingId);
      }

      const { data, error: fetchErr } = await query;

      if (fetchErr) throw fetchErr;
      setWishes(data || []);
    } catch (err: any) {
      console.error('Error loading guest book:', err);
      setError(err.message || 'Gagal memuat ucapan.');
    } finally {
      setLoading(false);
    }
  };

  const submitWish = async (nama: string, pesan: string): Promise<boolean> => {
    if (!nama.trim() || !pesan.trim()) return false;
    try {
      setSubmitting(true);
      const insertData: any = { nama, pesan };

      // Only include wedding_id if it's a valid UUID (mock data uses simple numbers like '5')
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (weddingId && uuidRegex.test(weddingId)) {
        insertData.wedding_id = weddingId;
      }
      
      const { error: insertErr } = await supabase
        .from('ucapan')
        .insert([insertData]);

      if (insertErr) throw insertErr;
      return true;
    } catch (err: any) {
      console.error('Error submitting wish:', err);
      alert('Gagal mengirim ucapan: ' + (err.message || 'Unknown error'));
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    fetchWishes();

    // Subscribe to Postgres changes for real-time updates
    const channel = supabase
      .channel('ucapan-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'ucapan',
        },
        () => {
          fetchWishes();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [weddingId]);

  return { wishes, loading, submitting, error, submitWish, reload: fetchWishes };
}
