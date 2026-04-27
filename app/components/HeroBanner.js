import Image from 'next/image'
import Link from 'next/link'

export default function HeroBanner() {
  return (
    <section className="relative h-[480px] md:h-[600px] bg-black overflow-hidden">
      <Image
        src="https://picsum.photos/seed/hero-fashion/1400/600"
        alt="hero"
        fill
        sizes="100vw"
        className="object-cover opacity-60"
        priority
      />
      <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-20">
        <p className="text-white/60 text-sm tracking-widest mb-3">2026 SPRING / SUMMER</p>
        <h1 className="text-white text-5xl md:text-7xl font-black leading-none tracking-tight mb-6">
          NEW<br />ARRIVALS
        </h1>
        <p className="text-white/70 text-sm mb-8">지금 가장 트렌디한 스타일을 만나보세요</p>
        <div className="flex gap-3">
          <Link
            href="#ranking-section"
            className="bg-white text-black text-sm font-bold px-6 py-3 hover:bg-gray-200 transition-colors"
          >
            쇼핑하기
          </Link>
          <Link
            href="#brand-section"
            className="border border-white text-white text-sm font-bold px-6 py-3 hover:bg-white/10 transition-colors"
          >
            브랜드 보기
          </Link>
        </div>
      </div>
    </section>
  )
}
