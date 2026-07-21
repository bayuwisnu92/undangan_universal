import React, { useEffect, useRef, useState } from 'react';

interface MusicPlayerProps {
  musicUrl: string;
  themeClass?: string;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ musicUrl, themeClass = "" }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(musicUrl);
    audio.loop = true;
    audioRef.current = audio;

    // Auto-play on first click anywhere on screen
    const handleFirstClick = () => {
      audio.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((e) => console.log("Auto-play blocked:", e));
      window.removeEventListener('click', handleFirstClick);
    };

    window.addEventListener('click', handleFirstClick);

    return () => {
      window.removeEventListener('click', handleFirstClick);
      audio.pause();
      audioRef.current = null;
    };
  }, [musicUrl]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((e) => console.error("Play failed:", e));
      setIsPlaying(true);
    }
  };

  return (
    <div id="music-player" className={themeClass}>
      <button 
        id="music-btn" 
        onClick={togglePlay} 
        className={isPlaying ? "playing" : ""} 
        title="Putar/Pause Musik"
      >
        <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-music'}`} id="music-icon"></i>
        <span className="music-ripple"></span>
      </button>
    </div>
  );
};
