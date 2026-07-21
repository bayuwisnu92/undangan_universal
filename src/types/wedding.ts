export interface WeddingData {
  id: string;
  slug: string;
  template_id: number;
  
  // Checkout & Onboarding State
  payment_status: 'unpaid' | 'pending' | 'paid';
  is_configured: boolean;
  buyer_name?: string;
  buyer_email?: string;
  receipt_url?: string;
  
  // Mempelai Wanita
  bride_name?: string;
  bride_fullname?: string;
  bride_parents?: string;
  
  // Mempelai Pria
  groom_name?: string;
  groom_fullname?: string;
  groom_parents?: string;
  
  // Event Details
  event_date?: string; // ISO string
  
  // Akad Nikah
  akad_date_text?: string;
  akad_time_text?: string;
  akad_location?: string;
  akad_address?: string;
  
  // Resepsi
  resepsi_date_text?: string;
  resepsi_time_text?: string;
  resepsi_location?: string;
  resepsi_address?: string;
  
  // Maps URL & Embed
  maps_url?: string;
  maps_iframe_url?: string;
  
  // Assets
  music_url?: string;
  cover_bg_image?: string;
  bg_image?: string;
  gallery_images?: string[];
}
