import { createServerClient } from '@/lib/supabase/server'

export async function getReviewsByProductId(productId) {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('reviews')
    .select(`
      *,
      users ( name ) 
    `) 
    .eq('product_id', productId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data ?? []
}

export async function createReview({ productId, userId, content, rating }) {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('reviews')
    .insert([
      { 
        product_id: productId, 
        user_id: userId, 
        content: content, 
        rating: rating 
      }
    ])
    .select()

  if (error) throw error
  return data
}