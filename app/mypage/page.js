"use client";

import ProfileSection from '../components/ProfileSection'
import OrderSummarySection from '../components/OrderSummarySection'
import MyPageMenu from '../components/MyPageMenu'
import { useUserStore } from "@/store/useUserStore";

export default function MyPage() {
  const { user } = useUserStore();

  console.log(user);

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <main className="flex-1">
        <ProfileSection user={user} />
        <OrderSummarySection />
        <MyPageMenu />
      </main>
    </div>
  )
}
