-- ============================================================
-- FASIH DATA SEED
-- Source rows: 199
-- Unique Pencacah: 25
-- Unique Region: 199
-- Assignments: 199
-- totalRegion -> fasih_region_status.total_assignments
-- pengawas_id intentionally NULL: source data has no mapping
-- ============================================================

-- 1. PENCACAH
insert into public.fasih_officers (id, username, name, officer_role)
values ('93add754-d76f-5b72-9fb3-23071e48d5aa'::uuid, 'alfirdausi89\@gmail.com', 'Nurul Fatihah Al Firdausi', 'pencacah')
on conflict (id) do update set
  username = excluded.username,
  name = excluded.name,
  officer_role = excluded.officer_role,
  updated_at = now();
insert into public.fasih_officers (id, username, name, officer_role)
values ('71fd95e2-6699-51c0-9032-a294559260b4'::uuid, 'alr53057\@gmail.com', 'ANJILIRROHMAH', 'pencacah')
on conflict (id) do update set
  username = excluded.username,
  name = excluded.name,
  officer_role = excluded.officer_role,
  updated_at = now();
insert into public.fasih_officers (id, username, name, officer_role)
values ('c2a03991-3b8b-5b2f-8071-4927c2b47765'::uuid, 'asniati377\@gmail.com', 'Asniati', 'pencacah')
on conflict (id) do update set
  username = excluded.username,
  name = excluded.name,
  officer_role = excluded.officer_role,
  updated_at = now();
insert into public.fasih_officers (id, username, name, officer_role)
values ('537f5c2a-96a8-5e77-bfc3-ca5f2e79031a'::uuid, 'hilmaacenk\@gmail.com', 'Hilma', 'pencacah')
on conflict (id) do update set
  username = excluded.username,
  name = excluded.name,
  officer_role = excluded.officer_role,
  updated_at = now();
insert into public.fasih_officers (id, username, name, officer_role)
values ('f0286bc4-e90f-5aa8-89d4-490899fde7df'::uuid, 'karlinahzakar\@gmail.com', 'Karlinah', 'pencacah')
on conflict (id) do update set
  username = excluded.username,
  name = excluded.name,
  officer_role = excluded.officer_role,
  updated_at = now();
insert into public.fasih_officers (id, username, name, officer_role)
values ('94d2a9ee-8670-5244-8dab-e02081cc8204'::uuid, 'komalasarisiti867\@gmail.com', 'Siti komalasari', 'pencacah')
on conflict (id) do update set
  username = excluded.username,
  name = excluded.name,
  officer_role = excluded.officer_role,
  updated_at = now();
insert into public.fasih_officers (id, username, name, officer_role)
values ('73746725-fc63-5247-bf9a-e753cb092a20'::uuid, 'kusumaningsimamik\@gmail.com', 'Mamik kusumaningsih', 'pencacah')
on conflict (id) do update set
  username = excluded.username,
  name = excluded.name,
  officer_role = excluded.officer_role,
  updated_at = now();
insert into public.fasih_officers (id, username, name, officer_role)
values ('55234a7c-7e0e-592f-a3c9-e5bed703c135'::uuid, 'laiylatulkodria13\@gmail.com', 'Laiylatul Kodria', 'pencacah')
on conflict (id) do update set
  username = excluded.username,
  name = excluded.name,
  officer_role = excluded.officer_role,
  updated_at = now();
insert into public.fasih_officers (id, username, name, officer_role)
values ('7ed1a49f-dade-513c-bd94-c1fe53401f7b'::uuid, 'mafakhirmz05\@gmail.com', 'Muhammad Zainul Mafakhir', 'pencacah')
on conflict (id) do update set
  username = excluded.username,
  name = excluded.name,
  officer_role = excluded.officer_role,
  updated_at = now();
insert into public.fasih_officers (id, username, name, officer_role)
values ('124e7a39-1c2a-5111-a88c-bf017dbe19e9'::uuid, 'mahranienanie9\@gmail.com', 'MAHRANI', 'pencacah')
on conflict (id) do update set
  username = excluded.username,
  name = excluded.name,
  officer_role = excluded.officer_role,
  updated_at = now();
insert into public.fasih_officers (id, username, name, officer_role)
values ('005e717e-4672-5b3b-b2d6-2a9ce72685f6'::uuid, 'mawadah.skn18\@gmail.com', 'Sakina mawadah', 'pencacah')
on conflict (id) do update set
  username = excluded.username,
  name = excluded.name,
  officer_role = excluded.officer_role,
  updated_at = now();
insert into public.fasih_officers (id, username, name, officer_role)
values ('6894f3fb-d92a-5fbe-9436-d89ffd699243'::uuid, 'milasarmila62808\@gmail.com', 'sarmila', 'pencacah')
on conflict (id) do update set
  username = excluded.username,
  name = excluded.name,
  officer_role = excluded.officer_role,
  updated_at = now();
insert into public.fasih_officers (id, username, name, officer_role)
values ('0edcb8a2-e6a6-5b09-ab78-53c5a5b06101'::uuid, 'miminkomala9\@gmail.com', 'Mimin komala', 'pencacah')
on conflict (id) do update set
  username = excluded.username,
  name = excluded.name,
  officer_role = excluded.officer_role,
  updated_at = now();
insert into public.fasih_officers (id, username, name, officer_role)
values ('6a61f534-1e2c-5457-8d5b-711f92170777'::uuid, 'pulo0405\@gmail.com', 'Astri Meilisa Puteri', 'pencacah')
on conflict (id) do update set
  username = excluded.username,
  name = excluded.name,
  officer_role = excluded.officer_role,
  updated_at = now();
insert into public.fasih_officers (id, username, name, officer_role)
values ('b1035dd8-732a-5b67-9f85-177b7a556b62'::uuid, 'raynzico1010\@gmail.com', 'Siti Rosilah', 'pencacah')
on conflict (id) do update set
  username = excluded.username,
  name = excluded.name,
  officer_role = excluded.officer_role,
  updated_at = now();
insert into public.fasih_officers (id, username, name, officer_role)
values ('a7256d1e-6dd2-561a-a3ea-dfc2872849e4'::uuid, 'riamubarok2010\@gmail.com', 'Ria Anggraini', 'pencacah')
on conflict (id) do update set
  username = excluded.username,
  name = excluded.name,
  officer_role = excluded.officer_role,
  updated_at = now();
insert into public.fasih_officers (id, username, name, officer_role)
values ('450e9c90-66a6-5c60-a0b6-73f3aea05c9b'::uuid, 'rifkanabillah\@gmail.com', 'Rifka nabila', 'pencacah')
on conflict (id) do update set
  username = excluded.username,
  name = excluded.name,
  officer_role = excluded.officer_role,
  updated_at = now();
insert into public.fasih_officers (id, username, name, officer_role)
values ('13c33a9c-ccbf-5dff-b7e3-ad1f717d4b32'::uuid, 'sjuhroh12\@gmail.com', 'Siti Juhroh', 'pencacah')
on conflict (id) do update set
  username = excluded.username,
  name = excluded.name,
  officer_role = excluded.officer_role,
  updated_at = now();
insert into public.fasih_officers (id, username, name, officer_role)
values ('6a32904f-13d6-50a4-9a4e-47bba000a581'::uuid, 'srirahayupujiutami303\@gmail.com', 'SRI RAHAYU PUJI UTAMI', 'pencacah')
on conflict (id) do update set
  username = excluded.username,
  name = excluded.name,
  officer_role = excluded.officer_role,
  updated_at = now();
insert into public.fasih_officers (id, username, name, officer_role)
values ('8dca7e1b-a128-5508-b638-cbc7e9e2dd9e'::uuid, 'tantridianasari004\@gmail.com', 'Tantri diana sari', 'pencacah')
on conflict (id) do update set
  username = excluded.username,
  name = excluded.name,
  officer_role = excluded.officer_role,
  updated_at = now();
insert into public.fasih_officers (id, username, name, officer_role)
values ('39506e9e-d348-5610-bd69-7080c50b78cf'::uuid, 'uddy2828\@gmail.com', 'Muhammad Shalahuddin', 'pencacah')
on conflict (id) do update set
  username = excluded.username,
  name = excluded.name,
  officer_role = excluded.officer_role,
  updated_at = now();
insert into public.fasih_officers (id, username, name, officer_role)
values ('a3938aa2-b405-51a2-88d8-e7d1b2e5cf30'::uuid, 'umayy6139\@gmail.com', 'Nur Humairoh', 'pencacah')
on conflict (id) do update set
  username = excluded.username,
  name = excluded.name,
  officer_role = excluded.officer_role,
  updated_at = now();
insert into public.fasih_officers (id, username, name, officer_role)
values ('5fe6cdeb-9319-520b-8864-ea4866b610c4'::uuid, 'uswatunzema13\@gmail.com', 'Uswatun khasanah', 'pencacah')
on conflict (id) do update set
  username = excluded.username,
  name = excluded.name,
  officer_role = excluded.officer_role,
  updated_at = now();
insert into public.fasih_officers (id, username, name, officer_role)
values ('687d1856-c67a-5149-8937-7c36d5f7db25'::uuid, 'windipopyg\@gmail.com', 'Windi Popy Guntari', 'pencacah')
on conflict (id) do update set
  username = excluded.username,
  name = excluded.name,
  officer_role = excluded.officer_role,
  updated_at = now();
insert into public.fasih_officers (id, username, name, officer_role)
values ('c0620ea0-ac8f-5733-a2bd-1dfe37c972fa'::uuid, 'yudatongkii\@gmail.com', 'Hasan wirayuda', 'pencacah')
on conflict (id) do update set
  username = excluded.username,
  name = excluded.name,
  officer_role = excluded.officer_role,
  updated_at = now();

