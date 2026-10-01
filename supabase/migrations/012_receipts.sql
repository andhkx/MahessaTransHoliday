-- 012_receipts.sql
-- Kwitansi (rental mobil tanpa driver) + nomor dokumen atomik
-- Run in Supabase SQL Editor

-- ============================================
-- TABEL: receipts
-- ============================================
CREATE TABLE IF NOT EXISTS public.receipts (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  receipt_number    text NOT NULL UNIQUE,
  customer_name     text NOT NULL,
  service_type      text NOT NULL DEFAULT 'self_drive',
  vehicle_name      text,
  start_date        date,
  end_date          date,
  start_time        text,
  end_time          text,
  pickup_location   text,
  destination       text,
  duration_days     int  NOT NULL DEFAULT 1,
  price_per_day     int  NOT NULL DEFAULT 0,
  total_amount      int  NOT NULL DEFAULT 0,
  down_payment      int  NOT NULL DEFAULT 0,
  remaining_amount  int  NOT NULL DEFAULT 0,
  payment_status    text NOT NULL DEFAULT 'unpaid',
  note              text,
  bank_name         text,
  bank_account      text,
  bank_holder       text,
  created_by        text,
  created_at        timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT receipts_duration_positive CHECK (duration_days > 0),
  CONSTRAINT receipts_amount_non_negative CHECK (
    price_per_day >= 0 AND total_amount >= 0
    AND down_payment >= 0 AND remaining_amount >= 0
  ),
  CONSTRAINT receipts_status_valid CHECK (
    payment_status IN ('unpaid', 'partial', 'paid')
  )
);

CREATE INDEX IF NOT EXISTS receipts_created_at_idx
  ON public.receipts (created_at DESC);
CREATE INDEX IF NOT EXISTS receipts_payment_status_idx
  ON public.receipts (payment_status);

-- ============================================
-- COUNTER: nomor dokumen berurutan per tahun
-- Prefix + tahun disimpan sebagai key, jadi 2027 mulai lagi dari 0001
-- ============================================
CREATE TABLE IF NOT EXISTS public.document_counters (
  prefix      text PRIMARY KEY,
  last_number int  NOT NULL DEFAULT 0
);

-- Nomor Format: KWT-2026-0001
-- UPSERT ... RETURNING membuat increment bersifat atomik sehingga
-- dua admin yang klik bersamaan tetap mendapat nomor berbeda.
CREATE OR REPLACE FUNCTION public.next_document_number(p_prefix text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_key  text;
  v_next int;
BEGIN
  IF p_prefix IS NULL OR btrim(p_prefix) = '' THEN
    RAISE EXCEPTION 'prefix wajib diisi';
  END IF;

  v_key := upper(btrim(p_prefix)) || '-' || to_char(now(), 'YYYY');

  INSERT INTO public.document_counters AS c (prefix, last_number)
  VALUES (v_key, 1)
  ON CONFLICT (prefix) DO UPDATE
    SET last_number = c.last_number + 1
  RETURNING last_number INTO v_next;

  RETURN v_key || '-' || lpad(v_next::text, 4, '0');
END;
$$;

REVOKE ALL ON FUNCTION public.next_document_number(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.next_document_number(text) TO authenticated;

-- ============================================
-- RLS
-- Kwitansi berisi data pelanggan (PII) jadi BUKAN public read.
-- Hanya admin yang sudah login (= authenticated) boleh akses.
-- ============================================
ALTER TABLE public.receipts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_counters ENABLE ROW LEVEL SECURITY;

-- admin full access ke receipts
DROP POLICY IF EXISTS receipts_select ON public.receipts;
CREATE POLICY receipts_select ON public.receipts
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS receipts_insert ON public.receipts;
CREATE POLICY receipts_insert ON public.receipts
  FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS receipts_update ON public.receipts;
CREATE POLICY receipts_update ON public.receipts
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS receipts_delete ON public.receipts;
CREATE POLICY receipts_delete ON public.receipts
  FOR DELETE TO authenticated USING (true);

-- counter hanya dibaca lewat function SECURITY DEFINER,
-- tidak ada policy langsung untuk anon/authenticated
DROP POLICY IF EXISTS document_counters_select ON public.document_counters;
CREATE POLICY document_counters_select ON public.document_counters
  FOR SELECT TO authenticated USING (true);

-- ============================================
-- ACTIVITY LOG TRIGGER
-- Self-contained: menulis langsung ke activity_logs dan aman
-- (no-op) kalau migration 008 belum dijalankan, sehingga
-- insert kwitansi tidak pernah gagal gara-gara log.
-- ============================================
CREATE OR REPLACE FUNCTION public.trg_receipts_log() RETURNS trigger AS $$
DECLARE
  v_action text;
  v_meta   jsonb;
  v_label  text;
BEGIN
  IF to_regclass('public.activity_logs') IS NULL THEN
    RETURN COALESCE(NEW, OLD);
  END IF;

  IF TG_OP = 'INSERT' THEN
    v_action := 'create';
    v_label  := 'Buat kwitansi ' || NEW.receipt_number || ' untuk ' || left(NEW.customer_name, 40);
    v_meta   := jsonb_build_object('receipt_number', NEW.receipt_number, 'customer', NEW.customer_name, 'total', NEW.total_amount, 'status', NEW.payment_status);
  ELSIF TG_OP = 'UPDATE' THEN
    v_action := 'update';
    v_label  := 'Update kwitansi ' || NEW.receipt_number;
    v_meta   := jsonb_build_object('receipt_number', NEW.receipt_number, 'customer', NEW.customer_name, 'total', NEW.total_amount, 'status', NEW.payment_status);
  ELSE
    v_action := 'delete';
    v_label  := 'Hapus kwitansi ' || OLD.receipt_number;
    v_meta   := jsonb_build_object('receipt_number', OLD.receipt_number, 'customer', OLD.customer_name);
  END IF;

  INSERT INTO public.activity_logs (user_email, user_id, action, entity_type, entity_id, description, metadata)
  VALUES (
    COALESCE(auth.jwt() ->> 'email', 'system'),
    auth.uid(),
    v_action,
    'receipt',
    COALESCE(NEW.id, OLD.id)::text,
    v_label,
    v_meta
  );

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

ALTER FUNCTION public.trg_receipts_log() SET search_path = public;
REVOKE EXECUTE ON FUNCTION public.trg_receipts_log() FROM anon, authenticated;

DROP TRIGGER IF EXISTS trg_receipts_insert ON public.receipts;
DROP TRIGGER IF EXISTS trg_receipts_update ON public.receipts;
DROP TRIGGER IF EXISTS trg_receipts_delete ON public.receipts;

CREATE TRIGGER trg_receipts_insert AFTER INSERT ON public.receipts
  FOR EACH ROW EXECUTE FUNCTION public.trg_receipts_log();
CREATE TRIGGER trg_receipts_update AFTER UPDATE ON public.receipts
  FOR EACH ROW EXECUTE FUNCTION public.trg_receipts_log();
CREATE TRIGGER trg_receipts_delete AFTER DELETE ON public.receipts
  FOR EACH ROW EXECUTE FUNCTION public.trg_receipts_log();
