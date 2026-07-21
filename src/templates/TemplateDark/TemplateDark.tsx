import React from 'react';
import './TemplateDark.css';
import type { WeddingData } from '../../types/wedding';
import { Countdown } from '../../components/Countdown';
import { MusicPlayer } from '../../components/MusicPlayer';
import { GuestBook } from '../../components/GuestBook';
import { GoogleMaps } from '../../components/GoogleMaps';

interface TemplateProps {
  data: WeddingData;
}

export const TemplateDark: React.FC<TemplateProps> = ({ data }) => {
  const handleOpenInvitation = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('content')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="template-dark">
      <MusicPlayer musicUrl={data.music_url || ''} />

      <section id="hero">
        <div style={{ textAlign: 'center' }}>
          <p style={{ letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.9rem' }}>The Wedding Celebration</p>
          <h1 className="hero-names">{data.bride_name} &amp; {data.groom_name}</h1>
          <p style={{ fontSize: '1.1rem', margin: '20px 0', letterSpacing: '2px' }}>{data.akad_date_text}</p>
          
          <Countdown targetDate={data.event_date || ''} />
          
          <a href="#content" onClick={handleOpenInvitation} className="btn-open-invitation">
            Buka Undangan
          </a>
        </div>
      </section>

      <main id="content">
        <section>
          <div style={{ maxWidth: '650px', margin: '0 auto' }}>
            <h2 className="section-title">Greeting</h2>
            <p style={{ fontStyle: 'italic', fontSize: '1.2rem', lineHeight: 1.8, fontFamily: 'serif' }}>
              "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya..."
            </p>
            <p style={{ fontSize: '0.8rem', letterSpacing: '2px', marginTop: '10px' }}>AR-RUM : 21</p>
          </div>
        </section>

        <section>
          <h2 className="section-title">Mempelai</h2>
          <div className="mempelai-cards">
            <div className="mempelai-card">
              <h3 className="mempelai-name">{data.bride_fullname}</h3>
              <p style={{ marginTop: '10px', fontSize: '0.9rem', opacity: 0.8 }}>Putri dari {data.bride_parents}</p>
            </div>
            <div className="mempelai-card">
              <h3 className="mempelai-name">{data.groom_fullname}</h3>
              <p style={{ marginTop: '10px', fontSize: '0.9rem', opacity: 0.8 }}>Putra dari {data.groom_parents}</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="section-title">Acara Pernikahan</h2>
          <div className="acara-cards">
            <div className="acara-card">
              <h3 style={{ color: 'var(--dark-gold)' }}>Akad Nikah</h3>
              <p style={{ margin: '15px 0', fontSize: '0.95rem' }}>{data.akad_date_text}</p>
              <p style={{ fontSize: '0.95rem' }}>{data.akad_time_text}</p>
              <p style={{ fontSize: '0.85rem', marginTop: '15px', opacity: 0.8 }}>
                {data.akad_location}<br />{data.akad_address}
              </p>
            </div>
            <div className="acara-card">
              <h3 style={{ color: 'var(--dark-gold)' }}>Resepsi</h3>
              <p style={{ margin: '15px 0', fontSize: '0.95rem' }}>{data.resepsi_date_text}</p>
              <p style={{ fontSize: '0.95rem' }}>{data.resepsi_time_text}</p>
              <p style={{ fontSize: '0.85rem', marginTop: '15px', opacity: 0.8 }}>
                {data.resepsi_location}<br />{data.resepsi_address}
              </p>
            </div>
          </div>
          <GoogleMaps mapsUrl={data.maps_url || ''} iframeUrl={data.maps_iframe_url || ''} />
        </section>

        <section>
          <h2 className="section-title">Ucapan &amp; Doa</h2>
          <GuestBook weddingId={data.id} />
        </section>

        <footer className="site-footer">
          <p>© {new Date().getFullYear()} {data.bride_name} &amp; {data.groom_name}. Elegant Gold Edition.</p>
        </footer>
      </main>
    </div>
  );
};
export default TemplateDark;
