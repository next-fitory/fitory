'use client'

import { useState } from 'react'

const NAV = ['신상품', '남성', '여성', '아우터', '상의', '하의', '신발', '브랜드', '세일']

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* 상단 바 */}
        <div className="flex items-center justify-between h-14">
          <a href="/" className="text-2xl font-black tracking-widest">FITORY</a>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {NAV.map((item) => (
              <a
                key={item}
                href="#"
                className="hover:text-gray-300 transition-colors whitespace-nowrap"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {searchOpen ? (
              <input
                autoFocus
                type="text"
                placeholder="검색어를 입력하세요"
                onBlur={() => setSearchOpen(false)}
                className="bg-white/10 text-white placeholder-gray-400 text-sm px-3 py-1.5 rounded outline-none border border-white/20 w-48"
              />
            ) : (
              <button onClick={() => setSearchOpen(true)} aria-label="검색">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                </svg>
              </button>
            )}
            <button aria-label="장바구니" className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.4 7h12.8M7 13H5.4M10 21a1 1 0 1 0 2 0 1 1 0 0 0-2 0zm7 0a1 1 0 1 0 2 0 1 1 0 0 0-2 0z" />
              </svg>
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">2</span>
            </button>
            <button className="hidden md:block text-sm font-medium hover:text-gray-300">로그인</button>
          </div>
        </div>

        {/* 모바일 카테고리 스크롤 */}
        <div className="md:hidden flex gap-4 overflow-x-auto pb-2 text-sm font-medium scrollbar-none">
          {NAV.map((item) => (
            <a key={item} href="#" className="whitespace-nowrap hover:text-gray-300">{item}</a>
          ))}
        </div>
      </div>
    </header>
  )
}
