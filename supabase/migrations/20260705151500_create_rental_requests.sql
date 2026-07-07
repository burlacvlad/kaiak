create extension if not exists pgcrypto;

create table if not exists public.rental_requests (
  id uuid primary key default gen_random_uuid(),
  rental_date date not null,
  start_time text not null check (start_time in ('07:00', '13:00', '18:00')),
  duration text not null check (duration in ('6-ore', 'multi')),
  equipment jsonb not null default '[]'::jsonb,
  customer_name text,
  customer_phone text,
  customer_email text,
  customer_note text,
  source text not null default 'website',
  status text not null default 'new',
  created_at timestamptz not null default now()
);

alter table public.rental_requests enable row level security;

create index if not exists rental_requests_created_at_idx
  on public.rental_requests (created_at desc);

create index if not exists rental_requests_status_idx
  on public.rental_requests (status);

create index if not exists rental_requests_rental_date_idx
  on public.rental_requests (rental_date);
