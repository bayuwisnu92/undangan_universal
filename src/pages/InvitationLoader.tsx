import React, { useEffect, useState, Suspense } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getWeddingBySlug } from '../services/weddingService';
import type { WeddingData } from '../types/wedding';
import { getTemplateById } from '../templates/TemplateRegistry';
import { LoadingScreen } from '../components/LoadingScreen';
import { useOgMeta } from '../hooks/useOgMeta';

export const InvitationLoader: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [wedding, setWedding] = useState<WeddingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Dynamically update page title & OG meta tags
  useOgMeta(wedding);

  useEffect(() => {
    const loadWedding = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        const data = await getWeddingBySlug(slug);
        setWedding(data);
      } catch (err: any) {
        console.error(err);
        setError('Undangan tidak ditemukan atau terjadi kesalahan.');
      } finally {
        setLoading(false);
      }
    };

    loadWedding();
  }, [slug]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (wedding) {
    if (wedding.payment_status !== 'paid') {
      return <Navigate to={`/payment-pending/${wedding.id}`} replace />;
    }
    if (!wedding.is_configured) {
      return <Navigate to={`/setup-wedding/${wedding.id}`} replace />;
    }
  }

  if (error || !wedding) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#1A2744',
        color: 'white',
        fontFamily: 'sans-serif',
        padding: '20px',
        textAlign: 'center'
      }}>
        <h2>Mohon Maaf</h2>
        <p style={{ opacity: 0.8, margin: '15px 0' }}>{error || 'Halaman undangan tidak valid.'}</p>
        <a href="/templates" style={{ color: '#E8C97E', textDecoration: 'underline' }}>Lihat Desain Template Kami</a>
      </div>
    );
  }

  // Look up template component from registry dynamic loader
  const templateInfo = getTemplateById(wedding.template_id);
  const MappedTemplate = templateInfo.component;

  return (
    <Suspense fallback={<LoadingScreen />}>
      <MappedTemplate data={wedding} />
    </Suspense>
  );
};
export default InvitationLoader;
