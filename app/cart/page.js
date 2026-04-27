'use client'

import { useCartStore } from "@/store/useCartStore"
import { useUiStore } from "@/store/useUiStore"
import { useUserStore } from "@/store/useUserStore"
import CartItem from "../components/CartItem"
import { useState } from "react"
import { createCompleteOrder } from "@/lib/data/orders"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { formatPrice } from "@/lib/utils/format"

export default function CartPage() {
    const cart = useCartStore(state => state.cart)
    const user = useUserStore(state => state.user)
    const removeFromCart = useCartStore(state => state.removeFromCart)
    const clearCart = useCartStore(state => state.clearCart)
    const openModal = useUiStore(state => state.openModal)
    const router = useRouter()

    const [selectedIds, setSelectedIds] = useState([])

    const selectedItems = cart.filter(item => selectedIds.includes(item.id))
    const isAllSelected = cart.length > 0 && selectedIds.length === cart.length
    const totalPrice = selectedItems.reduce((acc, item) => acc + item.sale_price * item.quantity, 0)

    const handleSelectAll = () => {
        setSelectedIds(isAllSelected ? [] : cart.map(item => item.id))
    }

    const toggleSelect = id => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        )
    }

    const handleRemoveSelected = () => {
        selectedIds.forEach(id => removeFromCart(id))
        setSelectedIds([])
    }

    const handleBuy = () => {
        if (!user) {
            openModal("login",
                { title: "로그인", description: "구매하려면 로그인이 필요합니다." },
                { size: "sm", backdropClosable: true, escapeClosable: true }
            )
            return
        }
        if (selectedIds.length === 0) {
            alert('구매할 상품을 선택해주세요.')
            return
        }

        const order = createCompleteOrder(user.id, totalPrice, selectedItems)
        if (order) alert("주문이 완료되었습니다")

        handleRemoveSelected()
        router.push('/')
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* 헤더 */}
            <div className="bg-black text-white sticky top-0 z-10">
                <div className="max-w-xl mx-auto flex items-center gap-3 px-4 py-4">
                    <Link href="/" className="p-1 rounded-full hover:bg-white/10 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                    </Link>
                    <h1 className="text-base font-black">장바구니</h1>
                    {cart.length > 0 && (
                        <span className="ml-1 text-xs text-gray-400">{cart.length}</span>
                    )}
                </div>
            </div>

            {cart.length === 0 ? (
                /* 빈 장바구니 */
                <div className="flex flex-col items-center justify-center py-32 text-center px-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    <p className="text-sm font-bold text-gray-400 mb-1">장바구니가 비었습니다</p>
                    <p className="text-xs text-gray-300 mb-6">마음에 드는 상품을 담아보세요</p>
                    <Link
                        href="/"
                        className="bg-black text-white text-sm font-bold px-6 py-2.5 rounded-full hover:bg-gray-800 transition-colors"
                    >
                        쇼핑하러 가기
                    </Link>
                </div>
            ) : (
                <>
                    {/* 전체선택 툴바 */}
                    <div className="max-w-xl mx-auto px-4 py-3 flex items-center justify-between">
                        <button onClick={handleSelectAll} className="flex items-center gap-2">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${isAllSelected ? 'bg-black border-black' : 'border-gray-300'}`}>
                                {isAllSelected && (
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </div>
                            <span className="text-sm font-bold text-gray-700">
                                전체선택 ({selectedIds.length}/{cart.length})
                            </span>
                        </button>

                        <div className="flex gap-3">
                            {selectedIds.length > 0 && (
                                <button
                                    onClick={handleRemoveSelected}
                                    className="text-xs text-gray-500 hover:text-red-500 transition-colors"
                                >
                                    선택 삭제
                                </button>
                            )}
                            <button
                                onClick={clearCart}
                                className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                전체 삭제
                            </button>
                        </div>
                    </div>

                    {/* 아이템 목록 */}
                    <div className="max-w-xl mx-auto px-4 pb-40 flex flex-col gap-3">
                        {cart.map(item => (
                            <CartItem
                                key={item.id}
                                item={item}
                                checked={selectedIds.includes(item.id)}
                                onCheck={toggleSelect}
                            />
                        ))}
                    </div>

                    {/* 하단 고정 결제 바 */}
                    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-lg">
                        <div className="max-w-xl mx-auto px-4 py-4">
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-sm text-gray-500">
                                    선택 상품 {selectedIds.length}개
                                </p>
                                <p className="text-lg font-black text-black">
                                    {formatPrice(totalPrice)}원
                                </p>
                            </div>
                            <button
                                onClick={handleBuy}
                                className="w-full bg-black text-white font-black py-3.5 rounded-xl hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                                disabled={selectedIds.length === 0}
                            >
                                {selectedIds.length === 0 ? '상품을 선택해주세요' : `${selectedIds.length}개 구매하기`}
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
