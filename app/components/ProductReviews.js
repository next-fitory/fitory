export default function ProductReviews({ reviews }) {
  return (
    <section className="mt-12 max-w-4xl mx-auto px-4 text-slate-900">
      <div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-slate-100">
        <h2 className="text-xl font-bold flex items-center gap-2">
          리뷰 <span className="text-blue-600">{reviews.length}</span>
        </h2>
      </div>

      {reviews.length === 0 ? (
        <div className="py-20 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300">
          <p className="text-slate-400">아직 등록된 리뷰가 없습니다.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {reviews.map((review) => (
            <li 
              key={review.id} 
              className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col gap-1">
                  {/* 별점 시각화 */}
                  <div className="flex text-amber-400 text-sm mb-1">
                    {"★".repeat(review.rating)}
                    <span className="text-slate-200">{"★".repeat(5 - review.rating)}</span>
                  </div>
                  {/* 이름 */}
                  <span className="font-bold text-slate-800">{review.users?.name}</span>
                </div>
                
                {/* 날짜 */}
                <span className="text-xs text-slate-400 font-medium">
                  {new Date(review.created_at).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  })}
                </span>
              </div>

              {/* 본문 내용 */}
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                {review.content}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}