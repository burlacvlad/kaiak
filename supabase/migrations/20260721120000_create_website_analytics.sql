create extension if not exists pgcrypto;

create table if not exists public.website_page_views (
  id uuid primary key default gen_random_uuid(),
  viewed_at timestamptz not null default now(),
  visitor_hash text not null check (char_length(visitor_hash) = 64),
  path text not null check (char_length(path) between 1 and 500),
  page_title text,
  referrer_host text,
  site_host text,
  country_code text,
  region text,
  city text,
  geo_timezone text,
  client_timezone text,
  language text,
  browser text not null default 'Necunoscut',
  browser_version text,
  os text not null default 'Necunoscut',
  device_type text not null default 'unknown'
    check (device_type in ('desktop', 'mobile', 'tablet', 'bot', 'unknown')),
  device_model text,
  screen_width integer check (screen_width between 0 and 20000),
  screen_height integer check (screen_height between 0 and 20000),
  viewport_width integer check (viewport_width between 0 and 20000),
  viewport_height integer check (viewport_height between 0 and 20000),
  utm_source text,
  utm_medium text,
  utm_campaign text,
  is_bot boolean not null default false,
  environment text not null default 'production'
);

alter table public.website_page_views enable row level security;

revoke all on table public.website_page_views from anon, authenticated;
grant select, insert, update, delete on table public.website_page_views to service_role;

create index if not exists website_page_views_viewed_at_idx
  on public.website_page_views (viewed_at desc);

create index if not exists website_page_views_visitor_idx
  on public.website_page_views (visitor_hash, viewed_at desc);

create index if not exists website_page_views_path_idx
  on public.website_page_views (path, viewed_at desc);

create index if not exists website_page_views_country_idx
  on public.website_page_views (country_code, viewed_at desc);

create or replace view public.website_analytics_daily
with (security_invoker = true)
as
select
  (viewed_at at time zone 'Europe/Chisinau')::date as visit_date,
  count(*) as page_views,
  count(distinct visitor_hash) as unique_visitors,
  count(*) filter (where device_type = 'mobile') as mobile_views,
  count(*) filter (where device_type = 'tablet') as tablet_views,
  count(*) filter (where device_type = 'desktop') as desktop_views,
  count(distinct country_code) filter (where country_code is not null) as countries,
  round(
    count(*)::numeric / nullif(count(distinct visitor_hash), 0),
    2
  ) as pages_per_visitor
from public.website_page_views
where is_bot = false
  and environment = 'production'
group by (viewed_at at time zone 'Europe/Chisinau')::date;

revoke all on table public.website_analytics_daily from anon, authenticated;
grant select on table public.website_analytics_daily to service_role;

comment on table public.website_page_views is
  'Statistici first-party pentru accesările website-ului; IP-ul real nu este stocat.';

comment on column public.website_page_views.visitor_hash is
  'Hash anonim care se schimbă zilnic și permite calcularea vizitatorilor unici pe zi.';

comment on view public.website_analytics_daily is
  'Sumar zilnic pentru producție, în fusul orar Europe/Chisinau, fără trafic bot.';
