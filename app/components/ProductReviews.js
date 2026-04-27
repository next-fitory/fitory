export default function ProductReviews({ reviews }) {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold">리뷰 ({reviews.length})</h2>
      {reviews.length === 0 ? (
        <p className="py-4">첫 번째 리뷰를 남겨보세요!</p>
      ) : (
        <ul className="divide-y">
          {reviews.map((review) => (
            <li key={review.id} className="py-4">
              <div className="flex justify-between">
                <span className="font-semibold">별점: {review.rating} / 5</span>
                <span className="text-gray-500 text-sm">{review.users?.name}</span>
              </div>
              <p className="mt-2 text-gray-700">{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}