import { supabaseClient } from './supabaseClient';
import type { WeddingData } from '../types/wedding';

// Mock data fallback khusus untuk menjamin Live Demo selalu berfungsi
export const mockWeddings: Record<string, WeddingData> = {
  'lulu-bayu': {
    id: '1',
    slug: 'lulu-bayu',
    template_id: 1, // Elegant Luxury (Template Master)
    payment_status: 'paid',
    is_configured: true,
    buyer_name: 'Bayu Wisnu',
    buyer_email: 'bayu@example.com',
    bride_name: 'Lulu',
    bride_fullname: 'Lulu Diyanti Putri',
    bride_parents: 'Bapak Yosep & Ibu Zulfira Yanti',
    groom_name: 'Bayu',
    groom_fullname: 'Bayu Wisnu Aji',
    groom_parents: 'Bapak Sukamto & Ibu Suwarti',
    event_date: '2026-08-16T08:00:00+07:00',
    akad_date_text: 'Ahad, 16 Agustus 2026',
    akad_time_text: '08.00 WIB – Selesai',
    akad_location: 'Gedung PT INTI',
    akad_address: 'Jl. Moh. Toha No.77, Bandung',
    resepsi_date_text: 'Ahad, 16 Agustus 2026',
    resepsi_time_text: '11.00 WIB – 14.00 WIB',
    resepsi_location: 'Gedung PT INTI',
    resepsi_address: 'Jl. Moh. Toha No.77, Bandung',
    maps_url: 'https://maps.app.goo.gl/abeHsbATGtEhxFf26',
    maps_iframe_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15842.40926540292!2d107.58919485541989!3d-6.938040799999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e63a66953993%3A0x248047e0057191ae!2sPT.%20Inti%20(Persero)!5e0!3m2!1sid!2sid!4v1781082382014!5m2!1sid!2sid',
    music_url: 'asset/spike.mp3',
    cover_bg_image: 'bg-wedding.png',
    bg_image: 'background.png',
    gallery_images: ['bg-wedding.png', 'background.png']
  },
  'joko-riri': {
    id: '3',
    slug: 'joko-riri',
    template_id: 2, // Minimal White
    payment_status: 'paid',
    is_configured: true,
    buyer_name: 'Joko Santoso',
    buyer_email: 'joko@example.com',
    bride_name: 'Riri',
    bride_fullname: 'Riri Amelia',
    bride_parents: 'Bapak Bambang & Ibu Rini',
    groom_name: 'Joko',
    groom_fullname: 'Joko Santoso',
    groom_parents: 'Bapak Sugeng & Ibu Sumiyati',
    event_date: '2026-10-10T08:00:00+07:00',
    akad_date_text: 'Sabtu, 10 Oktober 2026',
    akad_time_text: '08.00 WIB – Selesai',
    akad_location: 'Gedung Bale Rame',
    akad_address: 'Jl. Gading Tutuka, Soreang',
    resepsi_date_text: 'Sabtu, 10 Oktober 2026',
    resepsi_time_text: '11.00 WIB – 14.00 WIB',
    resepsi_location: 'Gedung Bale Rame',
    resepsi_address: 'Jl. Gading Tutuka, Soreang',
    maps_url: 'https://maps.app.goo.gl/abeHsbATGtEhxFf26',
    maps_iframe_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15842.40926540292!2d107.58919485541989!3d-6.938040799999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e63a66953993%3A0x248047e0057191ae!2sPT.%20Inti%20(Persero)!5e0!3m2!1sid!2sid!4v1781082382014!5m2!1sid!2sid',
    music_url: 'asset/spike.mp3',
    cover_bg_image: 'bg-wedding.png',
    bg_image: 'background.png',
    gallery_images: ['bg-wedding.png', 'background.png']
  },
  'andi-rina': {
    id: '2',
    slug: 'andi-rina',
    template_id: 3, // Modern Glassmorphism
    payment_status: 'paid',
    is_configured: true,
    buyer_name: 'Andi Wijaya',
    buyer_email: 'andi@example.com',
    bride_name: 'Rina',
    bride_fullname: 'Rina Herawati',
    bride_parents: 'Bapak Ahmad & Ibu Siti',
    groom_name: 'Andi',
    groom_fullname: 'Andi Wijaya',
    groom_parents: 'Bapak Hartono & Ibu Sri',
    event_date: '2026-09-20T09:00:00+07:00',
    akad_date_text: 'Sabtu, 20 September 2026',
    akad_time_text: '09.00 WIB – 10.30 WIB',
    akad_location: 'Masjid Raya Al-Jabbar',
    akad_address: 'Jl. Cimencrang No.14, Bandung',
    resepsi_date_text: 'Sabtu, 20 September 2026',
    resepsi_time_text: '12.00 WIB – 15.00 WIB',
    resepsi_location: 'Prama Grand Preanger Hotel',
    resepsi_address: 'Jl. Asia Afrika No.81, Bandung',
    maps_url: 'https://maps.app.goo.gl/abeHsbATGtEhxFf26',
    maps_iframe_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15842.40926540292!2d107.58919485541989!3d-6.938040799999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e63a66953993%3A0x248047e0057191ae!2sPT.%20Inti%20(Persero)!5e0!3m2!1sid!2sid!4v1781082382014!5m2!1sid!2sid',
    music_url: 'asset/spike.mp3',
    cover_bg_image: 'bg-wedding.png',
    bg_image: 'background.png',
    gallery_images: ['bg-wedding.png', 'background.png']
  },
  'budi-siti': {
    id: '4',
    slug: 'budi-siti',
    template_id: 4, // Floral Garden
    payment_status: 'paid',
    is_configured: true,
    buyer_name: 'Budi Raharjo',
    buyer_email: 'budi@example.com',
    bride_name: 'Siti',
    bride_fullname: 'Siti Aminah',
    bride_parents: 'Bapak Mansyur & Ibu Fatimah',
    groom_name: 'Budi',
    groom_fullname: 'Budi Raharjo',
    groom_parents: 'Bapak Salim & Ibu Halimah',
    event_date: '2026-11-15T09:00:00+07:00',
    akad_date_text: 'Ahad, 15 November 2026',
    akad_time_text: '09.00 WIB – Selesai',
    akad_location: 'Pine Forest Camp Lembang',
    akad_address: 'Maribaya, Lembang, Bandung Barat',
    resepsi_date_text: 'Ahad, 15 November 2026',
    resepsi_time_text: '11.00 WIB – 15.00 WIB',
    resepsi_location: 'Pine Forest Camp Lembang',
    resepsi_address: 'Maribaya, Lembang, Bandung Barat',
    maps_url: 'https://maps.app.goo.gl/abeHsbATGtEhxFf26',
    maps_iframe_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15842.40926540292!2d107.58919485541989!3d-6.938040799999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e63a66953993%3A0x248047e0057191ae!2sPT.%20Inti%20(Persero)!5e0!3m2!1sid!2sid!4v1781082382014!5m2!1sid!2sid',
    music_url: 'asset/spike.mp3',
    cover_bg_image: 'bg-wedding.png',
    bg_image: 'background.png',
    gallery_images: ['bg-wedding.png', 'background.png']
  },
  'anton-mega': {
    id: '5',
    slug: 'anton-mega',
    template_id: 5, // Dark Elegant
    payment_status: 'paid',
    is_configured: true,
    buyer_name: 'Anton Wibowo',
    buyer_email: 'anton@example.com',
    bride_name: 'Mega',
    bride_fullname: 'Mega Utami',
    bride_parents: 'Bapak Hendra & Ibu Rossi',
    groom_name: 'Anton',
    groom_fullname: 'Anton Wibowo',
    groom_parents: 'Bapak Gunawan & Ibu Siska',
    event_date: '2026-12-25T08:00:00+07:00',
    akad_date_text: 'Jumat, 25 Desember 2026',
    akad_time_text: '08.00 WIB – Selesai',
    akad_location: 'Sheraton Hotel & Towers',
    akad_address: 'Jl. Ir. H. Juanda No.390, Bandung',
    resepsi_date_text: 'Jumat, 25 Desember 2026',
    resepsi_time_text: '18.30 WIB – 21.30 WIB',
    resepsi_location: 'Sheraton Hotel & Towers Ballroom',
    resepsi_address: 'Jl. Ir. H. Juanda No.390, Bandung',
    maps_url: 'https://maps.app.goo.gl/abeHsbATGtEhxFf26',
    maps_iframe_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15842.40926540292!2d107.58919485541989!3d-6.938040799999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e63a66953993%3A0x248047e0057191ae!2sPT.%20Inti%20(Persero)!5e0!3m2!1sid!2sid!4v1781082382014!5m2!1sid!2sid',
    music_url: 'asset/spike.mp3',
    cover_bg_image: 'bg-wedding.png',
    bg_image: 'background.png',
    gallery_images: ['bg-wedding.png', 'background.png']
  }
};

