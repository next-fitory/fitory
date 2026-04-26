'use client'
import ProductCard from "@/app/components/ProductCard";
import { getProductByCategoryId } from "@/lib/data/products";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function CategoryPage() {
    const { categoryId } = useParams();

    const { data: products = [], isLoading, isError } = useQuery({
        queryKey: ['products', 'category', categoryId],
        queryFn: () => getProductByCategoryId(Number(categoryId)),
        enabled: !!categoryId,
    });

    if (isLoading) return <div>로딩 중...</div>;
    if (isError) return <div>에러가 발생했습니다.</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-xl font-black mb-6">카테고리 상품</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {products && products.map((product, index) => (
                    <ProductCard product={product} key={product.id} rank={index + 1}/>
                ))}
            </div>
            {products.length === 0 && (
                <div className="py-20 text-center text-gray-400">
                    상품이 존재하지 않습니다.
                </div>
            )}
        </div>
    )
}
