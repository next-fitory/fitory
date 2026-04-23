import products from '@/apis/products.json'
import ProductCard from './ProductCard'
import SectionHeader from './SectionHeader'

export default function NewArrivalsSection() {
  const newProducts = [...products].reverse()

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <SectionHeader title="신상품" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {newProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
