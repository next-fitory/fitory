-- Step 1: FK 제약 제거
ALTER TABLE products DROP CONSTRAINT products_category_id_fkey;
ALTER TABLE products DROP COLUMN category_id;

-- product_categories는 데이터 없으므로 통째로 재생성
DROP TABLE product_categories;

-- Step 2: categories 재생성 (integer PK)
DROP TABLE categories;
CREATE TABLE categories (
  id         integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  label      text NOT NULL,
  emoji      text,
  slug       text UNIQUE NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Step 3: 카테고리 재삽입 (id: 1~8 순서대로)
INSERT INTO categories (label, emoji, slug, sort_order) VALUES
  ('아우터',   '🧥', 'outer',       1),
  ('상의',     '👕', 'tops',        2),
  ('하의',     '👖', 'bottoms',     3),
  ('원피스',   '👗', 'dresses',     4),
  ('신발',     '👟', 'shoes',       5),
  ('가방',     '👜', 'bags',        6),
  ('액세서리', '⌚', 'accessories', 7),
  ('모자',     '🧢', 'hats',        8);

-- Step 4: products에 integer category_id 추가
ALTER TABLE products
  ADD COLUMN category_id integer REFERENCES categories(id) ON DELETE SET NULL;

-- Step 5: image_url 시드명 패턴으로 카테고리 복원
UPDATE products SET category_id = (SELECT id FROM categories WHERE slug = 'outer')
WHERE image_url ~ '/seed/(jacket|coat|outer)[^/]+/';

UPDATE products SET category_id = (SELECT id FROM categories WHERE slug = 'tops')
WHERE image_url ~ '/seed/(sweater|hoodie|tops)[^/]+/';

UPDATE products SET category_id = (SELECT id FROM categories WHERE slug = 'bottoms')
WHERE image_url ~ '/seed/(pants|cargo|denim|bottoms)[^/]+/';

UPDATE products SET category_id = (SELECT id FROM categories WHERE slug = 'dresses')
WHERE image_url ~ '/seed/dress[^/]+/';

UPDATE products SET category_id = (SELECT id FROM categories WHERE slug = 'shoes')
WHERE image_url ~ '/seed/(boots|shoe)[^/]+/';

UPDATE products SET category_id = (SELECT id FROM categories WHERE slug = 'bags')
WHERE image_url ~ '/seed/bag[^/]+/';

UPDATE products SET category_id = (SELECT id FROM categories WHERE slug = 'accessories')
WHERE image_url ~ '/seed/acc[^/]+/';

UPDATE products SET category_id = (SELECT id FROM categories WHERE slug = 'hats')
WHERE image_url ~ '/seed/hat[^/]+/';

-- Step 6: product_categories 재생성 (integer FK)
CREATE TABLE product_categories (
  product_id  uuid    NOT NULL REFERENCES products(id)    ON DELETE CASCADE,
  category_id integer NOT NULL REFERENCES categories(id)  ON DELETE CASCADE,
  PRIMARY KEY (product_id, category_id)
);
