import { formatPrice } from '@/lib/utils/format'
import { useRouter } from 'next/navigation'

export default function OrderItemCard({ item }) {
  const router = useRouter();

  const moveToProductDetail = () => {
    router.push(`/products/${item.id}`);
  }

  return (
    <div className="flex gap-4 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
      <div className="w-20 h-20 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover"
            onClick={moveToProductDetail}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-black truncate mb-1">{item.name}</p>
        <p className="text-xs text-gray-400 mb-3">수량 {item.quantity}개</p>
        <div className="flex items-center justify-between">
          <p className="text-sm font-black text-black">
            {formatPrice(item.purchasePrice)}원
          </p>
          <p className="text-xs text-gray-400">
            합계 {formatPrice(item.purchasePrice * item.quantity)}원
          </p>
        </div>
      </div>
    </div>
  )
}
