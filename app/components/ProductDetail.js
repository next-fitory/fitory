
import AddToCartButton from "./AddToCartButton";
import { useRouter } from "next/navigation";

export default function ProductDetail({ product }) {
    const router = useRouter();
    
    return (
        <div>{product &&             
            ( <div><img src={product.image_url} alt={product.description}/>
            <p>브랜드: {product.brands?.name}</p>
            <p>상품 이름: {product.name}</p>
            <p>상품 가격: {product.sale_price}원</p>
            <p>할인율: {product.discount_rate}%</p>
            <p>정가: {product.price}원</p>
            <p>수량: {product.stock}개</p>

            <AddToCartButton product={product}/>
            <button onClick={() => router.back()}>목록으로</button>
            </div>
        )}
        </div>
    )
}