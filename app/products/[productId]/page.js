'use client'

import { getProductByProductId } from '@/lib/data/products';
import ProductDetail from "@/app/components/ProductDetail";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";

export default function ProductDetailPage() {
    const { productId } = useParams();
    const [product, setProduct] = useState();        

    useEffect(() => {
        const fetchProductByProductId = async() => {
            if (!productId) return;

            const data = await getProductByProductId(productId);
            setProduct(data[0]);
        }
        fetchProductByProductId();
    }, [productId])

    return (<>
        {product && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <ProductDetail key={product.id} product={product} />
        </div>
        )
        }
        </>

    )
}