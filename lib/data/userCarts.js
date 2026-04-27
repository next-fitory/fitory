import { createServerClient } from '@/lib/supabase/server'

const CARTS_FIELDS = 'id, product_id, quantity';

export async function getCartsByUserId(userId) {
    const supabase = createServerClient()
    const { data, error } = await supabase
        .from('cart_items')
        .select(CARTS_FIELDS)
        .eq('userId', userId)

    if (error) throw error
    return data ?? []
}