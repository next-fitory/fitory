import { createClient } from '@/lib/supabase/client'

export async function getLikedIds(userId) {
    if (!userId) return []

    const supabase = createClient()
    const { data, error } = await supabase
        .from('users_likes')
        .select('product_id')
        .eq('user_id', userId)

    if (error) throw error
    return data.map(row => Number(row.product_id))
}

export async function toggleLike(userId, productId) {
    const supabase = createClient()
    const uid = Number(userId)
    const pid = Number(productId)

    const { data: existing } = await supabase
        .from('users_likes')
        .select('product_id')
        .eq('user_id', uid)
        .eq('product_id', pid)
        .maybeSingle()

    if (existing) {
        const { error } = await supabase
            .from('users_likes')
            .delete()
            .eq('user_id', uid)
            .eq('product_id', pid)
        if (error) throw error
    } else {
        const { error } = await supabase
            .from('users_likes')
            .insert({ user_id: uid, product_id: pid })
        if (error) throw error
    }
}
