import React, { useEffect } from 'react';
import './TemplateElegant.css';
import type { WeddingData } from '../../types/wedding';
import { Countdown } from '../../components/Countdown';
import { MusicPlayer } from '../../components/MusicPlayer';
import { GuestBook } from '../../components/GuestBook';
import { GoogleMaps } from '../../components/GoogleMaps';

interface TemplateProps {
  data: WeddingData;
}

export const TemplateElegant: React.FC<TemplateProps> = ({ data }) => {
  useEffect(() => {
    // Reveal animations using Intersection Observer (exactly as in original index.js)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.opacity = '1';
          (entry.target as HTMLElement).style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.15 });

    const animatedElements = document.querySelectorAll(
      '.template-elegant .ayat-box, .template-elegant .hadits-box, .template-elegant .mempelai-card, .template-elegant .acara-card'
    );

    animatedElements.forEach(el => {
      const htmlEl = el as HTMLElement;
      htmlEl.style.opacity = '0';
      htmlEl.style.transform = 'translateY(30px)';
      htmlEl.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
      observer.observe(htmlEl);
    });

    return () => {
      observer.disconnect();
    };
  }, [data]);

  const handleOpenInvitation = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('undangan')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="template-elegant">
      {/* Shared Music Player */}
      <MusicPlayer musicUrl={data.music_url || ''} />

      {/* Hero Section */}
      <section id="hero">
        <div
    className="hero-overlay"
    style={{
      backgroundImage: `url(${data.cover_bg_image})`
    }}
  ></div>
        <div className="hero-particles">
          <span></span><span></span><span></span><span></span><span></span>
          <span></span><span></span><span></span><span></span><span></span>
        </div>

        <div id="hero-content" className="text-center fade-in">
          <div className="bismillah-hero">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div>
          <p className="invitation-label">— Undangan Pernikahan —</p>
          <p className="invitation-sub">Kepada Bapak / Ibu / Saudara/i</p>

          <h1 className="hero-names">
            <span className="name-bride">{data.bride_fullname}</span>
            <span className="hero-ampersand">&</span>
            <span className="name-groom">{data.groom_fullname}</span>
          </h1>

          <div className="hero-date-badge">
            <span className="hero-date-text">{data.akad_date_text}</span>
          </div>

          {/* Shared Countdown Component */}
          <Countdown targetDate={data.event_date || ''} />

          <a href="#undangan" onClick={handleOpenInvitation} className="btn-open-invitation">
            <i className="fa-solid fa-envelope-open-text"></i>
            &nbsp;Buka Undangan
          </a>
        </div>
      </section>

      {/* Main Content */}
      <main id="undangan">
        {/* Ayat Section */}
        <section className="section-ayat">
          <div className="container-inner">
            <div className="bismillah-wrap">
              <div className="bismillah-arabic">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div>
              <p className="bismillah-trans">Dengan menyebut nama Allah Yang Maha Pengasih lagi Maha Penyayang</p>
            </div>

            <div className="ayat-box">
              <div className="ayat-arabic">
                وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِنْ أَنْفُسِكُمْ أَزْوَاجًا لِتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ Lِقَوْمٍ يَتَفَكَّرُونَ
              </div>
              <p className="ayat-trans">
                "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir."
              </p>
              <p className="ayat-source">— QS. Ar-Rum : 21 —</p>
            </div>

            <div className="ayat-box mt-ayat">
              <div className="ayat-arabic">
                وَأَنكِحُوا الْأَيَامَىٰ مِنكُمْ وَالصَّالِحِينَ مِنْ عِبَادِكُمْ وَإِمَائِكُمْ ۚ إِن يَكُونُوا فُقَرَاءَ يُغْنِهِمُ اللَّهُ مِن فَضْلِهِ ۗ وَاللَّهُ وَاسِعٌ عَلِيمٌ
              </div>
              <p className="ayat-trans">
                "Dan nikahkanlah orang-orang yang masih membujang di antara kamu, dan juga orang-orang yang layak (menikah) dari hamba-hamba sahayamu yang laki-laki dan perempuan. Jika mereka miskin, Allah akan memberi kemampuan kepada mereka dengan karunia-Nya. Dan Allah Mahaluas (pemberian-Nya), Maha Mengetahui."
              </p>
              <p className="ayat-source">— QS. An-Nur : 32 —</p>
            </div>

            <div className="hadits-box">
              <div className="hadits-icon">☽</div>
              <p className="hadits-text">
                "Wahai para pemuda, barangsiapa di antara kalian yang sudah mampu menanggung beban pernikahan, maka hendaklah ia menikah. Sesungguhnya menikah itu lebih bisa menahan pandangan mata dan lebih bisa menjaga kemaluan."
              </p>
              <p className="hadits-source">— HR. Bukhari & Muslim —</p>
            </div>
          </div>
        </section>

        {/* Mempelai Section */}
        <section className="section-mempelai">
          <div className="section-ornament-top"></div>
          <div className="container-inner text-center">
            <p className="section-label">Dengan Memohon Rahmat & Ridho Allah SWT</p>
            <h2 className="section-title">Kami Yang Berbahagia</h2>
            <div className="gold-divider"><span>✦</span></div>

            <p className="mempelai-intro">
              Dengan penuh rasa syukur, kami bermaksud mengumumkan pernikahan putra-putri kami:
            </p>

            <div className="mempelai-cards">
              {/* Mempelai Wanita */}
              <div className="mempelai-card mempelai-wanita">
                <div className="mempelai-icon">♀</div>
                <h3 className="mempelai-name">{data.bride_fullname}</h3>
                <p className="mempelai-parents">Putri ke dua dari<br /><strong>{data.bride_parents}</strong></p>
                <div className="mempelai-tag">Mempelai Wanita</div>
              </div>

              <div className="mempelai-ampersand">
                <span className="big-amp">&amp;</span>
              </div>

              {/* Mempelai Pria */}
              <div className="mempelai-card mempelai-pria">
                <div className="mempelai-icon">♂</div>
                <h3 className="mempelai-name">{data.groom_fullname}</h3>
                <p className="mempelai-parents">Putra tunggal dari<br /><strong>{data.groom_parents}</strong></p>
                <div className="mempelai-tag">Mempelai Pria</div>
              </div>
            </div>
          </div>
          <div className="section-ornament-bottom"></div>
        </section>

        {/* Detail Acara Section */}
        <section className="section-acara">
          <div className="container-inner text-center">
            <p className="section-label">Insya Allah akan diselenggarakan pada</p>
            <h2 className="section-title">Detail Acara</h2>
            <div className="gold-divider"><span>✦</span></div>

            <div className="acara-cards">
              {/* Akad */}
              <div className="acara-card">
                <div className="acara-icon">🕌</div>
                <h3 className="acara-title">Akad Nikah</h3>
                <div className="acara-divider"></div>
                <div className="acara-detail">
                  <i className="fa-regular fa-calendar-days"></i>
                  <div>
                    <strong>{data.akad_date_text}</strong>
                  </div>
                </div>
                <div className="acara-detail">
                  <i className="fa-regular fa-clock"></i>
                  <div>{data.akad_time_text}</div>
                </div>
                <div className="acara-detail">
                  <i className="fa-solid fa-location-dot"></i>
                  <div>
                    {data.akad_location}<br />
                    <small>{data.akad_address}</small>
                  </div>
                </div>
              </div>

              {/* Resepsi */}
              <div className="acara-card">
                <div className="acara-icon">🎊</div>
                <h3 className="acara-title">Walimatul 'Ursy</h3>
                <div className="acara-divider"></div>
                <div className="acara-detail">
                  <i className="fa-regular fa-calendar-days"></i>
                  <div>
                    <strong>{data.resepsi_date_text}</strong>
                  </div>
                </div>
                <div className="acara-detail">
                  <i className="fa-regular fa-clock"></i>
                  <div>{data.resepsi_time_text}</div>
                </div>
                <div className="acara-detail">
                  <i className="fa-solid fa-location-dot"></i>
                  <div>
                    {data.resepsi_location}<br />
                    <small>{data.resepsi_address}</small>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Embed Component */}
            <GoogleMaps mapsUrl={data.maps_url || ''} iframeUrl={data.maps_iframe_url || ''} />
          </div>
        </section>

        {/* Wishes Section */}
        <section className="section-doa">
          <div className="container-inner text-center">
            <p className="section-label">Kirimkan Ucapan</p>
            <h2 className="section-title">Ucapan &amp; Doa</h2>
            <div className="gold-divider"><span>✦</span></div>
            <p className="doa-desc">Kami sangat berterima kasih atas setiap doa dan ucapan yang tulus untuk kami.</p>
            
            {/* Reusable GuestBook Component */}
            <GuestBook weddingId={data.id} />
          </div>
        </section>

        {/* Penutup */}
        <section className="section-penutup">
          <div className="section-ornament-top"></div>
          <div className="container-inner text-center">
            <div className="penutup-content">
              <div className="bismillah-arabic" style={{ fontSize: '2rem', marginBottom: '1rem' }}>جَزَاكُمُ اللَّهُ خَيْرًا</div>
              <p className="penutup-text">
                Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak / Ibu / Saudara/i berkenan hadir dan memberikan doa restu kepada kedua mempelai.
              </p>
              <p className="penutup-text mt-1">
                Atas kehadiran dan doa restu yang diberikan, kami ucapkan <em>Jazākumullāhu Khayran</em> — semoga Allah membalas kebaikan Anda dengan yang lebih baik.
              </p>

              <div className="wasalam">
                <span>وَالسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ</span>
              </div>

              <p className="ttd-label">Keluarga Besar</p>
              <h3 className="ttd-names">
                {data.bride_name}<br />
                <span className="ttd-amp">&amp;</span><br />
                {data.groom_name}
              </h3>
            </div>
          </div>
          <div className="section-ornament-bottom"></div>
        </section>

        {/* Footer */}
        <footer className="site-footer">
          <p>Made with <span style={{ color: '#e74c3c' }}>♥</span> | {data.groom_fullname} &copy; 2026</p>
        </footer>
      </main>
    </div>
  );
};
export default TemplateElegant;
