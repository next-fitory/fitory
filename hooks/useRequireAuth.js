import { useUserStore } from '@/store/useUserStore'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function useRequireAuth(redirectTo = '/') {
  const user = useUserStore(state => state.user)
  const router = useRouter()

  useEffect(() => {
    if (!user) router.push(redirectTo)
  }, [user])

  return user
}
