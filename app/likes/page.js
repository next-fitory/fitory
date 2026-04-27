'use client'

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/store/useUserStore";
import { useLikesStore } from "@/store/useLikesStore";
import { createClient } from "@/lib/supabase/client";
import ProductCard from "@/app/components/ProductCard";

const PRODUCT_FIELDS = 'id, name, price, sale_price, discount_rate, image_url, brands(name), stock'

export default function LikesPage() {
    const { user } = useUserStore();
    const { likedIds, fetchLikes } = useLikesStore();
    const supabase = createClient();

    useEffect(() => {
        if (user?.id) {
            fetchLikes(user.id);
        }
    }, [user?.id, fetchLikes]);

    const { data: products = [], isLoading, isError } = useQuery({
        queryKey: ['products', 'likes', likedIds],
        queryFn: async () => {
            if (!likedIds || likedIds.length === 0) return [];

            const { data, error } = await supabase
                .from('products')
                .select(PRODUCT_FIELDS)
                .in('id', likedIds);

            if (error) throw error;
            return data || [];
        },
        enabled: !!user && likedIds.length > 0,
    });

    if (!user) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <h1 className="text-xl font-black mb-4">좋아요 목록</h1>
                <p className="text-gray-500 mb-6">로그인이 필요한 서비스입니다.</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-xl font-black mb-6">좋아요 목록</h1>
            
            {isLoading && likedIds.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 animate-pulse">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="aspect-[3/4] bg-gray-100 rounded-lg"></div>
                    ))}
                </div>
            ) : isError ? (
                <div className="py-20 text-center text-red-500">
                    데이터를 불러오는 중 에러가 발생했습니다.
                </div>
            ) : products.length === 0 ? (
                <div className="py-20 text-center text-gray-400 border-y border-gray-100">
                    좋아요한 상품이 없습니다.
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {products.map((product) => (
                        <ProductCard product={product} key={product.id} />
                    ))}
                </div>
            )}
        </div>
    );
}
