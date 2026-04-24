'use client'
import ProductCard from "@/app/components/ProductCard";
import { getProductByCategoryId } from "@/lib/data/products";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CategoryPage() {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProductsByCategoryId = async() => {
            if (!categoryId) return;
            const data = await getProductByCategoryId(categoryId);
            setProducts(data);
        }
        fetchProductsByCategoryId();
    }, [categoryId]);

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
