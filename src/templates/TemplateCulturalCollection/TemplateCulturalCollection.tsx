import React from 'react';
import './TemplateCulturalCollection.css';
import type { WeddingData } from '../../types/wedding';
import { Countdown } from '../../components/Countdown';
import { MusicPlayer } from '../../components/MusicPlayer';
import { GuestBook } from '../../components/GuestBook';
import { GoogleMaps } from '../../components/GoogleMaps';

interface TemplateProps {
  data: WeddingData;
}

type Variant = {
  className: string;
  label: string;
  quote: string;
  type: 'islamic' | 'adat';
  dalil?: {
    ayat: string;
    hadith: string;
  };
  adat?: {
    title: string;
    details: string[];
  };
};

const variants: Record<number, Variant> = {
  9: {
    className: 'islamic-noor',
    label: 'Noor Mosque',
    type: 'islamic',
    quote: 'Barakallahu lakuma wa baraka alaikuma wa jamaa bainakuma fii khair.',
    dalil: {
      ayat: 'QS Ar-Rum 30:21: Allah menciptakan pasangan agar manusia merasa tenteram, lalu menjadikan mawaddah dan rahmah di antara keduanya.',
      hadith: 'Hadits riwayat Al-Baihaqi: ketika seorang hamba menikah, ia telah menyempurnakan separuh agamanya; maka hendaklah ia bertakwa kepada Allah pada separuh sisanya.'
    }
  },
  10: {
    className: 'islamic-andalus',
    label: 'Andalus Emerald',
    type: 'islamic',
    quote: 'Dengan memohon rahmat Allah, kami mengundang Bapak/Ibu/Saudara/i untuk hadir.',
    dalil: {
      ayat: 'QS An-Nur 24:32: nikahkanlah orang-orang yang masih membujang di antara kamu dan orang-orang saleh dari hamba-hambamu.',
      hadith: 'Hadits Bukhari dan Muslim: wahai para pemuda, siapa yang mampu menikah hendaklah ia menikah, karena itu lebih menundukkan pandangan dan menjaga kehormatan.'
    }
  },
  11: {
    className: 'islamic-kaaba',
    label: 'Kaaba Gold',
    type: 'islamic',
    quote: 'Semoga Allah menghimpun yang terserak dari keduanya dan memberkahi pernikahan ini.',
    dalil: {
      ayat: 'QS Adz-Dzariyat 51:49: segala sesuatu Allah ciptakan berpasang-pasangan agar manusia mengingat kebesaran-Nya.',
      hadith: 'Doa Nabi untuk pengantin: Barakallahu laka wa baraka alaika wa jamaa bainakuma fi khair.'
    }
  },
  12: {
    className: 'islamic-sakinah',
    label: 'Sakinah Ivory',
    type: 'islamic',
    quote: 'Dan di antara tanda-tanda kekuasaan-Nya, Dia menciptakan pasangan untukmu.',
    dalil: {
      ayat: 'QS Ar-Rum 30:21: pernikahan menjadi jalan hadirnya sakinah, mawaddah, dan rahmah.',
      hadith: 'Hadits riwayat Ibnu Majah: tidak terlihat bagi dua orang yang saling mencintai sesuatu yang lebih baik daripada pernikahan.'
    }
  },
  13: {
    className: 'islamic-ottoman',
    label: 'Ottoman Blue',
    type: 'islamic',
    quote: 'Cinta yang tumbuh dalam doa, dipertemukan dalam ridha-Nya.',
    dalil: {
      ayat: 'QS An-Nahl 16:72: Allah menjadikan pasangan dari jenis manusia sendiri dan menganugerahkan anak serta keturunan.',
      hadith: 'Hadits riwayat Abu Dawud: nikah adalah bagian dari sunnah Nabi, dan keluarga dibangun dengan tanggung jawab serta ketakwaan.'
    }
  },
  14: {
    className: 'adat-jawa',
    label: 'Adat Jawa',
    type: 'adat',
    quote: 'Dengan penuh hormat, kami mengundang panjenengan untuk hadir di hari bahagia kami.',
    adat: {
      title: 'Nuansa Paes Ageng dan Joglo',
      details: ['Motif kawung dan warna sogan klasik.', 'Bahasa undangan halus dengan rasa hormat keluarga.', 'Frame joglo memberi kesan teduh dan ningrat.']
    }
  },
  15: {
    className: 'adat-sunda',
    label: 'Adat Sunda',
    type: 'adat',
    quote: 'Wilujeng sumping, mugia kersa ngiring ngahaturkeun doa pangestu.',
    adat: {
      title: 'Nuansa Sunda Asri',
      details: ['Hijau daun dan aksen bambu untuk rasa sejuk.', 'Salam “Wilujeng Sumping” sebagai pembuka.', 'Terinspirasi siger Sunda dan suasana saung.']
    }
  },
  16: {
    className: 'adat-padang',
    label: 'Adat Padang',
    type: 'adat',
    quote: 'Dengan limpahan doa keluarga, kami mengundang dunsanak di hari nan bahagia.',
    adat: {
      title: 'Gonjong Minang Megah',
      details: ['Siluet rumah gadang sebagai identitas utama.', 'Merah marun dan emas untuk kesan perayaan.', 'Sapaan dunsanak memberi rasa kekeluargaan Minang.']
    }
  },
  17: {
    className: 'adat-batak',
    label: 'Adat Batak',
    type: 'adat',
    quote: 'Horas. Dengan sukacita keluarga besar mengundang hadirin memberi doa restu.',
    adat: {
      title: 'Ulos dan Gorga Batak',
      details: ['Garis ulos merah, hitam, dan putih.', 'Sapaan “Horas” ditampilkan kuat di hero.', 'Motif gorga memberi karakter tegas dan hangat.']
    }
  },
  18: {
    className: 'adat-bugis',
    label: 'Adat Bugis',
    type: 'adat',
    quote: 'Dengan adat dan doa, kami mengikat janji dalam kebahagiaan keluarga.',
    adat: {
      title: 'Lipa Sabbe dan Phinisi',
      details: ['Motif kotak sarung sutra Bugis sebagai pattern.', 'Aksen biru laut dan emas terinspirasi phinisi.', 'Bahasa visual dibuat bersih, gagah, dan elegan.']
    }
  }
};

