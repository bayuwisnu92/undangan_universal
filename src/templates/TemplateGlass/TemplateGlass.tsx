import React from 'react';
import './TemplateGlass.css';
import type { WeddingData } from '../../types/wedding';
import { Countdown } from '../../components/Countdown';
import { MusicPlayer } from '../../components/MusicPlayer';
import { GuestBook } from '../../components/GuestBook';
import { GoogleMaps } from '../../components/GoogleMaps';

interface TemplateProps {
  data: WeddingData;
}

export const TemplateGlass: React.FC<TemplateProps> = ({ data }) => {
  const handleOpenInvitation = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('content')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="template-glass">
      <MusicPlayer musicUrl={data.music_url || ''} />

      <section id="hero">
        <div className="glass-card text-center">
          <p style={{ letterSpacing: '3px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>The Wedding Invitation</p>
          <h1 className="hero-names">{data.bride_name} &amp; {data.groom_name}</h1>
          <p style={{ margin: '15px 0', fontSize: '1.1rem' }}>{data.akad_date_text}</p>
          
          <Countdown targetDate={data.event_date || ''} />

          <a href="#content" onClick={handleOpenInvitation} className="btn-open-invitation">
            Buka Undangan
          </a>
        </div>
      </section>

      <main id="content">
        <section>
          <div className="glass-card text-center">
            <h2 className="section-title">QS. Ar-Rum: 21</h2>
            <p style={{ fontStyle: 'italic', lineHeight: 1.8, color: 'var(--text-muted)' }}>
              "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang..."
            </p>
          </div>
        </section>

        <section>
          <div className="glass-card">
            <h2 className="section-title">Kedua Mempelai</h2>
            <div className="mempelai-cards">
              <div className="mempelai-card">
                <h3 className="mempelai-name">{data.bride_fullname}</h3>
                <p style={{ color: 'var(--text-muted)' }}>Putri dari {data.bride_parents}</p>
              </div>
              <div className="mempelai-card">
                <h3 className="mempelai-name">{data.groom_fullname}</h3>
                <p style={{ color: 'var(--text-muted)' }}>Putra dari {data.groom_parents}</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="glass-card text-center">
            <h2 className="section-title">Waktu &amp; Tempat</h2>
            <div className="acara-cards">
              <div className="acara-card">
                <h3>Akad Nikah</h3>
                <p style={{ margin: '10px 0' }}>{data.akad_date_text}</p>
                <p>{data.akad_time_text}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '10px' }}>
                  {data.akad_location}<br />{data.akad_address}
                </p>
              </div>
              <div className="acara-card">
                <h3>Resepsi</h3>
                <p style={{ margin: '10px 0' }}>{data.resepsi_date_text}</p>
                <p>{data.resepsi_time_text}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '10px' }}>
                  {data.resepsi_location}<br />{data.resepsi_address}
                </p>
              </div>
            </div>
            <GoogleMaps mapsUrl={data.maps_url || ''} iframeUrl={data.maps_iframe_url || ''} />
          </div>
        </section>

        <section>
          <div className="glass-card">
            <h2 className="section-title">Wishes &amp; RSVP</h2>
            <GuestBook weddingId={data.id} />
          </div>
        </section>

        <footer className="site-footer">
          <p>© {new Date().getFullYear()} {data.bride_name} &amp; {data.groom_name}. Made with love.</p>
        </footer>
      </main>
    </div>
  );
};
export default TemplateGlass;
