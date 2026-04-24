import Link from "next/link";

export default function CategoryItem({ id, label, emoji }) {
  return (
    <Link href={`/category/${id}`}>
    <button className="flex flex-col items-center gap-2 min-w-[56px] group">
      <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-2xl group-hover:bg-black group-hover:text-white transition-colors">
        {emoji}
      </div>
      <span className="text-xs font-medium whitespace-nowrap">{label}</span>
    </button>
    </Link>
  )
}
