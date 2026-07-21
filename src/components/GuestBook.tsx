import React, { useState } from 'react';
import { useGuestBook } from '../hooks/useGuestBook';

interface GuestBookProps {
  weddingId: string;
  formClassName?: string;
  inputClassName?: string;
  buttonClassName?: string;
  listClassName?: string;
  itemClassName?: string;
}

export const GuestBook: React.FC<GuestBookProps> = ({
  weddingId,
  formClassName = "doa-form-wrap",
  inputClassName = "doa-input",
  buttonClassName = "btn-kirim",
  listClassName = "ucapan-list",
  itemClassName = "ucapan-item"
}) => {
  const { wishes, loading, submitting, submitWish } = useGuestBook(weddingId);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      alert('Mohon isi nama dan ucapan Anda terlebih dahulu.');
      return;
    }
    const success = await submitWish(name, message);
    if (success) {
      setName('');
      setMessage('');
    }
  };

  return (
    <div className="guestbook-container">
      <form onSubmit={handleSubmit} className={formClassName}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClassName}
          placeholder="Nama Anda..."
          disabled={submitting}
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputClassName} doa-textarea`}
          rows={4}
          placeholder="Tuliskan ucapan dan doa terbaik Anda..."
          disabled={submitting}
        />
        <button type="submit" className={buttonClassName} disabled={submitting}>
          {submitting ? (
            <span>Mengirim...</span>
          ) : (
            <>
              <i className="fa-solid fa-paper-plane"></i> Kirim Ucapan
            </>
          )}
        </button>
      </form>

      <div className={listClassName} id="ucapan-list">
        {loading ? (
          <p style={{ textAlign: 'center', opacity: 0.7 }}>Memuat ucapan...</p>
        ) : wishes.length === 0 ? (
          <p style={{ textAlign: 'center', opacity: 0.7 }}>Belum ada ucapan. Jadilah yang pertama!</p>
        ) : (
          wishes.map((item) => (
            <div key={item.id} className={itemClassName}>
              <strong>{item.nama}</strong>
              <p>{item.pesan}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
