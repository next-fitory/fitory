import { createServerClient } from '@/lib/supabase/server'

const PRODUCT_FIELDS = 'id, name, price, sale_price, discount_rate, image_url, brands(name), stock'

export async function getRankedProducts() {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_FIELDS)

  if (error) throw error
  return data ?? []
}

export async function getNewArrivals() {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_FIELDS)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data ?? []
}

export async function getProductByCategoryId(categoryId) {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('products')
    .select(`
          id, 
          name, 
          price, 
          sale_price, 
          discount_rate, 
          image_url, 
          stock,
          brands(name)
        `)
    .eq('category_id', categoryId)

  if (error) throw error
  return data ?? []
}

export async function getProductByProductId(productId) {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_FIELDS)
    .eq('id', productId)
    .limit(1)

  if (error) throw error
  return data ?? []
}

