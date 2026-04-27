-- 브랜드
CREATE TABLE brands (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name       text NOT NULL,
  image_url  text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 카테고리
CREATE TABLE categories (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label      text NOT NULL,
  emoji      text,
  slug       text UNIQUE NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 배너 (히어로, 세일, 이벤트)
CREATE TABLE banners (
  id                 uuid PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- 상품
CREATE TABLE products (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id      uuid REFERENCES brands(id) ON DELETE SET NULL,
  name          text NOT NULL,
  description   text,
  price         numeric(10, 2) NOT NULL,
  sale_price    numeric(10, 2),
  discount_rate integer CHECK (discount_rate BETWEEN 0 AND 100),
  stock         integer NOT NULL DEFAULT 0,
  image_url     text,
  created_at    timestamptz NOT NULL DEFAULT now()
);

-- 유저
CREATE TABLE users (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email      text UNIQUE NOT NULL,
  name       text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 장바구니
CREATE TABLE cart_items (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity   integer NOT NULL DEFAULT 1 CHECK (quantity > 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, product_id)
);

-- 주문
CREATE TABLE orders (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  total_price numeric(10, 2) NOT NULL,
  status      text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'shipped', 'delivered', 'cancelled')),
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- 주문 상세 (구매 시점 가격 스냅샷 포함)
CREATE TABLE order_items (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id   uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE SET NULL,
  quantity   integer NOT NULL CHECK (quantity > 0),
  unit_price numeric(10, 2) NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 상품-카테고리 (N:M)
CREATE TABLE product_categories (
  product_id  uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  category_id uuid NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, category_id)
);

