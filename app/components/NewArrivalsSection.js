import { getNewArrivals } from '@/lib/data/products'
import ProductCard from './ProductCard'
import SectionHeader from './SectionHeader'

export default async function NewArrivalsSection() {
  const products = await getNewArrivals()

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <SectionHeader title="신상품" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
