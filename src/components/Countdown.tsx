import React from 'react';
import { useCountdown } from '../hooks/useCountdown';

interface CountdownProps {
  targetDate: string;
  className?: string;
  itemClassName?: string;
  numberClassName?: string;
  labelClassName?: string;
  separatorClassName?: string;
}

export const Countdown: React.FC<CountdownProps> = ({
  targetDate,
  className = "countdown",
  itemClassName = "time-box",
  numberClassName = "time",
  labelClassName = "",
  separatorClassName = "time-sep"
}) => {
  const { days, hours, minutes, seconds, isCompleted } = useCountdown(targetDate);

  if (isCompleted) {
    return (
      <div className={className}>
        <h5 style={{ color: 'var(--gold-light)', fontFamily: 'var(--font-serif)', fontSize: '1.5rem', textAlign: 'center' }}>
          🎉 Acara Telah Dimulai! 🎉
        </h5>
      </div>
    );
  }

  return (
    <div className={className} id="countdown-box">
      <div className={itemClassName}>
        <span className={numberClassName}>{days}</span>
        <small className={labelClassName}>Hari</small>
      </div>
      <div className={separatorClassName}>:</div>
      <div className={itemClassName}>
        <span className={numberClassName}>{hours}</span>
        <small className={labelClassName}>Jam</small>
      </div>
      <div className={separatorClassName}>:</div>
      <div className={itemClassName}>
        <span className={numberClassName}>{minutes}</span>
        <small className={labelClassName}>Menit</small>
      </div>
      <div className={separatorClassName}>:</div>
      <div className={itemClassName}>
        <span className={numberClassName}>{seconds}</span>
        <small className={labelClassName}>Detik</small>
      </div>
    </div>
  );
};
