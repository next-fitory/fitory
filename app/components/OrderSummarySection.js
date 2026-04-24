export default function OrderSummarySection() {
  const statuses = [
    { label: '입금대기', count: 0 },
    { label: '결제완료', count: 1 },
    { label: '배송준비', count: 0 },
    { label: '배송중', count: 2 },
    { label: '배송완료', count: 5 },
  ]

  return (
    <section className="py-10 px-4 bg-gray-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-sm font-black mb-6">주문 배송 현황</h2>
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          {statuses.map((status, index) => (
            <div key={status.label} className="flex items-center flex-1">
              <div className="flex-1 text-center">
                <p className="text-2xl font-black mb-1">{status.count}</p>
                <p className="text-xs text-gray-500">{status.label}</p>
              </div>
              {index < statuses.length - 1 && (
                <div className="w-px h-8 bg-gray-200" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
