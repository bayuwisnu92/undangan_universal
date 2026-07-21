import React from 'react';
import './TemplateFloral.css';
import type { WeddingData } from '../../types/wedding';
import { Countdown } from '../../components/Countdown';
import { MusicPlayer } from '../../components/MusicPlayer';
import { GuestBook } from '../../components/GuestBook';
import { GoogleMaps } from '../../components/GoogleMaps';

interface TemplateProps {
  data: WeddingData;
}

export const TemplateFloral: React.FC<TemplateProps> = ({ data }) => {
  const handleOpenInvitation = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('content')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="template-floral">
      <MusicPlayer musicUrl={data.music_url || ''} />

      <section id="hero">
        <div style={{ textAlign: 'center' }}>
          <p style={{ letterSpacing: '3px', textTransform: 'uppercase' }}>Walimatul Ursy</p>
          <h1 className="hero-names">{data.bride_name} &amp; {data.groom_name}</h1>
          <p style={{ fontSize: '1.2rem', margin: '15px 0' }}>{data.akad_date_text}</p>
          
          <Countdown targetDate={data.event_date || ''} />
          
          <a href="#content" onClick={handleOpenInvitation} className="btn-open-invitation">
            Buka Undangan
          </a>
        </div>
      </section>

      <main id="content">
        <section>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 className="section-title">Greeting</h2>
            <p style={{ fontStyle: 'italic', fontSize: '1.2rem', lineHeight: 1.8 }}>
              "Maha Suci Allah yang telah menciptakan makhluk-makhluk-Nya berpasang-pasangan. Ya Allah, berkahilah ikatan suci pernikahan kami..."
            </p>
          </div>
        </section>

        <section>
          <h2 className="section-title">Mempelai</h2>
          <div className="mempelai-cards">
            <div className="mempelai-card">
              <h3 className="mempelai-name">{data.bride_fullname}</h3>
              <p>Putri tercinta dari {data.bride_parents}</p>
            </div>
            <div className="mempelai-card">
              <h3 className="mempelai-name">{data.groom_fullname}</h3>
              <p>Putra tercinta dari {data.groom_parents}</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="section-title">Waktu &amp; Lokasi</h2>
          <div className="acara-cards">
            <div className="acara-card">
              <h3>Akad Nikah</h3>
              <p style={{ margin: '10px 0' }}>{data.akad_date_text}</p>
              <p>{data.akad_time_text}</p>
              <p style={{ fontSize: '0.95rem', marginTop: '10px', opacity: 0.8 }}>
                {data.akad_location}<br />{data.akad_address}
              </p>
            </div>
            <div className="acara-card">
              <h3>Walimatul 'Ursy</h3>
              <p style={{ margin: '10px 0' }}>{data.resepsi_date_text}</p>
              <p>{data.resepsi_time_text}</p>
              <p style={{ fontSize: '0.95rem', marginTop: '10px', opacity: 0.8 }}>
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
          <p>© {new Date().getFullYear()} {data.bride_name} &amp; {data.groom_name}. Thank you for your blessings.</p>
        </footer>
      </main>
    </div>
  );
};
export default TemplateFloral;
