import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TemplateRegistry } from '../templates/TemplateRegistry';

export const TemplateCatalog: React.FC = () => {
  const navigate = useNavigate();
  
  const demoSlugs: Record<number, string> = {
    1: 'lulu-bayu',
    2: 'joko-riri',
    3: 'andi-rina',
    4: 'budi-siti',
    5: 'anton-mega'
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

      default:
        return <div style={{ height: '380px', background: '#1e293b' }} />;
    }
  };

  return (
    <div style={{
      backgroundColor: '#0f172a',
      color: '#f8fafc',
      minHeight: '100vh',
      fontFamily: 'Montserrat, sans-serif',
      padding: '60px 20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{
          fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
          fontWeight: 700,
          background: 'linear-gradient(to right, #38bdf8, #a855f7, #f43f5e)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '15px'
        }}>
          Pilih Template Undangan Anda
        </h1>
        <p style={{
          color: '#94a3b8',
          fontSize: '1.1rem',
          maxWidth: '700px',
          margin: '0 auto 50px',
          lineHeight: 1.6
        }}>
          Temukan koleksi desain undangan digital terbaik kami. Pilih desain favorit Anda dan buat undangan premium Anda secara instan.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '30px',
          marginTop: '20px'
        }}>
          {Object.values(TemplateRegistry).map((template) => {
            const demoSlug = demoSlugs[template.id] || 'lulu-bayu';

            return (
              <div 
                key={template.id} 
                style={{
                  background: '#1e293b',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.05)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 25px 50px rgba(168,85,247,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
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
                <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '10px', color: '#f8fafc' }}>
                    {template.name}
                  </h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '25px', flexGrow: 1 }}>
                    Layout modern dengan penyesuaian warna harmonis, typography responsif, dan ornamen mewah untuk menyambut tamu Anda.
                  </p>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <a
                      href={`/${demoSlug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        flex: 1,
                        padding: '12px 18px',
                        backgroundColor: '#a855f7',
                        color: 'white',
                        textAlign: 'center',
                        textDecoration: 'none',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px rgba(168,85,247,0.3)',
                        transition: 'opacity 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                    >
                      Demo Live
                    </a>
                    <button
                      onClick={() => navigate(`/buy/${template.id}`)}
                      style={{
                        flex: 1,
                        padding: '12px 18px',
                        backgroundColor: 'transparent',
                        color: '#f8fafc',
                        border: '1.5px solid rgba(255,255,255,0.15)',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        transition: 'border-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = 'white'}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'}
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
