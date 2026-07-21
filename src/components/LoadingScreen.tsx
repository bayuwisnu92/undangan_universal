import React from 'react';

export const LoadingScreen: React.FC = () => {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: '#1A2744',
      color: '#E8C97E',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 99999,
      fontFamily: 'serif',
      letterSpacing: '2px'
    }}>
      <div style={{
        border: '3px solid rgba(232, 201, 126, 0.2)',
        borderTop: '3px solid #E8C97E',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        animation: 'spin 1s linear infinite',
        marginBottom: '20px'
      }}></div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <h2>MEMBUKA UNDANGAN</h2>
      <p style={{ fontSize: '0.8rem', opacity: 0.8, marginTop: '8px' }}>Mohon Tunggu Sebentar...</p>
    </div>
  );
};
