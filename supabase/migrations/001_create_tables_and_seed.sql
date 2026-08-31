-- 001_create_tables_and_seed.sql
-- Migration untuk Mahessa Trans Holiday admin dashboard
-- Jalankan di Supabase SQL Editor atau via supabase CLI

-- ============================================
-- VEHICLES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS vehicles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  image_url text,
  capacity integer NOT NULL,
  transmission text NOT NULL,
  fuel_type text NOT NULL,
  price_per_day bigint NOT NULL,
  features text[],
  category text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  is_active boolean NOT NULL DEFAULT true
);

-- ============================================
-- PACKAGES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  cover_image_url text,
  destination text NOT NULL,
  duration_days integer NOT NULL,
  price bigint NOT NULL,
  includes text[],
  itinerary text,
  suitable_for text,
  vehicle_type text,
  capacity integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  is_active boolean NOT NULL DEFAULT true
);

-- ============================================
-- ARTICLES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text,
  content text,
  cover_image_url text,
  category text,
  status varchar NOT NULL DEFAULT 'draft',
  view_count integer NOT NULL DEFAULT 0,
  published_at timestamptz,
  meta_title text,
  meta_description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ============================================
-- TESTIMONIALS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text,
  quote text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  service_type text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  is_active boolean NOT NULL DEFAULT true
);

-- ============================================
-- RLS POLICIES (untuk anon read access)
-- ============================================
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read vehicles" ON vehicles FOR SELECT USING (is_active = true);
CREATE POLICY "Public read packages" ON packages FOR SELECT USING (is_active = true);
CREATE POLICY "Public read articles" ON articles FOR SELECT USING (status = 'published');
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (is_active = true);

-- Admin (authenticated) full access - using service_role key in server
-- Admin dashboard uses client-side Supabase with user session, so we need authenticated policies
CREATE POLICY "Authenticated full access vehicles" ON vehicles FOR ALL TO authenticated USING (true);
CREATE POLICY "Authenticated full access packages" ON packages FOR ALL TO authenticated USING (true);
CREATE POLICY "Authenticated full access articles" ON articles FOR ALL TO authenticated USING (true);
CREATE POLICY "Authenticated full access testimonials" ON testimonials FOR ALL TO authenticated USING (true);

-- ============================================
-- SEED DATA
-- ============================================

-- Vehicles
INSERT INTO vehicles (id, name, slug, description, capacity, transmission, fuel_type, price_per_day, features, category, is_active)
VALUES
  ('5aa15061-40ed-4b53-858d-67d097de05ec', 'Honda Brio', 'honda-brio', 'City car hemat untuk perjalanan perkotaan', 5, 'Automatic', 'Bensin', 350000, ARRAY['AC','Power Steering','Audio'], 'compact', true),
  ('c1ee22f3-73fc-4cdb-94a5-e96c410ca5f4', 'Toyota Innova Reborn', 'toyota-innova-reborn', 'MPV premium untuk perjalanan jauh', 7, 'Automatic', 'Bensin', 600000, ARRAY['AC','Power Steering','Audio','Dual AC'], 'mpv', true),
  ('fcd6d980-2cdb-4d61-b878-94478712fd0d', 'Toyota Hiace', 'toyota-hiace', 'Van besar untuk rombongan 15 orang', 15, 'Automatic', 'Bensin', 1200000, ARRAY['AC','Power Steering','Large Capacity'], 'van', true),
  ('fd0589c5-1f9f-40fb-b5e0-fd18abc6cfef', 'Toyota Avanza', 'toyota-avanza', 'MPV ekonomis untuk keluarga', 7, 'Automatic', 'Bensin', 450000, ARRAY['AC','Power Steering','Audio','Reclining Seats'], 'mpv', true)
ON CONFLICT (slug) DO NOTHING;

-- Packages
INSERT INTO packages (id, name, slug, destination, duration_days, price, includes, vehicle_type, capacity, is_active)
VALUES
  ('4d5f4dc2-8ece-43dd-b7b0-0f4e53f5caac', 'Garut 2 Hari', 'garut-2-hari', 'Garut', 2, 2500000, ARRAY['Driver','BBM','Tol','Parkir','Akomodasi'], 'hiace', 7, true),
  ('b72ecb59-1cba-46eb-8b84-8deccc8a822c', 'Bandung 1 Hari', 'bandung-1-hari', 'Bandung', 1, 1300000, ARRAY['Driver','BBM','Tol','Parkir'], 'hiace', 7, true),
  ('c4f7338b-c92b-40c8-ad0d-42da3d69ae95', 'Jakarta 3 Hari', 'jakarta-3-hari', 'Jakarta', 3, 4500000, ARRAY['Driver','BBM','Tol','Parkir','Akomodasi'], 'hiace', 7, true)
ON CONFLICT (slug) DO NOTHING;

-- Testimonials
INSERT INTO testimonials (id, name, role, quote, rating, service_type, is_active)
VALUES
  ('3c4eafb3-b69b-4303-87c0-837c7d3a9c38', 'Budi Santoso', 'Project Manager, PT Teknologi', 'Perjalanan dinas jadi lebih santai. Mobil bersih, driver sabar, bisa chat admin kapan perlu.', 5, 'rental', true),
  ('82abed77-86f6-4395-8f8c-5bad1402ceee', 'Ahmad Wijaya', 'Ketua Komunitas', 'Gathering komunitas 50 orang jadi sukses. Mahessa siapkan 3 unit tanpa stress.', 5, 'charter', true),
  ('b0dcdb6b-24c0-4979-a2ec-ab8d507974fb', 'Siti Nurhaliza', 'Kepala Keluarga', 'Family gathering kami jadi fun. Hiace spacious, AC dingin, driver friendly.', 5, 'package', true)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- GRANT anon read (public site)
-- ============================================
GRANT SELECT ON vehicles, packages, articles, testimonials TO anon;