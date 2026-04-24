-- 브랜드 (brands.json 6개 + products에만 있는 2개)
INSERT INTO brands (name, image_url) VALUES
  ('AJOBYAJO',        'https://picsum.photos/seed/brand1/200/200'),
  ('COVERNAT',        'https://picsum.photos/seed/brand2/200/200'),
  ('THISISNEVERTHAT', 'https://picsum.photos/seed/brand3/200/200'),
  ('NOHANT',          'https://picsum.photos/seed/brand4/200/200'),
  ('WTAPS',           'https://picsum.photos/seed/brand5/200/200'),
  ('ORDINARY PEOPLE', 'https://picsum.photos/seed/brand6/200/200'),
  ('KSUBI',           'https://picsum.photos/seed/brand7/200/200'),
  ('MAISON KITSUNE',  'https://picsum.photos/seed/brand8/200/200');

-- 카테고리 (categories.json 8개, slug/sort_order 추가)
INSERT INTO categories (label, emoji, slug, sort_order) VALUES
  ('아우터',   '🧥', 'outer',       1),
  ('상의',     '👕', 'tops',        2),
  ('하의',     '👖', 'bottoms',     3),
  ('원피스',   '👗', 'dresses',     4),
  ('신발',     '👟', 'shoes',       5),
  ('가방',     '👜', 'bags',        6),
  ('액세서리', '⌚', 'accessories', 7),
  ('모자',     '🧢', 'hats',        8);

-- 상품 (products.json 8개, brand_id는 brands 테이블 서브쿼리로 참조)
INSERT INTO products (brand_id, name, price, sale_price, discount_rate, stock, image_url)
VALUES
  ((SELECT id FROM brands WHERE name = 'AJOBYAJO'),        '오버핏 워싱 데님 재킷',     198000, 138600, 30, 50, 'https://picsum.photos/seed/jacket1/400/533'),
  ((SELECT id FROM brands WHERE name = 'THISISNEVERTHAT'), 'SP 로고 크루넥 스웨트셔츠', 129000, 103200, 20, 80, 'https://picsum.photos/seed/sweater2/400/533'),
  ((SELECT id FROM brands WHERE name = 'COVERNAT'),        '코듀로이 5포켓 팬츠',        89000,  62300, 30, 60, 'https://picsum.photos/seed/pants3/400/533'),
  ((SELECT id FROM brands WHERE name = 'NOHANT'),          '레더 첼시 부츠',            258000, 206400, 20, 30, 'https://picsum.photos/seed/boots4/400/533'),
  ((SELECT id FROM brands WHERE name = 'ORDINARY PEOPLE'), '울 블렌드 체크 코트',       328000, 229600, 30, 20, 'https://picsum.photos/seed/coat5/400/533'),
  ((SELECT id FROM brands WHERE name = 'WTAPS'),           '밀리터리 카고 팬츠',        189000, 151200, 20, 45, 'https://picsum.photos/seed/cargo6/400/533'),
  ((SELECT id FROM brands WHERE name = 'KSUBI'),           '슬림 스트레이트 데님',      249000, 199200, 20, 35, 'https://picsum.photos/seed/denim7/400/533'),
  ((SELECT id FROM brands WHERE name = 'MAISON KITSUNE'),  'Fox Head 패치 후디',       298000, 208600, 30, 25, 'https://picsum.photos/seed/hoodie8/400/533');
