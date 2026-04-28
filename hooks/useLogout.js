import { useCartStore } from "@/store/useCartStore";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";

export function useLogout() {
  const logout = useUserStore((state) => state.logout);
  const clearCart = useCartStore((state) => state.clearCart);
  const router = useRouter();

  return () => {
    clearCart();
    logout();
    router.push("/");
  };
}
