-- MaxiJobber MVP v2 — Radikal vereinfacht
-- Run this in the Supabase SQL Editor

create extension if not exists "uuid-ossp";

-- =====================
-- PROFILES (einzige Tabelle die zählt)
-- =====================
create table if not exists profiles (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid references auth.users(id) on delete set null,
  full_name   text not null,
  role        text not null,
  city        text not null default 'Frankfurt',
  bio         text,
  skills      text[] default '{}',
  hourly_rate integer check (hourly_rate >= 25),
  phone       text,
  whatsapp    text,
  email       text,
  photo_url   text,
  available   boolean default true,
  verified    boolean default false,
  status      text default 'pending'
              check (status in ('pending', 'approved', 'rejected')),
  created_at  timestamptz default now()
);

-- =====================
-- RLS
-- =====================
alter table profiles enable row level security;

-- Jeder kann genehmigte Profile lesen
create policy "Public can read approved profiles"
  on profiles for select
  using (verified = true and status = 'approved');

-- Service Role kann alles (für API-Routes)
create policy "Service role full access"
  on profiles for all
  using (auth.role() = 'service_role');

-- Owner kann eigenes Profil lesen (auch pending)
create policy "Owner can read own profile"
  on profiles for select
  using (auth.uid() = user_id);

-- =====================
-- STORAGE — Profilfotos
-- =====================
insert into storage.buckets (id, name, public)
  values ('photos', 'photos', true)
  on conflict do nothing;

create policy "Public can view photos"
  on storage.objects for select
  using (bucket_id = 'photos');

create policy "Service role can upload photos"
  on storage.objects for insert
  using (auth.role() = 'service_role');
