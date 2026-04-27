'use client'

import { getProductByProductId } from '@/lib/data/products';
import { getReviewsByProductId } from '@/lib/data/reviews';
import ProductDetail from "@/app/components/ProductDetail";
import ProductReviews from "@/app/components/ProductReviews";
import ReviewForm from "@/app/components/ReviewForm";
import { useParams } from "next/navigation"
import { useQuery } from '@tanstack/react-query';
import { useUserStore } from '@/store/useUserStore';

export default function ProductDetailPage() {
    const { productId } = useParams();

    const { user } = useUserStore();

    const { data: product, isLoading, isError } = useQuery({
        queryKey: ['product', productId],
        queryFn: async () => {
            const data = await getProductByProductId(productId);
            return data[0];
        },
        enabled: !!productId,
    });

    if (isLoading) return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
        </div>
    );
    if (isError) return (
        <div className="flex justify-center items-center min-h-screen text-sm text-gray-400">
            상품 정보를 가져오는데 실패했습니다.
        </div>
    );

    const { data: reviews, isLoading: isReviewsLoading } = useQuery({
        queryKey: ['reviews', productId],
        queryFn: () => getReviewsByProductId(productId),
        enabled: !!productId,
    });

    return (
        <>
            {product && (
                <>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        <ProductDetail key={product.id} product={product} />
                    </div>

                    {user ? (
                        <ReviewForm productId={productId} userId={user.id} />
                    ) : (
                        <div className="mt-10 p-6 border rounded-lg text-center bg-gray-50 text-gray-500">
                            리뷰를 작성하려면 로그인이 필요합니다.
                        </div>
                    )}

                    <div className="mt-12 border-t pt-8">
                        <ProductReviews reviews={reviews || []} />
                    </div>
                </>
            )}
        </>

    );

}