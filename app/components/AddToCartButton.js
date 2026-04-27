'use client'

import { createClient } from "@/lib/supabase/client";
import { useCartStore } from "@/store/useCartStore";
import { useUserStore } from "@/store/useUserStore"
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddToCartButton({product}) {
    const router = useRouter();

    const [quantity, setQuantity] = useState(1);
    const { user } =useUserStore();

    const addToCart = useCartStore(state => state.addToCart);

    const handleCartClick = () => {
        router.push("/cart");
    }

    const handleClick = async () => {
        if (quantity < 1) {
            alert("수량을 선택하세요");
            return;
        }
    
        if (user?.id) {
            const supabase = createClient();

            const{ error } = await supabase
                .from("cart_items")
                .upsert(
                    {
                        user_id: user.id,
                        product_id: product.id,
                        quantity
                    },
                    {
                        onConflict: "user_id,product_id"
                    }
                );
            if (error) {
                alert('장바구니 저장 실패')
                return;
            } 
        } 
        addToCart(product, quantity);
        alert("장바구니에 담겼습니다.")
    }

    return (
        <>
        <input 
            type="number"
            min={1}
            style={{border: "1px solid black"}}
            value={quantity}  
            onChange={(e) => setQuantity(Number(e.target.value))}  
        />
        <button onClick={handleClick}>장바구니</button>       
        <button onClick={handleCartClick}>장바구니 보기</button>       
        </>
    )
}