import { formatDate, formatPrice } from "@/lib/utils/format"

const STATUS_MAP = {
    pending: { label: '입금대기', color: 'bg-yellow-100 text-yellow-700' },
    paid: { label: '결제완료', color: 'bg-blue-100 text-blue-700' },
    preparing: { label: '배송준비', color: 'bg-purple-100 text-purple-700' },
    shipping: { label: '배송중', color: 'bg-indigo-100 text-indigo-700' },
    delivered: { label: '배송완료', color: 'bg-green-100 text-green-700' },
    cancelled: { label: '취소', color: 'bg-red-100 text-red-700' },
}

export default function OrderCard({ order }) {
    const status = STATUS_MAP[order.status] ?? { label: order.status, color: 'bg-gray-100 text-gray-600' };



    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
                <div>
                    <p className="text-xs text-gray-400 mb-1">{formatDate(order.created_at)}</p>
                    <p className="text-xs text-gray-400">주문번호 {order.id}</p>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${status.color}`}>
                    {status.label}
                </span>
            </div>

            <div className="border-t border-gray-50 pt-3 flex items-center justify-between">
                <p className="text-base font-black text-black">
                    {formatPrice(order.total_price)}원
                </p>

                <a href={`/mypage/orders/${order.id}`} className="text-xs text-gray-500 border border-gray-200 rounded-full px-3 py-1 hover:bg-gray-50 transition-colors">
                    상세보기
                </a>
            </div>
        </div>
    )
}