import brands from '@/apis/brands.json'
import BrandItem from './BrandItem'

export default function BrandSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 border-t border-gray-100">
      <h2 className="text-xl font-black mb-6">인기 브랜드</h2>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {brands.map((brand) => (
          <BrandItem key={brand.id} name={brand.name} seed={brand.seed} />
        ))}
      </div>
    </section>
  )
}
