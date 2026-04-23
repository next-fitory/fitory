import products from '@/apis/products.json'
import ProductCard from './ProductCard'
import SectionHeader from './SectionHeader'

export default function RankingSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <SectionHeader title="실시간 랭킹" subtitle="매시간 업데이트" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} rank={i + 1} />
        ))}
      </div>
    </section>
  )
}
