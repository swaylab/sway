-- ============================================================
-- SWAY — Seed Data
-- Run this AFTER schema.sql
-- ============================================================

-- ============================================================
-- USERS (mock wallets)
-- ============================================================

insert into public.users (wallet_address, username) values
  ('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', 'alice'),
  ('0x70997970C51812dc3A010C7d01b50e0d17dc79C8', 'bob'),
  ('0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC', 'carol'),
  ('0x90F79bf6EB2c4f870365E785982E1f101E93b906', 'dave'),
  ('0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65', 'seller_techdist'),
  ('0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc', 'seller_globalelec'),
  ('0x976EA74026E726554dB657fA54763abd0C3a0aa9', 'seller_applepro'),
  ('0x14dC79964da2C08b23698B3D3cc7Ca32193d9955', 'seller_megasupply'),
  ('0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f', 'seller_eurotrade');

-- ============================================================
-- SELLERS
-- ============================================================

insert into public.sellers (wallet_address, company_name, location, rating, review_count, verified) values
  ('0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65', 'TechDist Inc.',           'Istanbul, Turkey', 4.8, 234, true),
  ('0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc', 'GlobalElec Distribution', 'Dubai, UAE',       4.6, 189, true),
  ('0x976EA74026E726554dB657fA54763abd0C3a0aa9', 'ApplePro Authorized',     'London, UK',       4.9, 512, true),
  ('0x14dC79964da2C08b23698B3D3cc7Ca32193d9955', 'MegaSupply Co.',          'Amsterdam, NL',    4.5, 98,  true),
  ('0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f', 'EuroTrade GmbH',         'Berlin, Germany',  4.7, 301, true);

-- ============================================================
-- POOLS
-- ============================================================

insert into public.pools (id, creator_wallet, title, description, category_id, image_url, individual_price, target_price, min_participants, current_participants, status, expires_at) values

(
  'a1b2c3d4-0001-0001-0001-000000000001',
  '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  'iPhone 16 Pro Max 256GB',
  'Pool together with 100 buyers to unlock a $250 discount on Apple''s flagship iPhone 16 Pro Max. Funds are locked in a smart contract and only released once the best seller bid is selected.',
  'electronics',
  'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80&auto=format&fit=crop',
  1199.00, 949.00, 100, 67, 'bidding',
  now() + interval '2 days 14 hours'
),
(
  'a1b2c3d4-0002-0002-0002-000000000002',
  '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
  'Sony PlayStation 5 Slim',
  'Only 7 more buyers needed to hit the target for the PS5 Slim pool. Once we reach 50, sellers will compete with their best bulk price — and everyone saves $110.',
  'gaming',
  'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=800&q=80&auto=format&fit=crop',
  499.00, 389.00, 50, 43, 'open',
  now() + interval '6 hours 30 minutes'
),
(
  'a1b2c3d4-0003-0003-0003-000000000003',
  '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
  'Nike Air Jordan 1 Retro High',
  'Fresh pool for the iconic Air Jordan 1 Retro High. We need 75 sneaker buyers to unlock a $51 per-pair discount — that''s 28% off retail, on-chain.',
  'fashion',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80&auto=format&fit=crop',
  180.00, 129.00, 75, 12, 'open',
  now() + interval '5 days 2 hours'
),
(
  'a1b2c3d4-0004-0004-0004-000000000004',
  '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
  'Apple MacBook Pro M4 14"',
  'The M4 MacBook Pro is a powerhouse. Pool with 60 buyers and save $350 per unit — sellers compete to offer the best bulk pricing once the pool fills.',
  'electronics',
  'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80&auto=format&fit=crop',
  1999.00, 1649.00, 60, 28, 'open',
  now() + interval '3 days 8 hours'
),
(
  'a1b2c3d4-0005-0005-0005-000000000005',
  '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  'Dyson V15 Detect Vacuum',
  'Dyson''s top-of-the-line vacuum cleaner. 55 buyers in, 25 more to go. Once we hit 80, authorized distributors submit bids — verified unit, full warranty.',
  'home',
  'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&q=80&auto=format&fit=crop',
  749.00, 579.00, 80, 55, 'open',
  now() + interval '1 day 22 hours'
),
(
  'a1b2c3d4-0006-0006-0006-000000000006',
  '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
  'Samsung 65" QLED 4K Smart TV',
  'Brand new pool for Samsung''s stunning 65-inch QLED TV. We need 40 buyers to invite sellers. Early joiners get the best collective price — $300 off retail.',
  'electronics',
  'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=800&q=80&auto=format&fit=crop',
  1299.00, 999.00, 40, 8, 'open',
  now() + interval '6 days 10 hours'
),
(
  'a1b2c3d4-0007-0007-0007-000000000007',
  '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
  'Sony WH-1000XM5 Headphones',
  'Industry-leading noise cancellation, 30-hour battery. Pool 60 buyers and drop the price by $80 per unit.',
  'electronics',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80&auto=format&fit=crop',
  349.00, 269.00, 60, 34, 'open',
  now() + interval '4 days 6 hours'
),
(
  'a1b2c3d4-0008-0008-0008-000000000008',
  '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
  'Adidas Ultraboost 24',
  'The most comfortable running shoe on the market. Pool 80 buyers and save $55 per pair.',
  'sports',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80&auto=format&fit=crop',
  190.00, 135.00, 80, 22, 'open',
  now() + interval '7 days'
),
(
  'a1b2c3d4-0009-0009-0009-000000000009',
  '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  'KitchenAid Stand Mixer 5Qt',
  'The iconic stand mixer every kitchen needs. Pool 50 buyers and save $120 per unit.',
  'home',
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80&auto=format&fit=crop',
  499.00, 379.00, 50, 41, 'open',
  now() + interval '2 days'
),
(
  'a1b2c3d4-0010-0010-0010-000000000010',
  '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
  'iPad Pro M4 11" Wi-Fi 256GB',
  'Apple''s thinnest and most powerful iPad. Pool 70 buyers and bring the price down by $200.',
  'electronics',
  'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=800&q=80&auto=format&fit=crop',
  999.00, 799.00, 70, 19, 'open',
  now() + interval '5 days'
);

-- ============================================================
-- BIDS (pool 1 — iPhone, bidding status)
-- ============================================================

insert into public.bids (pool_id, seller_id, price, delivery_days, warranty, status)
select
  'a1b2c3d4-0001-0001-0001-000000000001',
  s.id,
  b.price,
  b.delivery_days,
  b.warranty,
  'pending'
from (values
  ('0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65', 949.00,  4, '1 year Apple warranty'),
  ('0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc', 965.00,  6, '1 year Apple warranty'),
  ('0x976EA74026E726554dB657fA54763abd0C3a0aa9', 979.00,  2, '1 year Apple warranty + priority support')
) as b(wallet, price, delivery_days, warranty)
join public.sellers s on s.wallet_address = b.wallet;

-- ============================================================
-- POOL PARTICIPANTS (mock join data)
-- ============================================================

insert into public.pool_participants (pool_id, wallet_address, amount_locked, status) values
  ('a1b2c3d4-0001-0001-0001-000000000001', '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', 949.00, 'locked'),
  ('a1b2c3d4-0001-0001-0001-000000000001', '0x70997970C51812dc3A010C7d01b50e0d17dc79C8', 949.00, 'locked'),
  ('a1b2c3d4-0002-0002-0002-000000000002', '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC', 389.00, 'locked'),
  ('a1b2c3d4-0002-0002-0002-000000000002', '0x90F79bf6EB2c4f870365E785982E1f101E93b906', 389.00, 'locked');
