-- ============================================================
-- SWAY — Supabase Schema
-- Wallet-based auth, no Supabase Auth dependency
-- ============================================================

create extension if not exists "uuid-ossp";

-- ============================================================
-- CLEANUP (safe re-run)
-- ============================================================

drop table if exists public.bids                cascade;
drop table if exists public.pool_participants   cascade;
drop table if exists public.pools               cascade;
drop table if exists public.sellers             cascade;
drop table if exists public.categories          cascade;
drop table if exists public.users               cascade;

drop type if exists pool_status        cascade;
drop type if exists bid_status         cascade;
drop type if exists participant_status cascade;

-- ============================================================
-- ENUMS
-- ============================================================

create type pool_status as enum ('open', 'bidding', 'selected', 'completed', 'cancelled');
create type bid_status as enum ('pending', 'accepted', 'rejected');
create type participant_status as enum ('locked', 'refunded', 'released');

-- ============================================================
-- USERS (wallet-based, no auth dependency)
-- ============================================================

create table public.users (
  id              uuid primary key default uuid_generate_v4(),
  wallet_address  text not null unique,
  username        text unique,
  avatar_url      text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- ============================================================
-- CATEGORIES
-- ============================================================

create table public.categories (
  id          text primary key,
  label       text not null,
  description text,
  image_url   text,
  created_at  timestamptz not null default now()
);

insert into public.categories (id, label, description, image_url) values
  ('electronics', 'Electronics',  'Smartphones, laptops, TVs and more.',        'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80&auto=format&fit=crop'),
  ('gaming',      'Gaming',       'Consoles, peripherals, and accessories.',     'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80&auto=format&fit=crop'),
  ('fashion',     'Fashion',      'Sneakers, apparel, and accessories.',         'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80&auto=format&fit=crop'),
  ('home',        'Home & Living','Appliances, furniture, and smart home.',      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80&auto=format&fit=crop'),
  ('beauty',      'Beauty',       'Skincare, cosmetics, and wellness.',          'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80&auto=format&fit=crop'),
  ('sports',      'Sports',       'Equipment, apparel, and gear.',               'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80&auto=format&fit=crop'),
  ('books',       'Books',        'Textbooks, novels, and professional titles.', 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80&auto=format&fit=crop');

-- ============================================================
-- POOLS
-- ============================================================

create table public.pools (
  id                    uuid primary key default uuid_generate_v4(),
  creator_wallet        text references public.users(wallet_address) on delete set null,
  title                 text not null,
  description           text,
  category_id           text references public.categories(id),
  image_url             text,
  individual_price      numeric(12, 2) not null,
  target_price          numeric(12, 2) not null,
  min_participants      int not null default 10,
  current_participants  int not null default 0,
  status                pool_status not null default 'open',
  bidding_ends_at       timestamptz,
  expires_at            timestamptz not null default (now() + interval '7 days'),
  contract_address      text,   -- deployed smart contract address on Avalanche
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger pools_updated_at
  before update on public.pools
  for each row execute function update_updated_at();

-- ============================================================
-- POOL PARTICIPANTS
-- ============================================================

create table public.pool_participants (
  id              uuid primary key default uuid_generate_v4(),
  pool_id         uuid not null references public.pools(id) on delete cascade,
  wallet_address  text not null references public.users(wallet_address) on delete cascade,
  amount_locked   numeric(12, 2) not null,
  status          participant_status not null default 'locked',
  tx_hash         text,
  joined_at       timestamptz not null default now(),

  unique (pool_id, wallet_address)
);

create or replace function increment_pool_participants()
returns trigger as $$
begin
  update public.pools set current_participants = current_participants + 1 where id = new.pool_id;
  return new;
end;
$$ language plpgsql;

create trigger on_participant_join
  after insert on public.pool_participants
  for each row execute function increment_pool_participants();

create or replace function decrement_pool_participants()
returns trigger as $$
begin
  update public.pools set current_participants = greatest(current_participants - 1, 0) where id = old.pool_id;
  return old;
end;
$$ language plpgsql;

create trigger on_participant_leave
  after delete on public.pool_participants
  for each row execute function decrement_pool_participants();

-- ============================================================
-- SELLERS
-- ============================================================

create table public.sellers (
  id              uuid primary key default uuid_generate_v4(),
  wallet_address  text not null unique references public.users(wallet_address) on delete cascade,
  company_name    text not null,
  location        text,
  rating          numeric(3, 2) default 0,
  review_count    int default 0,
  verified        boolean not null default false,
  website_url     text,
  created_at      timestamptz not null default now()
);

-- ============================================================
-- BIDS
-- ============================================================

create table public.bids (
  id              uuid primary key default uuid_generate_v4(),
  pool_id         uuid not null references public.pools(id) on delete cascade,
  seller_id       uuid not null references public.sellers(id) on delete cascade,
  price           numeric(12, 2) not null,
  delivery_days   int not null,
  warranty        text,
  notes           text,
  status          bid_status not null default 'pending',
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),

  unique (pool_id, seller_id)
);

create trigger bids_updated_at
  before update on public.bids
  for each row execute function update_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table public.users             enable row level security;
alter table public.categories        enable row level security;
alter table public.pools             enable row level security;
alter table public.pool_participants enable row level security;
alter table public.sellers           enable row level security;
alter table public.bids              enable row level security;

-- Public read policies
create policy "categories_public_read"   on public.categories        for select using (true);
create policy "pools_public_read"        on public.pools             for select using (true);
create policy "participants_public_read" on public.pool_participants  for select using (true);
create policy "sellers_public_read"      on public.sellers           for select using (true);
create policy "bids_public_read"         on public.bids              for select using (true);
create policy "users_public_read"        on public.users             for select using (true);

-- Write policies (anon key allowed — wallet signature verified app-side)
create policy "users_insert"        on public.users             for insert with check (true);
create policy "users_update"        on public.users             for update using (true);
create policy "pools_insert"        on public.pools             for insert with check (true);
create policy "pools_update"        on public.pools             for update using (true);
create policy "participants_insert" on public.pool_participants  for insert with check (true);
create policy "sellers_insert"      on public.sellers           for insert with check (true);
create policy "bids_insert"         on public.bids              for insert with check (true);
create policy "bids_update"         on public.bids              for update using (true);

-- ============================================================
-- INDEXES
-- ============================================================

create index idx_pools_category    on public.pools(category_id);
create index idx_pools_status      on public.pools(status);
create index idx_pools_creator     on public.pools(creator_wallet);
create index idx_participants_pool on public.pool_participants(pool_id);
create index idx_participants_wallet on public.pool_participants(wallet_address);
create index idx_bids_pool         on public.bids(pool_id);
create index idx_bids_seller       on public.bids(seller_id);
create index idx_users_wallet      on public.users(wallet_address);
