// src/store/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],        // [{ ...product, quantity }]
        totalQuantity: 0,
        totalPrice: 0,
    },
    reducers: {
        addToCart(state, action) {
            const product = action.payload;
            const existing = state.items.find((item) => item.id === product.id);
            if (existing) {
                existing.quantity += 1;
            } else {
                state.items.push({ ...product, quantity: 1 });
            }
            state.totalQuantity += 1;
            state.totalPrice = parseFloat((state.totalPrice + product.price).toFixed(2));
        },
        removeFromCart(state, action) {
            const id = action.payload;
            const existing = state.items.find((item) => item.id === id);
            if (!existing) return;
            state.totalQuantity -= existing.quantity;
            state.totalPrice = parseFloat((state.totalPrice - existing.price * existing.quantity).toFixed(2));
            state.items = state.items.filter((item) => item.id !== id);
        },
        decreaseQuantity(state, action) {
            const id = action.payload;
            const existing = state.items.find((item) => item.id === id);
            if (!existing) return;
            if (existing.quantity === 1) {
                state.items = state.items.filter((item) => item.id !== id);
            } else {
                existing.quantity -= 1;
            }
            state.totalQuantity -= 1;
            state.totalPrice = parseFloat((state.totalPrice - existing.price).toFixed(2));
        },
        clearCart(state) {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        },
    },
});

export const { addToCart, removeFromCart, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;