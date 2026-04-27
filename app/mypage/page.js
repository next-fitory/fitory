"use client";

import ProfileSection from '../components/ProfileSection'
import OrderSummarySection from '../components/OrderSummarySection'
import MyPageMenu from '../components/MyPageMenu'
import { useRequireAuth } from '@/hooks/useRequireAuth';

export default function MyPage() {
  const user = useRequireAuth();

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

