import { useUserStore } from '@/store/useUserStore'
import { useRouter } from 'next/navigation'

export function useLogout() {
  const logout = useUserStore(state => state.logout)
  const router = useRouter()

  return () => {
    logout()
    router.push('/')
  }
}
