import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getWeddingById, submitPaymentReceipt } from '../services/weddingService';
import type { WeddingData } from '../types/wedding';
import { LoadingScreen } from '../components/LoadingScreen';
import { supabaseClient } from '../services/supabaseClient';

export const PaymentPendingPage: React.FC = () => {
  const { weddingId } = useParams<{ weddingId: string }>();
  const [wedding, setWedding] = useState<WeddingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const fetchWedding = async () => {
    if (!weddingId) return;
    try {
      const data = await getWeddingById(weddingId);
      setWedding(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWedding();

    if (!weddingId) return;

    // Subscribe to real-time updates for this specific wedding record
    const channel = supabaseClient
      .channel(`wedding-payment-${weddingId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'weddings',
          filter: `id=eq.${weddingId}`
        },
        (payload) => {
          console.log('Real-time payment status update received:', payload.new);
          setWedding(payload.new as WeddingData);
        }
      )
      .subscribe();

    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, [weddingId]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !weddingId) return;

    // Check if it's an image file
    if (!file.type.startsWith('image/')) {
      setUploadError('Harap pilih file gambar (JPG/PNG).');
      return;
    }

    // Limit file size to 2MB to prevent large Base64 strings
    if (file.size > 2 * 1024 * 1024) {
      setUploadError('Ukuran gambar terlalu besar (maksimal 2MB).');
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        setSubmitting(true);
        setUploadError(null);
        const base64String = reader.result as string;
        
        // Upload Base64 image string to Supabase
        const updated = await submitPaymentReceipt(weddingId, base64String);
        setWedding(updated);
      } catch (err: any) {
        console.error(err);
        setUploadError(err.message || 'Gagal mengupload bukti transfer.');
      } finally {
        setSubmitting(false);
      }
    };
    reader.onerror = () => {
      setUploadError('Gagal membaca file gambar.');
    };
    reader.readAsDataURL(file);
  };

  if (loading) return <LoadingScreen />;

  if (!wedding) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', color: 'white', backgroundColor: '#0f172a', minHeight: '100vh' }}>
        <h2>Pesanan tidak ditemukan</h2>
        <Link to="/templates" style={{ color: '#a855f7', textDecoration: 'underline' }}>Kembali ke Katalog</Link>
      </div>
    );
  }

  // Generate WhatsApp confirmation link
  const waNumber = '6283806620512';
  const waText = encodeURIComponent(
    `Halo Admin, saya ingin konfirmasi pembayaran untuk undangan:\n\n` +
    `- Nama Pembeli: ${wedding.buyer_name}\n` +
    `- Email: ${wedding.buyer_email}\n` +
    `- Slug: /${wedding.slug}\n` +
    `- ID Transaksi: ${wedding.id}\n\n` +
    `Saya sudah mengunggah bukti pembayaran di sistem. Mohon segera diverifikasi.`
  );
  const waUrl = `https://wa.me/${waNumber}?text=${waText}`;

  return (
    <div style={{
      backgroundColor: '#0f172a',
      color: '#f8fafc',
      minHeight: '100vh',
      fontFamily: 'Montserrat, sans-serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px'
    }}>
      <div style={{
        backgroundColor: '#1e293b',
        borderRadius: '24px',
        border: '1px solid rgba(255,255,255,0.05)',
        padding: '45px 40px',
        maxWidth: '600px',
        width: '100%',
        boxShadow: '0 20px 45px rgba(0,0,0,0.3)',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '15px' }}>
          Pembayaran Undangan Digital
        </h2>
        
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.02)',
          border: '1px dashed rgba(255,255,255,0.1)',
          borderRadius: '16px',
          padding: '20px',
          margin: '25px 0',
          textAlign: 'left'
        }}>
          <p style={{ margin: '5px 0' }}>Nama Pembeli: <strong>{wedding.buyer_name}</strong></p>
          <p style={{ margin: '5px 0' }}>Email: <strong>{wedding.buyer_email}</strong></p>
          <p style={{ margin: '5px 0' }}>Slug Undangan: <strong style={{ color: '#a855f7' }}>/{wedding.slug}</strong></p>
          <p style={{ margin: '5px 0' }}>Status Saat Ini: 
            <span style={{
              marginLeft: '8px',
              padding: '4px 10px',
              borderRadius: '20px',
              fontSize: '0.75rem',
              fontWeight: 700,
              backgroundColor: wedding.payment_status === 'paid' ? 'rgba(34, 197, 94, 0.15)' : wedding.payment_status === 'pending' ? 'rgba(234, 179, 8, 0.15)' : 'rgba(239, 68, 68, 0.15)',
              color: wedding.payment_status === 'paid' ? '#4ade80' : wedding.payment_status === 'pending' ? '#fde047' : '#fca5a5'
            }}>
              {wedding.payment_status === 'paid' ? 'Lunas' : wedding.payment_status === 'pending' ? 'Pending Verifikasi' : 'Belum Dibayar'}
            </span>
          </p>
        </div>

        {uploadError && (
          <div style={{
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid #ef4444',
            color: '#fca5a5',
            padding: '10px 14px',
            borderRadius: '8px',
            fontSize: '0.8rem',
            marginBottom: '20px',
            textAlign: 'left'
          }}>
            {uploadError}
          </div>
        )}

        {wedding.payment_status === 'paid' ? (
          <div>
            <div style={{ fontSize: '4rem', color: '#22c55e', marginBottom: '15px' }}>✓</div>
            <h3 style={{ marginBottom: '15px' }}>Pembayaran Terkonfirmasi!</h3>
            <p style={{ color: '#94a3b8', marginBottom: '30px', lineHeight: 1.5 }}>
              Pembayaran Anda telah sukses diverifikasi. Silakan klik tombol di bawah untuk melengkapi data mempelai, tanggal acara, lokasi Maps, dan lain-lain.
            </p>
            <Link
              to={`/setup-wedding/${wedding.id}`}
              style={{
                display: 'block',
                padding: '14px',
                backgroundColor: '#22c55e',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '0.95rem'
              }}
            >
              Lengkapi Data Undangan
            </Link>
          </div>
        ) : wedding.payment_status === 'pending' ? (
          <div>
            <div style={{ fontSize: '3rem', color: '#eab308', marginBottom: '15px' }}>⏰</div>
            <h3>Bukti Transfer Sedang Divalidasi</h3>
            <p style={{ color: '#94a3b8', marginTop: '12px', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '25px' }}>
              Bukti pembayaran Anda sedang divalidasi oleh administrator. Silakan konfirmasi via WhatsApp untuk mempercepat persetujuan.
            </p>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '14px',
                backgroundColor: '#25d366',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '0.95rem',
                boxShadow: '0 4px 14px rgba(37,211,102,0.3)'
              }}
            >
              <i className="fa-brands fa-whatsapp" style={{ fontSize: '1.25rem' }}></i> Konfirmasi ke WhatsApp
            </a>
          </div>
        ) : (
          <div>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '25px', lineHeight: 1.6 }}>
              Silakan lakukan transfer sebesar <strong>Rp 100.000,-</strong> ke salah satu rekening di bawah ini:
            </p>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              textAlign: 'left',
              marginBottom: '30px'
            }}>
              <div style={{ background: '#0f172a', padding: '15px', borderRadius: '12px' }}>
                <small style={{ color: '#64748b', display: 'block' }}>BANK BRI</small>
                <strong>7019-0101-2538-530</strong> <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Bayu Wisnu Aji</span>
              </div>
              
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1' }}>Unggah Bukti Transfer</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={submitting}
                style={{
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backgroundColor: '#0f172a',
                  color: 'white',
                  cursor: 'pointer'
                }}
              />
              <small style={{ color: '#64748b', fontSize: '0.75rem' }}>Format: JPG, PNG. Maksimal 2MB.</small>
            </div>
            {submitting && <p style={{ color: '#a855f7', marginTop: '10px', fontSize: '0.9rem' }}>Mengunggah...</p>}
          </div>
        )}
      </div>
    </div>
  );
};
export default PaymentPendingPage;
