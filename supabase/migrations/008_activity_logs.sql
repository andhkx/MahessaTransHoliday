-- 008_activity_logs.sql
-- Activity logging: track login + CRUD on 6 entities.
-- Run in Supabase SQL Editor.

-- ============================================
-- TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS activity_logs (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email    text,
  user_id       uuid,
  action        text NOT NULL,
  entity_type   text NOT NULL,
  entity_id     text,
  description   text,
  metadata      jsonb DEFAULT '{}'::jsonb,
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at
  ON activity_logs (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_activity_logs_user_email
  ON activity_logs (user_email, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_activity_logs_entity
  ON activity_logs (entity_type, entity_id);

-- ============================================
-- RLS
-- ============================================
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "activity_logs_select" ON activity_logs;
CREATE POLICY "activity_logs_select" ON activity_logs
  FOR SELECT TO authenticated
  USING (true);

DROP POLICY IF EXISTS "activity_logs_insert" ON activity_logs;
CREATE POLICY "activity_logs_insert" ON activity_logs
  FOR INSERT TO authenticated
  WITH CHECK (true);

-- ============================================
-- HELPER
-- ============================================
CREATE OR REPLACE FUNCTION fn_log_activity(
  p_action      text,
  p_entity_type text,
  p_entity_id   text,
  p_description text,
  p_metadata    jsonb DEFAULT '{}'::jsonb
) RETURNS void AS $$
DECLARE
  v_email text;
  v_uid   uuid;
BEGIN
  v_uid := auth.uid();
  v_email := COALESCE(
    (SELECT u.email::text FROM auth.users u WHERE u.id = v_uid),
    'system'
  );
  INSERT INTO activity_logs (user_email, user_id, action, entity_type, entity_id, description, metadata)
  VALUES (v_email, v_uid, p_action, p_entity_type, p_entity_id, p_description, p_metadata);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

REVOKE ALL ON FUNCTION fn_log_activity FROM PUBLIC;
GRANT EXECUTE ON FUNCTION fn_log_activity TO authenticated;

-- ============================================
-- TRIGGERS: vehicles
-- ============================================
DROP TRIGGER IF EXISTS trg_vehicles_insert ON vehicles;
DROP TRIGGER IF EXISTS trg_vehicles_update ON vehicles;
DROP TRIGGER IF EXISTS trg_vehicles_delete ON vehicles;

CREATE OR REPLACE FUNCTION trg_vehicles_log() RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    PERFORM fn_log_activity('create', 'vehicle', NEW.id::text,
      'Tambah armada: ' || COALESCE(NEW.name, NEW.id::text),
      jsonb_build_object('name', NEW.name, 'category', NEW.category));
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    PERFORM fn_log_activity('update', 'vehicle', NEW.id::text,
      'Update armada: ' || COALESCE(NEW.name, NEW.id::text),
      jsonb_build_object('name', NEW.name,
        'changed', (to_jsonb(NEW) - to_jsonb(OLD))));
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    PERFORM fn_log_activity('delete', 'vehicle', OLD.id::text,
      'Hapus armada: ' || COALESCE(OLD.name, OLD.id::text),
      jsonb_build_object('name', OLD.name));
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_vehicles_insert AFTER INSERT ON vehicles
  FOR EACH ROW EXECUTE FUNCTION trg_vehicles_log();
CREATE TRIGGER trg_vehicles_update AFTER UPDATE ON vehicles
  FOR EACH ROW EXECUTE FUNCTION trg_vehicles_log();
CREATE TRIGGER trg_vehicles_delete AFTER DELETE ON vehicles
  FOR EACH ROW EXECUTE FUNCTION trg_vehicles_log();

-- ============================================
-- TRIGGERS: packages
-- ============================================
DROP TRIGGER IF EXISTS trg_packages_insert ON packages;
DROP TRIGGER IF EXISTS trg_packages_update ON packages;
DROP TRIGGER IF EXISTS trg_packages_delete ON packages;

CREATE OR REPLACE FUNCTION trg_packages_log() RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    PERFORM fn_log_activity('create', 'package', NEW.id::text,
      'Tambah paket: ' || COALESCE(NEW.name, NEW.id::text),
      jsonb_build_object('name', NEW.name, 'destination', NEW.destination));
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    PERFORM fn_log_activity('update', 'package', NEW.id::text,
      'Update paket: ' || COALESCE(NEW.name, NEW.id::text),
      jsonb_build_object('name', NEW.name));
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    PERFORM fn_log_activity('delete', 'package', OLD.id::text,
      'Hapus paket: ' || COALESCE(OLD.name, OLD.id::text),
      jsonb_build_object('name', OLD.name));
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_packages_insert AFTER INSERT ON packages
  FOR EACH ROW EXECUTE FUNCTION trg_packages_log();
CREATE TRIGGER trg_packages_update AFTER UPDATE ON packages
  FOR EACH ROW EXECUTE FUNCTION trg_packages_log();
CREATE TRIGGER trg_packages_delete AFTER DELETE ON packages
  FOR EACH ROW EXECUTE FUNCTION trg_packages_log();

-- ============================================
-- TRIGGERS: articles
-- ============================================
DROP TRIGGER IF EXISTS trg_articles_insert ON articles;
DROP TRIGGER IF EXISTS trg_articles_update ON articles;
DROP TRIGGER IF EXISTS trg_articles_delete ON articles;

CREATE OR REPLACE FUNCTION trg_articles_log() RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    PERFORM fn_log_activity('create', 'article', NEW.id::text,
      'Tulis artikel: ' || COALESCE(NEW.title, NEW.id::text),
      jsonb_build_object('title', NEW.title));
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    PERFORM fn_log_activity('update', 'article', NEW.id::text,
      'Update artikel: ' || COALESCE(NEW.title, NEW.id::text),
      jsonb_build_object('title', NEW.title));
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    PERFORM fn_log_activity('delete', 'article', OLD.id::text,
      'Hapus artikel: ' || COALESCE(OLD.title, OLD.id::text),
      jsonb_build_object('title', OLD.title));
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_articles_insert AFTER INSERT ON articles
  FOR EACH ROW EXECUTE FUNCTION trg_articles_log();
CREATE TRIGGER trg_articles_update AFTER UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION trg_articles_log();
CREATE TRIGGER trg_articles_delete AFTER DELETE ON articles
  FOR EACH ROW EXECUTE FUNCTION trg_articles_log();

-- ============================================
-- TRIGGERS: gallery_items
-- ============================================
DROP TRIGGER IF EXISTS trg_gallery_insert ON gallery_items;
DROP TRIGGER IF EXISTS trg_gallery_update ON gallery_items;
DROP TRIGGER IF EXISTS trg_gallery_delete ON gallery_items;

CREATE OR REPLACE FUNCTION trg_gallery_log() RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    PERFORM fn_log_activity('create', 'gallery', NEW.id::text,
      'Upload galeri: ' || COALESCE(NEW.title, NEW.id::text),
      jsonb_build_object('title', NEW.title));
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    PERFORM fn_log_activity('update', 'gallery', NEW.id::text,
      'Update galeri: ' || COALESCE(NEW.title, NEW.id::text),
      jsonb_build_object('title', NEW.title));
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    PERFORM fn_log_activity('delete', 'gallery', OLD.id::text,
      'Hapus galeri: ' || COALESCE(OLD.title, OLD.id::text),
      jsonb_build_object('title', OLD.title));
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_gallery_insert AFTER INSERT ON gallery_items
  FOR EACH ROW EXECUTE FUNCTION trg_gallery_log();
CREATE TRIGGER trg_gallery_update AFTER UPDATE ON gallery_items
  FOR EACH ROW EXECUTE FUNCTION trg_gallery_log();
CREATE TRIGGER trg_gallery_delete AFTER DELETE ON gallery_items
  FOR EACH ROW EXECUTE FUNCTION trg_gallery_log();

-- ============================================
-- TRIGGERS: testimonials
-- ============================================
DROP TRIGGER IF EXISTS trg_testimonials_insert ON testimonials;
DROP TRIGGER IF EXISTS trg_testimonials_update ON testimonials;
DROP TRIGGER IF EXISTS trg_testimonials_delete ON testimonials;

CREATE OR REPLACE FUNCTION trg_testimonials_log() RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    PERFORM fn_log_activity('create', 'testimonial', NEW.id::text,
      'Tambah testimoni: ' || COALESCE(NEW.name, NEW.id::text),
      jsonb_build_object('name', NEW.name, 'rating', NEW.rating));
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    PERFORM fn_log_activity('update', 'testimonial', NEW.id::text,
      'Update testimoni: ' || COALESCE(NEW.name, NEW.id::text),
      jsonb_build_object('name', NEW.name));
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    PERFORM fn_log_activity('delete', 'testimonial', OLD.id::text,
      'Hapus testimoni: ' || COALESCE(OLD.name, OLD.id::text),
      jsonb_build_object('name', OLD.name));
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_testimonials_insert AFTER INSERT ON testimonials
  FOR EACH ROW EXECUTE FUNCTION trg_testimonials_log();
CREATE TRIGGER trg_testimonials_update AFTER UPDATE ON testimonials
  FOR EACH ROW EXECUTE FUNCTION trg_testimonials_log();
CREATE TRIGGER trg_testimonials_delete AFTER DELETE ON testimonials
  FOR EACH ROW EXECUTE FUNCTION trg_testimonials_log();

-- ============================================
-- TRIGGERS: faq_items
-- ============================================
DROP TRIGGER IF EXISTS trg_faq_insert ON faq_items;
DROP TRIGGER IF EXISTS trg_faq_update ON faq_items;
DROP TRIGGER IF EXISTS trg_faq_delete ON faq_items;

CREATE OR REPLACE FUNCTION trg_faq_log() RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    PERFORM fn_log_activity('create', 'faq', NEW.id::text,
      'Tambah FAQ: ' || COALESCE(left(NEW.question, 60), NEW.id::text),
      jsonb_build_object('question', NEW.question));
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    PERFORM fn_log_activity('update', 'faq', NEW.id::text,
      'Update FAQ: ' || COALESCE(left(NEW.question, 60), NEW.id::text),
      jsonb_build_object('question', NEW.question));
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    PERFORM fn_log_activity('delete', 'faq', OLD.id::text,
      'Hapus FAQ: ' || COALESCE(left(OLD.question, 60), OLD.id::text),
      jsonb_build_object('question', OLD.question));
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_faq_insert AFTER INSERT ON faq_items
  FOR EACH ROW EXECUTE FUNCTION trg_faq_log();
CREATE TRIGGER trg_faq_update AFTER UPDATE ON faq_items
  FOR EACH ROW EXECUTE FUNCTION trg_faq_log();
CREATE TRIGGER trg_faq_delete AFTER DELETE ON faq_items
  FOR EACH ROW EXECUTE FUNCTION trg_faq_log();