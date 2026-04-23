import Image from 'next/image'

export default function BrandItem({ name, seed }) {
  return (
    <button className="group text-left">
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        <Image
          src={`https://picsum.photos/seed/${seed}/200/200`}
          alt={name}
          fill
          sizes="(max-width: 768px) 33vw, 17vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300 grayscale group-hover:grayscale-0"
        />
      </div>
      <p className="text-xs font-bold mt-2 truncate">{name}</p>
    </button>
  )
}
