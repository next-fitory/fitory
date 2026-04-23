import Header from './components/Header'
import Footer from './components/Footer'
import HeroBanner from './components/HeroBanner'
import CategorySection from './components/CategorySection'
import RankingSection from './components/RankingSection'
import SaleBanner from './components/SaleBanner'
import NewArrivalsSection from './components/NewArrivalsSection'
import BrandSection from './components/BrandSection'

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      <HeroBanner />
      <CategorySection />
      <RankingSection />
      <SaleBanner />
      <NewArrivalsSection />
      <BrandSection />
      <Footer />
    </div>
  )
}
