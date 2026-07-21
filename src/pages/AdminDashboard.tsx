import React, { useEffect, useState } from 'react';
import { getAllWeddings, adminConfirmPayment } from '../services/weddingService';
import type { WeddingData } from '../types/wedding';
import { LoadingScreen } from '../components/LoadingScreen';

export const AdminDashboard: React.FC = () => {
  const [weddings, setWeddings] = useState<WeddingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unpaid' | 'pending' | 'paid'>('all');
  
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Active receipt preview modal state
  const [activeReceipt, setActiveReceipt] = useState<string | null>(null);

  const fetchWeddings = async () => {
    try {
      setLoading(true);
      const data = await getAllWeddings();
      setWeddings(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const authStatus = sessionStorage.getItem('admin_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      fetchWeddings();
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'bayuwisnu92' && password === 'hazukashidesu92') {
      sessionStorage.setItem('admin_authenticated', 'true');
      setIsAuthenticated(true);
      setLoginError(null);
      fetchWeddings();
    } else {
      setLoginError('Username atau Password salah.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated');
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  const handleApprove = async (id: string) => {
    try {
      setLoading(true);
      await adminConfirmPayment(id);
      alert('Pembayaran berhasil dikonfirmasi!');
      await fetchWeddings();
    } catch (e) {
      console.error(e);
      alert('Gagal menyetujui pembayaran.');
    } finally {
      setLoading(false);
    }
  };

  const filteredWeddings = weddings.filter(w => {
    if (filter === 'all') return true;
    return w.payment_status === filter;
  });

  if (loading) return <LoadingScreen />;

  // Render Login Card if not authenticated
  if (!isAuthenticated) {
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
          border: '1px solid rgba(255,255,255,0.05)',
          padding: '40px',
          maxWidth: '450px',
          width: '100%',
          boxShadow: '0 20px 45px rgba(0,0,0,0.3)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', color: '#a855f7', marginBottom: '15px' }}>🔐</div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '8px' }}>Admin Login Gateway</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '25px' }}>
            Akses dibatasi hanya untuk Administrator.
          </p>

          {loginError && (
            <div style={{
              backgroundColor: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid #ef4444',
              color: '#fca5a5',
              padding: '10px 14px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              marginBottom: '20px'
            }}>
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan Username..."
                required
                style={{
                  padding: '12px 15px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backgroundColor: '#0f172a',
                  color: 'white',
                  outline: 'none',
                  fontSize: '0.9rem'
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan Password..."
                required
                style={{
                  padding: '12px 15px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backgroundColor: '#0f172a',
                  color: 'white',
                  outline: 'none',
                  fontSize: '0.9rem'
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                marginTop: '10px',
                padding: '14px',
                backgroundColor: '#a855f7',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(168,85,247,0.3)',
                textAlign: 'center'
              }}
            >
              Masuk
            </button>
          </form>
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
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          paddingBottom: '20px',
          marginBottom: '30px'
        }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>Control Panel Admin</h1>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '5px' }}>
              Konfirmasi transaksi, kelola pesanan undangan customer, dan ubah template.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={fetchWeddings}
              style={{
                padding: '10px 16px',
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: 'white',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              <i className="fa-solid fa-rotate"></i> Refresh
            </button>
            <button 
              onClick={handleLogout}
              style={{
                padding: '10px 16px',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: '8px',
                color: '#fca5a5',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              <i className="fa-solid fa-right-from-bracket"></i> Keluar
            </button>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '25px' }}>
          {(['all', 'unpaid', 'pending', 'paid'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: filter === status ? '#a855f7' : '#1e293b',
                color: 'white',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                textTransform: 'capitalize'
              }}
            >
              {status === 'all' ? 'Semua Pesanan' : status === 'pending' ? 'Butuh Verifikasi' : status === 'paid' ? 'Lunas / Aktif' : 'Belum Bayar'}
            </button>
          ))}
        </div>

        {/* Orders Table */}
        <div style={{
          backgroundColor: '#1e293b',
          borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.05)',
          overflow: 'hidden'
        }}>
          {filteredWeddings.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px 20px', color: '#94a3b8' }}>
              Tidak ada pesanan di kategori ini.
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.1)' }}>
                    <th style={{ padding: '16px 20px', color: '#cbd5e1', fontSize: '0.85rem', fontWeight: 600 }}>Buyer Info</th>
                    <th style={{ padding: '16px 20px', color: '#cbd5e1', fontSize: '0.85rem', fontWeight: 600 }}>Slug &amp; Template ID</th>
                    <th style={{ padding: '16px 20px', color: '#cbd5e1', fontSize: '0.85rem', fontWeight: 600 }}>Status</th>
                    <th style={{ padding: '16px 20px', color: '#cbd5e1', fontSize: '0.85rem', fontWeight: 600 }}>Bukti Bayar</th>
                    <th style={{ padding: '16px 20px', color: '#cbd5e1', fontSize: '0.85rem', fontWeight: 600 }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredWeddings.map((w) => (
                    <tr key={w.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '18px 20px' }}>
                        <strong style={{ display: 'block', color: 'white' }}>{w.buyer_name || 'Tanpa Nama'}</strong>
                        <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{w.buyer_email || 'No email'}</span>
                      </td>
                      <td style={{ padding: '18px 20px' }}>
                        <span style={{ color: '#a855f7', fontWeight: 600, display: 'block' }}>/{w.slug}</span>
                        <span style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>Template ID: {w.template_id}</span>
                      </td>
                      <td style={{ padding: '18px 20px' }}>
                        <span style={{
                          padding: '4px 10px',
                          borderRadius: '20px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          backgroundColor: w.payment_status === 'paid' ? 'rgba(34, 197, 94, 0.15)' : w.payment_status === 'pending' ? 'rgba(234, 179, 8, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                          color: w.payment_status === 'paid' ? '#4ade80' : w.payment_status === 'pending' ? '#fde047' : '#fca5a5'
                        }}>
                          {w.payment_status === 'paid' ? 'Lunas' : w.payment_status === 'pending' ? 'Pending Verifikasi' : 'Belum Bayar'}
                        </span>
                        <span style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginTop: '5px' }}>
                          {w.is_configured ? 'Data Diisi' : 'Belum Konfigurasi'}
                        </span>
                      </td>
                      <td style={{ padding: '18px 20px' }}>
                        {w.receipt_url ? (
                          <button 
                            onClick={() => setActiveReceipt(w.receipt_url || null)}
                            style={{ 
                              background: 'none', 
                              border: 'none', 
                              color: '#38bdf8', 
                              fontSize: '0.85rem', 
                              textDecoration: 'underline', 
                              cursor: 'pointer',
                              padding: 0
                            }}
                          >
                            Lihat Gambar Receipt
                          </button>
                        ) : (
                          <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Tidak Ada Bukti</span>
                        )}
                      </td>
                      <td style={{ padding: '18px 20px' }}>
                        {w.payment_status === 'pending' && (
                          <button
                            onClick={() => handleApprove(w.id)}
                            style={{
                              padding: '8px 14px',
                              backgroundColor: '#22c55e',
                              color: 'white',
                              border: 'none',
                              borderRadius: '8px',
                              fontWeight: 600,
                              fontSize: '0.8rem',
                              cursor: 'pointer'
                            }}
                          >
                            Approve Payment
                          </button>
                        )}
                        {w.payment_status === 'paid' && (
                          <a
                            href={`/setup-wedding/${w.id}`}
                            style={{
                              padding: '8px 14px',
                              backgroundColor: '#0284c7',
                              color: 'white',
                              borderRadius: '8px',
                              textDecoration: 'none',
                              fontSize: '0.8rem',
                              fontWeight: 600,
                              display: 'inline-block'
                            }}
                          >
                            Edit Data
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal Preview Bukti Transfer (Base64 Safe Renderer) */}
      {activeReceipt && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.85)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 99999,
          padding: '20px'
        }} onClick={() => setActiveReceipt(null)}>
          <div style={{
            position: 'relative',
            maxWidth: '90%',
            maxHeight: '90%',
            backgroundColor: '#1e293b',
            borderRadius: '16px',
            padding: '12px',
            border: '1px solid rgba(255,255,255,0.1)'
          }} onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setActiveReceipt(null)}
              style={{
                position: 'absolute',
                top: '-15px',
                right: '-15px',
                width: '35px',
                height: '35px',
                borderRadius: '50%',
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 100000
              }}
            >
              ✕
            </button>
            <img 
              src={activeReceipt} 
              alt="Bukti Transfer" 
              style={{ 
                maxWidth: '100%', 
                maxHeight: '80vh', 
                borderRadius: '12px',
                display: 'block' 
              }} 
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default AdminDashboard;
