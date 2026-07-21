import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getWeddingById, updateWeddingDetails } from '../services/weddingService';
import type { WeddingData } from '../types/wedding';
import { LoadingScreen } from '../components/LoadingScreen';

export const SetupWeddingPage: React.FC = () => {
  const { weddingId } = useParams<{ weddingId: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [wedding, setWedding] = useState<WeddingData | null>(null);

  // Form states
  const [slug, setSlug] = useState('');
  const [brideName, setBrideName] = useState('');
  const [brideFullname, setBrideFullname] = useState('');
  const [brideParents, setBrideParents] = useState('');
  
  const [groomName, setGroomName] = useState('');
  const [groomFullname, setGroomFullname] = useState('');
  const [groomParents, setGroomParents] = useState('');
  
  const [eventDate, setEventDate] = useState('2026-08-16T08:00');
  
  const [akadDateText, setAkadDateText] = useState('Ahad, 16 Agustus 2026');
  const [akadTimeText, setAkadTimeText] = useState('08.00 WIB – Selesai');
  const [akadLocation, setAkadLocation] = useState('Gedung PT INTI');
  const [akadAddress, setAkadAddress] = useState('Jl. Moh. Toha No.77, Bandung');
  
  const [resepsiDateText, setResepsiDateText] = useState('Ahad, 16 Agustus 2026');
  const [resepsiTimeText, setResepsiTimeText] = useState('11.00 WIB – 14.00 WIB');
  const [resepsiLocation, setResepsiLocation] = useState('Gedung PT INTI');
  const [resepsiAddress, setResepsiAddress] = useState('Jl. Moh. Toha No.77, Bandung');
  
  const [mapsUrl, setMapsUrl] = useState('https://maps.app.goo.gl/abeHsbATGtEhxFf26');
  const [mapsIframeUrl, setMapsIframeUrl] = useState('https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15842.40926540292!2d107.58919485541989!3d-6.938040799999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e63a66953993%3A0x248047e0057191ae!2sPT.%20Inti%20(Persero)!5e0!3m2!1sid!2sid!4v1781082382014!5m2!1sid!2sid');
  const [musicUrl, setMusicUrl] = useState('asset/spike.mp3');

  useEffect(() => {
    const fetchWedding = async () => {
      if (!weddingId) return;
      try {
        const data = await getWeddingById(weddingId);
        setWedding(data);
        
        // Populate existing data if available
        setSlug(data.slug || '');
        setBrideName(data.bride_name || '');
        setBrideFullname(data.bride_fullname || '');
        setBrideParents(data.bride_parents || '');
        setGroomName(data.groom_name || '');
        setGroomFullname(data.groom_fullname || '');
        setGroomParents(data.groom_parents || '');
        
        if (data.event_date) {
          // formatting to datetime-local compatibility format: YYYY-MM-DDTHH:mm
          setEventDate(data.event_date.slice(0, 16));
        }
        
        setAkadDateText(data.akad_date_text || 'Ahad, 16 Agustus 2026');
        setAkadTimeText(data.akad_time_text || '08.00 WIB – Selesai');
        setAkadLocation(data.akad_location || 'Gedung PT INTI');
        setAkadAddress(data.akad_address || 'Jl. Moh. Toha No.77, Bandung');
        
        setResepsiDateText(data.resepsi_date_text || 'Ahad, 16 Agustus 2026');
        setResepsiTimeText(data.resepsi_time_text || '11.00 WIB – 14.00 WIB');
        setResepsiLocation(data.resepsi_location || 'Gedung PT INTI');
        setResepsiAddress(data.resepsi_address || 'Jl. Moh. Toha No.77, Bandung');
        
        setMapsUrl(data.maps_url || 'https://maps.app.goo.gl/abeHsbATGtEhxFf26');
        setMapsIframeUrl(data.maps_iframe_url || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15842.40926540292!2d107.58919485541989!3d-6.938040799999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e63a66953993%3A0x248047e0057191ae!2sPT.%20Inti%20(Persero)!5e0!3m2!1sid!2sid!4v1781082382014!5m2!1sid!2sid');
        setMusicUrl(data.music_url || 'asset/spike.mp3');
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchWedding();
  }, [weddingId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!weddingId) return;

    const details: Partial<WeddingData> = {
      slug: slug.toLowerCase().replace(/[^a-z0-9-]/g, ''),
      bride_name: brideName,
      bride_fullname: brideFullname,
      bride_parents: brideParents,
      groom_name: groomName,
      groom_fullname: groomFullname,
      groom_parents: groomParents,
      event_date: eventDate + ':00+07:00', // appending timezone
      akad_date_text: akadDateText,
      akad_time_text: akadTimeText,
      akad_location: akadLocation,
      akad_address: akadAddress,
      resepsi_date_text: resepsiDateText,
      resepsi_time_text: resepsiTimeText,
      resepsi_location: resepsiLocation,
      resepsi_address: resepsiAddress,
      maps_url: mapsUrl,
      maps_iframe_url: mapsIframeUrl,
      music_url: musicUrl,
      cover_bg_image: 'bg-wedding.png', // Default system theme images
      bg_image: 'background.png',
      gallery_images: ['bg-wedding.png', 'background.png']
    };

    try {
      setLoading(true);
      const updated = await updateWeddingDetails(weddingId, details);
      alert('Data pernikahan berhasil disimpan!');
      // View invitation
      navigate(`/${updated.slug}`);
    } catch (err) {
      console.error(err);
      alert('Gagal mengupdate data undangan.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingScreen />;

  if (!wedding) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', color: 'white', backgroundColor: '#0f172a', minHeight: '100vh' }}>
        <h2>Undangan tidak ditemukan</h2>
        <Link to="/templates" style={{ color: '#a855f7', textDecoration: 'underline' }}>Kembali ke Katalog</Link>
      </div>
    );
  }

  // Double check payment verification safety
  if (wedding.payment_status !== 'paid') {
    return (
      <div style={{
        backgroundColor: '#0f172a',
        color: '#f8fafc',
        minHeight: '100vh',
        fontFamily: 'Montserrat, sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px'
      }}>
        <div style={{
          backgroundColor: '#1e293b',
          borderRadius: '24px',
          padding: '40px',
          maxWidth: '550px',
          textAlign: 'center',
          boxShadow: '0 20px 45px rgba(0,0,0,0.3)'
        }}>
          <div style={{ fontSize: '3rem', color: '#ef4444', marginBottom: '15px' }}>⚠</div>
          <h2 style={{ marginBottom: '15px' }}>Akses Ditolak</h2>
          <p style={{ color: '#94a3b8', marginBottom: '30px', lineHeight: 1.5 }}>
            Anda belum melunasi biaya pemesanan atau bukti transfer Anda belum diverifikasi admin.
          </p>
          <Link
            to={`/payment-pending/${wedding.id}`}
            style={{
              display: 'block',
              padding: '14px',
              backgroundColor: '#a855f7',
              color: 'white',
              borderRadius: '12px',
              fontWeight: 700,
              textDecoration: 'none'
            }}
          >
            Lakukan Pembayaran
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: '#0f172a',
      color: '#f8fafc',
      minHeight: '100vh',
      fontFamily: 'Montserrat, sans-serif',
      padding: '50px 20px'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 700, marginBottom: '8px' }}>Pengaturan Data Undangan</h1>
        <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '40px' }}>
          Silakan isi formulir di bawah dengan data pernikahan Anda. Klik "Simpan &amp; Publish" untuk melihat perubahan.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
          {/* URL & SLUG */}
          <div style={{ background: '#1e293b', padding: '30px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px', marginBottom: '20px', color: '#a855f7' }}>URL Undangan</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Slug URL Pasangan</label>
              <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                <span style={{ position: 'absolute', left: '15px', color: '#64748b' }}>wedding.com/</span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                  required
                  style={{
                    padding: '12px 15px 12px 120px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    backgroundColor: '#0f172a',
                    color: 'white',
                    outline: 'none',
                    width: '100%'
                  }}
                />
              </div>
            </div>
          </div>

          {/* MEMPELAI WANITA */}
          <div style={{ background: '#1e293b', padding: '30px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px', marginBottom: '20px', color: '#ec4899' }}>Mempelai Wanita (Bride)</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.85rem' }}>Nama Panggilan</label>
                <input
                  type="text"
                  value={brideName}
                  onChange={(e) => setBrideName(e.target.value)}
                  placeholder="Lulu"
                  required
                  style={{ padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#0f172a', color: 'white', outline: 'none' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.85rem' }}>Nama Lengkap</label>
                <input
                  type="text"
                  value={brideFullname}
                  onChange={(e) => setBrideFullname(e.target.value)}
                  placeholder="Lulu Diyanti Putri"
                  required
                  style={{ padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#0f172a', color: 'white', outline: 'none' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.85rem' }}>Nama Orang Tua</label>
                <input
                  type="text"
                  value={brideParents}
                  onChange={(e) => setBrideParents(e.target.value)}
                  placeholder="Bapak Yosep & Ibu Zulfira Yanti"
                  required
                  style={{ padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#0f172a', color: 'white', outline: 'none' }}
                />
              </div>
            </div>
          </div>

          {/* MEMPELAI PRIA */}
          <div style={{ background: '#1e293b', padding: '30px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px', marginBottom: '20px', color: '#3b82f6' }}>Mempelai Pria (Groom)</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.85rem' }}>Nama Panggilan</label>
                <input
                  type="text"
                  value={groomName}
                  onChange={(e) => setGroomName(e.target.value)}
                  placeholder="Bayu"
                  required
                  style={{ padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#0f172a', color: 'white', outline: 'none' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.85rem' }}>Nama Lengkap</label>
                <input
                  type="text"
                  value={groomFullname}
                  onChange={(e) => setGroomFullname(e.target.value)}
                  placeholder="Bayu Wisnu Aji"
                  required
                  style={{ padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#0f172a', color: 'white', outline: 'none' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.85rem' }}>Nama Orang Tua</label>
                <input
                  type="text"
                  value={groomParents}
                  onChange={(e) => setGroomParents(e.target.value)}
                  placeholder="Bapak Sukamto & Ibu Suwarti"
                  required
                  style={{ padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#0f172a', color: 'white', outline: 'none' }}
                />
              </div>
            </div>
          </div>

          {/* DETAIL EVENT & WAKTU */}
          <div style={{ background: '#1e293b', padding: '30px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px', marginBottom: '20px', color: '#10b981' }}>Waktu &amp; Lokasi Acara</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.85rem' }}>Tanggal Hitung Mundur (Target Countdown)</label>
                <input
                  type="datetime-local"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  required
                  style={{ padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#0f172a', color: 'white', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.85rem' }}>Akad: Label Tanggal</label>
                  <input
                    type="text"
                    value={akadDateText}
                    onChange={(e) => setAkadDateText(e.target.value)}
                    placeholder="Ahad, 16 Agustus 2026"
                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#0f172a', color: 'white' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.85rem' }}>Akad: Label Waktu</label>
                  <input
                    type="text"
                    value={akadTimeText}
                    onChange={(e) => setAkadTimeText(e.target.value)}
                    placeholder="08.00 WIB – Selesai"
                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#0f172a', color: 'white' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.85rem' }}>Akad: Gedung/Lokasi</label>
                  <input
                    type="text"
                    value={akadLocation}
                    onChange={(e) => setAkadLocation(e.target.value)}
                    placeholder="Gedung PT INTI"
                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#0f172a', color: 'white' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.85rem' }}>Akad: Alamat Lengkap</label>
                  <input
                    type="text"
                    value={akadAddress}
                    onChange={(e) => setAkadAddress(e.target.value)}
                    placeholder="Jl. Moh. Toha No.77, Bandung"
                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#0f172a', color: 'white' }}
                  />
                </div>
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.08)', margin: '10px 0' }} />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.85rem' }}>Resepsi: Label Tanggal</label>
                  <input
                    type="text"
                    value={resepsiDateText}
                    onChange={(e) => setResepsiDateText(e.target.value)}
                    placeholder="Ahad, 16 Agustus 2026"
                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#0f172a', color: 'white' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.85rem' }}>Resepsi: Label Waktu</label>
                  <input
                    type="text"
                    value={resepsiTimeText}
                    onChange={(e) => setResepsiTimeText(e.target.value)}
                    placeholder="11.00 WIB – 14.00 WIB"
                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#0f172a', color: 'white' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.85rem' }}>Resepsi: Gedung/Lokasi</label>
                  <input
                    type="text"
                    value={resepsiLocation}
                    onChange={(e) => setResepsiLocation(e.target.value)}
                    placeholder="Gedung PT INTI"
                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#0f172a', color: 'white' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.85rem' }}>Resepsi: Alamat Lengkap</label>
                  <input
                    type="text"
                    value={resepsiAddress}
                    onChange={(e) => setResepsiAddress(e.target.value)}
                    placeholder="Jl. Moh. Toha No.77, Bandung"
                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#0f172a', color: 'white' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* MAPS & MUSIC */}
          <div style={{ background: '#1e293b', padding: '30px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px', marginBottom: '20px', color: '#f59e0b' }}>Integrasi Maps &amp; Musik</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.85rem' }}>Link Google Maps Utama</label>
                <input
                  type="text"
                  value={mapsUrl}
                  onChange={(e) => setMapsUrl(e.target.value)}
                  placeholder="https://maps.app.goo.gl/..."
                  required
                  style={{ padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#0f172a', color: 'white', outline: 'none' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.85rem' }}>Google Maps Iframe Embed URL</label>
                <input
                  type="text"
                  value={mapsIframeUrl}
                  onChange={(e) => setMapsIframeUrl(e.target.value)}
                  placeholder="https://www.google.com/maps/embed?pb=..."
                  required
                  style={{ padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#0f172a', color: 'white', outline: 'none' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.85rem' }}>Background Music URL</label>
                <input
                  type="text"
                  value={musicUrl}
                  onChange={(e) => setMusicUrl(e.target.value)}
                  placeholder="asset/spike.mp3"
                  required
                  style={{ padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#0f172a', color: 'white', outline: 'none' }}
                />
              </div>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            style={{
              padding: '16px',
              backgroundColor: '#22c55e',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
              boxShadow: '0 6px 18px rgba(34,197,94,0.3)',
              transition: 'opacity 0.2s'
            }}
          >
            Simpan &amp; Publish Website Undangan
          </button>
        </form>
      </div>
    </div>
  );
};
export default SetupWeddingPage;
