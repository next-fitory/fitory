'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getOrderItems } from '@/lib/data/orders'
import { formatPrice } from '@/lib/utils/format'
import OrderItemCard from '@/app/components/OrderItemCard'

export default function OrderDetail() {
    const { orderId } = useParams()

    const { data: orderItems, isLoading } = useQuery({
        queryKey: ['orderItems', orderId],
        queryFn: () => getOrderItems(orderId),
        enabled: !!orderId,
    })

    const totalAmount = orderItems?.reduce((acc, item) => acc + item.purchasePrice * item.quantity, 0) ?? 0
    const totalCount = orderItems?.reduce((acc, item) => acc + item.quantity, 0) ?? 0

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-black text-white sticky top-0 z-10">
                <div className="max-w-xl mx-auto flex items-center gap-3 px-4 py-4">
                    <Link href="/mypage/orders" className="p-1 rounded-full hover:bg-white/10 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                    </Link>
                    <h1 className="text-base font-black">주문 상세</h1>
                </div>
            </div>

            <div className="max-w-xl mx-auto px-4 py-6 pb-32">
                <div className="mb-4">
                    <p className="text-xs text-gray-400">주문번호</p>
                    <p className="text-sm font-bold text-black mt-0.5">{orderId}</p>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-24">
                        <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : orderItems?.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <p className="text-sm font-bold text-gray-400">주문 상품이 없습니다</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {orderItems?.map(item => (
                            <OrderItemCard key={item.id} item={item} />
                        ))}
                    </div>
                )}
            </div>

            {orderItems && orderItems.length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-lg">
                    <div className="max-w-xl mx-auto px-4 py-4">
                        <div className="flex items-center justify-between mb-1">
                            <p className="text-xs text-gray-400">총 {totalCount}개 상품</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-bold text-gray-700">결제금액</p>
                            <p className="text-lg font-black text-black">{formatPrice(totalAmount)}원</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
