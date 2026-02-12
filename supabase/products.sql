-- 1) Table
create extension if not exists pgcrypto;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  tag text not null,
  description text not null,
  image text not null,
  created_at timestamptz not null default now()
);

-- 2) Indexes
create index if not exists products_created_at_idx on public.products (created_at desc);
create index if not exists products_tag_idx on public.products (tag);

-- 3) RLS
alter table public.products enable row level security;

drop policy if exists "products_select_public" on public.products;
drop policy if exists "products_write_public" on public.products;

-- NOTE:
-- This policy is open for quick setup (anon can write).
-- Use service-role key + stricter policies for production.
create policy "products_select_public"
on public.products
for select
to anon, authenticated
using (true);

create policy "products_write_public"
on public.products
for all
to anon, authenticated
using (true)
with check (true);

-- 4) Social channels
create table if not exists public.social_channels (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  url text not null,
  icon text not null,
  order_index int not null default 1,
  created_at timestamptz not null default now()
);

create index if not exists social_channels_order_idx on public.social_channels (order_index);

alter table public.social_channels enable row level security;

drop policy if exists "social_channels_select_public" on public.social_channels;
drop policy if exists "social_channels_write_public" on public.social_channels;

create policy "social_channels_select_public"
on public.social_channels
for select
to anon, authenticated
using (true);

create policy "social_channels_write_public"
on public.social_channels
for all
to anon, authenticated
using (true)
with check (true);
