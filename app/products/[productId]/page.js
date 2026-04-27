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

    return <ProductDetail product={product} />;
}