import { useCartStore } from "@/store/useCartStore"

export default function CartItem({item, checked, onCheck}) {
    const removeFromCart = useCartStore((state) => state.removeFromCart);

    return (
        <div>
            <input
                type="checkbox"
                checked={checked}
                onChange={() => onCheck(item.id)}
                />
            <img src={item.image_url} alt={item.name} />
            <p>제품 이름: {item.name}</p>
            <p>가격: {item.sale_price}원</p>
            <p>정가: {item.price}원</p>
            <p>수량: {item.quantity}</p>
            <button onClick={() => removeFromCart(item.id)}>삭제</button>
        </div>
    )
}