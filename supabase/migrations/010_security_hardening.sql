-- 010_security_hardening.sql
-- Fix function search_path + revoke anon EXECUTE on trigger functions
-- Run in Supabase SQL Editor

-- ============================================
-- Set search_path to public on all trigger functions
-- (prevents search_path hijacking)
-- ============================================
ALTER FUNCTION public.fn_log_activity(p_action text, p_entity_type text, p_entity_id text, p_description text, p_metadata jsonb) SET search_path = public;
ALTER FUNCTION public.trg_vehicles_log() SET search_path = public;
ALTER FUNCTION public.trg_packages_log() SET search_path = public;
ALTER FUNCTION public.trg_articles_log() SET search_path = public;
ALTER FUNCTION public.trg_testimonials_log() SET search_path = public;
ALTER FUNCTION public.trg_faq_log() SET search_path = public;
ALTER FUNCTION public.trg_gallery_log() SET search_path = public;

-- ============================================
-- Trigger functions should not be callable via RPC.
-- They run as triggers only. Revoke anon+authenticated EXECUTE.
-- ============================================
REVOKE EXECUTE ON FUNCTION public.trg_vehicles_log() FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.trg_packages_log() FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.trg_articles_log() FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.trg_testimonials_log() FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.trg_faq_log() FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.trg_gallery_log() FROM anon, authenticated;

-- fn_log_activity IS called by trigger fns, not directly by clients
REVOKE EXECUTE ON FUNCTION public.fn_log_activity(text, text, text, text, jsonb) FROM anon, authenticated;