import Image from 'next/image'
import PriceLabel from './PriceLabel'
import Link from 'next/link'
import LikesButton from './LikesButton'

export default function ProductCard({ product, rank }) {
  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
        <Link href={`/products/${product.id}`}>
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        {rank && (
          <span className="absolute top-2 left-2 bg-black text-white text-xs font-black w-6 h-6 flex items-center justify-center pointer-events-none">
            {rank}
          </span>
        )}
        <LikesButton product={product}/>
      </div>
      <Link href={`/products/${product.id}`}>
        <div className="mt-2 space-y-0.5">
          <p className="text-xs text-gray-500 font-medium">{product.brands?.name}</p>
          <p className="text-sm font-medium text-black leading-snug line-clamp-1">{product.name}</p>
          <PriceLabel price={product.price} salePrice={product.sale_price} rate={product.discount_rate} />
        </div>
      </Link>
    </div>
  )
}
