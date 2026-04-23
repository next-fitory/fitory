export default function PriceLabel({ price, salePrice, rate }) {
  return (
    <div className="space-y-0.5">
      <div className="flex items-center gap-1.5">
        <span className="text-sm font-black text-red-500">{rate}%</span>
        <span className="text-sm font-black">{salePrice.toLocaleString()}원</span>
      </div>
      <p className="text-xs text-gray-400 line-through">{price.toLocaleString()}원</p>
    </div>
  )
}
