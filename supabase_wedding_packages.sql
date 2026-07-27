-- ============================================
-- KOLOM PAKET & MASA AKTIF UNDANGAN
-- Jalankan SQL ini di Supabase SQL Editor
-- ============================================

ALTER TABLE weddings
  ADD COLUMN IF NOT EXISTS package_name TEXT,
  ADD COLUMN IF NOT EXISTS package_duration_days INTEGER DEFAULT 30,
  ADD COLUMN IF NOT EXISTS active_until TIMESTAMPTZ;

-- Opsional: isi default untuk data lama yang sudah lunas tapi belum punya paket
UPDATE weddings
SET
  package_name = COALESCE(package_name, 'Aktif 1 Bulan'),
  package_duration_days = COALESCE(package_duration_days, 30)
WHERE package_name IS NULL OR package_duration_days IS NULL;
