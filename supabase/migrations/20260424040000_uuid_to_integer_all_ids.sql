-- ① 전체 테이블 삭제 (FK 역순)
DROP TABLE IF EXISTS product_categories;
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS cart_items;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS brands;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS banners;

-- ② 스키마 재생성 (모든 id → integer GENERATED ALWAYS AS IDENTITY)

CREATE TABLE brands (
  id         integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name       text NOT NULL,
  image_url  text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE categories (
  id         integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  label      text NOT NULL,
  emoji      text,
  slug       text UNIQUE NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE banners (
  id                 integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  type               text NOT NULL DEFAULT 'hero' CHECK (type IN ('hero', 'sale', 'event')),
  badge_text         text,
  title              text NOT NULL,
  subtitle           text,
  image_url          text,
  primary_cta_text   text,
  primary_cta_href   text,
  secondary_cta_text text,
  secondary_cta_href text,
  sort_order         integer NOT NULL DEFAULT 0,
  is_active          boolean NOT NULL DEFAULT true,
  created_at         timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE products (
  id            integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  brand_id      integer REFERENCES brands(id) ON DELETE SET NULL,
  category_id   integer REFERENCES categories(id) ON DELETE SET NULL,
  name          text NOT NULL,
  description   text,
  price         numeric(10, 2) NOT NULL,
  sale_price    numeric(10, 2),
  discount_rate integer CHECK (discount_rate BETWEEN 0 AND 100),
  stock         integer NOT NULL DEFAULT 0,
  image_url     text,
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE users (
  id         integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  email      text UNIQUE NOT NULL,
  name       text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE cart_items (
  id         integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id    integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id integer NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity   integer NOT NULL DEFAULT 1 CHECK (quantity > 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, product_id)
);

CREATE TABLE orders (
  id          integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id     integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  total_price numeric(10, 2) NOT NULL,
  status      text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'shipped', 'delivered', 'cancelled')),
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE order_items (
  id         integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  order_id   integer NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id integer REFERENCES products(id) ON DELETE SET NULL,
  quantity   integer NOT NULL CHECK (quantity > 0),
  unit_price numeric(10, 2) NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE product_categories (
  product_id  integer NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  category_id integer NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, category_id)
);

-- ③ 브랜드 시드
INSERT INTO brands (name, image_url) VALUES
  ('AJOBYAJO',        'https://picsum.photos/seed/brand1/200/200'),
  ('COVERNAT',        'https://picsum.photos/seed/brand2/200/200'),
  ('THISISNEVERTHAT', 'https://picsum.photos/seed/brand3/200/200'),
  ('NOHANT',          'https://picsum.photos/seed/brand4/200/200'),
  ('WTAPS',           'https://picsum.photos/seed/brand5/200/200'),
  ('ORDINARY PEOPLE', 'https://picsum.photos/seed/brand6/200/200'),
  ('KSUBI',           'https://picsum.photos/seed/brand7/200/200'),
  ('MAISON KITSUNE',  'https://picsum.photos/seed/brand8/200/200');

-- ④ 카테고리 시드
INSERT INTO categories (label, emoji, slug, sort_order) VALUES
  ('아우터',   '🧥', 'outer',       1),
  ('상의',     '👕', 'tops',        2),
  ('하의',     '👖', 'bottoms',     3),
  ('원피스',   '👗', 'dresses',     4),
  ('신발',     '👟', 'shoes',       5),
  ('가방',     '👜', 'bags',        6),
  ('액세서리', '⌚', 'accessories', 7),
  ('모자',     '🧢', 'hats',        8);

-- ⑤ 상품 시드 (전체 22개, 카테고리 포함)
INSERT INTO products (brand_id, category_id, name, price, sale_price, discount_rate, stock, image_url) VALUES
  -- 아우터
  ((SELECT id FROM brands WHERE name = 'AJOBYAJO'),        (SELECT id FROM categories WHERE slug = 'outer'),       '오버핏 워싱 데님 재킷',      198000, 138600, 30,  50, 'https://picsum.photos/seed/jacket1/400/533'),
  ((SELECT id FROM brands WHERE name = 'ORDINARY PEOPLE'), (SELECT id FROM categories WHERE slug = 'outer'),       '울 블렌드 체크 코트',         328000, 229600, 30,  20, 'https://picsum.photos/seed/coat5/400/533'),
  ((SELECT id FROM brands WHERE name = 'NOHANT'),          (SELECT id FROM categories WHERE slug = 'outer'),       '리버시블 플리스 재킷',        178000, 142400, 20,  40, 'https://picsum.photos/seed/outer3/400/533'),
  -- 상의
  ((SELECT id FROM brands WHERE name = 'THISISNEVERTHAT'), (SELECT id FROM categories WHERE slug = 'tops'),        'SP 로고 크루넥 스웨트셔츠',  129000, 103200, 20,  80, 'https://picsum.photos/seed/sweater2/400/533'),
  ((SELECT id FROM brands WHERE name = 'MAISON KITSUNE'),  (SELECT id FROM categories WHERE slug = 'tops'),        'Fox Head 패치 후디',          298000, 208600, 30,  25, 'https://picsum.photos/seed/hoodie8/400/533'),
  ((SELECT id FROM brands WHERE name = 'COVERNAT'),        (SELECT id FROM categories WHERE slug = 'tops'),        '피그먼트 반팔 티셔츠',        49000,  39200,  20, 100, 'https://picsum.photos/seed/tops3/400/533'),
  ((SELECT id FROM brands WHERE name = 'AJOBYAJO'),        (SELECT id FROM categories WHERE slug = 'tops'),        '스트라이프 롱슬리브 티셔츠',  69000,  48300,  30,  60, 'https://picsum.photos/seed/tops4/400/533'),
  -- 하의
  ((SELECT id FROM brands WHERE name = 'COVERNAT'),        (SELECT id FROM categories WHERE slug = 'bottoms'),     '코듀로이 5포켓 팬츠',         89000,  62300,  30,  60, 'https://picsum.photos/seed/pants3/400/533'),
  ((SELECT id FROM brands WHERE name = 'WTAPS'),           (SELECT id FROM categories WHERE slug = 'bottoms'),     '밀리터리 카고 팬츠',          189000, 151200, 20,  45, 'https://picsum.photos/seed/cargo6/400/533'),
  ((SELECT id FROM brands WHERE name = 'KSUBI'),           (SELECT id FROM categories WHERE slug = 'bottoms'),     '슬림 스트레이트 데님',        249000, 199200, 20,  35, 'https://picsum.photos/seed/denim7/400/533'),
  ((SELECT id FROM brands WHERE name = 'WTAPS'),           (SELECT id FROM categories WHERE slug = 'bottoms'),     '테이퍼드 치노 팬츠',          119000,  95200, 20,  45, 'https://picsum.photos/seed/bottoms4/400/533'),
  -- 원피스
  ((SELECT id FROM brands WHERE name = 'ORDINARY PEOPLE'), (SELECT id FROM categories WHERE slug = 'dresses'),     '플리츠 미디 원피스',          138000,  96600, 30,  30, 'https://picsum.photos/seed/dress1/400/533'),
  ((SELECT id FROM brands WHERE name = 'MAISON KITSUNE'),  (SELECT id FROM categories WHERE slug = 'dresses'),     '린넨 셔츠 원피스',            198000, 158400, 20,  25, 'https://picsum.photos/seed/dress2/400/533'),
  -- 신발
  ((SELECT id FROM brands WHERE name = 'NOHANT'),          (SELECT id FROM categories WHERE slug = 'shoes'),       '레더 첼시 부츠',              258000, 206400, 20,  30, 'https://picsum.photos/seed/boots4/400/533'),
  ((SELECT id FROM brands WHERE name = 'COVERNAT'),        (SELECT id FROM categories WHERE slug = 'shoes'),       '캔버스 로우 스니커즈',        89000,  71200,  20,  70, 'https://picsum.photos/seed/shoe2/400/533'),
  ((SELECT id FROM brands WHERE name = 'AJOBYAJO'),        (SELECT id FROM categories WHERE slug = 'shoes'),       '청키 솔 플랫폼 로퍼',         148000, 103600, 30,  35, 'https://picsum.photos/seed/shoe3/400/533'),
  -- 가방
  ((SELECT id FROM brands WHERE name = 'MAISON KITSUNE'),  (SELECT id FROM categories WHERE slug = 'bags'),        '폭스 헤드 캔버스 토트백',     228000, 182400, 20,  20, 'https://picsum.photos/seed/bag1/400/533'),
  ((SELECT id FROM brands WHERE name = 'THISISNEVERTHAT'), (SELECT id FROM categories WHERE slug = 'bags'),        'L-Logo 나일론 메신저백',      119000,  83300, 30,  30, 'https://picsum.photos/seed/bag2/400/533'),
  -- 액세서리
  ((SELECT id FROM brands WHERE name = 'NOHANT'),          (SELECT id FROM categories WHERE slug = 'accessories'), '실버 체인 레이어드 목걸이',   68000,  54400,  20,  50, 'https://picsum.photos/seed/acc1/400/533'),
  ((SELECT id FROM brands WHERE name = 'WTAPS'),           (SELECT id FROM categories WHERE slug = 'accessories'), 'LOGO 에나멜 벨트',            79000,  55300,  30,  40, 'https://picsum.photos/seed/acc2/400/533'),
  -- 모자
  ((SELECT id FROM brands WHERE name = 'WTAPS'),           (SELECT id FROM categories WHERE slug = 'hats'),        '밀리터리 버킷햇',             59000,  47200,  20,  60, 'https://picsum.photos/seed/hat1/400/533'),
  ((SELECT id FROM brands WHERE name = 'THISISNEVERTHAT'), (SELECT id FROM categories WHERE slug = 'hats'),        'SP 로고 5패널 캡',            49000,  34300,  30,  80, 'https://picsum.photos/seed/hat2/400/533');
