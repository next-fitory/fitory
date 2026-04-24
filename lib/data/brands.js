import { createServerClient } from '@/lib/supabase/server'

export async function getBrands() {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('brands')
    .select('id, name, image_url')

  if (error) throw error
  return data ?? []
}
