// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';
import productReducer from './ProductSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        products: productReducer,
    },
});

export default store;