// Fetch single wedding by slug from Supabase (with Mock Fallback for Demo slugs)
export async function getWeddingBySlug(slug: string): Promise<WeddingData> {
  try {
    const { data, error } = await supabaseClient
      .from('weddings')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      if (mockWeddings[slug]) {
        return mockWeddings[slug];
      }
      throw new Error(error?.message || "Wedding not found");
    }
    return data as WeddingData;
  } catch (err) {
    if (mockWeddings[slug]) {
      return mockWeddings[slug];
    }
    throw err;
  }
}

// Fetch single wedding by ID from Supabase (with Mock Fallback)
export async function getWeddingById(id: string): Promise<WeddingData> {
  try {
    const { data, error } = await supabaseClient
      .from('weddings')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      const match = Object.values(mockWeddings).find(w => w.id === id);
      if (match) return match;
      throw new Error(error?.message || "Wedding not found by ID");
    }
    return data as WeddingData;
  } catch (err) {
    const match = Object.values(mockWeddings).find(w => w.id === id);
    if (match) return match;
    throw err;
  }
}

// List all weddings for admin panel from Supabase (merging Supabase items and mocks for full view)
export async function getAllWeddings(): Promise<WeddingData[]> {
  try {
    const { data, error } = await supabaseClient  
      .from('weddings')
      .select('*')
      .order('created_at', { ascending: false });

    const supabaseList = (data || []) as WeddingData[];
    
    // Merge DB list with mock templates so they show up on admin dashboard too
    const dbSlugs = new Set(supabaseList.map(w => w.slug));
    const mergedList = [...supabaseList];
    
    Object.values(mockWeddings).forEach(mock => {
      if (!dbSlugs.has(mock.slug)) {
        mergedList.push(mock);
      }
    });

    if (error) {
      return Object.values(mockWeddings);
    }
    return mergedList;
  } catch (err) {
    return Object.values(mockWeddings);
  }
}

