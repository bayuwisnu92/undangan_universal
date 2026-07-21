-- ============================================
-- TABEL UCAPAN / GUEST BOOK
-- Jalankan SQL ini di Supabase SQL Editor
-- ============================================

-- Hapus tabel lama jika ada
DROP TABLE IF EXISTS ucapan;

-- Buat tabel ucapan dengan wedding_id bertipe UUID (cocok dengan weddings.id)
CREATE TABLE ucapan (
  id BIGSERIAL PRIMARY KEY,
  nama TEXT NOT NULL,
  pesan TEXT NOT NULL,
  wedding_id UUID REFERENCES weddings(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Aktifkan Row Level Security
ALTER TABLE ucapan ENABLE ROW LEVEL SECURITY;

-- Policy: Semua orang bisa membaca ucapan
CREATE POLICY "Allow public read ucapan"
  ON ucapan FOR SELECT
  USING (true);

-- Policy: Semua orang bisa mengirim ucapan baru
CREATE POLICY "Allow public insert ucapan"
  ON ucapan FOR INSERT
  WITH CHECK (true);

-- Aktifkan Realtime untuk tabel ucapan
ALTER PUBLICATION supabase_realtime ADD TABLE ucapan;
