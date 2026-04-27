'use client'
import { useCartStore } from "@/store/useCartStore";
import { useUiStore } from "@/store/useUiStore";
import { useUserStore } from "@/store/useUserStore";
import CartItem from "../components/CartItem";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CartPage() {
    const cart = useCartStore(state => state.cart);
    const user = useUserStore(state => state.user);
    const removeFromCart = useCartStore(state => state.removeFromCart);
    const router = useRouter();

    const clearCart = useCartStore(state => state.clearCart);
    const openModal = useUiStore(state => state.openModal);

    const [selectedIds, setSelectedIds] = useState([]);
    
    const selectedItem = cart.filter(item => selectedIds.includes(item.id));

    const handeleSelectAll = () => {
        if (selectedIds.length === cart.length) {
            setSelectedIds([]);


        } else {
            setSelectedIds(cart.map((item) => item.id));
        }
    }

    const toggleSelect = id => {
        setSelectedIds(prev => 
            prev.includes(id)
            ? prev.filter(itemId => itemId !== id)
            : [...prev, id]
        )
    }

    const handleRemoveSelected = () => {
        selectedIds.forEach(id => removeFromCart(id));
        setSelectedIds([]);
    }

    const handleBuy = () => {
        if(!user) {
            openModal(
                "login",
                {
                    title: "로그인",
                    description: "구매하려면 로그인이 필요합니다.",
                },
                {
                    size: "sm",
                    backdropClosable: true,
                    escapeClosable: true,
                }
            );
            return;
        }

        if(selectedIds.length === 0){
            alert('구매할 상품을 선택해주세요.');
            return;
        }
        
        console.log(selectedIds); 
        router.push(`/`);
    }

    return (
        <>
            <div>
                {cart.map(item => (
                    <CartItem 
                        key={item.id} 
                        item={item}
                        checked={selectedIds.includes(item.id)}
                        onCheck={toggleSelect} />
                ))}
            </div>
            <button onClick={handleRemoveSelected}>선택 삭제</button>
            <button onClick={clearCart}>전체 삭제</button>
            <button onClick={handeleSelectAll}>
                {selectedIds.length === cart.length ? "전체 해제" : "전체 선택"}
            </button>
            <button onClick={handleBuy}>구매하기</button>
        </>
    )
}

