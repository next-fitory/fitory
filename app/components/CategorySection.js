import { getCategories } from '@/lib/data/categories'
import CategoryItem from './CategoryItem'

export default async function CategorySection() {
  const categories = await getCategories()

  return (
    <section className="border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-4 md:gap-8 overflow-x-auto scrollbar-none justify-start md:justify-center">
          {categories.map((cat) => (
            <CategoryItem key={cat.id} id={cat.id} label={cat.label} emoji={cat.emoji} />
          ))}
        </div>
      </div>
    </section>
  )
}
