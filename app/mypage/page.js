import Header from '../components/Header'
import Footer from '../components/Footer'
import ProfileSection from '../components/ProfileSection'
import OrderSummarySection from '../components/OrderSummarySection'
import MyPageMenu from '../components/MyPageMenu'

export default function MyPage() {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <Header />
      <main className="flex-1">
        <ProfileSection />
        <OrderSummarySection />
        <MyPageMenu />
      </main>
      <Footer />

    </div>
  )
}

