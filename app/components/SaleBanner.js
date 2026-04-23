export default function SaleBanner() {
  return (
    <section className="bg-black text-white py-14 px-4 text-center my-4">
      <p className="text-xs tracking-widest text-white/50 mb-2">LIMITED OFFER</p>
      <h2 className="text-3xl md:text-4xl font-black mb-3">시즌 오프 최대 50% 할인</h2>
      <p className="text-white/60 text-sm mb-6">오늘 자정까지만 진행되는 특가</p>
      <button className="bg-white text-black text-sm font-bold px-8 py-3 hover:bg-gray-200 transition-colors">
        세일 상품 보기
      </button>
    </section>
  )
}