-- 2. REGIONS
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('636a153a-c653-549b-a63a-f1fe70fa2255'::uuid, '3101010001000100', 'PULAU TIDUNG', 'RT 001 RW 001')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('59037129-c931-51be-bfb4-4d8eecbf3476'::uuid, '3101010001000200', 'PULAU TIDUNG', 'RT 002 RW 001')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('ad81c9b5-a5bf-5063-b804-1dfb9b2b9253'::uuid, '3101010001000300', 'PULAU TIDUNG', 'RT 003 RW 001')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('163c8461-f971-5045-92a8-84e706e3ac8f'::uuid, '3101010001000400', 'PULAU TIDUNG', 'RT 004 RW 001')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('36ffca11-4de7-5b20-bfbb-6c409979ba0b'::uuid, '3101010001000500', 'PULAU TIDUNG', 'RT 005 RW 001')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('60ae2f79-f630-5545-ba65-e76400355d73'::uuid, '3101010001000600', 'PULAU TIDUNG', 'RT 006 RW 001')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('91766e16-3b37-583b-baba-6778bfeba13a'::uuid, '3101010001000700', 'PULAU TIDUNG', 'RT 007 RW 001')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('ad67c6a8-3980-5cd3-911a-db840ae82a82'::uuid, '3101010001000800', 'PULAU TIDUNG', 'RT 001 RW 002')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('06300fd3-cbc4-5075-b81a-d0b75ec824bc'::uuid, '3101010001000900', 'PULAU TIDUNG', 'RT 002 RW 002')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('48fdcbad-ef4f-5dab-bb5a-9718df18caef'::uuid, '3101010001001000', 'PULAU TIDUNG', 'RT 003 RW 002')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('c763fa4e-e630-524b-843d-a2769be4ea12'::uuid, '3101010001001100', 'PULAU TIDUNG', 'RT 004 RW 002')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('2e498a92-4d0c-520b-9b4a-65ec7de21679'::uuid, '3101010001001200', 'PULAU TIDUNG', 'RT 005 RW 002')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('8c408892-9ef3-51d4-b82c-e2aa2b313bff'::uuid, '3101010001001300', 'PULAU TIDUNG', 'RT 006 RW 002')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('557b29cb-0aa0-5df5-ade3-e89238f44d64'::uuid, '3101010001001400', 'PULAU TIDUNG', 'RT 007 RW 002')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('949e96f3-df22-5e3c-a66f-cba7b84fc506'::uuid, '3101010001001500', 'PULAU TIDUNG', 'RT 001 RW 003')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('18936cf0-0ac6-5b6f-a90f-011fc5215aa2'::uuid, '3101010001001600', 'PULAU TIDUNG', 'RT 002 RW 003')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('80ea32bd-add8-5003-bbd8-5aaedabb621d'::uuid, '3101010001001700', 'PULAU TIDUNG', 'RT 003 RW 003')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('0dfb78c1-173a-533b-b59d-6eb587b6ce75'::uuid, '3101010001001800', 'PULAU TIDUNG', 'RT 004 RW 003')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('4d0a1fcb-53f7-5c70-81e3-477f3e7d330f'::uuid, '3101010001001900', 'PULAU TIDUNG', 'RT 005 RW 003')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('dce1c77e-ef68-5f48-bf76-f8fafebd5469'::uuid, '3101010001002000', 'PULAU TIDUNG', 'RT 006 RW 003')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('354035dd-2a8d-5b33-90b3-a9a2baef8d75'::uuid, '3101010001002100', 'PULAU TIDUNG', 'RT 007 RW 003')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('2506941f-6b4f-5041-9a43-6363f6f0a2ad'::uuid, '3101010001002200', 'PULAU TIDUNG', 'RT 008 RW 003')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('04334ac5-dc0b-5500-81fc-06da329141df'::uuid, '3101010001002300', 'PULAU TIDUNG', 'RT 009 RW 003')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('f36266a9-9f02-552e-9221-cd8fe10fc653'::uuid, '3101010001002400', 'PULAU TIDUNG', 'RT 001 RW 004')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('add2ac93-c42f-581c-8e2e-32459817d50c'::uuid, '3101010001002500', 'PULAU TIDUNG', 'RT 002 RW 004')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('ceaa5102-845e-5dd1-a85c-fcb1d76f6219'::uuid, '3101010001002600', 'PULAU TIDUNG', 'RT 003 RW 004')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('3770b20f-0754-5461-9f63-4b0c4dea025b'::uuid, '3101010001002700', 'PULAU TIDUNG', 'RT 004 RW 004')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('092b70f8-73fc-5c41-8e9b-5356482919f0'::uuid, '3101010001002800', 'PULAU TIDUNG', 'RT 005 RW 004')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('d08a7faa-8c58-56bf-9f98-354273afcb2b'::uuid, '3101010001002900', 'PULAU TIDUNG', 'RT 006 RW 004')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('70445a91-7010-5b45-90b4-501a1f33e8b5'::uuid, '3101010001200100', 'PULAU TIDUNG', 'PULAU TIDUNG KECIL')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('6770ce16-3e4d-5813-a6d5-47f6a605e59a'::uuid, '3101010001200200', 'PULAU TIDUNG', 'PULAU PAYUNG KECIL')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('040b99d3-8dce-5e5f-9be7-0833d14e236a'::uuid, '3101010001200300', 'PULAU TIDUNG', 'PULAU KARANG BERAS')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('24f7dcca-92f6-57c9-8f2a-6a14f4bac280'::uuid, '3101010002000100', 'PULAU PARI', 'RT 001 RW 001')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('acac49eb-3a0a-50ca-bae6-4e0ec68cb8f8'::uuid, '3101010002000200', 'PULAU PARI', 'RT 002 RW 001')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('4d78cb0b-1dec-50f8-b55f-b7b64468b523'::uuid, '3101010002000300', 'PULAU PARI', 'RT 003 RW 001')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('d83686f5-a845-581d-9f46-8ede5dd7d6ae'::uuid, '3101010002000400', 'PULAU PARI', 'RT 004 RW 001')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('8f508b98-ae80-5ddb-b9c9-ffc08c2f3ca8'::uuid, '3101010002000500', 'PULAU PARI', 'RT 001 RW 002')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('b1749c3a-a9fb-5e2e-875b-c48f359adfaf'::uuid, '3101010002000600', 'PULAU PARI', 'RT 002 RW 002')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('31ab105e-50c3-521d-a1f8-daaacd6f7477'::uuid, '3101010002000700', 'PULAU PARI', 'RT 003 RW 002')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('81e2a75b-a06b-5e25-8486-51924c93b179'::uuid, '3101010002000800', 'PULAU PARI', 'RT 001 RW 003')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('972fd1da-8ad0-5f15-8a2f-a478938902d7'::uuid, '3101010002000900', 'PULAU PARI', 'RT 002 RW 003')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('9c7f4a14-58bb-587d-93a6-585b21abd360'::uuid, '3101010002001000', 'PULAU PARI', 'RT 003 RW 003')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('e8f55976-b098-550b-9a48-a68400517a09'::uuid, '3101010002001100', 'PULAU PARI', 'RT 001 RW 004')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('a6347104-b855-5a11-8a60-190a165f7883'::uuid, '3101010002001201', 'PULAU PARI', 'RT 002 RW 004')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('a9cf2db0-83e4-52a9-aa03-36cc039f8141'::uuid, '3101010002001202', 'PULAU PARI', 'RT 002 RW 004')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('cdab2d56-7852-5bfe-bf9f-f1cf915a5a3c'::uuid, '3101010002001301', 'PULAU PARI', 'RT 003 RW 004')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('ac90be5e-a40d-5c52-9529-57347aa91b5e'::uuid, '3101010002001302', 'PULAU PARI', 'RT 003 RW 004')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('b56a77e7-99ec-565f-aa15-c47c8f991fca'::uuid, '3101010002001400', 'PULAU PARI', 'RT 004 RW 004')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('2a89bb55-2683-5c65-ab4c-40d1a6387de4'::uuid, '3101010002201200', 'PULAU PARI', 'PULAU BOKOR')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('95868673-5f83-5947-8adb-1affeac2b7af'::uuid, '3101010002300100', 'PULAU PARI', 'PULAU TIKUS')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('07fe6543-2c64-52f5-a14f-40484012142e'::uuid, '3101010002300200', 'PULAU PARI', 'PULAU TENGAH')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('bb60cea6-e28e-5e6b-83e2-289ff743b826'::uuid, '3101010002300300', 'PULAU PARI', 'PULAU KONGSI')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('aa6b60af-6fd9-5930-84d3-270884e97420'::uuid, '3101010002300400', 'PULAU PARI', 'PULAU BURUNG')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('acafc4a4-2d8c-58fc-b2d9-2cfb4fa559a6'::uuid, '3101010002300500', 'PULAU PARI', 'PULAU KARANG KUDUS')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('dbf17515-8fdf-5bd0-98ee-2b5f08e2c5a7'::uuid, '3101010002300600', 'PULAU PARI', 'PULAU LAKI')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('d038424c-bc01-5c5b-a6ea-2f4eb90eca2f'::uuid, '3101010002300700', 'PULAU PARI', 'PULAU LANCANG KECIL')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('d35721ec-ef6b-5f6c-a0e9-fad37bd2fb21'::uuid, '3101010003000100', 'PULAU UNTUNG JAWA', 'RT 001 RW 001')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('3b6f3939-1298-535a-87d4-cec2790db2ba'::uuid, '3101010003000200', 'PULAU UNTUNG JAWA', 'RT 002 RW 001')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('b8528293-e683-5c4f-b9df-e5a2a0e47ce0'::uuid, '3101010003000300', 'PULAU UNTUNG JAWA', 'RT 003 RW 001')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('bba5c36b-2e97-5d57-b3e2-23bcbaf6116d'::uuid, '3101010003000400', 'PULAU UNTUNG JAWA', 'RT 001 RW 002')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('407ce7e5-c9fc-5c79-bcb8-2dfb97cf5382'::uuid, '3101010003000500', 'PULAU UNTUNG JAWA', 'RT 002 RW 002')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('b1798335-3e90-510f-a1b7-23564f16d5dc'::uuid, '3101010003000600', 'PULAU UNTUNG JAWA', 'RT 003 RW 002')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('639f01d2-808b-50dd-8714-5505cc797525'::uuid, '3101010003000700', 'PULAU UNTUNG JAWA', 'RT 001 RW 003')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('5d0cb886-6390-56e8-a87f-682832bfbaf7'::uuid, '3101010003000800', 'PULAU UNTUNG JAWA', 'RT 002 RW 003')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('ee2a47a2-80bd-5625-86f8-27dd296e4d94'::uuid, '3101010003000900', 'PULAU UNTUNG JAWA', 'RT 003 RW 003')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('d5e3c2d2-0d0a-5c7d-bd2a-c75fde6003f7'::uuid, '3101010003200100', 'PULAU UNTUNG JAWA', 'PULAU BIDADARI')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('363de533-87c7-549a-a804-157b4e4524ee'::uuid, '3101010003200200', 'PULAU UNTUNG JAWA', 'PULAU AYER')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('80fbe781-4c3e-57b2-a564-9a7781a61fab'::uuid, '3101010003200300', 'PULAU UNTUNG JAWA', 'PULAU CIPIR')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('c6fccac9-74dc-5060-bbad-2805324b7146'::uuid, '3101010003200400', 'PULAU UNTUNG JAWA', 'PULAU KELOR')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('e133fe26-5b16-5ff2-b5fd-8d10de046c30'::uuid, '3101010003200500', 'PULAU UNTUNG JAWA', 'PULAU ONRUST')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('9392c0c0-9ee3-51de-9405-44dadc4c239c'::uuid, '3101010003200600', 'PULAU UNTUNG JAWA', 'PULAU RAMBUT')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('f2201e20-4857-5c8f-9560-0a55d476ff27'::uuid, '3101010003200700', 'PULAU UNTUNG JAWA', 'PULAU EDAM KECIL')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('78774f30-1368-59ed-817d-bbc6db7be041'::uuid, '3101010003200800', 'PULAU UNTUNG JAWA', 'PULAU ENDAM')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('49b16afc-29b2-5176-aaf8-1084275df57d'::uuid, '3101010003200900', 'PULAU UNTUNG JAWA', 'PULAU DAPUR')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('d2c4a4c2-145d-546c-927e-01bf9ee94b23'::uuid, '3101010003201100', 'PULAU UNTUNG JAWA', 'HUTAN MANGROVE')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('5a0f5879-6d79-50f8-a13f-e319b0448681'::uuid, '3101020001000100', 'PULAU PANGGANG', 'RT 001 RW 01')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('13efd9f5-9ae4-5ce0-90bb-57f776f10da4'::uuid, '3101020001000200', 'PULAU PANGGANG', 'RT 002 RW 01')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('dd83ed14-e8b0-52d5-ac49-83c611da868d'::uuid, '3101020001000300', 'PULAU PANGGANG', 'RT 003 RW 01')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('e9ad76d2-b39a-593c-8178-49c83700a459'::uuid, '3101020001000400', 'PULAU PANGGANG', 'RT 004 RW 01')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('c920bd6e-41a5-5bf6-9bbd-92b864840c96'::uuid, '3101020001000500', 'PULAU PANGGANG', 'RT 005 RW 01')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('b86f987f-1293-5a29-a357-069258b662c5'::uuid, '3101020001000600', 'PULAU PANGGANG', 'RT 006 RW 01')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('fc4b29e5-a852-59da-beb1-f5fba7478523'::uuid, '3101020001000700', 'PULAU PANGGANG', 'RT 007 RW 01')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('7ec06052-c4f4-51ae-b187-ae625cbe1073'::uuid, '3101020001000800', 'PULAU PANGGANG', 'RT 001 RW 02')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('525a9308-600e-5fb3-9877-10b3713660e9'::uuid, '3101020001000900', 'PULAU PANGGANG', 'RT 002 RW 02')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('b6e3d08d-75b8-5e65-9435-1e30da11540b'::uuid, '3101020001001000', 'PULAU PANGGANG', 'RT 003 RW 02')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('ce5ff95c-2f06-5e0f-b7ff-2846a64694a3'::uuid, '3101020001001100', 'PULAU PANGGANG', 'RT 004 RW 02')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('29c661ce-9c16-5a99-bb6c-aab17fe6586b'::uuid, '3101020001001200', 'PULAU PANGGANG', 'RT 005 RW 02')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('03fbe37e-250c-5e7f-bc9a-08b71929f907'::uuid, '3101020001001300', 'PULAU PANGGANG', 'RT 006 RW 02')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('2b4d8f18-57d2-5fc9-9bec-017a0c2d5634'::uuid, '3101020001001400', 'PULAU PANGGANG', 'RT 007 RW 02')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('ea10b6f6-9dd0-56c0-826e-63dfc23c014e'::uuid, '3101020001001500', 'PULAU PANGGANG', 'RT 001 RW 03')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('35ca2181-b3cf-5b24-8492-41208a643a36'::uuid, '3101020001001600', 'PULAU PANGGANG', 'RT 002 RW 03')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('d9eab65e-abf4-5f8d-9a9f-a74b05f74412'::uuid, '3101020001001700', 'PULAU PANGGANG', 'RT 003 RW 03')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('5fc0a421-288f-5339-a54b-a2d0706aa36d'::uuid, '3101020001001800', 'PULAU PANGGANG', 'RT 004 RW 03')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('8ec8b0e4-fe63-519e-a43e-e739f06f256c'::uuid, '3101020001001900', 'PULAU PANGGANG', 'RT 005 RW 03')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('cd090783-eb6b-5963-b48d-0101364fd48e'::uuid, '3101020001002000', 'PULAU PANGGANG', 'RT 006 RW 03')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('ac689d07-0e75-5b33-8808-3edaeddd7ef2'::uuid, '3101020001002100', 'PULAU PANGGANG', 'RT 007 RW 03')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('360305ca-ff1d-5544-beda-2ddf142ad74f'::uuid, '3101020001002200', 'PULAU PANGGANG', 'RT 001 RW 04')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('b5bcdac3-cd82-50e7-b1ab-1dfb83d5e46c'::uuid, '3101020001002300', 'PULAU PANGGANG', 'RT 002 RW 04')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('67818a9f-d1d3-5d91-b072-888706e1a185'::uuid, '3101020001002400', 'PULAU PANGGANG', 'RT 003 RW 04')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('43efb457-99db-53a6-8699-56778026380f'::uuid, '3101020001002500', 'PULAU PANGGANG', 'RT 004 RW 04')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('99eb1f5b-37a9-5fff-a82b-dd47f9ff8ec1'::uuid, '3101020001002600', 'PULAU PANGGANG', 'RT 001 RW 05')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('8cba506f-c472-54eb-959b-4833a975a4ba'::uuid, '3101020001002700', 'PULAU PANGGANG', 'RT 002 RW 05')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('1d5050ac-8a57-5f2a-b045-53e1deb2469d'::uuid, '3101020001002800', 'PULAU PANGGANG', 'RT 003 RW 05')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('5aa69024-44d8-58f8-8a00-843d047d6ef1'::uuid, '3101020001002900', 'PULAU PANGGANG', 'RT 004 RW 05')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('958e16f4-03e5-52c4-a82a-7e18a18ac8de'::uuid, '3101020001200100', 'PULAU PANGGANG', 'PULAU KARYA')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('deae20c7-e450-5b6b-805f-ccf42018b125'::uuid, '3101020001200200', 'PULAU PANGGANG', 'PULAU GOSONG PRAMUKA/NUSA RESTO')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('05a80ec8-4206-5b9c-bac0-d16fac98bcc7'::uuid, '3101020001200300', 'PULAU PANGGANG', 'PULAU AYER')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('45214fc4-ea7f-50c1-a284-580b650bc029'::uuid, '3101020001200400', 'PULAU PANGGANG', 'PULAU KARANG BONGKOK')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('402750b1-69f9-5334-ab93-5b8d6614819a'::uuid, '3101020001200500', 'PULAU PANGGANG', 'PULAU SEKATI')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('b8beed50-944a-52fe-901c-05e7a597d237'::uuid, '3101020001200600', 'PULAU PANGGANG', 'PULAU KOTOK BESAR')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('eabf4c8f-7c2f-5d00-b837-9167873aa7ac'::uuid, '3101020001200700', 'PULAU PANGGANG', 'PULAU KOTOK KECIL')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('75dcb497-b27e-5b73-9c80-0b2aaabede7a'::uuid, '3101020001200800', 'PULAU PANGGANG', 'PULAU GOSONG PANDAN')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('c703fdf7-79b0-517c-a858-687fcdaa095e'::uuid, '3101020001200900', 'PULAU PANGGANG', 'PULAU SEMAK DAUN')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('f692c736-703c-5bd5-99cf-180cf14bcb29'::uuid, '3101020001201000', 'PULAU PANGGANG', 'PULAU GOSONG CONGKAK')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('cf7193bc-7c1d-5c6f-88bd-285165371a13'::uuid, '3101020001201100', 'PULAU PANGGANG', 'PULAU LAYAR')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('c2d47767-b1a3-5835-9297-79e4c03a5cee'::uuid, '3101020001201200', 'PULAU PANGGANG', 'PULAU SAMPIT')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('6e4287da-3407-5b22-90fc-40db0a8f5157'::uuid, '3101020001201300', 'PULAU PANGGANG', 'PULAU OPAK KECIL')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('cf8d1352-2bf6-5ea8-8473-e8a16946915a'::uuid, '3101020001201400', 'PULAU PANGGANG', 'PULAU PENIKI')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('938a4491-f178-5656-b6f8-b0fd71202414'::uuid, '3101020002000100', 'PULAU KELAPA', 'RT 001 RW 01')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('ae595075-ddaf-5f8b-9147-cdec3ee9d4b4'::uuid, '3101020002000200', 'PULAU KELAPA', 'RT 002 RW 01')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('6f68fecc-bc6a-55a2-950c-f87a191a9a14'::uuid, '3101020002000300', 'PULAU KELAPA', 'RT 003 RW 01')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('2d5d4a9c-8d8b-5d4c-ab1d-caed42a8b0d5'::uuid, '3101020002000400', 'PULAU KELAPA', 'RT 004 RW 01')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('b9f7cbbf-92a5-59c1-8d61-a7e9fedaaf85'::uuid, '3101020002000500', 'PULAU KELAPA', 'RT 005 RW 01')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('0c45fc63-935c-5591-ba49-8a5c1262040b'::uuid, '3101020002000600', 'PULAU KELAPA', 'RT 001 RW 02')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('5e7a6e8f-c948-5c8f-a3b0-97d13214e16b'::uuid, '3101020002000700', 'PULAU KELAPA', 'RT 002 RW 02')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('06a128ff-9c4c-599f-80d6-1c22ea4c4546'::uuid, '3101020002000800', 'PULAU KELAPA', 'RT 003 RW 02')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('cb1639e8-6798-542a-8f33-52aab3d9e6d5'::uuid, '3101020002000900', 'PULAU KELAPA', 'RT 004 RW 02')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('1f955fae-85ab-583a-b0fe-2a18fe6df163'::uuid, '3101020002001000', 'PULAU KELAPA', 'RT 005 RW 02')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('e3f98ed4-1f98-5af3-8aab-453cef6a44ba'::uuid, '3101020002001100', 'PULAU KELAPA', 'RT 006 RW 02')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('4f3be114-54d6-56ad-a6d4-c202af92c8ca'::uuid, '3101020002001200', 'PULAU KELAPA', 'RT 007 RW 02')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('87e429f8-ba30-52cd-87c0-3b228ae9602e'::uuid, '3101020002001300', 'PULAU KELAPA', 'RT 008 RW 02')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('fc7f039e-ed12-55aa-a173-4c3a21c36eed'::uuid, '3101020002001400', 'PULAU KELAPA', 'RT 001 RW 03')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('34f51abe-dec7-52d7-8cb0-7fcb0262bccb'::uuid, '3101020002001500', 'PULAU KELAPA', 'RT 002 RW 03')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('64b68328-024f-5262-b210-bb040a46edc0'::uuid, '3101020002001600', 'PULAU KELAPA', 'RT 003 RW 03')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('3df12644-ef3b-5ca0-bcd6-1655b2b1cc69'::uuid, '3101020002001700', 'PULAU KELAPA', 'RT 004 RW 03')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('582f0b79-877c-597e-b996-2185d1ae83ef'::uuid, '3101020002001800', 'PULAU KELAPA', 'RT 005 RW 03')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('0bc02cb9-36af-5a61-b2b8-b0ad8cf25846'::uuid, '3101020002001900', 'PULAU KELAPA', 'RT 006 RW 03')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('581ed9d2-5f45-50cc-b067-47c419676e99'::uuid, '3101020002002000', 'PULAU KELAPA', 'RT 007 RW 03')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('b539f455-e7e6-5dd2-9fc4-9080a8f18513'::uuid, '3101020002002100', 'PULAU KELAPA', 'RT 008 RW 03')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('40bd637d-9e18-5e2d-8058-d0a466294a0d'::uuid, '3101020002002200', 'PULAU KELAPA', 'RT 001 RW 04')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('67c9e5e2-a6bf-5e71-8022-23f9200e3af6'::uuid, '3101020002002300', 'PULAU KELAPA', 'RT 002 RW 04')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('1c2aeb7e-2e2e-5ab9-affe-818f2b877f2f'::uuid, '3101020002002400', 'PULAU KELAPA', 'RT 003 RW 04')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('03ee10ac-a311-512c-924b-d40d312840e3'::uuid, '3101020002002500', 'PULAU KELAPA', 'RT 004 RW 04')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('26f556d7-fee4-54f8-a371-d6e06619f3ff'::uuid, '3101020002002600', 'PULAU KELAPA', 'RT 005 RW 04')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('0498472a-62cf-5fd4-ae6e-b78b3ed5e445'::uuid, '3101020002002700', 'PULAU KELAPA', 'RT 006 RW 04')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('a0e38e19-f5fa-5c5c-bf5d-d0b36ad2bd1d'::uuid, '3101020002002800', 'PULAU KELAPA', 'RT 007 RW 04')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('df48c219-2055-5a07-91f5-e14020c8fcf1'::uuid, '3101020002002900', 'PULAU KELAPA', 'RT 001 RW 05')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('4d1f436e-75c0-5626-9721-c3da411815d5'::uuid, '3101020002003000', 'PULAU KELAPA', 'RT 002 RW 05')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('61461240-6616-5305-8c2e-a213d5a5e4a5'::uuid, '3101020002003100', 'PULAU KELAPA', 'RT 003 RW 05')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('a20b3512-49bc-53a0-8d94-d5cb1ef82b82'::uuid, '3101020002200100', 'PULAU KELAPA', 'PULAU JUKUNG')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('7e1adaab-62aa-5749-8c8f-686e87e049e2'::uuid, '3101020002200200', 'PULAU KELAPA', 'PULAU MELINTANG KECIL')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('64641d57-f207-5c23-9601-79b6d652ab84'::uuid, '3101020002200300', 'PULAU KELAPA', 'PULAU MACAN KECIL')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('06837979-4350-5a51-8994-7f3ef91809c9'::uuid, '3101020002200400', 'PULAU KELAPA', 'PULAU MATAHARI')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('9fc936c7-fba4-5039-97af-396291af388a'::uuid, '3101020002200500', 'PULAU KELAPA', 'PULAU PANJANG KECIL')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('6e64a838-948c-5b88-b7d3-6b0799cac6e7'::uuid, '3101020002200600', 'PULAU KELAPA', 'PULAU PANJANG BESAR')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('b367cee3-8376-56fc-a6a7-80606f620443'::uuid, '3101020002200700', 'PULAU KELAPA', 'PULAU KALIAGE BESAR')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('1a7b65c8-4f1a-523c-a135-9e10e2509ce3'::uuid, '3101020002200800', 'PULAU KELAPA', 'PULAU KALIAGE KECIL')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('d75a5fb9-13e7-5716-badf-82a0e4de8bcf'::uuid, '3101020002200900', 'PULAU KELAPA', 'PULAU PANTARA TIMUR')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('bcff59aa-13e2-570c-8d2c-73a836e9de75'::uuid, '3101020002201000', 'PULAU KELAPA', 'PULAU PANTARA BARAT')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('8257859e-7b0a-53ab-af07-a1ebab898acd'::uuid, '3101020002201100', 'PULAU KELAPA', 'PULAU KELOR BARAT')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('6cdd8bb3-c571-57ac-b1d2-28f27035ade0'::uuid, '3101020002201200', 'PULAU KELAPA', 'PULAU KELOR TIMUR')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('b27ff112-39ad-57f7-8ff1-a58910d51041'::uuid, '3101020002201300', 'PULAU KELAPA', 'PULAU OPAK BESAR')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('458555cb-440a-552f-8987-0dabfa25fe28'::uuid, '3101020003000100', 'PULAU HARAPAN', 'RT 001 RW 01')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('08d4baaf-e4f6-5f5f-8ba6-17ff8a32231e'::uuid, '3101020003000200', 'PULAU HARAPAN', 'RT 002 RW 01')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('31a39677-88f5-5a76-ba6c-1e88c5f43007'::uuid, '3101020003000300', 'PULAU HARAPAN', 'RT 003 RW 01')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('548dfce2-8636-5dbd-963d-9db40349edb1'::uuid, '3101020003000400', 'PULAU HARAPAN', 'RT 004 RW 01')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('29e29fff-47ec-5b74-a947-4325d88e9b65'::uuid, '3101020003000500', 'PULAU HARAPAN', 'RT 005 RW 01')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('4a88257d-16f5-5185-bfbe-b1fd88e8004f'::uuid, '3101020003000600', 'PULAU HARAPAN', 'RT 006 RW 01')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('909dbff0-296a-5c68-8561-e38420cf73f7'::uuid, '3101020003000700', 'PULAU HARAPAN', 'RT 001 RW 02')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('d8b11d52-04c7-5d12-8b59-e0b7c3147ef5'::uuid, '3101020003000800', 'PULAU HARAPAN', 'RT 002 RW 02')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('1673c680-4e93-5115-b4f4-8077b952e1a5'::uuid, '3101020003000900', 'PULAU HARAPAN', 'RT 003 RW 02')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('f29e918f-bed0-58db-a460-471e19bf991c'::uuid, '3101020003001000', 'PULAU HARAPAN', 'RT 004 RW 02')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('b2c36bb5-b85b-5151-8d2f-6ae054a04976'::uuid, '3101020003001100', 'PULAU HARAPAN', 'RT 005 RW 02')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('866903c0-3835-55d6-8f2d-192279879528'::uuid, '3101020003001200', 'PULAU HARAPAN', 'RT 001 RW 03')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('a2a0ae1c-0ea5-5210-8af5-75b2c50424f8'::uuid, '3101020003001300', 'PULAU HARAPAN', 'RT 002 RW 03')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('f6140548-f90d-558b-a4e6-9955ad834cd5'::uuid, '3101020003001400', 'PULAU HARAPAN', 'RT 003 RW 03')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('323ec26c-b770-56d0-9708-ad0a4cb1b33e'::uuid, '3101020003001500', 'PULAU HARAPAN', 'RT 004 RW 03')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('1705c17a-7cef-5d53-bce7-8cf842df9406'::uuid, '3101020003200100', 'PULAU HARAPAN', 'PULAU SEPA KECIL')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('fba572c5-8553-5f53-81a6-6adb8f233047'::uuid, '3101020003200200', 'PULAU HARAPAN', 'PULAU SEPA BESAR')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('f532aa3b-dd2e-52ab-aa53-9c3ca3bafb49'::uuid, '3101020003200300', 'PULAU HARAPAN', 'PULAU TONDAN TIMUR')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('855d6a36-0e33-5010-9ce7-b1fce33db552'::uuid, '3101020003200400', 'PULAU HARAPAN', 'PULAU TONDAN BARAT')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('a526e7d7-5e48-5d01-a4a7-01831c0e7bc3'::uuid, '3101020003200500', 'PULAU HARAPAN', 'PULAU PUTRI TIMUR')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('0c1d6532-0c3f-5f28-9776-e2d679a9cb69'::uuid, '3101020003200600', 'PULAU HARAPAN', 'PULAU BIRA BESAR')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('b8af3ed2-7d44-50f6-b09f-74b4437a2098'::uuid, '3101020003200700', 'PULAU HARAPAN', 'PULAU BIRA KECIL')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('8effda8f-bc70-5ac2-94eb-e96057521621'::uuid, '3101020003200800', 'PULAU HARAPAN', 'PULAU BELANDA')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('44ac0351-9310-5beb-bb2f-bd9fe87e43ae'::uuid, '3101020003200900', 'PULAU HARAPAN', 'PULAU KUBURAN CINA/ROSA')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('fd3a7df5-12e4-545b-b651-dd81b05055e6'::uuid, '3101020003201000', 'PULAU HARAPAN', 'PULAU PEMAGARAN')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('1b3630dc-1e33-583f-b7a0-141e46b50d7b'::uuid, '3101020003201100', 'PULAU HARAPAN', 'PULAU DUA BARAT')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('d09cfe7e-e282-55a2-9541-dd58e5f183cc'::uuid, '3101020003201200', 'PULAU HARAPAN', 'PULAU DUA TIMUR')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('8a7493f3-fcba-5fb6-a403-4f1ee26f2a4c'::uuid, '3101020003201300', 'PULAU HARAPAN', 'PULAU PETELORAN TIMUR')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('05416b8e-c77b-5122-a8d7-5121addf4ec8'::uuid, '3101020003201400', 'PULAU HARAPAN', 'PULAU PETELORAN BARAT')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('824ae6f7-cd15-5cde-aae3-deedf8e5e2fa'::uuid, '3101020003201500', 'PULAU HARAPAN', 'PULAU PENJALIRAN TIMUR')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('ad14b9e4-92c9-596e-ae64-67eccdfd0e46'::uuid, '3101020003201600', 'PULAU HARAPAN', 'PULAU PENJALIRAN BARAT')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('16c2572b-e2b9-5874-99f7-7a93a880e386'::uuid, '3101020003201700', 'PULAU HARAPAN', 'PULAU NYAMPLONG')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('5e72f778-1ae6-5564-beca-39542f302ff7'::uuid, '3101020003201800', 'PULAU HARAPAN', 'PULAU REGIT')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('505e5d86-f3bc-5bd8-ab27-cc6baedba6e6'::uuid, '3101020003201900', 'PULAU HARAPAN', 'PULAU SEBARU BESAR')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('3e848cf3-f53d-5d3b-a7ee-609277e0b1a6'::uuid, '3101020003202000', 'PULAU HARAPAN', 'PULAU GUSUNG LAGA BESAR')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('aaffe05f-6557-5b96-8ba3-ab35c605119a'::uuid, '3101020003202100', 'PULAU HARAPAN', 'PULAU GUSUNG LAGA KECIL')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();
insert into public.fasih_regions (id, region_code, island_name, region_name)
values ('3065bf79-9764-5f45-b6c6-66f4e7c8013c'::uuid, '3101020003502200', 'PULAU HARAPAN', 'PULAU PABELOKAN')
on conflict (id) do update set
  region_code = excluded.region_code,
  island_name = excluded.island_name,
  region_name = excluded.region_name,
  updated_at = now();

