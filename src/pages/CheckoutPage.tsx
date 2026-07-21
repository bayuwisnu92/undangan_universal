import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTemplateById } from '../templates/TemplateRegistry';
import { createWeddingOrder } from '../services/weddingService';

export const CheckoutPage: React.FC = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const navigate = useNavigate();
  const templateNum = parseInt(templateId || '1');
  const template = getTemplateById(templateNum);

  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [slug, setSlug] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName || !buyerEmail || !slug) {
      setError('Harap isi semua kolom formulir.');
      return;
    }
    
    // Simple validation for URL safe slugs
    const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, '');
    if (cleanSlug.length < 3) {
      setError('Slug url minimal 3 karakter huruf atau angka.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await createWeddingOrder(cleanSlug, templateNum, buyerName, buyerEmail);
      // Redirect to simulated payment page
      navigate(`/payment-pending/${data.id}`);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Gagal membuat pesanan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

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
        padding: '40px',
        maxWidth: '550px',
        width: '100%',
        boxShadow: '0 20px 45px rgba(0,0,0,0.3)'
      }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '8px', textAlign: 'center' }}>
          Formulir Pemesanan
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', textAlign: 'center', marginBottom: '30px' }}>
          Desain Terpilih: <strong style={{ color: '#a855f7' }}>{template.name}</strong>
        </p>

        {error && (
          <div style={{
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid #ef4444',
            color: '#fca5a5',
            padding: '12px 16px',
            borderRadius: '12px',
            fontSize: '0.85rem',
            marginBottom: '20px'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1' }}>Nama Lengkap Pembeli</label>
            <input
              type="text"
              value={buyerName}
              onChange={(e) => setBuyerName(e.target.value)}
              placeholder="Contoh: Andi Wijaya"
              style={{
                padding: '14px 18px',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.1)',
                backgroundColor: '#0f172a',
                color: 'white',
                outline: 'none',
                fontSize: '0.95rem'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1' }}>Alamat Email</label>
            <input
              type="email"
              value={buyerEmail}
              onChange={(e) => setBuyerEmail(e.target.value)}
              placeholder="Contoh: andi@example.com"
              style={{
                padding: '14px 18px',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.1)',
                backgroundColor: '#0f172a',
                color: 'white',
                outline: 'none',
                fontSize: '0.95rem'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1' }}>Custom URL Slug Undangan</label>
            <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
              <span style={{
                position: 'absolute',
                left: '18px',
                color: '#64748b',
                fontSize: '0.95rem',
                userSelect: 'none'
              }}>
                wedding.com/
              </span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                placeholder="nama-pasangan"
                style={{
                  padding: '14px 18px 14px 125px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backgroundColor: '#0f172a',
                  color: 'white',
                  outline: 'none',
                  fontSize: '0.95rem',
                  width: '100%'
                }}
              />
            </div>
            <small style={{ color: '#64748b', fontSize: '0.78rem', marginTop: '2px' }}>
              Hanya huruf kecil, angka, dan tanda hubung (-).
            </small>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: '10px',
              padding: '14px',
              backgroundColor: '#a855f7',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(168,85,247,0.3)',
              transition: 'opacity 0.2s'
            }}
          >
            {loading ? 'Sedang Memproses...' : 'Lanjutkan ke Pembayaran'}
          </button>
        </form>
      </div>
    </div>
  );
};
export default CheckoutPage;
