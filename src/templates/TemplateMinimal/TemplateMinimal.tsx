import React from 'react';
import './TemplateMinimal.css';
import type { WeddingData } from '../../types/wedding';
import { Countdown } from '../../components/Countdown';
import { MusicPlayer } from '../../components/MusicPlayer';
import { GuestBook } from '../../components/GuestBook';
import { GoogleMaps } from '../../components/GoogleMaps';

interface TemplateProps {
  data: WeddingData;
}

export const TemplateMinimal: React.FC<TemplateProps> = ({ data }) => {
  const handleOpenInvitation = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('content')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="template-minimal">
      <MusicPlayer musicUrl={data.music_url || ''} />

      <section id="hero">
        <div style={{ textAlign: 'center', maxWidth: '600px' }}>
          <p style={{ letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.8rem' }}>The Wedding of</p>
          <h1 className="hero-names">
            <div>{data.bride_name}</div>
            <div style={{ fontSize: '2rem', fontWeight: 300 }}>&amp;</div>
            <div>{data.groom_name}</div>
          </h1>
          <p style={{ letterSpacing: '2px', margin: '20px 0' }}>{data.akad_date_text}</p>
          
          <Countdown targetDate={data.event_date || ''} />
          
          <a href="#content" onClick={handleOpenInvitation} className="btn-open-invitation">
            Open Invitation
          </a>
        </div>
      </section>

      <main id="content">

        {data.cover_bg_image && (
    <section className="cover-photo">
      <img
        src={data.cover_bg_image}
        alt={`${data.bride_name} & ${data.groom_name}`}
      />
    </section>
  )}

  <section style={{ textAlign: 'center' }}></section>
        <section style={{ textAlign: 'center' }}>
          <div style={{ maxWidth: '650px', margin: '0 auto' }}>
            <h2 className="section-title">Greeting</h2>
            <p style={{ fontStyle: 'italic', lineHeight: 1.8, color: 'var(--color-muted)' }}>
              "And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy. Indeed in that are signs for a people who give thought."
            </p>
            <p style={{ fontSize: '0.8rem', marginTop: '10px', letterSpacing: '1px' }}>QS. AR-RUM : 21</p>
          </div>
        </section>
        

  

  <section style={{ textAlign: 'center' }}></section>
        

        <section style={{ textAlign: 'center' }}>
          <h2 className="section-title">The Happy Couple</h2>
          <div className="mempelai-cards">
            <div className="mempelai-card">
              <h3 className="mempelai-name">{data.bride_fullname}</h3>
              <p style={{ color: 'var(--color-muted)' }}>Daughter of {data.bride_parents}</p>
            </div>
            <div className="mempelai-card">
              <h3 className="mempelai-name">{data.groom_fullname}</h3>
              <p style={{ color: 'var(--color-muted)' }}>Son of {data.groom_parents}</p>
            </div>
          </div>
        </section>

        <section style={{ textAlign: 'center' }}>
          <h2 className="section-title">Date &amp; Time</h2>
          <div className="acara-cards">
            <div className="acara-card">
              <h3>Akad Nikah</h3>
              <p style={{ margin: '15px 0' }}>{data.akad_date_text}</p>
              <p>{data.akad_time_text}</p>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', marginTop: '10px' }}>
                {data.akad_location}<br />{data.akad_address}
              </p>
            </div>
            <div className="acara-card">
              <h3>Walimatul Ursy</h3>
              <p style={{ margin: '15px 0' }}>{data.resepsi_date_text}</p>
              <p>{data.resepsi_time_text}</p>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', marginTop: '10px' }}>
                {data.resepsi_location}<br />{data.resepsi_address}
              </p>
            </div>
          </div>
          <GoogleMaps mapsUrl={data.maps_url || ''} iframeUrl={data.maps_iframe_url || ''} />
        </section>

        <section style={{ textAlign: 'center' }}>
          <h2 className="section-title">Wishes</h2>
          <GuestBook weddingId={data.id} />
        </section>

        <footer className="site-footer">
          <p>© {new Date().getFullYear()} {data.bride_name} &amp; {data.groom_name}. All Rights Reserved.</p>
        </footer>
      </main>
    </div>
  );
};
export default TemplateMinimal;
