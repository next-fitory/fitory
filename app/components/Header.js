'use client'

import { useCartStore } from '@/store/useCartStore';
import { useUiStore } from '@/store/useUiStore';
import { useUserStore } from '@/store/useUserStore';
import Link from 'next/link';
import { useState } from 'react'
import { useRouter } from 'next/navigation';
import { useLogout } from '@/hooks/useLogout';

const NAV = ['아우터', '상의', '하의', '원피스', '신발', '가방', '액세서리', '모자']

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { user } = useUserStore()
  const cart = useCartStore((state) => state.cart)
  const openModal = useUiStore((state) => state.openModal)
  const router = useRouter()
  const handleLogout = useLogout()

  const handleLogin = () => {
    openModal(
      'login',
      { title: '로그인', descriptioin: '' },
      { size: 'sm', backdropClosable: true, escapeClosable: true }
    )
  }

  const restrictWithoutLogin = () => {
    if (!user) {
      alert("로그인을 해주세요")
      return
    }
    router.push("/mypage")
  }

  const closeDrawer = () => setDrawerOpen(false)

  const handleDrawerLogout = () => {
    closeDrawer()
    handleLogout()
  }

  const handleDrawerLogin = () => {
    closeDrawer()
    handleLogin()
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* 상단 바 */}
          <div className="flex items-center justify-between h-14">
            <Link href="/" className="text-2xl font-black tracking-widest">FITORY</Link>

            {/* 데스크탑 카테고리 nav */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              {NAV.map((item, index) => (
                <a
                  key={item}
                  href={`/category/${index + 1}`}
                  className="hover:text-gray-300 transition-colors whitespace-nowrap"
                >
                  {item}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              {/* 검색 */}
              {searchOpen ? (
                <input
                  autoFocus
                  type="text"
                  placeholder="검색어를 입력하세요"
                  onBlur={() => setSearchOpen(false)}
                  className="bg-white/10 text-white placeholder-gray-400 text-sm px-3 py-1.5 rounded outline-none border border-white/20 w-40"
                />
              ) : (
                <button onClick={() => setSearchOpen(true)} aria-label="검색">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                  </svg>
                </button>
              )}

              {/* 장바구니 (로그인 시) */}
              {user && (
                <Link href="/cart" aria-label="장바구니" className="relative">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.4 7h12.8M7 13H5.4M10 21a1 1 0 1 0 2 0 1 1 0 0 0-2 0zm7 0a1 1 0 1 0 2 0 1 1 0 0 0-2 0z" />
                  </svg>
                  {cart.length > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">{cart.length}</span>
                  )}
                </Link>
              )}

              {/* 데스크탑 전용 버튼 */}
              {!user && <button className="hidden md:block text-sm font-medium hover:text-gray-300" onClick={handleLogin}>로그인</button>}
              {user && <button className="hidden md:block text-sm font-medium hover:text-gray-300" onClick={handleLogout}>로그아웃</button>}
              <button className="hidden md:block text-sm font-medium hover:text-gray-300" onClick={restrictWithoutLogin}>마이페이지</button>

              {/* 모바일 햄버거 */}
              <button
                className="md:hidden p-1"
                onClick={() => setDrawerOpen(true)}
                aria-label="메뉴 열기"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* 모바일 카테고리 스크롤 */}
          <div className="md:hidden flex gap-4 overflow-x-auto pb-2 text-sm font-medium scrollbar-none">
            {NAV.map((item, index) => (
              <a key={item} href={`/category/${index + 1}`} className="whitespace-nowrap hover:text-gray-300">{item}</a>
            ))}
          </div>
        </div>
      </header>

      {/* 드로어 백드롭 */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 md:hidden"
          onClick={closeDrawer}
        />
      )}

      {/* 슬라이드 드로어 */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* 드로어 헤더 */}
        <div className="flex items-center justify-between px-5 h-14 border-b border-gray-100">
          <span className="text-sm font-black text-black">
            {user ? `${user.name ?? ''}님` : '메뉴'}
          </span>
          <button onClick={closeDrawer} className="p-1 text-gray-400 hover:text-black transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-5 py-6 flex flex-col gap-1">
          {/* 마이페이지 */}
          {user && (
            <Link
              href="/mypage"
              onClick={closeDrawer}
              className="flex items-center gap-3 py-3 text-sm font-bold text-black hover:text-gray-500 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              마이페이지
            </Link>
          )}

          {/* 장바구니 */}
          {user && (
            <Link
              href="/cart"
              onClick={closeDrawer}
              className="flex items-center gap-3 py-3 text-sm font-bold text-black hover:text-gray-500 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.4 7h12.8M7 13H5.4M10 21a1 1 0 1 0 2 0 1 1 0 0 0-2 0zm7 0a1 1 0 1 0 2 0 1 1 0 0 0-2 0z" />
              </svg>
              장바구니
              {cart.length > 0 && (
                <span className="ml-auto bg-black text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">{cart.length}</span>
              )}
            </Link>
          )}

          {user && <div className="border-t border-gray-100 my-2" />}

          {/* 로그인 / 로그아웃 */}
          {!user ? (
            <button
              onClick={handleDrawerLogin}
              className="flex items-center gap-3 py-3 text-sm font-bold text-black hover:text-gray-500 transition-colors w-full"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              로그인
            </button>
          ) : (
            <button
              onClick={handleDrawerLogout}
              className="flex items-center gap-3 py-3 text-sm font-bold text-red-500 hover:text-red-400 transition-colors w-full"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              로그아웃
            </button>
          )}
        </div>
      </div>
    </>
  )
}
