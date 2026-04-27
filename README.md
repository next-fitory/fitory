# 🛍️ Fitory - Next.js 기반 의류 쇼핑몰 플랫폼
<img width="1694" height="653" alt="image" src="https://github.com/user-attachments/assets/545f04f1-194d-4339-bc5b-9340176e380f" />
<br>

![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2-blue?logo=react)
![Supabase](https://img.shields.io/badge/Supabase-DB_%26_Auth-3ECF8E?logo=supabase)
![Zustand](https://img.shields.io/badge/Zustand-State_Management-brown)
![React Query](https://img.shields.io/badge/React_Query-Data_Fetching-FF4154?logo=reactquery)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?logo=tailwindcss)

> **Fitory**는 Supabase와 Next.js 16을 기반으로 구축한 의류 쇼핑 플랫폼입니다.  
> 서버 상태와 클라이언트 상태를 분리하여 관리하고, 역할 기반으로 기능을 분담하여 협업 효율성을 고려한 구조로 설계했습니다.

<br/>

## 👨‍💻 Team & Contribution
각 구성원이 핵심 도메인을 하나씩 전담하여 구현했습니다.

* **박유빈 (공통 상태 관리):** Zustand 기반 전역 상태 설계 (로그인 세션 및 모달 시스템)
* **한다현 (장바구니 & 상품):** 장바구니 상태(`useCartStore`) 및 상품 렌더링 로직 구현
* **강찬미 (리뷰 시스템):** 리뷰 기능 구현 및 React Query 기반 서버 상태 관리

<br/>

## 🛠️ Tech Stack
* **Framework:** Next.js 16.2.4 (App Router), React 19
* **Styling:** Tailwind CSS v4
* **Backend & DB:** Supabase (PostgreSQL, Auth)
* **State Management:**  
  * Client State: `zustand` (persist middleware)  
  * Server State: `@tanstack/react-query`

<br/>

## 💡 Core Architecture & Key Logic (핵심 설계)

세 가지 주요 영역으로 구조를 분리하여 상태 관리와 비즈니스 로직을 명확히 구분했습니다.

### 1. 전역 상태와 세션 관리 (by 박유빈)
* **내용:** `useUiStore`를 통해 전역에서 모달 상태를 제어하고, `useUserStore`에 `persist` 미들웨어를 적용하여 로그인 세션을 로컬 스토리지와 동기화했습니다.
* **효과:** 전역 UI 상태 관리 로직을 단순화하고, 사용자 세션을 유지할 수 있도록 구성했습니다.
* **핵심 로직:**
    ```JavaScript
    export const useUserStore = create(persist((set) => ({
        user: null,
        _hasHydrated: false,

        logout: () => set({ user: null }),
        setUser: (user) => set({ user }),
        setHasHydrated: (v) => set({ _hasHydrated: v }),
    }), {
        name: "user",
        onRehydrateStorage: () => (state) => {
            state.setHasHydrated(true)
        },
    }));
    ```

### 2. 장바구니 제어 및 코어 로직 (by 한다현)
* **내용:** `useCartStore`를 통해 장바구니 상태를 전역으로 관리하고, 상품 추가 시 기존 데이터를 탐색하여 수량을 갱신하거나 신규 데이터를 추가하는 로직을 구현했습니다.
* **효과:** 장바구니 상태를 일관되게 유지하며, `persist` 미들웨어를 통해 페이지 이동 및 새로고침 이후에도 상태가 유지되도록 했습니다.
* **핵심 로직:**
    ```JavaScript
    const handleAddToCart = async () => {
    if (quantity < 1) {
      alert("수량을 선택하세요")
      return
    }

    if (user?.id) {
      const supabase = createClient()
      const { error } = await supabase
        .from("cart_items")
        .upsert(
          { user_id: user.id, product_id: product.id, quantity },
          { onConflict: "user_id,product_id" }
        )
      if (error) {
        alert("장바구니 저장 실패")
        return
      }
    }
    ```

### 3. 실시간 리뷰 동기화 (by 강찬미)
* **내용:** React Query의 `useMutation`과 `invalidateQueries`를 활용하여 리뷰 데이터를 관리했습니다.
* **효과:** 리뷰 생성 및 수정 이후, 별도의 새로고침 없이 최신 데이터가 즉시 반영되도록 구현했습니다.
* **핵심 로직:**
    ```JavaScript
    const mutation = useMutation({
        mutationFn: (newReview) => createReview(newReview),
        onSuccess: () => {
            queryClient.invalidateQueries(['reviews', productId])
            setContent('')
            setRating(5)
            alert('리뷰가 등록되었습니다.')
        },
    })
    ```


<br/>

## 🗺️ ER Diagram
```mermaid
erDiagram
    USERS ||--o{ CART_ITEMS : has
    USERS ||--o{ ORDERS : places
    USERS ||--o{ REVIEWS : writes
    USERS ||--o{ USERS_LIKES : likes

    BRANDS ||--o{ PRODUCTS : owns

    PRODUCTS ||--o{ CART_ITEMS : added_to
    PRODUCTS ||--o{ ORDER_ITEMS : ordered_as
    PRODUCTS ||--o{ REVIEWS : reviewed_by
    PRODUCTS ||--o{ USERS_LIKES : liked_by

    CATEGORIES ||--o{ PRODUCT_CATEGORIES : contains
    PRODUCTS ||--o{ PRODUCT_CATEGORIES : belongs_to

    ORDERS ||--o{ ORDER_ITEMS : contains

    USERS {
        int4 id PK
        text email UK
        text name
        timestamptz created_at
    }

    BRANDS {
        int4 id PK
        text name
        text image_url
        timestamptz created_at
    }

    CATEGORIES {
        int4 id PK
        text label
        text emoji
        text slug UK
        int4 sort_order
        timestamptz created_at
    }

    PRODUCTS {
        int4 id PK
        int4 brand_id FK
        int4 category_id FK
        text name
        text description
        numeric price
        numeric sale_price
        int4 discount_rate
        int4 stock
        text image_url
        timestamptz created_at
    }

    PRODUCT_CATEGORIES {
        int4 product_id PK, FK
        int4 category_id PK, FK
    }

    CART_ITEMS {
        int4 id PK
        int4 user_id FK
        int4 product_id FK
        int4 quantity
        timestamptz created_at
    }

    ORDERS {
        int4 id PK
        int4 user_id FK
        numeric total_price
        text status
        timestamptz created_at
    }

    ORDER_ITEMS {
        int4 id PK
        int4 order_id FK
        int4 product_id FK
        int4 quantity
        numeric unit_price
        timestamptz created_at
    }

    REVIEWS {
        int8 id PK
        int4 product_id FK
        int4 user_id FK
        text content
        int4 rating
        timestamptz created_at
    }

    USERS_LIKES {
        int8 id PK
        timestamptz created_at
        int4 user_id FK
        int4 product_id FK
    }
```

## 📂 Folder Structure
관심사 분리 원칙에 따라 파일 구조를 구성했습니다.

```text
FITORY/
├── app/                  # Next.js App 라우터 및 페이지
│   ├── products/         # 상품 상세 및 리뷰 페이지
│   └── components/       # 공통 UI 컴포넌트
├── lib/
│   ├── data/             # Supabase API 함수
│   └── supabase/         # Supabase 설정
├── store/                # Zustand 전역 상태
│   ├── useCartStore.js   # 장바구니 상태 및 로직
│   ├── useUiStore.js     # UI 상태 관리
│   └── useUserStore.js   # 사용자 세션 관리
└── supabase/
    └── migrations/       # DB 스키마 및 초기 데이터
````

<br/>

## 🔥 Troubleshooting (트러블슈팅)

### 1. React Hook 실행 순서 위반 (Rules of Hooks) 에러 해결

* **문제:** 조건부 `return`이 먼저 실행되면서 Hook 호출 순서가 변경되어 에러가 발생했습니다.
* **해결:** 모든 Hook을 컴포넌트 최상단에서 호출하도록 구조를 수정하고, 조건부 렌더링을 이후로 이동시켜 실행 순서를 고정했습니다.

### 2. 외부 이미지 렌더링 차단 문제

* **문제:** 외부 도메인(`image.msscdn.net`) 이미지 사용 시 Next.js `<Image>` 컴포넌트에서 보안 오류가 발생했습니다.
* **해결:** `next.config.mjs`에 해당 도메인을 허용하도록 설정하여 정상적으로 이미지가 로드되도록 처리했습니다.

<br/>

## 🚀 Getting Started

```bash
# 1. 패키지 설치
npm install

# 2. 환경변수 설정 (.env.local)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# 3. 개발 서버 실행
npm run dev
```
