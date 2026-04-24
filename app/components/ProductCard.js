import Image from 'next/image'
import PriceLabel from './PriceLabel'
import Link from 'next/link'

export default function ProductCard({ product, rank }) {
  return (
    <div className="group cursor-pointer">
      <Link href={`/products/${product.id}`}>
      <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {rank && (
          <span className="absolute top-2 left-2 bg-black text-white text-xs font-black w-6 h-6 flex items-center justify-center">
            {rank}
          </span>
        )}
        <button
          aria-label="찜하기"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-1.5"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
      <div className="mt-2 space-y-0.5">
        <p className="text-xs text-gray-500 font-medium">{product.brands?.name}</p>
        <p className="text-sm font-medium text-black leading-snug line-clamp-1">{product.name}</p>
        <PriceLabel price={product.price} salePrice={product.sale_price} rate={product.discount_rate} />
      </div>
      </Link>
    </div>
  )
}
