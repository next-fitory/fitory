'use client'

import { useLogout } from '@/hooks/useLogout'

export default function MyPageMenu() {
  const handleLogout = useLogout()
  const getItemClassName = (item) =>
    `text-sm text-gray-600 hover:text-black hover:underline transition-all${item.strikeThrough ? ' line-through' : ''}`

  const groups = [
    {
      title: '쇼핑 정보',
      items: [
        { label: '주문 내역', href: '/mypage/orders' },
        { label: '취소/반품/교환 내역', href: '#', strikeThrough: true },
        { label: '장바구니', href: '/cart' },
      ],
    },
    {
      title: '나의 활동',
      items: [
        { label: '좋아요', href: '/likes' },
        { label: '나의 상품 문의', href: '#', strikeThrough: true },
        { label: '나의 상품 리뷰', href: '#', strikeThrough: true },
      ],
    },
    {
      title: '회원 정보',
      items: [
        { label: '회원 정보 수정', href: '#', strikeThrough: true },
        { label: '배송지 관리', href: '#', strikeThrough: true },
        { label: '로그아웃', href: '#', onClick: handleLogout },
      ],
    },
  ]

  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {groups.map((group) => (
          <div key={group.title}>
            <h3 className="text-sm font-black mb-4 border-b border-black pb-2">
              {group.title}
            </h3>
            <ul className="space-y-3">
              {group.items.map((item) => (
                <li key={item.label}>
                  {item.onClick ? (
                    <button
                      onClick={item.onClick}
                      className={getItemClassName(item)}
                    >
                      {item.label}
                    </button>
                  ) : (
                    <a
                      href={item.href}
                      className={getItemClassName(item)}
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
