import { createServerClient } from '@/lib/supabase/server'

export async function login(email) {
    const supabase = createServerClient()
    const { data, error } = await supabase
        .from('users')
        .select('id, email, name')
        .eq('email', email)

    if (error) throw error
    return data ?? []
}