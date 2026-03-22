-- migration_v4: contacts table + edit_token for profiles
-- Run in Supabase SQL Editor

-- 1. contacts table — stores every employer inquiry
CREATE TABLE IF NOT EXISTS contacts (
  id                   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Employer identity
  firma                text,
  ansprechpartner      text NOT NULL,
  email                text NOT NULL,
  -- Internal search need
  berufsbereich        text,
  beschaeftigungsmodell text[],
  nachricht            text,
  -- Link to profile contacted
  profile_id           uuid REFERENCES profiles(id) ON DELETE SET NULL,
  -- Meta
  created_at           timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS contacts_email_idx      ON contacts(email);
CREATE INDEX IF NOT EXISTS contacts_profile_id_idx ON contacts(profile_id);
CREATE INDEX IF NOT EXISTS contacts_created_at_idx ON contacts(created_at DESC);

-- 2. edit_token — lets profile owners self-edit via secret link
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS edit_token uuid DEFAULT gen_random_uuid();

-- Backfill existing profiles that have null edit_token
UPDATE profiles SET edit_token = gen_random_uuid() WHERE edit_token IS NULL;
