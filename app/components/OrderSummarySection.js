'use client'

import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getOrdersByUserId } from '@/lib/data/orders'
import { useUserStore } from '@/store/useUserStore'
import { useRouter } from 'next/navigation'

const BASE_STATUSES = [
    { label: '입금대기', status: 'pending' },
    { label: '결제완료', status: 'completed' },
    { label: '배송준비', status: 'preparing' },
    { label: '배송중',   status: 'shipping' },
    { label: '배송완료', status: 'delivered' },
]

export default function OrderSummarySection() {
    const { user } = useUserStore()
    const router = useRouter()

    const { data: orders = [] } = useQuery({
        queryKey: ['orders', user?.id],
        queryFn: () => getOrdersByUserId(user.id),
        enabled: !!user?.id,
    })

    const orderStatuses = useMemo(() => {
        const counts = Object.fromEntries(BASE_STATUSES.map(s => [s.status, 0]))
        orders.forEach(order => {
            if (counts[order.status] !== undefined) counts[order.status]++
        })
        return BASE_STATUSES.map(s => ({ ...s, count: counts[s.status] }))
    }, [orders])

    return (
        <section className="py-10 px-4 bg-gray-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-sm font-black mb-6">주문 배송 현황</h2>
                <div className="flex justify-between items-center max-w-4xl mx-auto">
                    {orderStatuses.map((status, index) => (
                        <div
                            key={status.label}
                            className="flex items-center flex-1 cursor-pointer"
                            onClick={() => router.push('/mypage/orders')}
                        >
                            <div className="flex-1 text-center">
                                <p className="text-2xl font-black mb-1">{status.count}</p>
                                <p className="text-xs text-gray-500">{status.label}</p>
                            </div>
                            {index < orderStatuses.length - 1 && (
                                <div className="w-px h-8 bg-gray-200" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
