'use client'
import { useLikesStore } from "@/store/useLikesStore";
import { useUiStore } from "@/store/useUiStore";
import { useUserStore } from "@/store/useUserStore"

export default function LikesButton({product}) {
    const user = useUserStore(state => state.user);
    const openModal = useUiStore(state => state.openModal);

    const likedIds = useLikesStore(state => state.likedIds);
    const toggleLike = useLikesStore(state => state.toggleLike);
    
    const handleClick = async(e) => {
        e.preventDefault(); 
        e.stopPropagation();

        if(!user) {
            openModal(
                "login",
                {
                    title: "로그인",
                    description: "로그인이 필요합니다.",
                },
                {
                    size: "sm",
                    backdropClosable: true,
                    escapeClosable: true,
                }
            );
            return;
        }
        
        await toggleLike(user.id, product.id);
    }
        
    const isLiked = likedIds.includes(Number(product.id));

    return (
        <>
        <button
          onClick={handleClick}
          aria-label="찜하기"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-1.5"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-4 h-4" 
            fill={isLiked ? "red" : "none"} 
            viewBox="0 0 24 24" 
            stroke={isLiked ? "red" : "currentColor"}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
        </>
    )
}
