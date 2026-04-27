import { useUserStore } from '@/store/useUserStore'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function useRequireAuth(redirectTo = '/') {
  const user = useUserStore(state => state.user)
  const hasHydrated = useUserStore(state => state._hasHydrated)
  const router = useRouter()

  useEffect(() => {
    if (!hasHydrated) return
    if (!user) router.push(redirectTo)
  }, [user, hasHydrated])

  return user
}
