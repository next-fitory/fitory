import { createClient } from '@/lib/supabase/client'

export async function upsertCartItem(userId, productId, quantity) {
    const supabase = createClient()

    const { error } = await supabase
        .from('cart_items')
        .upsert(
            {
                user_id: userId,
                product_id: productId,
                quantity
            },
            { onConflict: 'user_id,product_id' }
        )

    if (error) throw error
}
