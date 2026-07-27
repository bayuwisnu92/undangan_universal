import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TemplateRegistry } from '../templates/TemplateRegistry';

export const TemplateCatalog: React.FC = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const isDark = theme === 'dark';
  
  const demoSlugs: Record<number, string> = {
    1: 'lulu-bayu',
    2: 'joko-riri',
    3: 'andi-rina',
    4: 'budi-siti',
    5: 'anton-mega',
    6: 'nabila-fajar',
    7: 'maya-dimas',
    8: 'tara-rizky'
  };

  const renderCardPreview = (id: number) => {
    const cardStyle: React.CSSProperties = {
      height: '380px',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '24px 20px',
      overflow: 'hidden',
      textAlign: 'center'
    };

    switch (id) {
      case 1: // Elegant Luxury
        return (
          <div style={{
            ...cardStyle,
            background: 'linear-gradient(180deg, #1A2744 0%, #2E4057 100%)',
            borderBottom: '2px solid #C9A44C'
          }}>
            {/* Ornament frame */}
            <div style={{ position: 'absolute', top: '16px', left: '16px', right: '16px', bottom: '16px', border: '1px solid rgba(201,164,76,0.35)', borderRadius: '8px' }} />
            {/* Gold particles */}
            {[...Array(8)].map((_, i) => (
              <div key={i} style={{
                position: 'absolute',
                width: `${4 + Math.random() * 4}px`,
                height: `${4 + Math.random() * 4}px`,
                borderRadius: '50%',
                background: '#E8C97E',
                opacity: 0.15 + Math.random() * 0.25,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`
              }} />
            ))}
            <div style={{ fontSize: '1.3rem', color: '#E8C97E', fontFamily: "'Amiri', serif", zIndex: 1, marginBottom: '6px', opacity: 0.9 }}>بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيْمِ</div>
            <div style={{ fontSize: '0.7rem', color: '#C9A44C', fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', letterSpacing: '3px', zIndex: 1, marginBottom: '4px' }}>THE WEDDING OF</div>
            <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '2px', textTransform: 'uppercase', zIndex: 1, marginBottom: '10px' }}>UNDANGAN PERNIKAHAN</div>
            <div style={{ fontSize: '2.8rem', fontFamily: "'Sofia', cursive", color: '#E8C97E', zIndex: 1, lineHeight: 1.1, textShadow: '0 2px 20px rgba(201,164,76,0.4)' }}>Lulu</div>
            <div style={{ fontSize: '2rem', fontFamily: "'Sofia', cursive", color: '#C9A44C', zIndex: 1, margin: '-2px 0' }}>&amp;</div>
            <div style={{ fontSize: '2.8rem', fontFamily: "'Sofia', cursive", color: '#FFFFFF', zIndex: 1, lineHeight: 1.1, textShadow: '0 2px 20px rgba(201,164,76,0.3)' }}>Bayu</div>
            <div style={{ marginTop: '14px', zIndex: 1, border: '1px solid #C9A44C', borderRadius: '50px', padding: '6px 20px', background: 'rgba(201,164,76,0.08)' }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", color: '#E8C97E', fontSize: '0.8rem', letterSpacing: '2px' }}>16 AGUSTUS 2026</span>
            </div>
            {/* Mini countdown preview */}
            <div style={{ display: 'flex', gap: '6px', marginTop: '16px', zIndex: 1 }}>
              {['120', '08', '30', '45'].map((val, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(201,164,76,0.3)', borderRadius: '8px', padding: '6px 10px', minWidth: '42px', backdropFilter: 'blur(4px)' }}>
                  <span style={{ fontSize: '1rem', fontWeight: 600, color: '#E8C97E', display: 'block' }}>{val}</span>
                  <small style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.5rem', textTransform: 'uppercase' }}>{['Hari', 'Jam', 'Mnt', 'Dtk'][i]}</small>
                </div>
              ))}
            </div>
          </div>
        );

      case 2: // Minimal White
        return (
          <div style={{
            ...cardStyle,
            background: '#FFFFFF',
            borderBottom: '1px solid #E2E2E2',
            color: '#111111'
          }}>
            <div style={{ fontSize: '0.6rem', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '6px', color: '#999999' }}>WALIMATUL URSY</div>
            <div style={{ fontSize: '3rem', fontFamily: "'Playfair Display', serif", fontWeight: 300, letterSpacing: '-1px', lineHeight: 1.15 }}>
              Joko<br /><span style={{ fontSize: '2rem', fontWeight: 300 }}>&amp;</span><br />Riri
            </div>
            <div style={{ width: '40px', height: '1px', background: '#111', margin: '14px auto' }} />
            <div style={{ fontSize: '0.75rem', letterSpacing: '2px', color: '#666666' }}>SABTU, 10 OKTOBER 2026</div>
            {/* Mini countdown */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
              {['120', '08', '30', '45'].map((val, i) => (
                <div key={i} style={{ border: '1px solid #E2E2E2', padding: '8px 10px', minWidth: '46px', textAlign: 'center' }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 300, display: 'block', color: '#111' }}>{val}</span>
                  <small style={{ color: '#999', fontSize: '0.5rem', textTransform: 'uppercase' }}>{['Hari', 'Jam', 'Mnt', 'Dtk'][i]}</small>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '18px', padding: '8px 24px', border: '1px solid #111', color: '#111', textTransform: 'uppercase', fontSize: '0.65rem', letterSpacing: '2px' }}>BUKA UNDANGAN</div>
          </div>
        );

      case 3: // Modern Glassmorphism
        return (
          <div style={{
            ...cardStyle,
            background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #311042 100%)',
            padding: '20px'
          }}>
            {/* Decorative blurred circles */}
            <div style={{ position: 'absolute', top: '15%', left: '-15%', width: '140px', height: '140px', borderRadius: '50%', background: 'rgba(99,102,241,0.15)', filter: 'blur(40px)' }} />
            <div style={{ position: 'absolute', bottom: '10%', right: '-10%', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(244,114,182,0.12)', filter: 'blur(35px)' }} />
            {/* Glass card */}
            <div style={{
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '20px',
              padding: '28px 24px',
              width: '100%',
              maxWidth: '280px',
              boxShadow: '0 8px 32px rgba(31,38,135,0.3)',
              zIndex: 1
            }}>
              <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>THE WEDDING OF</div>
              <div style={{ fontSize: '2.4rem', fontFamily: "'Sofia', cursive", background: 'linear-gradient(to right, #f472b6, #c084fc, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: '8px 0' }}>
                Andi &amp; Rina
              </div>
              <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)', letterSpacing: '1px', marginBottom: '14px' }}>20 September 2026</div>
              {/* Mini countdown */}
              <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                {['120', '08', '30', '45'].map((val, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px', padding: '6px 8px', minWidth: '40px' }}>
                    <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#fff', display: 'block' }}>{val}</span>
                    <small style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.45rem', textTransform: 'uppercase' }}>{['Hari', 'Jam', 'Mnt', 'Dtk'][i]}</small>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '14px', padding: '8px 20px', background: 'linear-gradient(135deg, #c084fc, #6366f1)', borderRadius: '50px', color: '#fff', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>BUKA UNDANGAN</div>
            </div>
          </div>
        );

      case 4: // Floral Garden
        return (
          <div style={{
            ...cardStyle,
            background: 'radial-gradient(circle at top, #ffffff 0%, transparent 55%), linear-gradient(180deg, rgba(229,179,179,0.2), rgba(133,159,132,0.15))',
            backgroundColor: '#fcfaf7',
            borderBottom: '1px solid rgba(133,159,132,0.25)'
          }}>
            {/* Decorative leaf elements */}
            <div style={{ fontSize: '1.8rem', marginBottom: '4px', opacity: 0.5 }}>🌿</div>
            <div style={{ fontSize: '0.6rem', letterSpacing: '3px', textTransform: 'uppercase', color: '#556355', marginBottom: '8px' }}>WALIMATUL URSY</div>
            <div style={{ fontSize: '3.2rem', fontFamily: "'Great Vibes', cursive", color: '#859f84', lineHeight: 1.1, textShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              Siti &amp; Budi
            </div>
            <div style={{ fontSize: '0.8rem', fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', marginTop: '8px', color: '#2d3a2e' }}>Ahad, 15 November 2026</div>
            {/* Mini countdown */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
              {['120', '08', '30', '45'].map((val, i) => (
                <div key={i} style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', boxShadow: '0 4px 15px rgba(0,0,0,0.04)', border: '1px solid rgba(255,255,255,0.5)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#859f84' }}>{val}</span>
                  <small style={{ color: '#556355', fontSize: '0.4rem', textTransform: 'uppercase' }}>{['Hari', 'Jam', 'Mnt', 'Dtk'][i]}</small>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '18px', padding: '10px 28px', backgroundColor: '#859f84', color: '#fff', borderRadius: '50px', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', boxShadow: '0 4px 12px rgba(133,159,132,0.3)' }}>BUKA UNDANGAN</div>
          </div>
        );

      case 5: // Dark Elegant
        return (
          <div style={{
            ...cardStyle,
            background: 'linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)), linear-gradient(135deg, #1a1a1a, #0a0a0a)',
            backgroundColor: '#121212',
            borderBottom: '2px solid #d4af37'
          }}>
            {/* Gold frame */}
            <div style={{ position: 'absolute', top: '14px', left: '14px', right: '14px', bottom: '14px', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '4px' }} />
            {/* Corner ornaments */}
            <div style={{ position: 'absolute', top: '10px', left: '10px', width: '24px', height: '24px', borderTop: '2px solid #d4af37', borderLeft: '2px solid #d4af37' }} />
            <div style={{ position: 'absolute', top: '10px', right: '10px', width: '24px', height: '24px', borderTop: '2px solid #d4af37', borderRight: '2px solid #d4af37' }} />
            <div style={{ position: 'absolute', bottom: '10px', left: '10px', width: '24px', height: '24px', borderBottom: '2px solid #d4af37', borderLeft: '2px solid #d4af37' }} />
            <div style={{ position: 'absolute', bottom: '10px', right: '10px', width: '24px', height: '24px', borderBottom: '2px solid #d4af37', borderRight: '2px solid #d4af37' }} />
            
            <div style={{ fontSize: '0.6rem', color: '#d4af37', letterSpacing: '4px', textTransform: 'uppercase', zIndex: 1, marginBottom: '8px' }}>THE WEDDING CELEBRATION</div>
            <div style={{ fontSize: '3rem', fontFamily: "'Great Vibes', cursive", color: '#d4af37', textShadow: '0 2px 15px rgba(212,175,55,0.4)', zIndex: 1, lineHeight: 1.1 }}>
              Mega &amp; Anton
            </div>
            <div style={{ width: '50px', height: '1px', background: 'linear-gradient(to right, transparent, #d4af37, transparent)', margin: '12px auto', zIndex: 1 }} />
            <div style={{ fontSize: '0.75rem', color: '#e0e0e0', zIndex: 1, letterSpacing: '2px' }}>JUMAT, 25 DESEMBER 2026</div>
            {/* Mini countdown */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '16px', zIndex: 1 }}>
              {['160', '00', '03', '48'].map((val, i) => (
                <div key={i} style={{ background: '#1e1e1e', border: '1px solid #d4af37', borderRadius: '6px', padding: '8px 10px', minWidth: '44px' }}>
                  <span style={{ fontSize: '1rem', fontFamily: "'Montserrat', sans-serif", fontWeight: 700, color: '#f3e5ab', display: 'block' }}>{val}</span>
                  <small style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.45rem', textTransform: 'uppercase' }}>{['Hari', 'Jam', 'Mnt', 'Dtk'][i]}</small>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '18px', padding: '10px 28px', background: 'linear-gradient(135deg, #d4af37, #aa7c11)', color: '#121212', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', boxShadow: '0 4px 12px rgba(212,175,55,0.3)', zIndex: 1 }}>BUKA UNDANGAN</div>
          </div>
        );

      case 6: // Royal Sage
        return (
          <div style={{
            ...cardStyle,
            background: 'linear-gradient(rgba(34,51,41,0.7), rgba(34,51,41,0.85)), url(/bg-wedding.png) center top / cover',
            borderBottom: '2px solid #8b6f3d'
          }}>
            <div style={{ position: 'absolute', inset: '22px', border: '1px solid rgba(255,250,240,0.55)', outline: '6px solid rgba(255,250,240,0.08)' }} />
            <div style={{ fontSize: '0.65rem', color: '#e6d3a2', letterSpacing: '4px', textTransform: 'uppercase', zIndex: 1 }}>The Wedding of</div>
            <div style={{ fontSize: '3.2rem', fontFamily: "'Cormorant Garamond', serif", color: '#fffaf0', zIndex: 1, lineHeight: 0.95, margin: '12px 0' }}>Nabila<br />&amp;<br />Fajar</div>
            <div style={{ color: '#e6d3a2', letterSpacing: '2px', fontSize: '0.74rem', zIndex: 1 }}>07 FEBRUARI 2027</div>
            <div style={{ display: 'flex', gap: '7px', marginTop: '18px', zIndex: 1 }}>
              {['195', '10', '15', '22'].map((val, i) => (
                <div key={i} style={{ minWidth: '42px', padding: '7px 8px', border: '1px solid rgba(255,250,240,0.35)', background: 'rgba(255,250,240,0.12)' }}>
                  <span style={{ display: 'block', color: '#fffaf0', fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem' }}>{val}</span>
                  <small style={{ color: 'rgba(255,250,240,0.58)', fontSize: '0.45rem', textTransform: 'uppercase' }}>{['Hari', 'Jam', 'Mnt', 'Dtk'][i]}</small>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '18px', padding: '10px 26px', background: '#8b6f3d', color: '#fffaf0', fontSize: '0.65rem', letterSpacing: '2px', textTransform: 'uppercase', zIndex: 1 }}>Buka Undangan</div>
          </div>
        );

      case 7: // Rustic Warm
        return (
          <div style={{
            ...cardStyle,
            background: 'linear-gradient(rgba(251,247,239,0.78), rgba(251,247,239,0.95)), url(/background.png) center top / cover',
            color: '#31261e',
            borderBottom: '2px solid #b46d45'
          }}>
            <div style={{ fontSize: '0.65rem', color: '#b46d45', letterSpacing: '4px', textTransform: 'uppercase', fontWeight: 700 }}>Walimatul Ursy</div>
            <div style={{ fontSize: '3.4rem', fontFamily: "'Great Vibes', cursive", color: '#b46d45', lineHeight: 0.9, margin: '12px 0' }}>Maya<br /><span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', color: '#6f7658' }}>&amp;</span><br />Dimas</div>
            <div style={{ color: '#7c6a5c', letterSpacing: '2px', fontSize: '0.74rem' }}>12 MARET 2027</div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '18px' }}>
              {['228', '07', '44', '30'].map((val, i) => (
                <div key={i} style={{ minWidth: '44px', padding: '8px 8px', background: 'rgba(255,255,255,0.72)', border: '1px solid rgba(180,109,69,0.18)', boxShadow: '0 8px 20px rgba(49,38,30,0.06)' }}>
                  <span style={{ display: 'block', color: '#31261e', fontFamily: "'Playfair Display', serif", fontSize: '1rem' }}>{val}</span>
                  <small style={{ color: '#7c6a5c', fontSize: '0.45rem', textTransform: 'uppercase' }}>{['Hari', 'Jam', 'Mnt', 'Dtk'][i]}</small>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '18px', padding: '10px 26px', background: '#b46d45', color: '#fff', fontSize: '0.65rem', letterSpacing: '2px', textTransform: 'uppercase' }}>Buka Undangan</div>
          </div>
        );

      case 8: // Coastal Blue
        return (
          <div style={{
            ...cardStyle,
            background: 'linear-gradient(180deg, rgba(23,51,58,0.22), rgba(238,247,247,0.96)), url(/bg-wedding.png) center top / cover',
            color: '#17333a',
            borderBottom: '2px solid #1f7a8c'
          }}>
            <div style={{ background: 'rgba(238,247,247,0.86)', border: '1px solid rgba(31,122,140,0.22)', padding: '28px 18px', width: '100%', maxWidth: '280px', boxShadow: '0 18px 48px rgba(23,51,58,0.14)' }}>
              <div style={{ fontSize: '0.62rem', color: '#1f7a8c', letterSpacing: '4px', textTransform: 'uppercase', fontWeight: 700 }}>Wedding Celebration</div>
              <div style={{ fontSize: '2.9rem', fontFamily: "'Cormorant Garamond', serif", color: '#17333a', lineHeight: 0.95, margin: '12px 0' }}>Tara &amp;<br />Rizky</div>
              <div style={{ color: '#638088', letterSpacing: '2px', fontSize: '0.72rem' }}>24 APRIL 2027</div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '16px' }}>
                {['271', '13', '20', '10'].map((val, i) => (
                  <div key={i} style={{ minWidth: '40px', padding: '7px 7px', background: '#fff', border: '1px solid rgba(31,122,140,0.18)' }}>
                    <span style={{ display: 'block', color: '#17333a', fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem' }}>{val}</span>
                    <small style={{ color: '#638088', fontSize: '0.43rem', textTransform: 'uppercase' }}>{['Hari', 'Jam', 'Mnt', 'Dtk'][i]}</small>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '16px', padding: '10px 22px', background: '#1f7a8c', color: '#fff', fontSize: '0.65rem', letterSpacing: '2px', textTransform: 'uppercase' }}>Buka Undangan</div>
            </div>
          </div>
        );

      default:
        return <div style={{ height: '380px', background: '#1e293b' }} />;
    }
  };

  return (
    <div className="app-page catalog-page" data-theme={theme}>
      <div className="catalog-shell">
        <div className="catalog-topbar">
          <a className="catalog-brand" href="/templates" aria-label="Kembali ke katalog template">
            <span className="catalog-brand-mark">U</span>
            <span>Undangan Universal</span>
          </a>

          <div className="theme-toggle" aria-label="Pilih mode tampilan">
            <button
              type="button"
              className={!isDark ? 'active' : ''}
              onClick={() => setTheme('light')}
            >
              Light
            </button>
            <button
              type="button"
              className={isDark ? 'active' : ''}
              onClick={() => setTheme('dark')}
            >
              Dark
            </button>
          </div>
        </div>

        <section className="catalog-hero">
          <div className="catalog-hero-copy">
            <span className="catalog-eyebrow">Koleksi template premium</span>
            <h1>Pilih desain undangan yang paling terasa seperti hari bahagiamu.</h1>
            <p>
              Jelajahi template cerah, elegan, modern, sampai moody. Semua siap dipakai untuk demo,
              checkout, dan personalisasi undangan digital.
            </p>
            <div className="catalog-hero-actions">
              <a href="#template-list" className="catalog-primary-action">Lihat Template</a>
              <span>{Object.keys(TemplateRegistry).length} desain tersedia</span>
            </div>
          </div>

          <div className="catalog-hero-showcase" aria-hidden="true">
            <div className="showcase-card showcase-main">
              <span>Featured</span>
              <strong>Royal Sage</strong>
              <small>Nabila &amp; Fajar</small>
            </div>
            <div className="showcase-card showcase-accent">
              <span>New</span>
              <strong>Coastal Blue</strong>
            </div>
          </div>
        </section>

        <div className="catalog-section-heading" id="template-list">
          <div>
            <span className="catalog-eyebrow">Template undangan</span>
            <h2>Siap dipilih dan dicoba</h2>
          </div>
          <p>Default tampilan halaman ini light, dan mode dark tetap tersedia lewat toggle di atas.</p>
        </div>

        <div className="responsive-card-grid catalog-grid">
          {Object.values(TemplateRegistry).map((template) => {
            const demoSlug = demoSlugs[template.id] || 'lulu-bayu';

            return (
              <div 
                key={template.id} 
                className="catalog-card"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Template Hero Preview */}
                <div style={{ position: 'relative' }}>
                  {renderCardPreview(template.id)}
                  
                  {/* Floating Template Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    color: '#fff',
                    background: 'rgba(0,0,0,0.6)',
                    padding: '5px 12px',
                    borderRadius: '20px',
                    backdropFilter: 'blur(3px)',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    border: '1px solid rgba(255,255,255,0.15)',
                    zIndex: 2
                  }}>
                    Template #{template.id}
                  </div>
                </div>

                {/* Content */}
                <div className="catalog-card-content">
                  <h3>{template.name}</h3>
                  <p>
                    Layout modern dengan penyesuaian warna harmonis, typography responsif, dan ornamen mewah untuk menyambut tamu Anda.
                  </p>

                  <div className="catalog-actions">
                    <a
                      href={`/${demoSlug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="catalog-btn catalog-btn-primary"
                    >
                      Demo Live
                    </a>
                    <button
                      onClick={() => navigate(`/buy/${template.id}`)}
                      className="catalog-btn catalog-btn-secondary"
                    >
                      Pilih Desain
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default TemplateCatalog;
