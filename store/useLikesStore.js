import { create } from "zustand";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export const useLikesStore = create((set, get) => ({
    likedIds: [],

    fetchLikes: async (userId) => {
        if (!userId) {
            set({ likedIds: [] });
            return;
        }
        
        // 이미 데이터가 있으면 다시 불러오지 않음 (최적화)
        const { likedIds } = get();
        if (likedIds.length > 0) return;

        console.log("Fetching likes for user:", userId);
        const { data, error } = await supabase
            .from("users_likes")
            .select("product_id")
            .eq("user_id", userId);

        if (error) {
            console.error("Error fetching likes:", error.message, error.details);
            return;
        }

        const ids = data.map(item => Number(item.product_id));
        console.log("Fetched liked IDs:", ids);
        set({ likedIds: ids });
    },

    toggleLike: async (userId, productId) => {
        const { likedIds } = get();
        const pid = Number(productId);
        const uid = Number(userId);
        
        if (!uid || !pid) {
            console.error("Invalid userId or productId", { uid, pid });
            return;
        }

        const isLiked = likedIds.includes(pid);
        console.log("Toggling like:", { uid, pid, isLiked });

        if (isLiked) {
            const { error } = await supabase
                .from("users_likes")
                .delete()
                .eq("user_id", uid)
                .eq("product_id", pid);

            if (error) {
                console.error("Error deleting like:", error.message);
                alert("찜 취소 실패: " + error.message);
                return;
            }

            set({
                likedIds: likedIds.filter(id => id !== pid)
            });

        } else {
            const { error } = await supabase
                .from("users_likes")
                .insert({
                    user_id: uid,
                    product_id: pid
                });

            if (error) {
                console.error("Error inserting like:", error.message);
                alert("찜하기 실패: " + error.message);
                return;
            }

            set({
                likedIds: [...likedIds, pid]
            });
        }
    }
}));