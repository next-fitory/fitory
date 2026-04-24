# FITORY 컨벤션

## 폴더 구조

```
fitory/
├── app/
│   ├── components/        # 모든 컴포넌트 (flat, 서브폴더 없음)
│   ├── layout.js
│   └── page.js            # import만 나열, 로직 없음
├── lib/
│   └── supabase/
│       ├── client.js      # 브라우저 컴포넌트용
│       └── server.js      # 서버 컴포넌트 / Route Handler용
└── supabase/
    └── migrations/        # DDL SQL 파일
```

## 네이밍

### 파일
- 컴포넌트: `PascalCase.js` — `ProductCard.js`, `SectionHeader.js`
- Supabase 유틸: `camelCase.js` — `client.js`, `server.js`
- 데이터: `camelCase.json` — `products.json`, `categories.json`
- 마이그레이션: `YYYYMMDDHHMMSS_description.sql` — `20260423000000_init.sql`

### 컴포넌트
- 단일 책임, 이름으로 역할이 명확히 드러나야 함
- 아이템 단위: `ProductCard`, `CategoryItem`, `BrandItem`
- 섹션 단위: `RankingSection`, `NewArrivalsSection`, `CategorySection`
- 레이아웃: `Header`, `Footer`
- 재사용 UI: `PriceLabel`, `SectionHeader`

### 변수 / 함수
- `camelCase` 사용
- 이벤트 핸들러: `handle` 접두사 — `handleClick`, `handleSubmit`
- boolean: `is` / `has` 접두사 — `isActive`, `hasDiscount`

## 컴포넌트 분리 기준

```
page.js
└── *Section.js          # 페이지 단위 섹션 (데이터 fetch 담당)
    └── *Card / *Item    # 반복 렌더링 단위
        └── UI 원자      # PriceLabel 등 재사용 최소 단위
```

- 섹션 컴포넌트가 데이터를 가져와 하위에 내려줌
- 아이템/카드 컴포넌트는 props만 받아 렌더링, 데이터 fetch 없음
- `'use client'`는 꼭 필요한 컴포넌트에만 — `useState`, `useEffect`, 이벤트 핸들러가 있을 때

## 데이터 레이어

### 현재 (정적 JSON)
```js
import products from '@/apis/products.json'
```

### 추후 Supabase 전환 시
```js
// 서버 컴포넌트
import { createServerClient } from '@/lib/supabase/server'

const supabase = createServerClient()
const { data: products } = await supabase.from('products').select('*, brands(*)')
```

- 클라이언트 컴포넌트 → `@/lib/supabase/client.js`
- 서버 컴포넌트 / Route Handler → `@/lib/supabase/server.js`
- 데이터 fetch는 항상 서버 컴포넌트에서, 클라이언트로 props 전달

## Tailwind 사용 규칙

### 기본 원칙
- 인라인 클래스만 사용, 별도 CSS 파일에 커스텀 클래스 추가하지 않음
- 반응형은 `md:` 기준으로 모바일 퍼스트
- 색상은 Tailwind 기본 팔레트 사용 (`gray-*`, `black`, `white`, `red-500`)

### 색상 시스템
| 용도 | 클래스 |
|------|--------|
| 주 배경 | `bg-white` |
| 헤더/푸터 | `bg-black text-white` |
| 텍스트 기본 | `text-black` |
| 텍스트 보조 | `text-gray-500` |
| 텍스트 비활성 | `text-gray-400` |
| 할인가 | `text-red-500` |
| 카드 배경 | `bg-gray-100` |
| 구분선 | `border-gray-100` |

### 타이포그래피
| 용도 | 클래스 |
|------|--------|
| 섹션 제목 | `text-xl font-black` |
| 히어로 제목 | `text-5xl md:text-7xl font-black` |
| 브랜드명 | `text-xs text-gray-500 font-medium` |
| 상품명 | `text-sm font-medium` |
| 가격 | `text-sm font-black` |
| 보조 텍스트 | `text-xs text-gray-400` |

### 인터랙션
- 호버 이미지 확대: `group-hover:scale-105 transition-transform duration-300`
- 호버 색상 전환: `transition-colors`
- 그룹 호버로 자식 제어: 부모에 `group`, 자식에 `group-hover:*`

### 레이아웃
- 최대 너비: `max-w-7xl mx-auto px-4`
- 상품 그리드: `grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6`
- 브랜드 그리드: `grid grid-cols-3 md:grid-cols-6 gap-3`
- 가로 스크롤: `flex overflow-x-auto scrollbar-none`

## DB 마이그레이션

- 파일 위치: `supabase/migrations/`
- 한 파일에 여러 테이블 정의 가능 (기능 단위로 묶기)
- 테이블 생성 순서는 FK 의존성 따름: `brands` → `categories` → `products` → `users` → ...
- 적용: `npx supabase db push`
