-- ① 기존 상품 카테고리 정정
UPDATE products SET category_id = (SELECT id FROM categories WHERE slug = 'outer')
WHERE name IN ('오버핏 워싱 데님 재킷', '울 블렌드 체크 코트');

UPDATE products SET category_id = (SELECT id FROM categories WHERE slug = 'tops')
WHERE name IN ('SP 로고 크루넥 스웨트셔츠', 'Fox Head 패치 후디');

UPDATE products SET category_id = (SELECT id FROM categories WHERE slug = 'bottoms')
WHERE name IN ('코듀로이 5포켓 팬츠', '밀리터리 카고 팬츠', '슬림 스트레이트 데님');

UPDATE products SET category_id = (SELECT id FROM categories WHERE slug = 'shoes')
WHERE name = '레더 첼시 부츠';

-- ② 카테고리별 신규 페이크 상품
INSERT INTO products (brand_id, category_id, name, price, sale_price, discount_rate, stock, image_url) VALUES

-- 아우터 (outer) +1
(
  (SELECT id FROM brands WHERE name = 'NOHANT'),
  (SELECT id FROM categories WHERE slug = 'outer'),
  '리버시블 플리스 재킷', 178000, 142400, 20, 40,
  'https://picsum.photos/seed/outer3/400/533'
),

-- 상의 (tops) +2
(
  (SELECT id FROM brands WHERE name = 'COVERNAT'),
  (SELECT id FROM categories WHERE slug = 'tops'),
  '피그먼트 반팔 티셔츠', 49000, 39200, 20, 100,
  'https://picsum.photos/seed/tops3/400/533'
),
(
  (SELECT id FROM brands WHERE name = 'AJOBYAJO'),
  (SELECT id FROM categories WHERE slug = 'tops'),
  '스트라이프 롱슬리브 티셔츠', 69000, 48300, 30, 60,
  'https://picsum.photos/seed/tops4/400/533'
),

-- 하의 (bottoms) +1
(
  (SELECT id FROM brands WHERE name = 'WTAPS'),
  (SELECT id FROM categories WHERE slug = 'bottoms'),
  '테이퍼드 치노 팬츠', 119000, 95200, 20, 45,
  'https://picsum.photos/seed/bottoms4/400/533'
),

-- 원피스 (dresses) +2
(
  (SELECT id FROM brands WHERE name = 'ORDINARY PEOPLE'),
  (SELECT id FROM categories WHERE slug = 'dresses'),
  '플리츠 미디 원피스', 138000, 96600, 30, 30,
  'https://picsum.photos/seed/dress1/400/533'
),
(
  (SELECT id FROM brands WHERE name = 'MAISON KITSUNE'),
  (SELECT id FROM categories WHERE slug = 'dresses'),
  '린넨 셔츠 원피스', 198000, 158400, 20, 25,
  'https://picsum.photos/seed/dress2/400/533'
),

-- 신발 (shoes) +2
(
  (SELECT id FROM brands WHERE name = 'COVERNAT'),
  (SELECT id FROM categories WHERE slug = 'shoes'),
  '캔버스 로우 스니커즈', 89000, 71200, 20, 70,
  'https://picsum.photos/seed/shoe2/400/533'
),
(
  (SELECT id FROM brands WHERE name = 'AJOBYAJO'),
  (SELECT id FROM categories WHERE slug = 'shoes'),
  '청키 솔 플랫폼 로퍼', 148000, 103600, 30, 35,
  'https://picsum.photos/seed/shoe3/400/533'
),

-- 가방 (bags) +2
(
  (SELECT id FROM brands WHERE name = 'MAISON KITSUNE'),
  (SELECT id FROM categories WHERE slug = 'bags'),
  '폭스 헤드 캔버스 토트백', 228000, 182400, 20, 20,
  'https://picsum.photos/seed/bag1/400/533'
),
(
  (SELECT id FROM brands WHERE name = 'THISISNEVERTHAT'),
  (SELECT id FROM categories WHERE slug = 'bags'),
  'L-Logo 나일론 메신저백', 119000, 83300, 30, 30,
  'https://picsum.photos/seed/bag2/400/533'
),

-- 액세서리 (accessories) +2
(
  (SELECT id FROM brands WHERE name = 'NOHANT'),
  (SELECT id FROM categories WHERE slug = 'accessories'),
  '실버 체인 레이어드 목걸이', 68000, 54400, 20, 50,
  'https://picsum.photos/seed/acc1/400/533'
),
(
  (SELECT id FROM brands WHERE name = 'WTAPS'),
  (SELECT id FROM categories WHERE slug = 'accessories'),
  'LOGO 에나멜 벨트', 79000, 55300, 30, 40,
  'https://picsum.photos/seed/acc2/400/533'
),

-- 모자 (hats) +2
(
  (SELECT id FROM brands WHERE name = 'WTAPS'),
  (SELECT id FROM categories WHERE slug = 'hats'),
  '밀리터리 버킷햇', 59000, 47200, 20, 60,
  'https://picsum.photos/seed/hat1/400/533'
),
(
  (SELECT id FROM brands WHERE name = 'THISISNEVERTHAT'),
  (SELECT id FROM categories WHERE slug = 'hats'),
  'SP 로고 5패널 캡', 49000, 34300, 30, 80,
  'https://picsum.photos/seed/hat2/400/533'
);
