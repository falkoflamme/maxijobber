-- MaxiJobber Database Schema
-- Run this in the Supabase SQL editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- =====================
-- PROFILES
-- =====================
create table if not exists profiles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null unique,
  type text check (type in ('worker', 'company')) not null,
  full_name text not null,
  city text not null default 'Frankfurt',
  phone text,
  whatsapp text,
  bio text,
  cv_url text,
  skills text[] default '{}',
  skill_level text check (skill_level in ('junior', 'mid', 'senior', 'expert')),
  roles text[] default '{}',
  hourly_rate integer,
  available boolean default true,
  verified boolean default false,
  onboarding_complete boolean default false,
  created_at timestamptz default now()
);

-- =====================
-- JOB REQUESTS
-- =====================
create table if not exists job_requests (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references profiles(id) on delete cascade not null,
  title text not null,
  raw_input text,
  role text,
  skill_level text check (skill_level in ('junior', 'mid', 'senior', 'expert')),
  skills_needed text[] default '{}',
  location text default 'Frankfurt',
  date_needed date,
  hours integer,
  rate_offered integer,
  status text check (status in ('open', 'matched', 'closed')) default 'open',
  created_at timestamptz default now()
);

-- =====================
-- MATCHES
-- =====================
create table if not exists matches (
  id uuid primary key default uuid_generate_v4(),
  job_request_id uuid references job_requests(id) on delete cascade not null,
  worker_id uuid references profiles(id) on delete cascade not null,
  score integer check (score >= 0 and score <= 100),
  status text check (status in ('suggested', 'contacted', 'confirmed')) default 'suggested',
  reasons text[] default '{}',
  created_at timestamptz default now(),
  unique(job_request_id, worker_id)
);

-- =====================
-- ROW LEVEL SECURITY
-- =====================

alter table profiles enable row level security;
alter table job_requests enable row level security;
alter table matches enable row level security;

-- Profiles: own data
create policy "Users can view own profile"
  on profiles for select
  using (auth.uid() = user_id);

create policy "Users can insert own profile"
  on profiles for insert
  with check (auth.uid() = user_id);

create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = user_id);

-- Companies can see all verified worker profiles
create policy "Companies can view verified workers"
  on profiles for select
  using (
    verified = true
    and type = 'worker'
  );

-- Job requests: company sees own, workers see open ones
create policy "Companies can manage own job requests"
  on job_requests for all
  using (
    company_id in (
      select id from profiles where user_id = auth.uid()
    )
  );

create policy "Workers can view open job requests"
  on job_requests for select
  using (status = 'open');

-- Matches: visible to relevant company and worker
create policy "Companies can view own matches"
  on matches for select
  using (
    job_request_id in (
      select id from job_requests where company_id in (
        select id from profiles where user_id = auth.uid()
      )
    )
  );

create policy "Workers can view own matches"
  on matches for select
  using (
    worker_id in (
      select id from profiles where user_id = auth.uid()
    )
  );

-- Service role can do everything (for AI matching via API)
create policy "Service role full access profiles"
  on profiles for all
  using (auth.role() = 'service_role');

create policy "Service role full access jobs"
  on job_requests for all
  using (auth.role() = 'service_role');

create policy "Service role full access matches"
  on matches for all
  using (auth.role() = 'service_role');

-- =====================
-- STORAGE
-- =====================
insert into storage.buckets (id, name, public) values ('cvs', 'cvs', false) on conflict do nothing;

create policy "Users can upload own CV"
  on storage.objects for insert
  with check (bucket_id = 'cvs' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Users can view own CV"
  on storage.objects for select
  using (bucket_id = 'cvs' and auth.uid()::text = (storage.foldername(name))[1]);
