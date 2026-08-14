import React from 'react';
import './TemplateCoastalBlue.css';
import type { WeddingData } from '../../types/wedding';
import { Countdown } from '../../components/Countdown';
import { MusicPlayer } from '../../components/MusicPlayer';
import { GuestBook } from '../../components/GuestBook';
import { GoogleMaps } from '../../components/GoogleMaps';
import { GuestGreeting } from '../../components/GuestGreeting';

interface TemplateProps {
  data: WeddingData;
}

export const TemplateCoastalBlue: React.FC<TemplateProps> = ({ data }) => {
  const handleOpenInvitation = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('content')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="template-coastal-blue">
      <MusicPlayer musicUrl={data.music_url || ''} />
      <section id="hero">
        <div className="coastal-panel">
          <p>Wedding Celebration</p>
          <GuestGreeting />
          <h1 className="hero-names">{data.bride_name} &amp; {data.groom_name}</h1>
          <span>{data.akad_date_text}</span>
          <Countdown targetDate={data.event_date || ''} />
          <a href="#content" onClick={handleOpenInvitation} className="btn-open-invitation">Buka Undangan</a>
        </div>
      </section>

      <main id="content">
        {(data.bg_image || data.cover_bg_image) && (
          <section className="cover-photo">
            <img src={data.bg_image || data.cover_bg_image} alt={`${data.bride_name} & ${data.groom_name}`} />
          </section>
        )}

        <section>
          <div className="coastal-narrow">
            <p className="coastal-label">Save the Date</p>
            <h2 className="section-title">Hari yang Dinanti</h2>
            <p>Kami mengundang keluarga dan sahabat untuk menyaksikan awal perjalanan baru kami.</p>
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
          <h2 className="section-title">Detail Acara</h2>
          <div className="acara-cards">
            <div className="acara-card">
              <h3>Akad Nikah</h3>
              <p>{data.akad_date_text}</p>
              <p>{data.akad_time_text}</p>
              <p>{data.akad_location}<br />{data.akad_address}</p>
            </div>
            <div className="acara-card">
              <h3>Resepsi</h3>
              <p>{data.resepsi_date_text}</p>
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

        <footer className="site-footer">© {new Date().getFullYear()} {data.bride_name} &amp; {data.groom_name}</footer>
      </main>
    </div>
  );
};

export default TemplateCoastalBlue;
