ALTER TABLE products
  ADD COLUMN category_id uuid REFERENCES categories(id) ON DELETE SET NULL;

UPDATE products
SET category_id = (SELECT id FROM categories WHERE sort_order = 1);
