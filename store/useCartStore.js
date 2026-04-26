import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(persist((set) => ({
    cart: [],

    addToCart: (product, quantity) => set((state) => {
        const exists = state.cart.find(
            item => item.id === product.id
        );

        if(exists) {
            return {
                cart: state.cart.map(item => 
                    item.id === product.id 
                    ? {...item, quantity: item.quantity + quantity}
                    : item
                )
            }
        }
        return {
            cart: [...state.cart, { ...product, quantity }]
        }
    }),

    removeFromCart: (id) => 
        set((state) => ({

            cart: state.cart.filter((item) => item.id !== id),
        })),
    
    updateQuantity: (id, quantity) =>
        set((state) => ({
            cart: state.cart.map(item =>
                item.id === id? { ...item, quantity } : item
            ),
        })),

    clearCart: () => set({ cart: []})
}), { name: "cart" }));