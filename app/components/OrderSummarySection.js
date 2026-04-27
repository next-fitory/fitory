'use client'

import { getOrdersByUserId } from "@/lib/data/orders"
import { useUserStore } from "@/store/useUserStore";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export default function OrderSummarySection() {
  const [orders, setOrders] = useState();
  const router = useRouter();
  const { user } = useUserStore();

  const statuses = [
    { label: '입금대기', count: 0 },
    { label: '결제완료', count: 0 },
    { label: '배송준비', count: 0 },
    { label: '배송중', count: 0 },
    { label: '배송완료', count: 0 },
  ]

  useEffect(() => {
    if (!user?.id) return;
    const fetchData = async () => {
      try {
        const data = await getOrdersByUserId(user.id);
        setOrders(data);
      } catch (error) {
        console.error("데이터 로드 실패:", error);
      }
    };

    fetchData();
  }, [user?.id]);

  const orderStatuses = useMemo(() => {
    const baseStatuses = [
      { label: '입금대기', status: 'pending', count: 0 },
      { label: '결제완료', status: 'completed', count: 0 },
      { label: '배송준비', status: 'preparing', count: 0 },
      { label: '배송중', status: 'shipping', count: 0 },
      { label: '배송완료', status: 'delivered', count: 0 },
    ];

    orders?.forEach((order) => {
      const target = baseStatuses.find((s) => s.status === order.status);
      if (target) target.count++;
    });

    return baseStatuses;
  }, [orders]);

  const orderClickHandler = () => {
    router.push('/mypage/orders');
  }

  return (
    <section className="py-10 px-4 bg-gray-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-sm font-black mb-6">주문 배송 현황</h2>
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          {orderStatuses.map((status, index) => (
            <div key={status.label} className="flex items-center flex-1" onClick={orderClickHandler}>
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
