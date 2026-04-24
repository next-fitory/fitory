export default function ProductDetail({ product }) {
    return (
        <div>{product &&             
            ( <div><img src={product.image_url} alt={product.description}/>
            {product.brand_id}
            상품 이름: {product.name}
            상품 가격: {product.discount_rate}{product.sale_price}
            {product.price}
            수량: {product.stock}
            </div>
        )}

        </div>
    )
}