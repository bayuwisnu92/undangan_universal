import React from 'react';
import { useGuestName } from '../hooks/useGuestName';

interface GuestGreetingProps {
  prefix?: string;
  defaultGuest?: string;
  className?: string;
  nameClassName?: string;
  style?: React.CSSProperties;
}

export const GuestGreeting: React.FC<GuestGreetingProps> = ({
  prefix = "Kepada Yth. Bapak/Ibu/Saudara/i:",
  defaultGuest = "Tamu Undangan",
  className = "guest-greeting-box",
  nameClassName = "guest-name",
  style
}) => {
  const guestName = useGuestName();
  const displayName = guestName || defaultGuest;

  return (
    <div className={className} style={{ margin: '20px 0', textAlign: 'center', ...style }}>
      <p
        style={{
          fontSize: '0.95rem',
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          color: '#E8C97E',
          marginBottom: '8px',
          fontWeight: 400,
          textShadow: '0 2px 8px rgba(0,0,0,0.6)'
        }}
      >
        {prefix}
      </p>
      <h3
        className={nameClassName}
        style={{
          fontSize: '1.6rem',
          fontWeight: 700,
          margin: 0,
          color: '#FAF7F0',
          letterSpacing: '1px',
          textShadow: '0 2px 10px rgba(0, 0, 0, 0.8), 0 0 15px rgba(232, 201, 126, 0.4)'
        }}
      >
        {displayName}
      </h3>
    </div>
  );
};