// Checkout order inserted directly to Supabase
export async function createWeddingOrder(
  slug: string, 
  templateId: number, 
  buyerName: string, 
  buyerEmail: string
): Promise<WeddingData> {
  const newWedding = {
    slug: slug.toLowerCase().replace(/[^a-z0-9-]/g, ''),
    template_id: templateId,
    payment_status: 'unpaid',
    is_configured: false,
    buyer_name: buyerName,
    buyer_email: buyerEmail,
    music_url: 'asset/spike.mp3'
  };

  const { data, error } = await supabaseClient
    .from('weddings')
    .insert([newWedding])
    .select()
    .single();

  if (error || !data) {
    throw new Error(error?.message || "Gagal membuat pesanan di database");
  }
  return data as WeddingData;
}

// Submit payment receipt file directly to Supabase
export async function submitPaymentReceipt(id: string, receiptBase64: string): Promise<WeddingData> {
  const { data, error } = await supabaseClient
    .from('weddings')
    .update({ payment_status: 'pending', receipt_url: receiptBase64 })
    .eq('id', id)
    .select()
    .single();

  if (error || !data) {
    throw new Error(error?.message || "Gagal mengupload bukti pembayaran");
  }
  return data as WeddingData;
}

// Admin confirms payment approval in Supabase
export async function adminConfirmPayment(id: string): Promise<WeddingData> {
  const { data, error } = await supabaseClient  
    .from('weddings')
    .update({ payment_status: 'paid' })
    .eq('id', id)
    .select()
    .single();

  if (error || !data) {
    throw new Error(error?.message || "Gagal mengonfirmasi pembayaran");
  }
  return data as WeddingData;
}

// Complete onboarding details in Supabase
export async function updateWeddingDetails(
  id: string, 
  details: Partial<WeddingData>
): Promise<WeddingData> {
  const updates = {
    ...details,
    is_configured: true
  };

  const { data, error } = await supabaseClient
    .from('weddings')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error || !data) {
    throw new Error(error?.message || "Gagal memperbarui konfigurasi undangan");
  }
  return data as WeddingData;
}