-- 3. ASSIGNMENTS + STATUS
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('79251170-6955-51bd-b789-e3769fc05fc0'::uuid, 'b86f987f-1293-5a29-a357-069258b662c5'::uuid, '13c33a9c-ccbf-5dff-b7e3-ad1f717d4b32'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('79251170-6955-51bd-b789-e3769fc05fc0'::uuid, 179, 87, 52, 20, 17, 3, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('3aad7d95-1fcf-5c3a-8975-8b55891f6daf'::uuid, 'cd090783-eb6b-5963-b48d-0101364fd48e'::uuid, '13c33a9c-ccbf-5dff-b7e3-ad1f717d4b32'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('3aad7d95-1fcf-5c3a-8975-8b55891f6daf'::uuid, 100, 85, 7, 0, 0, 6, 2, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('a504387f-fb6b-5b8e-9cf0-cc1d2b17c7b6'::uuid, 'ea10b6f6-9dd0-56c0-826e-63dfc23c014e'::uuid, '13c33a9c-ccbf-5dff-b7e3-ad1f717d4b32'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('a504387f-fb6b-5b8e-9cf0-cc1d2b17c7b6'::uuid, 90, 64, 19, 1, 3, 3, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('0915d5a6-1fa4-57bb-94dd-7bdec2d1617e'::uuid, '7ec06052-c4f4-51ae-b187-ae625cbe1073'::uuid, '13c33a9c-ccbf-5dff-b7e3-ad1f717d4b32'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('0915d5a6-1fa4-57bb-94dd-7bdec2d1617e'::uuid, 83, 0, 0, 82, 1, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('fc865ef0-ba43-560c-981a-6cdd192ca52a'::uuid, '5a0f5879-6d79-50f8-a13f-e319b0448681'::uuid, '13c33a9c-ccbf-5dff-b7e3-ad1f717d4b32'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('fc865ef0-ba43-560c-981a-6cdd192ca52a'::uuid, 82, 0, 1, 80, 1, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('3dcf180f-4555-54b7-92a6-03c031ac1e8d'::uuid, 'c920bd6e-41a5-5bf6-9bbd-92b864840c96'::uuid, '13c33a9c-ccbf-5dff-b7e3-ad1f717d4b32'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('3dcf180f-4555-54b7-92a6-03c031ac1e8d'::uuid, 59, 0, 0, 58, 1, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('bb08daaa-3f22-5317-bec1-56af4431808b'::uuid, '8ec8b0e4-fe63-519e-a43e-e739f06f256c'::uuid, '13c33a9c-ccbf-5dff-b7e3-ad1f717d4b32'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('bb08daaa-3f22-5317-bec1-56af4431808b'::uuid, 45, 0, 0, 45, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('6018a690-e66e-50d7-8b58-d775f9d89f0e'::uuid, 'deae20c7-e450-5b6b-805f-ccf42018b125'::uuid, '13c33a9c-ccbf-5dff-b7e3-ad1f717d4b32'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('6018a690-e66e-50d7-8b58-d775f9d89f0e'::uuid, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('458907e0-1ed3-5eeb-96d1-ff793103c72b'::uuid, 'eabf4c8f-7c2f-5d00-b837-9167873aa7ac'::uuid, '13c33a9c-ccbf-5dff-b7e3-ad1f717d4b32'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('458907e0-1ed3-5eeb-96d1-ff793103c72b'::uuid, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('e5f388f2-5b3b-5391-a4f2-541548a1691c'::uuid, 'c2d47767-b1a3-5835-9297-79e4c03a5cee'::uuid, '13c33a9c-ccbf-5dff-b7e3-ad1f717d4b32'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('e5f388f2-5b3b-5391-a4f2-541548a1691c'::uuid, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('da13b6e9-0c2a-5175-9fa5-37de59f1540e'::uuid, '636a153a-c653-549b-a63a-f1fe70fa2255'::uuid, 'b1035dd8-732a-5b67-9f85-177b7a556b62'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('da13b6e9-0c2a-5175-9fa5-37de59f1540e'::uuid, 225, 151, 0, 7, 67, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('7b44cf2b-32ba-5984-8bbf-e13e3872c79f'::uuid, 'c763fa4e-e630-524b-843d-a2769be4ea12'::uuid, 'b1035dd8-732a-5b67-9f85-177b7a556b62'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('7b44cf2b-32ba-5984-8bbf-e13e3872c79f'::uuid, 116, 64, 0, 4, 44, 0, 3, 1, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('bd4d1550-c7e2-5bff-bb8c-7dbe1651d75e'::uuid, '60ae2f79-f630-5545-ba65-e76400355d73'::uuid, 'b1035dd8-732a-5b67-9f85-177b7a556b62'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('bd4d1550-c7e2-5bff-bb8c-7dbe1651d75e'::uuid, 82, 78, 0, 3, 1, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('ed94342e-3af4-5f8f-8e9d-7af77f300ea1'::uuid, '8c408892-9ef3-51d4-b82c-e2aa2b313bff'::uuid, 'b1035dd8-732a-5b67-9f85-177b7a556b62'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('ed94342e-3af4-5f8f-8e9d-7af77f300ea1'::uuid, 80, 79, 0, 0, 0, 0, 1, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('6654f6a9-e9bd-5ccf-81b7-353e48623c24'::uuid, '0dfb78c1-173a-533b-b59d-6eb587b6ce75'::uuid, 'b1035dd8-732a-5b67-9f85-177b7a556b62'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('6654f6a9-e9bd-5ccf-81b7-353e48623c24'::uuid, 70, 0, 0, 67, 3, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('1b160ea8-baac-5435-816d-96f0285bb1cd'::uuid, '2506941f-6b4f-5041-9a43-6363f6f0a2ad'::uuid, 'b1035dd8-732a-5b67-9f85-177b7a556b62'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('1b160ea8-baac-5435-816d-96f0285bb1cd'::uuid, 49, 48, 0, 0, 0, 0, 1, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('6a7d2046-d035-53cd-b0a2-6851bb6f681b'::uuid, '407ce7e5-c9fc-5c79-bcb8-2dfb97cf5382'::uuid, '94d2a9ee-8670-5244-8dab-e02081cc8204'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('6a7d2046-d035-53cd-b0a2-6851bb6f681b'::uuid, 295, 244, 2, 0, 49, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('11433992-79d1-5d7d-b443-2a7d60164e90'::uuid, 'd35721ec-ef6b-5f6c-a0e9-fad37bd2fb21'::uuid, '94d2a9ee-8670-5244-8dab-e02081cc8204'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('11433992-79d1-5d7d-b443-2a7d60164e90'::uuid, 178, 0, 0, 178, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('4053bb05-e404-5194-8638-cfbe6dbcc02d'::uuid, '639f01d2-808b-50dd-8714-5505cc797525'::uuid, '94d2a9ee-8670-5244-8dab-e02081cc8204'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('4053bb05-e404-5194-8638-cfbe6dbcc02d'::uuid, 127, 17, 2, 0, 108, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('5e1f5fe5-1db2-5572-a818-1cd4530950a9'::uuid, 'b8528293-e683-5c4f-b9df-e5a2a0e47ce0'::uuid, '94d2a9ee-8670-5244-8dab-e02081cc8204'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('5e1f5fe5-1db2-5572-a818-1cd4530950a9'::uuid, 121, 0, 9, 31, 81, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('5a6a6538-a96b-5771-913f-100f3764544d'::uuid, 'bba5c36b-2e97-5d57-b3e2-23bcbaf6116d'::uuid, '94d2a9ee-8670-5244-8dab-e02081cc8204'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('5a6a6538-a96b-5771-913f-100f3764544d'::uuid, 112, 106, 2, 2, 1, 0, 0, 0, 1, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('dfb50374-7d60-5c89-b92a-6f726331d945'::uuid, '80fbe781-4c3e-57b2-a564-9a7781a61fab'::uuid, '94d2a9ee-8670-5244-8dab-e02081cc8204'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('dfb50374-7d60-5c89-b92a-6f726331d945'::uuid, 3, 0, 0, 3, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('c067b3de-af0f-56ad-97f7-e5ee34bd6e27'::uuid, '363de533-87c7-549a-a804-157b4e4524ee'::uuid, '94d2a9ee-8670-5244-8dab-e02081cc8204'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('c067b3de-af0f-56ad-97f7-e5ee34bd6e27'::uuid, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('ebc865c7-184e-5e8e-8f53-3e1a42a2c9af'::uuid, 'c6fccac9-74dc-5060-bbad-2805324b7146'::uuid, '94d2a9ee-8670-5244-8dab-e02081cc8204'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('ebc865c7-184e-5e8e-8f53-3e1a42a2c9af'::uuid, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('351280ae-78ee-553d-9fa9-ee58fcc54253'::uuid, 'e133fe26-5b16-5ff2-b5fd-8d10de046c30'::uuid, '94d2a9ee-8670-5244-8dab-e02081cc8204'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('351280ae-78ee-553d-9fa9-ee58fcc54253'::uuid, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('77b2ab16-5166-5af7-821b-6ea9c3bfafbf'::uuid, '9392c0c0-9ee3-51de-9405-44dadc4c239c'::uuid, '94d2a9ee-8670-5244-8dab-e02081cc8204'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('77b2ab16-5166-5af7-821b-6ea9c3bfafbf'::uuid, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('e3b7c4f1-84ca-5df2-ba2f-eb52cbf5d3cf'::uuid, 'b56a77e7-99ec-565f-aa15-c47c8f991fca'::uuid, '73746725-fc63-5247-bf9a-e753cb092a20'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('e3b7c4f1-84ca-5df2-ba2f-eb52cbf5d3cf'::uuid, 133, 33, 0, 0, 98, 1, 0, 0, 0, 1)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('e5e3d60d-b6a7-5955-b303-ac058ff52029'::uuid, 'cdab2d56-7852-5bfe-bf9f-f1cf915a5a3c'::uuid, '73746725-fc63-5247-bf9a-e753cb092a20'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('e5e3d60d-b6a7-5955-b303-ac058ff52029'::uuid, 122, 0, 26, 6, 90, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('2bd12836-33fe-5138-9b2f-746ea5856d29'::uuid, 'a6347104-b855-5a11-8a60-190a165f7883'::uuid, '73746725-fc63-5247-bf9a-e753cb092a20'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('2bd12836-33fe-5138-9b2f-746ea5856d29'::uuid, 104, 0, 4, 98, 1, 1, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('a93513a0-8414-56ff-8912-3e57f65b8931'::uuid, '95868673-5f83-5947-8adb-1affeac2b7af'::uuid, '73746725-fc63-5247-bf9a-e753cb092a20'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('a93513a0-8414-56ff-8912-3e57f65b8931'::uuid, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('f78a7b98-b6eb-50f8-a80e-f3d4b26ecb38'::uuid, 'bb60cea6-e28e-5e6b-83e2-289ff743b826'::uuid, '73746725-fc63-5247-bf9a-e753cb092a20'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('f78a7b98-b6eb-50f8-a80e-f3d4b26ecb38'::uuid, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('fac98301-04aa-5ce7-9199-b1dfe772012b'::uuid, 'ee2a47a2-80bd-5625-86f8-27dd296e4d94'::uuid, '0edcb8a2-e6a6-5b09-ab78-53c5a5b06101'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('fac98301-04aa-5ce7-9199-b1dfe772012b'::uuid, 235, 7, 0, 56, 172, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('d9ee2e7f-a02f-5931-81b0-470917b834af'::uuid, 'b1798335-3e90-510f-a1b7-23564f16d5dc'::uuid, '0edcb8a2-e6a6-5b09-ab78-53c5a5b06101'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('d9ee2e7f-a02f-5931-81b0-470917b834af'::uuid, 152, 36, 0, 14, 102, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('2b673508-d791-50aa-951f-a66af9861b21'::uuid, '3b6f3939-1298-535a-87d4-cec2790db2ba'::uuid, '0edcb8a2-e6a6-5b09-ab78-53c5a5b06101'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('2b673508-d791-50aa-951f-a66af9861b21'::uuid, 109, 0, 0, 109, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('63b5883b-3d33-5e2a-8563-4c307f7eb7d9'::uuid, '5d0cb886-6390-56e8-a87f-682832bfbaf7'::uuid, '0edcb8a2-e6a6-5b09-ab78-53c5a5b06101'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('63b5883b-3d33-5e2a-8563-4c307f7eb7d9'::uuid, 100, 26, 0, 5, 45, 24, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('c5d888c9-ab7b-5887-96c6-159d723bd55d'::uuid, 'd5e3c2d2-0d0a-5c7d-bd2a-c75fde6003f7'::uuid, '0edcb8a2-e6a6-5b09-ab78-53c5a5b06101'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('c5d888c9-ab7b-5887-96c6-159d723bd55d'::uuid, 3, 0, 0, 2, 0, 0, 0, 0, 1, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('bf62abc6-6abd-5aa2-9445-dfe172182930'::uuid, 'f2201e20-4857-5c8f-9560-0a55d476ff27'::uuid, '0edcb8a2-e6a6-5b09-ab78-53c5a5b06101'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('bf62abc6-6abd-5aa2-9445-dfe172182930'::uuid, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('0843e791-c80d-5d37-a1ff-c2d51a2209dd'::uuid, '78774f30-1368-59ed-817d-bbc6db7be041'::uuid, '0edcb8a2-e6a6-5b09-ab78-53c5a5b06101'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('0843e791-c80d-5d37-a1ff-c2d51a2209dd'::uuid, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('5390d31f-b339-52e6-8a5e-c85dbbca0195'::uuid, '49b16afc-29b2-5176-aaf8-1084275df57d'::uuid, '0edcb8a2-e6a6-5b09-ab78-53c5a5b06101'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('5390d31f-b339-52e6-8a5e-c85dbbca0195'::uuid, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('3650c69d-f315-580a-8301-4daeee69559c'::uuid, 'd2c4a4c2-145d-546c-927e-01bf9ee94b23'::uuid, '0edcb8a2-e6a6-5b09-ab78-53c5a5b06101'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('3650c69d-f315-580a-8301-4daeee69559c'::uuid, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('d43f057d-3026-5f23-9571-4803a50bdee4'::uuid, '06300fd3-cbc4-5075-b81a-d0b75ec824bc'::uuid, '93add754-d76f-5b72-9fb3-23071e48d5aa'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('d43f057d-3026-5f23-9571-4803a50bdee4'::uuid, 183, 130, 1, 0, 51, 0, 1, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('84cab4b3-2e43-5659-b309-5d628254eb03'::uuid, 'ad67c6a8-3980-5cd3-911a-db840ae82a82'::uuid, '93add754-d76f-5b72-9fb3-23071e48d5aa'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('84cab4b3-2e43-5659-b309-5d628254eb03'::uuid, 90, 26, 11, 41, 12, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('ad7a9ff3-46f1-5c41-80bf-394d377969fb'::uuid, '092b70f8-73fc-5c41-8e9b-5356482919f0'::uuid, '93add754-d76f-5b72-9fb3-23071e48d5aa'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('ad7a9ff3-46f1-5c41-80bf-394d377969fb'::uuid, 83, 61, 1, 0, 18, 3, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('5499c29c-68c2-5c7a-9b13-bbccddc83bd6'::uuid, '4d0a1fcb-53f7-5c70-81e3-477f3e7d330f'::uuid, '93add754-d76f-5b72-9fb3-23071e48d5aa'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('5499c29c-68c2-5c7a-9b13-bbccddc83bd6'::uuid, 72, 0, 0, 72, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('054dc019-54a0-57c1-9686-c09ec37cb1b4'::uuid, '3770b20f-0754-5461-9f63-4b0c4dea025b'::uuid, '93add754-d76f-5b72-9fb3-23071e48d5aa'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('054dc019-54a0-57c1-9686-c09ec37cb1b4'::uuid, 66, 64, 1, 0, 1, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('58bf12b6-9feb-5f25-8107-601943356c9b'::uuid, '6770ce16-3e4d-5813-a6d5-47f6a605e59a'::uuid, '93add754-d76f-5b72-9fb3-23071e48d5aa'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('58bf12b6-9feb-5f25-8107-601943356c9b'::uuid, 13, 13, 0, 0, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('f891e061-29fa-5107-8ad3-c71be96e3b4c'::uuid, '040b99d3-8dce-5e5f-9be7-0833d14e236a'::uuid, '93add754-d76f-5b72-9fb3-23071e48d5aa'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('f891e061-29fa-5107-8ad3-c71be96e3b4c'::uuid, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('62b28f31-af9f-5c8b-a11a-4381e92dd6ea'::uuid, 'dd83ed14-e8b0-52d5-ac49-83c611da868d'::uuid, '124e7a39-1c2a-5111-a88c-bf017dbe19e9'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('62b28f31-af9f-5c8b-a11a-4381e92dd6ea'::uuid, 169, 89, 17, 1, 59, 3, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('bd324a63-7c08-5b78-bd1e-18445335a28c'::uuid, 'e9ad76d2-b39a-593c-8178-49c83700a459'::uuid, '124e7a39-1c2a-5111-a88c-bf017dbe19e9'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('bd324a63-7c08-5b78-bd1e-18445335a28c'::uuid, 93, 44, 19, 5, 25, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('7e63492f-5ede-5dc2-95ea-a9a4f80c2590'::uuid, 'ce5ff95c-2f06-5e0f-b7ff-2846a64694a3'::uuid, '124e7a39-1c2a-5111-a88c-bf017dbe19e9'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('7e63492f-5ede-5dc2-95ea-a9a4f80c2590'::uuid, 84, 61, 12, 0, 10, 0, 0, 1, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('97859540-ea0a-5d1f-a8c7-05c4b95afa43'::uuid, '2b4d8f18-57d2-5fc9-9bec-017a0c2d5634'::uuid, '124e7a39-1c2a-5111-a88c-bf017dbe19e9'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('97859540-ea0a-5d1f-a8c7-05c4b95afa43'::uuid, 71, 0, 0, 70, 1, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('d579bfd3-e354-518a-9a91-d2239e8530f5'::uuid, '5fc0a421-288f-5339-a54b-a2d0706aa36d'::uuid, '124e7a39-1c2a-5111-a88c-bf017dbe19e9'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('d579bfd3-e354-518a-9a91-d2239e8530f5'::uuid, 61, 60, 1, 0, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('16426de6-6e2b-57b4-8ef8-fb4ec270e2a3'::uuid, 'fc4b29e5-a852-59da-beb1-f5fba7478523'::uuid, '124e7a39-1c2a-5111-a88c-bf017dbe19e9'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('16426de6-6e2b-57b4-8ef8-fb4ec270e2a3'::uuid, 52, 7, 0, 41, 4, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('96d759e7-1055-5dde-aa61-7f489294125c'::uuid, '03fbe37e-250c-5e7f-bc9a-08b71929f907'::uuid, '124e7a39-1c2a-5111-a88c-bf017dbe19e9'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('96d759e7-1055-5dde-aa61-7f489294125c'::uuid, 38, 0, 0, 38, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('f02aea56-1dcd-503b-88fc-178007e77c70'::uuid, '958e16f4-03e5-52c4-a82a-7e18a18ac8de'::uuid, '124e7a39-1c2a-5111-a88c-bf017dbe19e9'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('f02aea56-1dcd-503b-88fc-178007e77c70'::uuid, 16, 0, 0, 16, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('d62827e7-d329-55d9-966e-f89cf637c15f'::uuid, 'b8beed50-944a-52fe-901c-05e7a597d237'::uuid, '124e7a39-1c2a-5111-a88c-bf017dbe19e9'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('d62827e7-d329-55d9-966e-f89cf637c15f'::uuid, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('915fbdd0-f5f3-58a6-8567-1cedceda356e'::uuid, 'cf7193bc-7c1d-5c6f-88bd-285165371a13'::uuid, '124e7a39-1c2a-5111-a88c-bf017dbe19e9'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('915fbdd0-f5f3-58a6-8567-1cedceda356e'::uuid, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('8d6ca97b-67b7-526d-8628-9797c64cc73d'::uuid, '458555cb-440a-552f-8987-0dabfa25fe28'::uuid, 'f0286bc4-e90f-5aa8-89d4-490899fde7df'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('8d6ca97b-67b7-526d-8628-9797c64cc73d'::uuid, 90, 89, 0, 0, 0, 0, 1, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('6048106f-c188-553b-b13a-3b65015614f3'::uuid, '909dbff0-296a-5c68-8561-e38420cf73f7'::uuid, 'f0286bc4-e90f-5aa8-89d4-490899fde7df'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('6048106f-c188-553b-b13a-3b65015614f3'::uuid, 88, 80, 5, 0, 2, 1, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('248d641a-f8a1-5858-9cf3-0803bdb24810'::uuid, '29e29fff-47ec-5b74-a947-4325d88e9b65'::uuid, 'f0286bc4-e90f-5aa8-89d4-490899fde7df'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('248d641a-f8a1-5858-9cf3-0803bdb24810'::uuid, 79, 0, 0, 79, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('49e8e232-7103-562d-ad18-90a424aab36a'::uuid, 'f29e918f-bed0-58db-a460-471e19bf991c'::uuid, 'f0286bc4-e90f-5aa8-89d4-490899fde7df'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('49e8e232-7103-562d-ad18-90a424aab36a'::uuid, 78, 0, 0, 78, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('815bb0c8-8edd-5072-8246-59e37370650a'::uuid, '08d4baaf-e4f6-5f5f-8ba6-17ff8a32231e'::uuid, 'f0286bc4-e90f-5aa8-89d4-490899fde7df'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('815bb0c8-8edd-5072-8246-59e37370650a'::uuid, 64, 42, 19, 3, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('c996053f-5a0f-532e-93ab-e06bc98e9a67'::uuid, '31a39677-88f5-5a76-ba6c-1e88c5f43007'::uuid, 'f0286bc4-e90f-5aa8-89d4-490899fde7df'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('c996053f-5a0f-532e-93ab-e06bc98e9a67'::uuid, 61, 12, 31, 18, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('38b5084c-8db1-5179-b29d-5305b4661525'::uuid, 'ad14b9e4-92c9-596e-ae64-67eccdfd0e46'::uuid, 'f0286bc4-e90f-5aa8-89d4-490899fde7df'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('38b5084c-8db1-5179-b29d-5305b4661525'::uuid, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('436a3a75-fe83-5bed-9251-b5e8847ebd81'::uuid, '16c2572b-e2b9-5874-99f7-7a93a880e386'::uuid, 'f0286bc4-e90f-5aa8-89d4-490899fde7df'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('436a3a75-fe83-5bed-9251-b5e8847ebd81'::uuid, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('358af16f-199c-5b4d-a5b4-a31d078fa4c9'::uuid, '5e72f778-1ae6-5564-beca-39542f302ff7'::uuid, 'f0286bc4-e90f-5aa8-89d4-490899fde7df'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('358af16f-199c-5b4d-a5b4-a31d078fa4c9'::uuid, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('6707a7a0-71b8-5479-9a1e-899323ce8dbc'::uuid, '505e5d86-f3bc-5bd8-ab27-cc6baedba6e6'::uuid, 'f0286bc4-e90f-5aa8-89d4-490899fde7df'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('6707a7a0-71b8-5479-9a1e-899323ce8dbc'::uuid, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('b02097f9-4253-531a-a421-c0e7b622aa02'::uuid, '3e848cf3-f53d-5d3b-a7ee-609277e0b1a6'::uuid, 'f0286bc4-e90f-5aa8-89d4-490899fde7df'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('b02097f9-4253-531a-a421-c0e7b622aa02'::uuid, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('b462333b-37e4-546a-ab8c-b7760ed85600'::uuid, 'aaffe05f-6557-5b96-8ba3-ab35c605119a'::uuid, 'f0286bc4-e90f-5aa8-89d4-490899fde7df'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('b462333b-37e4-546a-ab8c-b7760ed85600'::uuid, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('14d3b91a-2253-57ce-88e6-28960c6c7452'::uuid, 'a0e38e19-f5fa-5c5c-bf5d-d0b36ad2bd1d'::uuid, '6a32904f-13d6-50a4-9a4e-47bba000a581'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('14d3b91a-2253-57ce-88e6-28960c6c7452'::uuid, 229, 226, 2, 1, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('96c57e63-ddc6-5b47-8555-ea52a3c3782c'::uuid, '582f0b79-877c-597e-b996-2185d1ae83ef'::uuid, '6a32904f-13d6-50a4-9a4e-47bba000a581'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('96c57e63-ddc6-5b47-8555-ea52a3c3782c'::uuid, 109, 35, 46, 26, 0, 1, 0, 0, 1, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('cd16f1b0-4550-519f-bfb8-3fe93b3199a7'::uuid, '61461240-6616-5305-8c2e-a213d5a5e4a5'::uuid, '6a32904f-13d6-50a4-9a4e-47bba000a581'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('cd16f1b0-4550-519f-bfb8-3fe93b3199a7'::uuid, 83, 0, 3, 80, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('6597857f-69bf-54bf-9e9e-6aef66a6d6fb'::uuid, 'df48c219-2055-5a07-91f5-e14020c8fcf1'::uuid, '6a32904f-13d6-50a4-9a4e-47bba000a581'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('6597857f-69bf-54bf-9e9e-6aef66a6d6fb'::uuid, 65, 11, 44, 10, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('a721c3f9-16f2-5e78-b52c-0cfad275b13c'::uuid, '4d1f436e-75c0-5626-9721-c3da411815d5'::uuid, '6a32904f-13d6-50a4-9a4e-47bba000a581'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('a721c3f9-16f2-5e78-b52c-0cfad275b13c'::uuid, 65, 53, 0, 0, 0, 0, 12, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('41d77a2d-c911-5a59-b099-955e8f45f1a1'::uuid, 'a20b3512-49bc-53a0-8d94-d5cb1ef82b82'::uuid, '6a32904f-13d6-50a4-9a4e-47bba000a581'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('41d77a2d-c911-5a59-b099-955e8f45f1a1'::uuid, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('925effe0-14b1-5dd7-89a6-c903d911fd23'::uuid, '7e1adaab-62aa-5749-8c8f-686e87e049e2'::uuid, '6a32904f-13d6-50a4-9a4e-47bba000a581'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('925effe0-14b1-5dd7-89a6-c903d911fd23'::uuid, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('9d18129c-d05c-59e2-9a70-b24c45c020ce'::uuid, '64641d57-f207-5c23-9601-79b6d652ab84'::uuid, '6a32904f-13d6-50a4-9a4e-47bba000a581'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('9d18129c-d05c-59e2-9a70-b24c45c020ce'::uuid, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('df182300-56d5-57ab-9a72-a7a4df15093f'::uuid, '70445a91-7010-5b45-90b4-501a1f33e8b5'::uuid, 'a7256d1e-6dd2-561a-a3ea-dfc2872849e4'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('df182300-56d5-57ab-9a72-a7a4df15093f'::uuid, 257, 206, 1, 42, 8, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('5085a1f6-7ba6-51ec-b73d-c7110ffd41b3'::uuid, '80ea32bd-add8-5003-bbd8-5aaedabb621d'::uuid, 'a7256d1e-6dd2-561a-a3ea-dfc2872849e4'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('5085a1f6-7ba6-51ec-b73d-c7110ffd41b3'::uuid, 132, 124, 0, 3, 4, 1, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('f33857a3-8328-57aa-9087-cb8b2c156a0f'::uuid, '2e498a92-4d0c-520b-9b4a-65ec7de21679'::uuid, 'a7256d1e-6dd2-561a-a3ea-dfc2872849e4'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('f33857a3-8328-57aa-9087-cb8b2c156a0f'::uuid, 96, 95, 0, 0, 1, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('30f514de-2c3a-587f-9524-d5058bca0b04'::uuid, '59037129-c931-51be-bfb4-4d8eecbf3476'::uuid, 'a7256d1e-6dd2-561a-a3ea-dfc2872849e4'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('30f514de-2c3a-587f-9524-d5058bca0b04'::uuid, 83, 69, 0, 0, 0, 0, 14, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('37b28b6f-b600-5ff6-bbe7-7116f0e4302c'::uuid, 'd08a7faa-8c58-56bf-9f98-354273afcb2b'::uuid, 'a7256d1e-6dd2-561a-a3ea-dfc2872849e4'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('37b28b6f-b600-5ff6-bbe7-7116f0e4302c'::uuid, 81, 0, 0, 81, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('d1cba2b1-8fba-5fa6-9f84-e0d9721f30f5'::uuid, 'ad81c9b5-a5bf-5063-b804-1dfb9b2b9253'::uuid, 'a7256d1e-6dd2-561a-a3ea-dfc2872849e4'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('d1cba2b1-8fba-5fa6-9f84-e0d9721f30f5'::uuid, 57, 55, 0, 0, 0, 0, 2, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('17e7d534-9ea9-51d8-87e5-9b7f535a9a2f'::uuid, '354035dd-2a8d-5b33-90b3-a9a2baef8d75'::uuid, 'a7256d1e-6dd2-561a-a3ea-dfc2872849e4'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('17e7d534-9ea9-51d8-87e5-9b7f535a9a2f'::uuid, 51, 43, 0, 1, 1, 4, 2, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('5a682182-6d28-53e0-b8ab-ee34a1a2557a'::uuid, '1d5050ac-8a57-5f2a-b045-53e1deb2469d'::uuid, '6a61f534-1e2c-5457-8d5b-711f92170777'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('5a682182-6d28-53e0-b8ab-ee34a1a2557a'::uuid, 152, 63, 5, 57, 27, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('1ad79497-85f8-513b-8035-2c88bfe5909d'::uuid, '99eb1f5b-37a9-5fff-a82b-dd47f9ff8ec1'::uuid, '6a61f534-1e2c-5457-8d5b-711f92170777'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('1ad79497-85f8-513b-8035-2c88bfe5909d'::uuid, 122, 22, 0, 91, 9, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('45c785e4-fca8-531f-874e-aa1c417d30c2'::uuid, 'b5bcdac3-cd82-50e7-b1ab-1dfb83d5e46c'::uuid, '6a61f534-1e2c-5457-8d5b-711f92170777'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('45c785e4-fca8-531f-874e-aa1c417d30c2'::uuid, 112, 106, 0, 0, 2, 0, 4, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('3d045e22-2422-5b84-9678-f3c4db958c4d'::uuid, '67818a9f-d1d3-5d91-b072-888706e1a185'::uuid, '6a61f534-1e2c-5457-8d5b-711f92170777'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('3d045e22-2422-5b84-9678-f3c4db958c4d'::uuid, 110, 103, 0, 0, 7, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('6494c820-8bbb-5ebd-a6e8-c7479e22a650'::uuid, '402750b1-69f9-5334-ab93-5b8d6614819a'::uuid, '6a61f534-1e2c-5457-8d5b-711f92170777'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('6494c820-8bbb-5ebd-a6e8-c7479e22a650'::uuid, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('fe1a0dce-10ad-50c8-b6bd-682cd4cc969f'::uuid, 'f692c736-703c-5bd5-99cf-180cf14bcb29'::uuid, '6a61f534-1e2c-5457-8d5b-711f92170777'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('fe1a0dce-10ad-50c8-b6bd-682cd4cc969f'::uuid, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('a0cfc693-6cff-5c39-b962-20094ac025cf'::uuid, '557b29cb-0aa0-5df5-ade3-e89238f44d64'::uuid, '537f5c2a-96a8-5e77-bfc3-ca5f2e79031a'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('a0cfc693-6cff-5c39-b962-20094ac025cf'::uuid, 183, 0, 33, 134, 16, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('127e959c-3c11-5d91-8de9-678f1afec4ea'::uuid, '18936cf0-0ac6-5b6f-a90f-011fc5215aa2'::uuid, '537f5c2a-96a8-5e77-bfc3-ca5f2e79031a'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('127e959c-3c11-5d91-8de9-678f1afec4ea'::uuid, 115, 26, 4, 3, 82, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('f6f1eda6-977e-5ccd-aad7-b5cdccbab5f7'::uuid, '163c8461-f971-5045-92a8-84e706e3ac8f'::uuid, '537f5c2a-96a8-5e77-bfc3-ca5f2e79031a'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('f6f1eda6-977e-5ccd-aad7-b5cdccbab5f7'::uuid, 83, 69, 2, 2, 0, 9, 1, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('dc956f26-086b-5e6e-9f31-c5799c1442bb'::uuid, '36ffca11-4de7-5b20-bfbb-6c409979ba0b'::uuid, '537f5c2a-96a8-5e77-bfc3-ca5f2e79031a'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('dc956f26-086b-5e6e-9f31-c5799c1442bb'::uuid, 77, 46, 3, 2, 26, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('59f48d26-931f-5895-a75f-05c99ecdcecd'::uuid, '91766e16-3b37-583b-baba-6778bfeba13a'::uuid, '537f5c2a-96a8-5e77-bfc3-ca5f2e79031a'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('59f48d26-931f-5895-a75f-05c99ecdcecd'::uuid, 61, 38, 0, 7, 16, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('a1abe064-04ff-5551-a451-1db621d81030'::uuid, 'f36266a9-9f02-552e-9221-cd8fe10fc653'::uuid, '537f5c2a-96a8-5e77-bfc3-ca5f2e79031a'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('a1abe064-04ff-5551-a451-1db621d81030'::uuid, 55, 40, 1, 2, 12, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('935c2ca2-d322-587b-95c0-a030bff4d61d'::uuid, '360305ca-ff1d-5544-beda-2ddf142ad74f'::uuid, '39506e9e-d348-5610-bd69-7080c50b78cf'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('935c2ca2-d322-587b-95c0-a030bff4d61d'::uuid, 266, 123, 1, 131, 11, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('846268e2-c85a-5ded-910a-c6512eff177c'::uuid, '8cba506f-c472-54eb-959b-4833a975a4ba'::uuid, '39506e9e-d348-5610-bd69-7080c50b78cf'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('846268e2-c85a-5ded-910a-c6512eff177c'::uuid, 243, 108, 21, 43, 70, 1, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('b4bb8007-d451-5554-a045-d721c3513a13'::uuid, '5aa69024-44d8-58f8-8a00-843d047d6ef1'::uuid, '39506e9e-d348-5610-bd69-7080c50b78cf'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('b4bb8007-d451-5554-a045-d721c3513a13'::uuid, 164, 0, 0, 164, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('701e2cda-77f7-5100-8f7a-6d90ac26d3cb'::uuid, '43efb457-99db-53a6-8699-56778026380f'::uuid, '39506e9e-d348-5610-bd69-7080c50b78cf'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('701e2cda-77f7-5100-8f7a-6d90ac26d3cb'::uuid, 99, 57, 3, 0, 26, 13, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('45cdb370-eb9a-596f-b244-cc8981c9a916'::uuid, '45214fc4-ea7f-50c1-a284-580b650bc029'::uuid, '39506e9e-d348-5610-bd69-7080c50b78cf'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('45cdb370-eb9a-596f-b244-cc8981c9a916'::uuid, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('e10a41fd-eb93-58e2-a675-010368641325'::uuid, 'c703fdf7-79b0-517c-a858-687fcdaa095e'::uuid, '39506e9e-d348-5610-bd69-7080c50b78cf'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('e10a41fd-eb93-58e2-a675-010368641325'::uuid, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('0566a9db-8e01-5b27-bdae-62f1668533c0'::uuid, 'cf8d1352-2bf6-5ea8-8473-e8a16946915a'::uuid, '39506e9e-d348-5610-bd69-7080c50b78cf'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('0566a9db-8e01-5b27-bdae-62f1668533c0'::uuid, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('2b349d19-deec-53e2-a068-6e3cfaaf03ab'::uuid, '972fd1da-8ad0-5f15-8a2f-a478938902d7'::uuid, '6894f3fb-d92a-5fbe-9436-d89ffd699243'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('2b349d19-deec-53e2-a068-6e3cfaaf03ab'::uuid, 240, 87, 0, 15, 138, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('f7f22e74-99d5-53d0-8828-61b35cec5070'::uuid, 'b1749c3a-a9fb-5e2e-875b-c48f359adfaf'::uuid, '6894f3fb-d92a-5fbe-9436-d89ffd699243'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('f7f22e74-99d5-53d0-8828-61b35cec5070'::uuid, 92, 45, 0, 0, 47, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('df6477ba-e80f-5b70-bad8-4e6486994849'::uuid, 'acac49eb-3a0a-50ca-bae6-4e0ec68cb8f8'::uuid, '6894f3fb-d92a-5fbe-9436-d89ffd699243'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('df6477ba-e80f-5b70-bad8-4e6486994849'::uuid, 82, 0, 0, 52, 30, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('a774ad9e-b085-5c62-811e-b39a4d313aed'::uuid, '81e2a75b-a06b-5e25-8486-51924c93b179'::uuid, '6894f3fb-d92a-5fbe-9436-d89ffd699243'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('a774ad9e-b085-5c62-811e-b39a4d313aed'::uuid, 82, 0, 0, 82, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('081f76ae-65b1-574e-8330-776985e46f45'::uuid, 'd83686f5-a845-581d-9f46-8ede5dd7d6ae'::uuid, '6894f3fb-d92a-5fbe-9436-d89ffd699243'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('081f76ae-65b1-574e-8330-776985e46f45'::uuid, 65, 65, 0, 0, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('68e7039b-6650-5b7f-b8d9-1b5639211319'::uuid, 'd038424c-bc01-5c5b-a6ea-2f4eb90eca2f'::uuid, '6894f3fb-d92a-5fbe-9436-d89ffd699243'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('68e7039b-6650-5b7f-b8d9-1b5639211319'::uuid, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('f7161514-1a55-5afb-94eb-e2420071d6a9'::uuid, 'acafc4a4-2d8c-58fc-b2d9-2cfb4fa559a6'::uuid, '6894f3fb-d92a-5fbe-9436-d89ffd699243'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('f7161514-1a55-5afb-94eb-e2420071d6a9'::uuid, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('40a28353-d9b1-5f94-8ab8-01a2cd4ef703'::uuid, 'a2a0ae1c-0ea5-5210-8af5-75b2c50424f8'::uuid, 'c2a03991-3b8b-5b2f-8071-4927c2b47765'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('40a28353-d9b1-5f94-8ab8-01a2cd4ef703'::uuid, 197, 190, 2, 3, 0, 1, 1, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('5ae75537-d91c-5c20-af72-97edb3202cf0'::uuid, '866903c0-3835-55d6-8f2d-192279879528'::uuid, 'c2a03991-3b8b-5b2f-8071-4927c2b47765'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('5ae75537-d91c-5c20-af72-97edb3202cf0'::uuid, 74, 64, 0, 0, 0, 0, 10, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('d0b113a8-0310-515c-898a-aa095a06d36b'::uuid, '323ec26c-b770-56d0-9708-ad0a4cb1b33e'::uuid, 'c2a03991-3b8b-5b2f-8071-4927c2b47765'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('d0b113a8-0310-515c-898a-aa095a06d36b'::uuid, 49, 46, 1, 2, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('2ff0f1f4-63d4-5bb6-9e40-0015fd450e87'::uuid, 'f6140548-f90d-558b-a4e6-9955ad834cd5'::uuid, 'c2a03991-3b8b-5b2f-8071-4927c2b47765'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('2ff0f1f4-63d4-5bb6-9e40-0015fd450e87'::uuid, 38, 10, 4, 22, 1, 1, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('b62e5278-366d-52cc-b104-02f07386f67f'::uuid, '0c1d6532-0c3f-5f28-9776-e2d679a9cb69'::uuid, 'c2a03991-3b8b-5b2f-8071-4927c2b47765'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('b62e5278-366d-52cc-b104-02f07386f67f'::uuid, 3, 0, 0, 3, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('358a0f10-8d3c-5471-8500-4a5036ba2f66'::uuid, '1705c17a-7cef-5d53-bce7-8cf842df9406'::uuid, 'c2a03991-3b8b-5b2f-8071-4927c2b47765'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('358a0f10-8d3c-5471-8500-4a5036ba2f66'::uuid, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('027368c2-3455-5bf3-9cec-b4964d2c7ebd'::uuid, 'fba572c5-8553-5f53-81a6-6adb8f233047'::uuid, 'c2a03991-3b8b-5b2f-8071-4927c2b47765'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('027368c2-3455-5bf3-9cec-b4964d2c7ebd'::uuid, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('57998e5b-792c-5b01-ae62-91689807bcd0'::uuid, 'f532aa3b-dd2e-52ab-aa53-9c3ca3bafb49'::uuid, 'c2a03991-3b8b-5b2f-8071-4927c2b47765'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('57998e5b-792c-5b01-ae62-91689807bcd0'::uuid, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('b45eb464-7beb-5258-be19-e8e8695e10de'::uuid, '855d6a36-0e33-5010-9ce7-b1fce33db552'::uuid, 'c2a03991-3b8b-5b2f-8071-4927c2b47765'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('b45eb464-7beb-5258-be19-e8e8695e10de'::uuid, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('de19b032-a614-5a8d-b003-0725080636d0'::uuid, 'a526e7d7-5e48-5d01-a4a7-01831c0e7bc3'::uuid, 'c2a03991-3b8b-5b2f-8071-4927c2b47765'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('de19b032-a614-5a8d-b003-0725080636d0'::uuid, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('45974cd5-6a88-5e44-bcfb-49813aac42ad'::uuid, 'b8af3ed2-7d44-50f6-b09f-74b4437a2098'::uuid, 'c2a03991-3b8b-5b2f-8071-4927c2b47765'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('45974cd5-6a88-5e44-bcfb-49813aac42ad'::uuid, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('7330d4e8-21ed-5bd3-8338-1bac0cf45fe3'::uuid, '3065bf79-9764-5f45-b6c6-66f4e7c8013c'::uuid, 'c2a03991-3b8b-5b2f-8071-4927c2b47765'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('7330d4e8-21ed-5bd3-8338-1bac0cf45fe3'::uuid, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('571f7870-bbc2-5fe4-83f4-f0119132f5e9'::uuid, '9c7f4a14-58bb-587d-93a6-585b21abd360'::uuid, '8dca7e1b-a128-5508-b638-cbc7e9e2dd9e'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('571f7870-bbc2-5fe4-83f4-f0119132f5e9'::uuid, 183, 87, 0, 2, 90, 4, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('7951fee8-c827-5b4f-9577-9cb1c467a031'::uuid, '24f7dcca-92f6-57c9-8f2a-6a14f4bac280'::uuid, '8dca7e1b-a128-5508-b638-cbc7e9e2dd9e'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('7951fee8-c827-5b4f-9577-9cb1c467a031'::uuid, 144, 0, 0, 83, 61, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('e5dfdd7f-d8fb-5e24-a107-f892fa66ab27'::uuid, '31ab105e-50c3-521d-a1f8-daaacd6f7477'::uuid, '8dca7e1b-a128-5508-b638-cbc7e9e2dd9e'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('e5dfdd7f-d8fb-5e24-a107-f892fa66ab27'::uuid, 95, 95, 0, 0, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('865dd122-8fb1-5a89-aa90-b29fc83af62f'::uuid, '4d78cb0b-1dec-50f8-b55f-b7b64468b523'::uuid, '8dca7e1b-a128-5508-b638-cbc7e9e2dd9e'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('865dd122-8fb1-5a89-aa90-b29fc83af62f'::uuid, 54, 52, 0, 0, 0, 0, 2, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('c8b69526-88cd-5b48-a712-776e47353ef7'::uuid, '8f508b98-ae80-5ddb-b9c9-ffc08c2f3ca8'::uuid, '8dca7e1b-a128-5508-b638-cbc7e9e2dd9e'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('c8b69526-88cd-5b48-a712-776e47353ef7'::uuid, 39, 0, 0, 39, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('dc710932-556f-53d0-b06c-0373e638b41c'::uuid, 'dbf17515-8fdf-5bd0-98ee-2b5f08e2c5a7'::uuid, '8dca7e1b-a128-5508-b638-cbc7e9e2dd9e'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('dc710932-556f-53d0-b06c-0373e638b41c'::uuid, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('d05f2919-0c17-5a1a-bdd2-2fbaf4b25011'::uuid, '2a89bb55-2683-5c65-ab4c-40d1a6387de4'::uuid, '8dca7e1b-a128-5508-b638-cbc7e9e2dd9e'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('d05f2919-0c17-5a1a-bdd2-2fbaf4b25011'::uuid, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('6071d6fe-de67-5eeb-b73b-a4b8f5fd2dde'::uuid, '938a4491-f178-5656-b6f8-b0fd71202414'::uuid, 'a3938aa2-b405-51a2-88d8-e7d1b2e5cf30'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('6071d6fe-de67-5eeb-b73b-a4b8f5fd2dde'::uuid, 145, 145, 0, 0, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('00024f4c-30b8-512e-829b-a1ef38fd3f81'::uuid, '0498472a-62cf-5fd4-ae6e-b78b3ed5e445'::uuid, 'a3938aa2-b405-51a2-88d8-e7d1b2e5cf30'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('00024f4c-30b8-512e-829b-a1ef38fd3f81'::uuid, 126, 119, 0, 0, 0, 0, 7, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('1638aa5e-ef3b-53ad-aef3-52e30978d4f6'::uuid, '1f955fae-85ab-583a-b0fe-2a18fe6df163'::uuid, 'a3938aa2-b405-51a2-88d8-e7d1b2e5cf30'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('1638aa5e-ef3b-53ad-aef3-52e30978d4f6'::uuid, 110, 0, 0, 110, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('0a868e2a-7c9c-5c21-8256-92ce02817619'::uuid, '1c2aeb7e-2e2e-5ab9-affe-818f2b877f2f'::uuid, 'a3938aa2-b405-51a2-88d8-e7d1b2e5cf30'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('0a868e2a-7c9c-5c21-8256-92ce02817619'::uuid, 104, 104, 0, 0, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('ca4c8fdb-a547-5c80-8135-a9fdc7aebb50'::uuid, '2d5d4a9c-8d8b-5d4c-ab1d-caed42a8b0d5'::uuid, 'a3938aa2-b405-51a2-88d8-e7d1b2e5cf30'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('ca4c8fdb-a547-5c80-8135-a9fdc7aebb50'::uuid, 83, 56, 0, 27, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('ece3c864-69f8-55a8-8178-86e45382a0ea'::uuid, '5e7a6e8f-c948-5c8f-a3b0-97d13214e16b'::uuid, 'a3938aa2-b405-51a2-88d8-e7d1b2e5cf30'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('ece3c864-69f8-55a8-8178-86e45382a0ea'::uuid, 39, 0, 0, 39, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('36f5c614-e848-5224-b547-81d3f302cf2e'::uuid, '1a7b65c8-4f1a-523c-a135-9e10e2509ce3'::uuid, 'a3938aa2-b405-51a2-88d8-e7d1b2e5cf30'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('36f5c614-e848-5224-b547-81d3f302cf2e'::uuid, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('60339e12-57d2-592b-9ca4-248e0aa80a09'::uuid, 'd75a5fb9-13e7-5716-badf-82a0e4de8bcf'::uuid, 'a3938aa2-b405-51a2-88d8-e7d1b2e5cf30'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('60339e12-57d2-592b-9ca4-248e0aa80a09'::uuid, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('7b2467eb-c0c3-5a0e-be89-4aa120bfd9ee'::uuid, 'b2c36bb5-b85b-5151-8d2f-6ae054a04976'::uuid, '55234a7c-7e0e-592f-a3c9-e5bed703c135'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('7b2467eb-c0c3-5a0e-be89-4aa120bfd9ee'::uuid, 200, 185, 10, 3, 2, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('ffef6dd4-8935-5704-9c58-001c5dc26cbb'::uuid, 'd8b11d52-04c7-5d12-8b59-e0b7c3147ef5'::uuid, '55234a7c-7e0e-592f-a3c9-e5bed703c135'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('ffef6dd4-8935-5704-9c58-001c5dc26cbb'::uuid, 110, 0, 0, 109, 0, 0, 0, 0, 1, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('c1f0ccd8-31b9-5827-b02a-3de08be4dd5a'::uuid, '4a88257d-16f5-5185-bfbe-b1fd88e8004f'::uuid, '55234a7c-7e0e-592f-a3c9-e5bed703c135'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('c1f0ccd8-31b9-5827-b02a-3de08be4dd5a'::uuid, 80, 71, 0, 0, 0, 0, 9, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('fab24aeb-4aaa-5409-a515-0dc7ef9bed02'::uuid, '1673c680-4e93-5115-b4f4-8077b952e1a5'::uuid, '55234a7c-7e0e-592f-a3c9-e5bed703c135'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('fab24aeb-4aaa-5409-a515-0dc7ef9bed02'::uuid, 66, 23, 10, 26, 0, 7, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('66a014f6-6aa7-5c54-9c04-207d85c5be33'::uuid, '548dfce2-8636-5dbd-963d-9db40349edb1'::uuid, '55234a7c-7e0e-592f-a3c9-e5bed703c135'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('66a014f6-6aa7-5c54-9c04-207d85c5be33'::uuid, 60, 0, 0, 60, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('c27ea4f0-56c6-5a35-9980-16006ee3d718'::uuid, 'fd3a7df5-12e4-545b-b651-dd81b05055e6'::uuid, '55234a7c-7e0e-592f-a3c9-e5bed703c135'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('c27ea4f0-56c6-5a35-9980-16006ee3d718'::uuid, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('44c7fdb6-a8df-5a4c-863c-ce9f6293d244'::uuid, 'd09cfe7e-e282-55a2-9541-dd58e5f183cc'::uuid, '55234a7c-7e0e-592f-a3c9-e5bed703c135'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('44c7fdb6-a8df-5a4c-863c-ce9f6293d244'::uuid, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('9d34d272-aafc-5601-81fc-016df6bdebe3'::uuid, '8effda8f-bc70-5ac2-94eb-e96057521621'::uuid, '55234a7c-7e0e-592f-a3c9-e5bed703c135'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('9d34d272-aafc-5601-81fc-016df6bdebe3'::uuid, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('afefe76d-ba84-50c9-9d9b-2be41c860563'::uuid, '44ac0351-9310-5beb-bb2f-bd9fe87e43ae'::uuid, '55234a7c-7e0e-592f-a3c9-e5bed703c135'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('afefe76d-ba84-50c9-9d9b-2be41c860563'::uuid, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('45ff4450-53ce-50d2-b3c8-dcfdcd021b69'::uuid, '1b3630dc-1e33-583f-b7a0-141e46b50d7b'::uuid, '55234a7c-7e0e-592f-a3c9-e5bed703c135'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('45ff4450-53ce-50d2-b3c8-dcfdcd021b69'::uuid, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('c5c4e3d7-733e-5982-a56a-d0a49c162851'::uuid, '8a7493f3-fcba-5fb6-a403-4f1ee26f2a4c'::uuid, '55234a7c-7e0e-592f-a3c9-e5bed703c135'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('c5c4e3d7-733e-5982-a56a-d0a49c162851'::uuid, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('b16cbf33-f8fd-5cd4-b413-34cde26f366b'::uuid, '05416b8e-c77b-5122-a8d7-5121addf4ec8'::uuid, '55234a7c-7e0e-592f-a3c9-e5bed703c135'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('b16cbf33-f8fd-5cd4-b413-34cde26f366b'::uuid, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('255b9c1d-4fcf-5aed-b71f-4ea1b0a1c7ec'::uuid, '824ae6f7-cd15-5cde-aae3-deedf8e5e2fa'::uuid, '55234a7c-7e0e-592f-a3c9-e5bed703c135'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('255b9c1d-4fcf-5aed-b71f-4ea1b0a1c7ec'::uuid, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('4ad2127b-ffe8-5408-8355-a8ccd0047e16'::uuid, '48fdcbad-ef4f-5dab-bb5a-9718df18caef'::uuid, '005e717e-4672-5b3b-b2d6-2a9ce72685f6'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('4ad2127b-ffe8-5408-8355-a8ccd0047e16'::uuid, 128, 118, 2, 2, 0, 3, 3, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('1ab7a480-5b8a-5481-af09-3e848d566e73'::uuid, 'add2ac93-c42f-581c-8e2e-32459817d50c'::uuid, '005e717e-4672-5b3b-b2d6-2a9ce72685f6'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('1ab7a480-5b8a-5481-af09-3e848d566e73'::uuid, 99, 92, 0, 2, 5, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('543a7d1f-faee-539a-b0b9-7c7ed09cb136'::uuid, 'dce1c77e-ef68-5f48-bf76-f8fafebd5469'::uuid, '005e717e-4672-5b3b-b2d6-2a9ce72685f6'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('543a7d1f-faee-539a-b0b9-7c7ed09cb136'::uuid, 89, 28, 0, 23, 38, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('dd7a4558-f30e-58bb-8088-d12ad1a1e881'::uuid, '04334ac5-dc0b-5500-81fc-06da329141df'::uuid, '005e717e-4672-5b3b-b2d6-2a9ce72685f6'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('dd7a4558-f30e-58bb-8088-d12ad1a1e881'::uuid, 77, 64, 0, 0, 0, 13, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('a4d6a17d-0750-5369-bf3c-3c9755ca5c91'::uuid, 'ceaa5102-845e-5dd1-a85c-fcb1d76f6219'::uuid, '005e717e-4672-5b3b-b2d6-2a9ce72685f6'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('a4d6a17d-0750-5369-bf3c-3c9755ca5c91'::uuid, 77, 73, 0, 0, 0, 4, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('3d35d626-23b3-56aa-aff9-d36bc310a99e'::uuid, '949e96f3-df22-5e3c-a66f-cba7b84fc506'::uuid, '005e717e-4672-5b3b-b2d6-2a9ce72685f6'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('3d35d626-23b3-56aa-aff9-d36bc310a99e'::uuid, 74, 0, 0, 74, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('455875db-55aa-52e1-82a6-251c90615b0e'::uuid, 'ac689d07-0e75-5b33-8808-3edaeddd7ef2'::uuid, '7ed1a49f-dade-513c-bd94-c1fe53401f7b'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('455875db-55aa-52e1-82a6-251c90615b0e'::uuid, 176, 53, 71, 9, 39, 4, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('3c1ad862-3b96-57c2-8e67-74b7dcfabd2b'::uuid, 'b6e3d08d-75b8-5e65-9435-1e30da11540b'::uuid, '7ed1a49f-dade-513c-bd94-c1fe53401f7b'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('3c1ad862-3b96-57c2-8e67-74b7dcfabd2b'::uuid, 91, 60, 7, 0, 19, 3, 1, 1, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('9f2af32a-fc94-53b0-a351-78267e71bfec'::uuid, '35ca2181-b3cf-5b24-8492-41208a643a36'::uuid, '7ed1a49f-dade-513c-bd94-c1fe53401f7b'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('9f2af32a-fc94-53b0-a351-78267e71bfec'::uuid, 77, 0, 0, 76, 1, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('1c40e69f-361b-54e1-956f-0c9ddac74601'::uuid, '525a9308-600e-5fb3-9877-10b3713660e9'::uuid, '7ed1a49f-dade-513c-bd94-c1fe53401f7b'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('1c40e69f-361b-54e1-956f-0c9ddac74601'::uuid, 73, 30, 23, 1, 19, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('447bba10-427f-5d29-b8a6-fc48e73cfb83'::uuid, '29c661ce-9c16-5a99-bb6c-aab17fe6586b'::uuid, '7ed1a49f-dade-513c-bd94-c1fe53401f7b'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('447bba10-427f-5d29-b8a6-fc48e73cfb83'::uuid, 68, 0, 0, 68, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('0ff65ac5-d067-5988-991d-046559830ac8'::uuid, 'd9eab65e-abf4-5f8d-9a9f-a74b05f74412'::uuid, '7ed1a49f-dade-513c-bd94-c1fe53401f7b'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('0ff65ac5-d067-5988-991d-046559830ac8'::uuid, 45, 0, 0, 45, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('1abf6a06-950d-5ec8-ba30-34770c30310c'::uuid, '13efd9f5-9ae4-5ce0-90bb-57f776f10da4'::uuid, '7ed1a49f-dade-513c-bd94-c1fe53401f7b'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('1abf6a06-950d-5ec8-ba30-34770c30310c'::uuid, 38, 0, 0, 38, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('6b2d1f3a-b8bb-5cf0-9a14-c7ef8ed742a3'::uuid, '75dcb497-b27e-5b73-9c80-0b2aaabede7a'::uuid, '7ed1a49f-dade-513c-bd94-c1fe53401f7b'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('6b2d1f3a-b8bb-5cf0-9a14-c7ef8ed742a3'::uuid, 8, 0, 0, 8, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('10d60698-fc58-54de-8819-91645b2277fc'::uuid, '05a80ec8-4206-5b9c-bac0-d16fac98bcc7'::uuid, '7ed1a49f-dade-513c-bd94-c1fe53401f7b'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('10d60698-fc58-54de-8819-91645b2277fc'::uuid, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('becf9e81-b35d-5ceb-8b5f-90bc1942f3a7'::uuid, '6e4287da-3407-5b22-90fc-40db0a8f5157'::uuid, '7ed1a49f-dade-513c-bd94-c1fe53401f7b'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('becf9e81-b35d-5ceb-8b5f-90bc1942f3a7'::uuid, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('8e661ffd-2c02-5a73-813e-a01b73e183e8'::uuid, '3df12644-ef3b-5ca0-bcd6-1655b2b1cc69'::uuid, '687d1856-c67a-5149-8937-7c36d5f7db25'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('8e661ffd-2c02-5a73-813e-a01b73e183e8'::uuid, 108, 99, 0, 0, 0, 0, 8, 1, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('2a4642d3-3bc5-521c-ba20-16c4ce0845dd'::uuid, '06a128ff-9c4c-599f-80d6-1c22ea4c4546'::uuid, '687d1856-c67a-5149-8937-7c36d5f7db25'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('2a4642d3-3bc5-521c-ba20-16c4ce0845dd'::uuid, 103, 36, 0, 67, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('08cf7ee1-591f-50ed-afd0-c85876115b06'::uuid, '0c45fc63-935c-5591-ba49-8a5c1262040b'::uuid, '687d1856-c67a-5149-8937-7c36d5f7db25'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('08cf7ee1-591f-50ed-afd0-c85876115b06'::uuid, 82, 80, 0, 1, 0, 0, 1, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('f4e35824-cce4-5d82-b777-7e4b26056d4f'::uuid, '03ee10ac-a311-512c-924b-d40d312840e3'::uuid, '687d1856-c67a-5149-8937-7c36d5f7db25'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('f4e35824-cce4-5d82-b777-7e4b26056d4f'::uuid, 66, 0, 0, 66, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('7468a002-eb36-519a-b3f1-7b43d3e6cb23'::uuid, '34f51abe-dec7-52d7-8cb0-7fcb0262bccb'::uuid, '687d1856-c67a-5149-8937-7c36d5f7db25'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('7468a002-eb36-519a-b3f1-7b43d3e6cb23'::uuid, 61, 61, 0, 0, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('ea1db8e3-8298-5089-a9e3-5cf4fd25b15b'::uuid, '06837979-4350-5a51-8994-7f3ef91809c9'::uuid, '687d1856-c67a-5149-8937-7c36d5f7db25'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('ea1db8e3-8298-5089-a9e3-5cf4fd25b15b'::uuid, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('9e5d7501-f6a9-58ce-93b8-8f96c9a61067'::uuid, '9fc936c7-fba4-5039-97af-396291af388a'::uuid, '687d1856-c67a-5149-8937-7c36d5f7db25'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('9e5d7501-f6a9-58ce-93b8-8f96c9a61067'::uuid, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('38325a88-f7e4-5248-aa1c-f37b83029868'::uuid, 'ae595075-ddaf-5f8b-9147-cdec3ee9d4b4'::uuid, 'c0620ea0-ac8f-5733-a2bd-1dfe37c972fa'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('38325a88-f7e4-5248-aa1c-f37b83029868'::uuid, 125, 25, 0, 100, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('23cd6ae9-1873-5e27-b5f5-e1f7e041633e'::uuid, 'fc7f039e-ed12-55aa-a173-4c3a21c36eed'::uuid, 'c0620ea0-ac8f-5733-a2bd-1dfe37c972fa'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('23cd6ae9-1873-5e27-b5f5-e1f7e041633e'::uuid, 102, 97, 0, 0, 0, 0, 5, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('52f41994-8230-59db-9f17-f488d3aa7565'::uuid, '67c9e5e2-a6bf-5e71-8022-23f9200e3af6'::uuid, 'c0620ea0-ac8f-5733-a2bd-1dfe37c972fa'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('52f41994-8230-59db-9f17-f488d3aa7565'::uuid, 94, 85, 0, 0, 0, 9, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('29cd15b8-dc30-5149-9294-8d85a9b9a195'::uuid, '4f3be114-54d6-56ad-a6d4-c202af92c8ca'::uuid, 'c0620ea0-ac8f-5733-a2bd-1dfe37c972fa'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('29cd15b8-dc30-5149-9294-8d85a9b9a195'::uuid, 86, 0, 0, 86, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('de580e6e-6247-53fd-be76-9aa0a8fe868c'::uuid, '40bd637d-9e18-5e2d-8058-d0a466294a0d'::uuid, 'c0620ea0-ac8f-5733-a2bd-1dfe37c972fa'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('de580e6e-6247-53fd-be76-9aa0a8fe868c'::uuid, 86, 80, 0, 0, 0, 6, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('b9624197-c733-58f0-b46d-4de5a1f5b2f4'::uuid, '6e64a838-948c-5b88-b7d3-6b0799cac6e7'::uuid, 'c0620ea0-ac8f-5733-a2bd-1dfe37c972fa'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('b9624197-c733-58f0-b46d-4de5a1f5b2f4'::uuid, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('8aff602c-4586-5e57-b0ca-953856f3fb0c'::uuid, 'b367cee3-8376-56fc-a6a7-80606f620443'::uuid, 'c0620ea0-ac8f-5733-a2bd-1dfe37c972fa'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('8aff602c-4586-5e57-b0ca-953856f3fb0c'::uuid, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('5a085eec-e33a-5821-bf70-ae0333fb3851'::uuid, 'e3f98ed4-1f98-5af3-8aab-453cef6a44ba'::uuid, '71fd95e2-6699-51c0-9032-a294559260b4'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('5a085eec-e33a-5821-bf70-ae0333fb3851'::uuid, 99, 96, 0, 0, 0, 0, 3, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('9a00bea0-3e59-5124-b96a-6fc4330d6733'::uuid, '581ed9d2-5f45-50cc-b067-47c419676e99'::uuid, '71fd95e2-6699-51c0-9032-a294559260b4'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('9a00bea0-3e59-5124-b96a-6fc4330d6733'::uuid, 88, 45, 0, 43, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('37b9363a-07f6-5de5-80ff-df89eb4bc9dc'::uuid, 'b9f7cbbf-92a5-59c1-8d61-a7e9fedaaf85'::uuid, '71fd95e2-6699-51c0-9032-a294559260b4'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('37b9363a-07f6-5de5-80ff-df89eb4bc9dc'::uuid, 86, 85, 0, 0, 0, 0, 1, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('d9f62475-6e80-50ad-b4f8-6432f8e20b85'::uuid, '87e429f8-ba30-52cd-87c0-3b228ae9602e'::uuid, '71fd95e2-6699-51c0-9032-a294559260b4'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('d9f62475-6e80-50ad-b4f8-6432f8e20b85'::uuid, 70, 69, 0, 0, 0, 0, 1, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('2804e623-8041-5e5f-a5a6-fcc66600067b'::uuid, '64b68328-024f-5262-b210-bb040a46edc0'::uuid, '71fd95e2-6699-51c0-9032-a294559260b4'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('2804e623-8041-5e5f-a5a6-fcc66600067b'::uuid, 59, 0, 0, 59, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('27829f1c-71b5-5487-99e0-15a7e1ddeda9'::uuid, '8257859e-7b0a-53ab-af07-a1ebab898acd'::uuid, '71fd95e2-6699-51c0-9032-a294559260b4'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('27829f1c-71b5-5487-99e0-15a7e1ddeda9'::uuid, 6, 0, 0, 6, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('8796d6f7-740e-53dd-b710-e71593faf7c8'::uuid, 'bcff59aa-13e2-570c-8d2c-73a836e9de75'::uuid, '71fd95e2-6699-51c0-9032-a294559260b4'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('8796d6f7-740e-53dd-b710-e71593faf7c8'::uuid, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('24859c1e-adab-58d5-addc-f735968d3930'::uuid, '6f68fecc-bc6a-55a2-950c-f87a191a9a14'::uuid, '450e9c90-66a6-5c60-a0b6-73f3aea05c9b'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('24859c1e-adab-58d5-addc-f735968d3930'::uuid, 146, 145, 0, 0, 0, 0, 0, 1, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('24876573-1fdd-5631-bcc8-0195271fa0c6'::uuid, 'cb1639e8-6798-542a-8f33-52aab3d9e6d5'::uuid, '450e9c90-66a6-5c60-a0b6-73f3aea05c9b'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('24876573-1fdd-5631-bcc8-0195271fa0c6'::uuid, 87, 79, 0, 0, 0, 0, 8, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('4eabb08e-11a8-5f7e-a456-f6689becfff5'::uuid, '26f556d7-fee4-54f8-a371-d6e06619f3ff'::uuid, '450e9c90-66a6-5c60-a0b6-73f3aea05c9b'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('4eabb08e-11a8-5f7e-a456-f6689becfff5'::uuid, 72, 0, 0, 72, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('d4d697de-1ca0-542a-a518-9451948121e1'::uuid, 'b539f455-e7e6-5dd2-9fc4-9080a8f18513'::uuid, '450e9c90-66a6-5c60-a0b6-73f3aea05c9b'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('d4d697de-1ca0-542a-a518-9451948121e1'::uuid, 66, 24, 0, 42, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('33793165-5a15-5d48-882e-a2dc081cd303'::uuid, '0bc02cb9-36af-5a61-b2b8-b0ad8cf25846'::uuid, '450e9c90-66a6-5c60-a0b6-73f3aea05c9b'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('33793165-5a15-5d48-882e-a2dc081cd303'::uuid, 60, 56, 0, 0, 0, 0, 4, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('08bc2024-4beb-5f73-a587-82e6ecbc31d9'::uuid, '6cdd8bb3-c571-57ac-b1d2-28f27035ade0'::uuid, '450e9c90-66a6-5c60-a0b6-73f3aea05c9b'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('08bc2024-4beb-5f73-a587-82e6ecbc31d9'::uuid, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('30f7d3f4-e89d-5179-ab16-b573eb00d73c'::uuid, 'b27ff112-39ad-57f7-8ff1-a58910d51041'::uuid, '450e9c90-66a6-5c60-a0b6-73f3aea05c9b'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('30f7d3f4-e89d-5179-ab16-b573eb00d73c'::uuid, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('ed0c6ddc-5d60-5a04-a240-7b19006a9515'::uuid, 'e8f55976-b098-550b-9a48-a68400517a09'::uuid, '5fe6cdeb-9319-520b-8864-ea4866b610c4'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('ed0c6ddc-5d60-5a04-a240-7b19006a9515'::uuid, 257, 66, 11, 31, 149, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('36d7d78b-73f6-56d5-be1f-8905ac80393c'::uuid, 'ac90be5e-a40d-5c52-9529-57347aa91b5e'::uuid, '5fe6cdeb-9319-520b-8864-ea4866b610c4'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('36d7d78b-73f6-56d5-be1f-8905ac80393c'::uuid, 101, 0, 0, 24, 76, 1, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('881f4120-fc71-51c3-b113-84c62be69e5f'::uuid, 'a9cf2db0-83e4-52a9-aa03-36cc039f8141'::uuid, '5fe6cdeb-9319-520b-8864-ea4866b610c4'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('881f4120-fc71-51c3-b113-84c62be69e5f'::uuid, 64, 0, 0, 64, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('f8c4a9c9-2890-5932-9a15-b9b1477d6aa8'::uuid, '07fe6543-2c64-52f5-a14f-40484012142e'::uuid, '5fe6cdeb-9319-520b-8864-ea4866b610c4'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('f8c4a9c9-2890-5932-9a15-b9b1477d6aa8'::uuid, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();
insert into public.fasih_assignments
  (id, region_id, pencacah_id, pengawas_id)
values
  ('2f140224-16e5-57e6-a985-05c8b79e1bb6'::uuid, 'aa6b60af-6fd9-5930-84d3-270884e97420'::uuid, '5fe6cdeb-9319-520b-8864-ea4866b610c4'::uuid, null)
on conflict (id) do update set
  region_id = excluded.region_id,
  pencacah_id = excluded.pencacah_id,
  updated_at = now();
insert into public.fasih_region_status
  (assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor)
values
  ('2f140224-16e5-57e6-a985-05c8b79e1bb6'::uuid, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0)
on conflict (assignment_id) do update set
  total_assignments = excluded.total_assignments,
  approved = excluded.approved,
  draft = excluded.draft,
  open = excluded.open,
  submitted = excluded.submitted,
  rejected = excluded.rejected,
  edited_admin = excluded.edited_admin,
  revoked = excluded.revoked,
  submitted_respondent = excluded.submitted_respondent,
  edited_supervisor = excluded.edited_supervisor,
  updated_at = now();

-- 4. OPTIONAL VERIFICATION
select
  count(*) as total_assignments_rows
from public.fasih_assignments;

select
  count(*) as total_status_rows,
  sum(total_assignments) as sum_total_assignments,
  sum(approved) as sum_approved,
  sum(draft) as sum_draft,
  sum(open) as sum_open,
  sum(submitted) as sum_submitted,
  sum(rejected) as sum_rejected,
  sum(edited_admin) as sum_edited_admin,
  sum(revoked) as sum_revoked,
  sum(submitted_respondent) as sum_submitted_respondent,
  sum(edited_supervisor) as sum_edited_supervisor
from public.fasih_region_status;