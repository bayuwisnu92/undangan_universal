import React from 'react';

interface GoogleMapsProps {
  iframeUrl: string;
  mapsUrl: string;
  buttonClassName?: string;
  previewClassName?: string;
}

export const GoogleMaps: React.FC<GoogleMapsProps> = ({
  iframeUrl,
  mapsUrl,
  buttonClassName = "btn-maps",
  previewClassName = "maps-preview"
}) => {
  return (
    <div className="google-maps-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
      <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className={buttonClassName}>
        <i className="fa-solid fa-map-location-dot"></i>&nbsp; Lihat Lokasi di Maps
      </a>
      <div className={previewClassName} style={{ width: '100%' }}>
        <iframe
          src={iframeUrl}
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Wedding Venue Map"
        ></iframe>
      </div>
    </div>
  );
};
