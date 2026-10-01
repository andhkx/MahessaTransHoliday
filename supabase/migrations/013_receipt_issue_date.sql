-- 013_receipt_issue_date.sql
-- Tanggal kwitansi (tanggal dokumen, terpisah dari created_at)
-- Run in Supabase SQL Editor

ALTER TABLE public.receipts
  ADD COLUMN IF NOT EXISTS issue_date date;
