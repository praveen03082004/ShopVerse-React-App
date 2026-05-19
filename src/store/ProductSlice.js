// src/store/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch all products from FakeStore API
export const fetchProducts = createAsyncThunk('products/fetchAll', async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    return data;
});

// Fetch single product
export const fetchProductById = createAsyncThunk('products/fetchById', async (id) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await response.json();
    return data;
});

// Fetch categories
export const fetchCategories = createAsyncThunk('products/fetchCategories', async () => {
    const response = await fetch('https://fakestoreapi.com/products/categories');
    const data = await response.json();
    return data;
});

const productSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        selectedProduct: null,
        categories: [],
        activeCategory: 'all',
        loading: false,
        error: null,
        searchQuery: '',
    },
    reducers: {
        setActiveCategory(state, action) {
            state.activeCategory = action.payload;
        },
        setSearchQuery(state, action) {
            state.searchQuery = action.payload;
        },
        clearSelectedProduct(state) {
            state.selectedProduct = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // fetchProducts
            .addCase(fetchProducts.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchProducts.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
            .addCase(fetchProducts.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })
            // fetchProductById
            .addCase(fetchProductById.pending, (state) => { state.loading = true; })
            .addCase(fetchProductById.fulfilled, (state, action) => { state.loading = false; state.selectedProduct = action.payload; })
            .addCase(fetchProductById.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })
            // fetchCategories
            .addCase(fetchCategories.fulfilled, (state, action) => { state.categories = action.payload; });
    },
});

export const { setActiveCategory, setSearchQuery, clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;