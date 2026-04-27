'use client'

import { getProductByProductId } from '@/lib/data/products';
import { getReviewsByProductId } from '@/lib/data/reviews';
import ProductDetail from "@/app/components/ProductDetail";
import ProductReviews from "@/app/components/ProductReviews";
import { useParams } from "next/navigation"
import { useQuery } from '@tanstack/react-query';

export default function ProductDetailPage() {
    const { productId } = useParams();

    const { data: product, isLoading, isError } = useQuery({
        queryKey: ['product', productId],
        queryFn: async () => {
        const data = await getProductByProductId(productId);
        return data[0];
        },
        enabled: !!productId,
    });

    const { data: reviews, isLoading: isReviewsLoading } = useQuery({
        queryKey: ['reviews', productId],
        queryFn: () => getReviewsByProductId(productId),
        enabled: !!productId,
    });

    if (isLoading || isReviewsLoading) return <div>상품 정보를 불러오는 중...</div>;
    if (isError) return <div>상품 정보를 가져오는데 실패했습니다.</div>;

    return (
        <>
            {product && (
                <>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        <ProductDetail key={product.id} product={product}/>
                    </div>
                    
                    <div className="mt-12 border-t pt-8">
                        <ProductReviews reviews={reviews || []} />
                    </div>
                </>
            )}
        </>
    );
}