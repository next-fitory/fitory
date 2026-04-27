'use client'

import { getProductByProductId } from '@/lib/data/products';
import ProductDetail from "@/app/components/ProductDetail";
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

    if (isLoading) return <div>상품 정보를 불러오는 중...</div>;
    if (isError) return <div>상품 정보를 가져오는데 실패했습니다.</div>;

    return (
        <>
            {product && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    <ProductDetail key={product.id} product={product}/>
                </div>
            )}
        </>
    );
}