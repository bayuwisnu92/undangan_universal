// =============================================
// UNDANGAN NIKAH - LULU & BAYU
// JavaScript Logic
// =============================================

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(error => {
      console.warn('Service worker registration failed:', error);
    });
  });
}

// ---- COUNTDOWN ----

const SUPABASE_URL = "https://isyaszjtcwumddjrmpfd.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzeWFzemp0Y3d1bWRkanJtcGZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExOTAzNjcsImV4cCI6MjA5Njc2NjM2N30.9hAMeOnrMJddS2WwRF1JWou0-7oPGfkqgINa7ydzmkM";

const supaclient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);
const eventDate = new Date("2026-08-16T08:00:00+07:00").getTime();

function updateCountdown() {
  const now  = new Date().getTime();
  const dist = eventDate - now;

  if (dist <= 0) {
    document.getElementById('countdown-box').innerHTML =
      '<h5 style="color:var(--gold-light);font-family:var(--font-serif);font-size:1.5rem;">🎉 Acara Telah Dimulai! 🎉</h5>';
    return;
  }

  const d  = Math.floor(dist / (1000 * 60 * 60 * 24));
  const h  = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m  = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
  const s  = Math.floor((dist % (1000 * 60)) / 1000);

  document.getElementById("days").innerText    = String(d).padStart(2, '0');
  document.getElementById("hours").innerText   = String(h).padStart(2, '0');
  document.getElementById("minutes").innerText = String(m).padStart(2, '0');
  document.getElementById("seconds").innerText = String(s).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// ---- MUSIC PLAYER ----
let musicPlaying = false;
const audio     = document.getElementById('wedding-music');
const musicBtn  = document.getElementById('music-btn');
const musicIcon = document.getElementById('music-icon');

function toggleMusic() {
  if (musicPlaying) {
    audio.pause();
    musicBtn.classList.remove('playing');
    musicIcon.className = 'fa-solid fa-music';
    musicPlaying = false;
  } else {
    audio.play().catch(() => {});
    musicBtn.classList.add('playing');
    musicIcon.className = 'fa-solid fa-pause';
    musicPlaying = true;
  }
}

// Auto-play on first user interaction
document.addEventListener('click', function startMusic() {
  if (!musicPlaying) {
    audio.play().then(() => {
      musicBtn.classList.add('playing');
      musicIcon.className = 'fa-solid fa-pause';
      musicPlaying = true;
    }).catch(() => {});
  }
  document.removeEventListener('click', startMusic);
}, { once: true });

// ---- SMOOTH SCROLL ----
document.querySelector('.btn-open-invitation')?.addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('undangan')?.scrollIntoView({ behavior: 'smooth' });
});

// ---- UCAPAN / DOA ----


const ucapanData = [];

async function kirimUcapan() {
  const nama = document.getElementById('ucapan-nama').value.trim();
  const pesan = document.getElementById('ucapan-pesan').value.trim();

  if (!nama || !pesan) {
    alert('Mohon isi nama dan ucapan Anda terlebih dahulu.');
    return;
  }

  const { error } = await supaclient
    .from('ucapan')
    .insert([
      {
        nama: nama,
        pesan: pesan
      }
    ]);

  if (error) {
    console.error(error);
    alert('Gagal mengirim ucapan');
    return;
  }

  document.getElementById('ucapan-nama').value = '';
  document.getElementById('ucapan-pesan').value = '';

  loadUcapan();
}



async function loadUcapan() {

  const { data, error } = await supaclient
    .from('ucapan')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  const list = document.getElementById('ucapan-list');

  list.innerHTML = data.map(item => `
    <div class="ucapan-item">
      <strong>${escapeHtml(item.nama)}</strong>
      <p>${escapeHtml(item.pesan)}</p>
    </div>
  `).join('');
}

supaclient
  .channel('ucapan-channel')
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'ucapan'
    },
    () => {
      loadUcapan();
    }
  )
  .subscribe();

document.addEventListener('DOMContentLoaded', () => {
  loadUcapan();
});

function renderUcapan() {
  const list = document.getElementById('ucapan-list');
  list.innerHTML = ucapanData.map(u => `
    <div class="ucapan-item">
      <strong>${escapeHtml(u.nama)}</strong>
      <p>${escapeHtml(u.pesan)}</p>
    </div>
  `).join('');
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ---- INTERSECTION OBSERVER for reveal animations ----
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.ayat-box, .hadits-box, .mempelai-card, .acara-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  observer.observe(el);
});
