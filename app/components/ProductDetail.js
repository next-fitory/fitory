'use client'

import AddToCartButton from "./AddToCartButton"
import { useRouter } from "next/navigation"
import { formatPrice } from "@/lib/utils/format"

export default function ProductDetail({ product }) {
    const router = useRouter()

    if (!product) return null

    const hasDiscount = product.discount_rate > 0

    return (
        <div className="bg-white">
            {/* 헤더 */}
            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-100">
                <div className="max-w-5xl mx-auto flex items-center px-4 py-3">
                    <button
                        onClick={() => router.back()}
                        className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* 본문: 모바일 세로 / 데스크탑 가로 2열 */}
            <div className="max-w-5xl mx-auto px-4 py-6 md:py-10 md:grid md:grid-cols-2 md:gap-12 md:items-start">
                {/* 이미지 */}
                <div className="w-full aspect-square bg-gray-50 rounded-2xl overflow-hidden">
                    {product.image_url ? (
                        <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <svg className="w-20 h-20 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                    )}
                </div>

                {/* 정보 */}
                <div className="pt-6 md:pt-0 md:sticky md:top-20">
                    {product.brands?.name && (
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                            {product.brands.name}
                        </p>
                    )}

                    <h1 className="text-xl font-black text-black leading-snug mb-4">
                        {product.name}
                    </h1>

                    <div className="flex items-end gap-2 mb-1">
                        {hasDiscount && (
                            <span className="text-sm font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
                                {product.discount_rate}%
                            </span>
                        )}
                        <span className="text-2xl font-black text-black">
                            {formatPrice(product.sale_price)}원
                        </span>
                    </div>
                    {hasDiscount && (
                        <p className="text-sm text-gray-400 line-through mb-4">
                            {formatPrice(product.price)}원
                        </p>
                    )}

                    <div className="flex items-center gap-1.5 mt-4 mb-6">
                        <div className={`w-1.5 h-1.5 rounded-full ${product.stock > 0 ? 'bg-green-400' : 'bg-red-400'}`} />
                        <p className="text-xs text-gray-500">
                            {product.stock > 0 ? `재고 ${product.stock}개` : '품절'}
                        </p>
                    </div>

                    <div className="border-t border-gray-100 pt-6">
                        <AddToCartButton product={product} />
                    </div>
                </div>
            </div>
        </div>
    )
}