export const TemplateCulturalCollection: React.FC<TemplateProps> = ({ data }) => {
  const variant = variants[data.template_id] || variants[9];

  const handleOpenInvitation = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('content')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`template-cultural ${variant.className}`}>
      <MusicPlayer musicUrl={data.music_url || ''} />

      <section id="hero">
        <div className="cultural-ornament cultural-ornament-top" />
        <div className="cultural-hero-card">
          <p className="cultural-kicker">{variant.label}</p>
          <h1 className="hero-names">{data.bride_name} <span>&amp;</span> {data.groom_name}</h1>
          <p className="cultural-date">{data.akad_date_text}</p>
          <Countdown targetDate={data.event_date || ''} />
          <a href="#content" onClick={handleOpenInvitation} className="btn-open-invitation">
            Buka Undangan
          </a>
        </div>
        <div className="cultural-ornament cultural-ornament-bottom" />
      </section>

      <main id="content">
        {(data.bg_image || data.cover_bg_image) && (
          <section className="cover-photo">
            <img src={data.bg_image || data.cover_bg_image} alt={`${data.bride_name} & ${data.groom_name}`} />
          </section>
        )}

        <section>
          <div className="cultural-narrow">
            <p className="cultural-kicker">Undangan Pernikahan</p>
            <h2 className="section-title">{variant.type === 'islamic' ? "Assalamu'alaikum" : variant.adat?.title}</h2>
            <p className="cultural-copy">{variant.quote}</p>
          </div>
        </section>

        {variant.type === 'islamic' && variant.dalil && (
          <section className="dalil-section">
            <div className="dalil-grid">
              <article className="dalil-card">
                <span>Dalil Al-Qur'an</span>
                <h2>Landasan Pernikahan</h2>
                <p>{variant.dalil.ayat}</p>
              </article>
              <article className="dalil-card">
                <span>Hadits Pernikahan</span>
                <h2>Nasihat Rasulullah</h2>
                <p>{variant.dalil.hadith}</p>
              </article>
            </div>
          </section>
        )}

        {variant.type === 'adat' && variant.adat && (
          <section className="adat-section">
            <div className="adat-feature">
              <div className="adat-symbol" aria-hidden="true" />
              <div>
                <p className="cultural-kicker">Keunikan Tema</p>
                <h2 className="section-title">{variant.adat.title}</h2>
                <ul>
                  {variant.adat.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

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
          <h2 className="section-title">Waktu &amp; Lokasi</h2>
          <div className="acara-cards">
            <div className="acara-card">
              <span>Akad Nikah</span>
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
          <p>Terima kasih atas doa restu untuk {data.bride_name} &amp; {data.groom_name}.</p>
        </footer>
      </main>
    </div>
  );
};

export default TemplateCulturalCollection;
