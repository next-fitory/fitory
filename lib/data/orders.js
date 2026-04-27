import { createServerClient } from '@/lib/supabase/server'

export async function getOrdersByUserId(userId) {
    const supabase = createServerClient();
    console.log("order user id", userId);
    const { data, error } = await supabase
        .from('orders')
        .select('id, total_price, status, created_at')
        .eq('user_id', userId);

    if (error) {
        console.error("Select Error:", error.message)
        throw error
    }

    return data;
}

export async function getOrderItems(orderId) {
    const supabase = createServerClient();

    const { data, error } = await supabase
        .from('order_items')
        .select(`
            id,
            quantity,
            unit_price,
            created_at,
            product_id,
            products (
                name,
                image_url,
                price
            )
        `)
        .eq('order_id', orderId);

    if (error) {
        console.error("Select Error:", error.message);
        throw error;
    }

    return data.map(item => ({
        id: item.id,
        productId: item.product_id,
        name: item.products?.name,
        imageUrl: item.products?.image_url,
        quantity: item.quantity,
        purchasePrice: item.unit_price,
        currentPrice: item.products?.price,
        createdAt: item.created_at
    }));
}

export async function insertOrder(userId, totalPrice) {
    const supabase = createServerClient()

    const { data, error } = await supabase
        .from('orders')
        .insert([
            {
                user_id: userId,
                total_price: totalPrice,
                status: 'pending'
            }
        ])
        .select()

    if (error) {
        console.error("Insert Error:", error.message)
        throw error
    }

    return data
}

export async function insertOrderItems(items, orderId) {
    const supabase = createServerClient()

    const itemsToSave = items.map(item => {
        return {
            order_id: orderId,
            product_id: item.id,
            quantity: item.quantity,
            unit_price: item.sale_price
        }
    })

    const { data, error } = await supabase
        .from('order_items')
        .insert(itemsToSave)
        .select()

    if (error) {
        console.error("Insert Error:", error.message)
        throw error
    }

    return data
}

export async function createCompleteOrder(userId, totalPrice, items) {
    const supabase = createServerClient();

    const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([{ user_id: userId, total_price: totalPrice }])
        .select()
        .single();

    if (orderError) throw orderError;

    const newOrderId = orderData.id;

    const itemsToInsert = items.map(item => ({
        order_id: newOrderId,
        product_id: item.id,
        quantity: item.quantity,
        unit_price: item.sale_price
    }));

    const { data, error: itemsError } = await supabase
        .from('order_items')
        .insert(itemsToInsert)
        .select();

    if (itemsError) throw itemsError;

    return data;
}