-- 009_fix_activity_triggers.sql
-- Fix broken activity log triggers
-- Run in Supabase SQL Editor

-- ============================================
-- FIX 1: Gallery trigger references NEW.title (broken)
-- gallery_items has 'caption', not 'title'
-- ============================================
DROP TRIGGER IF EXISTS trg_gallery_insert ON gallery_items;
DROP TRIGGER IF EXISTS trg_gallery_update ON gallery_items;
DROP TRIGGER IF EXISTS trg_gallery_delete ON gallery_items;
DROP FUNCTION IF EXISTS trg_gallery_log();

CREATE OR REPLACE FUNCTION trg_gallery_log() RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    PERFORM fn_log_activity('create', 'gallery', NEW.id::text,
      'Upload galeri: ' || COALESCE(left(NEW.caption, 60), NEW.id::text),
      jsonb_build_object('caption', NEW.caption, 'category', NEW.category));
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    PERFORM fn_log_activity('update', 'gallery', NEW.id::text,
      'Update galeri: ' || COALESCE(left(NEW.caption, 60), NEW.id::text),
      jsonb_build_object('caption', NEW.caption));
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    PERFORM fn_log_activity('delete', 'gallery', OLD.id::text,
      'Hapus galeri: ' || COALESCE(left(OLD.caption, 60), OLD.id::text),
      jsonb_build_object('caption', OLD.caption));
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
-- FIX 2: Vehicles UPDATE trigger has to_jsonb(NEW) - to_jsonb(OLD)
-- which fails when any column is NULL or types mismatch
-- Replace with simple metadata, no diff calculation
-- ============================================
DROP TRIGGER IF EXISTS trg_vehicles_insert ON vehicles;
DROP TRIGGER IF EXISTS trg_vehicles_update ON vehicles;
DROP TRIGGER IF EXISTS trg_vehicles_delete ON vehicles;
DROP FUNCTION IF EXISTS trg_vehicles_log();

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
      jsonb_build_object('name', NEW.name, 'category', NEW.category));
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
-- FIX 3: Same to_jsonb issue likely affects packages, articles, testimonials
-- Drop diff-based update metadata across all
-- ============================================

-- Packages
DROP TRIGGER IF EXISTS trg_packages_insert ON packages;
DROP TRIGGER IF EXISTS trg_packages_update ON packages;
DROP TRIGGER IF EXISTS trg_packages_delete ON packages;
DROP FUNCTION IF EXISTS trg_packages_log();

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
      jsonb_build_object('name', NEW.name, 'destination', NEW.destination));
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

-- Articles
DROP TRIGGER IF EXISTS trg_articles_insert ON articles;
DROP TRIGGER IF EXISTS trg_articles_update ON articles;
DROP TRIGGER IF EXISTS trg_articles_delete ON articles;
DROP FUNCTION IF EXISTS trg_articles_log();

CREATE OR REPLACE FUNCTION trg_articles_log() RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    PERFORM fn_log_activity('create', 'article', NEW.id::text,
      'Tulis artikel: ' || COALESCE(NEW.title, NEW.id::text),
      jsonb_build_object('title', NEW.title, 'status', NEW.status));
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    PERFORM fn_log_activity('update', 'article', NEW.id::text,
      'Update artikel: ' || COALESCE(NEW.title, NEW.id::text),
      jsonb_build_object('title', NEW.title, 'status', NEW.status));
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

-- Testimonials
DROP TRIGGER IF EXISTS trg_testimonials_insert ON testimonials;
DROP TRIGGER IF EXISTS trg_testimonials_update ON testimonials;
DROP TRIGGER IF EXISTS trg_testimonials_delete ON testimonials;
DROP FUNCTION IF EXISTS trg_testimonials_log();

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
      jsonb_build_object('name', NEW.name, 'rating', NEW.rating));
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

-- FAQ
DROP TRIGGER IF EXISTS trg_faq_insert ON faq_items;
DROP TRIGGER IF EXISTS trg_faq_update ON faq_items;
DROP TRIGGER IF EXISTS trg_faq_delete ON faq_items;
DROP FUNCTION IF EXISTS trg_faq_log();

CREATE OR REPLACE FUNCTION trg_faq_log() RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    PERFORM fn_log_activity('create', 'faq', NEW.id::text,
      'Tambah FAQ: ' || COALESCE(left(NEW.question, 60), NEW.id::text),
      jsonb_build_object('question', NEW.question, 'group', NEW.group_name));
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    PERFORM fn_log_activity('update', 'faq', NEW.id::text,
      'Update FAQ: ' || COALESCE(left(NEW.question, 60), NEW.id::text),
      jsonb_build_object('question', NEW.question, 'group', NEW.group_name));
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