import { createServerClient } from '@/lib/supabase/server'

export async function getCategories() {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('categories')
    .select('id, label, emoji')
    .order('sort_order')

  if (error) throw error
  return data ?? []
}
