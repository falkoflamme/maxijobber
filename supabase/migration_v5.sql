-- migration_v5: company_profiles + job_requests for employer accounts
-- Run in Supabase SQL Editor

-- 1. Company profiles (linked to Supabase auth users)
CREATE TABLE IF NOT EXISTS company_profiles (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  firma           text NOT NULL,
  ansprechpartner text NOT NULL,
  branche         text,
  city            text DEFAULT 'Frankfurt',
  website         text,
  created_at      timestamptz DEFAULT now()
);

-- RLS
ALTER TABLE company_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Company sees own profile" ON company_profiles FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Service role full access company_profiles" ON company_profiles FOR ALL USING (auth.role() = 'service_role');

-- 2. Job requests (internal search needs — not public)
CREATE TABLE IF NOT EXISTS job_requests (
  id                    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id            uuid REFERENCES company_profiles(id) ON DELETE CASCADE NOT NULL,
  berufsbereich         text,
  rolle                 text,
  beschaeftigungsmodell text[],
  city                  text DEFAULT 'Frankfurt',
  startdatum            date,
  stundenlohn_max       integer,
  einsatzdauer          text,
  wochentage            text[],
  tageszeiten           text[],
  beschreibung          text,
  status                text CHECK (status IN ('open', 'closed')) DEFAULT 'open',
  created_at            timestamptz DEFAULT now()
);

ALTER TABLE job_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Company sees own job requests" ON job_requests FOR ALL USING (
  company_id IN (SELECT id FROM company_profiles WHERE user_id = auth.uid())
);
CREATE POLICY "Service role full access job_requests" ON job_requests FOR ALL USING (auth.role() = 'service_role');

-- 3. Link contacts to company_profiles (optional — when logged-in company sends request)
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS company_profile_id uuid REFERENCES company_profiles(id) ON DELETE SET NULL;
