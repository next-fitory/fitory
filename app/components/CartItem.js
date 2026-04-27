'use client'

import { useCartStore } from "@/store/useCartStore"
import { formatPrice } from "@/lib/utils/format"

export default function CartItem({ item, checked, onCheck }) {
    const removeFromCart = useCartStore((state) => state.removeFromCart)
    const hasDiscount = item.price > item.sale_price

    return (
        <div className={`flex gap-4 bg-white rounded-2xl p-4 border transition-colors ${checked ? 'border-black' : 'border-gray-100'} shadow-sm`}>
            {/* 체크박스 */}
            <div className="flex items-start pt-1">
                <button
                    onClick={() => onCheck(item.id)}
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${checked ? 'bg-black border-black' : 'border-gray-300'}`}
                >
                    {checked && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    )}
                </button>
            </div>

            {/* 이미지 */}
            <div className="w-20 h-20 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0">
                {item.image_url ? (
                    <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                )}
            </div>

            {/* 정보 */}
            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-bold text-black leading-snug line-clamp-2">{item.name}</p>
                    <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 text-gray-300 hover:text-gray-500 transition-colors flex-shrink-0"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <p className="text-xs text-gray-400 mt-1">수량 {item.quantity}개</p>

                <div className="flex items-center gap-2 mt-2">
                    <p className="text-base font-black text-black">{formatPrice(item.sale_price)}원</p>
                    {hasDiscount && (
                        <p className="text-xs text-gray-400 line-through">{formatPrice(item.price)}원</p>
                    )}
                </div>
            </div>
        </div>
    )
}
