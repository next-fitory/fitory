'use client'

import { upsertCartItem } from "@/lib/data/cartItems"
import { useCartStore } from "@/store/useCartStore"
import { useUserStore } from "@/store/useUserStore"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function AddToCartButton({ product }) {
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  const { user } = useUserStore()
  const addToCart = useCartStore(state => state.addToCart)

  const decrease = () => setQuantity(q => Math.max(1, q - 1))
  const increase = () => setQuantity(q => Math.min(product.stock, q + 1))

  const handleAddToCart = async () => {
    if (quantity < 1) {
      alert("수량을 선택하세요")
      return
    }

    if (user?.id) {
      try {
        await upsertCartItem(user.id, product.id, quantity)
      } catch {
        alert("장바구니 저장 실패")
        return
      }
    }

    addToCart(product, quantity)
    alert("장바구니에 담겼습니다.")
  }

  const isOutOfStock = product.stock <= 0

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
        <span className="text-sm font-bold text-gray-700">수량</span>
        <div className="flex items-center gap-3">
          <button
            onClick={decrease}
            disabled={quantity <= 1}
            className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-700 hover:bg-gray-100 disabled:opacity-30 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
            </svg>
          </button>
          <span className="w-6 text-center text-sm font-black">{quantity}</span>
          <button
            onClick={increase}
            disabled={quantity >= product.stock}
            className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-700 hover:bg-gray-100 disabled:opacity-30 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className="flex-1 bg-black text-white text-sm font-black py-3.5 rounded-xl hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {isOutOfStock ? '품절' : '장바구니 담기'}
        </button>
        <button
          onClick={() => router.push("/cart")}
          className="flex-1 border-2 border-black text-black text-sm font-black py-3.5 rounded-xl hover:bg-gray-50 transition-colors"
        >
          장바구니 보기
        </button>
      </div>
    </div>
  )
}
