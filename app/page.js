import HeroBanner from './components/HeroBanner'
import CategorySection from './components/CategorySection'
import RankingSection from './components/RankingSection'
import SaleBanner from './components/SaleBanner'
import NewArrivalsSection from './components/NewArrivalsSection'
import BrandSection from './components/BrandSection'

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      <HeroBanner />
      <CategorySection />
      <RankingSection />
      <SaleBanner />
      <NewArrivalsSection />
      <BrandSection />
    </div>
  )
}
