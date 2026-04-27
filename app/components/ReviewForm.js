'use client'

import { useState } from 'react'
import { createReview } from '@/lib/data/reviews'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function ReviewForm({ productId, userId }) {
  const [content, setContent] = useState('')
  const [rating, setRating] = useState(5)
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (newReview) => createReview(newReview),
    onSuccess: () => {
      queryClient.invalidateQueries(['reviews', productId])
      setContent('')
      setRating(5)
      alert('리뷰가 등록되었습니다.')
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!content.trim()) return alert('내용을 입력해 주세요.')
    
    mutation.mutate({
      productId: Number(productId),
      userId: userId,
      content,
      rating
    })
  }

  return (
    <div className="mt-12 max-w-4xl mx-auto px-4 w-full">
      <form 
        onSubmit={handleSubmit} 
        className="w-full p-8 bg-white rounded-2xl border border-slate-200 shadow-sm"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-800">Review 작성</h3>
          
          <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
            <span className="text-sm font-bold text-slate-500">별점</span>
            <select 
              value={rating} 
              onChange={(e) => setRating(Number(e.target.value))}
              className="bg-transparent font-bold text-blue-600 outline-none cursor-pointer"
            >
              {[5, 4, 3, 2, 1].map(num => (
                <option key={num} value={num}>{num} / 5 점</option>
              ))}
            </select>
          </div>
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-5 bg-slate-50 border border-slate-100 rounded-xl h-32 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-700 resize-none placeholder:text-slate-300"
          placeholder="다른 고객들을 위해 솔직한 리뷰를 남겨주세요."
        />
        
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            disabled={mutation.isPending}
            className="px-10 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-blue-600 active:scale-95 disabled:bg-slate-300 transition-all shadow-md"
          >
            {mutation.isPending ? '등록 중...' : '작성 완료'}
          </button>
        </div>
      </form>
    </div>
  )
}