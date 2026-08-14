import React from 'react';
import './TemplateRoyalSage.css';
import type { WeddingData } from '../../types/wedding';
import { Countdown } from '../../components/Countdown';
import { MusicPlayer } from '../../components/MusicPlayer';
import { GuestBook } from '../../components/GuestBook';
import { GoogleMaps } from '../../components/GoogleMaps';
import { GuestGreeting } from '../../components/GuestGreeting';

interface TemplateProps {
  data: WeddingData;
}

export const TemplateRoyalSage: React.FC<TemplateProps> = ({ data }) => {
  const handleOpenInvitation = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('content')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="template-royal-sage">
      <MusicPlayer musicUrl={data.music_url || ''} />

      <section id="hero">
        <div className="sage-hero-frame">
          <p className="sage-kicker">The Wedding of</p>
          <GuestGreeting />
          <h1 className="hero-names">{data.bride_name} &amp; {data.groom_name}</h1>
          <p className="sage-date">{data.akad_date_text}</p>
          <Countdown targetDate={data.event_date || ''} />
          <a href="#content" onClick={handleOpenInvitation} className="btn-open-invitation">
            Buka Undangan
          </a>
        </div>
      </section>

      <main id="content">
        {(data.bg_image || data.cover_bg_image) && (
          <section className="cover-photo">
            <img src={data.bg_image || data.cover_bg_image} alt={`${data.bride_name} & ${data.groom_name}`} />
          </section>
        )}

        <section>
          <div className="sage-narrow">
            <p className="sage-kicker">Dengan Rahmat Allah</p>
            <h2 className="section-title">Menuju Hari Bahagia</h2>
            <p className="sage-copy">
              Merupakan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu
              pada pernikahan kami.
            </p>
          </div>
        </section>

        <section>
          <h2 className="section-title">Mempelai</h2>
          <div className="mempelai-cards">
            <div className="mempelai-card">
              <h3>{data.bride_fullname}</h3>
              <p>Putri dari {data.bride_parents}</p>
            </div>
            <div className="mempelai-card">
              <h3>{data.groom_fullname}</h3>
              <p>Putra dari {data.groom_parents}</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="section-title">Waktu &amp; Tempat</h2>
          <div className="acara-cards">
            <div className="acara-card">
              <span>Akad</span>
              <h3>{data.akad_date_text}</h3>
              <p>{data.akad_time_text}</p>
              <p>{data.akad_location}<br />{data.akad_address}</p>
            </div>
            <div className="acara-card">
              <span>Resepsi</span>
              <h3>{data.resepsi_date_text}</h3>
              <p>{data.resepsi_time_text}</p>
              <p>{data.resepsi_location}<br />{data.resepsi_address}</p>
            </div>
          </div>
          <GoogleMaps mapsUrl={data.maps_url || ''} iframeUrl={data.maps_iframe_url || ''} />
        </section>

        <section>
          <h2 className="section-title">Ucapan &amp; Doa</h2>
          <GuestBook weddingId={data.id} />
        </section>

        <footer className="site-footer">
          <p>© {new Date().getFullYear()} {data.bride_name} &amp; {data.groom_name}</p>
        </footer>
      </main>
    </div>
  );
};

export default TemplateRoyalSage;
