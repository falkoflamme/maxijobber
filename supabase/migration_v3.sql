-- Migration v3: Extended profile fields for curated platform
-- Run this in Supabase Dashboard → SQL Editor

ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS vorname text,
  ADD COLUMN IF NOT EXISTS nachname text,
  ADD COLUMN IF NOT EXISTS display_name text,
  ADD COLUMN IF NOT EXISTS berufsbereich text,
  ADD COLUMN IF NOT EXISTS ausbildung text,
  ADD COLUMN IF NOT EXISTS ausbildungsberuf text,
  ADD COLUMN IF NOT EXISTS erfahrung_stufe text,
  ADD COLUMN IF NOT EXISTS warum_tags text[],
  ADD COLUMN IF NOT EXISTS warum_freitext text,
  ADD COLUMN IF NOT EXISTS beschaeftigungsmodell text[],
  ADD COLUMN IF NOT EXISTS verfuegbar_ab text,
  ADD COLUMN IF NOT EXISTS wochentage text[],
  ADD COLUMN IF NOT EXISTS tageszeiten text[],
  ADD COLUMN IF NOT EXISTS einsatzdauer text,
  ADD COLUMN IF NOT EXISTS mobil_einsetzbar boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS consent_data boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS consent_profile boolean DEFAULT false;

-- display_name backfill for existing profiles
UPDATE profiles SET display_name = full_name WHERE display_name IS NULL;

-- RLS: phone, whatsapp, email only visible to service role (not public)
-- Public read policy already exists — we tighten it by excluding contact fields
-- via the select in profis/page.tsx and profil/[id]/page.tsx (handled in code)
