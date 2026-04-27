'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useUserStore } from '@/store/useUserStore'
import { getOrdersByUserId } from '@/lib/data/orders'
import OrderCard from '@/app/components/OrderCard'

export default function OrdersPage() {
    const { user } = useUserStore()
    const [orders, setOrders] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const data = await getOrdersByUserId(user.id)
            setOrders(data)
        }
        fetchData()
    }, [user])

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-black text-white sticky top-0 z-10">
                <div className="max-w-xl mx-auto flex items-center gap-3 px-4 py-4">
                    <Link href="/mypage" className="p-1 rounded-full hover:bg-white/10 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                    </Link>
                    <h1 className="text-base font-black">주문 내역</h1>
                </div>
            </div>

            <div className="max-w-xl mx-auto px-4 py-6">
                {orders === null ? (
                    <div className="flex justify-center py-24">
                        <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : orders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <p className="text-sm font-bold text-gray-400 mb-1">주문 내역이 없습니다</p>
                        <p className="text-xs text-gray-300 mb-6">첫 구매를 시작해보세요</p>
                        <Link
                            href="/"
                            className="bg-black text-white text-sm font-bold px-6 py-2.5 rounded-full hover:bg-gray-800 transition-colors"
                        >
                            쇼핑하러 가기
                        </Link>
                    </div>
                ) : (
                    <>
                        <p className="text-xs text-gray-400 mb-4">총 {orders.length}건</p>
                        <div className="flex flex-col gap-3">
                            {orders.map(order => (
                                <OrderCard key={order.id} order={order} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
